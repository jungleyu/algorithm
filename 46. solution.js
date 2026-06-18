function mergeRange(input) {
    const lines = input.trim().split('\n');
    const n = parseInt(lines[0], 10);
    const ranges = lines.slice(1).map(line => line.split(' ').map(Number));
    ranges.sort((a, b) => a[0] - b[0])

    const commonRanges = [];
    for (let i = 0; i < n; i++) {
        let right = i + 1;
        while (right < n) {
            if (ranges[i][1] >= ranges[right][0]) {
                commonRanges.push([Math.max(ranges[i][0], ranges[right][0]), Math.min(ranges[i][1], ranges[right][1])])
            }
            right++;
        }

    }
    if (commonRanges.length <= 0) {
        return 'None';
    }

    commonRanges.sort((a, b) => a[0] - b[0]);

    const merged = [commonRanges[0]];
    for (let i = 1; i < commonRanges.length; i++) {
        const last = merged[merged.length - 1];
        const [start, end] = commonRanges[i]
        if (start <= last[1]) {
            last[1] = Math.max(last[1], end);
        } else {
            merged.push([start, end])
        }
    }
    return merged.length > 0 ? merged : 'None'
}

// 测试用例
const tests = [
    {
        name: '示例1',
        input: `4
0 3
1 3
3 5
3 6`,
        expected: [[1, 5]]
    },
    {
        name: '示例2',
        input: `4
0 3
1 4
4 7
5 8`,
        expected: [[1, 3], [4, 4], [5, 7]]
    },
    {
        name: '示例3 - 无交集',
        input: `2
1 2
3 4`,
        expected: 'None'
    },
    {
        name: '单个区间',
        input: `1
1 5`,
        expected: 'None'
    },
    {
        name: '空输入',
        input: `0`,
        expected: 'None'
    },
    {
        name: '完全重叠',
        input: `3
1 5
2 4
3 6`,
        expected: [[2, 5]]
    },
    {
        name: '部分重叠',
        input: `3
1 10
5 15
12 20`,
        expected: [[5, 10], [12, 15]]
    },
    {
        name: '相邻区间',
        input: `3
1 3
3 5
5 7`,
        expected: [[3, 3], [5, 5]]
    },
    {
        name: '负数区间',
        input: `3
-5 -1
-3 2
0 5`,
        expected: [[-3, -1], [0, 2]]
    },
    {
        name: '复杂场景',
        input: `5
1 4
2 5
3 6
4 7
5 8`,
        expected: [[2, 7]]
    }
];

// 运行测试
let passed = 0, failed = 0;

console.log('='.repeat(60));
console.log('区间交集 - 解决方案');
console.log('='.repeat(60));

tests.forEach((test, index) => {
    const result = mergeRange(test.input);
    const success = JSON.stringify(result) === JSON.stringify(test.expected);
    
    console.log(`测试 ${index + 1}: ${test.name} - ${success ? '✅ 通过' : '❌ 失败'}`);
    
    if (success) passed++; else failed++;
});

console.log('\n' + '='.repeat(60));
console.log(`测试完成: ${passed} 通过, ${failed} 失败`);
console.log('='.repeat(60));