function findBestSequence(targetFloor, sequence) {
    let bestFloor = -Infinity;
    let bestSequence = [];
    let foundExact = false;

    function permute(arr, start) {
        if (start === arr.length) {
            const result = calculateFloor(arr);
            if (result === targetFloor) {
                foundExact = true;
                if (isLargerFirst(arr, bestSequence)) {
                    bestSequence = [...arr];
                }
            } else if (!foundExact && result < targetFloor && result > bestFloor) {
                bestFloor = result;
                bestSequence = [...arr];
            } else if (!foundExact && result === bestFloor) {
                if (isLargerFirst(arr, bestSequence)) {
                    bestSequence = [...arr];
                }
            }
            return;
        }

        const used = new Set();
        const sortedIndices = [];
        for (let i = start; i < arr.length; i++) {
            if (!used.has(arr[i])) {
                used.add(arr[i]);
                sortedIndices.push(i);
            }
        }

        sortedIndices.sort((a, b) => arr[b] - arr[a]);

        for (const i of sortedIndices) {
            [arr[start], arr[i]] = [arr[i], arr[start]];
            permute(arr, start + 1);
            [arr[start], arr[i]] = [arr[i], arr[start]];
        }
    }

    function calculateFloor(arr) {
        let floor = 0;
        let direction = 1;
        for (const num of arr) {
            floor += direction * num;
            direction *= -1;
        }
        return floor;
    }

    function isLargerFirst(a, b) {
        if (b.length === 0) return true;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                return a[i] > b[i];
            }
        }
        return false;
    }

    permute(sequence, 0);
    return bestSequence;
}

function solve(input) {
    const lines = input.trim().split('\n');
    const [targetFloor, n] = lines[0].split(' ').map(Number);
    const sequence = lines[1].split(' ').map(Number);
    const result = findBestSequence(targetFloor, sequence);
    return result.join(' ');
}

function test() {
    const testCases = [
        {
            input: `5 3
1 2 6`,
            expected: '6 2 1',
            description: '示例输入，6-2+1=5刚好到达'
        },
        {
            input: `10 4
1 2 3 8`,
            expected: '8 2 3 1',
            description: '8-2+3-1=8最接近10'
        },
        {
            input: `7 3
3 4 5`,
            expected: '5 3 4',
            description: '5-3+4=6最接近7'
        },
        {
            input: `1 1
1`,
            expected: '1',
            description: '单元素序列，向上1层'
        },
        {
            input: `0 2
5 5`,
            expected: '5 5',
            description: '5-5=0刚好到达'
        },
        {
            input: `9 3
4 5 6`,
            expected: '6 4 5',
            description: '6-4+5=7最接近9'
        },
        {
            input: `6 3
2 2 2`,
            expected: '2 2 2',
            description: '2-2+2=2最接近6'
        },
        {
            input: `15 5
1 3 5 7 9`,
            expected: '9 5 7 1 3',
            description: '9-5+7-1+3=13最接近15'
        },
        {
            input: `4 3
1 1 6`,
            expected: '1 6 1',
            description: '1-6+1=-4，所有组合都超过或小于4'
        },
        {
            input: `8 4
2 3 5 8`,
            expected: '8 5 3 2',
            description: '8-5+3-2=4最接近8'
        }
    ];

    console.log('测试用例执行结果：');
    console.log('='.repeat(60));
    
    let passed = 0;
    let failed = 0;

    for (let i = 0; i < testCases.length; i++) {
        const tc = testCases[i];
        const actual = solve(tc.input);
        const status = actual === tc.expected ? '通过' : '失败';
        
        if (status === '通过') {
            passed++;
        } else {
            failed++;
        }

        console.log(`测试用例 ${i + 1}: ${tc.description}`);
        console.log(`输入:\n${tc.input}`);
        console.log(`期望输出: ${tc.expected}`);
        console.log(`实际输出: ${actual}`);
        console.log(`计算结果: ${calculateFloor(actual.split(' ').map(Number))}`);
        console.log(`状态: ${status}`);
        console.log('-'.repeat(60));
    }

    console.log(`\n测试结果: 共 ${testCases.length} 个测试用例，通过 ${passed} 个，失败 ${failed} 个`);
}

function calculateFloor(arr) {
    let floor = 0;
    let direction = 1;
    for (const num of arr) {
        floor += direction * num;
        direction *= -1;
    }
    return floor;
}

test();