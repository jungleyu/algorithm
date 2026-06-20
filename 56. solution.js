function rotateSushi(prices) {
    const n = prices.length;
    const extend = prices.concat(prices);
    const ans = prices.slice();
    const stack = [];
    for (let i = 2 * n - 1; i >= 0; i--) {
        while (stack.length > 0 && extend[i] <= stack[stack.length - 1]) {
            stack.pop();
        };
        if (i < n) {
            ans[i] = stack.length > 0 ? extend[i] + stack[stack.length - 1] : extend[i];
        }
        stack.push(extend[i]);
    }


    return ans;
}

function test() {
    const test1 = rotateSushi([3, 15, 6, 14]);
    console.log("测试样例1:", JSON.stringify(test1) === '[3,21,9,17]' ? "通过" : "失败", test1);

    const test2 = rotateSushi([1]);
    console.log("测试样例2:", JSON.stringify(test2) === '[1]' ? "通过" : "失败", test2);

    const test3 = rotateSushi([5, 4, 3, 2, 1]);
    console.log("测试样例3:", JSON.stringify(test3) === '[9,7,5,3,1]' ? "通过" : "失败", test3);

    const test4 = rotateSushi([1, 2, 3, 4, 5]);
    console.log("测试样例4:", JSON.stringify(test4) === '[1,3,4,5,6]' ? "通过" : "失败", test4);

    const test5 = rotateSushi([5, 3, 1, 4, 2]);
    console.log("测试样例5:", JSON.stringify(test5) === '[8,4,1,6,3]' ? "通过" : "失败", test5);
}

test();