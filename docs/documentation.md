# 🌳 Documentación del Proyecto: Árbol General y Árbol Binario en JavaScript

## 📘 Descripción General

Este proyecto implementa una estructura de datos **árbol** en JavaScript que puede funcionar tanto como **árbol general** (con múltiples hijos por nodo) o como **árbol binario de búsqueda** (con máximo dos hijos por nodo, ordenados por valor).

El código también incluye una interfaz de consola interactiva mediante Node.js que permite crear y manipular el árbol paso a paso.

---

## 🧩 Clases Principales

### ### 1. `Node`

Representa un **nodo** dentro del árbol.

```js
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.children = [];
  }
}
```

**Atributos:**

* `data`: valor del nodo.
* `left` / `right`: referencias a hijos izquierdo y derecho (modo binario).
* `children`: lista de hijos (modo general).

---

### 2. `Tree`

Representa el **árbol completo** y gestiona su estructura, impresión y recorridos.

```js
class Tree {
  constructor() {
    this.root = null;
    this.isBinarySearchTree = false;
  }
}
```

#### 🧱 Métodos principales

| Método                            | Descripción                                                          |
| --------------------------------- | -------------------------------------------------------------------- |
| `createRoot(data)`                | Crea el nodo raíz del árbol si aún no existe.                        |
| `addChild(parentData, childData)` | Agrega un hijo a un nodo existente (modo general).                   |
| `addNode(data)`                   | Agrega un nodo siguiendo las reglas de un árbol binario de búsqueda. |
| `_addNodeBinary(node, data)`      | Función recursiva interna usada por `addNode()`.                     |
| `printTree()`                     | Muestra el árbol completo en consola (según el modo activo).         |
| `preOrder(node)`                  | Recorre el árbol en **preorden**.                                    |
| `inOrder(node)`                   | Recorre el árbol en **inorden**.                                     |
| `postOrder(node)`                 | Recorre el árbol en **postorden**.                                   |
| `getHeight(node)`                 | Calcula la **altura** del árbol.                                     |
| `isBinary(node)`                  | Verifica si el árbol cumple las propiedades de un árbol binario.     |
| `findNode(node, data)`            | Busca un nodo por su valor.                                          |
| `toggleBinaryTree(isBinary)`      | Cambia entre **modo general** y **modo binario**.                    |

---

### 3. `TreeMenu`

Controla la **interfaz de usuario por consola**, utilizando el módulo `readline` de Node.js.

```js
class TreeMenu {
  constructor() {
    this.tree = new Tree();
    this.run();
  }
}
```

#### 🔹 Funcionalidades del menú

| Opción                                  | Descripción                                              |
| --------------------------------------- | -------------------------------------------------------- |
| **1. Crear nodo raíz**                  | Crea el nodo raíz del árbol.                             |
| **2. Agregar hijo a un nodo**           | Agrega un hijo (solo modo general).                      |
| **3. Agregar nodo en árbol binario**    | Inserta un nodo como árbol binario de búsqueda.          |
| **4. Mostrar árbol**                    | Imprime la estructura del árbol.                         |
| **5. Recorridos**                       | Muestra los recorridos Preorden, Inorden y Postorden.    |
| **6. Altura del árbol**                 | Calcula y muestra la altura actual.                      |
| **7. Verificar si el árbol es binario** | Indica si la estructura cumple las reglas de binariedad. |
| **8. Cambiar entre modos**              | Cambia entre **árbol general** y **binario**.            |
| **9. Salir**                            | Termina la ejecución del programa.                       |

---

## 💻 Ejecución del Programa

### 🔧 Requisitos

* Tener **Node.js** instalado en tu sistema.

### ▶️ Ejecutar

Guarda el código en un archivo, por ejemplo:
`tree.js`

Luego, ejecuta en consola:

```bash
node tree.js
```

Aparecerá el menú interactivo:

```
1. Crear nodo raíz
2. Agregar hijo a un nodo
3. Agregar nodo en árbol binario
4. Mostrar árbol
5. Recorridos (Preorden, Inorden, Postorden)
6. Altura del árbol
7. Verificar si el árbol es binario
8. Cambiar entre árbol binario y general
9. Salir
```

---

## 🌿 Ejemplo de Uso

```bash
Elige una opción: 1
Ingrese el valor de la raíz: 10
Raíz creada con el valor: 10

Elige una opción: 3
Ingrese el valor del nodo a agregar (para árbol binario): 5
Nodo con valor 5 agregado a la izquierda de 10

Elige una opción: 3
Ingrese el valor del nodo a agregar (para árbol binario): 15
Nodo con valor 15 agregado a la derecha de 10

Elige una opción: 4
Estructura del árbol:
    ┌── 15
└── 10
    └── 5
```

---

## 🧮 Funcionalidades Destacadas

* ✅ Soporte para **dos tipos de árboles** (general y binario).
* ✅ Impresión visual del árbol binario en consola.
* ✅ Recorridos clásicos (Preorden, Inorden, Postorden).
* ✅ Cálculo de altura.
* ✅ Interfaz interactiva mediante consola.

---

## 🧠 Posibles Mejoras

* Añadir exportación del árbol a JSON.
* Implementar eliminación de nodos.
* Añadir visualización gráfica en navegador.
* Guardar el árbol en archivo local.

---

## 📄 Licencia

Este código puede ser utilizado libremente con fines educativos y personales.
Autor: *[Tu nombre aquí]*
