import { demonstrarHistorico } from "./aplicacoes/historicoFormulario";
import { demonstrarChamados } from "./aplicacoes/filaChamados";
import { compararFilas } from "./aplicacoes/comparacaoFilas";

console.log("=== Histórico do formulário ===");
demonstrarHistorico();
console.log("\n=== Atendimento de chamados ===");
demonstrarChamados();
console.log("\n=== Comparação das filas ===");
compararFilas();
