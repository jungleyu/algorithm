/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
    if (n < 0) {
        n = -n;
        x = 1 / x;
    }
    let ans = 1;
    while (n) {
        if (n % 2) {
            ans *= x;
        }
        x *= x;
        n = Math.floor(n / 2);
    }
    return ans;
};

function testMyPow() {
    const testCases = [
        { x: 2.0, n: 10, expected: 1024.0, desc: "标准示例1" },
        { x: 2.1, n: 3, expected: 9.261, desc: "标准示例2" },
        { x: 2.0, n: -2, expected: 0.25, desc: "标准示例3" },
        { x: 2.0, n: 0, expected: 1.0, desc: "任何数的0次幂为1" },
        { x: 0.0, n: 1, expected: 0.0, desc: "0的正次幂为0" },
        { x: 1.0, n: 100, expected: 1.0, desc: "1的任何次幂为1" },
        { x: -1.0, n: 10, expected: 1.0, desc: "-1的偶数次幂为1" },
        { x: -1.0, n: 11, expected: -1.0, desc: "-1的奇数次幂为-1" },
        { x: 2.0, n: 1, expected: 2.0, desc: "n=1" },
        { x: 2.0, n: -1, expected: 0.5, desc: "n=-1" },
        { x: 0.5, n: 10, expected: 0.0009765625, desc: "小于1的正数的幂" },
        { x: -2.0, n: 4, expected: 16.0, desc: "负数的偶数次幂" },
        { x: -2.0, n: 3, expected: -8.0, desc: "负数的奇数次幂" },
        { x: 10.0, n: 3, expected: 1000.0, desc: "10的幂" },
        { x: 10.0, n: -3, expected: 0.001, desc: "10的负幂" },
        { x: 3.0, n: 5, expected: 243.0, desc: "奇数底数的幂" },
        { x: 0.00001, n: 2, expected: 1e-10, desc: "极小正数的幂" },
        { x: -0.5, n: 3, expected: -0.125, desc: "负数小数的幂" },
        { x: 2.0, n: -3, expected: 0.125, desc: "负指数" },
        { x: 3.7, n: 0, expected: 1.0, desc: "任何数的0次幂" }
    ];

    let passed = 0;
    let failed = 0;
    const epsilon = 1e-5;

    testCases.forEach((tc, index) => {
        const result = myPow(tc.x, tc.n);
        const isClose = Math.abs(result - tc.expected) < epsilon;
        const status = isClose ? '✓' : '✗';
        if (isClose) {
            passed++;
        } else {
            failed++;
        }
        console.log(`测试用例 ${index + 1}: ${status}`);
        console.log(`  描述: ${tc.desc}`);
        console.log(`  输入: x = ${tc.x}, n = ${tc.n}`);
        console.log(`  预期: ${tc.expected}, 实际: ${result}`);
        console.log('');
    });

    console.log(`\n测试结果: ${passed} 个通过, ${failed} 个失败`);
}

testMyPow();