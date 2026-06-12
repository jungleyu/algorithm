// ==================== 方案1: 正则表达式 ====================
function encryptFieldRegex(str, k) {
    const regexp = /"(.*?)"|[^_]{1,}/g;
    const fields = str.match(regexp);
    if (!fields) {
        return 'ERROR';
    }
    const n = fields.length;
    if (k < 0 || k >= n) {
        return 'ERROR'
    }
    fields[k] = '******';
    return fields.join('_');
}

// ==================== 方案2: 双指针 ====================
function encryptFieldTwoPointer(str, k) {
    const cmds = [];
    let i = 0;
    let inQuote = false;
    let cur = '';
    while (i < str.length) {
        const c = str[i];
        if (c === '"') {
            inQuote = !inQuote;
            cur += c;
        } else if (c === '_' && !inQuote) {
            if (cur) {
                cmds.push(cur);
                cur = '';
            }
        } else {
            cur += c;
        }
        i++;
    }
    if (cur) {
        cmds.push(cur);
    }
    const n = cmds.length;
    if (k < 0 || k >= n) {
        return 'ERROR';
    }
    cmds[k] = '******';
    return cmds.join('_')
}

// ==================== 测试用例 ====================
const tests = [
    {
        name: "基本案例1-原题示例",
        input: { k: 1, s: "password__a12345678_timeout_100" },
        expected: "password_******_timeout_100",
        description: "原题示例"
    },
    {
        name: "基本案例2-原题示例",
        input: { k: 2, s: 'aaa_password_"a12_45678"_timeout__100_""' },
        expected: 'aaa_password_******_timeout_100_""',
        description: "包含引号"
    },
    {
        name: "索引越界",
        input: { k: 10, s: "a_b_c" },
        expected: "ERROR",
        description: "索引超出范围"
    },
    {
        name: "负数索引",
        input: { k: -1, s: "a_b_c" },
        expected: "ERROR",
        description: "负数索引"
    },
    {
        name: "空字符串",
        input: { k: 0, s: "" },
        expected: "ERROR",
        description: "空字符串"
    },
    {
        name: "全下划线",
        input: { k: 0, s: "___" },
        expected: "ERROR",
        description: "只有分隔符"
    },
    {
        name: "单命令字",
        input: { k: 0, s: "password" },
        expected: "******",
        description: "单个命令"
    },
    {
        name: "引号内含下划线",
        input: { k: 1, s: 'start_"a_b_c"_end' },
        expected: 'start_******_end',
        description: "引号保护"
    },
    {
        name: "加密空引号命令",
        input: { k: 2, s: 'a_"b"_""_c' },
        expected: 'a_"b"_******_c',
        description: "空引号"
    },
    {
        name: "连续加密",
        input: { k: 0, s: 'password_timeout_100' },
        expected: '******_timeout_100',
        description: "加密第一个"
    }
];

// ==================== 测试运行 ====================
function runTests() {
    console.log("=".repeat(60));
    console.log("敏感字段加密 - 两种方案对比测试");
    console.log("=".repeat(60));

    let passedRegex = 0;
    let failedRegex = 0;
    let passedTwoPointer = 0;
    let failedTwoPointer = 0;
    let sameResult = 0;
    let diffResult = 0;

    console.log("\n【详细测试结果】\n");

    tests.forEach((test, index) => {
        const { name, input, expected, description } = test;

        const resultRegex = encryptFieldRegex(input.s, input.k);
        const resultTwoPointer = encryptFieldTwoPointer(input.s, input.k);
        const successRegex = resultRegex === expected;
        const successTwoPointer = resultTwoPointer === expected;
        const resultsMatch = resultRegex === resultTwoPointer;

        console.log(`测试 ${index + 1}: ${name}`);
        console.log(`描述: ${description}`);
        console.log(`输入: k=${input.k}, s="${input.s}"`);
        console.log(`期望: "${expected}"`);
        console.log(`正则方案: "${resultRegex}" ${successRegex ? '✅' : '❌'}`);
        console.log(`双指针方案: "${resultTwoPointer}" ${successTwoPointer ? '✅' : '❌'}`);
        console.log(`结果一致: ${resultsMatch ? '✅' : '⚠️'}`);
        console.log("-".repeat(50));

        if (successRegex) passedRegex++; else failedRegex++;
        if (successTwoPointer) passedTwoPointer++; else failedTwoPointer++;
        if (resultsMatch) sameResult++; else diffResult++;
    });

    console.log("\n" + "=".repeat(60));
    console.log("【测试统计】");
    console.log("=".repeat(60));
    console.log(`正则方案:  ${passedRegex} 通过, ${failedRegex} 失败`);
    console.log(`双指针方案: ${passedTwoPointer} 通过, ${failedTwoPointer} 失败`);
    console.log(`结果一致性: ${sameResult} 相同, ${diffResult} 不同`);
    console.log("=".repeat(60));

    if (failedRegex === 0 && failedTwoPointer === 0) {
        console.log("\n🎉 所有测试通过！两种方案均正确！\n");
    }
}

runTests();
