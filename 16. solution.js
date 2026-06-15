function climbMountain(input) {
    const lines = input.trim().split('\n');
    const [m, n, k] = lines[0].split(' ').map(Number);
    const grid = lines.slice(1).map(line => line.split(' ').map(Number));

    const visited = Array(m).fill(0).map(() => Array(n).fill(false))
    const dist = Array(m).fill(0).map(() => Array(n).fill(0))
    const dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    const queue = [[0, 0]];
    visited[0][0] = true;


    while (queue.length > 0) {
        const [x, y] = queue.shift();
        for (const [dx, dy] of dirs) {
            const nx = x + dx, ny = y + dy;
            if (nx < 0 || ny < 0 || nx >= m || ny >= n) {
                continue;
            }
            if (visited[nx][ny]) {
                continue;
            }
            if (Math.abs(grid[nx][ny] - grid[x][y]) <= k) {
                visited[nx][ny] = true;
                queue.push([nx, ny]);
                dist[nx][ny] = dist[x][y] + 1;
            }
        }
    }
    let maxHeight = 0, minSteps = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (visited[i][j] && grid[i][j] > 0) {
                let height = grid[i][j];
                let step = dist[i][j];
                if (height > maxHeight) {
                    maxHeight = height;
                    minSteps = step;
                } else if (height === maxHeight && step < minSteps) {
                    minSteps = step;
                }
            }
        }
    }

    return maxHeight === 0 ? '0 0' : `${maxHeight} ${minSteps}`

}

// 测试用例
const tests = [
    {
        name: '示例1',
        input: `5 4 1
0 1 2 0
1 0 0 0
1 0 1 2
1 3 1 0
0 0 0 9`,
        expected: '2 2'
    },
    {
        name: '示例2-无法爬山',
        input: `5 4 3
0 0 0 0
0 0 0 0
0 9 0 0
0 0 0 0
0 0 0 9`,
        expected: '0 0'
    },
    {
        name: '起点就是山峰',
        input: `1 1 1
5`,
        expected: '5 0'
    },
    {
        name: '单一路径爬山',
        input: `3 3 1
1 2 3
0 0 0
0 0 0`,
        expected: '3 2'
    },
    {
        name: '多路径取最短',
        input: `3 3 1
1 2 3
1 0 3
1 2 3`,
        expected: '3 2'
    },
    {
        name: '同高度取最短步数',
        input: `4 4 1
0 1 1 2
0 0 0 2
0 0 0 2
0 0 0 2`,
        expected: '2 3'
    },
    {
        name: 'k=0只能平地移动',
        input: `3 3 0
0 0 5
0 0 0
5 0 0`,
        expected: '0 0'
    },
    {
        name: '全是平地',
        input: `3 3 1
0 0 0
0 0 0
0 0 0`,
        expected: '0 0'
    },
    {
        name: '大地图爬山',
        input: `5 5 2
0 1 3 5 7
0 2 4 6 8
0 1 3 5 9
0 2 4 6 8
0 1 3 5 7`,
        expected: '9 6'
    },
    {
        name: '边界测试',
        input: `2 2 1
0 1
2 3`,
        expected: '1 1'
    }
];

// 运行测试
let passed = 0, failed = 0;

console.log('='.repeat(60));
console.log('周末爬山 - 测试用例');
console.log('='.repeat(60));

tests.forEach((test, index) => {
    const result = climbMountain(test.input);
    const success = result === test.expected;

    console.log(`\n测试 ${index + 1}: ${test.name}`);
    console.log(`期望: ${test.expected}`);
    console.log(`实际: ${result}`);
    console.log(`结果: ${success ? '✅ 通过' : '❌ 失败'}`);

    if (success) passed++; else failed++;
});

console.log('\n' + '='.repeat(60));
console.log(`测试完成: ${passed} 通过, ${failed} 失败`);
console.log('='.repeat(60));

// DFS方案
function climbMountainDFS(input) {
    const lines = input.trim().split('\n');
    const [m, n, k] = lines[0].split(' ').map(Number);
    const grid = lines.slice(1).map(line => line.split(' ').map(Number));
    
    const dist = Array(m).fill(0).map(() => Array(n).fill(Infinity));
    const dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    
    // DFS遍历，记录到达每个点的最短距离
    function dfs(x, y, steps, fromX, fromY) {
        if (steps >= dist[x][y]) return;
        
        dist[x][y] = steps;
        
        for (const [dx, dy] of dirs) {
            const nx = x + dx, ny = y + dy;
            if (nx < 0 || ny < 0 || nx >= m || ny >= n) continue;
            if (nx === fromX && ny === fromY) continue;  // 不走回头路
            if (Math.abs(grid[nx][ny] - grid[x][y]) <= k) {
                dfs(nx, ny, steps + 1, x, y);
            }
        }
    }
    
    // 不提前设置dist[0][0]，让DFS自己设置
    dfs(0, 0, 0, -1, -1);
    
    // 查找最高山峰和最短步数
    let maxHeight = 0, minSteps = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (dist[i][j] !== Infinity && grid[i][j] > 0) {
                const height = grid[i][j];
                const step = dist[i][j];
                if (height > maxHeight) {
                    maxHeight = height;
                    minSteps = step;
                } else if (height === maxHeight && step < minSteps) {
                    minSteps = step;
                }
            }
        }
    }
    
    return maxHeight === 0 ? '0 0' : `${maxHeight} ${minSteps}`;
}

// 对比两种方案
console.log('\n\n' + '='.repeat(60));
console.log('BFS vs DFS 方案对比');
console.log('='.repeat(60));

let allMatch = true;
tests.forEach((test, index) => {
    const bfsResult = climbMountain(test.input);
    const dfsResult = climbMountainDFS(test.input);
    const match = bfsResult === dfsResult;
    if (!match) allMatch = false;
    
    console.log(`\n测试 ${index + 1}: ${test.name}`);
    console.log(`BFS: ${bfsResult}`);
    console.log(`DFS: ${dfsResult}`);
    console.log(`一致: ${match ? '✅' : '❌'}`);
});

console.log('\n' + '='.repeat(60));
console.log(`总体: ${allMatch ? '两种方案结果一致✅' : '存在不一致❌'}`);
console.log('='.repeat(60));
