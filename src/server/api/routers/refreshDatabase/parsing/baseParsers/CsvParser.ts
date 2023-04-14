import { type Readable } from "stream";
import { chain } from "stream-chain";
import { type PrismaTransactionClient } from "./Parser";
import csv from "csv-parser";
import type Chain from "stream-chain";
import { PipelineParser } from "./PipelineParser";

export abstract class CsvParser<T> extends PipelineParser {
  buildChain(stream: Readable): Chain {
    const allowedEmptyColums = this.allowedEmptyColums();
    return chain([
      stream,
      csv({
        mapValues: ({ header, value }) => {
          if (header in allowedEmptyColums) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return value;
          }
          if (typeof value === "string") {
            if (value === "") {
              return undefined;
            }
            return value.trim();
          }
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return value;
        },
      }),
    ]);
  }

  async saveGenericElement(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any,
    transactionClient: PrismaTransactionClient
  ): Promise<void> {
    await this.saveElement(data as T, transactionClient);
  }

  abstract saveElement(
    properties: T,
    transactionClient: PrismaTransactionClient
  ): Promise<void>;

  //CVS parsing treats empty fields as empty string
  //but we want for it to be treated as undefined field, so we set custom `mapValues`
  //
  //in case we need to allow empty srtings in columns, list then in this function
  allowedEmptyColums(): string[] {
    return [];
  }
}
