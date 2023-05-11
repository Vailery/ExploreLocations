import { prisma } from "~/src/server/db";
import type { DrivingDistanceType } from "../types";

export const getDrivingRoute = async (id: number) =>
  await prisma.$queryRawUnsafe<[DrivingDistanceType]>(
    `SELECT 
    "DistanceKm", 
    "DrivingTime", 
    "RegionFromCityName",
    "RegionToCityName",
    "CountryFromName",
    "CountryToName",
    ST_X("RegionFromCoordinates"::geometry) as "OriginCenterX", 
    ST_Y("RegionFromCoordinates"::geometry) as "OriginCenterY", 
    ST_X("RegionToCoordinates"::geometry) as "DestinationCenterX", 
    ST_Y("RegionToCoordinates"::geometry) as "DestinationCenterY"
    FROM "DrivingRoutes" WHERE "id" = ${id}`
  );
