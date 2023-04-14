import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/src/server/api/trpc";

interface Item {
  Name: string;
}

export const airportRouter = createTRPCRouter({
  getAirport: publicProcedure
    .input(z.object({ airport: z.number() }))
    .query(async ({ ctx, input }) => {
      const result =
        await // .$queryRaw`SELECT ST_X("Center"::geometry) as "centerX", ST_Y("Center"::geometry) as "centerY", "Name", "Type", "AltName", "IATA", "ICAO", "Passengers", "Operator", "City", "Country", "ElFeet", "ElMeters", "Website", "Wiki", "TimezoneS", "TimezoneD" FROM "Airports" WHERE "id" = ${input.airport}`;
        ctx.prisma.$queryRaw<
          Item[]
        >`SELECT "Name" FROM "Airports" WHERE "id" = ${input.airport}`;
      return result;
    }),
});
