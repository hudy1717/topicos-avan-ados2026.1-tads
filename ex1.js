//Cadastro e análise de alunos usando JavaScript

function calcularMedia(notas) {
  let soma = 0;
  for (let i = 0; i < notas.length; i++) {
    soma += notas[i];
  }
  return soma / notas.length;
}

function classificarSituacao(media, frequencia) {
  if (media >= 70 && frequencia >= 75) {
    return "Aprovado";
  } else if (media >= 40 && media < 70 && frequencia >= 75) {
    return "Recuperação";
  } else {
    return "Reprovado";
  }
}

function programaPrincipal() {
  const qtdAlunos = Number(prompt("Quantos alunos serão cadastrados?"));
  const alunos = [];

  let aprovados = 0;
  let recuperacao = 0;
  let reprovados = 0;

  for (let i = 0; i < qtdAlunos; i++) {
    const nome = prompt(`Nome do aluno ${i + 1}:`);
    const matricula = prompt(`Matrícula do aluno ${i + 1}:`);

    const notas = [];
    for (let j = 1; j <= 3; j++) {
      const nota = Number(prompt(`Digite a nota ${j} do aluno ${nome}:`));
      notas.push(nota);
    }

    const frequencia = Number(prompt(`Digite a frequência (%) do aluno ${nome}:`));

    const media = calcularMedia(notas);
    const situacao = classificarSituacao(media, frequencia);

    if (situacao === "Aprovado") {
      aprovados++;
    } else if (situacao === "Recuperação") {
      recuperacao++;
    } else {
      reprovados++;
    }

    alunos.push({
      nome: nome,
      matricula: matricula,
      media: media.toFixed(2),
      situacao: situacao
    });
  }

  console.log("--- RESULTADO FINAL ---");
  for (let i = 0; i < alunos.length; i++) {
    const a = alunos[i];
    console.log(`Nome: ${a.nome} | Matrícula: ${a.matricula} | Média: ${a.media} | Situação: ${a.situacao}`);
  }

  console.log("\n--- RESUMO ---");
  console.log(`Total de Aprovados: ${aprovados}`);
  console.log(`Total em Recuperação: ${recuperacao}`);
  console.log(`Total de Reprovados: ${reprovados}`);
}

programaPrincipal();