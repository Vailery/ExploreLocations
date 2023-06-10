import { prisma } from "~/src/server/db";

const a = async () => {
  const airportNames = await prisma.$queryRawUnsafe<
    { OriginAirportName: string }[]
  >(
    `
  SELECT "Name" from "Airports" WHERE "id" = 457`
  );

  console.log(airportNames);
};

export default a;
