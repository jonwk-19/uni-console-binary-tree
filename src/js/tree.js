"use strict";

/**
 * Nodo para árbol general (k-ario).
 */
export class TreeNode {
  constructor(value) {
    this.value = value;
    /** @type {TreeNode[]} */
    this.children = [];
  }
}

/**
 * Árbol general con raíz.
 */
export class Tree {
  constructor() {
    /** @type {TreeNode | null} */
    this.root = null;
  }

  createRoot(value) {
    if (!value || !value.trim()) {
      throw new Error("El valor de la raíz no puede estar vacío.");
    }
    if (this.root) {
      throw new Error("La raíz ya existe. Reinicia el árbol si quieres crear otra.");
    }
    this.root = new TreeNode(value.trim());
  }

  findNode(value) {
    if (!this.root) return null;
    const target = value.trim();
    let found = null;

    const dfs = (node) => {
      if (!node || found) return;
      if (node.value === target) {
        found = node;
        return;
      }
      for (const child of node.children) {
        dfs(child);
      }
    };

    dfs(this.root);
    return found;
  }

  contains(value) {
    return this.findNode(value) !== null;
  }

  addChild(parentValue, childValue) {
    if (!this.root) {
      throw new Error("No hay árbol. Primero crea la raíz.");
    }
    const parent = this.findNode(parentValue);
    if (!parent) {
      throw new Error(`No se encontró el nodo padre con valor "${parentValue}".`);
    }
    if (!childValue || !childValue.trim()) {
      throw new Error("El valor del hijo no puede estar vacío.");
    }
    if (this.contains(childValue)) {
      throw new Error(
        `Ya existe un nodo con el valor "${childValue}". No se permiten duplicados.`
      );
    }
    const child = new TreeNode(childValue.trim());
    parent.children.push(child);
  }

  toString() {
    if (!this.root) return "Árbol vacío.";

    const lines = [];
    const buildLines = (node, depth) => {
      const indent = "  ".repeat(depth);
      lines.push(`${indent}- ${node.value}`);
      for (const child of node.children) {
        buildLines(child, depth + 1);
      }
    };

    buildLines(this.root, 0);
    return lines.join("\n");
  }

  preorder() {
    const result = [];
    const visit = (node) => {
      if (!node) return;
      result.push(node.value);
      for (const child of node.children) {
        visit(child);
      }
    };
    visit(this.root);
    return result;
  }

  postorder() {
    const result = [];
    const visit = (node) => {
      if (!node) return;
      for (const child of node.children) {
        visit(child);
      }
      result.push(node.value);
    };
    visit(this.root);
    return result;
  }

  inorder() {
    const { isBinary } = this.checkBinary();
    if (!isBinary) {
      throw new Error(
        "El árbol no es binario. El recorrido inorden solo está definido para árboles binarios."
      );
    }

    const result = [];
    const visit = (node) => {
      if (!node) return;
      const left = node.children[0] || null;
      const right = node.children[1] || null;

      if (left) visit(left);
      result.push(node.value);
      if (right) visit(right);
    };

    visit(this.root);
    return result;
  }

  height() {
    if (!this.root) return 0;

    const depth = (node) => {
      if (!node) return 0;
      if (node.children.length === 0) return 1;
      const childHeights = node.children.map((c) => depth(c));
      return 1 + Math.max(...childHeights);
    };

    return depth(this.root);
  }

  checkBinary() {
    const offenders = [];
    const visit = (node) => {
      if (!node) return;
      if (node.children.length > 2) {
        offenders.push({ value: node.value, childrenCount: node.children.length });
      }
      for (const child of node.children) {
        visit(child);
      }
    };
    if (this.root) visit(this.root);
    return { isBinary: offenders.length === 0, offenders };
  }

  countNodes() {
    if (!this.root) return 0;
    let count = 0;
    const visit = (node) => {
      if (!node) return;
      count++;
      for (const child of node.children) {
        visit(child);
      }
    };
    visit(this.root);
    return count;
  }

  countLeaves() {
    if (!this.root) return 0;
    let leaves = 0;
    const visit = (node) => {
      if (!node) return;
      if (node.children.length === 0) {
        leaves++;
      } else {
        for (const child of node.children) {
          visit(child);
        }
      }
    };
    visit(this.root);
    return leaves;
  }

  reset() {
    this.root = null;
  }
}
