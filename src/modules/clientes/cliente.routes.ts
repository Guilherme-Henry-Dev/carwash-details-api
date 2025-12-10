import { Router } from "express";
import { ClienteController } from "./cliente.controller";

const router = Router();
const controller = new ClienteController();

router.post("/", controller.create);
router.get("/", controller.findAll);
router.get("/:id", controller.findOne);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
