import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/src/server/api/trpc";
import {
  getAirportsInRegion,
  getAirportsInRegionCount,
} from "~/src/utils/sqlQueries/adminRegions";
import { getAirports } from "~/src/utils/sqlQueries/airports";

export const airportRouter = createTRPCRouter({
  getAirport: publicProcedure
    .input(z.object({ airport: z.number() }))
    .query(async ({ input }) => {
      const result = await getAirports(`WHERE "id" = '${input.airport}'`);
      return result[0] || null;
    }),

  getAirportsSort: publicProcedure
    .input(
      z.object({
        type: z.string(),
        country: z.string(),
        offset: z.number(),
        limit: z.number(),
      })
    )
    .query(async ({ input }) => {
      const filteredAirports = await getAirportsInRegion(
        `ON ST_Intersects(a."Center", r."Geometry") and r."Country" = '${
          input.country
        }'${input.type !== "all" ? ` and a."Type" = '${input.type}'` : ""}
        ORDER BY COALESCE(CAST(a."Passengers" AS INTEGER), 0) DESC  LIMIT '${
          input.limit
        }' OFFSET '${input.offset}'`
      );

      const airportsCount = await getAirportsInRegionCount(
        `ON ST_Intersects(a."Center", r."Geometry") and r."Country" = '${
          input.country
        }'${input.type !== "all" ? ` and a."Type" = '${input.type}'` : ""}`
      );

      return {
        airports: filteredAirports,
        count: Number(airportsCount[0].count),
      };
    }),
});
