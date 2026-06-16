function getO(input) {
    const lines = input.trim().split('\n');
    const [m, n] = lines[0].split(' ').map(Number);
    lines.shift();
    const grid = lines.map(line => line.split(' '));
    const used = Array(m).fill(null).map(() => Array(n).fill(false))
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    const entries = [];

    function dfs(x, y) {
        if (x < 0 || y < 0 || x >= m || y >= n) {
            return 0;
        }
        if (used[x][y]) {
            return 0;
        }

        if (x === 0 || y === 0 || x === m - 1 || y === n - 1) {
            entries.push([x, y])
        }

        used[x][y] = true;

        let count = 1;
        for (const [dx, dy] of dirs) {
            const nx = dx + x, ny = dy + y;
            if (nx >= 0 && ny >= 0 && nx < m && ny < n) {
                if (grid[nx][ny] === 'O') {
                    count += dfs(nx, ny);
                }
            }
        }

        return count;

    }

    let maxCnt = 0, ans = 'NULL';
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 'O' && !used[i][j]) {
                entries.length = 0;
                const cnt = dfs(i, j);
                const entrs = [...entries];
                if (cnt > 0 && entrs.length === 1) {
                    if (cnt > maxCnt) {
                        maxCnt = cnt;
                        ans = `${entrs[0].join(' ')} ${cnt}`
                    } else if (cnt === maxCnt) {
                        maxCnt = cnt;
                        ans = cnt;
                    }
                }
            }
        }
    }
    return ans;
}

function test() {
    const testCases = [
        {
            name: "示例1 - 单入口区域",
            input: `4 4
X X X X
X O O X
X O O X
X O X X`,
            expected: "3 1 5"
        },
        {
            name: "示例2 - 边界单个O",
            input: `4 5
X X X X X
O O O O X
X O O O X
X O X X O`,
            expected: "3 4 1"
        },
        {
            name: "示例3 - 多入口区域（不满足）",
            input: `5 4
X X X X
X O O O
X O O O
X O O X
X X X X`,
            expected: "NULL"
        },
        {
            name: "示例4 - 多个相同大小的单入口区域",
            input: `5 4
X X X X
X O O O
X X X X
X O O O
X X X X`,
            expected: 3
        },
        {
            name: "全X矩阵",
            input: `3 3
X X X
X X X
X X X`,
            expected: "NULL"
        },
        {
            name: "全O矩阵（多入口）",
            input: `3 3
O O O
O O O
O O O`,
            expected: "NULL"
        },
        {
            name: "单行矩阵（多个入口）",
            input: `1 5
O O O X X`,
            expected: "NULL"
        },
        {
            name: "单列矩阵（多个入口）",
            input: `5 1
O
O
O
X
X`,
            expected: "NULL"
        },
        {
            name: "单个O",
            input: `1 1
O`,
            expected: "0 0 1"
        },
        {
            name: "复杂情况（多入口）",
            input: `5 5
X X X X X
X O O X X
X O O O X
X X O X X
X X X X X`,
            expected: "NULL"
        },
        {
            name: "单个边界O",
            input: `3 3
X X X
X X O
X X X`,
            expected: "1 2 1"
        },
        {
            name: "角落单个O",
            input: `3 3
X X X
X X X
X X O`,
            expected: "2 2 1"
        },
        {
            name: "内部O区域（无入口）",
            input: `5 5
X X X X X
X X X X X
X X O X X
X X X X X
X X X X X`,
            expected: "NULL"
        },
        {
            name: "L形区域（单入口）",
            input: `4 4
X X X X
X O O X
X O X X
X O X X`,
            expected: "3 1 4"
        },
        {
            name: "两个独立的单入口区域",
            input: `6 4
X X X X
X O O O
X X X X
X X X X
X O O O
X X X X`,
            expected: 3
        }
    ];

    console.log("=".repeat(60));
    console.log("查找单入口空闲区域测试用例");
    console.log("=".repeat(60));
    console.log();

    let passed = 0;
    let failed = 0;

    for (const tc of testCases) {
        const result = getO(tc.input);
        const isPassed = result === tc.expected;

        if (isPassed) {
            passed++;
            console.log(`✅ ${tc.name}`);
        } else {
            failed++;
            console.log(`❌ ${tc.name}`);
        }
        console.log(`   输出: "${result}" (类型: ${typeof result})`);
        console.log(`   预期: "${tc.expected}" (类型: ${typeof tc.expected})`);
        console.log();
    }

    console.log("=".repeat(60));
    console.log(`测试结果: ${passed} 通过, ${failed} 失败`);
    console.log("=".repeat(60));
}

test();