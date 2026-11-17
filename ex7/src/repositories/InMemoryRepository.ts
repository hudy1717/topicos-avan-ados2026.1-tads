import type { Repository } from "./Repository.js";
export class InMemoryRepository<K, V> implements Repository<K, V> {
  private readonly data = new Map<K, V>();
  save(id: K, value: V): void { this.data.set(id, value); }
  findById(id: K): V | undefined { return this.data.get(id); }
  delete(id: K): boolean { return this.data.delete(id); }
  list(): V[] { return [...this.data.values()]; }
}
