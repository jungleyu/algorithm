// CM5<-CM3,CM4<-CM5,CM6<-CM4,CM6<-CM1,CM5<-CM6
function findCycleNodes(input) {
    const allNodes = new Set();
    const graph = new Map();
    input.trim().split(',').map(val => {
        const [target, source] = val.split('<-');
        allNodes.add(source);
        allNodes.add(target);
        if (!graph.has(source)) {
            graph.set(source, [target])
        } else {
            graph.get(source).push(target);
        }
    });

    const visited = new Map();
    const cycleNodes = new Set();
    function dfs(node, path) {
        if (visited.get(node) === 1) {
            const idx = path.indexOf(node);
            const loop = path.slice(idx);
            for (const n of loop) {
                cycleNodes.add(n);
            }
            return;
        }
        if (visited.get(node) === 2) {
            return;
        }
        visited.set(node, 1);
        path.push(node);

        for (const nerghbor of graph.get(node) || []) {
            dfs(nerghbor, [...path]);
        }

        visited.set(node, 2);
        path.pop();
    }


    for (let node of allNodes) {
        if (!visited.has(node)) {
            visited.set(node, 0);
            dfs(node, [])
        }
    }

    return cycleNodes.size;
}

function runTest(input, expected, name) {
  const result = findCycleNodes(input);
  const ok = result === expected;
  console.log(`\n测试 ${name}:`);
  console.log(`  输入: ${input}`);
  console.log(`  期望: ${expected}`);
  console.log(`  实际: ${result}`);
  console.log(`  结果: ${ok ? '✅' : '❌'}`);
  return ok;
}

console.log('='.repeat(60));
console.log('产品模块算法检验');
console.log('='.repeat(60));

let passed = 0, failed = 0;

if (runTest('CM5<-CM3,CM4<-CM5,CM6<-CM4,CM6<-CM1,CM5<-CM6', 3, '1-示例1')) passed++; else failed++;

if (runTest('CM5<-CM3,CM3<-CM6,CM6<-CM4,CM3<-CM4,CM4<-CM1', 0, '2-示例2')) passed++; else failed++;

if (runTest('CM2<-CM1,CM3<-CM2,CM4<-CM3', 0, '3-无环单链')) passed++; else failed++;

if (runTest('CM1<-CM1', 1, '4-自环')) passed++; else failed++;

if (runTest('CM2<-CM1,CM1<-CM2,CM4<-CM3,CM3<-CM4', 4, '5-两个独立环')) passed++; else failed++;

if (runTest('CM1<-CM2', 0, '6-单依赖无环')) passed++; else failed++;

if (runTest('CM3<-CM1,CM2<-CM3,CM1<-CM2,CM5<-CM4,CM4<-CM5', 5, '7-多环重叠')) passed++; else failed++;

if (runTest('CM3<-CM1,CM4<-CM2,CM2<-CM3,CM3<-CM2', 2, '8-部分节点在环内')) passed++; else failed++;

if (runTest('CM2<-CM1,CM3<-CM2,CM4<-CM3,CM5<-CM4,CM1<-CM5', 5, '9-五节点大环')) passed++; else failed++;

if (runTest('CM3<-CM1,CM3<-CM2,CM2<-CM1', 0, '10-钻石结构无环')) passed++; else failed++;

console.log('\n' + '='.repeat(60));
console.log(`通过: ${passed}, 失败: ${failed}`);
console.log('='.repeat(60));