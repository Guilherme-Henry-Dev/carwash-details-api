import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerConfig } from "../swagger/swagger.config";

export const swaggerRoutes = Router();

swaggerRoutes.use("/", swaggerUi.serve);
swaggerRoutes.get("/", swaggerUi.setup(swaggerConfig));
