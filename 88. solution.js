/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function (s, words) {
    const wordLen = words[0].length;
    const len = words.length;
    const strLen = s.length;
    const totalLen = len * wordLen;
    if (totalLen > strLen) {
        return []
    }

    const cnt = new Map();
    for (let word of words) {
        cnt.set(word, (cnt.get(word) ?? 0) + 1)
    }

    const result = [];

    for (let i = 0; i < wordLen; i++) {
        let left = i; right = i;
        let curMap = new Map();
        let matchedCount = 0;
        while (right + wordLen <= strLen) {
            const word = s.substring(right, right + wordLen);
            right += wordLen;
            if (cnt.has(word)) {
                const curValue = curMap.get(word) || 0;
                curMap.set(word, curValue + 1);
                if (curValue + 1 <= cnt.get(word)) {
                    matchedCount++;
                }

                while ((right - left) / wordLen > len) {
                    const leftWord = s.substring(left, left + wordLen);
                    if (curMap.get(leftWord) <= cnt.get(leftWord)) {
                        matchedCount--;
                    }
                    curMap.set(leftWord, curMap.get(leftWord) - 1);
                    left += wordLen;
                }

                if (matchedCount === len) {
                    result.push(left);
                }

            } else {
                curMap.clear();
                matchedCount = 0;
                left = right;
            }

        }
    }

    return result;
};

function runTests() {
    const testCases = [
        {
            s: "barfoothefoobarman",
            words: ["foo", "bar"],
            expected: [0, 9],
            description: "示例1：基本情况，两个不同单词"
        },
        {
            s: "wordgoodgoodgoodbestword",
            words: ["word", "good", "best", "word"],
            expected: [],
            description: "示例2：无法匹配，单词重复但位置不对"
        },
        {
            s: "barfoofoobarthefoobarman",
            words: ["bar", "foo", "the"],
            expected: [6, 9, 12],
            description: "示例3：三个单词，多个匹配位置"
        },
        {
            s: "a",
            words: ["a"],
            expected: [0],
            description: "单个字符匹配"
        },
        {
            s: "ababa",
            words: ["ab", "ba"],
            expected: [],
            description: "单词长度为2，无有效匹配"
        },
        {
            s: "abcabc",
            words: ["abc"],
            expected: [0, 3],
            description: "words只有一个单词"
        },
        {
            s: "aaa",
            words: ["a", "a"],
            expected: [0, 1],
            description: "单词长度为1，重复单词"
        },
        {
            s: "abacabac",
            words: ["ab", "ac"],
            expected: [0, 2, 4],
            description: "连续分割匹配"
        },
        {
            s: "abcabc",
            words: ["ab", "bc", "ca"],
            expected: [0],
            description: "完全匹配，单词顺序不同但排列有效"
        },
        {
            s: "abcabc",
            words: ["abc", "abc"],
            expected: [0],
            description: "完全匹配，s长度等于总长度"
        },
        {
            s: "aaaaa",
            words: ["aa", "aa"],
            expected: [0, 1],
            description: "重复单词，多个匹配"
        }
    ];

    let passed = 0;
    let failed = 0;

    testCases.forEach((test, index) => {
        const result = findSubstring(test.s, test.words);
        const resultSorted = [...result].sort((a, b) => a - b);
        const expectedSorted = [...test.expected].sort((a, b) => a - b);
        const success = JSON.stringify(resultSorted) === JSON.stringify(expectedSorted);

        if (success) {
            passed++;
            console.log(`✓ 测试 ${index + 1}: ${test.description}`);
        } else {
            failed++;
            console.log(`✗ 测试 ${index + 1}: ${test.description}`);
            console.log(`  s: "${test.s}", words: [${test.words.map(w => `"${w}"`).join(', ')}]`);
            console.log(`  期望: [${expectedSorted.join(', ')}]`);
            console.log(`  实际: [${resultSorted.join(', ')}]`);
        }
    });

    console.log(`\n测试结果: ${passed}/${testCases.length} 通过`);
}

runTests();