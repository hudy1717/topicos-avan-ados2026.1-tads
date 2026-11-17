export class Chamado {
  static ESTADOS = Object.freeze({
    ABERTO: "ABERTO",
    EM_ATENDIMENTO: "EM_ATENDIMENTO",
    FINALIZADO: "FINALIZADO"
  });

  #id;
  #titulo;
  #solicitante;
  #responsavel;
  #status;

  constructor(id, titulo, solicitante) {
    if (!id || !titulo || !solicitante) {
      throw new Error("ID, título e solicitante são obrigatórios para abrir um chamado.");
    }
    this.#id = String(id);
    this.#titulo = String(titulo);
    this.#solicitante = solicitante;
    this.#responsavel = null;
    this.#status = Chamado.ESTADOS.ABERTO;
  }

  get id() {
    return this.#id;
  }

  get titulo() {
    return this.#titulo;
  }

  get solicitante() {
    return this.#solicitante;
  }

  get responsavel() {
    return this.#responsavel;
  }

  get status() {
    return this.#status;
  }

  iniciarAtendimento(nomeResponsavel) {
    if (this.#status !== Chamado.ESTADOS.ABERTO) {
      throw new Error(`Transição inválida: Não é possível iniciar atendimento para um chamado no status ${this.#status}.`);
    }
    if (!nomeResponsavel) {
      throw new Error("Nome do responsável é obrigatório para iniciar atendimento.");
    }
    this.#responsavel = String(nomeResponsavel);
    this.#status = Chamado.ESTADOS.EM_ATENDIMENTO;
  }

  finalizar() {
    if (this.#status !== Chamado.ESTADOS.EM_ATENDIMENTO) {
      throw new Error(`Transição inválida: Somente chamados no status EM_ATENDIMENTO podem ser finalizados (Status atual: ${this.#status}).`);
    }
    this.#status = Chamado.ESTADOS.FINALIZADO;
  }

  obterResumo() {
    return {
      id: this.#id,
      titulo: this.#titulo,
      solicitante: this.#solicitante.nome,
      responsavel: this.#responsavel || "Não atribuído",
      status: this.#status
    };
  }
}