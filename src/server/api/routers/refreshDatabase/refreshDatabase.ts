import { AirportsParser } from "./parsing/AirportsParser";
// import { AdminRegionParser } from "./parsing/AdminRegioinsParser";
import {
  createTRPCRouter,
  // protectedProcedure,
  publicProcedure,
} from "../../trpc";
import { prisma } from "~/src/server/db";
import { type Parser } from "./parsing/baseParsers/Parser";
// import { CountriesParser } from "./parsing/CountriesParser";
// import { FlyingRoutesParser } from "./parsing/FlyingRoutesParser";

const parsers: Parser[] = [
  // new CountriesParser(),
  // new AdminRegionParser(),
  // new FlyingRoutesParser(),
  new AirportsParser(),
];

export const refreshDatabaseRouter = createTRPCRouter({
  //TODO(replace with `protectedProcedure`)
  getAwsFile: publicProcedure.query(async () => {
    await prisma.$transaction(
      async (transactionClient) => {
        for (const parser of parsers) {
          await parser.parse(transactionClient);
        }
      },
      { timeout: 600000 }
    );
    return {};
  }),
});
