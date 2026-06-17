function maxRobotArea(input) {
    const lines = input.trim().split('\n');
    const [m, n] = lines[0].split(' ').map(Number);
    
    const grid = [];
    for (let i = 1; i <= m; i++) {
        grid.push(lines[i].split(' ').map(Number));
    }
    
    const visited = Array(m).fill(null).map(() => Array(n).fill(false));
    let maxArea = 0;
    
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    function dfs(row, col) {
        if (row < 0 || row >= m || col < 0 || col >= n) return 0;
        if (visited[row][col]) return 0;
        
        visited[row][col] = true;
        let area = 1;
        
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            
            if (newRow >= 0 && newRow < m && newCol >= 0 && newCol < n && !visited[newRow][newCol]) {
                if (Math.abs(grid[row][col] - grid[newRow][newCol]) <= 1) {
                    area += dfs(newRow, newCol);
                }
            }
        }
        
        return area;
    }
    
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (!visited[i][j]) {
                const area = dfs(i, j);
                maxArea = Math.max(maxArea, area);
            }
        }
    }
    
    return maxArea;
}

function test() {
    const testCases = [
        {
            name: "示例1",
            input: `4 4
1 2 5 2
2 4 4 5
3 5 7 1
4 6 2 4`,
            expected: 6
        },
        {
            name: "单网格",
            input: `1 1
5`,
            expected: 1
        },
        {
            name: "全连通",
            input: `2 2
1 2
2 3`,
            expected: 4
        },
        {
            name: "完全隔离",
            input: `2 2
1 3
5 7`,
            expected: 1
        },
        {
            name: "斜向连通",
            input: `3 3
1 2 3
2 3 4
3 4 5`,
            expected: 9
        },
        {
            name: "单行",
            input: `1 5
1 2 3 4 5`,
            expected: 5
        },
        {
            name: "单列",
            input: `5 1
1
2
3
4
5`,
            expected: 5
        }
    ];
    
    console.log("=".repeat(60));
    console.log("机器人最大活动范围测试用例");
    console.log("=".repeat(60));
    console.log();
    
    let passed = 0;
    let failed = 0;
    
    for (const tc of testCases) {
        const result = maxRobotArea(tc.input);
        const isPassed = result === tc.expected;
        
        if (isPassed) {
            passed++;
            console.log(`✅ ${tc.name}`);
        } else {
            failed++;
            console.log(`❌ ${tc.name}`);
        }
        console.log(`   输出: ${result}`);
        console.log(`   预期: ${tc.expected}`);
        console.log();
    }
    
    console.log("=".repeat(60));
    console.log(`测试结果: ${passed} 通过, ${failed} 失败`);
    console.log("=".repeat(60));
}

test();