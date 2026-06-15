function findNextGreater(nums, debug = false) {
    const n = nums.length;
    if (n === 0) return [];
    
    const extended = nums.concat(nums);
    const result = new Array(n).fill(-1);
    const stack = [];
    
    if (debug) {
        console.log("=== 初始化 ===");
        console.log("原数组 nums:", nums);
        console.log("扩展数组 extended:", extended);
        console.log("结果数组 result 初始:", result);
        console.log("================\n");
    }
    
    for (let i = 2 * n - 1; i >= 0; i--) {
        if (debug) {
            console.log("=== 第 " + i + " 次迭代 (扩展数组索引) ===");
            console.log("当前元素: extended[" + i + "] = " + extended[i]);
            console.log("当前栈状态: [" + stack.join(', ') + "]");
        }
        
        while (stack.length > 0 && stack[stack.length - 1] <= extended[i]) {
            const popped = stack.pop();
            if (debug) {
                console.log("  弹出栈顶元素: " + popped + " (≤ 当前元素 " + extended[i] + ")");
                console.log("  弹出后栈状态: [" + stack.join(', ') + "]");
            }
        }
        
        if (i < n) {
            if (stack.length > 0) {
                result[i] = stack[stack.length - 1];
                if (debug) {
                    console.log("  记录结果: result[" + i + "] = " + stack[stack.length - 1] + " (栈顶元素)");
                }
            } else {
                if (debug) {
                    console.log("  记录结果: result[" + i + "] = -1 (栈为空，无更大元素)");
                }
            }
        } else {
            if (debug) {
                console.log("  跳过记录: i=" + i + " >= n=" + n + "，属于扩展部分");
            }
        }
        
        stack.push(extended[i]);
        if (debug) {
            console.log("  压入当前元素: " + extended[i]);
            console.log("  压入后栈状态: [" + stack.join(', ') + "]");
            console.log("--------------\n");
        }
    }
    
    if (debug) {
        console.log("=== 最终结果 ===");
        console.log("结果数组 result:", result);
        console.log("================");
    }
    
    return result;
}

function test() {
    console.log("=== 测试样例1 ===");
    const test1 = findNextGreater([2, 5, 2], true);
    console.log("测试样例1:", JSON.stringify(test1) === '[5,-1,5]' ? "通过" : "失败", test1);
    console.log("\n");
    
    console.log("=== 测试样例2 ===");
    const test2 = findNextGreater([3, 4, 5, 6, 3], true);
    console.log("测试样例2:", JSON.stringify(test2) === '[4,5,6,-1,4]' ? "通过" : "失败", test2);
    console.log("\n");
    
    console.log("=== 测试样例3 ===");
    const test3 = findNextGreater([1], true);
    console.log("测试样例3:", JSON.stringify(test3) === '[-1]' ? "通过" : "失败", test3);
    console.log("\n");
    
    console.log("=== 测试样例4 ===");
    const test4 = findNextGreater([5, 4, 3, 2, 1], true);
    console.log("测试样例4:", JSON.stringify(test4) === '[-1,5,5,5,5]' ? "通过" : "失败", test4);
}

test();