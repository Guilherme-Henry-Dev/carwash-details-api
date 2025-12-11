export interface CreateAgendamentoDTO {
    clienteId: number;
    veiculoId: number;
    servicoId: number;
    dataAgendada: Date;
    observacao?: string;
}