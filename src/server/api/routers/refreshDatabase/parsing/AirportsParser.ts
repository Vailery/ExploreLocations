import { type PrismaTransactionClient } from "./baseParsers/Parser";
import { GeoJsonParser } from "./baseParsers/GeoJsonParser";

export class AirportsParser extends GeoJsonParser<AirportsGeoJsonProperties> {
  constructor() {
    super("airports.geojson");
  }

  async setupDatabase(
    transactionClient: PrismaTransactionClient
  ): Promise<void> {
    await transactionClient.$executeRaw`TRUNCATE TABLE "Airports"`;
  }

  async saveElement(
    element: AirportsGeoJsonProperties,
    geoJson: string,
    transactionClient: PrismaTransactionClient
  ): Promise<void> {
    await transactionClient.$executeRaw`INSERT INTO "Airports"
      ("id", "Geometry", "Center", "Name", "Type", "AltName", "IATA", "ICAO", "Passengers", "NameDe", "NameEn", "NameEs", "NameFr", "NameIT", "NameNL", "Operator", "City", "Country", "ElFeet", "ElMeters", "Website", "Wiki", "TimezoneS", "TimezoneD")
      VALUES
      (${element.ID},
        ST_SetSRID(
          ST_GeomFromGeoJSON(${geoJson}),
          4326
        ),
        ST_SetSRID(ST_MakePoint(cast(${element.X_CENTROID} as double precision), cast(${element.Y_CENTROID} as double precision)), 4326),
        ${element.NAME},
        ${element.TYPE}::"TypeOfAirport",
        ${element.ALT_NAME},
        ${element.IATA},
        ${element.ICAO},
        ${element.PASSENGERS},
        ${element.NAME_DE},
        ${element.NAME_EN},
        ${element.NAME_ES},
        ${element.NAME_FR},
        ${element.NAME_IT},
        ${element.NAME_NL},
        ${element.OPERATOR},
        ${element.CITY},
        ${element.COUNTRY},
        ${element.EL_FEET},
        ${element.EL_METERS},
        ${element.WEBSITE},
        ${element.WIKI},
        ${element.TIMEZONE_S},
        ${element.TIMEZONE_D}
      )`;
  }
}

interface AirportsGeoJsonProperties {
  ID: number;
  NAME: string;
  TYPE: string;
  ALT_NAME: string;
  IATA: string;
  ICAO: string;
  PASSENGERS: string;
  NAME_DE: string;
  NAME_EN: string;
  NAME_ES: string;
  NAME_FR: string;
  NAME_IT: string;
  NAME_NL: string;
  OPERATOR: string;
  CITY: string;
  COUNTRY: string;
  EL_FEET: number;
  EL_METERS: number;
  WEBSITE: string;
  WIKI: string;
  TIMEZONE_S: string;
  TIMEZONE_D: string;
  Y_CENTROID: string;
  X_CENTROID: string;
}
