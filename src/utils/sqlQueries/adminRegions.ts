import { prisma } from "~/src/server/db";
import type { AirportItem, AirportsCountType, RegionType } from "../types";

export const getAdminRegions = async (param?: string) =>
  await prisma.$queryRawUnsafe<RegionType[]>(
    `SELECT "id", "Code", "Country", "CountryI2", "Name", "TypeLocal", "TypeEn", "Type", "Points", "Points2" FROM "AdminRegions" ${
      param || ""
    }`
  );

export const getAirportsInRegion = async (param: string) =>
  await prisma.$queryRawUnsafe<
    AirportItem[]
  >(`SELECT ST_X(a."Center"::geometry) as "CenterX", ST_Y(a."Center"::geometry) as "CenterY", a."Passengers", a."id", a."Name", a."Type", a."IATA", a."ICAO", a."City", a."Country", "IntroEn", "SeoTitleEn", "SeoDescriptionEn"
    FROM "Airports" a
    INNER JOIN "AdminRegions" r
    ${param}`);

export const getAirportsInRegionCount = async (id: string, type: string) =>
  await prisma.$queryRawUnsafe<[{ count: bigint }]>(
    `SELECT COUNT(*) FROM "Airports" a
    INNER JOIN "AdminRegions" r ON ST_Intersects(a."Center", r."Geometry") AND a."Type" = '${type}' AND r."id" = '${
      id || ""
    }'`
  );

export const getAirportsCountData = async (id: string): Promise<AirportsCountType> => {
  const internationalAirports = Number(
    (await getAirportsInRegionCount(id, "international"))[0].count
  );
  const domesticAirports = Number(
    (await getAirportsInRegionCount(id, "domestic"))[0].count
  );
  const localAirports = Number(
    (await getAirportsInRegionCount(id, "local"))[0].count
  );

  return {
    international: internationalAirports,
    domestic: domesticAirports,
    local: localAirports,
    all: internationalAirports + domesticAirports + localAirports,
  };
};
