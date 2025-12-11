import express from "express";
import { swaggerRoutes } from "./swagger.routes";

const app = express();

app.use("/docs", swaggerRoutes);
