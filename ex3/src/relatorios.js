import { calcularMetricas } from "./aluno.js";

export function gerarRelatorio(alunos, filtrar, formatar, comparar = null) {
  if (!Array.isArray(alunos) || alunos.length === 0) {
    return [];
  }

  let processados = alunos.map((aluno) => calcularMetricas(aluno));

  if (typeof filtrar === "function") {
    processados = processados.filter(filtrar);
  }

  if (typeof comparar === "function") {
    processados.sort(comparar);
  }

  if (typeof formatar === "function") {
    return processados.map(formatar);
  }

  return processados;
}

export function criarFiltro({ tipo, valor, mediaMinima = 6 }) {
  if (tipo === "mediaMinima") {
    return (alunoComMetricas) => alunoComMetricas.media >= valor;
  }

  if (tipo === "reprovados") {
    return (alunoComMetricas) => alunoComMetricas.media < mediaMinima;
  }

  if (tipo === "curso") {
    const cursoBusca = String(valor).trim().toUpperCase();
    return (alunoComMetricas) => alunoComMetricas.curso === cursoBusca;
  }

  return () => true;
}

export function relatorioResumoPorCurso(alunos) {
  if (!Array.isArray(alunos) || alunos.length === 0) {
    return [];
  }

  const agrupado = alunos.reduce((acc, aluno) => {
    const curso = aluno.curso;
    const alunoMetricas = calcularMetricas(aluno);

    if (!acc[curso]) {
      acc[curso] = { totalAlunos: 0, somaMedias: 0 };
    }

    acc[curso].totalAlunos += 1;
    acc[curso].somaMedias += alunoMetricas.media;
    return acc;
  }, {});

  return Object.entries(agrupado).map(([curso, dados]) => ({
    curso,
    quantidadeAlunos: dados.totalAlunos,
    mediaGeral: Number((dados.somaMedias / dados.totalAlunos).toFixed(2))
  }));
}