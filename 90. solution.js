/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function (n) {
    let ans = '1';
    if (n === 1) {
        return ans;
    }

    let temp = '';
    for (let i = 0; i < n - 1; i++) {
        let l = 0, r = 0;
        while (r < ans.length) {
            while (ans[l] === ans[r]) {
                r++;
            }
            temp += r - l + ans[l];
            l = r;
        }
        ans = temp;
        temp = '';
    }

    return ans;
};

function runTests() {
    const testCases = [
        { n: 1, expected: "1", desc: "基本情况，n=1" },
        { n: 2, expected: "11", desc: "n=2，1个1" },
        { n: 3, expected: "21", desc: "n=3，2个1" },
        { n: 4, expected: "1211", desc: "n=4，示例验证" },
        { n: 5, expected: "111221", desc: "n=5，连续相同数字累积" },
        { n: 6, expected: "312211", desc: "n=6，多组连续数字" },
        { n: 7, expected: "13112221", desc: "n=7，混合模式" },
        { n: 8, expected: "1113213211", desc: "n=8，较长序列" },
        { n: 10, expected: "13211311123113112211", desc: "n=10，较长序列验证" },
        { n: 30, expected: countAndSay(30), desc: "n=30，最大边界值" }
    ];

    let passed = 0;
    let failed = 0;

    for (const { n, expected, desc } of testCases) {
        const result = countAndSay(n);
        const isPass = result === expected;
        if (isPass) {
            passed++;
            console.log(`✅ 测试通过 [n=${n}]: ${desc}`);
        } else {
            failed++;
            console.log(`❌ 测试失败 [n=${n}]: ${desc}`);
            console.log(`   期望: ${expected}`);
            console.log(`   实际: ${result}`);
        }
    }

    console.log(`\n测试结果: ${passed} 通过, ${failed} 失败`);
}

runTests();