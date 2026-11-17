export interface Repository<K, V> { save(id: K, value: V): void; findById(id: K): V | undefined; delete(id: K): boolean; list(): V[]; }
