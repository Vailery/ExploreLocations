import { prisma } from "~/src/server/db";
import type { FlightDistanceType } from "../types";

export const getFlightRouteData = async (condition: string) =>
  await prisma.$queryRawUnsafe<[FlightDistanceType]>(
    `SELECT 
    "id",
    "LengthKm", 
    "LengthMiles",
    "OriginAirportName", 
    "DestinationAirportName", 
    "DestinationAirportId",
    "OriginAirportId",
    "FlightDuration", 
    ST_X("OriginCoordinates"::geometry) as "OriginCenterX", 
    ST_Y("OriginCoordinates"::geometry) as "OriginCenterY", 
    ST_X("DestinationCoordinates"::geometry) as "DestinationCenterX", 
    ST_Y("DestinationCoordinates"::geometry) as "DestinationCenterY",
    "OriginCityName",
    "DestinationCityName", 
    "OriginCountryName",
    "OriginCountryId",
    "DestinationCountryName",
    "DestinationCountryId",
    "OriginIata",
    "DestinationIata"
     FROM "FlyingRoutes" ${condition}`
  );

export const getFlightRoute = async (id: string) =>
  await getFlightRouteData(
    `WHERE "id" = '${id}'`
  );

export const getFlyingDistances = async (country: string, id: number) =>
  await getFlightRouteData(
    `WHERE LOWER("OriginCityName") = '${country.toLowerCase()}' AND "id" != '${id}' LIMIT 20`
  );
