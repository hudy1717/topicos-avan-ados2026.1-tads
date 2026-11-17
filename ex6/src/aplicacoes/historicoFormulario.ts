import { ArrayStack } from "../estruturas/ArrayStack";
import type { AlteracaoCampo } from "../dominio/AlteracaoCampo";

export class HistoricoFormulario {
  private readonly campos = new Map<string, string>();
  private readonly historico = new ArrayStack<AlteracaoCampo>();

  alterar(campo: string, valorNovo: string): void {
    const valorAnterior = this.campos.get(campo) ?? "";
    this.historico.push({ campo, valorAnterior, valorNovo });
    this.campos.set(campo, valorNovo);
  }

  desfazer(): AlteracaoCampo | undefined {
    const alteracao = this.historico.pop();
    if (alteracao !== undefined) {
      this.campos.set(alteracao.campo, alteracao.valorAnterior);
    }
    return alteracao;
  }

  consultar(campo: string): string { return this.campos.get(campo) ?? ""; }
  quantidadeAlteracoes(): number { return this.historico.size(); }
}

export function demonstrarHistorico(): void {
  const formulario = new HistoricoFormulario();
  formulario.alterar("nome", "Ana");
  formulario.alterar("nome", "Ana Maria");
  console.log("Antes de desfazer:", formulario.consultar("nome"));
  formulario.desfazer();
  console.log("Depois de desfazer:", formulario.consultar("nome"));
}
