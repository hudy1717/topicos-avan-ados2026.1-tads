import { CONFIGURACAO_SISTEMA } from "./config/configuracao.js";
import { Estudante } from "./models/Estudante.js";
import { Turma } from "./models/Turma.js";
import { Chamado } from "./models/Chamado.js";
import { FilaAtendimento } from "./models/FilaAtendimento.js";

console.log("=== SISTEMA DE SUPORTE ACADÊMICO OO ===");
console.log(`Configuração: Média mínima de aprovação = ${CONFIGURACAO_SISTEMA.MEDIA_MINIMA_APROVACAO}\n`);

console.log("--- 1. Criando Estudantes ---");
const e1 = new Estudante("2026001", "Hudd Friedrich", "Análise e Desenvolvimento de Sistemas");
const e2 = new Estudante("2026002", "Helena Silva", "Análise e Desenvolvimento de Sistemas");

e1.adicionarNota(8.5);
e1.adicionarNota(9.0);

e2.adicionarNota(6.0);
e2.adicionarNota(7.0);

console.log("Resumo Estudante 1:", e1.obterResumo());
console.log("Resumo Estudante 2:", e2.obterResumo());

const notasE1 = e1.listarNotas();
notasE1.push(0.0);
console.log("Notas reais de E1 (protegidas):", e1.listarNotas());

console.log("\n--- 2. Gestão de Turma e Matrículas (Composição) ---");
const turmaTADS = new Turma("TADS2026.1", "Programação Orientada a Objetos");

turmaTADS.matricularEstudante(e1, 100);
turmaTADS.matricularEstudante(e2, 90);

console.log("Resumo da Turma:", turmaTADS.obterResumo());
console.log("Lista de Matriculados:");
console.table(turmaTADS.listarMatriculados());

try {
  turmaTADS.matricularEstudante(e1);
} catch (error) {
  console.log("Validação OK (Duplicidade):", error.message);
}

console.log("\n--- 3. Chamados e Fila de Atendimento (FIFO & Associação) ---");
const chamado1 = new Chamado("CHM-01", "Acesso ao SUAP bloqueado", e1);
const chamado2 = new Chamado("CHM-02", "Ajuste de matrícula em disciplina", e2);

const fila = new FilaAtendimento();
fila.adicionar(chamado1);
fila.adicionar(chamado2);

console.log(`Tamanho atual da fila: ${fila.tamanho}`);
console.log("Relatório da Fila (Aguardando Atendimento):");
console.table(fila.relatorioFila());

console.log("\n--- Atendendo próximo da Fila ---");
const proximoChamado = fila.proximo();
console.log(`Atendendo Chamado ID: ${proximoChamado.id} de ${proximoChamado.solicitante.nome}`);

proximoChamado.iniciarAtendimento("Técnico Carlos");
console.log("Status após iniciar atendimento:", proximoChamado.status);

proximoChamado.finalizar();
console.log("Status após finalizar:", proximoChamado.status);
console.log("Resumo do Chamado Concluído:", proximoChamado.obterResumo());

try {
  chamado2.finalizar();
} catch (error) {
  console.log("Validação OK (Transição de Estado):", error.message);
}

console.log(`\nTamanho da fila ao final: ${fila.tamanho}`);
console.log("Próximo da fila se vazia:", fila.proximo());