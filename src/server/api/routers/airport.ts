import { Prisma } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/src/server/api/trpc";

export interface AirportItem {
  Name: string;
  IATA: string;
  ICAO: string;
  City: string;
  Country: string;
  CenterX: number;
  CenterY: number;
  Distance?: number;
}

export const airportRouter = createTRPCRouter({
  getAirport: publicProcedure
    .input(z.object({ airport: z.number() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.prisma.$queryRaw<[AirportItem]>(
        Prisma.sql`SELECT ST_X("Center"::geometry) as "CenterX", ST_Y("Center"::geometry) as "CenterY", "Name", "IATA", "ICAO", "City", "Country" FROM "Airports" WHERE "id" = ${input.airport}`
      );
      return result[0] || null;
    }),
});
