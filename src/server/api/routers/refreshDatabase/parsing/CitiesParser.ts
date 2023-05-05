import { type PrismaTransactionClient } from "./baseParsers/Parser";
import { GeoJsonParser } from "./baseParsers/GeoJsonParser";

export class CitiesParser extends GeoJsonParser<CitiesGeoJsonProperties> {
  constructor() {
    super("cities.geojson");
  }

  async setupDatabase(
    transactionClient: PrismaTransactionClient
  ): Promise<void> {
    await transactionClient.$executeRaw`TRUNCATE TABLE "Cities"`;
  }

  async saveElement(
    element: CitiesGeoJsonProperties,
    geoJson: string,
    transactionClient: PrismaTransactionClient
  ): Promise<void> {
    console.log(element);
    await transactionClient.$executeRaw`INSERT INTO "Cities" 
      ("id", "Geometry", "Name", "Type", "NameAlt", "Country", "ISO2", "ISO3", "ParentADM", "Capital", "Population") 
      VALUES 
      (${element.ID},
        ST_SetSRID(
          ST_GeomFromGeoJSON(${geoJson}), 
          4326
        ),
        ${element.name},
        ${element.type},
        ${element.name_alt},
        ${element.country},
        ${element.iso2},
        ${element.iso3},
        ${element.parent_adm},
        ${element.capital},
        ${element.population}
      )`;
  }
}

interface CitiesGeoJsonProperties {
  ID: number;
  name: string;
  type: string;
  name_alt: string;
  country: string;
  iso2: string;
  iso3: string;
  parent_adm: string;
  capital: string;
  population: string;
}
