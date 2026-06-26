function solve(input) {
    const lines = input.trim().split('\n');
    const treeLines = lines.slice(1);

    const nodes = {};
    function getNode(name) {
        if (!nodes[name]) {
            nodes[name] = { name, gate: null, children: [], isLeaf: name.startsWith('X') };
        }
        return nodes[name];
    }

    for (const line of treeLines) {
        const parts = line.trim().split(/\s+/);
        for (let i = 0; i + 2 < parts.length; i += 2) {
            const parent = getNode(parts[i]);
            const gate = parts[i + 1];
            const child = getNode(parts[i + 2]);
            parent.gate = gate;
            if (!parent.children.some(c => c.name === child.name)) {
                parent.children.push(child);
            }
        }
    }

    const root = nodes['T'];

    function isSubsetOf(a, b) {
        if (a.size > b.size) return false;
        for (const elem of a) {
            if (!b.has(elem)) return false;
        }
        return true;
    }

    function minimize(sets) {
        const result = [];
        for (const set of sets) {
            let redundant = false;
            for (const other of sets) {
                if (set !== other && isSubsetOf(other, set)) {
                    redundant = true;
                    break;
                }
            }
            if (redundant) continue;

            let shouldAdd = true;
            for (let i = 0; i < result.length; i++) {
                if (isSubsetOf(set, result[i])) {
                    shouldAdd = false;
                    break;
                } else if (isSubsetOf(result[i], set)) {
                    result.splice(i, 1);
                    i--;
                }
            }
            if (shouldAdd) result.push(set);
        }
        return result;
    }

    function getCutSets(node) {
        if (node.isLeaf) {
            return [new Set([node.name])];
        }

        const childSets = node.children.map(getCutSets);

        let combined;
        if (node.gate === 'OR') {
            combined = childSets.flat();
        } else {
            if (childSets.length === 0) return [];
            combined = childSets.reduce((acc, cur) => {
                const result = [];
                for (const a of acc) {
                    for (const b of cur) {
                        result.push(new Set([...a, ...b]));
                    }
                }
                return result;
            });
        }

        return minimize(combined);
    }

    const minCutSets = getCutSets(root);

    const freq = {};
    for (const set of minCutSets) {
        for (const leaf of set) {
            freq[leaf] = (freq[leaf] || 0) + 1;
        }
    }

    const preorder = [];
    function traverse(node) {
        if (node.isLeaf) {
            preorder.push(node.name);
            return;
        }
        for (const child of node.children) {
            traverse(child);
        }
    }
    traverse(root);

    let maxFreq = 0;
    for (const leaf in freq) {
        if (freq[leaf] > maxFreq) maxFreq = freq[leaf];
    }

    for (const leaf of preorder) {
        if (freq[leaf] === maxFreq) return leaf;
    }

    return '';
}

function runTests() {
    const testCases = [
        {
            input: `9 9
T AND M1 OR X4
T AND M1 OR M3 AND X3
T AND M1 OR M3 AND M4 OR X2
T AND M1 OR M3 AND M4 OR X5
T AND M1 OR M6 AND X9
T AND M2 OR X1
T AND M2 OR M5 AND X6
T AND M2 OR M5 AND X7
T AND M2 OR M5 AND X8`,
            expected: 'X3',
            description: '示例1：多叉树故障诊断，X3最重要'
        },
        {
            input: `2 3
T AND X2
T AND X1`,
            expected: 'X2',
            description: '示例2：两个叶子，最左输出X2'
        },
        {
            input: `1 2
T AND X1`,
            expected: 'X1',
            description: '单叶子节点'
        },
        {
            input: `3 2
T OR X1
T OR X2
T OR X3`,
            expected: 'X1',
            description: '根节点OR门，所有叶子独立成集，频率均为1，输出最左'
        },
        {
            input: `2 2
T AND X1
T AND X2`,
            expected: 'X1',
            description: '根节点AND门，最小割集{X1,X2}，频率相等输出最左'
        },
        {
            input: `4 4
T AND M1 OR X1
T AND M1 OR X2
T AND M2 OR X3
T AND M2 OR X4`,
            expected: 'X1',
            description: '对称结构，所有叶子频率相同输出最左'
        },
        {
            input: `3 4
T AND M1 OR X1
T AND M1 OR X2
T AND X3`,
            expected: 'X3',
            description: 'AND-OR混合，X3在AND两侧组合中频率最高'
        },
        {
            input: `4 4
T AND M1 OR X1
T AND M1 OR M2 AND X2
T AND M1 OR M2 AND X3
T AND M1 OR X4`,
            expected: 'X1',
            description: 'M1为OR，下有X1、M2(AND(X2,X3))、X4'
        },
        {
            input: `4 4
T AND X1
T AND M1 OR X2
T AND M1 OR X3
T AND M1 OR X4`,
            expected: 'X1',
            description: 'X1与M1(OR-X2/X3/X4)组合，X1频率最高(3次)'
        },
        {
            input: `4 4
T AND M1 OR X1
T AND M2 OR X2
T AND M1 OR X3
T AND M2 OR X4`,
            expected: 'X1',
            description: '交叉结构，验证最小割集去重'
        }
    ];

    let passed = 0;
    let failed = 0;

    testCases.forEach((test, index) => {
        const result = solve(test.input);
        const success = result === test.expected;

        if (success) {
            passed++;
            console.log(`\u2713 测试 ${index + 1}: ${test.description}`);
        } else {
            failed++;
            console.log(`\u2717 测试 ${index + 1}: ${test.description}`);
            console.log(`  期望: ${test.expected}`);
            console.log(`  实际: ${result}`);
        }
    });

    console.log(`\n测试结果: ${passed}/${testCases.length} 通过`);
}

runTests();
