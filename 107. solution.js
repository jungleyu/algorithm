/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
    const ans = Array.from({
        length: n,
    }, () => Array.from({
        length: n
    }, () => 0));

    let left = 0, top = 0, right = n - 1, bottom = n - 1;

    let num = 1;
    while (num <= n * n) {
        for (let i = left; i <= right; i++) {
            ans[top][i] = num++;
        }
        top++;
        if (top > bottom) break;
        for (let i = top; i <= bottom; i++) {
            ans[i][right] = num++;
        }
        right--;
        if (left > right) break;
        for (let i = right; i >= left; i--) {
            ans[bottom][i] = num++;
        }
        bottom--;
        if (top > bottom) break;
        for (let i = bottom; i >= top; i--) {
            ans[i][left] = num++;
        }
        left++;
        if (left > right) break;
    }

    return ans;
};

function testGenerateMatrix() {
    const testCases = [
        { n: 1, expected: [[1]], desc: "n=1，单个元素" },
        { n: 2, expected: [[1,2],[4,3]], desc: "n=2，最小偶数" },
        { n: 3, expected: [[1,2,3],[8,9,4],[7,6,5]], desc: "n=3，标准示例" },
        { n: 4, expected: [[1,2,3,4],[12,13,14,5],[11,16,15,6],[10,9,8,7]], desc: "n=4，偶数" },
        { n: 5, expected: [[1,2,3,4,5],[16,17,18,19,6],[15,24,25,20,7],[14,23,22,21,8],[13,12,11,10,9]], desc: "n=5，奇数" },
        { n: 6, expected: [[1,2,3,4,5,6],[20,21,22,23,24,7],[19,32,33,34,25,8],[18,31,36,35,26,9],[17,30,29,28,27,10],[16,15,14,13,12,11]], desc: "n=6，偶数" },
    ];

    let passed = 0;
    let failed = 0;

    testCases.forEach((tc, index) => {
        const result = generateMatrix(tc.n);
        const isEqual = JSON.stringify(result) === JSON.stringify(tc.expected);
        const status = isEqual ? '✓' : '✗';
        if (isEqual) {
            passed++;
        } else {
            failed++;
        }
        console.log(`测试用例 ${index + 1}: ${status}`);
        console.log(`  描述: ${tc.desc}`);
        console.log(`  输入: n = ${tc.n}`);
        console.log(`  预期: ${JSON.stringify(tc.expected)}`);
        console.log(`  实际: ${JSON.stringify(result)}`);
        console.log('');
    });

    const boundaryCases = [
        { n: 10, desc: "n=10，较大偶数" },
        { n: 15, desc: "n=15，较大奇数" },
        { n: 20, desc: "n=20，最大边界值" },
    ];

    boundaryCases.forEach((tc, index) => {
        const result = generateMatrix(tc.n);
        const isCorrectSize = result.length === tc.n && result.every(row => row.length === tc.n);
        const firstElement = result[0][0];
        const sum = result.flat().reduce((a, b) => a + b, 0);
        const expectedSum = tc.n * tc.n * (tc.n * tc.n + 1) / 2;
        const hasAllNumbers = new Set(result.flat()).size === tc.n * tc.n;
        const isCorrect = isCorrectSize && firstElement === 1 && sum === expectedSum && hasAllNumbers;
        const status = isCorrect ? '✓' : '✗';
        if (isCorrect) {
            passed++;
        } else {
            failed++;
        }
        console.log(`测试用例 ${testCases.length + index + 1}: ${status}`);
        console.log(`  描述: ${tc.desc}`);
        console.log(`  输入: n = ${tc.n}`);
        console.log(`  验证: 矩阵尺寸 ${tc.n}x${tc.n} = ${isCorrectSize ? '通过' : '失败'}, 首元素=1 = ${firstElement === 1 ? '通过' : '失败'}, 元素和=${expectedSum} = ${sum === expectedSum ? '通过' : `失败(实际=${sum})`}, 无重复 = ${hasAllNumbers ? '通过' : '失败'}`);
        console.log('');
    });

    console.log(`\n测试结果: ${passed} 个通过, ${failed} 个失败`);
}

testGenerateMatrix();