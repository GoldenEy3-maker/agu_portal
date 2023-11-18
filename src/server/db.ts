import { PrismaClient } from "@prisma/client"

import { env } from "~/env.mjs"

const globalForPrisma = globalThis as typeof global & {
  prisma: PrismaClient | undefined
}

export const db: PrismaClient =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db
