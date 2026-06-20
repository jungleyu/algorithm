function solve(m, n, heights) {
    const result = Array.from({ length: m }, () => new Array(n).fill(0));
    
    for (let i = 0; i < m; i++) {
        const stack = [];
        for (let j = 0; j < n; j++) {
            while (stack.length > 0 && stack[stack.length - 1] < heights[i][j]) {
                stack.pop();
                result[i][j]++;
            }
            if (stack.length > 0) {
                result[i][j]++;
            }
            stack.push(heights[i][j]);
        }
    }
    
    for (let j = 0; j < n; j++) {
        const stack = [];
        for (let i = 0; i < m; i++) {
            while (stack.length > 0 && stack[stack.length - 1] < heights[i][j]) {
                stack.pop();
                result[i][j]++;
            }
            if (stack.length > 0) {
                result[i][j]++;
            }
            stack.push(heights[i][j]);
        }
    }
    
    return result;
}

function parseInput(input) {
    const lines = input.trim().split('\n');
    const [m, n] = lines[0].split(' ').map(Number);
    const values = lines[1].split(' ').map(Number);
    const heights = [];
    let idx = 0;
    for (let i = 0; i < m; i++) {
        const row = [];
        for (let j = 0; j < n; j++) {
            row.push(values[idx++]);
        }
        heights.push(row);
    }
    return { m, n, heights };
}

function formatOutput(result) {
    const m = result.length;
    const n = result[0].length;
    const values = result.flat();
    return `${m} ${n}\n${values.join(' ')}`;
}

function test() {
    console.log("=== 测试 [10, 2, 6, 8, 9, 1] ===");
    const result = solve(1, 6, [[10, 2, 6, 8, 9, 1]]);
    console.log("输入:", [10, 2, 6, 8, 9, 1]);
    console.log("输出:", result[0]);
    
    console.log("\n=== 测试样例1 ===");
    const test1Input = `1 6
2 4 1 5 3 3`;
    const { m: m1, n: n1, heights: heights1 } = parseInput(test1Input);
    const result1 = solve(m1, n1, heights1);
    console.log("测试样例1:", formatOutput(result1) === "1 6\n0 1 1 2 1 1" ? "通过" : "失败", result1);
    
    console.log("\n=== 测试样例2 ===");
    const test2Input = `2 6
2 5 4 3 2 8 9 7 5 10 10 3`;
    const { m: m2, n: n2, heights: heights2 } = parseInput(test2Input);
    const result2 = solve(m2, n2, heights2);
    console.log("测试样例2:", formatOutput(result2) === "2 6\n0 1 1 1 1 4 1 2 2 4 2 2" ? "通过" : "失败", result2);
}

test();