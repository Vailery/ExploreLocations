import { Prisma } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/src/server/api/trpc";
import type { AirportItem } from "~/src/utils/types";

export const airportRouter = createTRPCRouter({
  getAirport: publicProcedure
    .input(z.object({ airport: z.number() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.prisma.$queryRaw<[AirportItem]>(
        Prisma.sql`SELECT ST_X("Center"::geometry) as "CenterX", ST_Y("Center"::geometry) as "CenterY", "Name", "IATA", "ICAO", "City", "Country" FROM "Airports" WHERE "id" = ${input.airport}`
      );
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
    .query(async ({ ctx, input }) => {
      const filteredAirports = await ctx.prisma.$queryRawUnsafe<
        AirportItem[]
      >(`SELECT ST_X(a."Center"::geometry) as "CenterX", ST_Y(a."Center"::geometry) as "CenterY", a."id", a."Passengers", a."Name", a."Type", a."IATA", a."ICAO", a."City", a."Country"
        FROM "Airports" a
        INNER JOIN "AdminRegions" r
        ON ST_Intersects(a."Center", r."Geometry") and r."Country" = '${
          input.country
        }'${input.type !== "all" ? ` and a."Type" = '${input.type}'` : ""}
        ORDER BY a."Passengers" LIMIT '${input.limit}' OFFSET '${
        input.offset
      }'`);

      const airportsCount = await ctx.prisma.$queryRawUnsafe<
        [{ count: bigint }]
      >(
        `SELECT COUNT(*) FROM "Airports" a
          INNER JOIN "AdminRegions" r
          ON ST_Intersects(a."Center", r."Geometry") and r."Country" = '${
            input.country
          }'${input.type !== "all" ? ` and a."Type" = '${input.type}'` : ""}`
      );

      return {
        airports: filteredAirports,
        count: Number(airportsCount[0].count),
      };
    }),
});
