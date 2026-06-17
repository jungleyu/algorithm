function jumpSteps(nums, count) {
    const n = nums.length;
    if (n < 2) {
        return [];
    }

    const map = new Map();
    let minIndexSum = Infinity;
    let result = [];

    for (let i = 0; i < n; i++) {
        const step = count - nums[i];
        if (map.has(step)) {
            const indexSum = map.get(step) + i;
            if (indexSum < minIndexSum) {
                minIndexSum = indexSum;
                result = [nums[map.get(step)], nums[i]];
            }
        }
        if (!map.has(nums[i])) {
            map.set(nums[i], i);
        }
    }

    return result;
}

const tests = [
    {
        name: "基本案例1",
        input: { nums: [1, 4, 5, 2, 2], count: 7 },
        expected: [5, 2],
        description: "原题用例，两种组合[1,6]和[5,2]，索引和分别为1+4=5和2+3=5，索引和最小"
    },
    {
        name: "基本案例2",
        input: { nums: [-1, 2, 4, 9, 6], count: 8 },
        expected: [-1, 9],
        description: "原题用例，[2,6]索引和5，[-1,9]索引和3，选[-1,9]"
    },
    {
        name: "数组有重复元素",
        input: { nums: [3, 3, 3, 3], count: 6 },
        expected: [3, 3],
        description: "所有元素相同，任意两个3相加都等于6，索引和最小为0+1=2"
    },
    {
        name: "包含负数",
        input: { nums: [-5, -3, 2, 8], count: 3 },
        expected: [-5, 8],
        description: "负数和正数组合，-5+8=3，索引和0+3=3"
    },
    {
        name: "零步数",
        input: { nums: [0, 5, -5, 10], count: 10 },
        expected: [0, 10],
        description: "包含零的情况，0+10=10，索引和0+3=3"
    },
    {
        name: "两个元素正好",
        input: { nums: [2, 8], count: 10 },
        expected: [2, 8],
        description: "刚好两个元素，2+8=10"
    },
    {
        name: "多个有效组合",
        input: { nums: [1, 2, 3, 4, 5], count: 6 },
        expected: [2, 4],
        description: "多个组合[1,5]和[2,4]，[1,5]索引和0+4=4，[2,4]索引和1+3=4，相同则选遍历中先找到的[2,4]"
    },
    {
        name: "大步数差值",
        input: { nums: [-100, 50, 150], count: 50 },
        expected: [-100, 150],
        description: "大步数组合，-100+150=50"
    },
    {
        name: "边界值count=1",
        input: { nums: [1, 0, 1], count: 2 },
        expected: [1, 1],
        description: "边界小count，[1,1]组合"
    },
    {
        name: "连续相同元素",
        input: { nums: [2, 2, 2, 2, 2], count: 4 },
        expected: [2, 2],
        description: "所有元素都是2，第一对[2,2]索引和0+1=2"
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
        const result = jumpSteps(input.nums, input.count);
        const success = JSON.stringify(result) === JSON.stringify(expected);

        console.log(`\n测试 ${index + 1}: ${name}`);
        console.log(`描述: ${description}`);
        console.log(`输入: nums = [${input.nums}], count = ${input.count}`);
        console.log(`期望输出: [${expected}]`);
        console.log(`实际输出: [${result}]`);
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
