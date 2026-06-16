function getTime(input) {
    const [m, n, x1, y1, x2, y2] = input.trim().split(',').map(Number);

    const grid = Array(m).fill(null).map(() => Array(n).fill(0));
    grid[x1][y1] = 1;
    let queue = [[x1, y1]];
    if (!(x1 === x2 && y1 === y2)) {
        grid[x2][y2] = 1;
        queue.push([x2, y2]);
    }
    let second = 0;

    let count = m * n - queue.length;
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]]

    while (queue.length > 0 && count > 0) {
        const newQueue = [];
        for (let [x, y] of queue) {
            for (let [dx, dy] of dirs) {
                const nx = dx + x, ny = dy + y;
                if (nx >= 0 && ny >= 0 && nx < m && ny < n && grid[nx][ny] === 0) {
                    grid[nx][ny] = 1;
                    count--;
                    newQueue.push([nx, ny]);
                }
            }
        }
        queue = newQueue;
        second++;
    }
    return second;
}

function test() {
    const testCases = [
        {
            name: "示例1 - 对角线扩散",
            input: "4,4,0,0,3,3",
            expected: 3
        },
        {
            name: "示例2 - 相邻点",
            input: "4,4,0,0,0,1",
            expected: 5
        },
        {
            name: "最小矩阵(2x2)",
            input: "2,2,0,0,1,1",
            expected: 1
        },
        {
            name: "单行矩阵",
            input: "1,5,0,0,0,4",
            expected: 2
        },
        {
            name: "单列矩阵",
            input: "5,1,0,0,4,0",
            expected: 2
        },
        {
            name: "两个点重合",
            input: "4,4,0,0,0,0",
            expected: 6
        },
        {
            name: "角落对角落",
            input: "3,3,0,0,2,2",
            expected: 2
        },
        {
            name: "边缘扩散",
            input: "5,5,0,2,4,2",
            expected: 4
        },
        {
            name: "中心点扩散",
            input: "5,5,2,2,2,2",
            expected: 4
        },
        {
            name: "矩形矩阵",
            input: "3,5,0,0,2,4",
            expected: 3
        },
        {
            name: "1x1矩阵(特殊情况)",
            input: "1,1,0,0,0,0",
            expected: 0
        },
        {
            name: "6x6矩阵",
            input: "6,6,0,0,5,5",
            expected: 5
        }
    ];

    console.log("=".repeat(60));
    console.log("矩阵扩散测试用例");
    console.log("=".repeat(60));
    console.log();

    let passed = 0;
    let failed = 0;

    for (const tc of testCases) {
        const result = getTime(tc.input);
        const expected = tc.expected;
        const isPassed = result === expected;

        if (isPassed) {
            passed++;
            console.log(`✅ ${tc.name}`);
        } else {
            failed++;
            console.log(`❌ ${tc.name}`);
        }
        console.log(`   输入: "${tc.input}"`);
        console.log(`   输出: ${result}`);
        console.log(`   预期: ${expected}`);
        console.log();
    }

    console.log("=".repeat(60));
    console.log(`测试结果: ${passed} 通过, ${failed} 失败`);
    console.log("=".repeat(60));
}

test();