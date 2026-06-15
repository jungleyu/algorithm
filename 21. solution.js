function decryptStr(str1, str2) {
    if (str2.length > str1.length) {
        return 'Not Found';
    }
    const n = new Set(str2.split('')).size;
    const remainings = str1.split(/[0-9a-f]{1,}/g).filter(t => t !== '' && new Set(t).size <= n).sort((a, b) => {
        const la = new Set(a).size, lb = new Set(b).size;
        if (la === lb) {
            return b.localeCompare(a);
        }
        return lb - la;
    });
    if (remainings.length <= 0) {
        return 'Not Found';
    }
    return remainings[0];
}

// 测试用例
const tests = [
    {
        name: '示例1',
        string1: '123admyffc79pt',
        string2: 'ssyy',
        expected: 'pt'
    },
    {
        name: '示例2',
        string1: '123admyffc79ptaagghi2222smeersst88mnrt',
        string2: 'ssyyfgh',
        expected: 'mnrt'
    },
    {
        name: '示例3',
        string1: 'abcmnq',
        string2: 'rt',
        expected: 'Not Found'
    },
    {
        name: '全部都是加扰字符',
        string1: 'abc123def456',
        string2: 'abc',
        expected: 'Not Found'
    },
    {
        name: '只有有效子串',
        string1: 'mypt',
        string2: 'ssyy',
        expected: 'Not Found'
    },
    {
        name: '多个相同数量的有效子串',
        string1: '123gh456ij789kl',
        string2: 'abcd',
        expected: 'kl'
    },
    {
        name: '有效子串包含加扰字符范围内的字母',
        string1: '123dgh456efi',
        string2: 'abc',
        expected: 'gh'
    },
    {
        name: '有效子串数量超过string2',
        string1: '123mnopq456',
        string2: 'ab',
        expected: 'Not Found'
    },
    {
        name: '空字符串',
        string1: '',
        string2: 'abc',
        expected: 'Not Found'
    },
    {
        name: 'string2为空',
        string1: '123gh456',
        string2: '',
        expected: 'Not Found'
    }
];

// 运行测试
let passed = 0, failed = 0;

console.log('='.repeat(60));
console.log('字符串解密 - 测试结果');
console.log('='.repeat(60));

tests.forEach((test, index) => {
    const result = decryptStr(test.string1, test.string2);
    const success = result === test.expected;

    console.log(`测试 ${index + 1}: ${test.name} - ${success ? '✅ 通过' : '❌ 失败'}`);
    if (!success) {
        console.log(`       string1: "${test.string1}"`);
        console.log(`       string2: "${test.string2}"`);
        console.log(`       期望: "${test.expected}", 实际: "${result}"`);
    }

    if (success) passed++; else failed++;
});

console.log('\n' + '='.repeat(60));
console.log(`测试完成: ${passed} 通过, ${failed} 失败`);
console.log('='.repeat(60));
