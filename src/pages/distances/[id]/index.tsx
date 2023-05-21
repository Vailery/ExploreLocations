import type { GetServerSideProps, NextPage } from "next";
import { DistancePage } from "~/src/components/pages/DistancePage";
import { getAirports } from "~/src/utils/sqlQueries/airports";
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
}

const Distance: NextPage<DistancesPageData> = ({
  flightDistanceData,
  relatedDestinationAirports,
  relatedOriginAirports,
  originAirport,
  destinationAirport,
}) => {
  return (
    <DistancePage
      data={flightDistanceData}
      relatedDestinationAirports={relatedDestinationAirports}
      relatedOriginAirports={relatedOriginAirports}
      originAirport={originAirport}
      destinationAirport={destinationAirport}
    />
  );
};

export default Distance;

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps<DistancesPageData> = async (
  context
) => {
  const id = context.query.id as string;

  const flightDistanceData = await getFlightRoute(+id);

  const relatedOriginAirports = await getFlyingDistances(
    flightDistanceData[0].OriginCityName,
    flightDistanceData[0].id
  );
  const relatedDestinationAirports = await getFlyingDistances(
    flightDistanceData[0].DestinationCityName,
    flightDistanceData[0].id
  );
  const originAirport = await getAirports(
    `WHERE "Name" = '${flightDistanceData[0].OriginAirportName}'`
  );
  const destinationAirport = await getAirports(
    `WHERE "Name" = '${flightDistanceData[0].DestinationAirportName}'`
  );

  return {
    props: {
      flightDistanceData: flightDistanceData[0],
      relatedOriginAirports: relatedOriginAirports,
      relatedDestinationAirports: relatedDestinationAirports,
      originAirport: originAirport.length ? originAirport[0] : null,
      destinationAirport: destinationAirport.length ? destinationAirport[0] : null,
    },
  };
};
