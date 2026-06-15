function findNextHigherPriority(n, k, packets) {
    if (n < k) {
        return [];
    }
    const data = packets.map(packet => {
        const [id, priority] = packet.split(':').map(Number);
        return { id, priority }
    });

    const stack = [];
    const temp = new Array(n).fill(null);
    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && data[i].priority > data[stack[stack.length - 1]].priority) {
            const top = stack.pop();
            temp[top] = data[i].id;
        }
        stack.push(i);
    }

    const ans = [];
    for (let i = 0; i < n - k + 1; i++) {
        let t = [];
        for (let j = i; j < i + k - 1; j++) {
            if (temp[j] !== null) {
                t.push(temp[j]);
            }
        }
        if (t.length > 0) {
            ans.push(t);
        }
    }
    return ans;

}

function test() {
    const test1 = findNextHigherPriority(5, 3, ['1:5', '2:3', '3:7', '4:6', '5:4']);
    console.log("测试样例1:", JSON.stringify(test1) === '[[3,3],[3]]' ? "通过" : "失败", test1);

    const test2 = findNextHigherPriority(5, 3, ['1:1', '2:2', '3:3', '4:4', '5:5']);
    console.log("测试样例2:", JSON.stringify(test2) === '[[2,3],[3,4],[4,5]]' ? "通过" : "失败", test2);

    const test3 = findNextHigherPriority(4, 3, ['4:4', '3:3', '2:2', '1:1']);
    console.log("测试样例3:", JSON.stringify(test3) === '[]' ? "通过" : "失败", test3);

    const test4 = findNextHigherPriority(3, 4, ['1:5', '2:3', '3:7']);
    console.log("测试样例4:", JSON.stringify(test4) === '[]' ? "通过" : "失败", test4);
}

test();