function minCostTickets(costs, days) {
    const maxDay = days[days.length - 1];
    const dp = new Array(maxDay + 1).fill(0);
    const daySet = new Set(days);
    
    for (let i = 1; i <= maxDay; i++) {
        if (!daySet.has(i)) {
            dp[i] = dp[i - 1];
        } else {
            dp[i] = Math.min(
                dp[i - 1] + costs[0],
                dp[Math.max(0, i - 3)] + costs[1],
                dp[Math.max(0, i - 7)] + costs[2],
                dp[Math.max(0, i - 30)] + costs[3]
            );
        }
    }
    
    return dp[maxDay];
}

// 测试用例
const tests = [
    {
        name: '示例1',
        costs: [5, 14, 30, 100],
        days: [1, 3, 5, 20, 21, 200, 202, 230],
        expected: 40
    },
    {
        name: '连续几天适合三日票',
        costs: [2, 5, 10, 20],
        days: [1, 2, 3, 4, 5],
        expected: 9
    },
    {
        name: '连续一周适合周票',
        costs: [3, 8, 15, 30],
        days: [1, 2, 3, 4, 5, 6, 7],
        expected: 15
    },
    {
        name: '分散多天适合多种组合',
        costs: [4, 10, 20, 40],
        days: [1, 4, 6, 7, 8, 20],
        expected: 22
    },
    {
        name: '只玩一天',
        costs: [1, 3, 7, 15],
        days: [1],
        expected: 1
    },
    {
        name: '玩3天，三日票更划算',
        costs: [2, 5, 10, 20],
        days: [1, 2, 3],
        expected: 5
    },
    {
        name: '全年大部分时间游玩，月票划算',
        costs: [3, 8, 15, 30],
        days: Array.from({length: 300}, (_, i) => i + 1),
        expected: 300
    },
    {
        name: '月票真正划算的场景',
        costs: [5, 15, 30, 50],
        days: Array.from({length: 365}, (_, i) => i + 1),
        expected: 625
    },
    {
        name: '间隔游玩，组合票种',
        costs: [2, 7, 15, 30],
        days: [1, 2, 3, 10, 11, 15, 16, 17, 18, 19],
        expected: 20
    },
    {
        name: '周票和三日票组合',
        costs: [5, 12, 20, 50],
        days: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19],
        expected: 50
    },
    {
        name: '复杂场景',
        costs: [2, 5, 10, 25],
        days: [1, 2, 4, 5, 6, 7, 8, 9, 10, 20, 21, 22, 30],
        expected: 21
    }
];

// 运行测试
let passed = 0, failed = 0;

console.log('='.repeat(60));
console.log('Wonderland 游乐园门票问题 - 动态规划解法');
console.log('='.repeat(60));

tests.forEach((test, index) => {
    const result = minCostTickets(test.costs, test.days);
    const success = result === test.expected;
    
    console.log(`\n测试 ${index + 1}: ${test.name}`);
    console.log(`输入: costs=${test.costs}, days=${test.days}`);
    console.log(`期望: ${test.expected}`);
    console.log(`实际: ${result}`);
    console.log(`结果: ${success ? '✅ 通过' : '❌ 失败'}`);
    
    if (success) passed++; else failed++;
});

console.log('\n' + '='.repeat(60));
console.log(`测试完成: ${passed} 通过, ${failed} 失败`);
console.log('='.repeat(60));
