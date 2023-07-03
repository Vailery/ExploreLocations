import { prisma } from "~/src/server/db";

const a = async () => {
  const airportNames = await prisma.$queryRawUnsafe<
    { OriginAirportName: string }[]
  >(
    `
SELECT "id" from "Cities" WHERE "Name" = 'Derby'
`
  );

  console.log(airportNames);
};

export default a;
