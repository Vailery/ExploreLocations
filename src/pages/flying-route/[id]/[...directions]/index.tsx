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
  const directions = Array.isArray(context.query.directions)
    ? context.query.directions.map((el) =>
        el.toLowerCase().split("_").join(" ")
      )
    : ["", ""];

  const routeId = context.params && (context.params.id as string);

  const flightDistanceData = await getFlightRoute(
    directions[0] || "",
    directions[1] || "",
    routeId || ""
  );

  const relatedOriginAirports = await getFlyingDistances(
    flightDistanceData[0].OriginCityName,
    flightDistanceData[0].id
  );
  const relatedDestinationAirports = await getFlyingDistances(
    flightDistanceData[0].DestinationCityName,
    flightDistanceData[0].id
  );
  const originAirport = await getAirports(
    `WHERE LOWER("IATA") = '${flightDistanceData[0].OriginIata.toLowerCase()}'`
  );
  const destinationAirport = await getAirports(
    `WHERE LOWER("IATA") = '${flightDistanceData[0].DestinationIata.toLowerCase()}'`
  );

  const airportsAroundOrigin = await getAirportsAround(
    originAirport[0].CenterX,
    originAirport[0].CenterY,
    originAirport[0].id
  );

  const airportsAroundDestination = await getAirportsAround(
    destinationAirport[0].CenterX,
    destinationAirport[0].CenterY,
    destinationAirport[0].id
  );

  return {
    props: {
      flightDistanceData: flightDistanceData[0],
      relatedOriginAirports,
      relatedDestinationAirports: relatedDestinationAirports,
      originAirport: originAirport.length ? originAirport[0] : null,
      destinationAirport: destinationAirport.length
        ? destinationAirport[0]
        : null,
      airportsAroundDestination,
      airportsAroundOrigin,
    },
  };
};
