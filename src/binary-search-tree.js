const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
    constructor() {
        this.base = null
    }


    root() {
        return this.base
    }

    add(data) {
        let current = new Node(data);
        const addNode = (node, current) => {
            if (current.data < node.data) {
                if (node.left == null) {
                    node.left = current
                } else {
                    addNode(node.left, current);
                }
            } else {
                if (node.right == null) {
                    node.right = current;
                } else {
                    addNode(node.right, current)
                }
            }
        }
        if (this.base == null) {
            this.base = current;
        } else {
            addNode(this.base, current)
        }
    }



    has(data) {
        return this.find(data) !== null;
    }

    find(data) {
        return this.findNode(this.base, data)
    }

    findNode(node, data) {
        if (node == null) return null;
        else if (data < node.data) return this.findNode(node.left, data);
        else if (data > node.data) return this.findNode(node.right, data);
        else return node;
    }

    remove(data) {
        const removeNode = (node) => {
            if (!node) return;
            if (data < node.data) {
                node.left = removeNode(node.left);
                return node;
            }
            if (data > node.data) {
                node.right = removeNode(node.right);
                return node;
            }
            if (data === node.data) {
                if (node.left === null && node.right === null) {
                    return null;
                }
                if (node.left === null) {
                    node = node.right;
                    return node;
                }
                if (node.right === null) {
                    node = node.left;
                    return node;
                }
                let minRight = node.right;

                while (minRight.left) {
                    minRight = minRight.left;
                }
                node.data = minRight.data;
                data = minRight.data;
                node.right = removeNode(node.right);
                return node;
            }
        }
        this.base = removeNode(this.base);
    }

    min() {
        const findMinNode = (current) => {
            if (current && !current.left)
                return current.data;

            return findMinNode(current.left);
        }
        return findMinNode(this.base);
    }

    max() {
        const findMaxNode = (current) => {
            if (current && !current.right)
                return current.data;

            return findMaxNode(current.right);
        }
        return findMaxNode(this.base);
    }
}

module.exports = {
    BinarySearchTree
};