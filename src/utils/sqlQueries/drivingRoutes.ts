import { prisma } from "~/src/server/db";
import type { DrivingDistanceType } from "../types";

export const getDrivingRouteData = async (param: string) =>
  await prisma.$queryRawUnsafe<[DrivingDistanceType]>(
    `SELECT 
    "id",
    "DistanceKm", 
    "DistanceMiles",
    "FlightDistance",
    "FlightDistanceMiles",
    "DrivingTime", 
    "RegionFromCityName",
    "RegionToCityName",
    "CountryFromName",
    "CountryToName",
    ST_X("RegionFromCoordinates"::geometry) as "OriginCenterX", 
    ST_Y("RegionFromCoordinates"::geometry) as "OriginCenterY", 
    ST_X("RegionToCoordinates"::geometry) as "DestinationCenterX", 
    ST_Y("RegionToCoordinates"::geometry) as "DestinationCenterY"
    FROM "DrivingRoutes" ${param}`
  );

export const getDrivingRoute = async (from:string, to: string) =>
  await getDrivingRouteData(`WHERE LOWER("RegionFromCityName") = '${from.toLowerCase()}' AND LOWER("RegionToCityName") = '${to.toLowerCase()}'`);

export const getDrivingDistances = async (country: string, id: number) =>
  await getDrivingRouteData(
    `WHERE LOWER("RegionFromCityName") = '${country.toLowerCase()}' AND "id" != '${id}' LIMIT 20`
  );
