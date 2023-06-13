import { prisma } from "~/src/server/db";

const a = async () => {
  const airportNames = await prisma.$queryRawUnsafe<
    { OriginAirportName: string }[]
  >(
    `
  SELECT "id" from "Airports" WHERE "Country" = NULL`
  );
  
  console.log(airportNames);
  const airportName = await prisma.$queryRawUnsafe<
    { OriginAirportName: string }[]
  >(
    `
  SELECT "Country" from "Airports" WHERE "id" = 874`
  );

  console.log(airportName);

};

export default a;
