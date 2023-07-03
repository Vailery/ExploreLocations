import { prisma } from "~/src/server/db";

const a = async () => {
  const airportNames = await prisma.$queryRawUnsafe<
    { OriginAirportName: string }[]
  >(
    `
SELECT COUNT(*) from "DrivingRoutes" WHERE "RegionFromCityId" isNull
`
  );

  console.log(airportNames);
};

export default a;
