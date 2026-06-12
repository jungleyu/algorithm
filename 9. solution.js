class UnionFind {
    constructor(size) {
        this.parent = Array.from({
            length: size,
        }, (_, k) => k);

        this.rank = Array(size).fill(0);
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX === rootY) {
            return;
        }

        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else {
            this.parent[rootY] = rootX;
            if (this.rank[rootX] === this.rank[rootY]) {
                this.rank[rootX]++;
            }
        }

    }
}

function findBestRoute(input) {
    const lines = input.trim().split('\n');
    const [R, C] = [lines[0], lines[1]].map(Number);
    const grid = lines.slice(2).map(line => line.split(' ').map(Number));
    const cells = [];
    for (let i = 0; i < R; i++) {
        for (let j = 0; j < C; j++) {
            cells.push({
                val: grid[i][j],
                x: i,
                y: j
            })
        }
    }

    cells.sort((a, b) => b.val - a.val);

    const uf = new UnionFind(R * C);
    const visited = Array(R).fill(0).map(() => Array(C).fill(false));
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (const { val, x, y } of cells) {
        visited[x][y] = true;
        for (const [ox, oy] of dirs) {
            const dx = x + ox, dy = y + oy;
            if (dx < 0 || dy < 0 || dx >= R || dy >= C) {
                continue;
            }
            if (visited[dx][dy]) {
                uf.union(dx * C + dy, x * C + y)
            }
        }
        if (uf.find(0) === uf.find((R - 1) * C + (C - 1))) {
            return val;
        }
    }
    return 0;
}