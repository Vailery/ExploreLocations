import { GeoJsonParser } from "../baseParsers/GeoJsonParser";
import { type PrismaTransactionClient } from "../baseParsers/Parser";

export class AirportsGeoJsonParser extends GeoJsonParser<AirportsGeoJsonProperties> {
  handleElement: (
    properties: AirportsGeoJsonProperties,
    geoJson: string,
    transactionClient: PrismaTransactionClient
  ) => Promise<void>;

  constructor(
    handleElement: (
      properties: AirportsGeoJsonProperties,
      geoJson: string,
      transactionClient: PrismaTransactionClient
    ) => Promise<void>
  ) {
    super("airports.geojson");
    this.handleElement = handleElement;
  }

  async setupDatabase(
    _transactionClient: PrismaTransactionClient
  ): Promise<void> {
    return Promise.resolve();
  }

  saveElement(
    properties: AirportsGeoJsonProperties,
    geoJson: string,
    transactionClient: PrismaTransactionClient
  ): Promise<void> {
    return this.handleElement(properties, geoJson, transactionClient);
  }
}

export interface AirportsGeoJsonProperties {
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
