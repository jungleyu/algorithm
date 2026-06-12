/**
 * 开放日活动 - 取出尽量少的球
 * 综合方案：BigInt 处理大数 + 直接遍历找最大值（避免参数限制）
 */

/**
 * 计算取出的小球数量
 * @param {number} sumLimit - 小球总数限制
 * @param {number[]} bucketBallNums - 每个桶的小球数量
 * @returns {number[]} - 每个桶需要取出的小球数量
 */
function getBallsToRemove(sumLimit, bucketBallNums) {
    const n = bucketBallNums.length;
    
    // 使用 BigInt 避免溢出，同时手动遍历找最大值（避免 Math.max 参数限制）
    let total = 0n;
    let maxVal = 0;
    for (const num of bucketBallNums) {
        total += BigInt(num);
        if (num > maxVal) maxVal = num;
    }
    
    if (total <= BigInt(sumLimit)) {
        return [];
    }

    let left = 0;
    let right = maxVal;
    let maxCapacity = 0;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        let currentSum = 0n;
        
        for (const num of bucketBallNums) {
            currentSum += BigInt(Math.min(num, mid));
            // 提前终止：如果已经超过限制，无需继续计算
            if (currentSum > BigInt(sumLimit)) break;
        }
        
        if (currentSum <= BigInt(sumLimit)) {
            maxCapacity = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return bucketBallNums.map(num => Math.max(0, num - maxCapacity));
}

// 测试用例
const testCases = [
    { name: "示例1 - 需要取球", sumLimit: 14, bucketBallNums: [2, 3, 2, 5, 5, 1, 4], expected: [0, 1, 0, 3, 3, 0, 2] },
    { name: "示例2 - 刚好等于SUM", sumLimit: 3, bucketBallNums: [1, 2, 3], expected: [0, 1, 2] },
    { name: "示例3 - 无需取球", sumLimit: 6, bucketBallNums: [3, 2], expected: [] },
    { name: "所有桶都要取球", sumLimit: 5, bucketBallNums: [10, 10, 10], expected: [9, 9, 9] },
    { name: "单桶超出", sumLimit: 5, bucketBallNums: [10], expected: [5] },
    { name: "单桶刚好", sumLimit: 5, bucketBallNums: [5], expected: [] },
    { name: "部分桶需要取球", sumLimit: 10, bucketBallNums: [2, 3, 5, 8], expected: [0, 1, 3, 6] },
    { name: "全部取出", sumLimit: 0, bucketBallNums: [1, 2, 3], expected: [1, 2, 3] },
    { name: "maxCapacity等于最大桶", sumLimit: 100, bucketBallNums: [10, 20, 30], expected: [] },
    { name: "边界情况", sumLimit: 1, bucketBallNums: [1, 1, 1], expected: [1, 1, 1] }
];

// 运行测试
function runTests() {
    console.log("=== 开放日活动 - 常规测试 ===\n");

    testCases.forEach((tc, index) => {
        const actual = getBallsToRemove(tc.sumLimit, tc.bucketBallNums);
        const passed = JSON.stringify(actual) === JSON.stringify(tc.expected);
        console.log(`测试 ${index + 1}: ${tc.name}`);
        console.log(`  预期: ${JSON.stringify(tc.expected)}`);
        console.log(`  实际: ${JSON.stringify(actual)} ${passed ? "✅ 通过" : "❌ 失败"}`);
        console.log();
    });

    console.log("=== 极端测试用例 (10^5 个桶 × 10^9 个球) ===\n");
    
    // 构造极端测试用例：10^5 个桶，每个桶有 10^9 个球
    const BUCKET_COUNT = 100000;
    const BALLS_PER_BUCKET = 1000000000; // 10^9
    const extremeData = Array(BUCKET_COUNT).fill(BALLS_PER_BUCKET);
    
    // 总和 = 10^5 × 10^9 = 10^14
    const totalSum = BigInt(BUCKET_COUNT) * BigInt(BALLS_PER_BUCKET);
    // 设置 SUM 为总和的一半，确保需要取球
    const sumLimit = Number(totalSum / 2n);
    
    console.log(`桶数量: ${BUCKET_COUNT.toLocaleString()}`);
    console.log(`每桶球数: ${BALLS_PER_BUCKET.toLocaleString()}`);
    console.log(`理论总和: 10^14 (${totalSum.toString()})`);
    console.log(`目标限制: ${sumLimit.toLocaleString()}`);
    console.log();
    
    console.time("极端测试处理时间");
    const result = getBallsToRemove(sumLimit, extremeData);
    console.timeEnd("极端测试处理时间");
    
    // 计算取出的球数和剩余的球数
    let removedSum = 0n;
    let remainingSum = 0n;
    for (let i = 0; i < BUCKET_COUNT; i++) {
        removedSum += BigInt(result[i]);
        remainingSum += BigInt(Math.min(BALLS_PER_BUCKET, BALLS_PER_BUCKET - result[i]));
    }
    
    console.log();
    console.log(`实际取出球数: ${removedSum.toLocaleString()}`);
    console.log(`实际剩余球数: ${remainingSum.toLocaleString()}`);
    console.log(`目标限制: ${sumLimit.toLocaleString()}`);
    
    const isCorrect = remainingSum <= BigInt(sumLimit);
    console.log(`\n结果验证: ${isCorrect ? "✅ 通过" : "❌ 失败"}`);
    console.log(`BigInt 验证: ${removedSum + remainingSum === totalSum ? "✅ 总和正确" : "❌ 总和不一致"}`);
}

runTests();