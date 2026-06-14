function calcScore(input) {
    const lines = input.trim().split('\n');
    const [m, n] = lines[0].split(',').map(Number);
    if (m < 3 || m > 10 || n < 3 || n > 100) {
        return -1;
    }
    
    const scores = lines.slice(1).map(line => line.split(',').map(Number));
    
    const players = [];
    for (let j = 0; j < n; j++) {
        const counts = new Array(11).fill(0);
        let total = 0;
        
        for (let i = 0; i < m; i++) {
            const score = scores[i][j];
            
            if (score < 1 || score > 10) {
                return -1;
            }
            
            counts[score]++;
            total += score;
        }
        
        players.push({ id: j, total, counts });
    }
    
    players.sort((a, b) => {
        if (b.total !== a.total) {
            return b.total - a.total;
        }
        for (let i = 10; i >= 1; i--) {
            if (b.counts[i] !== a.counts[i]) {
                return b.counts[i] - a.counts[i];
            }
        }
        return a.id - b.id;
    });
    
    return players.slice(0, 3).map(p => p.id + 1).join(',');
}

function test() {
    const testCases = [
        {
            name: "示例1 - 正常情况",
            input: `4,5
10,6,9,7,6
9,10,6,7,5
8,10,6,5,10
9,10,8,4,9`,
            expected: "2,1,5"
        },
        {
            name: "示例2 - 评委数不足",
            input: `2,5
7,3,5,4,2
8,5,4,4,3`,
            expected: -1
        },
        {
            name: "示例3 - 选手数不足",
            input: `4,2
8,5
5,6
10,4
8,9`,
            expected: -1
        },
        {
            name: "示例4 - 无效分数(超过10)",
            input: `4,5
11,6,9,7,8
9,10,6,7,8
8,10,6,9,7
9,10,8,6,7`,
            expected: -1
        },
        {
            name: "总分相同但高分值数量不同",
            input: `3,3
10,10,9
10,9,9
9,9,9`,
            expected: "1,2,3"
        },
        {
            name: "刚好3个选手",
            input: `3,3
10,9,8
9,8,7
8,7,6`,
            expected: "1,2,3"
        },
        {
            name: "刚好3个评委",
            input: `3,5
10,9,8,7,6
9,8,7,6,5
8,7,6,5,4`,
            expected: "1,2,3"
        },
        {
            name: "无效分数(低于1)",
            input: `3,3
0,5,6
5,4,3
4,3,2`,
            expected: -1
        },
        {
            name: "评委数超过上限",
            input: `11,5
10,9,8,7,6
9,8,7,6,5
8,7,6,5,4
7,6,5,4,3
6,5,4,3,2
5,4,3,2,1
4,3,2,1,10
3,2,1,10,9
2,1,10,9,8
1,10,9,8,7
10,9,8,7,6`,
            expected: -1
        },
        {
            name: "边界值测试(3评委,3选手)",
            input: `3,3
1,2,3
2,3,1
3,1,2`,
            expected: "1,2,3"
        },
        {
            name: "所有选手总分相同",
            input: `3,3
5,6,7
6,5,4
4,4,4`,
            expected: "3,1,2"
        },
        {
            name: "最大范围测试",
            input: `3,5
10,10,9,9,8
10,9,10,8,9
9,10,9,10,8`,
            expected: "1,2,3"
        }
    ];

    console.log("=".repeat(60));
    console.log("比赛评分测试用例（最终优化版）");
    console.log("=".repeat(60));
    console.log();

    let passed = 0;
    let failed = 0;

    for (const tc of testCases) {
        const result = calcScore(tc.input);
        const expected = tc.expected;
        const isPassed = result === expected;

        if (isPassed) {
            passed++;
            console.log(`✅ ${tc.name}`);
        } else {
            failed++;
            console.log(`❌ ${tc.name}`);
        }
        console.log(`   输出: "${result}"`);
        console.log(`   预期: "${expected}"`);
        console.log();
    }

    console.log("=".repeat(60));
    console.log(`测试结果: ${passed} 通过, ${failed} 失败`);
    console.log("=".repeat(60));
}

test();