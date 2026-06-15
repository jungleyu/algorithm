function findStraights(str) {
    const cardOrder = ['3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const cardToIndex = new Map();
    cardOrder.forEach((v, i) => cardToIndex.set(v, i));
    const cards = str.trim().split(' ');
    const counts = Array(12).fill(0);
    for (const card of cards) {
        if (card === '2') {
            continue;
        }
        counts[cardToIndex.get(card)]++
    }
    const n = counts.length;
    let ans = [];
    for (let i = 0; i < n; i++) {
        if (counts[i] > 0) {
            let l = i, r = i, seq = [];
            while (l < n && r < n) {
                if (counts[r] > 0) {
                    seq.push(r);
                    counts[r]--;
                    r++;
                } else if (counts[r] <= 0) {
                    if (seq.length >= 5) {
                        ans.push(seq.slice());
                    }
                    seq.length = 0;
                    r = l;
                    if (counts[l] <= 0) {
                        l++;
                        r++;
                    }
                } else if (counts[l] <= 0) {
                    l++;
                    r++;
                }
            }
            if (seq.length >= 5) {
                ans.push(seq)
            }
        }
    }
    if (ans.length <= 0) {
        return 'No'
    }

    return ans.map(card => card.map(v => cardOrder[v]))
}

const tests = [
    { name: "原题示例1", input: "2 9 J 2 3 4 K A 7 9 A 5 6", expected: [["3", "4", "5", "6", "7"]], desc: "单顺子" },
    { name: "原题示例2", input: "2 9 J 10 3 4 K A 7 Q A 5 6", expected: [["3", "4", "5", "6", "7"], ["9", "10", "J", "Q", "K", "A"]], desc: "两组顺子" },
    { name: "原题示例3", input: "2 9 9 9 3 4 K A 10 Q A 5 6", expected: "No", desc: "无法组成" },
    { name: "全是2", input: "2 2 2 2 2 2 2 2 2 2 2 2 2", expected: "No", desc: "边界" },
    { name: "单顺子", input: "3 4 5 6 7 8 9 2 2 2 2 2 2", expected: [["3", "4", "5", "6", "7", "8", "9"]], desc: "7张顺子" },
    { name: "无顺子", input: "3 5 7 9 J K A 2 2 2 2 2 2", expected: "No", desc: "离散" },
    { name: "重复顺子", input: "3 3 4 4 5 5 6 6 7 7 8 8 8", expected: [["3", "4", "5", "6", "7", "8"], ["3", "4", "5", "6", "7", "8"]], desc: "两组重复顺子" },
    { name: "4张连续", input: "3 4 5 6 2 2 2 2 2 2 2 2 2", expected: "No", desc: "不满足" },
    { name: "三组顺子", input: "3 4 5 6 7 9 10 J Q K A 2 2 2", expected: [["3", "4", "5", "6", "7"], ["9", "10", "J", "Q", "K", "A"]], desc: "多组" },
    { name: "最长顺子", input: "3 4 5 6 7 8 9 10 J Q K A 2", expected: [["3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]], desc: "12张" }
];

let passed = 0, failed = 0;
console.log("斗地主之顺子 - 测试\n" + "=".repeat(50));

tests.forEach((t, i) => {
    const result = findStraights(t.input);
    const success = JSON.stringify(result) === JSON.stringify(t.expected);
    console.log(`\n${i + 1}. ${t.name} [${t.desc}]`);
    console.log(`输入: ${t.input}`);
    console.log(`期望: ${JSON.stringify(t.expected)}`);
    console.log(`实际: ${JSON.stringify(result)}`);
    console.log(`结果: ${success ? '✅' : '❌'}`);
    success ? passed++ : failed++;
});

console.log("\n" + "=".repeat(50));
console.log(`总计: ${passed} 通过, ${failed} 失败`);
