import { CsvParser } from "../baseParsers/CsvParser";
import { type PrismaTransactionClient } from "../baseParsers/Parser";

export class AirportsCsvParser extends CsvParser<AirportsCsvProperties> {
  handleElement: (
    element: AirportsCsvProperties,
    transactionClient: PrismaTransactionClient
  ) => Promise<void>;

  constructor(
    handleElement: (
      element: AirportsCsvProperties,
      transactionClient: PrismaTransactionClient
    ) => Promise<void>
  ) {
    super("airports_description.csv");
    this.handleElement = handleElement;
  }

  async setupDatabase(
    _transactionClient: PrismaTransactionClient
  ): Promise<void> {
    return Promise.resolve();
  }

  async saveElement(
    element: AirportsCsvProperties,
    transactionClient: PrismaTransactionClient
  ): Promise<void> {
    return this.handleElement(element, transactionClient);
  }
}

export interface AirportsCsvProperties {
  "ID,N,5,0": string;
  intro_en: string;
  seo_title_en: string;
  seo_description_en: string;
}
