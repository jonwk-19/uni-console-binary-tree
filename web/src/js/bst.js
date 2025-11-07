"use strict";

/**
 * Nodo para árbol binario de búsqueda.
 */
export class BSTNode {
  constructor(value) {
    this.value = value;
    /** @type {BSTNode | null} */
    this.left = null;
    /** @type {BSTNode | null} */
    this.right = null;
  }
}

/**
 * Árbol Binario de Búsqueda (BST).
 * Solo maneja números.
 */
export class BinarySearchTree {
  constructor() {
    /** @type {BSTNode | null} */
    this.root = null;
  }

  /**
   * Inserta un valor en el BST.
   * @param {number} value
   * @param {string[]} [steps] - Array opcional para registrar pasos de inserción.
   */
  insert(value, steps) {
    if (typeof value !== "number" || Number.isNaN(value)) {
      throw new Error("El BST solo acepta números válidos.");
    }

    if (!this.root) {
      this.root = new BSTNode(value);
      if (steps) steps.push(`${value} → raíz.`);
      return;
    }

    let current = this.root;
    while (true) {
      if (value === current.value) {
        if (steps) steps.push(`${value} ya existe en el árbol. Se ignora el duplicado.`);
        return;
      }

      if (value < current.value) {
        if (!current.left) {
          current.left = new BSTNode(value);
          if (steps)
            steps.push(`${value} < ${current.value} → va a la izquierda de ${current.value}.`);
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = new BSTNode(value);
          if (steps)
            steps.push(`${value} > ${current.value} → va a la derecha de ${current.value}.`);
          return;
        }
        current = current.right;
      }
    }
  }

  /**
   * Construye el BST desde un arreglo de números.
   * Reinicia el BST actual.
   * @param {number[]} values
   * @returns {string[]} pasos de inserción
   */
  buildFromArray(values) {
    this.root = null;
    const steps = [];
    for (const value of values) {
      this.insert(value, steps);
    }
    return steps;
  }

    toString() {
    if (!this.root) {
      return "BST vacío.\n(Ingresa un número y presiona \"Insertar en BST\")";
    }

    const lines = [];

    /**
     * Imprime el árbol de forma lateral:
     *
     * Ejemplo (aprox):
     *        54
     *     22
     *   9
     *     8
     *
     * Recorremos primero derecha, luego nodo, luego izquierda
     * para que la parte "grande" quede arriba.
     */
    const printNode = (node, prefix = "", isLeft = true) => {
      if (!node) return;

      // primero la derecha (se dibuja arriba)
      if (node.right) {
        const newPrefix = prefix + (isLeft ? "│   " : "    ");
        printNode(node.right, newPrefix, false);
      }

      // el propio nodo
      const connector = prefix ? (isLeft ? "└── " : "┌── ") : "";
      lines.push(prefix + connector + node.value);

      // luego la izquierda (se dibuja abajo)
      if (node.left) {
        const newPrefix = prefix + (isLeft ? "    " : "│   ");
        printNode(node.left, newPrefix, true);
      }
    };

    printNode(this.root, "", true);
    return lines.join("\n");
  }


  preorder() {
    const result = [];
    const visit = (node) => {
      if (!node) return;
      result.push(node.value);
      visit(node.left);
      visit(node.right);
    };
    visit(this.root);
    return result;
  }

  inorder() {
    const result = [];
    const visit = (node) => {
      if (!node) return;
      visit(node.left);
      result.push(node.value);
      visit(node.right);
    };
    visit(this.root);
    return result;
  }

  postorder() {
    const result = [];
    const visit = (node) => {
      if (!node) return;
      visit(node.left);
      visit(node.right);
      result.push(node.value);
    };
    visit(this.root);
    return result;
  }

  height() {
    const depth = (node) => {
      if (!node) return 0;
      return 1 + Math.max(depth(node.left), depth(node.right));
    };
    return depth(this.root);
  }
}
