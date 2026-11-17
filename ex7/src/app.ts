import { Queue } from "./collections/Queue.js";
import { InMemoryRepository } from "./repositories/InMemoryRepository.js";
import { NumericBST } from "./trees/NumericBST.js";
import { UndirectedGraph } from "./graphs/UndirectedGraph.js";
import { AcademicResultCache } from "./cache/AcademicResultCache.js";
import type { Estudante } from "./models/Estudante.js";
import type { Chamado } from "./models/Chamado.js";

const studentRepository = new InMemoryRepository<string, Estudante>();
const chamadoRepository = new InMemoryRepository<number, Chamado>();
const estudantes: Estudante[] = [
  { matricula: "2026003", nome: "Carla Lima", curso: "TADS" },
  { matricula: "2026001", nome: "Ana Silva", curso: "TADS" },
  { matricula: "2026005", nome: "Diego Santos", curso: "Redes" },
  { matricula: "2026002", nome: "Bruno Souza", curso: "TADS" },
  { matricula: "2026004", nome: "Elisa Rocha", curso: "Redes" }
];
const bst = new NumericBST();
for (const estudante of estudantes) {
  studentRepository.save(estudante.matricula, estudante);
  bst.insert(Number(estudante.matricula));
}
chamadoRepository.save(101, { id: 101, descricao: "Conta bloqueada", status: "ABERTO" });
chamadoRepository.save(102, { id: 102, descricao: "Acesso ao laboratório", status: "EM_ATENDIMENTO" });
console.log("=== REPOSITÓRIOS ===");
const estudante = studentRepository.findById("2026001");
console.log(`Estudante 2026001: ${estudante ? `${estudante.nome} (${estudante.curso})` : "não encontrado"}`);
console.log(`Estudante 9999999: ${studentRepository.findById("9999999")?.nome ?? "não encontrado"}`);
const chamado = chamadoRepository.findById(101);
console.log(`Chamado 101: ${chamado ? `${chamado.descricao} [${chamado.status}]` : "não encontrado"}`);
console.log(`Chamado 999: ${chamadoRepository.findById(999)?.descricao ?? "não encontrado"}`);

const setores = new Set(["PORTARIA", "PÁTIO", "DIATINF", "BIBLIOTECA", "LABORATÓRIOS", "AUDITÓRIO", "RESTAURANTE", "GINÁSIO"]);
const antes = setores.size;
setores.add("DIATINF");
console.log("\n=== SETORES E SET ===");
console.log(`Setores únicos: ${setores.size}`);
console.log(`Duplicar DIATINF alterou o tamanho? ${setores.size !== antes}`);
console.log("\n=== ÍNDICE BST ===");
console.log(`Matrículas em ordem: ${bst.inOrder().join(", ")}`);
console.log(`Altura: ${bst.height()}`);
console.log(`Contém 2026004? ${bst.contains(2026004)}`);
console.log(`Inserção duplicada aceita? ${bst.insert(2026001)}`);

const resultCache = new AcademicResultCache<string, number>();
let consultasFonte = 0;
function consultarMedia(matricula: string): number {
  const cached = resultCache.get(matricula);
  if (cached !== undefined) return cached;
  consultasFonte++;
  const media = 8.4;
  resultCache.set(matricula, media);
  return media;
}
console.log("\n=== CACHE ===");
console.log(`Primeira consulta: média ${consultarMedia("2026001")}`);
console.log(`Segunda consulta: média ${consultarMedia("2026001")}`);
console.log(`Consultas à fonte: ${consultasFonte}`);
console.log(`Métricas: ${JSON.stringify(resultCache.metrics())}`);
console.log(`Cache invalidado? ${resultCache.invalidate("2026001")}`);
console.log(`Cache possui 2026001? ${resultCache.has("2026001")}`);

const campusGraph = new UndirectedGraph<string>();
for (const setor of setores) campusGraph.addVertex(setor);
const conexoes: [string, string][] = [
  ["PORTARIA", "PÁTIO"], ["PÁTIO", "DIATINF"], ["PÁTIO", "BIBLIOTECA"],
  ["DIATINF", "LABORATÓRIOS"], ["BIBLIOTECA", "AUDITÓRIO"],
  ["AUDITÓRIO", "RESTAURANTE"], ["RESTAURANTE", "PÁTIO"]
];
for (const [a, b] of conexoes) campusGraph.addEdge(a, b);
const rota = campusGraph.shortestUnweightedPath("PORTARIA", "LABORATÓRIOS", new Queue<string>());
const inexistente = campusGraph.shortestUnweightedPath("PORTARIA", "GINÁSIO", new Queue<string>());
console.log("\n=== GRAFO E BFS ===");
console.log(`Ordem BFS: ${campusGraph.bfs("PORTARIA", new Queue<string>()).join(" -> ")}`);
console.log(`Rota existente: ${rota?.join(" -> ") ?? "não encontrada"}`);
console.log(`Rota inexistente: ${inexistente?.join(" -> ") ?? "não encontrada"}`);
