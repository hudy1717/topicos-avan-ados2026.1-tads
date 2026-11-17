export type StatusChamado = "ABERTO" | "EM_ATENDIMENTO" | "FINALIZADO";

export interface Chamado {
  readonly id: number;
  readonly matriculaEstudante: string;
  descricao: string;
  status: StatusChamado;
}
