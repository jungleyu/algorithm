/**
 * @param {number} n - 弹珠数量
 * @return {string} "splits piles"
 * 感觉提干有问题, 按照示例2的书名, 分到数字 2 就不再继续拆分了.
 */
function splitMarbles(n) {
  if (n <= 2) return "0 1";
  let splits = 0;
  const stack = [n];
  while (stack.length) {
    const cur = stack.pop();
    if (cur <= 2) continue;
    splits++;
    const left = Math.floor(cur / 2);
    const right = cur - left;
    stack.push(right, left);
  }
  return `${splits} ${splits + 1}`;
}

const tests = [
  { name: '最小值 1', n: 1, expected: '0 1' },
  { name: '边界值 2（无拆分）', n: 2, expected: '0 1' },
  { name: '最小拆分 3', n: 3, expected: '1 2' },
  { name: '2 的幂 4', n: 4, expected: '1 2' },
  { name: '2³-1=7', n: 7, expected: '3 4' },
  { name: '2³=8', n: 8, expected: '3 4' },
  { name: '给定示例 11', n: 11, expected: '6 7' },
  { name: '2 的幂 16', n: 16, expected: '7 8' },
  { name: '较大偶数 1000', n: 1000, expected: '511 512' },
  { name: '最大值 131071', n: 131071, expected: '65535 65536' },
];

let passed = 0, failed = 0;
console.log('='.repeat(50));
console.log('分弹珠游戏');
console.log('='.repeat(50));
tests.forEach((t, i) => {
  const result = splitMarbles(t.n);
  const ok = result === t.expected;
  console.log(`\n测试 ${i + 1}: ${t.name}`);
  console.log(`  N = ${t.n}`);
  console.log(`  期望: ${t.expected}`);
  console.log(`  实际: ${result}`);
  console.log(`  结果: ${ok ? '✅' : '❌'}`);
  ok ? passed++ : failed++;
});
console.log('\n' + '='.repeat(50));
console.log(`通过: ${passed}, 失败: ${failed}`);
console.log('='.repeat(50));
