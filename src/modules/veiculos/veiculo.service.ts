import { prisma } from "../../prisma/client";
import { CreateVeiculoDTO } from "./dto/createVeiculo.dto";
import { UpdateVeiculoDTO } from "./dto/updateVeiculos.dto";

export class VeiculoService {
  async create(data: CreateVeiculoDTO) {
    try {
      // opcional: valida cliente existe
      const clienteExists = await prisma.cliente.findUnique({
        where: { id: data.clienteId },
      });
      if (!clienteExists) {
        throw new Error("Cliente não encontrado");
      }

      const veiculo = await prisma.veiculo.create({
        data: {
          clienteId: data.clienteId,
          placa: data.placa.toUpperCase(),
          modelo: data.modelo,

        },
      });

      return veiculo;
    } catch (error) {
      console.error("VeiculoService.create error:", error);
      throw error;
    }
  }

  async findAll() {
    return prisma.veiculo.findMany({
      orderBy: { id: "asc" },
      include: { cliente: true },
    });
  }

  async findOne(id: number) {
    return prisma.veiculo.findUnique({
      where: { id },
      include: { cliente: true, agendamentos: true },
    });
  }

  async update(id: number, data: UpdateVeiculoDTO) {
    try {
      const payload: any = { ...data };
      if (payload.placa) payload.placa = payload.placa.toUpperCase();

      return await prisma.veiculo.update({
        where: { id },
        data: payload,
      });
    } catch (error) {
      console.error("VeiculoService.update error:", error);
      throw error;
    }
  }

  async delete(id: number) {
    try {
      return prisma.veiculo.delete({
        where: { id },
      });
    } catch (error) {
      console.error("VeiculoService.delete error:", error);
      throw error;
    }
  }
}