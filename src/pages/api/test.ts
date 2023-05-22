import { prisma } from "~/src/server/db";

const a = async () => {
  const airportNames = await prisma.$queryRawUnsafe<
    { OriginAirportName: string }[]
  >(
    `SELECT
    "RegionFromCityName", "RegionToCityName"
    FROM "DrivingRoutes" WHERE "id" = '216309'
  `
  );
  console.log(airportNames);

  // const a = await prisma.$queryRawUnsafe<string[]>(`
  // SELECT a."Name" FROM "Airports" a INNER JOIN "FlyingRoutes" b ON a."AltName" = b."OriginAirportName"`);
  // console.log(a);
};

export default a;
