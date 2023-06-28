import type Chain from "stream-chain";
import { type Readable } from "stream";
import { type PrismaTransactionClient } from "./Parser";
import { StreamParser } from "./StreamParser";

export abstract class PipelineParser extends StreamParser {
  async save(
    stream: Readable,
    transactionClient: PrismaTransactionClient
  ): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      const promises: Promise<void>[] = [];

      const pipeline = this.buildChain(stream);

      const maxConcurent = 100;
      let currentlyProcessingElements = 0;
      pipeline.on("data", (data) => {
        if (++currentlyProcessingElements >= maxConcurent) {
          pipeline.pause();
        }
        promises.push(
          (async () => {
            try {
              await this.saveGenericElement(data, transactionClient);
            } catch (err) {
              console.error("error caught in parsing");
              console.error(err);
              pipeline.destroy();
              reject(err);
            } finally {
              if (--currentlyProcessingElements < maxConcurent) {
                pipeline.resume();
              }
            }
          })()
        );
      });
      pipeline.on("end", () => {
        void Promise.all(promises).then(() => {
          resolve();
        });
      });
      pipeline.on("error", (err) => {
        console.error("error in parsing");
        console.error(err);
        reject(err);
      });
    });
  }

  abstract buildChain(stream: Readable): Chain;

  abstract saveGenericElement(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any,
    transactionClient: PrismaTransactionClient
  ): Promise<void>;
}
