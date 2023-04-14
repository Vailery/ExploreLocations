import { parser } from "stream-json";
import { pick } from "stream-json/filters/Pick";
import { chain } from "stream-chain";
import type Chain from "stream-chain";
import { streamArray } from "stream-json/streamers/StreamArray";
import { type Readable } from "stream";
import { type PrismaTransactionClient } from "./Parser";
import { PipelineParser } from "./PipelineParser";

export abstract class GeoJsonParser<T> extends PipelineParser {
  buildChain(stream: Readable): Chain {
    return chain([
      stream,
      parser(),
      pick({ filter: "features" }),
      streamArray(),
    ]);
  }

  async saveGenericElement(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any,
    transactionClient: PrismaTransactionClient
  ): Promise<void> {
    await this.saveElement(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      data.value.properties as T,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      data.value.geometry as string,
      transactionClient
    );
  }

  abstract saveElement(
    properties: T,
    geoJson: string,
    transactionClient: PrismaTransactionClient
  ): Promise<void>;
}
