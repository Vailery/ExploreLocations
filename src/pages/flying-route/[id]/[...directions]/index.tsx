import type { GetServerSideProps, NextPage } from "next";
import { DistancePage } from "~/src/components/pages/DistancePage";
import {
  getAirports,
  getAirportsAround,
} from "~/src/utils/sqlQueries/airports";
import {
  getFlightRoute,
  getFlyingDistances,
} from "~/src/utils/sqlQueries/flightRoutes";
import type { AirportItem, FlightDistanceType } from "~/src/utils/types";

interface DistancesPageData {
  flightDistanceData: FlightDistanceType;
  relatedOriginAirports: FlightDistanceType[];
  relatedDestinationAirports: FlightDistanceType[];
  originAirport: AirportItem | null;
  destinationAirport: AirportItem | null;
  airportsAroundOrigin: AirportItem[];
  airportsAroundDestination: AirportItem[];
}

const Distance: NextPage<DistancesPageData> = ({
  flightDistanceData,
  relatedDestinationAirports,
  relatedOriginAirports,
  originAirport,
  destinationAirport,
  airportsAroundDestination,
  airportsAroundOrigin,
}) => {
  return (
    <DistancePage
      data={flightDistanceData}
      relatedDestinationAirports={relatedDestinationAirports}
      relatedOriginAirports={relatedOriginAirports}
      originAirport={originAirport}
      destinationAirport={destinationAirport}
      airportsAroundOrigin={airportsAroundOrigin}
      airportsAroundDestination={airportsAroundDestination}
    />
  );
};

export default Distance;

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps<DistancesPageData> = async (
  context
) => {
  // const directions = Array.isArray(context.query.directions)
  //   ? context.query.directions.map((el) =>
  //       el.toLowerCase().split("_").join(" ")
  //     )
  //   : ["", ""];

  const routeId = context.params && (context.params.id as string);

  const flightDistanceData = await getFlightRoute(routeId || "");

  const originAirport = await getAirports(
    `WHERE "id" = '${flightDistanceData[0].OriginAirportId}'`
  );
  const destinationAirport = await getAirports(
    `WHERE "id" = '${flightDistanceData[0].DestinationAirportId}'`
  );

  const relatedOriginAirports = await getFlyingDistances(
    originAirport[0].City,
    flightDistanceData[0].id
  );

  const relatedDestinationAirports = await getFlyingDistances(
    destinationAirport[0].City,
    flightDistanceData[0].id
  );

  const airportsAroundOrigin = await getAirportsAround(
    originAirport[0].CenterX,
    originAirport[0].CenterY,
    originAirport[0].id,
    4
  );

  airportsAroundOrigin.forEach((el) => {
    el.Distance = Math.round(
      Math.sqrt(
        Math.pow(originAirport[0].CenterX - el.CenterX, 2) +
          Math.pow(originAirport[0].CenterY - el.CenterY, 2)
      ) * 100
    );
  });

  const airportsAroundDestination = await getAirportsAround(
    destinationAirport[0].CenterX,
    destinationAirport[0].CenterY,
    destinationAirport[0].id,
    4
  );

  airportsAroundDestination.forEach((el) => {
    el.Distance = Math.round(
      Math.sqrt(
        Math.pow(destinationAirport[0].CenterX - el.CenterX, 2) +
          Math.pow(destinationAirport[0].CenterY - el.CenterY, 2)
      ) * 100
    );
  });

  airportsAroundOrigin.sort((a, b) =>
    (a.Distance || 0) > (b.Distance || 0) ? 1 : -1
  );

  airportsAroundDestination.sort((a, b) =>
    (a.Distance || 0) > (b.Distance || 0) ? 1 : -1
  );

  return {
    props: {
      flightDistanceData: flightDistanceData[0],
      relatedOriginAirports,
      relatedDestinationAirports,
      originAirport: originAirport.length ? originAirport[0] : null,
      destinationAirport: destinationAirport.length
        ? destinationAirport[0]
        : null,
      airportsAroundDestination,
      airportsAroundOrigin,
    },
  };
};
