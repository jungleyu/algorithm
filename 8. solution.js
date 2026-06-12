class TreeNode {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

class PriorityQueue {
    constructor() {
        this.heap = [];
    }
    enqueue(value) {
        this.heap.push(value);
        this.heap.sort((a, b) => a.value - b.value);
    }
    dequeue() {
        return this.heap.shift();
    }
    isEmpty() {
        return this.heap.length === 0;
    }
}

function buildHuffmanTree(values) {
    const pq = new PriorityQueue();
    values.forEach(v => pq.enqueue(new TreeNode(v)));

    while (pq.heap.length > 1) {
        const left = pq.dequeue();
        const right = pq.dequeue();
        const parent = new TreeNode(left.value + right.value, left, right);
        pq.enqueue(parent);
    }
    return pq.dequeue();
}

function printTree(node, path) {
    if (!node) {
        return;
    }
    printTree(node.left, path);
    path.push(node.value);
    printTree(node.right, path);
}



function printHuffmanTree(arr) {
    const root = buildHuffmanTree(arr);
    const ans = [];
    printTree(root, ans);
    console.log(ans);
    return ans;
}

printHuffmanTree([5, 15, 40, 30, 10]);
