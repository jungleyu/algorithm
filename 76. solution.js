function matchIMSI(rules, queries) {
  const result = [];
  for (const query of queries) {
    let bestIdx = -1;
    let bestLen = -1;
    for (let i = 0; i < rules.length; i++) {
      const { prefix } = rules[i];
      if (query.startsWith(prefix) && prefix.length > bestLen) {
        bestLen = prefix.length;
        bestIdx = i;
      }
    }
    result.push(bestIdx === -1 ? 'No Match' : rules[bestIdx].description);
  }
  return result;
}

function runTest(rules, queries, expected, name) {
  const result = matchIMSI(rules, [...queries]);
  const ok = JSON.stringify(result) === JSON.stringify(expected);
  console.log(`\n测试 ${name}:`);
  console.log(`  规则: ${JSON.stringify(rules)}`);
  console.log(`  查询: ${JSON.stringify(queries)}`);
  console.log(`  期望: ${JSON.stringify(expected)}`);
  console.log(`  实际: ${JSON.stringify(result)}`);
  console.log(`  结果: ${ok ? '✅' : '❌'}`);
  return ok;
}

console.log('='.repeat(60));
console.log('国际移动用户识别码(IMSI)匹配');
console.log('='.repeat(60));

let passed = 0, failed = 0;

// 测试1: 题目示例
if (runTest(
  [
    { prefix: '46000', description: '中国移动' },
    { prefix: '46001', description: '中国联通' },
    { prefix: '460', description: '国内运营商' }
  ],
  ['46000123456789', '13800138000'],
  ['中国移动', 'No Match'],
  '1-题目示例'
)) passed++; else failed++;

// 测试2: 完全相同的前缀匹配
if (runTest(
  [
    { prefix: '86', description: '中国' },
    { prefix: '860', description: '中国-北京' },
    { prefix: '8610', description: '中国-北京-海淀' }
  ],
  ['8610', '86', '860'],
  ['中国-北京-海淀', '中国', '中国-北京'],
  '2-精确前缀匹配'
)) passed++; else failed++;

// 测试3: 多条规则相同前缀长度，取最先录入
if (runTest(
  [
    { prefix: '139', description: '运营商A' },
    { prefix: '138', description: '运营商B' },
    { prefix: '139', description: '运营商C' }
  ],
  ['13912345678'],
  ['运营商A'],
  '3-同长前缀取先录入'
)) passed++; else failed++;

// 测试4: 所有查询均无匹配
if (runTest(
  [
    { prefix: '460', description: '国内' }
  ],
  ['123', '456', '789'],
  ['No Match', 'No Match', 'No Match'],
  '4-全无匹配'
)) passed++; else failed++;

// 测试5: 空规则
if (runTest(
  [],
  ['46000123456789'],
  ['No Match'],
  '5-空规则列表'
)) passed++; else failed++;

// 测试6: 查询号码恰好等于前缀
if (runTest(
  [
    { prefix: '46000', description: '移动' },
    { prefix: '460', description: '国内' }
  ],
  ['46000'],
  ['移动'],
  '6-号码等于前缀'
)) passed++; else failed++;

// 测试7: 多个查询混合匹配与不匹配
if (runTest(
  [
    { prefix: '86', description: '中国' },
    { prefix: '86139', description: '中国移动' }
  ],
  ['8613901234567', '8612345678901', '8613912345678'],
  ['中国移动', '中国', '中国移动'],
  '7-混合匹配'
)) passed++; else failed++;

// 测试8: 长前缀覆盖短前缀
if (runTest(
  [
    { prefix: '1', description: '以1开头' },
    { prefix: '12', description: '以12开头' },
    { prefix: '123', description: '以123开头' },
    { prefix: '1234', description: '以1234开头' }
  ],
  ['123456789', '129999', '1'],
  ['以1234开头', '以12开头', '以1开头'],
  '8-长前缀优先'
)) passed++; else failed++;

// 测试9: 后录入的更长前缀覆盖先录入的短前缀
if (runTest(
  [
    { prefix: '460', description: '国内' },
    { prefix: '46000', description: '移动' }
  ],
  ['46000123456'],
  ['移动'],
  '9-后录入长前缀优先'
)) passed++; else failed++;

// 测试10: 单条规则匹配多条查询
if (runTest(
  [
    { prefix: '999', description: '紧急号码' }
  ],
  ['999', '999123', '999888777'],
  ['紧急号码', '紧急号码', '紧急号码'],
  '10-单规则多查询'
)) passed++; else failed++;

console.log('\n' + '='.repeat(60));
console.log(`通过: ${passed}, 失败: ${failed}`);
console.log('='.repeat(60));
