var jump = function (nums) {
    let ans = 0;
    let curIndex = 0, nextIndex = 0;
    for (let i = 0; i < nums.length - 1; i++) {
        nextIndex = Math.max(nextIndex, nums[i] + i);
        if (i === curIndex) {
            curIndex = nextIndex;
            ans++;
        }
    }
    return ans;
};

function testJump() {
    const testCases = [
        { nums: [0], expected: 0, desc: "单个元素，无需跳跃" },
        { nums: [1, 0], expected: 1, desc: "两个元素，跳1次到达" },
        { nums: [2, 3, 1, 1, 4], expected: 2, desc: "示例1，最小跳2次" },
        { nums: [2, 3, 0, 1, 4], expected: 2, desc: "示例2，中间有0" },
        { nums: [1, 1, 1, 1, 1], expected: 4, desc: "全1数组，需n-1次" },
        { nums: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0], expected: 1, desc: "首元素大跳跃直接到达" },
        { nums: [1, 2, 3, 4, 5], expected: 3, desc: "递增数组" },
        { nums: [2, 1], expected: 1, desc: "两元素直接跳到终点" },
        { nums: [1, 2, 1, 1, 1], expected: 3, desc: "逐步跳跃" },
        { nums: [5, 4, 3, 2, 1, 0], expected: 1, desc: "首元素直接到终点" }
    ];

    let passed = 0;
    let failed = 0;

    testCases.forEach((tc, index) => {
        const result = jump(tc.nums);
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

testJump();