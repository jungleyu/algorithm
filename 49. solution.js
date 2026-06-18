function minGas(input) {
    const lines = input.trim().split('\n');
    const [M, N] = lines[0].split(',').map(Number);
    const map = lines.slice(1).map(line => line.split(',').map(Number));

    const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    const visited = Array(M).fill(0).map(() => Array(N).fill(false));

    // -1 表示加油站，可以加满油，汽车的油箱容量最大为100；
    // 0 ：表示这个地区是障碍物，汽车不能通过
    // 正整数：表示汽车走过这个地区的耗油量
    // 如果汽车无论如何都无法到达终点，则返回 -1

    const path = [];

    function dfs(x, y, gas) {
        if (map[x][y] === 0) {
            return;
        }
        if (map[x][y] === -1) {
            gas = 0;
        } else {
            gas += map[x][y];
        }
        if (gas > 100) {
            return;
        }

        if (x === 0 && y === 0) {
            path.push(gas);
            return;
        }

        visited[x][y] = true;

        for (const [dx, dy] of dirs) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx < 0 || nx >= M || ny < 0 || ny >= N) {
                continue;
            }
            if (visited[nx][ny]) {
                continue;
            }
            dfs(nx, ny, gas);
        }
    }

    dfs(M - 1, N - 1, 0);

    return path.length > 0 ? Math.min(...path) : -1;
}

function runTests() {
    const tests = [
        { 
            name: "示例1", 
            input: "2,2\n10,20\n30,40", 
            expected: 70,
            desc: "最简单的2x2地图"
        },
        { 
            name: "示例2", 
            input: "4,4\n10,30,30,20\n30,30,-1,10\n0,20,20,40\n10,-1,30,40", 
            expected: 70,
            desc: "有加油站的情况"
        },
        { 
            name: "示例4", 
            input: "4,4\n10,30,30,20\n30,30,20,10\n10,20,10,40\n10,20,30,40", 
            expected: -1,
            desc: "无法到达的情况"
        },
        { 
            name: "起点即终点", 
            input: "1,1\n5", 
            expected: 5,
            desc: "只有一个点"
        },
        { 
            name: "全是障碍", 
            input: "2,2\n0,0\n0,0", 
            expected: -1,
            desc: "无法移动"
        },
        { 
            name: "起点是加油站", 
            input: "3,3\n-1,10,20\n30,40,50\n60,70,80", 
            expected: -1,
            desc: "需要油量超过100，无法到达"
        },
        { 
            name: "终点是加油站", 
            input: "3,3\n10,20,30\n40,50,60\n70,80,-1", 
            expected: -1,
            desc: "需要油量超过100，无法到达"
        },
        { 
            name: "绕路加油可以到达", 
            input: "3,5\n10,5,-1,5,10\n5,5,5,5,5\n10,5,-1,5,10", 
            expected: 15,
            desc: "绕路加油可以到达"
        },
        { 
            name: "油箱容量限制测试", 
            input: "3,3\n90,10,10\n10,10,10\n10,10,10", 
            expected: -1,
            desc: "需要油量超过100，无法到达"
        },
        { 
            name: "简单地图有加油站", 
            input: "2,3\n10,-1,10\n10,10,10", 
            expected: 10,
            desc: "通过加油站可以到达"
        }
    ];
    
    let passed = 0, failed = 0;
    
    console.log("=".repeat(60));
    console.log("智能驾驶 - 测试用例");
    console.log("=".repeat(60));
    
    tests.forEach((test, index) => {
        const { name, input, expected, desc } = test;
        const result = minGas(input);
        const success = result === expected;
        
        console.log(`\n测试 ${index + 1}: ${name}`);
        console.log(`描述: ${desc}`);
        console.log(`期望: ${expected}`);
        console.log(`实际: ${result}`);
        console.log(`结果: ${success ? '✅ 通过' : '❌ 失败'}`);
        
        if (success) passed++; else failed++;
    });
    
    console.log("\n" + "=".repeat(60));
    console.log(`测试完成: ${passed} 通过, ${failed} 失败`);
    console.log("=".repeat(60));
}

