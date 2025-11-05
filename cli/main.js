class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.children = [];
  }
}

class Tree {
  constructor() {
    this.root = null;
    this.isBinarySearchTree = false;
  }

  // Crear un árbol con un nodo raíz
  createRoot(data) {
    if (!this.root) {
      this.root = new Node(data);
      console.log(`Raíz creada con el valor: ${data}`);
    } else {
      console.log("Ya existe un árbol con raíz.");
    }
  }

  // Agregar hijo (en un árbol general)
  addChild(parentData, childData) {
    const parentNode = this.findNode(this.root, parentData);

    if (!parentNode) {
      console.log(`No se encontró el nodo con valor ${parentData}`);
      return;
    }

    if (parentNode.children.some(child => child.data === childData)) {
      console.log(`El hijo con valor ${childData} ya existe en este nodo.`);
      return;
    }

    parentNode.children.push(new Node(childData));
    console.log(`Hijo con valor ${childData} agregado al nodo ${parentData}`);
  }

  // Agregar nodo (en un árbol binario)
  addNode(data) {
    const value = Number(data);

    if (!this.root) {
      this.createRoot(value);
    } else {
      // A partir de que usamos esta función,
      // asumimos que estamos trabajando como árbol binario de búsqueda
      this.isBinarySearchTree = true;
      this._addNodeBinary(this.root, value);
    }
  }

  _addNodeBinary(node, data) {
    if (data < node.data) {
      if (node.left === null) {
        node.left = new Node(data);
        console.log(`Nodo con valor ${data} agregado a la izquierda de ${node.data}`);
      } else {
        this._addNodeBinary(node.left, data);
      }
    } else if (data > node.data) {
      if (node.right === null) {
        node.right = new Node(data);
        console.log(`Nodo con valor ${data} agregado a la derecha de ${node.data}`);
      } else {
        this._addNodeBinary(node.right, data);
      }
    } else {
      console.log(`El valor ${data} ya existe en el árbol.`);
    }
  }


  // Mostrar el árbol
  printTree(node = this.root) {
    if (!node) {
      console.log('El árbol está vacío.');
      return;
    }

    if (this.isBinarySearchTree) {
      // Árbol binario: lo imprimimos "de lado" con ramas
      this._printBinary(node, '', true);
    } else {
      // Árbol general: indentación simple
      this._printGeneral(node, '');
    }
  }

  // Árbol general
  _printGeneral(node, indent) {
    if (!node) return;

    console.log(indent + node.data);
    node.children.forEach(child => this._printGeneral(child, indent + '  '));
  }

  // Árbol binario
  _printBinary(node, prefix, isLeft) {
    if (!node) return;

    // Primero imprimimos el subárbol derecho (arriba)
    if (node.right !== null) {
      this._printBinary(
        node.right,
        prefix + (isLeft ? '│   ' : '    '),
        false
      );
    }

    // Luego el nodo actual
    console.log(prefix + (isLeft ? '└── ' : '┌── ') + node.data);

    // Luego el subárbol izquierdo (abajo)
    if (node.left !== null) {
      this._printBinary(
        node.left,
        prefix + (isLeft ? '    ' : '│   '),
        true
      );
    }
  }

  // Recorridos
  preOrder(node = this.root) {
    if (!node) return;

    console.log(node.data);

    if (this.isBinarySearchTree) {
      this.preOrder(node.left);
      this.preOrder(node.right);
    } else {
      node.children.forEach(child => this.preOrder(child));
    }
  }

  inOrder(node = this.root) {
    if (!node) return;

    if (this.isBinarySearchTree) {
      this.inOrder(node.left);
      console.log(node.data);
      this.inOrder(node.right);
    } else {
      console.log(node.data);
      node.children.forEach(child => this.inOrder(child));
    }
  }

  postOrder(node = this.root) {
    if (!node) return;

    if (this.isBinarySearchTree) {
      this.postOrder(node.left);
      this.postOrder(node.right);
      console.log(node.data);
    } else {
      node.children.forEach(child => this.postOrder(child));
      console.log(node.data);
    }
  }


