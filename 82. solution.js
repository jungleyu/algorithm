// 最小外接凸多边形（凸包）问题
// 使用 Andrew's Monotone Chain 算法

function solve(input) {
    const lines = input.trim().split('\n');
    const n = parseInt(lines[0]);

    // 收集所有顶点
    const points = [];

    for (let i = 1; i <= n; i++) {
        const coords = lines[i].trim().split(/\s+/).map(Number);
        // 每行8个数字，表示4个顶点
        for (let j = 0; j < 4; j++) {
            const x = coords[j * 2];
            const y = coords[j * 2 + 1];
            points.push({ x, y });
        }
    }

    // 去重
    const uniquePoints = [];
    const pointSet = new Set();
    for (const p of points) {
        const key = `${p.x},${p.y}`;
        if (!pointSet.has(key)) {
            pointSet.add(key);
            uniquePoints.push(p);
        }
    }

    // 如果点数小于3，直接返回
    if (uniquePoints.length === 1) {
        return `${uniquePoints[0].x} ${uniquePoints[0].y}`;
    }
    if (uniquePoints.length === 2) {
        // 按照题目要求排序：最左侧（x最小，x相等时y最小）开始
        uniquePoints.sort((a, b) => a.x !== b.x ? a.x - b.x : a.y - b.y);
        return uniquePoints.map(p => `${p.x} ${p.y}`).join(' ');
    }

    // 计算向量叉积
    // cross(O, A, B) = OA × OB
    // cross > 0: O->A->B 逆时针
    // cross < 0: O->A->B 顺时针
    // cross = 0: 三点共线
    function cross(O, A, B) {
        return (A.x - O.x) * (B.y - O.y) - (A.y - O.y) * (B.x - O.x);
    }

    // 按照x坐标排序，x相同时按y坐标排序
    uniquePoints.sort((a, b) => {
        if (a.x !== b.x) return a.x - b.x;
        return a.y - b.y;
    });

    // 构建下凸包
    const lower = [];
    for (const p of uniquePoints) {
        while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) {
            lower.pop();
        }
        lower.push(p);
    }

    // 构建上凸包
    const upper = [];
    for (let i = uniquePoints.length - 1; i >= 0; i--) {
        const p = uniquePoints[i];
        while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) {
            upper.pop();
        }
        upper.push(p);
    }

    // 合并凸包（去掉重复的起点和终点）
    // lower 的最后一个点和 upper 的最后一个点相同（最右边的点）
    // lower 的第一个点和 upper 的第一个点相同（最左边的点）
    const convexHull = lower.slice(0, -1).concat(upper.slice(0, -1));

    // 输出结果
    return convexHull.map(p => `${p.x} ${p.y}`).join(' ');
}

// 测试用例
function runTests() {
    const testCases = [
        {
            input: `2
0 2 0 0 2 0 2 2
1 4 1 1 3 1 3 4`,
            expected: '0 0 2 0 3 1 3 4 1 4 0 2',
            description: '示例1：正方形和长方形'
        },
        {
            input: `2
0 2 0 0 2 0 2 2
3 5 3 2 4 2 4 5`,
            expected: '0 0 2 0 4 2 4 5 3 5 0 2',
            description: '示例2：正方形和长方形分离'
        },
        {
            input: `1
0 0 0 2 2 2 2 0`,
            expected: '0 0 2 0 2 2 0 2',
            description: '单个正方形'
        },
        {
            input: `1
0 0 1 0 1 1 0 1`,
            expected: '0 0 1 0 1 1 0 1',
            description: '单个矩形'
        },
        {
            input: `2
0 0 0 1 1 1 1 0
2 0 2 1 3 1 3 0`,
            expected: '0 0 3 0 3 1 0 1',
            description: '两个分离的矩形'
        },
        {
            input: `2
0 0 0 2 2 2 2 0
1 1 1 3 3 3 3 1`,
            expected: '0 0 2 0 3 1 3 3 1 3 0 2',
            description: '两个重叠的矩形'
        },
        {
            input: `1
0 0 2 0 1 2 1 0`,
            expected: '0 0 2 0 1 2',
            description: '单个三角形（有共线点）'
        },
        {
            input: `3
0 0 0 1 1 1 1 0
2 0 2 1 3 1 3 0
4 0 4 1 5 1 5 0`,
            expected: '0 0 5 0 5 1 0 1',
            description: '三个分离的矩形'
        },
        {
            input: `2
0 0 0 3 3 3 3 0
1 1 1 2 2 2 2 1`,
            expected: '0 0 3 0 3 3 0 3',
            description: '一个包含另一个的矩形'
        },
        {
            input: `1
5 5 5 10 10 10 10 5`,
            expected: '5 5 10 5 10 10 5 10',
            description: '单个矩形（非原点）'
        }
    ];

    let passed = 0;
    let failed = 0;

    testCases.forEach((test, index) => {
        const result = solve(test.input);
        const success = result === test.expected;

        if (success) {
            passed++;
            console.log(`✓ 测试 ${index + 1}: ${test.description}`);
        } else {
            failed++;
            console.log(`✗ 测试 ${index + 1}: ${test.description}`);
            console.log(`  输入: ${test.input.replace(/\n/g, '\\n')}`);
            console.log(`  期望: ${test.expected}`);
            console.log(`  实际: ${result}`);
        }
    });

    console.log(`\n测试结果: ${passed}/${testCases.length} 通过`);
}

// 运行测试
runTests();
