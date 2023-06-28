import { refreshDatabaseRouter } from "./routers/refreshDatabase/refreshDatabase";
import { createTRPCRouter } from "~/src/server/api/trpc";
import { exampleRouter } from "~/src/server/api/routers/example";
import { airportRouter } from "./routers/airport";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  refreshDatabase: refreshDatabaseRouter,
  airport: airportRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
