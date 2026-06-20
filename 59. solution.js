function solveDeliveryProblem(input) {
    const lines = input.trim().split('\n');
    let idx = 0;
    const [M, N] = lines[idx++].split(' ').map(Number);
    
    const packages = [];
    for (let i = 0; i < M; i++) {
        const [name, from, to] = lines[idx++].split(' ');
        packages.push({ name, from, to });
    }
    
    const graph = new Map();
    for (let i = 0; i < N; i++) {
        const parts = lines[idx++].split(' ');
        const from = parts[0];
        const to = parts[1];
        const forbidden = new Set(parts.slice(2));
        
        if (!graph.has(from)) graph.set(from, []);
        if (!graph.has(to)) graph.set(to, []);
        
        graph.get(from).push({ to, forbidden });
        graph.get(to).push({ to: from, forbidden });
    }
    
    function canDeliver(pkg) {
        const { from, to, name } = pkg;
        
        if (from === to) return true;
        
        if (!graph.has(from) || !graph.has(to)) return false;
        
        const visited = new Set();
        const queue = [from];
        visited.add(from);
        
        while (queue.length > 0) {
            const current = queue.shift();
            
            if (current === to) return true;
            
            const neighbors = graph.get(current) || [];
            for (const neighbor of neighbors) {
                if (!neighbor.forbidden.has(name) && !visited.has(neighbor.to)) {
                    visited.add(neighbor.to);
                    queue.push(neighbor.to);
                }
            }
        }
        
        return false;
    }
    
    const undeliverable = packages
        .filter(pkg => !canDeliver(pkg))
        .map(pkg => pkg.name)
        .sort();
    
    return undeliverable.length === 0 ? 'none' : undeliverable.join(' ');
}

function runTests() {
    const testCases = [
        {
            name: '示例1',
            input: `4 2
package1 A C
package2 A C
package3 B C
package4 A C
A B package1
A C package2`,
            expected: 'package2'
        },
        {
            name: '所有包裹都能送达',
            input: `3 2
package1 A B
package2 B C
package3 A C
A B
B C`,
            expected: 'none'
        },
        {
            name: '起点终点相同',
            input: `2 1
package1 A A
package2 B C
A B`,
            expected: 'package2'
        },
        {
            name: '无道路信息',
            input: `2 0
package1 A B
package2 A A`,
            expected: 'package1'
        },
        {
            name: '无包裹',
            input: `0 2
A B
B C`,
            expected: 'none'
        },
        {
            name: '道路禁止多个包裹',
            input: `3 2
package1 A C
package2 A C
package3 A C
A B package1 package2
B C`,
            expected: 'package1 package2'
        },
        {
            name: '多条路径可选',
            input: `2 3
package1 A D
package2 A D
A B package1
B C
C D package1
A D package2`,
            expected: 'package1'
        },
        {
            name: '孤立站点',
            input: `2 1
package1 A B
package2 C D
A B`,
            expected: 'package2'
        },
        {
            name: '单向道路（双向处理）',
            input: `2 1
package1 A B
package2 B A
A B package1`,
            expected: 'package1'
        },
        {
            name: '空输入',
            input: `0 0`,
            expected: 'none'
        }
    ];
    
    let passed = 0;
    let failed = 0;
    
    for (const testCase of testCases) {
        const result = solveDeliveryProblem(testCase.input);
        const isPass = result === testCase.expected;
        
        if (isPass) {
            passed++;
            console.log(`✅ ${testCase.name}: 通过`);
        } else {
            failed++;
            console.log(`❌ ${testCase.name}: 失败`);
            console.log(`   期望: ${testCase.expected}`);
            console.log(`   实际: ${result}`);
        }
    }
    
    console.log(`\n测试结果: ${passed} 通过, ${failed} 失败`);
}

runTests();