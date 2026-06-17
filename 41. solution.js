function invest(m, N, X, returns, risks, limits) {
    let maxReturn = 0;
    let bestInvestment = new Array(m).fill(0);

    for (let i = 0; i < m; i++) {
        if (risks[i] > X) {
            continue;
        }
        if (limits[i] > N) {
            continue;
        }

        const investAmount = Math.min(N, limits[i]);
        const profit = investAmount * returns[i];
        if (profit > maxReturn) {
            maxReturn = profit;
            bestInvestment = new Array(m).fill(0);
            bestInvestment[i] = investAmount;
        }
        for (let j = i + 1; j < m; j++) {
            if (risks[j] + risks[i] > X) {
                continue;
            }
            let amountI, amountJ;
            if (returns[i] > returns[j]) {
                amountI = Math.min(N, limits[i]);
                amountJ = Math.min(N - amountI, limits[j]);
            } else {
                amountJ = Math.min(N, limits[j]);
                amountI = Math.min(N - amountJ, limits[i]); 
            }
            const profitI = amountI * returns[i];
            const profitJ = amountJ * returns[j];
            if (profitI + profitJ > maxReturn) {
                maxReturn = profitI + profitJ;
                bestInvestment = new Array(m).fill(0);
                bestInvestment[i] = amountI;
                bestInvestment[j] = amountJ;
            }
        }
    }

    return bestInvestment;
}

function test() {
    const testCases = [
        {
            name: "示例1",
            m: 5,
            N: 100,
            X: 10,
            returns: [10, 20, 30, 40, 50],
            risks: [3, 4, 5, 6, 10],
            limits: [20, 30, 20, 40, 30],
            expected: [0, 30, 0, 40, 0]
        },
        {
            name: "只投资1个产品",
            m: 3,
            N: 50,
            X: 5,
            returns: [10, 20, 30],
            risks: [3, 4, 5],
            limits: [50, 50, 50],
            expected: [0, 0, 50]
        },
        {
            name: "投资2个产品",
            m: 4,
            N: 100,
            X: 10,
            returns: [10, 20, 30, 40],
            risks: [3, 4, 5, 6],
            limits: [50, 50, 50, 50],
            expected: [0, 50, 0, 50]
        },
        {
            name: "风险刚好等于限制",
            m: 2,
            N: 100,
            X: 10,
            returns: [20, 30],
            risks: [4, 6],
            limits: [50, 50],
            expected: [50, 50]
        }
    ];

    let allPass = true;

    for (const tc of testCases) {
        const result = invest(tc.m, tc.N, tc.X, tc.returns, tc.risks, tc.limits);
        const passed = JSON.stringify(result) === JSON.stringify(tc.expected);
        if (!passed) allPass = false;
        console.log(`${tc.name} 测试${passed ? "通过" : "失败"}: 期望 ${tc.expected}, 实际 ${result}`);
    }

    console.log(`\n总计: ${allPass ? "全部通过" : "有失败"}`);
}

test();