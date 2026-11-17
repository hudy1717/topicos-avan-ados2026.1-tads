# Migração tipada do cadastro acadêmico — IFRN (Unidade 5)

Projeto de exemplo de migração de JavaScript modular para TypeScript em modo estrito. **Como os arquivos JavaScript originais não foram fornecidos, este projeto é uma implementação independente, não uma migração linha a linha do sistema anterior.**

## Execução

Requer Node.js e npm:

```bash
npm install
npx tsc --noEmit
npm run build
npm start
```

O projeto usa módulos ES com `NodeNext`, alvo `ES2020`, `strict`, `noImplicitAny` e `strictNullChecks` habilitados. TypeScript é dependência de desenvolvimento.

## Organização

- `src/dominio`: `type Estudante`, `interface Turma`, `interface Chamado` e união `StatusChamado`.
- `src/validacao`: entrada externa `unknown`, checagens com `typeof` e resultado com erros.
- `src/servicos`: cadastro e consulta de estudantes, turmas e chamados com parâmetros e retornos explícitos.
- `src/exemplos`: erros propositalmente marcados com `@ts-expect-error` para demonstrar a checagem estática.
- `src/index.ts`: execução de exemplo.

## Como os tipos previnem defeitos?

- `StatusChamado` aceita somente `"ABERTO"`, `"EM_ATENDIMENTO"` ou `"FINALIZADO"`. Outros valores geram erro de compilação.
- `Estudante` exige matrícula, nome, curso, ativo e notas com tipos definidos.
- `Estudante | null` obriga a considerar o caso de estudante não encontrado.
- `readonly` em matrícula, código de turma e ID de chamado impede reatribuição dessas propriedades na verificação estática.
- `sala?` representa uma propriedade opcional.
- `unknown` obriga a verificar a entrada externa antes de acessar seus campos. Tipos TypeScript **não substituem validação em tempo de execução**.

Os exemplos de erros ficam em `src/exemplos/errosTipos.ts`. Remova temporariamente o comentário `@ts-expect-error` para observar os diagnósticos do compilador; depois restaure o comentário.

## Limites

Os cadastros ficam em memória, sem persistência em arquivo ou banco de dados. A validação de matrícula usa de 5 a 15 dígitos como regra didática, ajustável à regra institucional. A média retorna `null` se não houver notas ou se alguma nota estiver fora de 0 a 10.
