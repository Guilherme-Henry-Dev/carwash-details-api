import dotenv from "dotenv";
dotenv.config();

export const env = {
    port: process.env.PORT || 3333,
    jwtSecret: process.env.JWT_SECRET || "default_secret",
    dbUrl: process.env.DARABASE_URL as string,
};