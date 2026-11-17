import type { Stack } from "./Stack";

/** push/pop/peek: O(1) amortizado, size/isEmpty: O(1). */
export class ArrayStack<T> implements Stack<T> {
  private readonly itens: T[] = [];

  push(item: T): void { this.itens.push(item); }
  pop(): T | undefined { return this.itens.pop(); }
  peek(): T | undefined { return this.itens[this.itens.length - 1]; }
  isEmpty(): boolean { return this.itens.length === 0; }
  size(): number { return this.itens.length; }
}
