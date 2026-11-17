import type { Turma } from "../dominio/Turma.js";

const turmas: Turma[] = [];

export function cadastrarTurma(turma: Turma): boolean {
  if (buscarTurma(turma.codigo) !== null) return false;
  turmas.push({ ...turma, matriculas: [...turma.matriculas] });
  return true;
}

export function buscarTurma(codigo: string): Turma | null {
  const turma = turmas.find((t) => t.codigo === codigo);
  return turma === undefined ? null : { ...turma, matriculas: [...turma.matriculas] };
}

export function matricularEmTurma(codigo: string, matricula: string): boolean {
  const turma = turmas.find((t) => t.codigo === codigo);
  if (turma === undefined || turma.matriculas.includes(matricula)) return false;
  turma.matriculas.push(matricula);
  return true;
}
