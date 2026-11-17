import type { Chamado, StatusChamado } from "../dominio/Chamado.js";

const chamados: Chamado[] = [];
let proximoId = 1;

export function abrirChamado(matriculaEstudante: string, descricao: string): Chamado {
  const chamado: Chamado = { id: proximoId++, matriculaEstudante, descricao, status: "ABERTO" };
  chamados.push(chamado);
  return { ...chamado };
}

export function buscarChamado(id: number): Chamado | null {
  const chamado = chamados.find((c) => c.id === id);
  return chamado === undefined ? null : { ...chamado };
}

export function alterarStatusChamado(id: number, status: StatusChamado): boolean {
  const chamado = chamados.find((c) => c.id === id);
  if (chamado === undefined) return false;
  chamado.status = status;
  return true;
}

export function listarChamados(): Chamado[] {
  return chamados.map((c) => ({ ...c }));
}
