function concatString(str, n) {
    if (!str || n <= 0 || n > str.length) {
        return 0;
    }
    const charCnts = {};
    for (let c of str) {
        charCnts[c] = (charCnts[c] || 0) + 1
    }

    let count = 0

    function dfs(prevChar, remaining, counts) {
        if (remaining === 0) {
            count++;
            return
        }
        for (const [char, cnt] of Object.entries(counts)) {
            if (cnt <= 0 || char === prevChar) {
                continue;
            }
            counts[char]--;
            dfs(char, remaining - 1, counts);
            counts[char]++;
        }

    }

    dfs('', n, { ...charCnts })
    return count;
}

// 测试用例
const tests = [
    { name: '示例1-长度1', str: 'abc', n: 1, expected: 3 },
    { name: '示例2-重复字符', str: 'dde', n: 2, expected: 2 },
    { name: '全相同字符-长度2', str: 'aaa', n: 2, expected: 0 },
    { name: '全相同字符-长度1', str: 'aaa', n: 1, expected: 1 },
    { name: '三个不同字符-长度2', str: 'abc', n: 2, expected: 6 },
    { name: '三个不同字符-长度3', str: 'abc', n: 3, expected: 6 },
    { name: '两个相同两个不同', str: 'aabc', n: 3, expected: 8 },
    { name: '边界情况-n等于长度', str: 'abcd', n: 4, expected: 24 },
    { name: 'ab交替排列', str: 'aabb', n: 4, expected: 2 },
    { name: '最大n=5', str: 'abcde', n: 5, expected: 120 }
];

// 运行测试
let passed = 0, failed = 0;
console.log('='.repeat(60));
console.log('字符串拼接 - 测试结果');
console.log('='.repeat(60));

tests.forEach((test, index) => {
    const result = concatString(test.str, test.n);
    const success = result === test.expected;
    console.log(`测试 ${index + 1}: ${test.name} - ${success ? '✅ 通过' : '❌ 失败'}`);
    if (!success) {
        console.log(`       输入: str="${test.str}", n=${test.n}`);
        console.log(`       期望: ${test.expected}, 实际: ${result}`);
    }
    if (success) passed++; else failed++;
});

console.log('\n' + '='.repeat(60));
console.log(`测试完成: ${passed} 通过, ${failed} 失败`);
console.log('='.repeat(60));
