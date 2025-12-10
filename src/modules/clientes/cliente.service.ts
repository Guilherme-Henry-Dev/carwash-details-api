import { prisma } from "../../prisma/client";
import { CreateClienteDTO } from "./dto/createCliente.dto";
import { UpdateClienteDTO } from "./dto/updateCliente.dto";

export class ClienteService {
  async create(data: CreateClienteDTO) {
    return prisma.cliente.create({
      data,
    });
  }

  async findAll() {
    return prisma.cliente.findMany({
      orderBy: { id: "asc" },
    });
  }

  async findOne(id: number) {
    return prisma.cliente.findUnique({
      where: { id },
      include: {
        veiculos: true,
      },
    });
  }

  async update(id: number, data: UpdateClienteDTO) {
    return prisma.cliente.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.cliente.delete({
      where: { id },
    });
  }
}
