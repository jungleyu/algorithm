function taskPlanning(input) {
    const lines = input.trim().split('\n');
    let index = 0;
    const M = parseInt(lines[index++]);
    const results = [];
    
    for (let group = 0; group < M; group++) {
        const N = parseInt(lines[index++]);
        const machines = [];
        
        for (let i = 0; i < N; i++) {
            const [B, J] = lines[index++].split(' ').map(Number);
            machines.push({ B, J });
        }
        
        // 按执行时间 J 从大到小排序
        machines.sort((a, b) => b.J - a.J);
        
        let configTime = 0;
        let maxFinishTime = 0;
        
        for (const machine of machines) {
            configTime += machine.B;
            const finishTime = configTime + machine.J;
            maxFinishTime = Math.max(maxFinishTime, finishTime);
        }
        
        results.push(maxFinishTime);
    }
    
    return results.join('\n');
}

function test() {
    const testCases = [
        {
            input: `1
1
2 2`,
            expected: '4'
        },
        {
            input: `2
2
1 1
2 2
3
1 1
2 2
3 3`,
            expected: '4\n7'
        },
        {
            input: `1
3
5 10
3 15
2 20`,
            expected: '22'
        },
        {
            input: `1
4
1 5
2 3
3 2
4 1`,
            expected: '11'
        },
        {
            input: `1
2
10 1
1 10`,
            expected: '12'
        },
        {
            input: `1
5
1 1
2 2
3 3
4 4
5 5`,
            expected: '16'
        },
        {
            input: `2
1
5 5
2
10 1
1 10`,
            expected: '10\n12'
        },
        {
            input: `1
3
0 10
0 5
0 3`,
            expected: '10'
        },
        {
            input: `1
3
10 0
5 0
3 0`,
            expected: '18'
        },
        {
            input: `3
1
1 1
2
2 2
1 1
1
0 0`,
            expected: '2\n4\n0'
        }
    ];
    
    let passed = 0;
    let failed = 0;
    
    testCases.forEach((tc, idx) => {
        const result = taskPlanning(tc.input);
        if (result === tc.expected) {
            console.log(`Test ${idx + 1}: PASSED`);
            passed++;
        } else {
            console.log(`Test ${idx + 1}: FAILED`);
            console.log(`  Expected:\n${tc.expected.split('\n').map(l => '    ' + l).join('\n')}`);
            console.log(`  Got:\n${result.split('\n').map(l => '    ' + l).join('\n')}`);
            failed++;
        }
    });
    
    console.log(`\nTotal: ${passed} passed, ${failed} failed`);
}

test();
