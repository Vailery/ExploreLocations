import { prisma } from "~/src/server/db";
import type { AirportItem } from "../types";

export const getAirports = async (param?: string) =>
  await prisma.$queryRawUnsafe<[AirportItem]>(
    `SELECT "TimezoneD", ST_X("Center"::geometry) as "CenterX", ST_Y("Center"::geometry) as "CenterY", ST_AsGeoJSON("Geometry")::json as "Geometry", "Passengers", "Name", "Type", "IATA", "ICAO", "City", "Country", "IntroEn", "SeoTitleEn", "SeoDescriptionEn", "id" FROM "Airports" ${
      param || ""
    }`
  );

export const getAirportsAround = async (
  x: number,
  y: number,
  id: number,
  limit?: number
) => {
  const resultInFiveHundred = await getAirports(
    `WHERE "Type" = 'international' AND ST_DWithin("Center"::geometry, ST_MakePoint(${x}, ${y})::geography, 500000) AND "id" != ${id} ORDER BY POINT(ST_X("Center"::geometry), ST_Y("Center"::geometry)) <-> Point(${x}, ${y}) LIMIT ${
      limit || 20
    }`
  );
  if (resultInFiveHundred.length < 0) {
    const resultInThousand = await getAirports(
      `WHERE "Type" = 'international' AND ST_DWithin("Center"::geometry, ST_MakePoint(${x}, ${y})::geography, 1000000) AND "id" != ${id} ORDER BY POINT(ST_X("Center"::geometry), ST_Y("Center"::geometry)) <-> Point(${x}, ${y}) LIMIT ${
        limit || 20
      }`
    );
    return resultInThousand;
  } else {
    return resultInFiveHundred;
  }
};
