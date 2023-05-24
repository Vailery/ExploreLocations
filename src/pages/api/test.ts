import { prisma } from "~/src/server/db";

const a = async () => {
  const airportNames = await prisma.$queryRawUnsafe<
    { OriginAirportName: string }[]
  >(
    `
  SELECT "" LIMIT 5`
  );

  console.log(airportNames);
};

export default a;
