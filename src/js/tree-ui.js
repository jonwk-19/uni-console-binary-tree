"use strict";

export class TreeUI {
  /**
   * @param {import('./tree.js').Tree} tree
   * @param {import('./bst.js').BinarySearchTree} bst
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
          throw new Error("Ingresa un número para insertar en el BST.");
        }

        const num = Number(cleaned);
        if (Number.isNaN(num)) {
          throw new Error(`"${cleaned}" no es un número válido.`);
        }

        const steps = [];
        this.bst.insert(num, steps);
        this.refreshBSTDisplay();

        const bulletSteps = steps.map((s) => `• ${s}`).join("\n");
        this.showInfo(
          `Se intentó insertar el valor ${num} en el BST.\n\nDetalle:\n${bulletSteps}`
        );

        // limpiar y enfocar de nuevo el input
        this.bstValuesInput.value = "";
        this.bstValuesInput.focus();
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
