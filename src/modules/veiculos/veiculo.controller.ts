import { Request, Response } from "express";
import { VeiculoService } from "./veiculo.service";

const service = new VeiculoService();

export class VeiculoController {
  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const veiculo = await service.create(data);
      return res.status(201).json(veiculo);
    } catch (error: any) {
      console.error("VeiculoController.create error:", error);
      if (error.message === "Cliente não encontrado") {
        return res.status(404).json({ message: error.message });
      }
      if (error.code === "P2002") {
        return res.status(409).json({ message: "Placa já cadastrada." });
      }
      return res.status(400).json({ message: "Erro ao criar veículo" });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const veiculos = await service.findAll();
      return res.json(veiculos);
    } catch (error) {
      console.error("VeiculoController.findAll error:", error);
      return res.status(500).json({ message: "Erro ao listar veículos" });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const veiculo = await service.findOne(id);
      if (!veiculo) return res.status(404).json({ message: "Veículo não encontrado" });
      return res.json(veiculo);
    } catch (error) {
      console.error("VeiculoController.findOne error:", error);
      return res.status(500).json({ message: "Erro ao buscar veículo" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = req.body;
      const veiculo = await service.update(id, data);
      return res.json(veiculo);
    } catch (error: any) {
      console.error("VeiculoController.update error:", error);
      if (error.code === "P2002") {
        return res.status(409).json({ message: "Placa já cadastrada" });
      }
      return res.status(400).json({ message: "Erro ao atualizar veículo" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await service.delete(id);
      return res.status(204).send();
    } catch (error) {
      console.error("VeiculoController.delete error:", error);
      return res.status(400).json({ message: "Erro ao excluir veículo" });
    }
  }
}
