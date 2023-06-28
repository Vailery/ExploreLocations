import { type PrismaTransactionClient } from "./baseParsers/Parser";
import { GeoJsonParser } from "./baseParsers/GeoJsonParser";

export class DistrictsParser extends GeoJsonParser<DistrictsGeoJsonProperties> {
  constructor() {
    super("districts_simplified.geojson");
  }

  async setupDatabase(
    transactionClient: PrismaTransactionClient
  ): Promise<void> {
    await transactionClient.$executeRaw`TRUNCATE TABLE "Districts"`;
  }

  async saveElement(
    element: DistrictsGeoJsonProperties,
    geoJson: string,
    transactionClient: PrismaTransactionClient
  ): Promise<void> {
    console.log(element);
    await transactionClient.$executeRaw`INSERT INTO "Districts" 
      ("id", "Geometry", "Center", "Code", "Country", "CountryID", "ParentADM", "Name", "TypeLocal", "TypeEn", "Type") 
      VALUES 
      (${element.ID},
        ST_SetSRID(
          ST_GeomFromGeoJSON(${geoJson}), 
          4326
        ),
        ST_SetSRID(ST_MakePoint(cast(${element.X_CENTRE} as double precision), cast(${element.Y_CENTRE} as double precision)), 4326),
        ${element.CODE},
        ${element.COUNTRY},
        ${element.COUNTRY_ID},
        ${element.PARENT_ADM},
        ${element.NAME},
        ${element.TYPE_LOCAL},
        ${element.TYPE_EN},
        ${element.TYPE}
      )`;
  }
}

interface DistrictsGeoJsonProperties {
  ID: number;
  CODE: string;
  COUNTRY: string;
  COUNTRY_ID: number;
  PARENT_ADM: string;
  NAME: string;
  TYPE_LOCAL: string;
  TYPE_EN: string;
  TYPE: string;
  X_CENTRE: string;
  Y_CENTRE: string;
}
