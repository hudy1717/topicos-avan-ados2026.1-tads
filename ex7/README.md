# Unidade 7 — Sistema Integrado de Navegação e Consulta do Campus

Protótipo acadêmico em TypeScript (modo estrito), conforme a atividade do IFRN.

## Executar

```bash
npm install
npm run check
npm start
```

## Estruturas

- `Map` no repositório genérico em memória e no cache de resultados.
- `Set` para setores sem duplicatas e vizinhos do grafo.
- `NumericBST` para índice experimental de matrículas numéricas, sem aceitar repetidos.
- `UndirectedGraph` para conexões bidirecionais, com BFS usando fila genérica.
- `Queue` implementada com índices e Map, evitando `shift`.

## Complexidade qualitativa

- `Map` e `Set`: consultas e inserções tipicamente O(1) em média.
- BST sem balanceamento: busca/inserção O(h), onde h é a altura; pode chegar a O(n) no pior caso.
- BFS: O(V + E), com V vértices e E arestas.
- Fila: enfileirar/desenfileirar O(1) em média.
- Cache: `get`, `set` e `invalidate` tipicamente O(1) em média.

A altura da BST considera uma folha com altura zero. O cache usa `has` para distinguir uma chave existente cujo valor seja `undefined`. As métricas registram chamadas de `get`.

O exemplo em `src/app.ts` inclui matrículas, chamados, setores, conexões, consultas de cache, duplicidade e rota inexistente da atividade. O ginásio permanece isolado.
