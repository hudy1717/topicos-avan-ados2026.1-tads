import { NumericBSTNode } from "./NumericBSTNode.js";
export class NumericBST {
  private root: NumericBSTNode | null = null;
  insert(value: number): boolean {
    if (!Number.isFinite(value)) throw new Error("Valor deve ser finito");
    if (this.root === null) { this.root = new NumericBSTNode(value); return true; }
    let node = this.root;
    while (true) {
      if (value === node.value) return false;
      if (value < node.value) {
        if (node.left === null) { node.left = new NumericBSTNode(value); return true; }
        node = node.left;
      } else {
        if (node.right === null) { node.right = new NumericBSTNode(value); return true; }
        node = node.right;
      }
    }
  }
  contains(value: number): boolean {
    let node = this.root;
    while (node !== null) {
      if (value === node.value) return true;
      node = value < node.value ? node.left : node.right;
    }
    return false;
  }
  inOrder(): number[] {
    const values: number[] = [];
    const walk = (node: NumericBSTNode | null): void => {
      if (node === null) return;
      walk(node.left); values.push(node.value); walk(node.right);
    };
    walk(this.root); return values;
  }
  height(): number {
    const h = (node: NumericBSTNode | null): number => node === null ? -1 : 1 + Math.max(h(node.left), h(node.right));
    return h(this.root);
  }
}
