/**
 * 寻找最大价值的矿堆
 * 使用迭代版DFS（显式栈）避免递归栈溢出，适合处理大地图
 */

/**
 * 计算地图中最大价值的矿堆（迭代DFS版本）
 * @param {string[]} grid - 地图数组，每行是一个字符串
 * @returns {number} - 最大矿堆的价值
 */
function findMaxOreValue(grid) {
    if (!grid || grid.length === 0) return 0;

    const rows = grid.length;
    const cols = grid[0].length;
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    let maxValue = 0;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] !== '0' && !visited[i][j]) {
                // 使用显式栈进行迭代DFS
                const stack = [[i, j]];
                visited[i][j] = true;
                let currentValue = 0;

                while (stack.length > 0) {
                    const [r, c] = stack.pop();
                    currentValue += parseInt(grid[r][c]);

                    for (const [dr, dc] of directions) {
                        const nr = r + dr;
                        const nc = c + dc;
                        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && 
                            grid[nr][nc] !== '0' && !visited[nr][nc]) {
                            visited[nr][nc] = true;
                            stack.push([nr, nc]);
                        }
                    }
                }

                maxValue = Math.max(maxValue, currentValue);
            }
        }
    }

    return maxValue;
}

/**
 * BFS版本（队列实现）
 * @param {string[]} grid - 地图数组
 * @returns {number} - 最大矿堆的价值
 */
function findMaxOreValueBFS(grid) {
    if (!grid || grid.length === 0) return 0;

    const rows = grid.length;
    const cols = grid[0].length;
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    let maxValue = 0;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] !== '0' && !visited[i][j]) {
                // 使用队列进行BFS
                const queue = [[i, j]];
                visited[i][j] = true;
                let currentValue = 0;

                while (queue.length > 0) {
                    const [r, c] = queue.shift();
                    currentValue += parseInt(grid[r][c]);

                    for (const [dr, dc] of directions) {
                        const nr = r + dr;
                        const nc = c + dc;
                        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && 
                            grid[nr][nc] !== '0' && !visited[nr][nc]) {
                            visited[nr][nc] = true;
                            queue.push([nr, nc]);
                        }
                    }
                }

                maxValue = Math.max(maxValue, currentValue);
            }
        }
    }

    return maxValue;
}

/**
 * 空间优化版本：原地修改地图，不使用visited数组
 * @param {string[]} grid - 地图数组（会被修改）
 * @returns {number} - 最大矿堆的价值
 */
function findMaxOreValueOptimized(grid) {
    if (!grid || grid.length === 0) return 0;

    const rows = grid.length;
    const cols = grid[0].length;
    // 将字符串转换为可修改的数组
    const map = grid.map(row => row.split(''));

    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    let maxValue = 0;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (map[i][j] !== '0') {
                const stack = [[i, j]];
                map[i][j] = '0'; // 标记为已访问
                let currentValue = 0;

                while (stack.length > 0) {
                    const [r, c] = stack.pop();
                    // 这里需要重新获取原始值，可以在入栈时保存
                    // 或者在修改前记录，这里为简化直接处理
                    currentValue += parseInt(grid[r][c]);

                    for (const [dr, dc] of directions) {
                        const nr = r + dr;
                        const nc = c + dc;
                        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && map[nr][nc] !== '0') {
                            map[nr][nc] = '0'; // 标记为已访问
                            stack.push([nr, nc]);
                        }
                    }
                }

                maxValue = Math.max(maxValue, currentValue);
            }
        }
    }

    return maxValue;
}

// 测试用例
const testCases = [
    { name: "示例1 - 4个金矿连成一片", input: ["22220", "00000", "00000", "01111"], expected: 8 },
    { name: "示例2 - 金矿银矿连通", input: ["22220", "00020", "00010", "01111"], expected: 15 },
    { name: "示例3 - 银矿价值3", input: ["20000", "00020", "00000", "00111"], expected: 3 },
    { name: "单格金矿", input: ["2"], expected: 2 },
    { name: "单格银矿", input: ["1"], expected: 1 },
    { name: "全是空地", input: ["000", "000"], expected: 0 },
    { name: "多个独立矿堆", input: ["20002", "00000", "20002"], expected: 2 },
    { name: "金矿银矿混合连通", input: ["121", "111"], expected: 7 },
    { name: "对角线不相连", input: ["202", "000", "202"], expected: 2 },
    { name: "大全地图", input: ["222", "212", "222"], expected: 17 }
];

// 运行测试
function runTests() {
    console.log("=== 寻找最大价值的矿堆 - 迭代DFS版本测试 ===\n");
    let dfsPassed = 0;
    testCases.forEach((tc, index) => {
        const actual = findMaxOreValue(tc.input);
        const passed = actual === tc.expected;
        if (passed) dfsPassed++;
        console.log(`测试 ${index + 1}: ${tc.name}`);
        console.log(`  预期: ${tc.expected}, 实际: ${actual} ${passed ? "✅ 通过" : "❌ 失败"}`);
    });
    console.log(`\n迭代DFS版本: ${dfsPassed}/${testCases.length} 通过\n`);

    console.log("=== BFS版本测试 ===\n");
    let bfsPassed = 0;
    testCases.forEach((tc, index) => {
        const actual = findMaxOreValueBFS(tc.input);
        const passed = actual === tc.expected;
        if (passed) bfsPassed++;
        console.log(`测试 ${index + 1}: ${tc.name}`);
        console.log(`  预期: ${tc.expected}, 实际: ${actual} ${passed ? "✅ 通过" : "❌ 失败"}`);
    });
    console.log(`\nBFS版本: ${bfsPassed}/${testCases.length} 通过\n`);

    console.log("=== 空间优化版本测试 ===\n");
    let optPassed = 0;
    testCases.forEach((tc, index) => {
        const actual = findMaxOreValueOptimized(tc.input);
        const passed = actual === tc.expected;
        if (passed) optPassed++;
        console.log(`测试 ${index + 1}: ${tc.name}`);
        console.log(`  预期: ${tc.expected}, 实际: ${actual} ${passed ? "✅ 通过" : "❌ 失败"}`);
    });
    console.log(`\n空间优化版本: ${optPassed}/${testCases.length} 通过\n`);

    // 大规模性能测试
    console.log("=== 大规模性能测试 (300x300地图) ===\n");
    const largeGrid = Array(300).fill('2'.repeat(300));
    
    console.time("迭代DFS");
    const dfsResult = findMaxOreValue(largeGrid);
    console.timeEnd("迭代DFS");
    
    console.time("BFS");
    const bfsResult = findMaxOreValueBFS(largeGrid);
    console.timeEnd("BFS");
    
    console.time("空间优化");
    const optResult = findMaxOreValueOptimized(largeGrid);
    console.timeEnd("空间优化");
    
    console.log(`\n所有版本结果一致: ${dfsResult === bfsResult && bfsResult === optResult}`);
    console.log(`最大矿堆价值: ${dfsResult}`);
}

runTests();
