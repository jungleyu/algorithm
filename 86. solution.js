function solve(input) {
    const lines = input.trim().split('\n');
    const dam = lines[1].split(',').map(Number);
    const wood = lines[3].split(',').map(Number);

    const k = dam[0];
    const gaps = [];
    for (let i = 1; i < dam.length - 1; i++) {
        if (k > dam[i]) gaps.push(k - dam[i]);
    }
    gaps.sort((a, b) => b - a);

    const woodCnt = new Array(16).fill(0);
    for (const w of wood) {
        if (w >= 1 && w <= 15) woodCnt[w]++;
    }

    let totalWood = 0;

    for (const gap of gaps) {
        let filled = false;

        for (let h = gap; h <= 15; h++) {
            if (woodCnt[h] > 0) {
                woodCnt[h]--;
                totalWood += h;
                filled = true;
                break;
            }
        }

        if (!filled) {
            for (let h = 15; h >= 1; h--) {
                if (woodCnt[h] > 0) {
                    woodCnt[h]--;
                    totalWood += h;
                    break;
                }
            }
        }
    }

    return totalWood;
}

function runTests() {
    const testCases = [
        {
            input: `3
8,0,8
2
7,6`,
            expected: 7,
            description: '示例1：单个溃口，选最小填满的木材'
        },
        {
            input: `5
10,3,0,2,10
6
4,8,6,4,5,6`,
            expected: 20,
            description: '示例2：3溃口6木材'
        },
        {
            input: `5
10,3,0,2,10
7
4,13,6,12,5,8,10`,
            expected: 30,
            description: '示例3：3溃口7木材，填满优先'
        },
        {
            input: `3
7,4,7
4
4,3,2,1`,
            expected: 3,
            description: '单个溃口，有刚好填满的木材（选最小耗材）'
        },
        {
            input: `3
5,2,5
3
6,7,8`,
            expected: 6,
            description: '木材全部大于溃口，选最小的'
        },
        {
            input: `4
12,5,8,12
5
3,3,4,4,5`,
            expected: 9,
            description: '2溃口5木材，大溃口优先'
        },
        {
            input: `4
15,10,10,15
4
6,6,6,6`,
            expected: 12,
            description: '2溃口等宽，各用1根6'
        },
        {
            input: `3
10,7,10
4
2,2,2,2`,
            expected: 2,
            description: '溃口较高但木材很小，取最大木材尽可能填补'
        },
        {
            input: `4
8,0,7,8
4
1,1,1,1`,
            expected: 2,
            description: '2溃口高度不同，木材很小只用最大木材'
        },
        {
            input: `4
10,0,9,10
3
5,5,5`,
            expected: 10,
            description: '2溃口(10,1)，木材全5，填大溃口'
        }
    ];

    let passed = 0;
    let failed = 0;

    testCases.forEach((test, index) => {
        const result = solve(test.input);
        const success = result === test.expected;

        if (success) {
            passed++;
            console.log(`\u2713 测试 ${index + 1}: ${test.description}`);
        } else {
            failed++;
            console.log(`\u2717 测试 ${index + 1}: ${test.description}`);
            console.log(`  期望: ${test.expected}`);
            console.log(`  实际: ${result}`);
        }
    });

    console.log(`\n测试结果: ${passed}/${testCases.length} 通过`);
}

runTests();
