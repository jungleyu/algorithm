function countKTuples(input) {
    const lines = input.trim().split('\n');
    const nums = lines[0].split(' ').map(Number);
    const k = Number(lines[1]);
    const target = Number(lines[2]);
    
    nums.sort((a, b) => a - b);
    const result = [];
    backtrack(nums, k, target, 0, [], result);
    return result.length.toString();
}

function backtrack(nums, k, target, start, path, result) {
    if (path.length === k) {
        if (target === 0) {
            result.push([...path]);
        }
        return;
    }
    
    for (let i = start; i < nums.length; i++) {
        if (i > start && nums[i] === nums[i - 1]) {
            continue;
        }
        if (nums[i] > target && nums[i] > 0) {
            break;
        }
        path.push(nums[i]);
        backtrack(nums, k, target - nums[i], i + 1, path, result);
        path.pop();
    }
}

function test() {
    const testCases = [
        {
            name: "示例1 - 3数之和",
            input: `-1 0 1 2 -1 -4
3
0`,
            expected: "2"
        },
        {
            name: "示例2 - 2数之和",
            input: `2 7 11 15
2
9`,
            expected: "1"
        },
        {
            name: "边界情况 - 最小数组长度",
            input: `1 2
2
3`,
            expected: "1"
        },
        {
            name: "边界情况 - 无解",
            input: `1 2 3
2
100`,
            expected: "0"
        },
        {
            name: "边界情况 - 全负数",
            input: `-5 -3 -2 -1
2
-3`,
            expected: "1"
        },
        {
            name: "边界情况 - 有零",
            input: `0 0 0 0
2
0`,
            expected: "1"
        },
        {
            name: "边界情况 - 大量重复元素",
            input: `1 1 1 1 1
3
3`,
            expected: "1"
        },
        {
            name: "边界情况 - 混合正负",
            input: `-2 -1 0 1 2
3
0`,
            expected: "2"
        },
        {
            name: "边界情况 - 4数之和",
            input: `1 0 -1 0 -2 2
4
0`,
            expected: "3"
        },
        {
            name: "边界情况 - 目标为最大值",
            input: `1 2 3 4 5
2
9`,
            expected: "1"
        }
    ];

    console.log("=".repeat(60));
    console.log("符合要求的元组的个数 - 测试用例");
    console.log("=".repeat(60));
    console.log();

    let passed = 0;
    let failed = 0;

    for (const tc of testCases) {
        const result = countKTuples(tc.input);
        const expected = tc.expected;
        const isPassed = result === expected;

        if (isPassed) {
            passed++;
            console.log(`✅ ${tc.name}`);
        } else {
            failed++;
            console.log(`❌ ${tc.name}`);
        }
        console.log(`   输出: ${result}`);
        console.log(`   预期: ${expected}`);
        console.log();
    }

    console.log("=".repeat(60));
    console.log(`测试结果: ${passed} 通过, ${failed} 失败`);
    console.log("=".repeat(60));
}

test();