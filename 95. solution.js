/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */

var searchMatrix = function (matrix, target) {
    const m = matrix.length;
    const n = matrix[0].length;
    let left = 0, right = m * n - 1;
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        const num = matrix[Math.floor(mid / n)][mid % n]
        if (target === num) {
            return true;
        }
        if (target > num) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return false;
};

function testSearchMatrix() {
    const testCases = [
        { matrix: [[1]], target: 1, expected: true, desc: "1x1矩阵，目标存在" },
        { matrix: [[1]], target: 2, expected: false, desc: "1x1矩阵，目标不存在" },
        { matrix: [[1, 3, 5, 7]], target: 3, expected: true, desc: "单行矩阵，目标存在" },
        { matrix: [[1], [3], [5], [7]], target: 5, expected: true, desc: "单列矩阵，目标存在" },
        { matrix: [[1, 3, 5], [7, 9, 11]], target: 1, expected: true, desc: "目标在第一个位置" },
        { matrix: [[1, 3, 5], [7, 9, 11]], target: 11, expected: true, desc: "目标在最后一个位置" },
        { matrix: [[1, 3, 5], [7, 9, 11]], target: 0, expected: false, desc: "目标小于所有元素" },
        { matrix: [[1, 3, 5], [7, 9, 11]], target: 12, expected: false, desc: "目标大于所有元素" },
        { matrix: [[1, 3, 5], [7, 9, 11]], target: 4, expected: false, desc: "目标在范围内但不存在" },
        { matrix: [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target: 3, expected: true, desc: "标准示例1" },
        { matrix: [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target: 13, expected: false, desc: "标准示例2" }
    ];

    let passed = 0;
    let failed = 0;

    testCases.forEach((tc, index) => {
        const result = searchMatrix(tc.matrix, tc.target);
        const status = result === tc.expected ? '✓' : '✗';
        if (result === tc.expected) {
            passed++;
        } else {
            failed++;
        }
        console.log(`测试用例 ${index + 1}: ${status}`);
        console.log(`  描述: ${tc.desc}`);
        console.log(`  矩阵: ${JSON.stringify(tc.matrix)}`);
        console.log(`  目标: ${tc.target}`);
        console.log(`  预期: ${tc.expected}, 实际: ${result}`);
        console.log('');
    });

    console.log(`\n测试结果: ${passed} 个通过, ${failed} 个失败`);
}

testSearchMatrix();