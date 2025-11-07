"use strict";

/**
 * Nodo para árbol general (k-ario).
 */
class TreeNode {
  constructor(value) {
    this.value = value;
    /** @type {TreeNode[]} */
    this.children = [];
  }
}

/**
 * Árbol general con raíz.
 */
class Tree {
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

/**
 * Nodo para árbol binario de búsqueda.
 */
class BSTNode {
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
class BinarySearchTree {
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
    // Inserción iterativa típica de un BST
    // (sin permitir duplicados)
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

  /**
   * Representación en texto del BST.
   * Formato sencillo indicando izquierda (L) y derecha (R).
   */
  toString() {
    if (!this.root) return "BST vacío.";

    const lines = [];

    const buildLines = (node, prefix, isLeft) => {
      if (!node) return;
      const connector = prefix ? (isLeft ? "└─L: " : "└─R: ") : "";
      lines.push(prefix + connector + node.value);

      const childPrefix = prefix + (prefix || connector ? "   " : "");
      if (node.left) buildLines(node.left, childPrefix, true);
      if (node.right) buildLines(node.right, childPrefix, false);
    };

    buildLines(this.root, "", true);
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

/**
 * Controlador de UI: conecta ambos árboles con la interfaz.
 */
class TreeUI {
  /**
   * @param {Tree} tree
   * @param {BinarySearchTree} bst
   */
  constructor(tree, bst) {
    this.tree = tree;
    this.bst = bst;

    // Árbol general
    this.rootValueInput = document.getElementById("rootValue");
    this.parentValueInput = document.getElementById("parentValue");
    this.childValueInput = document.getElementById("childValue");

    // BST
    this.bstValuesInput = document.getElementById("bstValues");

    // Displays
    this.treeDisplay = document.getElementById("treeDisplay");
    this.bstDisplay = document.getElementById("bstDisplay");
    this.messagesContainer = document.getElementById("messages");
    this.traversalContainer = document.getElementById("traversalResults");

    // Botones árbol general
    this.btnCreateRoot = document.getElementById("btnCreateRoot");
    this.btnAddChild = document.getElementById("btnAddChild");
    this.btnShowTree = document.getElementById("btnShowTree");
    this.btnPreorder = document.getElementById("btnPreorder");
    this.btnInorder = document.getElementById("btnInorder");
    this.btnPostorder = document.getElementById("btnPostorder");
    this.btnHeight = document.getElementById("btnHeight");
    this.btnIsBinary = document.getElementById("btnIsBinary");
    this.btnStats = document.getElementById("btnStats");
    this.btnDemo = document.getElementById("btnDemo");
    this.btnReset = document.getElementById("btnReset");

    // Botones BST
    this.btnBuildBST = document.getElementById("btnBuildBST");
    this.btnBSTPreorder = document.getElementById("btnBSTPreorder");
    this.btnBSTInorder = document.getElementById("btnBSTInorder");
    this.btnBSTPostorder = document.getElementById("btnBSTPostorder");

    this.bindEvents();
    this.refreshTreeDisplay();
    this.refreshBSTDisplay();
    this.showInfo("Listo para crear un árbol general o un BST ✨");
  }

  bindEvents() {
    // Árbol general
    this.btnCreateRoot.addEventListener("click", () => {
      try {
        const value = this.rootValueInput.value;
        this.tree.createRoot(value);
        this.refreshTreeDisplay();
        this.showInfo(`Raíz creada con valor "${value.trim()}".`);
      } catch (err) {
        this.showError(err.message);
      }
    });

    this.btnAddChild.addEventListener("click", () => {
      try {
        const parent = this.parentValueInput.value;
        const child = this.childValueInput.value;
        this.tree.addChild(parent, child);
        this.refreshTreeDisplay();
        this.showInfo(`Se agregó el nodo hijo "${child.trim()}" al padre "${parent.trim()}".`);
      } catch (err) {
        this.showError(err.message);
      }
    });

    this.btnShowTree.addEventListener("click", () => {
      this.refreshTreeDisplay();
      if (!this.tree.root) {
        this.showWarning("No hay árbol general que mostrar. Crea primero la raíz.");
      } else {
        this.showInfo("Árbol general mostrado en modo texto.");
      }
    });

    this.btnPreorder.addEventListener("click", () => {
      const result = this.tree.preorder();
      this.showTraversal("Árbol general · Preorden", result);
      if (!this.tree.root) {
        this.showWarning("El árbol general está vacío.");
      }
    });

    this.btnInorder.addEventListener("click", () => {
      try {
        const result = this.tree.inorder();
        this.showTraversal("Árbol general · Inorden", result);
      } catch (err) {
        this.showError(err.message);
      }
    });

    this.btnPostorder.addEventListener("click", () => {
      const result = this.tree.postorder();
      this.showTraversal("Árbol general · Postorden", result);
    });

    this.btnHeight.addEventListener("click", () => {
      const h = this.tree.height();
      if (h === 0) {
        this.showWarning("El árbol general está vacío. La altura es 0.");
      } else {
        this.showInfo(`La altura del árbol general es ${h}.`);
      }
    });

    this.btnIsBinary.addEventListener("click", () => {
      const { isBinary, offenders } = this.tree.checkBinary();
      if (!this.tree.root) {
        this.showWarning("El árbol general está vacío.");
        return;
      }

      if (isBinary) {
        this.showInfo(
          "✅ El árbol general es binario: todos los nodos tienen como máximo 2 hijos."
        );
      } else {
        const detail = offenders
          .map((o) => `"${o.value}" (${o.childrenCount} hijos)`)
          .join(", ");
        this.showError(
          `❌ El árbol general NO es binario. Estos nodos tienen más de 2 hijos: ${detail}.`
        );
      }
    });

    this.btnStats.addEventListener("click", () => {
      const nodes = this.tree.countNodes();
      const leaves = this.tree.countLeaves();
      const height = this.tree.height();

      if (nodes === 0) {
        this.showWarning("El árbol general está vacío, no hay estadísticas que mostrar.");
        return;
      }

      this.showInfo(
        `Estadísticas árbol general:\n- Nodos totales: ${nodes}\n- Hojas: ${leaves}\n- Altura: ${height}`
      );
    });

    this.btnDemo.addEventListener("click", () => {
      this.loadDemoTree();
      this.refreshTreeDisplay();
      this.showInfo("Árbol general de ejemplo cargado.");
    });

    this.btnReset.addEventListener("click", () => {
      this.tree.reset();
      this.refreshTreeDisplay();
      this.traversalContainer.innerHTML = "";
      this.showWarning(
        "Se ha reiniciado el árbol general. Empieza creando una nueva raíz si lo necesitas."
      );
    });

    // BST
    this.btnBuildBST.addEventListener("click", () => {
      try {
        const raw = this.bstValuesInput.value || "";
        const cleaned = raw.trim();
        if (!cleaned) {
          throw new Error("Ingresa al menos un número para construir el BST.");
        }

        const parts = cleaned.split(/[,\s]+/).filter(Boolean);
        const numbers = [];
        const invalidTokens = [];

        for (const token of parts) {
          const num = Number(token);
          if (Number.isNaN(num)) {
            invalidTokens.push(token);
          } else {
            numbers.push(num);
          }
        }

        if (invalidTokens.length > 0) {
          throw new Error(
            `Estos valores no son números válidos: ${invalidTokens.join(", ")}.`
          );
        }

        const steps = this.bst.buildFromArray(numbers);
        this.refreshBSTDisplay();

        const bulletSteps = steps.map((s) => `• ${s}`).join("\n");
        this.showInfo(
          `BST construido con los valores: ${numbers.join(", ")}.\n\nCómo se insertó (resumen rápido):\n${bulletSteps}`
        );
      } catch (err) {
        this.showError(err.message);
      }
    });

    this.btnBSTPreorder.addEventListener("click", () => {
      const result = this.bst.preorder();
      this.showTraversal("BST · Preorden", result.map((n) => String(n)));
      if (!this.bst.root) {
        this.showWarning("El BST está vacío.");
      }
    });

    this.btnBSTInorder.addEventListener("click", () => {
      const result = this.bst.inorder();
      this.showTraversal("BST · Inorden", result.map((n) => String(n)));
      if (!this.bst.root) {
        this.showWarning("El BST está vacío.");
      }
    });

    this.btnBSTPostorder.addEventListener("click", () => {
      const result = this.bst.postorder();
      this.showTraversal("BST · Postorden", result.map((n) => String(n)));
      if (!this.bst.root) {
        this.showWarning("El BST está vacío.");
      }
    });
  }

  refreshTreeDisplay() {
    this.treeDisplay.textContent = this.tree.toString();
  }

  refreshBSTDisplay() {
    this.bstDisplay.textContent = this.bst.toString();
  }

  showMessage(type, text) {
    const div = document.createElement("div");
    div.classList.add("message", type);

    const lines = text.split("\n");
    lines.forEach((line, index) => {
      div.appendChild(document.createTextNode(line));
      if (index < lines.length - 1) {
        div.appendChild(document.createElement("br"));
      }
    });

    this.messagesContainer.innerHTML = "";
    this.messagesContainer.appendChild(div);
  }

  showInfo(text) {
    this.showMessage("info", text);
  }

  showError(text) {
    this.showMessage("error", text);
  }

  showWarning(text) {
    this.showMessage("warning", text);
  }

  showTraversal(label, values) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("traversal-item");

    const labelEl = document.createElement("span");
    labelEl.classList.add("traversal-label");
    labelEl.textContent = label;

    wrapper.appendChild(labelEl);

    if (!values || values.length === 0) {
      const empty = document.createElement("span");
      empty.classList.add("traversal-chip");
      empty.textContent = "(árbol vacío)";
      wrapper.appendChild(empty);
    } else {
      for (const v of values) {
        const chip = document.createElement("span");
        chip.classList.add("traversal-chip");
        chip.textContent = v;
        wrapper.appendChild(chip);
      }
    }

    this.traversalContainer.appendChild(wrapper);
  }

  /**
   * Carga un árbol general de ejemplo.
   *        A
   *      / | \
   *     B  C  D
   *    / \    |
   *   E   F   G
   */
  loadDemoTree() {
    this.tree.reset();

    this.tree.createRoot("A");
    this.tree.addChild("A", "B");
    this.tree.addChild("A", "C");
    this.tree.addChild("A", "D");
    this.tree.addChild("B", "E");
    this.tree.addChild("B", "F");
    this.tree.addChild("D", "G");
  }
}

// Inicializar la app
document.addEventListener("DOMContentLoaded", () => {
  const tree = new Tree();
  const bst = new BinarySearchTree();
  new TreeUI(tree, bst);
});
