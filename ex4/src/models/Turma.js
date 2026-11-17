import { VinculoNaTurma } from "./VinculoNaTurma.js";

export class Turma {
  #codigo;
  #componenteCurricular;
  #vinculos;

  constructor(codigo, componenteCurricular) {
    if (!codigo || !componenteCurricular) {
      throw new Error("Código e componente curricular são obrigatórios.");
    }
    this.#codigo = String(codigo);
    this.#componenteCurricular = String(componenteCurricular);
    this.#vinculos = new Map();
  }

  get codigo() {
    return this.#codigo;
  }

  get componenteCurricular() {
    return this.#componenteCurricular;
  }

  matricularEstudante(estudante, frequenciaInicial = 100) {
    if (this.#vinculos.has(estudante.matricula)) {
      throw new Error(`O estudante de matrícula ${estudante.matricula} já está matriculado nesta turma.`);
    }
    const vinculo = new VinculoNaTurma(estudante, frequenciaInicial);
    this.#vinculos.set(estudante.matricula, vinculo);
  }

  listarMatriculados() {
    return Array.from(this.#vinculos.values()).map(v => v.obterResumo());
  }

  obterResumo() {
    return {
      codigo: this.#codigo,
      componenteCurricular: this.#componenteCurricular,
      totalAlunos: this.#vinculos.size
    };
  }
}