export interface QueueContract<T> { enqueue(item: T): void; dequeue(): T | undefined; isEmpty(): boolean; size(): number; }
