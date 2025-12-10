import { Request, Response } from 'express';
import { ServicoServices } from './servico.services';

const service = new ServicoServices();

export class ServicoController {
    async create (req: Request, res: Response) {
        try{
            const result = await service.create(req.body);
            return res.status(201).json(result);
        } catch (error){
            console.error(error);
            return res.status(500).json({ message: "Erro ao criar serviço" });
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
            return res.status(404).json({ error: "Serviço não encontrado." });
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
            return res.status(400).json({ error: "Erro ao atualizar serviço." });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            await service.delete(id);
            return res.status(204).send();

        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: "Erro ao deletar serviço." });
        }
    }
}