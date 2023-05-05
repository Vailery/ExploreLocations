import { AdminRegionParser } from "./parsing/AdminRegioinsParser";
import {
  createTRPCRouter,
  // protectedProcedure,
  publicProcedure,
} from "../../trpc";
import { prisma } from "~/src/server/db";
import { type Parser } from "./parsing/baseParsers/Parser";
import { DistrictsParser } from "./parsing/DistrictsParser";
import { MunicipalitiesParser } from "./parsing/MunicipalitiesParser";
import { CitiesParser } from "./parsing/CitiesParser";
import { CountriesParser } from "./parsing/CountriesParser";
import { DrivingRoutesParser } from "./parsing/DrivingRoutesParser";
import { AirportsParser } from "./parsing/airports/AirportsParser";
import { FlyingRoutesParser } from "./parsing/FlyingRoutesParser";

const parsers: Parser[] = [
  new CountriesParser(),
  new AdminRegionParser(),
  new FlyingRoutesParser(),
  new DistrictsParser(),
  new AirportsParser(),
  new MunicipalitiesParser(),
  new CitiesParser(),
  new DrivingRoutesParser(),
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
      { timeout: 6000000 }
    );
    return {};
  }),
});
