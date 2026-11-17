import type { StatusChamado } from "../dominio/Chamado.js";

// Exemplos de defeitos detectados ANTES da execução pelo TypeScript.
// @ts-expect-error: status fora da união não é permitido
const statusInvalido: StatusChamado = "PENDENTE";

// @ts-expect-error: um número não pode substituir uma matrícula string
const matriculaInvalida: string = 123;

// Estes exemplos são didáticos e não são executados pela aplicação.
void statusInvalido;
void matriculaInvalida;
