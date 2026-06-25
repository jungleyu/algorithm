function solve(input) {
    const lines = input.trim().split('\n');
    const n = parseInt(lines[0]);
    const nums = lines[1].split(' ').map(Number);

    const cnt = new Array(31).fill(0);
    for (const x of nums) {
        const msb = Math.clz32(x);
        cnt[msb]++;
    }

    const totalPairs = n * (n - 1) / 2;

    let sameMsbPairs = 0;
    for (const c of cnt) {
        if (c > 1) {
            sameMsbPairs += c * (c - 1) / 2;
        }
    }

    return totalPairs - sameMsbPairs;
}

function runTests() {
    const testCases = [
        {
            input: `4
4 3 5 2`,
            expected: 4,
            description: '示例1'
        },
        {
            input: `5
3 5 2 8 4`,
            expected: 8,
            description: '示例2'
        },
        {
            input: `5
1 2 4 8 16`,
            expected: 10,
            description: '所有数最高位均不同，所有配对都满足'
        },
        {
            input: `4
4 5 6 7`,
            expected: 0,
            description: '所有数最高位相同（MSB=2），无满足配对'
        },
        {
            input: `2
1 2`,
            expected: 1,
            description: '两个数最高位不同'
        },
        {
            input: `2
3 2`,
            expected: 0,
            description: '两个数最高位相同（MSB=1）'
        },
        {
            input: `1
5`,
            expected: 0,
            description: '只有一个数，无配对'
        },
        {
            input: `2
536870912 268435456`,
            expected: 1,
            description: '两个大数，最高位分别为29和28'
        },
        {
            input: `3
7 7 7`,
            expected: 0,
            description: '所有数相等，最高位相同'
        },
        {
            input: `5
1 3 7 15 31`,
            expected: 10,
            description: '二进制全1数，最高位均不同'
        }
    ];

    let passed = 0;
    let failed = 0;

    testCases.forEach((test, index) => {
        const result = solve(test.input);
        const success = result === test.expected;

        if (success) {
            passed++;
            console.log(`\u2713 测试 ${index + 1}: ${test.description}`);
        } else {
            failed++;
            console.log(`\u2717 测试 ${index + 1}: ${test.description}`);
            console.log(`  期望: ${test.expected}`);
            console.log(`  实际: ${result}`);
        }
    });

    console.log(`\n测试结果: ${passed}/${testCases.length} 通过`);
}

runTests();
