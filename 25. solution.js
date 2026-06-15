function findMaxDivisibleNumber(inputStr, inputDivisor) { //(ewr23hik064ASM12VBG, 4)
    let ans = -1;

    function isNumber(c) {
        return c >= '0' && c <= '9';
    }

    function isChar(c) {
        return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
    }

    function processNumStr(numStr) {
        if (numStr.length > 0) {
            const num = parseInt(numStr);
            if (num <= 999 && num > ans && num % inputDivisor === 0) {
                ans = num;
            }
        }
    }

    let numStr = '';
    for (let i = 0; i < inputStr.length; i++) {
        if (!isNumber(inputStr[i]) && !isChar(inputStr[i])) {
            return -1;
        }
        if (isNumber(inputStr[i])) {
            numStr += inputStr[i];
        } else {
            processNumStr(numStr);
            numStr = '';
        }
    }

    processNumStr(numStr);
    
    return ans;
}

function test() {
    console.log("测试样例1:", findMaxDivisibleNumber("abc123EFGED34aadD78er", 2) === 78 ? "通过" : "失败");
    console.log("测试样例2:", findMaxDivisibleNumber("nvvgr1.0verde-", 3) === -1 ? "通过" : "失败");
    console.log("测试样例3:", findMaxDivisibleNumber("ewr23hik064ASM12VBG", 4) === 64 ? "通过" : "失败");
    console.log("测试样例4:", findMaxDivisibleNumber("ewr23hik064ASM12VBG", 5) === -1 ? "通过" : "失败");
    console.log("测试样例5:", findMaxDivisibleNumber("29a0b03", 3) === 3 ? "通过" : "失败");
    console.log("测试样例6:", findMaxDivisibleNumber("0abc123", 3) === 123 ? "通过" : "失败");
    console.log("测试样例7:", findMaxDivisibleNumber("064", 4) === 64 ? "通过" : "失败");
    console.log("测试样例8:", findMaxDivisibleNumber("1000", 2) === -1 ? "通过" : "失败");
    console.log("测试样例9:", findMaxDivisibleNumber("0", 1) === 0 ? "通过" : "失败");
    console.log("测试样例10:", findMaxDivisibleNumber("a", 5) === -1 ? "通过" : "失败");
}

test();