import { prisma } from "~/src/server/db";

const a = async () => {
  const airportNames = await prisma.$queryRawUnsafe<
    { OriginAirportName: string }[]
  >(
    `
SELECT "id", "Name", "Type" from "Regions" WHERE "Name" = 'Turkey'
`
  );

  console.log(airportNames);
};

export default a;
