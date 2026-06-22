function solve(input) {
    const lines = input.trim().split('\n');
    if (lines.length < 2) return 'ENCODE_ERROR';
    const cmd = parseInt(lines[0]);
    const str = lines[1];

    if (str.length > 1000) {
        return cmd === 1 ? 'ENCODE_ERROR' : 'DECODE_ERROR';
    }

    try {
        return cmd === 1 ? encode(str) : decode(str);
    } catch (e) {
        return cmd === 1 ? 'ENCODE_ERROR' : 'DECODE_ERROR';
    }
}

function encode(input) {
    const items = parseEncodeInput(input);
    const encoded = [];
    for (const item of items) {
        if (item.type === 'Integer' || item.type === 'String' || item.type === 'Compose') {
            encoded.push(encodeItem(item));
        }
    }
    return encoded.join('');
}

function parseEncodeInput(str) {
    const items = [];
    let i = 0;
    while (i < str.length) {
        while (i < str.length && (str[i] === ',' || str[i] === ' ')) i++;
        if (i >= str.length) break;
        if (str[i] === '[') {
            const result = parseEncodeItem(str, i);
            items.push(result.item);
            i = result.nextIdx;
        } else {
            i++;
        }
    }
    return items;
}

function parseEncodeItem(str, start) {
    let i = start + 1;

    let pos = '';
    while (i < str.length && str[i] !== ',') { pos += str[i]; i++; }
    if (i >= str.length) throw new Error();
    i++;

    while (i < str.length && str[i] === ' ') i++;

    let type = '';
    while (i < str.length && str[i] !== ',') { type += str[i]; i++; }
    if (i >= str.length) throw new Error();
    i++;

    while (i < str.length && str[i] === ' ') i++;

    if (type === 'Compose') {
        const nested = [];
        while (i < str.length && str[i] !== ']') {
            while (i < str.length && (str[i] === ',' || str[i] === ' ')) i++;
            if (i < str.length && str[i] === '[') {
                const res = parseEncodeItem(str, i);
                nested.push(res.item);
                i = res.nextIdx;
            } else if (i < str.length && str[i] !== ']') {
                i++;
            }
        }
        if (i >= str.length) throw new Error();
        i++;
        return { item: { position: parseInt(pos), type, value: nested }, nextIdx: i };
    } else {
        let val = '';
        while (i < str.length && str[i] !== ']') { val += str[i]; i++; }
        if (i >= str.length) throw new Error();
        i++;
        return { item: { position: parseInt(pos), type, value: val }, nextIdx: i };
    }
}

function encodeItem(item) {
    if (item.type === 'Compose') {
        const inner = item.value.map(encodeItem).join('');
        return `${item.position}#2#${inner.length}#${inner}`;
    } else if (item.type === 'String') {
        return `${item.position}#1#${item.value.length}#${item.value}`;
    } else {
        return `${item.position}#0#${String(item.value).length}#${item.value}`;
    }
}

function decode(input) {
    return decodeItems(input).map(formatDecodeItem).join(',');
}

function decodeItems(input) {
    const items = [];
    let i = 0;
    while (i < input.length) {
        const result = decodeItem(input, i);
        if (result === null) {
            i++;
            continue;
        }
        items.push(result.item);
        i = result.nextIdx;
    }
    return items;
}

function decodeItem(str, start) {
    if (start >= str.length) return null;
    let i = start;

    let pos = '';
    while (i < str.length && str[i] !== '#') {
        if (str[i] < '0' || str[i] > '9') return null;
        pos += str[i];
        i++;
    }
    if (i >= str.length || str[i] !== '#') return null;
    i++;

    const typeChar = str[i];
    if (typeChar < '0' || typeChar > '2') return null;
    i++;
    if (i >= str.length || str[i] !== '#') return null;
    i++;

    let lenStr = '';
    while (i < str.length && str[i] !== '#') {
        if (str[i] < '0' || str[i] > '9') return null;
        lenStr += str[i];
        i++;
    }
    if (i >= str.length || str[i] !== '#') return null;
    i++;

    const len = parseInt(lenStr);
    if (isNaN(len) || len < 0) return null;
    if (i + len > str.length) return null;

    const data = str.substring(i, i + len);
    i += len;

    let item;
    if (typeChar === '0') {
        item = { position: parseInt(pos), type: 'Integer', value: data };
    } else if (typeChar === '1') {
        item = { position: parseInt(pos), type: 'String', value: data };
    } else {
        const nestedItems = decodeItems(data);
        item = { position: parseInt(pos), type: 'Compose', value: nestedItems };
    }

    return { item, nextIdx: i };
}

function formatDecodeItem(item) {
    if (item.type === 'Compose') {
        return `[${item.position},Compose,${item.value.map(formatDecodeItem).join(',')}]`;
    } else if (item.type === 'String') {
        return `[${item.position},String,${item.value}]`;
    } else {
        return `[${item.position},Integer,${item.value}]`;
    }
}

function runTests() {
    const testCases = [
        {
            input: `1
[1,String,I am Mary],[2,Integer,23],[3,Long,100000],[4,Compose,[1,String,I am Kitty],[2,Integer,44]]`,
            expected: '1#1#9#I am Mary2#0#2#234#2#25#1#1#10#I am Kitty2#0#2#44',
            description: '示例1：编码，过滤Long类型'
        },
        {
            input: `2
1#1#9#I am Mary2#0#2#233#0#3#8794#2#25#1#1#10#I am Kitty2#0#2#44`,
            expected: '[1,String,I am Mary],[2,Integer,23],[3,Integer,879],[4,Compose,[1,String,I am Kitty],[2,Integer,44]]',
            description: '示例2：解码'
        },
        {
            input: `1
[1,Integer,42]`,
            expected: '1#0#2#42',
            description: '单个Integer编码'
        },
        {
            input: `2
1#0#2#42`,
            expected: '[1,Integer,42]',
            description: '单个Integer解码'
        },
        {
            input: `1
[1,String,Hello]`,
            expected: '1#1#5#Hello',
            description: '单个String编码'
        },
        {
            input: `2
1#1#5#Hello`,
            expected: '[1,String,Hello]',
            description: '单个String解码'
        },
        {
            input: `1
[1,Float,3.14]`,
            expected: '',
            description: '不支持的Float类型被过滤'
        },
        {
            input: `2
1#1#5#Hello2#0#1#5`,
            expected: '[1,String,Hello],[2,Integer,5]',
            description: '解码多个连续数据'
        },
        {
            input: `1
[1,Compose,[1,Integer,1],[2,Compose,[1,String,Hi]]]`,
            expected: '1#2#21#1#0#1#12#2#8#1#1#2#Hi',
            description: '编码双层嵌套Compose'
        },
        {
            input: `2
1#2#21#1#0#1#12#2#8#1#1#2#Hi`,
            expected: '[1,Compose,[1,Integer,1],[2,Compose,[1,String,Hi]]]',
            description: '解码双层嵌套Compose'
        }
    ];

    let passed = 0;
    let failed = 0;

    testCases.forEach((test, index) => {
        const result = solve(test.input);
        const success = result === test.expected;

        if (success) {
            passed++;
            console.log(`\u2713 测试 ${index + 1}: ${test.description}`);
        } else {
            failed++;
            console.log(`\u2717 测试 ${index + 1}: ${test.description}`);
            console.log(`  期望: ${test.expected}`);
            console.log(`  实际: ${result}`);
        }
    });

    console.log(`\n测试结果: ${passed}/${testCases.length} 通过`);
}

runTests();
