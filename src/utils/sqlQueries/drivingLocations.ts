import { prisma } from "~/src/server/db";

export const getDrivingLocationsData = async (condition: string) =>
  await prisma.$queryRawUnsafe<
    [
      {
        RegionFromCityName: string;
        RegionToCityName: string;
      }
    ]
  >(
    `SELECT DISTINCT
     r."RegionFromCityName",
     r."RegionToCityName"
     FROM "DrivingRoutes" r INNER JOIN "AdminRegions" a ${condition}`
  );
