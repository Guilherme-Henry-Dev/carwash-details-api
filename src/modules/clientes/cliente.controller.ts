import { Request, Response } from "express";
import { ClienteService } from "./cliente.service";

const service = new ClienteService();

export class ClienteController {
  async create(req: Request, res: Response) {
    try {
      const result = await service.create(req.body);
      return res.status(201).json(result);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: "Erro ao criar cliente." });
    }
  }

  async findAll(req: Request, res: Response) {
    const result = await service.findAll();
    return res.json(result);
  }

  async findOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    const result = await service.findOne(id);

    if (!result) {
      return res.status(404).json({ error: "Cliente não encontrado." });
    }

    return res.json(result);
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result = await service.update(id, req.body);
      return res.json(result);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: "Erro ao atualizar cliente." });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await service.delete(id);
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: "Erro ao excluir cliente." });
    }
  }
}
