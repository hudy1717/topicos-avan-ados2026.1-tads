/** Contrato FIFO: primeiro a entrar, primeiro a sair. */
export interface Queue<T> {
  enqueue(item: T): void;
  dequeue(): T | undefined;
  front(): T | undefined;
  isEmpty(): boolean;
  size(): number;
}
