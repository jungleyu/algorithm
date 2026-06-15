function countAffectedSwaps(n, a, b) {
    let c0 = 0, c1 = 0, c0_0 = 0, c1_0 = 0;
    for (let i = 0; i < n; i++) {
        if (a[i] === '0') {
            c0++;
            if (b[i] === '0') {
                c0_0++;
            }
        }
        if (a[i] === '1') {
            c1++;
            if (b[i] === '0') {
                c1_0++;
            }
        }
    }
    return c0_0 * c1 + c1_0 * c0 - c1_0 * c0_0;
}

// 测试用例
const tests = [
    {
        name: '示例1',
        n: 3,
        a: '010',
        b: '110',
        expected: 1
    },
    {
        name: '示例2',
        n: 6,
        a: '011011',
        b: '110110',
        expected: 4
    },
    {
        name: '所有位都相同',
        n: 3,
        a: '000',
        b: '111',
        expected: 0
    },
    {
        name: '所有位都相同2',
        n: 3,
        a: '111',
        b: '000',
        expected: 0
    },
    {
        name: '两位交换',
        n: 2,
        a: '01',
        b: '00',
        expected: 1
    },
    {
        name: '两位交换不影响',
        n: 2,
        a: '01',
        b: '11',
        expected: 0
    },
    {
        name: '复杂场景',
        n: 5,
        a: '01010',
        b: '00110',
        expected: 5
    },
    {
        name: 'B全为1',
        n: 4,
        a: '0101',
        b: '1111',
        expected: 0
    },
    {
        name: 'B全为0',
        n: 4,
        a: '0101',
        b: '0000',
        expected: 4
    },
    {
        name: '单一位',
        n: 1,
        a: '0',
        b: '1',
        expected: 0
    },
    {
        name: '大测试1 - 交替模式',
        n: 1000,
        a: '01'.repeat(500),
        b: '00'.repeat(500),
        expected: 500 * 500
    },
    {
        name: '大测试2 - 前半0后半1',
        n: 1000,
        a: '0'.repeat(500) + '1'.repeat(500),
        b: '0'.repeat(1000),
        expected: 500 * 500
    },
    {
        name: '大测试3 - B全为1',
        n: 10000,
        a: '0101'.repeat(2500),
        b: '1'.repeat(10000),
        expected: 0
    },
    {
        name: '大测试4 - 稀疏模式',
        n: 10000,
        a: '1' + '0'.repeat(9999),
        b: '0'.repeat(10000),
        expected: 9999
    },
    {
        name: '大测试5 - 密集模式',
        n: 100000,
        a: '111000'.repeat(16666) + '1110',
        b: '000111'.repeat(16666) + '0001',
        expected: 2499999999
    }
];

// 运行测试
let passed = 0, failed = 0;

console.log('='.repeat(60));
console.log('出错的或电路 - 数学解法');
console.log('='.repeat(60));

tests.forEach((test, index) => {
    const result = countAffectedSwaps(test.n, test.a, test.b);
    const success = result === test.expected;
    
    console.log(`\n测试 ${index + 1}: ${test.name}`);
    console.log(`期望: ${test.expected}, 实际: ${result}`);
    console.log(`结果: ${success ? '✅ 通过' : '❌ 失败'}`);
    
    if (success) passed++; else failed++;
});

console.log('\n' + '='.repeat(60));
console.log(`测试完成: ${passed} 通过, ${failed} 失败`);
console.log('='.repeat(60));
