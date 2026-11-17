import type { Queue } from "./Queue";

/** Fila FIFO com índices; operações O(1) amortizado. */
export class IndexQueue<T> implements Queue<T> {
  private itens: Map<number, T> = new Map();
  private inicio = 0;
  private fim = 0;

  enqueue(item: T): void {
    this.itens.set(this.fim, item);
    this.fim++;
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;
    const item = this.itens.get(this.inicio);
    this.itens.delete(this.inicio);
    this.inicio++;
    if (this.isEmpty()) {
      this.inicio = 0;
      this.fim = 0;
    }
    return item;
  }

  front(): T | undefined { return this.itens.get(this.inicio); }
  isEmpty(): boolean { return this.inicio === this.fim; }
  size(): number { return this.fim - this.inicio; }
}
