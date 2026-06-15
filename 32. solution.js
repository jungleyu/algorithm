function generateMatrix(n, m) {
    const cols = Math.ceil(n / m);
    const matrix = Array.from({
        length: m,
    }, () => Array(cols).fill('*'));

    let top = 0, right = cols - 1, bottom = m - 1, left = 0;
    let num = 1;

    while (num <= n) {
        for (let i = left; i <= right && num <= n; i++) {
            matrix[top][i] = num++;
        }
        top++;

        for (let i = top; i <= bottom && num <= n; i++) {
            matrix[i][right] = num++;
        }
        right--;

        for (let i = right; i >= left && num <= n; i--) {
            matrix[bottom][i] = num++;
        }
        bottom--;

        for (let i = bottom; i >= top && num <= n; i--) {
            matrix[i][left] = num++;
        }
        left++;
    }

    printMatrix(matrix);
    return matrix;
}

function printMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        console.log(matrix[i].join(' '));
    }
}

function test() {
    const testCases = [
        {
            name: "示例1",
            n: 9,
            m: 4,
            expected: [
                [1, 2, 3],
                ['*', '*', 4],
                [9, '*', 5],
                [8, 7, 6]
            ]
        },
        {
            name: "示例2",
            n: 3,
            m: 5,
            expected: [
                [1],
                [2],
                [3],
                ['*'],
                ['*']
            ]
        },
        {
            name: "示例3",
            n: 120,
            m: 7,
            cols: 18
        }
    ];

    let allPass = true;

    for (const tc of testCases) {
        const result = generateMatrix(tc.n, tc.m);

        if (tc.cols) {
            const passed = result[0].length === tc.cols;
            if (!passed) allPass = false;
            console.log(`${tc.name} 测试${passed ? "通过" : "失败"}: 期望列数 ${tc.cols}, 实际列数 ${result[0].length}`);
        } else {
            let passed = true;

            if (result.length !== tc.expected.length) {
                passed = false;
            } else {
                for (let i = 0; i < result.length; i++) {
                    if (result[i].join(',') !== tc.expected[i].join(',')) {
                        passed = false;
                        break;
                    }
                }
            }

            if (!passed) allPass = false;
            console.log(`${tc.name} 测试${passed ? "通过" : "失败"}`);

            if (!passed) {
                console.log("期望:");
                tc.expected.forEach(row => console.log(row.join(' ')));
                console.log("实际:");
                printMatrix(result);
            }
        }
    }

    console.log(`\n总计: ${allPass ? "全部通过" : "有失败"}`);
}

// 运行测试
test();

// 演示示例
// console.log("\n示例1输出:");
// printMatrix(generateMatrix(9, 4));

// console.log("\n示例2输出:");
// printMatrix(generateMatrix(3, 5));

// console.log("\n示例3输出:");
// printMatrix(generateMatrix(120, 7));