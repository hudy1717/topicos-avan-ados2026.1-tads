//Sistema de cadastro de cursos em memória usando arrays de objetos

const cursos = [];

function inserirCurso(listaCursos, codigo, nome, cargaHoraria, ativo) {
  listaCursos.push({
    codigo: String(codigo),
    nome: String(nome),
    cargaHoraria: Number(cargaHoraria),
    ativo: Boolean(ativo)
  });
}

function listarCursos(listaCursos) {
  console.log("--- Lista de Cursos ---");
  listaCursos.forEach(curso => {
    const status = curso.ativo ? "Ativo" : "Inativo";
    console.log(`Código: ${curso.codigo} | Nome: ${curso.nome} | Carga Horária: ${curso.cargaHoraria}h | Status: ${status}`);
  });
}

function filtrarCursosAtivos(listaCursos) {
  return listaCursos.filter(curso => curso.ativo);
}

function calcularMediaCargaHoraria(listaCursosAtivos) {
  if (listaCursosAtivos.length === 0) return 0;
  
  const totalCargaHoraria = listaCursosAtivos.reduce((acumulador, curso) => acumulador + curso.cargaHoraria, 0);
  return totalCargaHoraria / listaCursosAtivos.length;
}

inserirCurso(cursos, "ADS01", "Análise e Desenvolvimento de Sistemas", 2400, true);
inserirCurso(cursos, "ENG02", "Engenharia de Software", 3200, true);
inserirCurso(cursos, "MKT03", "Marketing Digital", 1200, false);
inserirCurso(cursos, "DESIGN04", "Design de Interação", 1600, true);
inserirCurso(cursos, "ADM05", "Administração", 3000, false);

listarCursos(cursos);

const cursosAtivos = filtrarCursosAtivos(cursos);
const mediaCargaHorariaAtivos = calcularMediaCargaHoraria(cursosAtivos);

console.log("\n--- Relatório Geral ---");
console.log(`Total de cursos cadastrados: ${cursos.length}`);
console.log(`Total de cursos ativos: ${cursosAtivos.length}`);
console.log(`Média da carga horária dos cursos ativos: ${mediaCargaHorariaAtivos.toFixed(2)}h`);