function monitorEnermy(input) {
    const lines = input.trim().split('\n');
    const [n,k] = lines[0].split(' ').map(Number);
    const camps = lines[1].split(' ').map(Number);
    const commands = lines.slice(2).map(line => line.split(' '));

    for(let [command, i, j] of commands) {
        i = parseInt(i, 10);
        j = parseInt(j, 10);
        if (command === 'Add') {
            camps[i-1] += j;
        } else if(command === 'Sub') {
            camps[i-1] -= j;
        } else if (command === 'Query') {
            console.log(queryMinK(i-1, j-1));
        }
    }

    function queryMinK(start, end) {
        let l=start, r=start, ans = Infinity, sum = 0;
        while(r<=end) {
            if (r-l+1 <=k) {
                sum += camps[r++];
            } else {
                ans = Math.min(ans, sum);
                sum -= camps[l++];
            } 
        }
        ans = Math.min(ans, sum);
        return ans;
    }
}

// ===== 测试辅助 =====
function test(input, expectedOutputs, name) {
    const logs = [];
    const origLog = console.log;
    console.log = msg => logs.push(msg);

    monitorEnermy(input);

    console.log = origLog;

    const ok = JSON.stringify(logs) === JSON.stringify(expectedOutputs);
    console.log(`\n测试 ${name}:`);
    console.log(`  期望输出: ${JSON.stringify(expectedOutputs)}`);
    console.log(`  实际输出: ${JSON.stringify(logs)}`);
    console.log(`  结果: ${ok ? '✅' : '❌'}`);
    return ok;
}

console.log('='.repeat(60));
console.log('敌情监控');
console.log('='.repeat(60));

let passed = 0, failed = 0;

// 1
if (test(`5 2 3
1 2 2 3 3
Query 1 3
Add 3 6
Query 2 4`, [3, 10], '1-题目示例')) passed++; else failed++;

// 2
if (test(`3 2 1
5 1 2
Query 1 3`, [3], '2-滑动窗口尾遗漏(潜在bug)')) passed++; else failed++;

// 3
if (test(`4 1 1
100 50 200 30
Query 1 4`, [30], '3-K=1找单营最小值')) passed++; else failed++;

// 4
if (test(`5 3 1
1 2 3 4 5
Query 1 3`, [6], '4-区间恰好等于K')) passed++; else failed++;

// 5
if (test(`4 2 3
10 20 30 40
Query 1 4
Sub 2 5
Query 1 4
Add 3 100
Query 1 4`, [30, 25, 25], '5-混合Add/Sub多查询')) passed++; else failed++;

// 6
if (test(`5 2 2
3 3 3 3 3
Query 1 5
Sub 3 1
Query 1 5`, [6, 5], '6-全等营地+Sub')) passed++; else failed++;

// 7
if (test(`3 3 1
10 20 30
Query 1 3`, [60], '7-K=N仅一个窗口')) passed++; else failed++;

// 8
if (test(`3 2 1
50000 50000 50000
Query 1 3`, [100000], '8-大数值边界')) passed++; else failed++;

// 9
if (test(`3 2 1
1 1 1
Add 2 100
Query 1 3`, [102], '9-Add后数值变大')) passed++; else failed++;

// 10
if (test(`3 2 1
5 5 5
Sub 2 3
Query 1 3`, [7], '10-Sub后数值变小')) passed++; else failed++;

console.log('\n' + '='.repeat(60));
console.log(`通过: ${passed}, 失败: ${failed}`);
console.log('='.repeat(60));
if (failed > 0) {
  console.log('\n⚠️  发现失败用例，请检查 queryMinK 中循环退出后是否遗漏最后一个窗口的 ans 更新');
}
