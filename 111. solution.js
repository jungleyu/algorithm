/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
    for (let i = digits.length - 1; i >= 0; i--) {
        if (digits[i] < 9) {
            digits[i]++;
            return digits;
        }
        digits[i] = 0;
    }
    digits.unshift(1);//全是9的情况,在最前面推入一个1
    return digits;
};

function testPlusOne() {
    const testCases = [
        { input: [1, 2, 3], expected: [1, 2, 4], desc: "标准示例1，末尾无进位" },
        { input: [4, 3, 2, 1], expected: [4, 3, 2, 2], desc: "标准示例2，末尾无进位" },
        { input: [9], expected: [1, 0], desc: "标准示例3，单个9产生进位" },
        { input: [0], expected: [1], desc: "单个0" },
        { input: [1], expected: [2], desc: "单个1" },
        { input: [8], expected: [9], desc: "单个8，无进位" },
        { input: [9, 9], expected: [1, 0, 0], desc: "两个9，全进位" },
        { input: [9, 9, 9], expected: [1, 0, 0, 0], desc: "三个9，全进位" },
        { input: [1, 2, 9], expected: [1, 3, 0], desc: "末尾为9，部分进位" },
        { input: [8, 9, 9], expected: [9, 0, 0], desc: "末尾两个9，部分进位" },
        { input: [9, 8, 9], expected: [9, 9, 0], desc: "末尾为9，中间不进位" },
        { input: [2, 9, 9, 9], expected: [3, 0, 0, 0], desc: "末尾三个9，首位进位" },
        { input: [1, 0, 0, 0], expected: [1, 0, 0, 1], desc: "末尾为0，无进位" },
        { input: [7, 2, 8, 5, 0, 9, 1, 2, 9, 5], expected: [7, 2, 8, 5, 0, 9, 1, 2, 9, 6], desc: "10位数，末尾无进位" }
    ];

    let passed = 0;
    let failed = 0;

    testCases.forEach((tc, index) => {
        const result = plusOne([...tc.input]); // 传入副本避免修改原数组
        const status = JSON.stringify(result) === JSON.stringify(tc.expected) ? '✓' : '✗';
        if (JSON.stringify(result) === JSON.stringify(tc.expected)) {
            passed++;
        } else {
            failed++;
        }
        console.log(`测试用例 ${index + 1}: ${status}`);
        console.log(`  描述: ${tc.desc}`);
        console.log(`  输入: [${tc.input}]`);
        console.log(`  预期: [${tc.expected}]`);
        console.log(`  实际: [${result}]`);
        console.log('');
    });

    console.log(`\n测试结果: ${passed} 个通过, ${failed} 个失败`);
}

testPlusOne();