import { prisma } from "~/src/server/db";
import type { FlightDistanceType } from "../types";

export const getFlightRoute = async (id: number) =>
  await prisma.$queryRawUnsafe<[FlightDistanceType]>(
    `SELECT 
    "LengthKm", 
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
    "DestinationCountryName",
    "OriginIata",
    "DestinationIata"
     FROM "FlyingRoutes" WHERE "id" = ${id}`
  );
