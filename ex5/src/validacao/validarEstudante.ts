export type DadosEstudanteEntrada = {
  nome?: unknown;
  matricula?: unknown;
};

export type ResultadoValidacao = {
  valido: boolean;
  erros: string[];
};

export function validarEstudante(dados: DadosEstudanteEntrada): ResultadoValidacao {
  const erros: string[] = [];
  if (typeof dados.nome !== "string" || dados.nome.trim().length < 2) {
    erros.push("Nome deve ser um texto com pelo menos 2 caracteres.");
  }
  if (typeof dados.matricula !== "string" || !/^[0-9]{5,15}$/.test(dados.matricula)) {
    erros.push("Matrícula deve conter de 5 a 15 dígitos.");
  }
  return { valido: erros.length === 0, erros };
}

export function validarEntradaExterna(entrada: unknown): ResultadoValidacao {
  if (typeof entrada !== "object" || entrada === null || Array.isArray(entrada)) {
    return { valido: false, erros: ["A entrada deve ser um objeto."] };
  }
  return validarEstudante(entrada);
}
