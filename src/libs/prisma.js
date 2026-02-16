import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

let connectionString = process.env.POSTGRES_PRISMA_URL ?? "";
if (connectionString && !connectionString.includes("sslmode=")) {
  connectionString += (connectionString.includes("?") ? "&" : "?") + "sslmode=require";
}
const adapter = new PrismaPg({ connectionString });
export const prisma = new PrismaClient({ adapter });
