export interface UpdateAgendamentoDTO {
    dataAgendada?: string;
    observacao?: string;
    status?: "PENDENTE" | "EM_ANDAMENTO" | "CONCLUIDO" | "CANCELADO";
}