function encrypt(input) {
    const lines = input.trim().split('\n');
    let idx = 0;
    
    // 读取明文长度N
    const N = parseInt(lines[idx++], 10);
    
    // 读取明文
    const plaintext = lines[idx++].trim().split(' ').map(Number);
    
    // 读取密码本大小M
    const M = parseInt(lines[idx++], 10);
    
    // 读取密码本矩阵
    const book = [];
    for (let i = 0; i < M; i++) {
        book.push(lines[idx++].trim().split(' ').map(Number));
    }
    
    // 找到所有匹配的起始位置（明文第一个数字）
    const results = [];
    const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    const visited = Array(M).fill(0).map(() => Array(M).fill(false));
    
    function dfs(x, y, pos, path) {
        if (pos === plaintext.length) {
            // 找到一个完整匹配
            results.push(path.map(p => `${p.x} ${p.y}`).join(' '));
            return;
        }
        
        const target = plaintext[pos];
        
        for (const [dx, dy] of dirs) {
            const nx = x + dx;
            const ny = y + dy;
            
            // 检查边界、相邻、未访问、数字匹配
            if (nx >= 0 && nx < M && ny >= 0 && ny < M && 
                !visited[nx][ny] && book[nx][ny] === target) {
                visited[nx][ny] = true;
                dfs(nx, ny, pos + 1, [...path, {x: nx, y: ny}]);
                visited[nx][ny] = false;
            }
        }
    }
    
    // 从所有可能的起始位置开始DFS
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < M; j++) {
            if (book[i][j] === plaintext[0]) {
                visited[i][j] = true;
                dfs(i, j, 1, [{x: i, y: j}]);
                visited[i][j] = false;
            }
        }
    }
    
    // 如果没有结果，返回error
    if (results.length === 0) {
        return 'error';
    }
    
    // 返回字典序最小的
    results.sort();
    return results[0];
}

// 测试
const tests = [
    {
        name: '示例1',
        input: `1
3
3
0 0 2
1 3 4
6 6 4`,
        expected: '1 1'
    },
    {
        name: '示例2-用例1',
        input: `2
0 3
3
0 0 2
1 3 4
6 6 4`,
        expected: '0 1 1 1'
    },
    {
        name: '示例2-用例2-error',
        input: `2
0 5
3
0 0 2
1 3 4
6 6 4`,
        expected: 'error'
    },
    {
        name: '示例3-多路径取最小',
        input: `4
0 0 2 4
4
0 0 2 4
1 3 4 6
3 4 1 5
6 6 6 5`,
        expected: '0 0 0 1 0 2 0 3'
    },
    {
        name: '示例4-error',
        input: `4
8 2 2 3
4
0 0 2 4
1 3 4 6
3 4 1 5
6 6 6 5`,
        expected: 'error'
    }
];

// 运行测试
let passed = 0, failed = 0;

console.log('='.repeat(60));
console.log('特殊加密算法 - 测试');
console.log('='.repeat(60));

tests.forEach((test, index) => {
    const result = encrypt(test.input);
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
