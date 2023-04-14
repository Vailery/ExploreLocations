import { type PrismaTransactionClient } from "./baseParsers/Parser";
import { GeoJsonParser } from "./baseParsers/GeoJsonParser";

export class AdminRegionParser extends GeoJsonParser<AdminReginGeoJsonProperties> {
  constructor() {
    super("admin_regions_simplified.geojson");
  }

  async setupDatabase(
    transactionClient: PrismaTransactionClient
  ): Promise<void> {
    await transactionClient.$executeRaw`TRUNCATE TABLE "AdminRegions"`;
  }

  async saveElement(
    element: AdminReginGeoJsonProperties,
    geoJson: string,
    transactionClient: PrismaTransactionClient
  ): Promise<void> {
    console.log(element);
    await transactionClient.$executeRaw`INSERT INTO "AdminRegions"
        ("id", "Geometry", "Center", "Code", "Country", "CountryI2", "Name", "TypeLocal", "TypeEn", "Type", "Points", "Points2")
        VALUES
        (${element.ID},
          ST_SetSRID(
            ST_GeomFromGeoJSON(${geoJson}),
            4326
          ),
          ST_SetSRID(ST_MakePoint(cast(${element.X_CENTRE} as double precision), cast(${element.Y_CENTRE} as double precision)), 4326),
          ${element.CODE},
          ${element.COUNTRY},
          ${element.COUNTRY_I2},
          ${element.NAME},
          ${element.TYPE_LOCAL},
          ${element.TYPE_EN},
          ${element.TYPE},
          ${element.points},
          ${element.points2}
        )`;
  }
}

//TODO maybe emun from type
interface AdminReginGeoJsonProperties {
  ID: number;
  CODE: string;
  COUNTRY: string;
  COUNTRY_I2: number;
  NAME: string;
  TYPE_LOCAL: string;
  TYPE_EN: string;
  TYPE: string;
  X_CENTRE: string;
  Y_CENTRE: string;
  points: string;
  points2: string;
}
