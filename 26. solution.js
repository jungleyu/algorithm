function findMinWavePeakDistance(nums) {
    const n = nums.length;
    if (n < 3) {
        return -1;
    }

    const leftSmaller = new Array(n).fill(-1);
    const rightSmaller = new Array(n).fill(n);

    const stack = [];
    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && nums[stack[stack.length - 1]] >= nums[i]) {
            stack.pop();
        }
        if (stack.length > 0) {
            leftSmaller[i] = stack[stack.length - 1];
        }
        stack.push(i);
    }
    console.log("leftSmaller:", leftSmaller);

    stack.length = 0;
    for (let i = n - 1; i >= 0; i--) {
        while (stack.length > 0 && nums[stack[stack.length - 1]] >= nums[i]) {
            stack.pop();
        }
        if (stack.length > 0) {
            rightSmaller[i] = stack[stack.length - 1];
        }
        stack.push(i);
    }
    console.log("rightSmaller:", rightSmaller);

    let minDistance = Infinity;

    for (let j = 1; j < n - 1; j++) {
        const i = leftSmaller[j];
        const k = rightSmaller[j];
        if (i !== -1 && k !== n && nums[i] < nums[j] && nums[k] < nums[j]) {
            minDistance = Math.min(minDistance, k - i);
        }
    }

    return minDistance === Infinity ? -1 : minDistance;
}

function test() {
    const test1 = findMinWavePeakDistance([3, 5, 4, 7, 2, 1]);
    console.log("测试样例1:", test1 === 2 ? "通过" : "失败", test1);

    const test2 = findMinWavePeakDistance([4, 3, 2, 1]);
    console.log("测试样例2:", test2 === -1 ? "通过" : "失败", test2);

    const test3 = findMinWavePeakDistance([1, 2, 3, 4, 5]);
    console.log("测试样例3:", test3 === -1 ? "通过" : "失败", test3);

    const test4 = findMinWavePeakDistance([5, 4, 3, 4, 5]);
    console.log("测试样例4:", test4 === -1 ? "通过" : "失败", test4);

    const test5 = findMinWavePeakDistance([1, 3, 2]);
    console.log("测试样例5:", test5 === 2 ? "通过" : "失败", test5);
}

test();