function mergePorts(input) {
    const lines = input.trim().split('\n');
    const m = Number(lines[0]);
    if (m<1 || m>10) {
        return JSON.stringify([[]])
    }
    let group = lines.slice(1).map(i => i.split(',').map(Number));
    for(let i=0; i<m; i++) {
        const ports = group[i];
        const n = ports.length;
        if (n <1 || n>100) {
            return JSON.stringify([[]])
        }
        group[i] = [...new Set(ports)].sort((a,b) => a-b)
    }

    outer: while(true) {
        for(let i=group.length-1; i>=0; i--) {
            for(let j = i-1; j>=0; j--) {
                if (canMerge(group[i], group[j])) {
                    console.log('Merge: ', i, j)
                    group[j] = Array.from(new Set([...group[j], ...group[i]])).sort((a,b) => a-b);
                    group.splice(i, 1);
                    continue outer;
                }
            }
        }
        break;
    }
    return JSON.stringify(group)
}

function canMerge(port1, port2) {
    const n1 = port1.length, n2 = port2.length;
    if (n1 < 2 || n2 < 2) {
        return false;
    }
    let sameCount = 0;
    let i=0, j=0;
    while (i<n1 && j<n2) {
        if (port1[i] === port2[j]) {
            i++;
            j++;
            sameCount++;
            if (sameCount>=2) {
                return true;
            }
        } else if (port1[i] > port2[j]) {
            j++;
        } else {
            i++;
        }
    }
    return false;
}

function test() {
    const testCases = [
        {
            name: "示例1 - 不合并",
            input: `4
4
2,3,2
1,2
5`,
            expected: "[[4],[2,3],[1,2],[5]]"
        },
        {
            name: "示例2 - 合并两个",
            input: `3
2,3,1
4,3,2
5`,
            expected: "[[1,2,3,4],[5]]"
        },
        {
            name: "示例3 - 合并多个",
            input: `6
10
4,2,1
9
3,6,9,2
6,3,4
8`,
            expected: "[[10],[1,2,3,4,6,9],[9],[8]]"
        },
        {
            name: "示例4 - M超出范围",
            input: "11",
            expected: "[[]]"
        }
    ];

    console.log("=".repeat(60));
    console.log("端口合并测试用例");
    console.log("=".repeat(60));
    console.log();

    let passed = 0;
    let failed = 0;

    for (const tc of testCases) {
        const result = mergePorts(tc.input);
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