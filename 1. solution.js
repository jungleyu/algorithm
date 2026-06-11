/**
 * @param {number[]} positions 适合种树的坐标位置
 * @param {number} n 树苗的数量
 * @return {number} 最佳的最小种植间距
 */
function check(positions, mid, n) {
    let cnt = 1;
    let cur = positions[0];
    for (let i = 1; i < positions.length; i++) {
        if (positions[i] - cur >= mid) {
            cur = positions[i];
            cnt++;
        }
    }
    return cnt >= n;
}

function bestTreeSpacing(positions, n) {
    positions.sort((a, b) => a - b);
    let min = 1, max = positions[positions.length - 1] - positions[0];
    let ans = 0;

    while (min <= max) {
        const mid = (max + min) >> 1;
        if (check(positions, mid, n)) {
            ans = mid;
            min = mid + 1;
        } else {
            max = mid - 1;
        }
    }

    return ans;

}

// 测试用例
const tests = [
    {
        name: '示例测试',
        positions: [1, 5, 3, 6, 10, 7, 13],
        n: 3,
        expected: 6
    },
    {
        name: '只有2棵树',
        positions: [1, 2, 3, 4, 5],
        n: 2,
        expected: 4
    },
    {
        name: '等差数列分布',
        positions: [1, 3, 6, 10, 15, 21, 28, 36, 45, 55],
        n: 4,
        expected: 15
    },
    {
        name: '刚好3个点种3棵树',
        positions: [100, 200, 300],
        n: 3,
        expected: 100
    },
    {
        name: '等比数列分布',
        positions: [1, 2, 4, 8, 16, 32],
        n: 3,
        expected: 15
    },
    {
        name: '均匀分布但树苗较多',
        positions: [1, 3, 5, 7, 9, 11, 13, 15],
        n: 5,
        expected: 2
    },
    {
        name: '只有2棵树取最大间距',
        positions: [10, 20, 30, 40],
        n: 2,
        expected: 30
    },
    {
        name: '稀疏分布',
        positions: [1, 10, 20, 30, 40, 50],
        n: 3,
        expected: 20
    },
    {
        name: '斐波那契分布',
        positions: [1, 2, 4, 7, 11],
        n: 3,
        expected: 4
    },
    {
        name: '需要精细选择',
        positions: [1, 5, 10, 15, 20, 25, 30, 35, 40],
        n: 6,
        expected: 5
    }
];

// 运行测试
let passed = 0, failed = 0;

console.log('='.repeat(60));
console.log('最佳植树距离 - 二分查找解法');
console.log('='.repeat(60));

tests.forEach((test, index) => {
    const result = bestTreeSpacing([...test.positions], test.n);
    const success = result === test.expected;
    
    console.log(`\n测试 ${index + 1}: ${test.name}`);
    console.log(`输入: positions=[${test.positions}], n=${test.n}`);
    console.log(`期望: ${test.expected}`);
    console.log(`实际: ${result}`);
    console.log(`结果: ${success ? '✅ 通过' : '❌ 失败'}`);
    
    if (success) passed++; else failed++;
});

console.log('\n' + '='.repeat(60));
console.log(`测试完成: ${passed} 通过, ${failed} 失败`);
console.log('='.repeat(60));