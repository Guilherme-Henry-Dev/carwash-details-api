import { prisma } from "../../prisma/client";
import { CreateServicoDTO } from "./dto/createServico.dto";
import { UpdateServicoDTO } from "./dto/updateServico.dto";

export class ServicoServices {
    async create (data: CreateServicoDTO){
        return prisma.servico.create({
            data,
        });
    }

    async findAll (){
        return prisma.servico.findMany({
            orderBy: {id: "asc"}
        });
    }

    async findOne (id: number){
        return prisma.servico.findUnique({
        where: { id },
        });
    }

    async update(id: number, data: UpdateServicoDTO) {
        return prisma.servico.update({
        where: { id },
        data,
        });
    }

    async delete(id: number) {
        return prisma.servico.delete({
        where: { id },
        });
    }
}