  // Calcular altura del árbol
  getHeight(node = this.root) {
    if (!node) return 0;

    if (this.isBinarySearchTree) {
      // Altura de árbol binario por niveles
      const leftHeight = this.getHeight(node.left);
      const rightHeight = this.getHeight(node.right);
      return Math.max(leftHeight, rightHeight) + 1;
    } else {
      // Árbol general: tomamos el máximo de las alturas de sus hijos
      if (!node.children || node.children.length === 0) {
        return 1; // un nodo solo = nivel 1
      }

      let maxChildHeight = 0;
      for (const child of node.children) {
        const h = this.getHeight(child);
        if (h > maxChildHeight) maxChildHeight = h;
      }
      return maxChildHeight + 1;
    }
  }

  // Verificar si el árbol es binario
  isBinary(node = this.root) {
    if (!node) return true;
    if (node.children.length > 2) {
        return false;
    }
    let leftIsBinary = this.isBinary(node.left);
    let rightIsBinary = this.isBinary(node.right);
    return leftIsBinary && rightIsBinary;
  }

  // Buscar un nodo por valor
  findNode(node, data) {
    if (node === null) return null;
    if (node.data === data) return node;
    let found = null;
    node.children.forEach(child => {
      if (!found) found = this.findNode(child, data);
    });
    if (!found && this.isBinarySearchTree) {
      found = this.findNode(node.left, data);
    }
    if (!found && this.isBinarySearchTree) {
      found = this.findNode(node.right, data);
    }
    return found;
  }

  // Cambiar entre árbol binario y general
  toggleBinaryTree(isBinary) {
    this.isBinarySearchTree = isBinary;
    console.log(`El árbol ahora es ${isBinary ? 'binario' : 'general'}.`);
  }
}

class TreeMenu {
  constructor() {
    this.tree = new Tree();
    this.run();
  }

  showMenu() {
    console.log(`
    1. Crear nodo raíz
    2. Agregar hijo a un nodo
    3. Agregar nodo en árbol binario
    4. Mostrar árbol
    5. Recorridos (Preorden, Inorden, Postorden)
    6. Altura del árbol
    7. Verificar si el árbol es binario
    8. Salir
    `);
  }

  async run() {
    let exit = false;
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    while (!exit) {
      this.showMenu();
      const option = await this.askQuestion(rl, 'Elige una opción: ');

      switch (option) {
        case '1':
          const rootData = await this.askQuestion(rl, 'Ingrese el valor de la raíz: ');
          this.tree.createRoot(Number(rootData));
          break;

        case '2':
          const parentData = await this.askQuestion(rl, 'Ingrese el valor del nodo padre: ');
          const childData = await this.askQuestion(rl, 'Ingrese el valor del hijo: ');
          this.tree.addChild(Number(parentData), Number(childData));
          break;

        case '3':
          const nodeData = await this.askQuestion(rl, 'Ingrese el valor del nodo a agregar (para árbol binario): ');
          this.tree.addNode(Number(nodeData));
          break;

        case '4':
          console.log('Estructura del árbol:');
          this.tree.printTree();
          break;

        case '5':
          if (!this.tree.isBinarySearchTree) {
            console.log('Los recorridos Preorden, Inorden y Postorden solo aplican al árbol binario de búsqueda.');
            break;
          }
          console.log('Recorrido Preorden:');
          this.tree.preOrder();

          console.log('Recorrido Inorden:');
          this.tree.inOrder();

          console.log('Recorrido Postorden:');
          this.tree.postOrder();
          break;

        case '6':
          console.log(`Altura del árbol: ${this.tree.getHeight()}`);
          break;

        case '7':
          console.log(`¿El árbol es binario? ${this.tree.isBinary() ? 'Sí, cada nodo tiene como máximo dos hijos.' : 'No, no se cumple con la condicion de árbol binario (cada nodo debe tener como máximo dos hijos).'}`);
          break;

        case '8':
          exit = true;
          rl.close();
          break;

        default:
          console.log('Opción no válida.');
          break;
      }
    }
  }

  askQuestion(rl, question) {
      return new Promise(resolve => rl.question(question, resolve));
  }
}

// Iniciar el menú
new TreeMenu();
