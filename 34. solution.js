function getMaxProfits(input) {
    const lines = input.trim().split('\n');
    const number = parseInt(lines[0], 10);
    const days = parseInt(lines[1], 10);
    const limits = lines[2].trim().split(' ').map(Number);
    const prices = lines.slice(3).map(line => line.split(' ').map(Number));

    let ans = 0;
    for (let i = 0; i < number; i++) {
        const dp = Array(days).fill(0).map(() => Array(2).fill(0));
        dp[0][0] = 0;
        dp[0][1] = -prices[i][0];
        for (let j = 1; j < days; j++) {
            dp[j][1] = Math.max(
                dp[j - 1][1],
                dp[j - 1][0] - prices[i][j]
            );
            dp[j][0] = Math.max(
                dp[j - 1][0],
                dp[j - 1][1] + prices[i][j]
            )
        }
        ans += dp[days - 1][0] * limits[i]
    }
    return ans;
}

const tests = [
    {
        name: "基本案例1-示例1",
        input: `3\n3\n4 5 6\n1 2 3\n4 3 2\n1 5 3`,
        expected: 32,
        description: "原题示例：商品1利润3×4，商品2利润2×5，商品3利润4×6"
    },
    {
        name: "基本案例2-示例2",
        input: `1\n1\n1\n1`,
        expected: 0,
        description: "单商品单天，无交易机会"
    },
    {
        name: "单商品多天上涨",
        input: `1\n5\n3\n1 2 3 4 5`,
        expected: 12,
        description: "持续上涨，单股利润(5-1)=4，总利润4×3=12"
    },
    {
        name: "单商品多天下跌",
        input: `1\n5\n2\n5 4 3 2 1`,
        expected: 0,
        description: "持续下跌，不交易利润为0"
    },
    {
        name: "单商品价格波动",
        input: `1\n5\n2\n1 5 1 5 1`,
        expected: 16,
        description: "波动股票，单股利润4+4=8，总利润8×2=16"
    },
    {
        name: "多商品不同特征",
        input: `2\n4\n1 2\n1 3 2 5\n2 1 4 1`,
        expected: 11,
        description: "商品1单股利润5×1，商品2单股利润3×2，总利润5+6=11"
    },
    {
        name: "持仓限制为1",
        input: `1\n3\n1\n1 2 3`,
        expected: 2,
        description: "持仓限制为1，标准股票买卖问题，单股利润2"
    },
    {
        name: "持仓限制很大",
        input: `1\n3\n100\n1 2 3`,
        expected: 200,
        description: "持仓限制100，单股利润2，总利润2×100=200"
    },
    {
        name: "多商品多天全上涨",
        input: `3\n3\n5 5 5\n1 2 3\n2 3 4\n3 4 5`,
        expected: 30,
        description: "三个商品都上涨，单股利润都是2，总利润(2×5)×3=30"
    },
    {
        name: "复杂波动",
        input: `2\n6\n2 3\n3 3 3 3 3 3\n1 5 1 5 1 5`,
        expected: 36,
        description: "商品1价格不变利润0，商品2单股利润12×3=36"
    }
];

function runTests() {
    let passed = 0;
    let failed = 0;

    console.log("=".repeat(60));
    console.log("运行测试用例");
    console.log("=".repeat(60));

    tests.forEach((test, index) => {
        const { name, input, expected, description } = test;
        const result = getMaxProfits(input);
        const success = result === expected;

        console.log(`\n测试 ${index + 1}: ${name}`);
        console.log(`描述: ${description}`);
        console.log(`期望输出: ${expected}`);
        console.log(`实际输出: ${result}`);
        console.log(`结果: ${success ? '✅ 通过' : '❌ 失败'}`);

        if (success) {
            passed++;
        } else {
            failed++;
        }
    });

    console.log("\n" + "=".repeat(60));
    console.log(`测试完成: ${passed} 通过, ${failed} 失败`);
    console.log("=".repeat(60));
}

runTests();
