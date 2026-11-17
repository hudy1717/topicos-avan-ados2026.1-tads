import type { QueueContract } from "../collections/QueueContract.js";
export class UndirectedGraph<T> {
  private readonly adjacency = new Map<T, Set<T>>();
  addVertex(vertex: T): void { if (!this.adjacency.has(vertex)) this.adjacency.set(vertex, new Set()); }
  addEdge(a: T, b: T): void {
    this.addVertex(a); this.addVertex(b);
    this.adjacency.get(a)!.add(b); this.adjacency.get(b)!.add(a);
  }
  bfs(start: T, queue: QueueContract<T>): T[] {
    if (!this.adjacency.has(start)) return [];
    const visited = new Set<T>([start]); const order: T[] = [];
    queue.enqueue(start);
    while (!queue.isEmpty()) {
      const current = queue.dequeue();
      if (current === undefined) break;
      order.push(current);
      for (const next of this.adjacency.get(current)!) {
        if (!visited.has(next)) { visited.add(next); queue.enqueue(next); }
      }
    }
    return order;
  }
  shortestUnweightedPath(start: T, end: T, queue: QueueContract<T>): T[] | null {
    if (!this.adjacency.has(start) || !this.adjacency.has(end)) return null;
    const visited = new Set<T>([start]); const previous = new Map<T, T>();
    queue.enqueue(start);
    while (!queue.isEmpty()) {
      const current = queue.dequeue();
      if (current === undefined) break;
      if (current === end) {
        const path: T[] = [end]; let cursor = end;
        while (previous.has(cursor)) { cursor = previous.get(cursor)!; path.push(cursor); }
        return path.reverse();
      }
      for (const next of this.adjacency.get(current)!) {
        if (!visited.has(next)) { visited.add(next); previous.set(next, current); queue.enqueue(next); }
      }
    }
    return null;
  }
}
