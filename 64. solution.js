function trap(height) {
    const stack = [];
    let totalWater = 0;

    for (let i = 0; i < height.length; i++) {
        while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
            const top = stack.pop();
            if (stack.length === 0) {
                break;
            }
            const left = stack[stack.length - 1];
            const boundWidth = i - left - 1;
            const boundHeight = Math.min(height[left], height[i]) - height[top];
            totalWater += boundHeight * boundWidth;
        }
        stack.push(i);
    }

    return totalWater;
}

function parseInput(input) {
    const lines = input.trim().split('\n');
    const n = parseInt(lines[0]);
    const height = lines[1].split(' ').map(Number);
    return height;
}

function test() {
    const test1Input = `12
0 1 0 2 1 0 1 3 2 1 2 1`;
    const height1 = parseInput(test1Input);
    console.log("测试样例1:", trap(height1) === 6 ? "通过" : "失败", trap(height1));

    const test2Input = `6
4 2 0 3 2 5`;
    const height2 = parseInput(test2Input);
    console.log("测试样例2:", trap(height2) === 9 ? "通过" : "失败", trap(height2));

    const test3Input = `3
1 2 1`;
    const height3 = parseInput(test3Input);
    console.log("测试样例3:", trap(height3) === 0 ? "通过" : "失败", trap(height3));

    const test4Input = `2
0 0`;
    const height4 = parseInput(test4Input);
    console.log("测试样例4:", trap(height4) === 0 ? "通过" : "失败", trap(height4));
}

test();