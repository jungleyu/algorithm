function sortProducts(k, n, orders, products) {
  return products.sort((a, b) => {
    for (let i = 0; i < k; i++) {
      if (a[i] !== b[i]) {
        return orders[i] === 1 ? b[i] - a[i] : a[i] - b[i];
      }
    }
    return 0;
  });
}

function runTest(k, n, orders, products, expected, name) {
  const result = sortProducts(k, n, orders, products.map(p => [...p]));
  const ok = JSON.stringify(result) === JSON.stringify(expected);
  console.log(`\n测试 ${name}:`);
  console.log(`  输入: k=${k}, n=${n}, orders=[${orders}]`);
  console.log(`  期望: ${JSON.stringify(expected)}`);
  console.log(`  实际: ${JSON.stringify(result)}`);
  console.log(`  结果: ${ok ? '✅' : '❌'}`);
  return ok;
}

console.log('='.repeat(60));
console.log('商品推荐多属性排序');
console.log('='.repeat(60));

let passed = 0, failed = 0;

// 测试1: 题目示例（修正第一行应为 3 4）
if (runTest(3, 4, [1, -1, 1], [
  [2, 2, 2],
  [2, 3, 3],
  [4, 4, 4],
  [4, 4, 5]
], [
  [4, 4, 5],
  [4, 4, 4],
  [2, 2, 2],
  [2, 3, 3]
], '1-题目示例')) passed++; else failed++;

// 测试2: 单一商品
if (runTest(2, 1, [1, -1], [[5, 3]], [[5, 3]], '2-单一商品')) passed++; else failed++;

// 测试3: 全部降序
if (runTest(2, 3, [1, 1], [
  [1, 10],
  [2, 5],
  [2, 8]
], [
  [2, 8],
  [2, 5],
  [1, 10]
], '3-全部降序')) passed++; else failed++;

// 测试4: 全部升序
if (runTest(2, 3, [-1, -1], [
  [3, 1],
  [1, 2],
  [3, 0]
], [
  [1, 2],
  [3, 0],
  [3, 1]
], '4-全部升序')) passed++; else failed++;

// 测试5: 所有属性完全相同
if (runTest(3, 3, [1, -1, 1], [
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3]
], [
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3]
], '5-所有属性完全相同')) passed++; else failed++;

// 测试6: 单属性排序
if (runTest(1, 5, [-1], [
  [9], [3], [7], [1], [5]
], [
  [1], [3], [5], [7], [9]
], '6-单属性升序')) passed++; else failed++;

// 测试7: 复杂多属性 - k=5 mixed
if (runTest(5, 4, [1, -1, 1, -1, 1], [
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 6],
  [1, 2, 4, 4, 5],
  [1, 3, 3, 4, 5]
], [
  [1, 2, 4, 4, 5],
  [1, 2, 3, 4, 6],
  [1, 2, 3, 4, 5],
  [1, 3, 3, 4, 5]
], '7-复杂多属性k=5')) passed++; else failed++;

// 测试8: 负数值
if (runTest(2, 3, [1, -1], [
  [-1, -2],
  [0, 0],
  [-2, -1]
], [
  [0, 0],
  [-1, -2],
  [-2, -1]
], '8-包含负数')) passed++; else failed++;

// 测试9: 大规模随机排序稳定性校验（属性值少，大量并列）
if (runTest(2, 6, [-1, 1], [
  [1, 1],
  [1, 0],
  [1, 1],
  [0, 2],
  [0, 1],
  [1, 0]
], [
  [0, 2],
  [0, 1],
  [1, 1],
  [1, 1],
  [1, 0],
  [1, 0]
], '9-多并列+升序降序混合')) passed++; else failed++;

// 测试10: 仅一个属性，降序
if (runTest(1, 5, [1], [
  [1], [5], [3], [5], [2]
], [
  [5], [5], [3], [2], [1]
], '10-单属性降序')) passed++; else failed++;

console.log('\n' + '='.repeat(60));
console.log(`通过: ${passed}, 失败: ${failed}`);
console.log('='.repeat(60));
