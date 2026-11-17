export type StatusChamado = "ABERTO" | "EM_ATENDIMENTO" | "FINALIZADO";
export interface Chamado { id: number; descricao: string; status: StatusChamado; }
