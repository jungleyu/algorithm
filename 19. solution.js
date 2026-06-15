function countElegantSubarrays(n, k, arr) {
    let count = 0;
    const freq = new Map();
    let left = 0;
    
    for (let right = 0; right < n; right++) {
        const num = arr[right];
        freq.set(num, (freq.get(num) || 0) + 1);
        
        while (freq.get(num) >= k) {
            count += n - right;
            const leftNum = arr[left];
            freq.set(leftNum, freq.get(leftNum) - 1);
            left++;
        }
    }
    
    return count;
}

const tests = [
    {
        name: '示例1',
        n: 7,
        k: 3,
        arr: [1, 2, 3, 1, 2, 3, 1],
        expected: 1
    },
    {
        name: '示例2',
        n: 7,
        k: 2,
        arr: [1, 2, 3, 1, 2, 3, 1],
        expected: 10
    },
    {
        name: '单元素数组',
        n: 1,
        k: 1,
        arr: [5],
        expected: 1
    },
    {
        name: '单元素数组k=2',
        n: 1,
        k: 2,
        arr: [5],
        expected: 0
    },
    {
        name: '所有元素相同',
        n: 4,
        k: 2,
        arr: [2, 2, 2, 2],
        expected: 6
    },
    {
        name: '连续满足条件',
        n: 5,
        k: 2,
        arr: [1, 1, 2, 2, 2],
        expected: 9
    },
    {
        name: '分散满足条件',
        n: 6,
        k: 2,
        arr: [1, 2, 1, 3, 2, 4],
        expected: 6
    },
    {
        name: '刚好k次',
        n: 5,
        k: 2,
        arr: [1, 2, 3, 1, 2],
        expected: 3
    },
    {
        name: '完全不满足',
        n: 5,
        k: 3,
        arr: [1, 2, 3, 4, 5],
        expected: 0
    },
    {
        name: '混合场景',
        n: 8,
        k: 3,
        arr: [1, 2, 1, 2, 1, 2, 1, 2],
        expected: 10
    }
];

let passed = 0, failed = 0;

console.log('='.repeat(60));
console.log('优雅子数组 - 滑动窗口解法');
console.log('='.repeat(60));

tests.forEach((test, index) => {
    const result = countElegantSubarrays(test.n, test.k, test.arr);
    const success = result === test.expected;
    
    console.log(`\n测试 ${index + 1}: ${test.name}`);
    console.log(`输入: n=${test.n}, k=${test.k}, arr=${test.arr}`);
    console.log(`期望: ${test.expected}`);
    console.log(`实际: ${result}`);
    console.log(`结果: ${success ? '✅ 通过' : '❌ 失败'}`);
    
    if (success) passed++; else failed++;
});

console.log('\n' + '='.repeat(60));
console.log(`测试完成: ${passed} 通过, ${failed} 失败`);
console.log('='.repeat(60));