runTests();

// 正向遍历实现：二分查找 + BFS验证
function minGasForward(input) {
    const lines = input.trim().split('\n');
    const [M, N] = lines[0].split(',').map(Number);
    const map = lines.slice(1).map(line => line.split(',').map(Number));
    
    // 验证函数：给定初始油量，是否能从起点走到终点
    function canReach(startGas) {
        // 边界检查：起点是障碍
        if (map[0][0] === 0) {
            return false;
        }
        
        // maxGas[i][j]表示到达(i,j)时剩余的最大油量
        const maxGas = Array(M).fill(0).map(() => Array(N).fill(-1));
        const queue = [];
        
        // 初始化起点
        let initialGas = startGas;
        if (map[0][0] === -1) {
            initialGas = 100; // 起点是加油站，直接加满
        } else {
            initialGas -= map[0][0]; // 不是加油站，消耗
        }
        
        if (initialGas < 0) {
            return false; // 起点油不够
        }
        
        maxGas[0][0] = initialGas;
        queue.push([0, 0]);
        
        const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
        
        while (queue.length > 0) {
            const [x, y] = queue.shift();
            const currentGas = maxGas[x][y];
            
            for (const [dx, dy] of dirs) {
                const nx = x + dx;
                const ny = y + dy;
                
                if (nx < 0 || nx >= M || ny < 0 || ny >= N) {
                    continue;
                }
                
                if (map[nx][ny] === 0) {
                    continue; // 是障碍
                }
                
                let newGas = currentGas;
                
                if (map[nx][ny] === -1) {
                    newGas = 100; // 加油站，加满
                } else {
                    newGas -= map[nx][ny]; // 消耗
                }
                
                if (newGas >= 0 && newGas > maxGas[nx][ny]) {
                    maxGas[nx][ny] = newGas;
                    queue.push([nx, ny]);
                }
            }
        }
        
        return maxGas[M-1][N-1] !== -1;
    }
    
    // 二分查找最小初始油量
    let left = 0;
    let right = 100; // 足够大的上界
    let answer = -1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (canReach(mid)) {
            answer = mid;
            right = mid - 1; // 尝试更小的油量
        } else {
            left = mid + 1; // 不够，需要更多油
        }
    }
    
    return answer;
}

// 对比两种实现的测试函数
function compareImplementations() {
    const tests = [
        { name: "示例1", input: "2,2\n10,20\n30,40" },
        { name: "示例2", input: "4,4\n10,30,30,20\n30,30,-1,10\n0,20,20,40\n10,-1,30,40" },
        { name: "起点即终点", input: "1,1\n5" },
        { name: "简单地图有加油站", input: "2,3\n10,-1,10\n10,10,10" },
        { name: "绕路加油可以到达", input: "3,5\n10,5,-1,5,10\n5,5,5,5,5\n10,5,-1,5,10" }
    ];
    
    console.log("=".repeat(70));
    console.log("对比两种实现");
    console.log("=".repeat(70));
    
    let allMatch = true;
    
    tests.forEach((test, index) => {
        const result1 = minGas(test.input);
        const result2 = minGasForward(test.input);
        const match = result1 === result2;
        if (!match) allMatch = false;
        
        console.log(`\n测试 ${index + 1}: ${test.name}`);
        console.log(`逆向DFS: ${result1}`);
        console.log(`正向二分+BFS: ${result2}`);
        console.log(`一致：${match ? '✅' : '❌'}`);
    });
    
    console.log("\n" + "=".repeat(70));
    console.log(`总体: ${allMatch ? '所有结果一致✅' : '存在不一致❌'}`);
    console.log("=".repeat(70));
}

// 运行对比测试
console.log("\n=== 对比两种实现 ===\n");
compareImplementations();