function badRecords(input) {
    const lines = input.trim().split('\n');
    const n = parseInt(lines[0]);
    const records = [];

    for (let i = 1; i <= n; i++) {
        const parts = lines[i].split(',');
        records.push({
            id: parts[0],
            time: parseInt(parts[1]),
            distance: parseInt(parts[2]),
            actualDevice: parts[3],
            registeredDevice: parts[4],
            index: i - 1
        });
    }

    const isAbnormal = new Array(n).fill(false);
    const employeeRecords = new Map();

    for (let i = 0; i < n; i++) {
        const curr = records[i];

        if (curr.actualDevice !== curr.registeredDevice) {
            isAbnormal[i] = true;
        }

        if (!employeeRecords.has(curr.id)) {
            employeeRecords.set(curr.id, []);
        }

        const prevRecords = employeeRecords.get(curr.id);
        
        for (const prev of prevRecords) {
            const timeDiff = curr.time - prev.time;
            if (timeDiff >= 60) {
                continue;
            }
            const distanceDiff = Math.abs(curr.distance - prev.distance);
            if (distanceDiff > 5) {
                isAbnormal[i] = true;
                isAbnormal[prev.index] = true;
            }
        }

        employeeRecords.get(curr.id).push(curr);
    }

    const abnormalRecords = [];
    for (let i = 0; i < n; i++) {
        if (isAbnormal[i]) {
            const r = records[i];
            abnormalRecords.push(`${r.id},${r.time},${r.distance},${r.actualDevice},${r.registeredDevice}`);
        }
    }

    return abnormalRecords.length === 0 ? 'null' : abnormalRecords.join(';');
}

function test() {
    const testCases = [
        {
            name: "示例1",
            input: `2
100000,10,1,ABCD,ABCD
100000,50,10,ABCD,ABCD`,
            expected: "100000,10,1,ABCD,ABCD;100000,50,10,ABCD,ABCD"
        },
        {
            name: "示例2",
            input: `2
100000,10,1,ABCD,ABCD
100001,80,10,ABCE,ABCE`,
            expected: "null"
        },
        {
            name: "示例3",
            input: `2
100000,10,1,ABCD,ABCD
100000,80,10,ABCE,ABCD`,
            expected: "100000,80,10,ABCE,ABCD"
        },
        {
            name: "时间超过60分钟",
            input: `2
100000,10,1,ABCD,ABCD
100000,80,10,ABCD,ABCD`,
            expected: "null"
        },
        {
            name: "多记录测试",
            input: `3
100000,10,1,ABCD,ABCD
100000,30,6,ABCD,ABCD
100000,50,12,ABCD,ABCD`,
            expected: "100000,10,1,ABCD,ABCD;100000,30,6,ABCD,ABCD;100000,50,12,ABCD,ABCD"
        }
    ];

    for (const tc of testCases) {
        const result = badRecords(tc.input);
        const passed = result === tc.expected;
        console.log(`${tc.name} ${passed ? "通过" : "失败"}: 期望 ${tc.expected}, 实际 ${result}`);
    }
}

test();