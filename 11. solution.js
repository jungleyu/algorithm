function calcClosestNum(nums, k) {
    const n = nums.length;
    const midIdx = Math.floor(n / 2);
    const mid = [...nums].sort((a, b) => a - b)[midIdx];

    let wnd = nums[0];
    for (let i = 1; i < k; i++) {
        wnd -= nums[i];
    }
    let minDiff = Math.abs(wnd - mid);
    let idx = 0;
    for (let i = 1; i < n - k + 1; i++) {
        wnd += -nums[i - 1] + 2 * nums[i] - nums[i + k - 1];
        const diff = Math.abs(wnd - mid);
        if (diff <= minDiff) {
            minDiff = diff;
            idx = i;
        }
    }
    return idx;
}

const tests = [
    {
        name: "基本案例",
        input: { nums: [50, 50, 2, 3], k: 2 },
        expected: 1,
        description: "原题用例"
    },
    {
        name: "所有元素相同",
        input: { nums: [5, 5, 5, 5], k: 2 },
        expected: 2,
        description: "所有元素相同时，所有窗口结果都是0，返回最大下标2"
    },
    {
        name: "K等于1",
        input: { nums: [10, 20, 30, 40], k: 1 },
        expected: 2,
        description: "K=1时，直接取元素值，中位数是30，窗口值为10、20、30、40，最接近30的是30本身，返回下标2"
    },
    {
        name: "K等于n-1",
        input: { nums: [1, 2, 3, 4, 5], k: 4 },
        expected: 0,
        description: "K=4时，计算前4项和之差，最接近中位数3的是0（第一个窗口）"
    },
    {
        name: "升序数组",
        input: { nums: [1, 2, 3, 4, 5], k: 2 },
        expected: 3,
        description: "升序数组，中位数是3，窗口值为-1、-1、-1、-1，都与3差4，返回最大下标3"
    },
    {
        name: "降序数组",
        input: { nums: [5, 4, 3, 2, 1], k: 2 },
        expected: 3,
        description: "降序数组，中位数是3，窗口值都是3，与中位数完全相等，返回最大下标3"
    },
    {
        name: "多个相同最小差异",
        input: { nums: [10, 10, 10, 10], k: 2 },
        expected: 2,
        description: "所有窗口结果都是0，返回最大下标2"
    },
    {
        name: "负数结果",
        input: { nums: [1, 2, 100, 101], k: 2 },
        expected: 2,
        description: "中位数是100，窗口值-1、-98、-1，与100的差异分别为101、198、101，最接近的是-1，返回下标2"
    },
    {
        name: "较大K值",
        input: { nums: [1, 3, 5, 7, 9], k: 3 },
        expected: 0,
        description: "中位数是5，窗口值-7、-9、-11，与5的差异分别为12、14、16，最接近的是下标0"
    },
    {
        name: "随机混合数组",
        input: { nums: [3, 7, 2, 8, 1, 9], k: 3 },
        expected: 3,
        description: "中位数是7，窗口值-6、-3、-7、-2，与7的差异分别为13、10、14、9，最接近的是下标3"
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
        const result = calcClosestNum(input.nums, input.k);
        const success = result === expected;

        console.log(`\n测试 ${index + 1}: ${name}`);
        console.log(`描述: ${description}`);
        console.log(`输入: nums = [${input.nums}], k = ${input.k}`);
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
