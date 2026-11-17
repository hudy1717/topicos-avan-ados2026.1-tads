export class VinculoNaTurma {
  #estudante;
  #dataEntrada;
  #frequencia;

  constructor(estudante, frequenciaInicial = 100) {
    if (!estudante) {
      throw new Error("Um vínculo precisa obrigatoriamente de um estudante.");
    }
    this.#estudante = estudante;
    this.#dataEntrada = new Date();
    this.#frequencia = Math.max(0, Math.min(100, frequenciaInicial));
  }

  get estudante() {
    return this.#estudante;
  }

  get dataEntrada() {
    return new Date(this.#dataEntrada.getTime());
  }

  get frequencia() {
    return this.#frequencia;
  }

  atualizarFrequencia(novaFrequencia) {
    if (novaFrequencia < 0 || novaFrequencia > 100) {
      throw new Error("A frequência deve estar entre 0% e 100%.");
    }
    this.#frequencia = novaFrequencia;
  }

  obterResumo() {
    return {
      matricula: this.#estudante.matricula,
      nome: this.#estudante.nome,
      dataEntrada: this.#dataEntrada.toISOString().split("T")[0],
      frequencia: `${this.#frequencia}%`
    };
  }
}