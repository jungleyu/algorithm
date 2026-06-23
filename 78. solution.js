function totalFee(input) {
    const lines = input.trim().split('\n');
    let i = 0;
    let n = parseInt(lines[i++], 10);

    const monthly = new Set();
    while (n-- > 0) monthly.add(lines[i++]);

    const excludeStart = 11 * 60 + 30;
    const excludeEnd = 13 * 60 + 30;
    const halfHour = 30;
    const dailyCap = 15;

    const cars = {};

    while (i < lines.length) {
        const [timeStr, card, action] = lines[i++].split(' ');
        if (monthly.has(card)) continue;

        const [h, m] = timeStr.split(':').map(Number);
        const curMin = h * 60 + m;

        if (!cars[card]) cars[card] = { totalMin: 0, enterMin: null };
        const data = cars[card];

        if (action === 'enter') {
            data.enterMin = curMin;
        } else {
            if (data.enterMin !== null) {
                let sessionMin = curMin - data.enterMin;
                if (curMin > excludeStart && data.enterMin < excludeEnd) {
                    const overlap = Math.min(curMin, excludeEnd) - Math.max(data.enterMin, excludeStart);
                    sessionMin -= overlap;
                }
                data.totalMin += Math.max(0, sessionMin);
                data.enterMin = null;
            }
        }
    }

    let total = 0;
    for (const card in cars) {
        const min = cars[card].totalMin;
        if (min < halfHour) continue;
        total += Math.ceil(min / halfHour);
    }

    return Math.min(total, dailyCap);
}

function runTest(input, expected, name) {
    const result = totalFee(input);
    const ok = result === expected;
    console.log(`\n测试 ${name}:`);
    console.log(`  期望: ${expected}`);
    console.log(`  实际: ${result}`);
    console.log(`  结果: ${ok ? '✅' : '❌'}`);
    return ok;
}

console.log('='.repeat(60));
console.log('停车场收入统计 - 正确方案');
console.log('='.repeat(60));

let passed = 0, failed = 0;

// 1
if (runTest(`1
A12345
01:28 A12345 enter
01:59 A12345 leave`, 0, '1-包月不计费')) passed++; else failed++;

// 2
if (runTest(`0
08:00 A12346 enter
11:20 A12345 enter
11:30 A12346 leave
12:00 A12345 leave`, 7, '2-示例2')) passed++; else failed++;

// 3
if (runTest(`0
10:00 A12345 enter
10:25 A12345 leave`, 0, '3-小于30分钟免费')) passed++; else failed++;

// 4
if (runTest(`0
14:00 A12345 enter
14:30 A12345 leave`, 1, '4-恰好30分钟')) passed++; else failed++;

// 5
if (runTest(`0
08:00 A12345 enter
15:00 A12345 leave`, 10, '5-跨排除时段(进前离后)')) passed++; else failed++;

// 6
if (runTest(`0
12:00 A12345 enter
14:00 A12345 leave`, 1, '6-排除时段内进,之后离')) passed++; else failed++;

// 7
if (runTest(`0
00:00 A12345 enter
23:59 A12345 leave`, 15, '7-封顶15元')) passed++; else failed++;

// 8
if (runTest(`0
08:00 A12345 enter
13:30 A12345 leave`, 7, '8-离开恰好在13:30边界')) passed++; else failed++;

// 9
if (runTest(`0
10:00 A12345 enter
10:20 A12345 leave`, 0, '9-不足半小时仍免费')) passed++; else failed++;

// 10
if (runTest(`1
B9999
08:00 A11111 enter
09:00 B9999 enter
17:30 B9999 leave
18:30 A11111 leave`, 15, '10-包月+非包月混合')) passed++; else failed++;

console.log('\n' + '='.repeat(60));
console.log(`通过: ${passed}, 失败: ${failed}`);
console.log('='.repeat(60));
