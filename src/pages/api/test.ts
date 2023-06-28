import { prisma } from "~/src/server/db";

const a = async () => {
  const airportNames = await prisma.$queryRawUnsafe<
    { OriginAirportName: string }[]
  >(
    `
SELECT COUNT(*) from "Regions" WHERE ST_X("Center"::geometry) isNull
`
  );

  console.log(airportNames);
};

export default a;
