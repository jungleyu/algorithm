function findWorstProducts(M, ratings) {
    if (M <= 0 || ratings.length === 0 || M > ratings.length) {
        return [];
    }
    
    const result = [];
    const stack = [];
    
    for (let i = 0; i < ratings.length; i++) {
        while (stack.length > 0 && ratings[stack[stack.length - 1]] >= ratings[i]) {
            stack.pop();
        }
        
        stack.push(i);
        
        while (stack[0] < i - M + 1) {
            stack.shift();
        }
        
        if (i >= M - 1) {
            result.push(ratings[stack[0]]);
        }
    }
    
    return result;
}

function test() {
    const test1 = findWorstProducts(3, [12, 3, 8, 6, 5]);
    console.log("测试样例1:", JSON.stringify(test1) === '[3,3,5]' ? "通过" : "失败", test1);
    
    const test2 = findWorstProducts(2, [4, 3, 2, 1]);
    console.log("测试样例2:", JSON.stringify(test2) === '[3,2,1]' ? "通过" : "失败", test2);
    
    const test3 = findWorstProducts(1, [5, 4, 3, 2, 1]);
    console.log("测试样例3:", JSON.stringify(test3) === '[5,4,3,2,1]' ? "通过" : "失败", test3);
    
    const test4 = findWorstProducts(5, [1, 2, 3, 4, 5]);
    console.log("测试样例4:", JSON.stringify(test4) === '[1]' ? "通过" : "失败", test4);
}

test();