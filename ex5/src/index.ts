import { cadastrarEstudante, buscarEstudante, mediaDoEstudante } from "./servicos/estudantes.js";
import { cadastrarTurma, matricularEmTurma } from "./servicos/turmas.js";
import { abrirChamado, alterarStatusChamado, buscarChamado } from "./servicos/chamados.js";
import { validarEntradaExterna } from "./validacao/validarEstudante.js";

const entrada: unknown = { nome: "Ana Silva", matricula: "20260001" };
const resultado = validarEntradaExterna(entrada);
console.log("Validação:", resultado);

if (resultado.valido && typeof entrada === "object" && entrada !== null && "nome" in entrada && "matricula" in entrada && typeof entrada.nome === "string" && typeof entrada.matricula === "string") {
  cadastrarEstudante({ nome: entrada.nome, matricula: entrada.matricula, curso: "Informática", ativo: true, notas: [8, 9, 7] });
}

cadastrarTurma({ codigo: "T01", nome: "Turma A", matriculas: [], sala: "Lab 01" });
matricularEmTurma("T01", "20260001");
const chamado = abrirChamado("20260001", "Solicitação de declaração");
alterarStatusChamado(chamado.id, "EM_ATENDIMENTO");
console.log("Estudante:", buscarEstudante("20260001"));
console.log("Média:", mediaDoEstudante("20260001"));
console.log("Chamado:", buscarChamado(chamado.id));
