import { GerenciadorAlunos } from "./gerenciador.js";
import { gerarRelatorio, criarFiltro, relatorioResumoPorCurso } from "./relatorios.js";

const gerenciador = new GerenciadorAlunos();

console.log("=== CADASTRO DE ALUNOS ===");

try {
  gerenciador.cadastrar({
    id: 1,
    matricula: "2026001",
    nome: " Ana Silva ",
    email: "ANA.SILVA@EMAIL.COM",
    curso: "ads",
    notas: [8.5, 7.0, 9.0]
  });

  gerenciador.cadastrar({
    id: 2,
    matricula: "2026002",
    nome: "Bruno Souza",
    email: "bruno@email.com",
    curso: "ads",
    notas: [4.0, 5.5, 3.0]
  });

  gerenciador.cadastrar({
    id: 3,
    matricula: "2026003",
    nome: "Carla Lima",
    email: "carla@email.com",
    curso: "Engenharia",
    notas: [9.0, 9.5, 10.0]
  });

  gerenciador.cadastrar({
    id: 4,
    matricula: "2026004",
    nome: "Daniel Oliveira",
    email: "daniel@email.com",
    curso: "ads",
    notas: [5.0, 4.0, 5.5]
  });

  gerenciador.cadastrar({
    id: 5,
    matricula: "2026005",
    nome: "Eduardo Costa",
    email: "eduardo@email.com",
    curso: "Engenharia",
    notas: []
  });

  console.log("Alunos cadastrados com sucesso!\n");
} catch (error) {
  console.error("Erro no cadastro:", error.message);
}

const todosAlunos = gerenciador.listarTodos();

console.log("=== 1. APROVADOS ORDENADOS POR NOME ===");
const filtroAprovados = criarFiltro({ tipo: "mediaMinima", valor: 6 });
const relatorioAprovados = gerarRelatorio(
  todosAlunos,
  filtroAprovados,
  (a) => `Nome: ${a.nome} | Curso: ${a.curso} | Média: ${a.media}`,
  (a, b) => a.nome.localeCompare(b.nome)
);
console.log(relatorioAprovados);

console.log("\n=== 2. REPROVADOS DA MENOR PARA A MAIOR MÉDIA ===");
const filtroReprovados = criarFiltro({ tipo: "reprovados", mediaMinima: 6 });
const relatorioReprovados = gerarRelatorio(
  todosAlunos,
  filtroReprovados,
  (a) => `Nome: ${a.nome} | Média: ${a.media} | Situação: ${a.situacao}`,
  (a, b) => a.media - b.media
);
console.log(relatorioReprovados);

console.log("\n=== 3. ALUNOS DO CURSO 'ADS' EM FORMATO CSV ===");
const filtroCursoADS = criarFiltro({ tipo: "curso", valor: "ADS" });
const relatorioCSV = gerarRelatorio(
  todosAlunos,
  filtroCursoADS,
  (a) => `${a.matricula};${a.nome};${a.email};${a.curso};${a.media};${a.situacao}`
);
console.log(["matricula;nome;email;curso;media;situacao", ...relatorioCSV].join("\n"));

console.log("\n=== 4. RESUMO POR CURSO (QUANTIDADE E MÉDIA GERAL) ===");
const resumoCursos = relatorioResumoPorCurso(todosAlunos);
console.log(resumoCursos);

console.log("\n=== TESTES DE BORDAS E VALIDAÇÕES ===");

console.log("Busca de aluno existente:", gerenciador.buscarPorMatricula("2026001")?.nome);
console.log("Remoção de aluno (2026002):", gerenciador.removerPorMatricula("2026002"));

try {
  gerenciador.cadastrar({
    id: 6,
    matricula: "2026001",
    nome: "Duplicado",
    email: "dup@email.com",
    curso: "ADS",
    notas: [7]
  });
} catch (e) {
  console.log("Erro capturado (Matrícula duplicada):", e.message);
}

try {
  gerenciador.cadastrar({
    id: 7,
    matricula: "2026007",
    nome: "Ed",
    email: "ed@email.com",
    curso: "ADS",
    notas: [7]
  });
} catch (e) {
  console.log("Erro capturado (Nome curto):", e.message);
}

const relatorioCursoInexistente = gerarRelatorio(
  todosAlunos,
  criarFiltro({ tipo: "curso", valor: "DIREITO" }),
  (a) => a.nome
);
console.log("Relatório para curso inexistente:", relatorioCursoInexistente);

const relatorioColecaoVazia = gerarRelatorio(
  [],
  criarFiltro({ tipo: "mediaMinima", valor: 6 }),
  (a) => a.nome
);
console.log("Relatório para coleção vazia:", relatorioColecaoVazia);