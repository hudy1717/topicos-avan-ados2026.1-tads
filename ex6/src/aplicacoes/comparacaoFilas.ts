import type { Queue } from "../estruturas/Queue";
import { ShiftQueue } from "../estruturas/ShiftQueue";
import { IndexQueue } from "../estruturas/IndexQueue";

function medir(nome: string, fila: Queue<number>, quantidade: number): void {
  const inicio = performance.now();
  for (let i = 0; i < quantidade; i++) fila.enqueue(i);
  for (let i = 0; i < quantidade; i++) fila.dequeue();
  const tempo = performance.now() - inicio;
  console.log(`${nome}: ${tempo.toFixed(2)} ms (${quantidade} itens)`);
}

export function compararFilas(quantidade = 20000): void {
  medir("ShiftQueue", new ShiftQueue<number>(), quantidade);
  medir("IndexQueue", new IndexQueue<number>(), quantidade);
  console.log("Os tempos variam conforme o ambiente; compare também as complexidades.");
}
