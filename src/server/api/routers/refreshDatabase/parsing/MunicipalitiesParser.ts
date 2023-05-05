import { type PrismaTransactionClient } from "./baseParsers/Parser";
import { GeoJsonParser } from "./baseParsers/GeoJsonParser";
import { Prisma } from "@prisma/client";

export class MunicipalitiesParser extends GeoJsonParser<MunicipalitiesGeoJsonProperties> {
  constructor() {
    super("municipalities_simplified.geojson");
  }

  async setupDatabase(
    transactionClient: PrismaTransactionClient
  ): Promise<void> {
    await transactionClient.$executeRaw`TRUNCATE TABLE "Municipalities"`;
  }

  async saveElement(
    element: MunicipalitiesGeoJsonProperties,
    geoJson: string,
    transactionClient: PrismaTransactionClient
  ): Promise<void> {
    console.log(element);
    await transactionClient.$executeRaw`INSERT INTO "Municipalities" 
      ("id", "Geometry", "Center", "Code", "Country", "CountryID", "ParentADM", "ParentDIS", "Name", "TypeLocal", "Type") 
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
        ${element.PARENT_DIS},
        ${element.NAME},
        ${element.TYPE_LOCAL},
        ${element.TYPE}
      )`;
  }
}

interface MunicipalitiesGeoJsonProperties {
  ID: number;
  CODE: string;
  COUNTRY: string;
  COUNTRY_ID: number;
  PARENT_ADM: string;
  PARENT_DIS: string;
  NAME: string;
  TYPE_LOCAL: string;
  TYPE: string;
  X_CENTRE: string;
  Y_CENTRE: string;
}
