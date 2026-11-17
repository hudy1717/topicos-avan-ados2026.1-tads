export class Estudante {
  #matricula;
  #nome;
  #curso;
  #notas;

  constructor(matricula, nome, curso) {
    if (!matricula || !nome || !curso) {
      throw new Error("Matrícula, nome e curso são obrigatórios.");
    }
    this.#matricula = String(matricula);
    this.#nome = String(nome);
    this.#curso = String(curso);
    this.#notas = [];
  }

  get matricula() {
    return this.#matricula;
  }

  get nome() {
    return this.#nome;
  }

  get curso() {
    return this.#curso;
  }

  adicionarNota(nota) {
    if (typeof nota !== "number" || isNaN(nota) || nota < 0 || nota > 10) {
      throw new Error("A nota deve ser um número válido entre 0 e 10.");
    }
    this.#notas.push(nota);
  }

  calcularMedia() {
    if (this.#notas.length === 0) return 0;
    const soma = this.#notas.reduce((acc, curr) => acc + curr, 0);
    return Number((soma / this.#notas.length).toFixed(2));
  }

  listarNotas() {
    return [...this.#notas];
  }

  obterResumo() {
    return {
      matricula: this.#matricula,
      nome: this.#nome,
      curso: this.#curso,
      media: this.calcularMedia(),
      totalNotas: this.#notas.length
    };
  }
}