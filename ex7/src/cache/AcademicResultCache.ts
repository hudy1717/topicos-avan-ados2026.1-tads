export class AcademicResultCache<K, V> {
  private readonly entries = new Map<K, V>();
  private hits = 0;
  private misses = 0;
  get(key: K): V | undefined {
    if (this.entries.has(key)) { this.hits++; return this.entries.get(key); }
    this.misses++; return undefined;
  }
  set(key: K, value: V): void { this.entries.set(key, value); }
  has(key: K): boolean { return this.entries.has(key); }
  invalidate(key: K): boolean { return this.entries.delete(key); }
  clear(): void { this.entries.clear(); }
  metrics(): { hits: number; misses: number; entries: number } {
    return { hits: this.hits, misses: this.misses, entries: this.entries.size };
  }
}
