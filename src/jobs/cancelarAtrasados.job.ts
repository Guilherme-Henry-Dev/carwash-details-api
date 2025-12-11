import cron from 'node-cron';
import { prisma } from '../prisma/client';

export const cancelarAtrasadosJob = cron.schedule("0 * * * *", async () => {
    try {
        const agora = new Date();
        const limite = new Date(agora.getTime() - 24 * 60 * 60 *1000);

        await prisma.agendamento.updateMany({
            where: {
                dataAgenda: { lt: limite },
                status: "PENDENTE", 
            },
            data: {
                status: "CANCELADO",
            },
        });

        console.log("Agendamentos atrasados foram cancelados automaticamente");
    } catch (error) {
        console.error("Erro ao cancelar atrasados:", error);
    }
});