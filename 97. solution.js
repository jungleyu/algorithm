/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    let n = nums.length;
    if (n === 0) {
        return 0;
    }
    let fast = 1, slow = 1;
    while (fast < n) {
        if (nums[fast] !== nums[fast - 1]) {
            nums[slow] = nums[fast];
            slow++;
        }
        fast++;
    }
    return slow;
};

function testRemoveDuplicates() {
    const testCases = [
        { input: [], expectedLen: 0, expectedArr: [], desc: "空数组" },
        { input: [1], expectedLen: 1, expectedArr: [1], desc: "单个元素" },
        { input: [1, 1, 1], expectedLen: 1, expectedArr: [1], desc: "所有元素相同" },
        { input: [1, 2, 3, 4, 5], expectedLen: 5, expectedArr: [1, 2, 3, 4, 5], desc: "所有元素不同" },
        { input: [1, 1, 2], expectedLen: 2, expectedArr: [1, 2], desc: "标准示例1" },
        { input: [0, 0, 1, 1, 1, 2, 2, 3, 3, 4], expectedLen: 5, expectedArr: [0, 1, 2, 3, 4], desc: "标准示例2" },
        { input: [-1, -1, 0, 0, 1, 1], expectedLen: 3, expectedArr: [-1, 0, 1], desc: "负数数组" },
        { input: [-5, -5, -3, -3, 0, 0, 2, 2], expectedLen: 4, expectedArr: [-5, -3, 0, 2], desc: "混合正负" },
        { input: [2, 2], expectedLen: 1, expectedArr: [2], desc: "两个相同元素" },
        { input: [1, 2], expectedLen: 2, expectedArr: [1, 2], desc: "两个不同元素" }
    ];

    let passed = 0;
    let failed = 0;

    testCases.forEach((tc, index) => {
        const nums = [...tc.input];
        const resultLen = removeDuplicates(nums);
        const resultArr = nums.slice(0, resultLen);
        const arrMatch = JSON.stringify(resultArr) === JSON.stringify(tc.expectedArr);
        const status = resultLen === tc.expectedLen && arrMatch ? '✓' : '✗';
        if (resultLen === tc.expectedLen && arrMatch) {
            passed++;
        } else {
            failed++;
        }
        console.log(`测试用例 ${index + 1}: ${status}`);
        console.log(`  描述: ${tc.desc}`);
        console.log(`  输入: [${tc.input}]`);
        console.log(`  预期长度: ${tc.expectedLen}, 实际长度: ${resultLen}`);
        console.log(`  预期数组: [${tc.expectedArr}], 实际数组: [${resultArr}]`);
        console.log('');
    });

    console.log(`\n测试结果: ${passed} 个通过, ${failed} 个失败`);
}

testRemoveDuplicates();