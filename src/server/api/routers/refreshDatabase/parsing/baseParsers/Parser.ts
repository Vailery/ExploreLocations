import { type PrismaClient } from "@prisma/client";

export type PrismaTransactionClient = Omit<
  PrismaClient,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use"
>;

export abstract class Parser {
  abstract parse(transactionClient: PrismaTransactionClient): Promise<void>;
}
