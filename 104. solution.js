/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
    const sLen = s.length, pLen = p.length;
    let i = 0, j = 0;
    let iStar = -1, jStar = -1;
    while (i < sLen) {
        if (j < pLen && (s[i] === p[j] || p[j] === '?')) {
            i++;
            j++;
        } else if (j < pLen && p[j] === '*') {
            iStar = i;
            jStar = j;
            j++;
        } else if (iStar >= 0) {
            i = ++iStar;
            j = jStar + 1;
        } else {
            return false;
        }
    }
    while (j < pLen && p[j] === '*') {
        j++;
    }
    return j === pLen;
};

function testIsMatch() {
    const testCases = [
        { s: "", p: "", expected: true, desc: "空字符串匹配空模式" },
        { s: "", p: "*", expected: true, desc: "空字符串匹配*" },
        { s: "", p: "**", expected: true, desc: "空字符串匹配**" },
        { s: "", p: "a", expected: false, desc: "空字符串不匹配非空模式" },
        { s: "a", p: "", expected: false, desc: "非空字符串不匹配空模式" },
        { s: "aa", p: "a", expected: false, desc: "标准示例1" },
        { s: "aa", p: "*", expected: true, desc: "标准示例2" },
        { s: "cb", p: "?a", expected: false, desc: "标准示例3" },
        { s: "a", p: "a", expected: true, desc: "单个字符精确匹配" },
        { s: "a", p: "?", expected: true, desc: "?匹配单个字符" },
        { s: "a", p: "*", expected: true, desc: "*匹配单个字符" },
        { s: "abc", p: "a*c", expected: true, desc: "*匹配中间字符" },
        { s: "abc", p: "a?c", expected: true, desc: "?匹配单个字符" },
        { s: "abcd", p: "a*d", expected: true, desc: "*匹配中间多个字符" },
        { s: "abcd", p: "*d", expected: true, desc: "*匹配前缀" },
        { s: "abcd", p: "a*", expected: true, desc: "*匹配后缀" },
        { s: "abcd", p: "*", expected: true, desc: "*匹配整个字符串" },
        { s: "abcd", p: "**", expected: true, desc: "**匹配整个字符串" },
        { s: "abcd", p: "a?cd", expected: true, desc: "?在中间" },
        { s: "abcd", p: "abcd", expected: true, desc: "完全匹配" },
        { s: "abcd", p: "abce", expected: false, desc: "末尾字符不匹配" },
        { s: "abcd", p: "abx", expected: false, desc: "模式比字符串短且不匹配" },
        { s: "abcd", p: "abcde", expected: false, desc: "模式比字符串长" },
        { s: "mississippi", p: "m*si*pi", expected: true, desc: "复杂模式匹配" },
        { s: "mississippi", p: "m??*s*i*pi", expected: true, desc: "混合通配符" },
        { s: "adceb", p: "*a*b", expected: true, desc: "*匹配开头和中间" },
        { s: "acdcb", p: "a*c?b", expected: false, desc: "复杂模式不匹配" },
        { s: "ho", p: "ho**", expected: true, desc: "*在末尾重复" },
        { s: "abc", p: "??", expected: false, desc: "?数量不够" },
        { s: "a", p: "??", expected: false, desc: "?数量过多" }
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
        console.log(`  输入: s = "${tc.s}", p = "${tc.p}"`);
        console.log(`  预期: ${tc.expected}, 实际: ${result}`);
        console.log('');
    });

    console.log(`\n测试结果: ${passed} 个通过, ${failed} 个失败`);
}

testIsMatch();