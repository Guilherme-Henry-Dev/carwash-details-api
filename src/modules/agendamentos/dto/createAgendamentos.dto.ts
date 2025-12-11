export interface CreateAgendamentoDTO {
    clienteId: number;
    veiculoId: number;
    servicoId: number;
    data: string | Date;
    observacao?: string;
}