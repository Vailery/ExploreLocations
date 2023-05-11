import { prisma } from "~/src/server/db";
import type { AirportItem, RegionType } from "../types";

export const getAdminRegions = async (param?: string) =>
  await prisma.$queryRawUnsafe<RegionType[]>(
    `SELECT "id", "Code", "Country", "CountryI2", "Name", "TypeLocal", "TypeEn", "Type", "Points", "Points2" FROM "AdminRegions" ${
      param || ""
    }`
  );

export const getAirportsInRegion = async (param: string) =>
  await prisma.$queryRawUnsafe<
    AirportItem[]
  >(`SELECT ST_X(a."Center"::geometry) as "CenterX", ST_Y(a."Center"::geometry) as "CenterY", a."Passengers", a."Name", a."Type", a."IATA", a."ICAO", a."City", a."Country", "IntroEn", "SeoTitleEn", "SeoDescriptionEn"
    FROM "Airports" a
    INNER JOIN "AdminRegions" r
    ${param}`);

export const getAirportsInRegionCount = async (param: string) =>
  await prisma.$queryRawUnsafe<[{ count: bigint }]>(
    `SELECT COUNT(*) FROM "Airports" a
    INNER JOIN "AdminRegions" r
    ${param}`
  );
