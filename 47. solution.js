function minCombatDiff(players) {
    const n = players.length;
    const half = n / 2;
    const total = players.reduce((sum, value) => sum + value, 0);

    let diff = Infinity;
    const used = Array(n).fill(false);

    function backtrace(start, count, sum) {
        if (count === half) {
            const curDiff = Math.abs(total - 2 * sum);
            if (curDiff < diff) {
                diff = curDiff;
            }
            return;
        }

        for (let i = start; i < n; i++) {
            if (!used[i]) {
                used[i] = true;
                backtrace(i + 1, count + 1, sum + players[i]);
                used[i] = false;
            }
        }
    }

    backtrace(0, 0, 0);

    return diff;
}

function test() {
    console.log("测试样例1:", minCombatDiff([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) === 1 ? "通过" : "失败");
    console.log("测试样例2:", minCombatDiff([500, 700, 0, 0]) === 200 ? "通过" : "失败");
    console.log("测试样例3:", minCombatDiff([1, 1]) === 0 ? "通过" : "失败");
    console.log("测试样例4:", minCombatDiff([10, 20, 30, 40]) === 0 ? "通过" : "失败");
    console.log("测试样例5: ", minCombatDiff([5000, 5000, 4000, 4000, 3000, 3000, 2000, 2000, 1000, 1000]) === 0 ? "通过" : "失败");
}

test();