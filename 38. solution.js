function getSubStr(s1, s2, k) {
    const n1 = s1.length, n2 = s2.length;
    if (n2 < n1) {
        return -1;
    }
    const cnt1 = new Array(26).fill(0);
    const a = 'a'.charCodeAt();
    for (let i of s1) {
        cnt1[i.charCodeAt() - a]++;
    }

    let left = 0, right = 0;
    let matchRemain = n1;
    const wndCnt = new Array(26).fill(0);
    while (right < n2) {
        const rightChar = s2[right].charCodeAt();
        wndCnt[rightChar - a]++;
        if (wndCnt[rightChar - a] <= cnt1[rightChar - a]) {
            matchRemain--;
        }
        if (right - left + 1 > n1 + k) {
            const leftChar = s2[left].charCodeAt();
            if (wndCnt[leftChar - a] <= cnt1[leftChar - a]) {
                matchRemain++;
            }
            wndCnt[leftChar - a]--;
            left++;
        }
        if (matchRemain === 0) {
            return left;
        }
        right++;
    }
    return -1;
}

const tests = [
    {
        name: "基本案例1-原题示例",
        input: { s1: "ab", s2: "aabcd", k: 1 },
        expected: 0,
        description: "原题示例：子串aab(长度3=2+1)满足包含ab"
    },
    {
        name: "基本案例2-无法覆盖",
        input: { s1: "abc", s2: "dfs", k: 10 },
        expected: -1,
        description: "原题示例2：s2无法覆盖s1中任何字符"
    },
    {
        name: "精确匹配k=0",
        input: { s1: "ab", s2: "ab", k: 0 },
        expected: 0,
        description: "s1和s2完全相同，k=0，子串长度为2"
    },
    {
        name: "s1长度大于s2",
        input: { s1: "abc", s2: "ab", k: 1 },
        expected: -1,
        description: "s2长度小于s1，无法覆盖"
    },
    {
        name: "完全无法匹配",
        input: { s1: "xyz", s2: "abc", k: 0 },
        expected: -1,
        description: "s2中没有任何s1中的字符"
    },
    {
        name: "s1在s2开头k=1",
        input: { s1: "ab", s2: "abc", k: 1 },
        expected: 0,
        description: "子串abc(长度3=2+1)包含ab，在下标0"
    },
    {
        name: "s1在s2中间k=0",
        input: { s1: "ab", s2: "xab", k: 0 },
        expected: 1,
        description: "子串xab长度2=2+0包含ab，在下标1"
    },
    {
        name: "k大于0有额外字符",
        input: { s1: "ab", s2: "aab", k: 1 },
        expected: 0,
        description: "子串aab(长度3=2+1)包含ab，在下标0"
    },
    {
        name: "多余字符在末尾",
        input: { s1: "ab", s2: "abx", k: 1 },
        expected: 0,
        description: "子串abx(长度3=2+1)包含ab，在下标0"
    },
    {
        name: "多个满足取最左侧",
        input: { s1: "ab", s2: "abab", k: 0 },
        expected: 0,
        description: "两个子串ab都满足，取最左侧下标0"
    }
];

function runTests() {
    let passed = 0;
    let failed = 0;

    console.log("=".repeat(60));
    console.log("运行测试用例");
    console.log("=".repeat(60));

    tests.forEach((test, index) => {
        const { name, input, expected, description } = test;
        const result = getSubStr(input.s1, input.s2, input.k);
        const success = result === expected;

        console.log(`\n测试 ${index + 1}: ${name}`);
        console.log(`描述: ${description}`);
        console.log(`输入: s1="${input.s1}", s2="${input.s2}", k=${input.k}`);
        console.log(`期望输出: ${expected}`);
        console.log(`实际输出: ${result}`);
        console.log(`结果: ${success ? '✅ 通过' : '❌ 失败'}`);

        if (success) {
            passed++;
        } else {
            failed++;
        }
    });

    console.log("\n" + "=".repeat(60));
    console.log(`测试完成: ${passed} 通过, ${failed} 失败`);
    console.log("=".repeat(60));
}

runTests();
