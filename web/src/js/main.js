"use strict";

import { Tree } from "./tree.js";
import { BinarySearchTree } from "./bst.js";
import { TreeUI } from "./tree-ui.js";

document.addEventListener("DOMContentLoaded", () => {
  const tree = new Tree();
  const bst = new BinarySearchTree();
  new TreeUI(tree, bst);
});
