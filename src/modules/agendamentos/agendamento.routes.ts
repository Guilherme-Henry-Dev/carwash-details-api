import { Router } from "express";
import { AgendamentoController } from "./agendamento.controller";

const router = Router();
const controller = new AgendamentoController();

router.post("/", controller.create);
router.get("/", controller.findAll);
router.get("/:id", controller.findOne);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);
router.patch("/:id/status", controller.updateStatus);
router.get("/dashboard", controller.dashboard);


export default router;
