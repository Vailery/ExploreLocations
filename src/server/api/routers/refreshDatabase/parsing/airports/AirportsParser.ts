import { Parser, type PrismaTransactionClient } from "../baseParsers/Parser";
import {
  AirportsCsvParser,
  type AirportsCsvProperties,
} from "./AirportsCsvParser";
import {
  AirportsGeoJsonParser,
  type AirportsGeoJsonProperties,
} from "./AirportsGeoJsonParser";

export class AirportsParser extends Parser {
  csvParser: AirportsCsvParser;
  geoJsonParser: AirportsGeoJsonParser;
  csvCache: { [key: number]: AirportsCsvProperties } = {};
  geoJsonCache: {
    [key: number]: { props: AirportsGeoJsonProperties; geoJson: string };
  } = {};

  constructor() {
    super();
    this.csvParser = new AirportsCsvParser((element, transactionClient) =>
      this.handleCsv(element, transactionClient)
    );
    this.geoJsonParser = new AirportsGeoJsonParser(
      (properties, geoJson, transactionClient) =>
        this.handleGeoJson(properties, geoJson, transactionClient)
    );
  }

  async parse(transactionClient: PrismaTransactionClient): Promise<void> {
    await transactionClient.$executeRaw`TRUNCATE TABLE "Airports"`;

    await Promise.all([
      this.csvParser.parse(transactionClient),
      this.geoJsonParser.parse(transactionClient),
    ]).then(() => {
      return;
    });

    if (Object.keys(this.csvCache).length !== 0) {
      console.log(JSON.stringify(Object.keys(this.csvCache)));
      throw Error("Have leftover csv values");
    }

    if (Object.keys(this.geoJsonCache).length !== 0) {
      console.log(JSON.stringify(Object.keys(this.geoJsonCache)));
      throw Error("Have leftover geojson values");
    }
  }

  async handleCsv(
    element: AirportsCsvProperties,
    transactionClient: PrismaTransactionClient
  ): Promise<void> {
    const id = parseInt(element["ID,N,5,0"]);
    const geoJsonData = this.geoJsonCache[id];

    if (geoJsonData !== undefined) {
      delete this.geoJsonCache[id];
      await this.saveAirport(
        element,
        geoJsonData.props,
        geoJsonData.geoJson,
        transactionClient
      );
    } else {
      this.csvCache[id] = element;
    }
  }

  async handleGeoJson(
    properties: AirportsGeoJsonProperties,
    geoJson: string,
    transactionClient: PrismaTransactionClient
  ): Promise<void> {
    const id = properties.ID;
    const csvData = this.csvCache[id];

    if (csvData !== undefined) {
      delete this.csvCache[id];
      await this.saveAirport(csvData, properties, geoJson, transactionClient);
    } else {
      this.geoJsonCache[id] = { props: properties, geoJson };
    }
  }

  async saveAirport(
    csvElement: AirportsCsvProperties,
    geoJsonProperties: AirportsGeoJsonProperties,
    geoJson: string,
    transactionClient: PrismaTransactionClient
  ): Promise<void> {
    await transactionClient.$executeRaw`INSERT INTO "Airports"
      ("id", "Geometry", "Center", "Name", "IntroEn", "SeoTitleEn", "SeoDescriptionEn", "Type", "AltName", "IATA", "ICAO", "Passengers", "NameDe", "NameEn", "NameEs", "NameFr", "NameIT", "NameNL", "Operator", "City", "Country", "ElFeet", "ElMeters", "Website", "Wiki", "TimezoneS", "TimezoneD")
      VALUES
      (${geoJsonProperties.ID},
        ST_SetSRID(
          ST_GeomFromGeoJSON(${geoJson}),
          4326
        ),
        ST_SetSRID(ST_MakePoint(cast(${geoJsonProperties.X_CENTROID} as double precision), cast(${geoJsonProperties.Y_CENTROID} as double precision)), 4326),
        ${geoJsonProperties.NAME},
        ${csvElement.intro_en},
        ${csvElement.seo_title_en},
        ${csvElement.seo_description_en},
        ${geoJsonProperties.TYPE}::"TypeOfAirport",
        ${geoJsonProperties.ALT_NAME},
        ${geoJsonProperties.IATA},
        ${geoJsonProperties.ICAO},
        ${geoJsonProperties.PASSENGERS},
        ${geoJsonProperties.NAME_DE},
        ${geoJsonProperties.NAME_EN},
        ${geoJsonProperties.NAME_ES},
        ${geoJsonProperties.NAME_FR},
        ${geoJsonProperties.NAME_IT},
        ${geoJsonProperties.NAME_NL},
        ${geoJsonProperties.OPERATOR},
        ${geoJsonProperties.CITY},
        ${geoJsonProperties.COUNTRY},
        ${geoJsonProperties.EL_FEET},
        ${geoJsonProperties.EL_METERS},
        ${geoJsonProperties.WEBSITE},
        ${geoJsonProperties.WIKI},
        ${geoJsonProperties.TIMEZONE_S},
        ${geoJsonProperties.TIMEZONE_D}
      )`;
  }
}
