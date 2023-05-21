import { prisma } from "~/src/server/db";
import type { CityType } from "../types";

export const getCities = async (param?: string) =>
  await prisma.$queryRawUnsafe<[CityType]>(
    `SELECT 
    "id", ST_X("Geometry"::geometry) as "CenterX", ST_Y("Geometry"::geometry) as "CenterY", "Name", "Type", "NameAlt", "Country", "ISO2", "ISO3", "ParentADM", "Capital", "Population"
    FROM "Cities" ${param || ""}`
  );