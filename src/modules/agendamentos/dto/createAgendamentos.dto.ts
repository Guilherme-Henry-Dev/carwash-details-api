export interface CreateAgendamentoDTO {
    clienteId: number;
    veiculoId: number;
    servicoId: number;
    dataAgendamento: Date;
    observacao?: string;
}