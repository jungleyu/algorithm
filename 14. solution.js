function calculateBestPrice(input) {
    const lines = input.trim().split('\n');
    const coupons = lines[0].split(' ').map(Number);
    const [fullReductionCount, discountCount, noThresholdCount] = coupons;
    const n = parseInt(lines[1], 10);
    const prices = lines.slice(2, 2 + n).map(Number);
    
    const results = [];
    for (const price of prices) {
        const best = findBestDiscount(price, fullReductionCount, discountCount, noThresholdCount);
        results.push(`${best.price} ${best.count}`);
    }
    return results.join('\n');
}

function findBestDiscount(price, maxFull, maxDiscount, maxNoThreshold) {
    if (price < 5) {
        return { price: price, count: 0 };
    }
    
    let bestPrice = price;
    let bestCount = 0;
    
    function updateBest(newPrice, newCount) {
        if (newPrice < 0) return;
        if (newPrice < bestPrice || (newPrice === bestPrice && newCount < bestCount)) {
            bestPrice = newPrice;
            bestCount = newCount;
        }
    }
    
    updateBest(price, 0);
    
    const fullUse = Math.min(maxFull, Math.floor(price / 100));
    let temp = price - fullUse * 10;
    const noThresholdUse = Math.min(maxNoThreshold, Math.floor(temp / 5));
    temp -= noThresholdUse * 5;
    updateBest(temp, fullUse + noThresholdUse);
    
    if (maxDiscount >= 1) {
        const afterDiscount = Math.floor(price * 0.92);
        const f = Math.min(maxFull, Math.floor(afterDiscount / 100));
        updateBest(afterDiscount - f * 10, 1 + f);
    }
    
    const f1 = Math.min(maxFull, Math.floor(price / 100));
    updateBest(price - f1 * 10, f1);
    
    if (maxDiscount >= 1) {
        updateBest(Math.floor(price * 0.92), 1);
    }
    
    const n1 = Math.min(maxNoThreshold, Math.floor(price / 5));
    updateBest(price - n1 * 5, n1);
    
    if (maxDiscount >= 1) {
        const f2 = Math.min(maxFull, Math.floor(price / 100));
        const temp2 = price - f2 * 10;
        updateBest(Math.floor(temp2 * 0.92), f2 + 1);
    }
    
    if (maxDiscount >= 1) {
        const afterDiscount = Math.floor(price * 0.92);
        const n2 = Math.min(maxNoThreshold, Math.floor(afterDiscount / 5));
        updateBest(afterDiscount - n2 * 5, 1 + n2);
    }
    
    return { price: bestPrice, count: bestCount };
}

function test() {
    const testCases = [
        {
            name: "示例测试",
            input: `3 2 5
3
100
200
400`,
            expected: "65 6\n155 7\n338 4"
        },
        {
            name: "边界情况 - 价格刚好100",
            input: `1 1 1
1
100`,
            expected: "82 2"
        },
        {
            name: "边界情况 - 无优惠券",
            input: `0 0 0
1
100`,
            expected: "100 0"
        },
        {
            name: "边界情况 - 只使用打折券",
            input: `0 1 0
1
100`,
            expected: "92 1"
        },
        {
            name: "边界情况 - 价格小于5",
            input: `1 1 1
1
3`,
            expected: "3 0"
        },
        {
            name: "边界情况 - 价格刚好5",
            input: `0 0 1
1
5`,
            expected: "0 1"
        },
        {
            name: "边界情况 - 价格99",
            input: `1 1 5
1
99`,
            expected: "66 6"
        },
        {
            name: "边界情况 - 最大价格1000",
            input: `10 10 10
1
1000`,
            expected: "828 11"
        },
        {
            name: "多用户测试",
            input: `2 1 3
2
50
150`,
            expected: "31 4\n123 4"
        },
        {
            name: "先打折后满减更优",
            input: `3 1 0
1
200`,
            expected: "165 3"
        }
    ];

    console.log("=".repeat(60));
    console.log("网上商城优惠活动 - 测试用例");
    console.log("=".repeat(60));
    console.log();

    let passed = 0;
    let failed = 0;

    for (const tc of testCases) {
        const result = calculateBestPrice(tc.input);
        const expected = tc.expected;
        const isPassed = result === expected;

        if (isPassed) {
            passed++;
            console.log(`✅ ${tc.name}`);
        } else {
            failed++;
            console.log(`❌ ${tc.name}`);
        }
        console.log(`   输出:\n${result}`);
        console.log(`   预期:\n${expected}`);
        console.log();
    }

    console.log("=".repeat(60));
    console.log(`测试结果: ${passed} 通过, ${failed} 失败`);
    console.log("=".repeat(60));
}

test();