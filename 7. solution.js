// 版本1: while循环版本
function findLastEnginesWhile(N, engines) {
    const times = Array(N).fill(Infinity);

    engines.forEach(([T, P]) => {
        if (T < times[P]) {
            times[P] = T;
        }
    });

    let changed = true;
    while (changed) {
        changed = false;
        for (let i = 0; i < N; i++) {
            const left = (i - 1 + N) % N;
            const right = (i + 1) % N;

            const newTime = Math.min(times[left] + 1, times[right] + 1);
            if (newTime < times[i]) {
                times[i] = newTime;
                changed = true;
            }
        }
    }

    const maxTime = Math.max(...times);
    const result = times.map((t, idx) => t === maxTime ? idx : -1).filter(idx => idx !== -1);

    return { count: result.length, engines: result.sort((a, b) => a - b) };
}

// 版本2: 队列版本(BFS)
function findLastEnginesQueue(N, engines) {
    const times = Array(N).fill(Infinity);
    const queue = [];

    engines.forEach(([T, P]) => {
        if (T < times[P]) {
            times[P] = T;
            queue.push({ idx: P, time: T });
        }
    });

    while (queue.length > 0) {
        const { idx, time } = queue.shift();
        const left = (idx - 1 + N) % N;
        const right = (idx + 1) % N;

        if (times[left] > time + 1) {
            times[left] = time + 1;
            queue.push({ idx: left, time: time + 1 });
        }

        if (times[right] > time + 1) {
            times[right] = time + 1;
            queue.push({ idx: right, time: time + 1 });
        }
    }

    const maxTime = Math.max(...times);
    const result = [];
    for (let i = 0; i < N; i++) {
        if (times[i] === maxTime) {
            result.push(i);
        }
    }

    return { count: result.length, engines: result.sort((a, b) => a - b) };
}

const tests = [
    { name: "原题示例1", input: { N: 8, engines: [[0, 2], [0, 6]] }, expected: [0, 4], desc: "对称手动启动" },
    { name: "原题示例2", input: { N: 8, engines: [[0, 0], [1, 7]] }, expected: [4], desc: "时间错开" },
    { name: "单发动机启动", input: { N: 5, engines: [[0, 0]] }, expected: [2, 3], desc: "单点启动" },
    { name: "全部手动启动", input: { N: 5, engines: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]] }, expected: [0, 1, 2, 3, 4], desc: "全部手动" },
    { name: "两端启动", input: { N: 6, engines: [[0, 0], [0, 5]] }, expected: [2, 3], desc: "两端同时" },
    { name: "时间递增启动", input: { N: 5, engines: [[0, 0], [2, 4]] }, expected: [2, 3], desc: "时间差启动" },
    { name: "三个点启动", input: { N: 10, engines: [[0, 0], [0, 5], [0, 8]] }, expected: [2, 3], desc: "多点启动" },
    { name: "环形传播", input: { N: 5, engines: [[1, 2]] }, expected: [0, 4], desc: "环形测试" },
    { name: "最大N值", input: { N: 1000, engines: [[0, 0], [0, 500]] }, expected: [250, 750], desc: "边界测试" },
    { name: "均匀分布", input: { N: 6, engines: [[0, 0], [0, 2], [0, 4]] }, expected: [1, 3, 5], desc: "均匀分布" },
];

function runTests() {
    let passed1 = 0, failed1 = 0;
    let passed2 = 0, failed2 = 0;

    console.log("=".repeat(70));
    console.log("流浪地球 - 两种实现对比测试");
    console.log("=".repeat(70));

    tests.forEach((test, index) => {
        const { name, input, expected, desc } = test;

        const result1 = findLastEnginesWhile(input.N, input.engines);
        const result2 = findLastEnginesQueue(input.N, input.engines);

        const success1 = JSON.stringify(result1.engines) === JSON.stringify(expected);
        const success2 = JSON.stringify(result2.engines) === JSON.stringify(expected);

        console.log(`\n测试 ${index + 1}: ${name}`);
        console.log(`描述: ${desc}`);
        console.log(`输入: N=${input.N}, engines=${JSON.stringify(input.engines)}`);
        console.log(`期望: [${expected.join(", ")}]`);
        console.log(`while版本: [${result1.engines.join(", ")}] ${success1 ? '✅' : '❌'}`);
        console.log(`队列版本: [${result2.engines.join(", ")}] ${success2 ? '✅' : '❌'}`);

        if (success1) passed1++; else failed1++;
        if (success2) passed2++; else failed2++;
    });

    console.log("\n" + "=".repeat(70));
    console.log(`while版本: ${passed1} 通过, ${failed1} 失败`);
    console.log(`队列版本: ${passed2} 通过, ${failed2} 失败`);
    console.log("=".repeat(70));
}

runTests();
