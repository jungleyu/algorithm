/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var search = function (nums, target) {
    let n = nums.length;
    let left = 0, right = n - 1;
    while (left <= right) {
        let mid = left + Math.floor((right - left) / 2);
        const num = nums[mid];
        if (num === target) {
            return true;
        }
        if (nums[left] === num && nums[right] === num) {
            left++;
            right--;
        } else if (nums[left] <= num) {
            if (nums[left] <= target && target < num) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (num < target && target <= nums[n - 1]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return false;
};

function testSearch() {
    const testCases = [
        { nums: [1], target: 1, expected: true, desc: "单个元素，目标存在" },
        { nums: [1], target: 2, expected: false, desc: "单个元素，目标不存在" },
        { nums: [2, 5, 6, 0, 0, 1, 2], target: 0, expected: true, desc: "标准示例1" },
        { nums: [2, 5, 6, 0, 0, 1, 2], target: 3, expected: false, desc: "标准示例2" },
        { nums: [3, 3, 3, 3, 3], target: 3, expected: true, desc: "所有元素相同，目标存在" },
        { nums: [3, 3, 3, 3, 3], target: 2, expected: false, desc: "所有元素相同，目标不存在" },
        { nums: [1, 2, 3, 4, 5], target: 3, expected: true, desc: "无旋转（完全有序）" },
        { nums: [4, 5, 6, 6, 7, 0, 1, 2, 4, 4], target: 0, expected: true, desc: "旋转点处有重复元素" },
        { nums: [4, 5, 6, 0, 1, 2], target: 4, expected: true, desc: "目标在第一个位置" },
        { nums: [4, 5, 6, 0, 1, 2], target: 2, expected: true, desc: "目标在最后一个位置" },
        { nums: [4, 5, 6, 0, 1, 2], target: 6, expected: true, desc: "目标在旋转点位置" },
        { nums: [1, 0, 1, 1, 1], target: 0, expected: true, desc: "旋转后首尾相同" },
        { nums: [1, 0, 1, 1, 1], target: 2, expected: false, desc: "旋转后首尾相同，目标不存在" },
        { nums: [2, 2, 2, 3, 2, 2, 2], target: 3, expected: true, desc: "重复元素包围目标" },
        { nums: [2, 2, 2, 3, 2, 2, 2], target: 4, expected: false, desc: "重复元素包围，目标不存在" }
    ];

    let passed = 0;
    let failed = 0;

    testCases.forEach((tc, index) => {
        const result = search(tc.nums, tc.target);
        const status = result === tc.expected ? '✓' : '✗';
        if (result === tc.expected) {
            passed++;
        } else {
            failed++;
        }
        console.log(`测试用例 ${index + 1}: ${status}`);
        console.log(`  描述: ${tc.desc}`);
        console.log(`  数组: [${tc.nums}]`);
        console.log(`  目标: ${tc.target}`);
        console.log(`  预期: ${tc.expected}, 实际: ${result}`);
        console.log('');
    });

    console.log(`\n测试结果: ${passed} 个通过, ${failed} 个失败`);
}

testSearch();