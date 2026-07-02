function parseCompressedString(str) {
    const segments = [];
    let numStr = '';

    for (const char of str) {
        if (char >= '0' && char <= '9') {
            numStr += char;
        } else {
            const count = parseInt(numStr) || 1;
            segments.push({ char, count });
            numStr = '';
        }
    }

    return segments;
}

function solve(input) {
    const lines = input.trim().split('\n');
    if (lines.length < 2) return '0/0';

    const segments1 = parseCompressedString(lines[0]);
    const segments2 = parseCompressedString(lines[1]);

    let i1 = 0, i2 = 0;
    let pos1 = 0, pos2 = 0;
    let errors = 0;
    let total = 0;

    while (i1 < segments1.length && i2 < segments2.length) {
        const seg1 = segments1[i1];
        const seg2 = segments2[i2];

        const remaining1 = seg1.count - pos1;
        const remaining2 = seg2.count - pos2;
        const compareLen = Math.min(remaining1, remaining2);

        if (seg1.char !== seg2.char) {
            errors += compareLen;
        }
        total += compareLen;

        pos1 += compareLen;
        pos2 += compareLen;

        if (pos1 >= seg1.count) {
            i1++;
            pos1 = 0;
        }
        if (pos2 >= seg2.count) {
            i2++;
            pos2 = 0;
        }
    }

    return `${errors}/${total}`;
}

function test() {
    const testCases = [
        {
            input: `3A3B
2A4B`,
            expected: '1/6',
            description: '示例1'
        },
        {
            input: `5Y5Z
5Y5Z`,
            expected: '0/10',
            description: '示例2 - 完全相同'
        },
        {
            input: `4Y5Z
9Y`,
            expected: '5/9',
            description: '示例3'
        },
        {
            input: `1A1B1C
1A1B1C`,
            expected: '0/3',
            description: '短字符串相同'
        },
        {
            input: `1A1B1C
1X1Y1Z`,
            expected: '3/3',
            description: '完全不同'
        },
        {
            input: `10A
5A5B`,
            expected: '5/10',
            description: '后半部分不同'
        },
        {
            input: `100X
100X`,
            expected: '0/100',
            description: '大数量相同字符'
        },
        {
            input: `1A2B3C4D
2A1B3C4D`,
            expected: '1/10',
            description: '多段混合比较'
        },
        {
            input: `5A
5A`,
            expected: '0/5',
            description: '单段相同'
        },
        {
            input: `1A1B1C1D1E
5X`,
            expected: '5/5',
            description: '全错'
        }
    ];

    console.log('='.repeat(60));
    console.log('计算误码率 - 测试用例');
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