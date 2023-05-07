import type { GetServerSideProps, NextPage } from "next";
import { DistancePage } from "~/src/components/pages/DistancePage";
import { prisma } from "~/src/server/db";
import type { FlightDistanceType } from "~/src/utils/types";

const Distance: NextPage<{flightDistanceData: FlightDistanceType}> = (
  flightDistanceData
) => {
  return <DistancePage data={flightDistanceData.flightDistanceData} />;
};

export default Distance;

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id as string;

  console.log(id);

  const flightDistanceData = await prisma.$queryRawUnsafe<[FlightDistanceType]>(
    `SELECT 
    "LengthKm", 
    "OriginAirportName", 
    "DestinationAirportName", 
    "FlightDuration", 
    ST_X("OriginCoordinates"::geometry) as "OriginCenterX", 
    ST_Y("OriginCoordinates"::geometry) as "OriginCenterY", 
    ST_X("DestinationCoordinates"::geometry) as "DestinationCenterX", 
    ST_Y("DestinationCoordinates"::geometry) as "DestinationCenterY",
    "OriginCityName",
    "DestinationCityName", 
    "OriginCountryName",
    "DestinationCountryName",
    "OriginIata",
    "DestinationIata"
     FROM "FlyingRoutes" WHERE "id" = ${id}`
  );
  console.log(flightDistanceData);

  return {
    props: {
      flightDistanceData: flightDistanceData[0],
    },
  };
};
