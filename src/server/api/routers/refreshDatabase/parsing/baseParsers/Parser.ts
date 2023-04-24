import { type PrismaClient } from "@prisma/client";
import { s3 } from "~/src/server/s3";
import fs from "fs";

import { type Readable } from "stream";

export type PrismaTransactionClient = Omit<
  PrismaClient,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use"
>;

export abstract class Parser {
  sourceFileName: string;

  constructor(sourceFileName: string) {
    this.sourceFileName = sourceFileName;
  }

  async parse(transactionClient: PrismaTransactionClient): Promise<void> {
    let stream: Readable;
    if (process.env.LOCAL_DATABASE_SOURCES_FILES_FOLDER !== undefined) {
      const filePath =
        process.env.LOCAL_DATABASE_SOURCES_FILES_FOLDER +
        "/" +
        this.sourceFileName;

      stream = fs.createReadStream(filePath);
    } else {
      stream = (
        await s3.getObject({
          Bucket: "database-sources-1",
          Key: this.sourceFileName,
        })
      ).Body as Readable;
    }

    await this.setupDatabase(transactionClient);
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
