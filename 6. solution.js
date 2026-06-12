// 方案一：逐字符状态机实现
function countStatements(input) {
    let count = 0;
    let currentStatement = '';
    let inQuote = false;
    let quote = '';
    let inComment = false;
    let escapeNext = false;

    for (let i = 0; i < input.length; i++) {
        const char = input[i];

        if (escapeNext) {
            currentStatement += char;
            escapeNext = false;
            continue;
        }

        if (inComment) {
            if (char === '\n') {
                inComment = false;
            }
            continue;
        }

        if (inQuote) {
            if (char === '\\') {
                escapeNext = true;
            } else if (char === quote) {
                inQuote = false;
            }
            currentStatement += char;
            continue;
        }

        if (char === '-' && input[i + 1] === '-') {
            inComment = true;
            i++;
            continue;
        }

        if (char === ';') {
            if (currentStatement.trim() !== '') {
                count++;
            }
            currentStatement = '';
            continue;
        }

        if (char === '\'' || char === '\"') {
            inQuote = true;
            quote = char;
            currentStatement += char;
            continue;
        }

        currentStatement += char;
    }

    if (currentStatement.trim() !== '') {
        count++;
    }

    return count;
}

// 方案二：基于正则表达式的简洁实现
function countStatementsRegex(input) {
    const stringPattern = /'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"/g;
    input = input.replace(stringPattern, (match) => {
        const placeholder = `__STR_${1}__`;
        return placeholder;
    });

    const lines = input.trim().split('\n');
    const ans = [];
    let temp = '';

    for (let line of lines) {
        const matchComments = line.match(/--.*$/);
        if (matchComments && matchComments.index >= 0) {
            line = line.slice(0, matchComments.index)
        }
        const lineArr = line.trim().split(';');
        if (lineArr.length === 1) {
            temp += lineArr[0];
            continue;
        }
        for (let sentence of lineArr) {
            if ('' === sentence.trim()) {
                temp += sentence;
            } else {
                ans.push(temp + sentence);
                temp = '';
            }
        }
    }
    if (temp.trim() !== '') {
        ans.push(temp);
    }
    return ans.length;
}

// 测试用例
const tests = [
    {
        name: '示例1',
        input: `COMMAND TABLE IF EXISTS "UNITED STATE";
COMMAND A GREAT (
ID ADSAB,
download_length INTE-GER, -- test
file_name TEXT,
guid TEXT,
mime_type TEXT,
notifica-tionid INTEGER,
original_file_name TEXT,
pause_reason_type INTEGER,
resumable_flag INTEGER,
start_time INTEGER,
state INTEGER,
folder TEXT,
path TEXT,
total_length INTE-GER,
url TEXT
);`,
        expected: 2
    },
    {
        name: '单条语句',
        input: 'COMMAND A;',
        expected: 1
    },
    {
        name: '多条语句',
        input: 'COMMAND A; COMMAND B; COMMAND C',
        expected: 3
    },
    {
        name: '空语句不计入',
        input: 'COMMAND A; ; COMMAND B',
        expected: 2
    },
    {
        name: '跨行语句',
        input: `COMMAND A
AND
COMMAND B;`,
        expected: 1
    },
    {
        name: '字符串中的引号和转义',
        input: 'COMMAND A "Say \\"hello\\"";',
        expected: 1
    },
    {
        name: '注释测试',
        input: `COMMAND A; --this is comment
COMMAND B --comment
AND COMMAND C;`,
        expected: 2
    },
    {
        name: '字符串内的--不是注释',
        input: 'COMMAND A "--test--"; COMMAND B;',
        expected: 2
    },
    {
        name: '末尾无分号',
        input: 'COMMAND A; COMMAND B',
        expected: 2
    },
    {
        name: '复杂混合场景',
        input: `-- header comment
SELECT * FROM 'table'; -- inline comment
INSERT INTO "my table" VALUES ('a', "\\"b\\"");
UPDATE test SET a=1 WHERE id=2`,
        expected: 3
    }
];

// 运行测试
let passed1 = 0, failed1 = 0;
let passed2 = 0, failed2 = 0;

console.log('='.repeat(60));
console.log('方案一: 逐字符状态机');
console.log('='.repeat(60));

tests.forEach((test, index) => {
    const result = countStatements(test.input);
    const success = result === test.expected;

    console.log(`\n测试 ${index + 1}: ${test.name}`);
    console.log(`期望: ${test.expected}`);
    console.log(`实际: ${result}`);
    console.log(`结果: ${success ? '✅ 通过' : '❌ 失败'}`);

    if (success) passed1++; else failed1++;
});

console.log('\n' + '='.repeat(60));
console.log(`测试完成: ${passed1} 通过, ${failed1} 失败`);
console.log('='.repeat(60));

console.log('\n\n' + '='.repeat(60));
console.log('方案二: 正则表达式');
console.log('='.repeat(60));

tests.forEach((test, index) => {
    const result = countStatementsRegex(test.input);
    const success = result === test.expected;

    console.log(`\n测试 ${index + 1}: ${test.name}`);
    console.log(`期望: ${test.expected}`);
    console.log(`实际: ${result}`);
    console.log(`结果: ${success ? '✅ 通过' : '❌ 失败'}`);

    if (success) passed2++; else failed2++;
});

console.log('\n' + '='.repeat(60));
console.log(`测试完成: ${passed2} 通过, ${failed2} 失败`);
console.log('='.repeat(60));
