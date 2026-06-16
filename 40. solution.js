function guessNumber(input) {
    const lines = input.trim().split('\n');
    const N = parseInt(lines[0], 10);
    const guesses = [];

    let possibleDigits = [
        new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']),
        new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']),
        new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']),
        new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])
    ];

    for (let i = 1; i <= N; i++) {
        let [num, hint] = lines[i].trim().split(' ');
        // [4815, 1A1B] 
        const [A, B] = hint.match(/\d{1}/g).map(Number)
        if (A === 4) {
            return num;
        }
        if (A === 0) {
            num.split('').forEach((v, i) => {
                possibleDigits[i].delete(v)
            })
        }
        if (A + B === 0) {
            num.split('').forEach(v => {
                possibleDigits.forEach(digits => digits.delete(v))
            })
        } else if (A + B === 4) {
            const guessSet = new Set(num.split(''));
            possibleDigits.forEach(digits => {
                for (const digit of digits) {
                    if (!guessSet.has(digit)) {
                        digits.delete(digit)
                    }
                }
            })
        }
        guesses.push({ num, A, B });
    }

    function checkHint(candidate) {
        for (const { num, A, B } of guesses) {
            const [a, b] = calcHint(num, candidate);
            if (a !== A || b !== B) {
                return false
            }
        }
        return true;
    }

    function calcHint(guess, candidate) {
        let a = 0, b = 0;
        const guessUsed = Array(4).fill(false);
        const candidateUsed = Array(4).fill(false);

        for (let i = 0; i < 4; i++) {
            if (guess[i] === candidate[i]) {
                a++;
                guessUsed[i] = true;
                candidateUsed[i] = true;
            }
        }

        for (let i = 0; i < 4; i++) {
            if (!guessUsed[i]) {
                for (let j = 0; j < 4; j++) {
                    if (!candidateUsed[j] && guess[i] === candidate[j]) {
                        b++;
                        candidateUsed[j] = true;
                        break;
                    }
                }
            }
        }

        return [a, b];
    }

    const candidates = [];

    possibleDigits[0].forEach(i => {
        possibleDigits[1].forEach(j => {
            possibleDigits[2].forEach(k => {
                possibleDigits[3].forEach(l => {
                    const num = `${i}${j}${k}${l}`;
                    if (checkHint(num)) {
                        candidates.push(num);
                    }
                })
            })
        })
    })

    return candidates.length === 1 ? candidates[0] : 'NA';
}

function runTests() {
    const tests = [
        {
            name: "原题示例",
            input: "6\n4815 1A1B\n5716 0A1B\n7842 0A1B\n4901 0A0B\n8585 3A0B\n8555 2A1B",
            expected: "3585",
            desc: "唯一答案"
        },
        {
            name: "无唯一解",
            input: "1\n1234 0A0B",
            expected: "NA",
            desc: "多个可能的答案"
        },
        {
            name: "直接猜中",
            input: "1\n1234 4A0B",
            expected: "1234",
            desc: "一次猜中"
        },
        {
            name: "首位固定",
            input: "1\n1234 1A0B",
            expected: "NA",
            desc: "只有1A提示"
        },
        {
            name: "全错",
            input: "1\n1234 0A4B",
            expected: "NA",
            desc: "0A4B说明数字全对但位置全错"
        },
        {
            name: "两行相同",
            input: "2\n1234 0A0B\n5678 0A0B",
            expected: "NA",
            desc: "限制更少"
        },
        {
            name: "严格限制",
            input: "2\n1234 1A0B\n5678 1A0B",
            expected: "NA",
            desc: "两个不同1A"
        },
        {
            name: "重复数字猜中",
            input: "1\n1122 4A0B",
            expected: "1122",
            desc: "重复数字猜中"
        },
        {
            name: "重复数字不匹配",
            input: "1\n1122 0A2B",
            expected: "NA",
            desc: "重复数字情况"
        },
        {
            name: "全0提示",
            input: "2\n1234 0A0B\n5678 0A0B",
            expected: "NA",
            desc: "限制严格但仍有多个解"
        },
    ];

    let passed = 0, failed = 0;

    console.log("=".repeat(60));
    console.log("猜数字 - 测试用例");
    console.log("=".repeat(60));

    tests.forEach((test, index) => {
        const { name, input, expected, desc } = test;
        const result = guessNumber(input);
        const success = result === expected;

        console.log(`\n测试 ${index + 1}: ${name}`);
        console.log(`描述: ${desc}`);
        console.log(`输入: ${input.replace(/\n/g, ' | ')}`);
        console.log(`期望: ${expected}`);
        console.log(`实际: ${result}`);
        console.log(`结果: ${success ? '✅ 通过' : '❌ 失败'}`);

        if (success) passed++; else failed++;
    });

    console.log("\n" + "=".repeat(60));
    console.log(`测试完成: ${passed} 通过, ${failed} 失败`);
    console.log("=".repeat(60));
}

runTests();
