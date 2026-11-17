# Biblioteca genérica de pilha e fila — IFRN

Projeto TypeScript em modo estrito que demonstra estruturas lineares e sua integração com cadastro acadêmico e atendimento.

## Executar

Com Node.js e npm instalados:

```bash
npm install
npm run check
npm start
```

## Organização

- `src/estruturas/`: contratos `Stack<T>` e `Queue<T>` e implementações genéricas.
- `src/dominio/`: tipos `AlteracaoCampo` e `Chamado`.
- `src/aplicacoes/`: histórico de formulário, fila de chamados e comparação de desempenho.
- `src/main.ts`: executa os exemplos.

## Contratos e complexidade

| Estrutura | Inserir | Remover | Consultar topo/início | size/isEmpty |
| --- | --- | --- | --- | --- |
| `ArrayStack<T>` | `push`: O(1) amortizado | `pop`: O(1) | `peek`: O(1) | O(1) |
| `ShiftQueue<T>` | `enqueue`: O(1) amortizado | `dequeue`: O(n) | `front`: O(1) | O(1) |
| `IndexQueue<T>` | `enqueue`: O(1) esperado | `dequeue`: O(1) esperado | `front`: O(1) esperado | O(1) |

A pilha é **LIFO**: a última alteração é a primeira desfeita. A fila é **FIFO**: o primeiro chamado registrado é o primeiro atendido.

`ShiftQueue<T>` usa `Array.shift()`, que pode deslocar todos os elementos restantes, aumentando o custo de remoção conforme a fila cresce. Ela é mantida apenas para demonstração e comparação. `IndexQueue<T>` usa índices `inicio` e `fim` e um `Map` para armazenar posições, removendo entradas atendidas sem deslocar os demais elementos. Por isso é utilizada na aplicação de chamados. O custo esperado do `Map` depende da implementação do motor JavaScript.

O script `comparacaoFilas.ts` executa inserções e remoções nas duas filas e mede o tempo com `performance.now()`. Os resultados dependem da máquina e não substituem a análise de complexidade.

As estruturas não contêm interface gráfica, regras de domínio nem persistência. Os tipos genéricos preservam o tipo dos itens inseridos e retirados; quando vazias, as operações de remoção e consulta retornam `undefined`.
