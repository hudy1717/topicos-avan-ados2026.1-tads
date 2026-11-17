import type { QueueContract } from "./QueueContract.js";
export class Queue<T> implements QueueContract<T> {
  private readonly items = new Map<number, T>();
  private inicio = 0;
  private fim = 0;
  enqueue(item: T): void { this.items.set(this.fim++, item); }
  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;
    const item = this.items.get(this.inicio);
    this.items.delete(this.inicio++);
    if (this.isEmpty()) { this.inicio = 0; this.fim = 0; }
    return item;
  }
  isEmpty(): boolean { return this.inicio === this.fim; }
  size(): number { return this.fim - this.inicio; }
}
