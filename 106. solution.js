/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
    let i = s.length - 1;
    while (s[i] === ' ') {
        i--;
    }
    let ans = 0;
    while (s[i] !== ' ' && i >= 0) {
        i--;
        ans++;
    }
    return ans;
};

function testLengthOfLastWord() {
    const testCases = [
        { s: "Hello World", expected: 5, desc: "标准示例1" },
        { s: "   fly me   to   the moon  ", expected: 4, desc: "标准示例2" },
        { s: "luffy is still joyboy", expected: 6, desc: "标准示例3" },
        { s: "a", expected: 1, desc: "单个字符" },
        { s: "   a", expected: 1, desc: "单个字符，前面有空格" },
        { s: "a   ", expected: 1, desc: "单个字符，后面有空格" },
        { s: "   a   ", expected: 1, desc: "单个字符，前后都有空格" },
        { s: "abc", expected: 3, desc: "单个单词，无空格" },
        { s: "abc ", expected: 3, desc: "单个单词，后面有空格" },
        { s: " abc", expected: 3, desc: "单个单词，前面有空格" },
        { s: " abc ", expected: 3, desc: "单个单词，前后都有空格" },
        { s: "a b c", expected: 1, desc: "多个单字符单词" },
        { s: "a bb ccc", expected: 3, desc: "多个单词，最后一个最长" },
        { s: "Hello   ", expected: 5, desc: "单个单词，多个尾部空格" },
        { s: "   Hello", expected: 5, desc: "单个单词，多个前部空格" },
        { s: "Hello   World", expected: 5, desc: "两个单词，多个中间空格" },
        { s: "Hello World   ", expected: 5, desc: "两个单词，尾部多个空格" },
        { s: "   Hello World", expected: 5, desc: "两个单词，前部多个空格" },
        { s: "   Hello   World   ", expected: 5, desc: "两个单词，前后中间都有多个空格" },
        { s: "One Two Three Four Five", expected: 4, desc: "多个单词" },
        { s: "a b c d e f g", expected: 1, desc: "多个单字符单词" },
        { s: "test", expected: 4, desc: "普通单词" },
        { s: "test123", expected: 7, desc: "含数字的单词" },
        { s: "TEST", expected: 4, desc: "大写单词" },
        { s: "tEsT", expected: 4, desc: "大小写混合单词" },
        { s: "HelloWorld", expected: 10, desc: "连续字母，无空格" },
        { s: "a " + " ".repeat(100) + "b", expected: 1, desc: "大量中间空格" },
        { s: "word" + " ".repeat(100), expected: 4, desc: "大量尾部空格" },
        { s: " ".repeat(100) + "word", expected: 4, desc: "大量前部空格" },
        { s: "x", expected: 1, desc: "单个字母x" }
    ];

    let passed = 0;
    let failed = 0;

    testCases.forEach((tc, index) => {
        const result = lengthOfLastWord(tc.s);
        const status = result === tc.expected ? '✓' : '✗';
        if (result === tc.expected) {
            passed++;
        } else {
            failed++;
        }
        console.log(`测试用例 ${index + 1}: ${status}`);
        console.log(`  描述: ${tc.desc}`);
        console.log(`  输入: s = "${tc.s.length > 30 ? tc.s.substring(0, 30) + '...' : tc.s}" (长度: ${tc.s.length})`);
        console.log(`  预期: ${tc.expected}, 实际: ${result}`);
        console.log('');
    });

    console.log(`\n测试结果: ${passed} 个通过, ${failed} 个失败`);
}

testLengthOfLastWord();