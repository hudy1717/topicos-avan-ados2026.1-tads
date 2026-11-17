import { IndexQueue } from "../estruturas/IndexQueue";
import type { Chamado } from "../dominio/Chamado";

export class FilaChamados {
  private readonly fila = new IndexQueue<Chamado>();

  adicionar(chamado: Chamado): void { this.fila.enqueue(chamado); }
  atender(): Chamado | undefined { return this.fila.dequeue(); }
  proximo(): Chamado | undefined { return this.fila.front(); }
  pendentes(): number { return this.fila.size(); }
}

export function demonstrarChamados(): void {
  const atendimento = new FilaChamados();
  atendimento.adicionar({ id: 1, solicitante: "João", descricao: "Acesso ao portal" });
  atendimento.adicionar({ id: 2, solicitante: "Maria", descricao: "Atualizar cadastro" });
  console.log("Próximo chamado:", atendimento.proximo());
  console.log("Atendido:", atendimento.atender());
  console.log("Restantes:", atendimento.pendentes());
}
