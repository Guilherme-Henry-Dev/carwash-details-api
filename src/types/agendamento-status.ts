export const AgendamentoStatus = {
    PENDENTE: "pendente",
    EM_ANDAMENTO: "em_andamento",
    CONCLUIDO: "concluido",
    CANCELADO: "cancelado",
} as const;

export type AgendamentoStatusType = (typeof AgendamentoStatus)[keyof typeof AgendamentoStatus];