function minK(input) {
    const [x, y, cntx, cnty] = input.split(' ').map(Number);

    function find(k) {
        const A = Math.floor(k / x);
        const B = Math.floor(k / y);
        const C = Math.floor(k / (x * y));

        return (Math.max(0, cntx - (B - C)) + Math.max(0, cnty - (A - C)) <= k - A - B + C)
    }

    let min = cntx + cnty;
    let max = 1e9;

    while (min <= max) {
        const mid = min + Math.floor((max - min) / 2);
        if (find(mid)) {
            max = mid - 1;
        } else {
            min = mid + 1;
        }
    }
    return min;
}

// 测试用例
const tests = [
    {
        name: '示例1',
        input: '2 3 3 1',
        expected: 5
    },
    {
        name: '基本情况',
        input: '2 5 2 2',
        expected: 4
    },
    {
        name: '较大质数',
        input: '7 11 5 3',
        expected: 8
    },
    {
        name: '需要大量员工',
        input: '2 3 10 5',
        expected: 19
    },
    {
        name: 'x国需求大',
        input: '2 5 100 1',
        expected: 199
    },
    {
        name: 'y国需求大',
        input: '3 7 1 100',
        expected: 116
    },
    {
        name: '两国需求相近',
        input: '5 7 10 10',
        expected: 20
    },
    {
        name: '边界情况1',
        input: '2 3 1 1',
        expected: 2
    },
    {
        name: '边界情况2',
        input: '2 3 2 1',
        expected: 3
    },
    {
        name: '大质数组合',
        input: '13 17 20 15',
        expected: 35
    }
];

// 运行测试
let passed = 0, failed = 0;

console.log('='.repeat(60));
console.log('员工派遣 - 二分查找解决方案');
console.log('='.repeat(60));

tests.forEach((test, index) => {
    const result = minK(test.input);
    const success = result === test.expected;

    console.log(`测试 ${index + 1}: ${test.name} - ${success ? '✅ 通过' : '❌ 失败'}`);
    if (!success) {
        console.log(`       输入: ${test.input}`);
        console.log(`       期望: ${test.expected}, 实际: ${result}`);
    }

    if (success) passed++; else failed++;
});

console.log('\n' + '='.repeat(60));
console.log(`测试完成: ${passed} 通过, ${failed} 失败`);
console.log('='.repeat(60));
