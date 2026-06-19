function portRateStat(portRates) {
    const n = portRates.length;
    const result = new Array(n).fill(0);
    const stack = [];

    for (let i = n - 1; i >= 0; i--) {
        while (stack.length > 0 && portRates[stack[stack.length - 1]] <= portRates[i]) {
            stack.pop();
        }
        if (stack.length > 0) {
            result[i] = stack[stack.length - 1] - i;
        }
        stack.push(i);
    }

    return result;
}

function test() {
    const test1 = portRateStat([730, 740, 750, 710, 690, 720, 760, 730]);
    console.log("测试样例1:", JSON.stringify(test1) === '[1,1,4,2,1,1,0,0]' ? "通过" : "失败", test1);

    const test2 = portRateStat([800]);
    console.log("测试样例2:", JSON.stringify(test2) === '[0]' ? "通过" : "失败", test2);

    const test3 = portRateStat([800, 700]);
    console.log("测试样例3:", JSON.stringify(test3) === '[0,0]' ? "通过" : "失败", test3);

    const test4 = portRateStat([700, 800]);
    console.log("测试样例4:", JSON.stringify(test4) === '[1,0]' ? "通过" : "失败", test4);
}

test();