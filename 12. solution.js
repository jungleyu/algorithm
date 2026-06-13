function calcLight(nums) {
    const n = nums.length;
    if (n <= 1) {
        return 0;
    }

    const maxLen = (n - 1) * 100;
    const range = [];
    
    for (let i = 0; i < n; i++) {
        if (nums[i] >= maxLen) {
            return 0;
        }
        
        const cur = i * 100;
        const left = Math.max(cur - nums[i], 0);
        const right = Math.min(cur + nums[i], maxLen);
        range.push([left, right]);
    }
    range.sort((a, b) => {
        if (a[0] === b[0]) {
            return b[1] - a[1];
        } else {
            return a[0] - b[0];
        }
    })
    let ans = 0, t = range[0][1];
    for (let i = 1; i < range.length; i++) {
        const [s, e] = range[i];
        if (s <= t) {
            t = Math.max(t, e);
        } else {
            ans += s - t;
            t = e;
        }
    }
    return ans;
}

const tests = [
    {
        name: "基本案例1",
        input: [50, 50],
        expected: 0,
        description: "两个路灯刚好覆盖全部区间"
    },
    {
        name: "基本案例2",
        input: [50, 70, 20, 70],
        expected: 20,
        description: "四个路灯，存在两个未覆盖区间"
    },
    {
        name: "完全覆盖",
        input: [100, 100, 100],
        expected: 0,
        description: "三个路灯完全覆盖，无未照明区间"
    },
    {
        name: "部分覆盖",
        input: [10, 10, 10],
        expected: 160,
        description: "三个路灯各覆盖10米，未覆盖区间[10,90]和[110,190]，总长度160"
    },
    {
        name: "单路灯",
        input: [50],
        expected: 0,
        description: "单个路灯，没有需要覆盖的区间"
    },
    {
        name: "重叠覆盖",
        input: [200, 200, 200],
        expected: 0,
        description: "路灯照明范围重叠，完全覆盖"
    },
    {
        name: "刚好接触",
        input: [100, 100],
        expected: 0,
        description: "两个路灯刚好接触覆盖"
    },
    {
        name: "照明半径极大",
        input: [10000000, 10000000],
        expected: 0,
        description: "照明半径超过最大范围"
    },
    {
        name: "边界刚好连续",
        input: [99, 99],
        expected: 0,
        description: "两个路灯覆盖范围连续，无未覆盖区间"
    },
    {
        name: "随机混合",
        input: [50, 30, 50, 30, 50],
        expected: 80,
        description: "五个路灯，存在四个未覆盖区间[50,70]、[130,150]、[250,270]、[330,350]，总长度80"
    },
    {
        name: "后方路灯覆盖前方缺口",
        input: [5, 5, 200],
        expected: 0,
        description: "第三个路灯照明范围极大，覆盖了前两个路灯之间的缺口"
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
        const result = calcLight(input);
        const success = result === expected;

        console.log(`\n测试 ${index + 1}: ${name}`);
        console.log(`描述: ${description}`);
        console.log(`输入: [${input}]`);
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