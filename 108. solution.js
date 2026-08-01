/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getPermutation = function (n, k) {
    const arr = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880];// 0-9的阶乘
    const visited = new Array(n + 1).fill(false);
    let ans = '';
    for (let i = n - 1; i >= 0; i--) {
        let cnt = arr[i];
        for (let j = 1; j <= n; j++) {
            if (visited[j]) {
                continue;
            }
            if (k > cnt) {
                k -= cnt;
                continue;
            }
            visited[j] = true;
            ans += j;
            break;
        }
    }
    return ans;
};

function testGetPermutation() {
    const testCases = [
        { n: 3, k: 3, expected: "213", desc: "n=3, k=3，标准示例1" },
        { n: 4, k: 9, expected: "2314", desc: "n=4, k=9，标准示例2" },
        { n: 3, k: 1, expected: "123", desc: "n=3, k=1，标准示例3" },
        { n: 1, k: 1, expected: "1", desc: "n=1, k=1，单个元素" },
        { n: 2, k: 1, expected: "12", desc: "n=2, k=1，最小k" },
        { n: 2, k: 2, expected: "21", desc: "n=2, k=2，最大k(2!)" },
        { n: 3, k: 2, expected: "132", desc: "n=3, k=2，第二小" },
        { n: 3, k: 4, expected: "231", desc: "n=3, k=4" },
        { n: 3, k: 5, expected: "312", desc: "n=3, k=5" },
        { n: 3, k: 6, expected: "321", desc: "n=3, k=6，最大k(3!)" },
        { n: 4, k: 1, expected: "1234", desc: "n=4, k=1，最小排列" },
        { n: 4, k: 24, expected: "4321", desc: "n=4, k=24，最大k(4!)" },
        { n: 5, k: 1, expected: "12345", desc: "n=5, k=1" },
        { n: 5, k: 120, expected: "54321", desc: "n=5, k=120，最大k(5!)" },
        { n: 9, k: 1, expected: "123456789", desc: "n=9, k=1，最大n，最小k" },
        { n: 9, k: 362880, expected: "987654321", desc: "n=9, k=362880，最大n，最大k(9!)" },
        { n: 6, k: 720, expected: "654321", desc: "n=6, k=720，最大k(6!)" },
        { n: 6, k: 360, expected: "365421", desc: "n=6, k=360，6!/2" },
        { n: 7, k: 5040, expected: "7654321", desc: "n=7, k=5040，最大k(7!)" },
        { n: 8, k: 40320, expected: "87654321", desc: "n=8, k=40320，最大k(8!)" },
        { n: 4, k: 2, expected: "1243", desc: "n=4, k=2" },
        { n: 4, k: 3, expected: "1324", desc: "n=4, k=3" },
        { n: 4, k: 4, expected: "1342", desc: "n=4, k=4" },
        { n: 4, k: 5, expected: "1423", desc: "n=4, k=5" },
        { n: 4, k: 6, expected: "1432", desc: "n=4, k=6" },
        { n: 5, k: 12, expected: "13542", desc: "n=5, k=12" },
        { n: 5, k: 24, expected: "15432", desc: "n=5, k=24，以1开头的最后一个" },
        { n: 5, k: 25, expected: "21345", desc: "n=5, k=25，以2开头的第一个" },
        { n: 5, k: 60, expected: "32541", desc: "n=5, k=60，5!/2" },
        { n: 9, k: 181440, expected: "549876321", desc: "n=9, k=181440，9!/2" }
    ];

    let passed = 0;
    let failed = 0;

    testCases.forEach((tc, index) => {
        const result = getPermutation(tc.n, tc.k);
        const status = result === tc.expected ? '✓' : '✗';
        if (result === tc.expected) {
            passed++;
        } else {
            failed++;
        }
        console.log(`测试用例 ${index + 1}: ${status}`);
        console.log(`  描述: ${tc.desc}`);
        console.log(`  输入: n = ${tc.n}, k = ${tc.k}`);
        console.log(`  预期: "${tc.expected}"`);
        console.log(`  实际: "${result}"`);
        console.log('');
    });

    console.log(`\n测试结果: ${passed} 个通过, ${failed} 个失败`);
}

testGetPermutation();