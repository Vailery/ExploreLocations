import { type PrismaTransactionClient } from "./baseParsers/Parser";
import { GeoJsonParser } from "./baseParsers/GeoJsonParser";

export class CountriesParser extends GeoJsonParser<CountryGeoJsonProperties> {
  constructor() {
    super("countries.geojson");
  }

  async setupDatabase(
    transactionClient: PrismaTransactionClient
  ): Promise<void> {
    await transactionClient.$executeRaw`TRUNCATE TABLE "Countries"`;
  }

  async saveElement(
    element: CountryGeoJsonProperties,
    geoJson: string,
    transactionClient: PrismaTransactionClient
  ): Promise<void> {
    await transactionClient.$executeRaw`INSERT INTO "Countries" 
      ("id", "Geometry", "Name", "Code") 
      VALUES 
      (${element.ID},
        ST_SetSRID(
          ST_GeomFromGeoJSON(${geoJson}), 
          4326
        ),
        ${element.NAME}, 
        ${element.CODE}
      )`;
  }
}

interface CountryGeoJsonProperties {
  ID: number;
  NAME: string;
  CODE: string;
}
