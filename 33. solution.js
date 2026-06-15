function getCount(str) {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    const consonants = new Set(['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z']);
    const consonantsNoR = new Set(['b','c','d','f','g','h','j','k','l','m','n','p','q','s','t','v','w','x','y','z']);
    
    let count = 0;
    
    const words = str.trim().split(' ');
    
    for (const word of words) {
        let isPureLetter = true;
        for (const c of word) {
            if (!((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z'))) {
                isPureLetter = false;
                break;
            }
        }
        
        let processedWord = word.toLowerCase();
        if (isPureLetter) {
            processedWord = word.split('').reverse().join('').toLowerCase();
        }
        
        for (let i = 0; i <= processedWord.length - 4; i++) {
            const c1 = processedWord[i];
            const c2 = processedWord[i+1];
            const c3 = processedWord[i+2];
            const c4 = processedWord[i+3];
            
            if (consonants.has(c1) && vowels.has(c2) && consonantsNoR.has(c3) && c4 === 'e') {
                count++;
            }
        }
    }
    
    return count;
}

function test() {
    const testCases = [
        {
            name: "示例1 - 正常反转",
            input: "ekam a ekac",
            expected: 2
        },
        {
            name: "示例2 - 含非字母不反转",
            input: "!ekam a ekekac",
            expected: 2
        },
        {
            name: "单个单词",
            input: "ekam",
            expected: 1
        },
        {
            name: "多个开音节单词",
            input: "ekam ekac",
            expected: 2
        },
        {
            name: "无开音节",
            input: "hello world",
            expected: 0
        },
        {
            name: "纯数字不反转",
            input: "1234 5678",
            expected: 0
        },
        {
            name: "混合字符不反转",
            input: "abc123 def456",
            expected: 0
        },
        {
            name: "重叠开音节",
            input: "ekekac",
            expected: 2
        },
        {
            name: "短单词",
            input: "a b c",
            expected: 0
        },
        {
            name: "全非字母",
            input: "!@# $%^ &*()",
            expected: 0
        },
        {
            name: "多个单词混合",
            input: "ekam !test ekac 123 cake",
            expected: 2
        },
        {
            name: "大写字母",
            input: "EKAM EKAC",
            expected: 2
        }
    ];

    console.log("=".repeat(60));
    console.log("相对开音节测试用例（优化后）");
    console.log("=".repeat(60));
    console.log();

    let passed = 0;
    let failed = 0;

    for (const tc of testCases) {
        const result = getCount(tc.input);
        const expected = tc.expected;
        const isPassed = result === expected;

        if (isPassed) {
            passed++;
            console.log(`✅ ${tc.name}`);
        } else {
            failed++;
            console.log(`❌ ${tc.name}`);
        }
        console.log(`   输入: "${tc.input}"`);
        console.log(`   输出: ${result}`);
        console.log(`   预期: ${expected}`);
        console.log();
    }

    console.log("=".repeat(60));
    console.log(`测试结果: ${passed} 通过, ${failed} 失败`);
    console.log("=".repeat(60));
}

test();