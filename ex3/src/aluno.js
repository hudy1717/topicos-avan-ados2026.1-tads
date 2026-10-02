export function criarAluno({ id, matricula, nome, email, curso, notas = [] }) {
  const nomeNormalizado = String(nome || "").trim();
  const emailNormalizado = String(email || "").trim().toLowerCase();
  const cursoNormalizado = String(curso || "").trim().toUpperCase();
  const matriculaNormalizada = String(matricula || "").trim();

  if (nomeNormalizado.length < 3) {
    throw new Error(`Nome inválido: "${nome}". Deve possuir ao menos 3 caracteres.`);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailNormalizado)) {
    throw new Error(`E-mail inválido: "${email}".`);
  }

  const notasValidas = Array.isArray(notas) && notas.every((n) => typeof n === "number" && n >= 0 && n <= 10);
  if (!notasValidas) {
    throw new Error("Notas inválidas. Todas as notas devem ser números no intervalo [0, 10].");
  }

  return Object.freeze({
    id,
    matricula: matriculaNormalizada,
    nome: nomeNormalizado,
    email: emailNormalizado,
    curso: cursoNormalizado,
    notas: [...notas]
  });
}

export function calcularMetricas(aluno, mediaMinima = 6) {
  if (!aluno.notas || aluno.notas.length === 0) {
    return {
      ...aluno,
      media: 0,
      situacao: "Sem Notas"
    };
  }

  const soma = aluno.notas.reduce((acc, nota) => acc + nota, 0);
  const media = soma / aluno.notas.length;
  const situacao = media >= mediaMinima ? "Aprovado" : "Reprovado";

  return {
    ...aluno,
    media: Number(media.toFixed(2)),
    situacao
  };
}