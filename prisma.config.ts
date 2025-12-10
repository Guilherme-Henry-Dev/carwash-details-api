export const prismaConfig = {
    schema: "./prisma/schema.prisma",
    datasource: {
        url: process.env.DATABASE_URL || "postgresql://postgres:12345@localhost:5432/carwash_details",
        provider: "postgresql",
    }
}