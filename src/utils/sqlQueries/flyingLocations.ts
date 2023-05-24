import { prisma } from "~/src/server/db";

export const getFLyingLocationsData = async (condition: string) =>
  await prisma.$queryRawUnsafe<
    [
      {
        OriginCityName: string;
        DestinationCityName: string;
      }
    ]
  >(
    `SELECT DISTINCT
     r."OriginCityName",
     r."DestinationCityName"
     FROM "FlyingRoutes" r INNER JOIN "AdminRegions" a ${condition}`
  );
