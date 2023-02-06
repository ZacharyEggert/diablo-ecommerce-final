import { PrismaClient } from "@prisma/client";
import { Client, Environment } from "square";

import { env } from "../env/server.mjs";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
  square: Client;
};

export const square =
  globalForPrisma.square ||
  new Client({
    accessToken: env.SQUARE_ACCESS_TOKEN,
    environment: Environment.Sandbox,
    customUrl: env.SQUARE_CUSTOM_URL,
  });

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.square = square;
}
