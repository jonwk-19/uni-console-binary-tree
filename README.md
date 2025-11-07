### **README - Proyecto de Árboles (Binary & General Tree) con Interfaz Web**

Este proyecto implementa una estructura de datos de árboles con soporte tanto para árboles binarios de búsqueda (BST) como árboles generales. El proyecto tiene dos formas de interacción:

1. **Interfaz de Línea de Comandos (CLI)** usando Node.js.
2. **Interfaz Web (Frontend)** usando HTML, CSS y JavaScript puro.

---

### **Requisitos Previos**

Para la ejecución de este proyecto, asegúrate de tener:

* **Node.js** (solo para la versión CLI).
* Un navegador moderno (para la versión Web).

---

### **Estructura del Proyecto**

1. **Modo CLI (Línea de Comandos)**:

   * **Archivo principal**: `main.js`
   * Usa Node.js para interactuar con el árbol a través de un menú de consola.

2. **Modo Web (Interfaz Gráfica)**:

   * **Archivo principal**: `index.html`
   * Usa HTML, CSS y JavaScript para interactuar con el árbol de forma visual.

---

### **Características del Proyecto**

#### **Modo CLI**

La versión de línea de comandos te permite interactuar con el árbol de manera sencilla desde la terminal. Las funcionalidades incluyen:

* **Crear un nodo raíz**: Crea un árbol con un nodo raíz.
* **Agregar hijos a un nodo**: Permite agregar nodos hijos a un nodo específico (para árboles generales).
* **Agregar nodos en árbol binario**: Mantiene las reglas del árbol binario de búsqueda.
* **Mostrar el árbol**: Imprime la estructura del árbol en formato texto.
* **Realizar recorridos**: Preorden, Inorden y Postorden en árboles binarios de búsqueda.
* **Verificar si es binario**: Permite verificar si el árbol sigue la estructura de un árbol binario.
* **Obtener altura del árbol**: Calcula y muestra la altura del árbol.

#### **Modo Web**

La interfaz web te permite gestionar el árbol de manera visual e interactiva desde un navegador. Las funcionalidades en el frontend son similares a las del CLI, pero con botones y formularios. Las opciones incluyen:

* **Crear nodo raíz**: Crear un nodo raíz para un árbol general.
* **Agregar hijo a un nodo**: Agregar nodos hijos en un árbol general.
* **Operaciones generales**: Mostrar el árbol, realizar recorridos (Preorden, Inorden, Postorden), y obtener la altura del árbol.
* **Árbol Binario de Búsqueda (BST)**: Construir un BST a partir de una lista de números e interactuar con él.
* **Estadísticas y reinicio**: Ver estadísticas del árbol y reiniciar el árbol general a su estado inicial.
* **Interfaz amigable**: Todo gestionado mediante una interfaz limpia y moderna con botones interactivos.

---

### **Cómo Ejecutar el Proyecto**

#### **Opción 1: Ejecutar en CLI (Línea de Comandos)**

1. **Clona o descarga el proyecto**.
2. Asegúrate de tener **Node.js** instalado. Si no lo tienes, puedes descargarlo desde [aquí](https://nodejs.org/).
3. Navega a la carpeta donde descargaste el proyecto.
4. Una vez dentro navega a la carpeta `/cli`, ahi encontraras el archivo `main.js`
5. Abre la terminal y ejecuta el archivo principal con:

   ```bash
   node main.js
   ```

6. Interactúa con el árbol mediante el menú en la consola.

#### **Opción 2: Ejecutar en Web (Interfaz Gráfica)**

1. **Clona o descarga el proyecto**.
2. Navega a la carpeta donde descargaste el proyecto.
3. Una vez dentro navega a la carpeta `/web`, ahi encontraras el archivo `index.html`
4. Abre el archivo `index.html` en tu navegador favorito.
5. Verás una interfaz de usuario interactiva donde podrás gestionar el árbol visualmente.
6. Usa los botones y formularios para realizar las operaciones en el árbol (crear nodos, agregar hijos, realizar recorridos, etc.).

---

### **Opciones de Menú en la Web y CLI**

Ambas versiones (CLI y Web) permiten las siguientes operaciones:

1. **Crear nodo raíz**: Crea el nodo raíz en el árbol.
2. **Agregar hijo a un nodo**: Añade un nodo hijo a un nodo específico en un árbol general.
3. **Mostrar árbol**: Imprime la estructura del árbol.
4. **Recorridos**: Realiza recorridos en preorden, inorden o postorden en un árbol binario de búsqueda (BST).
5. **Altura del árbol**: Calcula la altura del árbol.
6. **¿Es binario?**: Verifica si el árbol sigue la estructura de un árbol binario.
7. **Cambiar entre árbol binario y general**: Alterna entre trabajar con un árbol general o con un árbol binario.
8. **Estadísticas**: Muestra estadísticas sobre el árbol (solo disponible en Web).
9. **Cargar árbol de ejemplo**: Carga un árbol de ejemplo para ver cómo funciona el sistema (solo disponible en Web).
10. **Reiniciar árbol**: Reinicia el árbol a su estado original (solo disponible en Web).

---

### **Vista Previa (Modo Web)**

**Interfaz**:

* La página tiene un **diseño moderno con tema oscuro**.
* Cada operación está organizada en **paneles** para facilitar la navegación.
* **Botones interactivos** para realizar acciones, como agregar nodos, mostrar el árbol, o realizar recorridos.
* Los resultados y mensajes se muestran en paneles de **salida**.

**Pantallas**:

* **Panel de Controles**: Permite agregar nodos, elegir recorridos y realizar operaciones.
* **Panel de Salida**: Muestra el árbol generado, los resultados de los recorridos, y cualquier mensaje del sistema.

---

### **Ejemplo de Uso en Web**

1. **Crear nodo raíz**: Ingresa el valor para el nodo raíz y presiona el botón "Crear raíz".
2. **Agregar hijo**: Ingresa los valores del nodo padre e hijo, y presiona "Agregar hijo".
3. **Ver el árbol**: Presiona "Mostrar árbol" para ver la estructura.
4. **Realizar recorridos**: Elige "Preorden", "Inorden" o "Postorden" para ver los resultados.
5. **Estadísticas**: Presiona "Estadísticas" para obtener información adicional del árbol.

---

### **Contribuciones**

Si deseas contribuir a este proyecto, puedes:

* Enviar un **pull request**.
* Reportar **errores** o **problemas** a través de **issues**.
* Mejorar o agregar **funcionalidades** como nuevos tipos de recorridos o optimización del código.

---

### **Licencia**

Este proyecto está bajo la **Licencia MIT**. Puedes usar, modificar y distribuir este código libremente bajo los términos de dicha licencia.

---

¡Gracias por usar el proyecto de árboles! ¡Disfruta explorando y manipulando estructuras de árboles de manera interactiva! 🌳💚
