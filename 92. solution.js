var partitionLabels = function (s) {
    const n = s.length;
    const last = Array(26);
    for (let i = 0; i < n; i++) {
        last[s.charCodeAt(i) - 'a'.charCodeAt(0)] = i;
    }

    const ans = [];
    let start = 0, end = 0;
    for (let i = 0; i < n; i++) {
        end = Math.max(end, last[s.charCodeAt(i) - 'a'.charCodeAt(0)]);
        if (end === i) {
            ans.push(end - start + 1);
            start = end + 1;
        }
    }
    return ans;
};

function runTests() {
    const testCases = [
        { s: "ababcbacadefegdehijhklij", expected: [9, 7, 8], desc: "示例1：多段划分" },
        { s: "eccbbbbdec", expected: [10], desc: "示例2：整个字符串为一段" },
        { s: "a", expected: [1], desc: "单个字符" },
        { s: "aa", expected: [2], desc: "相同字符" },
        { s: "ab", expected: [1, 1], desc: "不同字符各一段" },
        { s: "ababcc", expected: [4, 2], desc: "交替字符划分" },
        { s: "abcde", expected: [1, 1, 1, 1, 1], desc: "所有字符都不同" },
        { s: "aaaaa", expected: [5], desc: "所有字符相同" },
        { s: "abac", expected: [3, 1], desc: "首尾相同中间不同" },
        { s: "abcdabc", expected: [7], desc: "首尾部分字符相同" },
        { s: "abba", expected: [4], desc: "对称字符串" },
        { s: "abcbad", expected: [5, 1], desc: "字符交叉出现" }
    ];

    let passed = 0;
    let failed = 0;

    for (const { s, expected, desc } of testCases) {
        const result = partitionLabels(s);
        const isPass = JSON.stringify(result) === JSON.stringify(expected);
        if (isPass) {
            passed++;
            console.log(`✅ 测试通过 ["${s}"]: ${desc}`);
        } else {
            failed++;
            console.log(`❌ 测试失败 ["${s}"]: ${desc}`);
            console.log(`   期望: ${expected}`);
            console.log(`   实际: ${result}`);
        }
    }

    console.log(`\n测试结果: ${passed} 通过, ${failed} 失败`);
}

runTests();