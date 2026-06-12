// 方案B：用户建议的方案 - 二维数组预处理
function enhancedStrStr_v2(haystack, needle) {
    const n = haystack.length;
    const m = needle.length;

    if (m === 0) {
        return 0;
    }

    // 预处理：将needle转换为 [['a'],['t'],['b','x'],['c','y']]
    const patterns = [];
    let i = 0;
    while (i < m) {
        if (needle[i] === '[') {
            const chars = [];
            i++;
            while (i < m && needle[i] !== ']') {
                chars.push(needle[i]);
                i++;
            }
            patterns.push(chars);
            i++; // 跳过]
        } else {
            patterns.push([needle[i]]);
            i++;
        }
    }

    // 双指针匹配
    const patternLen = patterns.length;
    for (let start = 0; start < n; start++) {
        let pIdx = 0;
        let hIdx = start;

        while (pIdx < patternLen && hIdx < n) {
            const chars = patterns[pIdx];
            const currentChar = haystack[hIdx];

            // 检查当前haystack字符是否在当前pattern的可选字符中
            let matched = false;
            for (let j = 0; j < chars.length; j++) {
                if (chars[j] === currentChar) {
                    matched = true;
                    break;
                }
            }

            if (matched) {
                pIdx++;
                hIdx++;
            } else {
                break;
            }
        }

        if (pIdx === patternLen) {
            return start;
        }
    }

    return -1;
}

// 方案A：当前实现的段结构方案
function enhancedStrStr_v1(haystack, needle) {
    const n = haystack.length;
    const m = needle.length;

    if (m === 0) {
        return 0;
    }

    const segments = [];
    let i = 0;
    while (i < m) {
        if (needle[i] === '[') {
            let j = i + 1;
            const chars = [];
            while (j < m && needle[j] !== ']') {
                chars.push(needle[j]);
                j++;
            }
            segments.push({ type: 'optional', chars, length: j - i - 1 });
            i = j + 1;
        } else {
            segments.push({ type: 'normal', char: needle[i], length: 1 });
            i++;
        }
    }

    for (let start = 0; start < n; start++) {
        let segIdx = 0;
        let pos = start;

        while (segIdx < segments.length && pos < n) {
            const seg = segments[segIdx];

            if (seg.type === 'normal') {
                if (haystack[pos] === seg.char) {
                    pos++;
                    segIdx++;
                } else {
                    break;
                }
            } else {
                let matched = false;
                for (let c = 0; c < seg.chars.length; c++) {
                    if (haystack[pos] === seg.chars[c]) {
                        matched = true;
                        pos++;
                        segIdx++;
                        break;
                    }
                }
                if (!matched) {
                    break;
                }
            }
        }

        if (segIdx === segments.length) {
            return start;
        }
    }

    return -1;
}

const tests = [
    {
        name: "基本案例-原题示例",
        input: { haystack: "abcd", needle: "b[cd]" },
        expected: 1,
        description: "b[cd] -> [['b'],['c','d']]"
    },
    {
        name: "无匹配返回-1",
        input: { haystack: "abcd", needle: "e[fg]" },
        expected: -1,
        description: "e[fg] -> [['e'],['f','g']]"
    },
    {
        name: "精确匹配无可选段",
        input: { haystack: "hello", needle: "ello" },
        expected: 1,
        description: "ello -> [['e'],['l'],['l'],['o']]"
    },
    {
        name: "开头即可选段不匹配",
        input: { haystack: "hello", needle: "[ab]ello" },
        expected: -1,
        description: "[ab]ello -> [['a','b'],['e'],['l'],['l'],['o']]"
    },
    {
        name: "多个可选段",
        input: { haystack: "abcd", needle: "a[bx][cy]" },
        expected: 0,
        description: "a[bx][cy] -> [['a'],['b','x'],['c','y']]"
    },
    {
        name: "可选段在中间不匹配",
        input: { haystack: "abcdef", needle: "ab[xy]de" },
        expected: -1,
        description: "ab[xy]de -> [['a'],['b'],['x','y'],['d'],['e']]"
    },
    {
        name: "可选段不匹配",
        input: { haystack: "abcd", needle: "a[x]b" },
        expected: -1,
        description: "a[x]b -> [['a'],['x'],['b']]"
    },
    {
        name: "needle比haystack长",
        input: { haystack: "ab", needle: "abc[de]" },
        expected: -1,
        description: "abc[de] -> [['a'],['b'],['c'],['d','e']]"
    },
    {
        name: "空haystack",
        input: { haystack: "", needle: "a" },
        expected: -1,
        description: "a -> [['a']]"
    },
    {
        name: "匹配整个字符串",
        input: { haystack: "abc", needle: "[ab]bc" },
        expected: 0,
        description: "[ab]bc -> [['a','b'],['b'],['c']]"
    }
];

console.log("=".repeat(60));
console.log("方案A vs 方案B 对比测试");
console.log("=".repeat(60));

let passA = 0, failA = 0;
let passB = 0, failB = 0;

tests.forEach((test, index) => {
    const { name, input, expected, description } = test;

    const resultA = enhancedStrStr_v1(input.haystack, input.needle);
    const successA = resultA === expected;

    const resultB = enhancedStrStr_v2(input.haystack, input.needle);
    const successB = resultB === expected;

    console.log(`\n测试 ${index + 1}: ${name}`);
    console.log(`needle解析: ${description}`);
    console.log(`输入: haystack="${input.haystack}", needle="${input.needle}"`);
    console.log(`期望: ${expected} | 方案A: ${resultA} | 方案B: ${resultB}`);
    console.log(`结果: 方案A: ${successA ? '✅' : '❌'} | 方案B: ${successB ? '✅' : '❌'}`);

    if (successA) passA++; else failA++;
    if (successB) passB++; else failB++;
});

console.log("\n" + "=".repeat(60));
console.log(`方案A: ${passA} 通过, ${failA} 失败`);
console.log(`方案B: ${passB} 通过, ${failB} 失败`);
console.log("=".repeat(60));
