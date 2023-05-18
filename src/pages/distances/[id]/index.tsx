import type { GetServerSideProps, NextPage } from "next";
import { DistancePage } from "~/src/components/pages/DistancePage";
import { getFlightRoute } from "~/src/utils/sqlQueries/flightRoutes";
import type { FlightDistanceType } from "~/src/utils/types";

const Distance: NextPage<{ flightDistanceData: FlightDistanceType }> = (
  flightDistanceData
) => {
  return <DistancePage data={flightDistanceData.flightDistanceData} />;
};

export default Distance;

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id as string;

  const flightDistanceData = await getFlightRoute(+id);

  const originAirportName = flightDistanceData[0].OriginAirportName;
  const destinationAirportName = flightDistanceData[0].DestinationAirportName;

  console.log(originAirportName, destinationAirportName);

  // const originAirport = await getAirports(
  //   `WHERE 'Name' = '${originAirportName}'`
  // );
  // const destinationAirport = await getAirports(
  //   `WHERE 'Name' = '${destinationAirportName}'`
  // );

  // console.log(originAirport, destinationAirport);

  return {
    props: {
      flightDistanceData: flightDistanceData[0],
    },
  };
};
