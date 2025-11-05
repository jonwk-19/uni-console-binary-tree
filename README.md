### Proyecto de Árboles (Binary & General Tree)**

Este proyecto implementa una estructura de datos de árbol con la capacidad de trabajar tanto con árboles generales como árboles binarios de búsqueda. La funcionalidad incluye la creación de nodos, la adición de nodos e hijos, varios tipos de recorrido y la verificación de las propiedades del árbol.

---

#### **Requisitos previos:**

* **Node.js** debe estar instalado en tu máquina para ejecutar este proyecto.

---

### **Estructura del Código**

* **Clase `Node`**:

  * Representa un nodo en el árbol. Cada nodo tiene:

    * `data`: el valor del nodo.
    * `left`: hijo izquierdo (solo en árbol binario).
    * `right`: hijo derecho (solo en árbol binario).
    * `children`: lista de hijos (para árboles generales).

* **Clase `Tree`**:

  * Gestiona la estructura del árbol, ya sea binario o general.
  * Proporciona métodos para crear el árbol, agregar nodos e hijos, imprimir el árbol y realizar recorridos.

* **Clase `TreeMenu`**:

  * Interfaz de consola que permite interactuar con el árbol a través de un menú.
  * Usa la librería `readline` para la entrada del usuario.

---

### **Funcionalidades del Proyecto**

1. **Crear Nodo Raíz**:

   * Permite crear un árbol con un nodo raíz con un valor específico.

2. **Agregar Hijo a un Nodo (Árbol General)**:

   * Agrega un hijo a un nodo específico en un árbol general.

3. **Agregar Nodo (Árbol Binario de Búsqueda)**:

   * Agrega un nodo en un árbol binario de búsqueda, asegurándose de mantener el orden.

4. **Mostrar el Árbol**:

   * Imprime la estructura del árbol de forma visual.

     * En árbol binario: se muestra "de lado", representando las ramas.
     * En árbol general: se muestra con una indentación simple.

5. **Recorridos del Árbol**:

   * Realiza los recorridos **Preorden**, **Inorden** y **Postorden** en árboles binarios de búsqueda.

6. **Altura del Árbol**:

   * Calcula la altura del árbol, es decir, el número máximo de niveles en el árbol.

7. **Verificar si el Árbol es Binario**:

   * Verifica si el árbol actual sigue la estructura de un árbol binario.

8. **Cambiar entre Árbol Binario y General**:

   * Permite cambiar entre un árbol binario de búsqueda y un árbol general.

---

### **Cómo Ejecutarlo**

1. **Clona o descarga el proyecto** a tu máquina local.

2. **Instala Node.js** si aún no lo tienes (puedes descargarlo desde [aquí](https://nodejs.org/)).

3. Abre una terminal o línea de comandos y navega a la carpeta donde descargaste el proyecto.

4. **Ejecuta el archivo** principal con el siguiente comando:

   ```bash
   node treeMenu.js
   ```

5. Verás el menú interactivo en la consola, donde puedes elegir opciones para crear el árbol, agregar nodos, hacer recorridos, y más.

---

### **Opciones del Menú**

1. **Crear nodo raíz**: Permite definir el nodo raíz del árbol.
2. **Agregar hijo a un nodo**: Añade un hijo a un nodo específico en el árbol general.
3. **Agregar nodo en árbol binario**: Agrega un nodo a un árbol binario de búsqueda.
4. **Mostrar árbol**: Imprime la estructura del árbol.
5. **Recorridos**: Realiza y muestra los recorridos Preorden, Inorden y Postorden.
6. **Altura del árbol**: Muestra la altura del árbol.
7. **Verificar si el árbol es binario**: Verifica si el árbol sigue la estructura de un árbol binario.
8. **Cambiar entre árbol binario y general**: Permite alternar entre un árbol binario y un árbol general.
9. **Salir**: Termina el programa.

---

### **Ejemplo de Uso**

```bash
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

Si eliges la opción "Crear nodo raíz", te pedirá ingresar el valor para la raíz, como se muestra a continuación:

```bash
Elige una opción: 1
Ingrese el valor de la raíz: 10
Raíz creada con el valor: 10
```

---

### **Contribuciones**

Si deseas contribuir a este proyecto, puedes:

* Enviar un **pull request**.
* Reportar **problemas** o **errores** a través de issues.
* Añadir nuevas funcionalidades o mejorar el rendimiento del código.

---

### **Licencia**

Este proyecto está bajo la **Licencia MIT**. Puedes usar, modificar y distribuir este código según tus necesidades.

---

¡Gracias por utilizar el proyecto de árboles!
