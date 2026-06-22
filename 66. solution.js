/**
 * 阿里巴巴找黄金宝箱(IV) - 环形数组下一个更大元素
 * 使用单调栈算法解决
 */

function findNextGreater(nums) {
    const n = nums.length;
    if (n === 0) return [];
    
    // 将数组扩展为两倍，模拟环形数组
    const extended = nums.concat(nums);
    const result = new Array(n).fill(-1);
    const stack = []; // 单调递减栈
    
    // 从右向左遍历扩展数组
    for (let i = 2 * n - 1; i >= 0; i--) {
        // 弹出栈中所有小于等于当前元素的值
        while (stack.length > 0 && stack[stack.length - 1] <= extended[i]) {
            stack.pop();
        }
        
        // 只在原数组范围内记录结果
        if (i < n) {
            if (stack.length > 0) {
                result[i] = stack[stack.length - 1];
            }
        }
        
        // 将当前元素压入栈
        stack.push(extended[i]);
    }
    
    return result;
}

function solve(input) {
    const nums = input.split(',').map(Number);
    const result = findNextGreater(nums);
    return result.join(',');
}

function test() {
    const testCases = [
        {
            input: '2,5,2',
            expected: '5,-1,5',
            description: '示例1：环形数组，第二个2需要循环找到5'
        },
        {
            input: '3,4,5,6,3',
            expected: '4,5,6,-1,4',
            description: '示例2：最后一个3循环找到4'
        },
        {
            input: '1',
            expected: '-1',
            description: '单元素数组，无更大元素'
        },
        {
            input: '5,4,3,2,1',
            expected: '-1,5,5,5,5',
            description: '递减数组，每个元素循环找到最大值5'
        },
        {
            input: '1,2,3,4,5',
            expected: '2,3,4,5,-1',
            description: '递增数组，每个元素右边就是更大元素'
        },
        {
            input: '1,1,1,1',
            expected: '-1,-1,-1,-1',
            description: '所有元素相同，无更大元素'
        },
        {
            input: '2,1,2,1,2',
            expected: '-1,2,-1,2,-1',
            description: '交替数组，2找不到更大元素'
        },
        {
            input: '10,5,8,3,12',
            expected: '12,8,12,12,-1',
            description: '混合数组，最大值12后面无更大元素'
        },
        {
            input: '-1,-2,-3',
            expected: '-1,-1,-1',
            description: '负数数组，-1最大，所有元素都找-1'
        },
        {
            input: '0,0,1,0',
            expected: '1,1,-1,1',
            description: '包含0的数组，1是最大元素'
        }
    ];

    console.log('测试用例执行结果：');
    console.log('='.repeat(60));
    
    let passed = 0;
    let failed = 0;

    for (let i = 0; i < testCases.length; i++) {
        const tc = testCases[i];
        const actual = solve(tc.input);
        const status = actual === tc.expected ? '通过' : '失败';
        
        if (status === '通过') {
            passed++;
        } else {
            failed++;
        }

        console.log(`测试用例 ${i + 1}: ${tc.description}`);
        console.log(`输入: ${tc.input}`);
        console.log(`期望输出: ${tc.expected}`);
        console.log(`实际输出: ${actual}`);
        console.log(`状态: ${status}`);
        console.log('-'.repeat(60));
    }

    console.log(`\n测试结果: 共 ${testCases.length} 个测试用例，通过 ${passed} 个，失败 ${failed} 个`);
}

test();