import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const rawDbUrl = process.env.DATABASE_URL ?? "postgresql://postgres:12345@localhost:5432/carwash_details";
const dbUrl = String(rawDbUrl).trim().replace(/^"|"$/g, "");



let parsedPassword: string | undefined;
try {
	const parsed = new URL(dbUrl);
	parsedPassword = String(parsed.password);

	process.env.PGHOST = String(parsed.hostname);
	process.env.PGPORT = String(parsed.port || '5432');
	process.env.PGUSER = String(parsed.username);
	process.env.PGPASSWORD = String(parsed.password);
	process.env.PGDATABASE = String(parsed.pathname).replace(/^\//, '');

} catch (err) {
	console.log('DEBUG prisma - error parsing URL:', err && (err as Error).message);
}

const adapter = new PrismaPg({
	url: dbUrl,
});

export const prisma = new PrismaClient({
	adapter,
});