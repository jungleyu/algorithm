function checkAttendance(input) {
    const lines = input.trim().split('\n');
    const n = parseInt(lines[0]);
    const results = [];

    for (let i = 1; i <= n; i++) {
        const records = lines[i].split(' ');
        results.push(checkOne(records) ? 'true' : 'false');
    }

    return results.join(' ');
}

function checkOne(records) {
    let absentCount = 0;
    let prevBad = false; //前一天是否 迟到/早退
    const badQueue = [];

    for (let i = 0; i < records.length; i++) {
        const record = records[i];
        const isBad = record !== 'present';

        // 条件1：缺勤不超过一次
        if (record === 'absent') {
            absentCount++;
            if (absentCount > 1) {
                return false;
            }
        }

        // 条件2：没有连续的迟到/早退
        if (isBad && record !== 'absent') {
            if (prevBad) {
                return false;
            }
            prevBad = true;
        } else {
            prevBad = false;
        }

        // 条件3：任意连续7次考勤，缺勤/迟到/早退不超过3次
        if (isBad) {
            badQueue.push(i);
        }

        // 维护窗口大小为7
        while (badQueue.length > 0 && i - badQueue[0] >= 7) {
            badQueue.shift();
        }

        if (badQueue.length > 3) {
            return false;
        }
    }

    return true;
}

function test() {
    const testCases = [
        {
            input: `2
present
present present`,
            expected: 'true true'
        },
        {
            input: `2
present
present absent present present leaveearly present absent`,
            expected: 'true false'
        },
        {
            input: `1
late late`,
            expected: 'false'
        },
        {
            input: `1
absent present absent`,
            expected: 'false'
        },
        {
            input: `1
late present late present late present late`,
            expected: 'false'
        }
    ];

    let allPass = true;

    for (const tc of testCases) {
        const result = checkAttendance(tc.input);
        const status = result === tc.expected ? "通过" : "失败";
        if (status === "失败") allPass = false;
        console.log(`测试${status}: 期望 "${tc.expected}", 实际 "${result}"`);
    }

    console.log(`\n总计: ${allPass ? "全部通过" : "有失败"}`);
}

test();