import { criarAluno } from "./aluno.js";

export class GerenciadorAlunos {
  #alunos = new Map();

  cadastrar(dadosAluno) {
    const matricula = String(dadosAluno.matricula || "").trim();

    if (this.#alunos.has(matricula)) {
      throw new Error(`Matrícula duplicada: "${matricula}".`);
    }

    const aluno = criarAluno(dadosAluno);
    this.#alunos.set(aluno.matricula, aluno);
    return aluno;
  }

  buscarPorMatricula(matricula) {
    const matriculaNormalizada = String(matricula).trim();
    return this.#alunos.get(matriculaNormalizada) || null;
  }

  removerPorMatricula(matricula) {
    const matriculaNormalizada = String(matricula).trim();
    return this.#alunos.delete(matriculaNormalizada);
  }

  listarTodos() {
    return Array.from(this.#alunos.values());
  }
}