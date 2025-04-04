import { PrismaClient } from "@prisma/client";
import { env } from "./env";

// PrismaClientのインスタンスを作成
export const prisma = new PrismaClient({
  log: ["query"],
  datasources: {
    db: {
      url: env.DATABASE_URL,
    },
  },
});
