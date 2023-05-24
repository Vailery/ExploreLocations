import { prisma } from "~/src/server/db";

const a = async () => {
  const airportNames = await prisma.$queryRawUnsafe<
    { OriginAirportName: string }[]
  >(
    `
  SELECT DISTINCT
     r."RegionFromCityName",
     r."RegionToCityName"
     FROM "DrivingRoutes" r INNER JOIN "AdminRegions" a 
     ON (
      SELECT a."Country" 
      FROM "DrivingRoutes" r INNER JOIN "AdminRegions" a
      ON r."CountryFromName" = a."Country"
      ORDER BY "Type", CAST("Points" AS INTEGER) DESC LIMIT 20
     ) LIMIT 5`
  );

  console.log(airportNames);
};

export default a;
