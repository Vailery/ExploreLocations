import { s3 } from "~/src/server/s3";
import fs from "fs";

import { type Readable } from "stream";
import { Parser, type PrismaTransactionClient } from "./Parser";

export abstract class StreamParser extends Parser {
  sourceFilesNames: string[];

  constructor(...sourceFilesNames: string[]) {
    super();
    this.sourceFilesNames = sourceFilesNames;
  }

  async parse(transactionClient: PrismaTransactionClient): Promise<void> {
    await this.setupDatabase(transactionClient);

    await Promise.all(
      this.sourceFilesNames.map((sourceFileName) =>
        this._save(sourceFileName, transactionClient)
      )
    );
  }

  async _save(
    sourceFileName: string,
    transactionClient: PrismaTransactionClient
  ): Promise<void> {
    let stream: Readable;
    if (process.env.LOCAL_DATABASE_SOURCES_FILES_FOLDER !== undefined) {
      const filePath =
        process.env.LOCAL_DATABASE_SOURCES_FILES_FOLDER + "/" + sourceFileName;

      stream = fs.createReadStream(filePath);
    } else {
      stream = (
        await s3.getObject({
          Bucket: "database-sources-1",
          Key: sourceFileName,
        })
      ).Body as Readable;
    }

    await this.save(stream, transactionClient);
  }

  abstract save(
    stream: Readable,
    transactionClient: PrismaTransactionClient
  ): Promise<void>;

  abstract setupDatabase(
    transactionClient: PrismaTransactionClient
  ): Promise<void>;
}
