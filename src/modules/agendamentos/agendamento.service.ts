import { prisma } from "../../prisma/client";
import { CreateAgendamentoDTO } from "./dto/createAgendamentos.dto";
import { UpdateAgendamentoDTO } from "./dto/updateAgendamento.dto";

export class AgendamentoService { 
    async create(data: CreateAgendamentoDTO) {
        try {
            const [cliente, veiculo, servico] = await Promise.all([
                prisma.cliente.findUnique({ where: { id: data.clienteId } }),
                prisma.veiculo.findUnique({ where: { id: data.veiculoId } }),
                prisma.servico.findUnique({ where: { id: data.servicoId } })
            ]);

            if (!cliente) throw new Error("Cliente não encontrado");
            if (!veiculo) throw new Error("Veículo não encotrado");
            if (!servico) throw new Error("Serviço não encontrado");

            return await prisma.agendamento.create({
                data: {
                    clienteId: data.clienteId,
                    veiculoId: data.veiculoId,
                    servicoId: data.servicoId,
                    data: new Date(data.data),
                    observacao: data.observacao
                },
            });
        } catch (error) {
            console.error("AgendamentoService.create error:", error);
            throw error;
        }
    }

    async dashboard() {
        const total = await prisma.agendamento.count();

        const porStatus = await prisma.agendamento.groupBy({
            by: ["status"],
            _count: { status: true },
        });

        const topServicos = await prisma.agendamento.groupBy({
            by: ["servicoId"],
            _count: { servicoId: true },
            orderBy: { _count: { servicoId: "desc" } },
            take: 5,
        });

        const proximos = await prisma.agendamento.findMany({
            where: { data: { gte: new Date() } },
            orderBy: { data: "asc" },
            take: 5,
            include: { cliente: true, servico: true },
        });

        const inicioMes = new Date();
        inicioMes.setDate(1);

        const fimMes = new Date();
        fimMes.setMonth(fimMes.getMonth() + 1);
        fimMes.setDate(0);

        const porDia = await prisma.agendamento.groupBy({
            by: ["data"],
            where: {
                data: {
                    gte: inicioMes,
                    lte: fimMes,
                },
            },
            _count: true,
        });

        return {
            total,
            porStatus,
            topServicos,
            proximos,
            porDia,
        };
    }



    async findAll(filters: any) {
        const {
            status,
            clienteId,
            veiculoId,
            servicoId,
            dataInicio,
            dataFim,
            page = 1,
            limit = 10,
        } = filters;

        const where: any = {};

        if (status) where.status = status;
        if (clienteId) where.clienteId = Number(clienteId);
        if (veiculoId) where.veiculoId = Number(veiculoId);
        if (servicoId) where.servicoId = Number(servicoId);

        if (dataInicio || dataFim) {
            where.dataAgenda = {};

            if (dataInicio) where.dataAgenda.gte = new Date(dataInicio);
            if (dataFim) where.dataAgenda.lte = new Date(dataFim);
        }

        const skip = (Number(page) - 1) * Number(limit);

        return prisma.agendamento.findMany({
            where,
            skip,
            take: Number(limit),
            orderBy: { data: "desc" },
            include: { cliente: true, veiculo: true, servico: true },
        });
    }

    async findOne(id: number){
        return prisma.agendamento.findUnique({
            where: { id },
            include: { cliente: true, veiculo: true, servico: true, pagamento: true },
        });
    }

    async update(id: number, data: UpdateAgendamentoDTO){
        const payload: any = { ...data };

        if (payload.data){
            payload.data = new Date(payload.data);
        }

        return prisma.agendamento.update({
            where: { id },
            data: payload,
        });
    }

    async updateStatus(id: number, status: string){
        const valid = ["PENDENTE", "CONFIRMADO", "CANCELADO", "CONCLUIDO"];
        if (!valid.includes(status)) {
            throw new Error("Status inválido");
        }

        return prisma.agendamento.update({
            where: { id },
            data: { status },
        });
    }

    async delete(id: number){
        return prisma.agendamento.delete({ where: { id} });
    }

}