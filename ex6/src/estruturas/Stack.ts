/** Contrato LIFO: inserção e remoção no topo. */
export interface Stack<T> {
  push(item: T): void;
  pop(): T | undefined;
  peek(): T | undefined;
  isEmpty(): boolean;
  size(): number;
}
