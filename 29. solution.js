function findProcessorCombinations(array, num) {
    const chainA = [0, 1, 2, 3].filter(p => array.includes(p));
    const chainB = [4, 5, 6, 7].filter(p => array.includes(p));

    const lenA = chainA.length;
    const lenB = chainB.length;

    if (num === 8) {
        return array.length === 8 ? [array.sort((a, b) => a - b)] : [];
    }

    function getCombinations(arr, count) {
        const combos = [];
        function backtrack(start, path) {
            if (path.length === count) {
                combos.push([...path].sort((a, b) => a - b));
                return;
            }
            for (let i = start; i < arr.length; i++) {
                path.push(arr[i]);
                backtrack(i + 1, path);
                path.pop();
            }
        }
        backtrack(0, []);
        return combos;
    }

    const priorityOrder = {
        1: [1, 3, 2, 4],
        2: [2, 4, 3],
        4: [4]
    };

    const order = priorityOrder[num];
    const chains = [
        { chain: chainA, len: lenA },
        { chain: chainB, len: lenB }
    ];

    for (const r of order) {
        for (const { chain, len } of chains) {
            if (len === r && len >= num) {
                return getCombinations(chain, num);
            }
        }
    }

    return [];
}

function test() {
    console.log("测试1:", JSON.stringify(findProcessorCombinations([0, 1, 4, 5, 6, 7], 1)));
    console.log("测试2:", JSON.stringify(findProcessorCombinations([0, 1, 4, 5, 6, 7], 4)));
    console.log("测试3:", JSON.stringify(findProcessorCombinations([0, 1, 2, 3, 4, 5, 6, 7], 8)));
    console.log("测试4:", JSON.stringify(findProcessorCombinations([0, 1, 2, 3], 4)));
}

test();