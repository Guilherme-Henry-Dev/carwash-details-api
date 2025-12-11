import { Request, Response } from "express";
import { AgendamentoService } from "./agendamento.service";

const service = new AgendamentoService();

export class AgendamentoController {
    async create (req: Request, res: Response) {
        try {
            const result = await service.create(req.body);
            return res.status(201).json(result);
        } catch (error: any) {
            if ( error.message.includes("não encontrado") ){
                return res.status(404).json({  message: error.message });
            }
            return res.status(500).json({  message: "Erro ao criar agendamento" })
        }
    }

    async findAll (req: Request, res: Response) {
        try {
            const result = await service.findAll();
            return res.status(200).json(result);
        } catch (error){
            console.error(error);
            return res.status(500).json({  message: "Erro ao listar agendamento" });
        }
    }

    async findOne (req: Request, res: Response){
        try {
            const id = Number(req.params.id);
            const result = await service.findOne(id);
            if (!result) return res.status(404).json({ message: "Agendamento não encontrado" });
            return res.json(result);
        } catch {
            return res.status(500).json({  message: "Erro ao listar agendamento" });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const result = await service.update(id, req.body);
            return res.json(result);
        } catch {
            return res.status(400).json({ message: "Erro ao atualizar agendamento" });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            await service.delete(id);
            return res.status(204).send();
        } catch {
            return res.status(400).json({ message: "Erro ao excluir agendamento" });
        }
  }

}