export class FilaAtendimento {
  #chamados;

  constructor() {
    this.#chamados = [];
  }

  adicionar(chamado) {
    if (!chamado) {
      throw new Error("Chamado inválido.");
    }
    this.#chamados.push(chamado);
  }

  proximo() {
    if (this.#chamados.length === 0) {
      return null;
    }
    return this.#chamados.shift();
  }

  get tamanho() {
    return this.#chamados.length;
  }

  relatorioFila() {
    return this.#chamados.map(c => c.obterResumo());
  }
}