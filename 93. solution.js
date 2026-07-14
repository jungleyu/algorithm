/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
    const n = nums.length;
    if (n <= 1) {
        return true;
    }

    let cover = 0;
    for (let i = 0; i <= cover; i++) {
        cover = Math.max(cover, i + nums[i]);
        if (cover >= n - 1) {
            return true;
        }
    }
    return false;
};

function testCanJump() {
    const testCases = [
        { nums: [0], expected: true, desc: "单个元素，起点即终点" },
        { nums: [2, 0, 0], expected: true, desc: "中间有0但可直接跳过" },
        { nums: [3, 2, 1, 0, 4], expected: false, desc: "0挡住所有路径" },
        { nums: [0, 1], expected: false, desc: "第一个元素为0无法跳跃" },
        { nums: [2, 3, 1, 1, 4], expected: true, desc: "基本可到达示例" },
        { nums: [1, 0, 1, 0], expected: false, desc: "0在关键位置阻挡" },
        { nums: [2, 0, 1, 0], expected: true, desc: "跳过0后可到达终点" },
        { nums: [5, 0, 0, 0, 0, 0], expected: true, desc: "大跳跃直接到达终点" },
        { nums: [1, 1, 1, 1, 1], expected: true, desc: "每次跳1步逐步到达" },
        { nums: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0], expected: true, desc: "首元素大跳跃跳过所有0" }
    ];

    let passed = 0;
    let failed = 0;

    testCases.forEach((tc, index) => {
        const result = canJump(tc.nums);
        const status = result === tc.expected ? '✓' : '✗';
        if (result === tc.expected) {
            passed++;
        } else {
            failed++;
        }
        console.log(`测试用例 ${index + 1}: ${status}`);
        console.log(`  描述: ${tc.desc}`);
        console.log(`  输入: [${tc.nums}]`);
        console.log(`  预期: ${tc.expected}, 实际: ${result}`);
        console.log('');
    });

    console.log(`\n测试结果: ${passed} 个通过, ${failed} 个失败`);
}

testCanJump();