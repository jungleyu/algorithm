function getSports(input) {
    const lines = input.split('\n');
    const [n, t, k] = lines[0].split(' ').map(Number);
    const calories = lines[1].split(' ').map(Number);
    const ans = [];
    function dfs(index, target, path) {
        if (path.length === k) {
            if (target === 0) {
                ans.push(path.slice())
            }
            return;
        }

        for(let i=index; i<n; i++) {
            const remain = target - calories[i];
            path.push(calories[i]);
            dfs(i+1, remain, path);
            path.pop();
        }
    }

    dfs(0, t, []);
    return ans.length
}

function runTest(input, expected, name) {
    const result = getSports(input);
    const ok = result === expected;
    console.log(`\n测试 ${name}:`);
    console.log(`  输入: ${input.replace(/\n/g, ' | ')}`);
    console.log(`  期望: ${expected}`);
    console.log(`  实际: ${result}`);
    console.log(`  结果: ${ok ? '✅' : '❌'}`);
    return ok;
}

console.log('='.repeat(60));
console.log('小明减肥');
console.log('='.repeat(60));

let passed = 0, failed = 0;

// 1
if (runTest(`5 6 3
1 2 3 4 5`, 1, '1-示例1')) passed++; else failed++;

// 2
if (runTest(`7 7 3
0 1 2 3 4 5 6`, 4, '2-示例2')) passed++; else failed++;

// 3
if (runTest(`3 0 0
1 2 3`, 1, '3-K=0,T=0')) passed++; else failed++;

// 4
if (runTest(`3 5 0
1 2 3`, 0, '4-K=0,T>0')) passed++; else failed++;

// 5
if (runTest(`4 10 2
1 2 3 4`, 0, '5-无解')) passed++; else failed++;

// 6
if (runTest(`3 5 5
1 2 3`, 0, '6-K>n')) passed++; else failed++;

// 7
if (runTest(`4 5 3
0 0 1 4`, 2, '7-含0值组合')) passed++; else failed++;

// 8
if (runTest(`4 0 2
0 0 1 2`, 1, '8-T=0选2个0')) passed++; else failed++;

// 9
if (runTest(`3 6 3
1 2 3`, 1, '9-K=n恰好全选')) passed++; else failed++;

// 10
if (runTest(`5 5 1
1 2 3 4 5`, 1, '10-K=1')) passed++; else failed++;

console.log('\n' + '='.repeat(60));
console.log(`通过: ${passed}, 失败: ${failed}`);
console.log('='.repeat(60));
if (failed > 0) {
  console.log('\n⚠️  发现问题:');
  const tests = [
    '1-示例1', '2-示例2', '3-K=0,T=0', '4-K=0,T>0',
    '5-无解', '6-K>n', '7-含0值组合', '8-T=0选2个0',
    '9-K=n恰好全选', '10-K=1'
  ];
  // lazy eval: just re-run failing ones
}
