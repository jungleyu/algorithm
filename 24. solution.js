function findFriends(height) {
    const n = height.length;
    const result = new Array(n).fill(0);
    const stack = [];

    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
            const idx = stack.pop();
            result[idx] = i;
        }
        stack.push(i);
    }

    return result;
}

function test() {
    const test1 = findFriends([100, 95]);
    console.log("测试样例1:", JSON.stringify(test1) === '[0,0]' ? "通过" : "失败", test1);

    const test2 = findFriends([123, 124, 125, 121, 119, 122, 126, 123]);
    console.log("测试样例2:", JSON.stringify(test2) === '[1,2,6,5,5,6,0,0]' ? "通过" : "失败", test2);

    const test3 = findFriends([]);
    console.log("测试样例3:", JSON.stringify(test3) === '[]' ? "通过" : "失败", test3);
}

test();