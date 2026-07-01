function parse(input) {
    const lines = input.trim().split('\n');
    const a = lines[0].trim().split(/\s+/).map(Number);
    const b = lines[1].trim().split(/\s+/).map(Number);
    return { a, b };
}

function solve(input) {
    const { a, b } = parse(input);
    const n = a.length;
    let maxWins = -1;
    let count = 0;

    const used = new Array(n).fill(false);
    function backtrack(path) {
        if (path.length === n) {
            let wins = 0;
            for (let i = 0; i < n; i++) {
                if (path[i] > b[i]) wins++;
            }
            if (wins > maxWins) {
                maxWins = wins;
                count = 1;
            } else if (wins === maxWins) {
                count++;
            }
            return;
        }
        const seen = new Set();
        for (let i = 0; i < n; i++) {
            if (used[i] || seen.has(a[i])) continue;
            seen.add(a[i]);
            used[i] = true;
            path.push(a[i]);
            backtrack(path);
            path.pop();
            used[i] = false;
        }
    }

    backtrack([]);
    return count;
}

function test() {
    const testCases = [
        {
            input: `11 8 20
10 13 7`,
            expected: 1,
            description: '示例1'
        },
        {
            input: `11 12 20
10 13 7`,
            expected: 2,
            description: '示例2'
        },
        {
            input: `1 2 3
4 5 6`,
            expected: 6,
            description: '示例3 - 全输情况'
        },
        {
            input: `3 2 1
1 2 3`,
            expected: 1,
            description: '全赢情况 - [2,3,1]唯一最优'
        },
        {
            input: `5 1 3
2 4 6`,
            expected: 1,
            description: '部分赢情况 - [3,5,1]唯一最优'
        },
        {
            input: `10
5`,
            expected: 1,
            description: '单元素数组'
        },
        {
            input: `5
10`,
            expected: 1,
            description: '单元素数组 - 输'
        },
        {
            input: `4 5 6 7
1 2 3 8`,
            expected: 24,
            description: '四个元素部分赢 - 所有排列都是最优(赢3场)'
        },
        {
            input: `2 3
1 4`,
            expected: 2,
            description: '两个元素 - 各赢一次'
        },
        {
            input: `1 3 5 7
2 4 6 8`,
            expected: 1,
            description: '偶数个元素部分赢 - [3,5,7,1]唯一最优'
        }
    ];

    console.log('='.repeat(60));
    console.log('田忌赛马 - 测试用例');
    console.log('='.repeat(60));

    let passed = 0;
    let failed = 0;

    testCases.forEach((tc, index) => {
        const actual = solve(tc.input);
        const isPassed = actual === tc.expected;

        console.log(`\n测试用例 ${index + 1}: ${tc.description}`);
        console.log(`输入:\n${tc.input}`);
        console.log(`期望输出: ${tc.expected}`);
        console.log(`实际输出: ${actual}`);
        console.log(`结果: ${isPassed ? '✅ 通过' : '❌ 失败'}`);

        if (isPassed) passed++;
        else failed++;
    });

    console.log('\n' + '='.repeat(60));
    console.log(`测试结果: ${passed} 通过, ${failed} 失败`);
    console.log('='.repeat(60));
}

test();