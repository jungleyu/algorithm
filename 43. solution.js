function maxConsecutiveTree(n, m, k) {
    const trees = Array(n).fill(1);
    for (const i of m) {
        trees[i - 1] = 0;
    }
    let left = 0, cntK = 0, ans = 0;
    for (let i = 0; i < n; i++) {
        cntK += 1 - trees[i];
        while (cntK > k) {
            cntK -= 1 - trees[left++];
        }
        ans = Math.max(ans, i - left + 1);
    }
    return ans;
}

function test() {
    const testCases = [
        {
            name: "示例1",
            n: 5,
            m: [2, 4],
            k: 1,
            expected: 3
        },
        {
            name: "示例2",
            n: 10,
            m: [2, 4, 7],
            k: 1,
            expected: 6
        },
        {
            name: "全部成活",
            n: 5,
            m: [],
            k: 0,
            expected: 5
        },
        {
            name: "全部死亡",
            n: 5,
            m: [1, 2, 3, 4, 5],
            k: 2,
            expected: 2
        },
        {
            name: "k等于死亡树数量",
            n: 5,
            m: [1, 3, 5],
            k: 3,
            expected: 5
        }
    ];

    let allPass = true;

    for (const tc of testCases) {
        const result = maxConsecutiveTree(tc.n, tc.m, tc.k);
        const passed = result === tc.expected;
        if (!passed) allPass = false;
        console.log(`${tc.name} 测试${passed ? "通过" : "失败"}: 期望 ${tc.expected}, 实际 ${result}`);
    }

    console.log(`\n总计: ${allPass ? "全部通过" : "有失败"}`);
}

test();

