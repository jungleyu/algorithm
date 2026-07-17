/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
    const m = s.length;
    const n = p.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));
    dp[0][0] = true;

    for (let j = 1; j <= n; j++) {
        if (p[j - 1] === '*') {
            dp[0][j] = dp[0][j - 1];
        }
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (p[j - 1] === '*') {
                dp[i][j] = dp[i - 1][j] || dp[i][j - 1];
            } else if (p[j - 1] === '?' || s[i - 1] === p[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            }
        }
    }

    return dp[m][n];
};

function testIsMatch() {
    const testCases = [
        { s: "", p: "", expected: true, desc: "空字符串匹配空模式" },
        { s: "", p: "*", expected: true, desc: "空字符串匹配*" },
        { s: "", p: "**", expected: true, desc: "空字符串匹配**" },
        { s: "", p: "a", expected: false, desc: "空字符串不匹配非空模式" },
        { s: "aa", p: "a", expected: false, desc: "字符串比模式长" },
        { s: "aa", p: "*", expected: true, desc: "*匹配任意字符串" },
        { s: "cb", p: "?a", expected: false, desc: "?匹配单个字符但最后不匹配" },
        { s: "abc", p: "a?c", expected: true, desc: "?匹配中间字符" },
        { s: "abc", p: "*abc", expected: true, desc: "*匹配开头空" },
        { s: "abc", p: "abc*", expected: true, desc: "*匹配结尾空" },
        { s: "abcdef", p: "a*f", expected: true, desc: "*匹配中间任意字符" },
        { s: "abcdef", p: "a*d*f", expected: true, desc: "多个*匹配" },
        { s: "abcdef", p: "a*c*e*f", expected: true, desc: "*跳过某些字符" },
        { s: "abc", p: "a**c", expected: true, desc: "连续**等价于单个*" },
        { s: "abcd", p: "ab?d", expected: true, desc: "?匹配单个字符" },
        { s: "abcd", p: "ab?e", expected: false, desc: "?匹配后字符不匹配" },
        { s: "a", p: "a*", expected: true, desc: "*匹配空" },
        { s: "a", p: "*a", expected: true, desc: "*匹配空" },
        { s: "aa", p: "*a", expected: true, desc: "*匹配一个字符" },
        { s: "aaaa", p: "*a*a", expected: true, desc: "*匹配多个字符" }
    ];

    let passed = 0;
    let failed = 0;

    testCases.forEach((tc, index) => {
        const result = isMatch(tc.s, tc.p);
        const status = result === tc.expected ? '✓' : '✗';
        if (result === tc.expected) {
            passed++;
        } else {
            failed++;
        }
        console.log(`测试用例 ${index + 1}: ${status}`);
        console.log(`  描述: ${tc.desc}`);
        console.log(`  s: "${tc.s}", p: "${tc.p}"`);
        console.log(`  预期: ${tc.expected}, 实际: ${result}`);
        console.log('');
    });

    console.log(`\n测试结果: ${passed} 个通过, ${failed} 个失败`);
}

testIsMatch();