import type { Estudante } from "../dominio/Estudante.js";

const estudantes: Estudante[] = [];

export function cadastrarEstudante(estudante: Estudante): boolean {
  if (buscarEstudante(estudante.matricula) !== null) return false;
  estudantes.push({ ...estudante, notas: [...estudante.notas] });
  return true;
}

export function buscarEstudante(matricula: string): Estudante | null {
  return estudantes.find((e) => e.matricula === matricula) ?? null;
}

export function listarEstudantes(): Estudante[] {
  return estudantes.map((e) => ({ ...e, notas: [...e.notas] }));
}

export function calcularMedia(notas: readonly number[]): number | null {
  if (notas.length === 0 || notas.some((n) => !Number.isFinite(n) || n < 0 || n > 10)) return null;
  return notas.reduce((soma, nota) => soma + nota, 0) / notas.length;
}

export function mediaDoEstudante(matricula: string): number | null {
  const estudante = buscarEstudante(matricula);
  return estudante === null ? null : calcularMedia(estudante.notas);
}
