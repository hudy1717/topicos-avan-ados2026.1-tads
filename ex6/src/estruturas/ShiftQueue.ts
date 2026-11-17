import type { Queue } from "./Queue";

/** dequeue usa shift(): O(n) pelo deslocamento dos elementos. */
export class ShiftQueue<T> implements Queue<T> {
  private readonly itens: T[] = [];

  enqueue(item: T): void { this.itens.push(item); }
  dequeue(): T | undefined { return this.itens.shift(); }
  front(): T | undefined { return this.itens[0]; }
  isEmpty(): boolean { return this.itens.length === 0; }
  size(): number { return this.itens.length; }
}
