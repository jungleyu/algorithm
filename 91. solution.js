/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
    const len1 = num1.length, len2 = num2.length;
    const acc = new Array(len1 + len2).fill(0);
    for (let i = len1 - 1; i >= 0; i--) {
        for (let j = len2 - 1; j >= 0; j--) {
            const temp = parseInt(num1[i], 10) * parseInt(num2[j], 10);
            const low = i + j + 1;
            const high = i + j;
            const sum = temp + acc[low];
            acc[low] = sum % 10;
            acc[high] += Math.floor(sum / 10);
        }
    }
    let ans = acc.join('');
    while (ans.length > 1 && ans[0] === '0') {
        ans = ans.slice(1);
    }
    return ans;
};

function runTests() {
    const testCases = [
        { num1: "0", num2: "0", expected: "0", desc: "两个零相乘" },
        { num1: "0", num2: "123", expected: "0", desc: "零乘任意数" },
        { num1: "123", num2: "0", expected: "0", desc: "任意数乘零" },
        { num1: "1", num2: "123", expected: "123", desc: "1乘任意数" },
        { num1: "123", num2: "1", expected: "123", desc: "任意数乘1" },
        { num1: "2", num2: "3", expected: "6", desc: "示例1：单位数字相乘" },
        { num1: "123", num2: "456", expected: "56088", desc: "示例2：三位乘三位" },
        { num1: "9", num2: "99", expected: "891", desc: "单位乘多位，大量进位" },
        { num1: "999", num2: "999", expected: "998001", desc: "大量进位组合" },
        { num1: "123456789", num2: "987654321", expected: "121932631112635269", desc: "较长数字相乘" }
    ];

    let passed = 0;
    let failed = 0;

    for (const { num1, num2, expected, desc } of testCases) {
        const result = multiply(num1, num2);
        const isPass = result === expected;
        if (isPass) {
            passed++;
            console.log(`✅ 测试通过 [${num1} × ${num2}]: ${desc}`);
        } else {
            failed++;
            console.log(`❌ 测试失败 [${num1} × ${num2}]: ${desc}`);
            console.log(`   期望: ${expected}`);
            console.log(`   实际: ${result}`);
        }
    }

    console.log(`\n测试结果: ${passed} 通过, ${failed} 失败`);
}

runTests();