/**
 * @param {string} s
 * @return {boolean}
 */
var isNumber = function (s) {
    const n = s.length;
    let i = 0;
    if (s[i] === '+' || s[i] === '-') {
        i++;
    }

    let hasDot = false;
    let hasDigit = false;
    for (; i < n && s[i] !== 'e' && s[i] !== 'E'; i++) {
        if (s[i] === '.') {
            if (hasDot) {
                return false;
            }
            hasDot = true;
        } else if (s[i] >= '0' && s[i] <= '9') {
            hasDigit = true;
        } else {
            return false;
        }
    }
    if (!hasDigit) {
        return false;
    }

    if (i < n && (s[i] === 'e' || s[i] === 'E')) {
        i++;
        if (i < n && (s[i] === '+' || s[i] === '-')) {
            i++;
        }
        if (i === n) {
            return false;
        }
        while (i < n && s[i] >= '0' && s[i] <= '9') {
            i++;
        }
    }

    return i === n;
};

function testIsNumber() {
    const testCases = [
        { s: "0", expected: true, desc: "单个数字" },
        { s: "e", expected: false, desc: "单个e字符" },
        { s: ".", expected: false, desc: "单个小数点" },
        { s: "0089", expected: true, desc: "前导零的整数" },
        { s: "-0.1", expected: true, desc: "负小数" },
        { s: "+3.14", expected: true, desc: "正小数" },
        { s: "4.", expected: true, desc: "数字后跟小数点" },
        { s: "-.9", expected: true, desc: "负号后跟小数点再跟数字" },
        { s: "2e10", expected: true, desc: "整数加指数" },
        { s: "-90E3", expected: true, desc: "负整数加大写E指数" },
        { s: "3e+7", expected: true, desc: "整数加正指数" },
        { s: "+6e-1", expected: true, desc: "正整数加负指数" },
        { s: "53.5e93", expected: true, desc: "小数加指数" },
        { s: "-123.456e789", expected: true, desc: "负小数加指数" },
        { s: "abc", expected: false, desc: "纯字母" },
        { s: "1a", expected: false, desc: "数字后跟字母" },
        { s: "1e", expected: false, desc: "指数后无数字" },
        { s: "e3", expected: false, desc: "指数前无数字" },
        { s: "99e2.5", expected: false, desc: "指数部分为小数" },
        { s: "--6", expected: false, desc: "双重负号" },
        { s: "-+3", expected: false, desc: "负号正号混合" },
        { s: "95a54e53", expected: false, desc: "数字中间夹字母" },
        { s: "+", expected: false, desc: "仅正号" },
        { s: "-", expected: false, desc: "仅负号" },
        { s: "+.", expected: false, desc: "正号加小数点无数字" },
        { s: ".e1", expected: false, desc: "小数点无数字直接指数" },
        { s: "1e+", expected: false, desc: "指数后仅符号" },
        { s: "1e-", expected: false, desc: "指数后仅负号" },
        { s: "0e", expected: false, desc: "整数后e无数字" },
        { s: "1.2.3", expected: false, desc: "多个小数点" }
    ];

    let passed = 0;
    let failed = 0;

    testCases.forEach((tc, index) => {
        const result = isNumber(tc.s);
        const status = result === tc.expected ? '✓' : '✗';
        if (result === tc.expected) {
            passed++;
        } else {
            failed++;
        }
        console.log(`测试用例 ${index + 1}: ${status}`);
        console.log(`  描述: ${tc.desc}`);
        console.log(`  输入: "${tc.s}"`);
        console.log(`  预期: ${tc.expected}`);
        console.log(`  实际: ${result}`);
        console.log('');
    });

    console.log(`\n测试结果: ${passed} 个通过, ${failed} 个失败`);
}

testIsNumber();