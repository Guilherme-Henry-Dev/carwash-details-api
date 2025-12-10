import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
	url:
		process.env.DATABASE_URL ||
		"postgresql://postgres:12345@localhost:5432/carwash_details",
});

export const prisma = new PrismaClient({
	adapter,
});