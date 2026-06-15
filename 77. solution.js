function generatePO(prs) {
  const valid = prs.filter(pr => pr.status === 0);
  const result = [];
  const mergeMap = new Map();

  for (const { id, qty, price } of valid) {
    if (price > 100) {
      result.push({ id, qty, price });
    } else {
      if (!mergeMap.has(id)) {
        mergeMap.set(id, { totalQty: 0, unitPrice: price });
      }
      const entry = mergeMap.get(id);
      entry.totalQty += qty;
    }
  }

  for (const [id, { totalQty, unitPrice }] of mergeMap) {
    let finalPrice = unitPrice;
    if (unitPrice < 100 && totalQty >= 100) {
      finalPrice = Math.ceil(unitPrice * 0.9);
    }
    result.push({ id, qty: totalQty, price: finalPrice });
  }

  result.sort((a, b) => {
    if (a.id !== b.id) return a.id - b.id;
    return b.qty - a.qty;
  });

  return result;
}

function formatOutput(pos) {
  return pos.map(p => `${p.id} ${p.qty} ${p.price}`).join('\n');
}

function runTest(prs, expected, name) {
  const result = generatePO(prs);
  const out = formatOutput(result);
  const expOut = expected.join('\n');
  const ok = out === expOut;
  console.log(`\n测试 ${name}:`);
  console.log(`  期望:\n${expOut}`);
  console.log(`  实际:\n${out}`);
  console.log(`  结果: ${ok ? '✅' : '❌'}`);
  return ok;
}

console.log('='.repeat(60));
console.log('采购订单 (PO)');
console.log('='.repeat(60));

let passed = 0, failed = 0;

// 测试1: 样例1 — 单价<100且数量≥100触达折扣
if (runTest(
  [
    { id: 1, qty: 200, price: 90, status: 0 },
    { id: 2, qty: 30, price: 101, status: 0 }
  ],
  ['1 200 81', '2 30 101'],
  '1-样例1折扣+不合并'
)) passed++; else failed++;

// 测试2: 样例2 — 相同商品合并，总数量<100不打折
if (runTest(
  [
    { id: 1, qty: 10, price: 90, status: 0 },
    { id: 1, qty: 5, price: 90, status: 0 },
    { id: 2, qty: 8, price: 120, status: 0 }
  ],
  ['1 15 90', '2 8 120'],
  '2-样例2合并不打折'
)) passed++; else failed++;

// 测试3: 样例3 — 状态非0被忽略
if (runTest(
  [
    { id: 1, qty: 5, price: 80, status: 0 },
    { id: 2, qty: 3, price: 120, status: 0 },
    { id: 3, qty: 2, price: 90, status: 1 },
    { id: 4, qty: 10, price: 150, status: 2 }
  ],
  ['1 5 80', '2 3 120'],
  '3-样例3状态过滤'
)) passed++; else failed++;

// 测试4: 全部单价>100，各自独立不合并
if (runTest(
  [
    { id: 1, qty: 10, price: 200, status: 0 },
    { id: 2, qty: 20, price: 150, status: 0 },
    { id: 1, qty: 5, price: 180, status: 0 }
  ],
  ['1 10 200', '1 5 180', '2 20 150'],
  '4-全部单价>100各自独立'
)) passed++; else failed++;

// 测试5: 合并且总数量≥100触发折扣
if (runTest(
  [
    { id: 10, qty: 60, price: 95, status: 0 },
    { id: 10, qty: 50, price: 95, status: 0 }
  ],
  ['10 110 86'],
  '5-合并触发折扣'
)) passed++; else failed++;

// 测试6: 单价=100，合并但无折扣（仅<100打折）
if (runTest(
  [
    { id: 5, qty: 60, price: 100, status: 0 },
    { id: 5, qty: 60, price: 100, status: 0 }
  ],
  ['5 120 100'],
  '6-单价=100合并无折扣'
)) passed++; else failed++;

// 测试7: 所有PR均被拒绝，无输出
if (runTest(
  [
    { id: 1, qty: 10, price: 90, status: 1 },
    { id: 2, qty: 20, price: 120, status: 2 }
  ],
  [],
  '7-全被拒绝无输出'
)) passed++; else failed++;

// 测试8: 混合场景：同商品ID既有>100又≤100
if (runTest(
  [
    { id: 1, qty: 30, price: 80, status: 0 },
    { id: 2, qty: 40, price: 110, status: 0 },
    { id: 2, qty: 25, price: 110, status: 0 },
    { id: 1, qty: 20, price: 80, status: 0 }
  ],
  ['1 50 80', '2 40 110', '2 25 110'],
  '8-同商品ID混合单价'
)) passed++; else failed++;

// 测试9: 合并总数量≥100但price<100触发折扣（向上取整验证）
if (runTest(
  [
    { id: 9, qty: 100, price: 99, status: 0 },
    { id: 9, qty: 100, price: 99, status: 0 }
  ],
  ['9 200 90'],
  '9-折扣向上取整验证'
)) passed++; else failed++;

// 测试10: 多条记录，按ID升序+同ID按数量降序
if (runTest(
  [
    { id: 3, qty: 10, price: 150, status: 0 },
    { id: 1, qty: 5, price: 120, status: 0 },
    { id: 3, qty: 20, price: 150, status: 0 },
    { id: 1, qty: 8, price: 120, status: 0 }
  ],
  ['1 8 120', '1 5 120', '3 20 150', '3 10 150'],
  '10-ID升序+同ID数量降序'
)) passed++; else failed++;

console.log('\n' + '='.repeat(60));
console.log(`通过: ${passed}, 失败: ${failed}`);
console.log('='.repeat(60));
