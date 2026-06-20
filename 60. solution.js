function sortLogs(logs) {
    const sorted = logs.sort((a, b) => {
        const [h, m, s] = a.split(':').map(Number);
        const [h1, m1, s1] = b.split(':').map(Number);
        if (h !== h1) {
            return h - h1;
        }
        if (m !== m1) {
            return m - m1;
        }
        return s - s1;
    });
    sorted.forEach(log => console.log(log));
}

sortLogs(['01:41:8.9', '1:1:09.211']);
sortLogs(['23:41:08.023', '1:1:09.211', '08:01:22.0']);
sortLogs(['22:41:08.023', '22:41:08.23']);

function testSortLogs() {
    const testCases = [
        {
            name: "示例1",
            input: ['01:41:8.9', '1:1:09.211'],
            expected: ['1:1:09.211', '01:41:8.9']
        },
        {
            name: "示例2",
            input: ['23:41:08.023', '1:1:09.211', '08:01:22.0'],
            expected: ['1:1:09.211', '08:01:22.0', '23:41:08.023']
        },
        {
            name: "示例3-相同时间保持顺序",
            input: ['22:41:08.023', '22:41:08.23'],
            expected: ['22:41:08.023', '22:41:08.23']
        },
        {
            name: "单条日志",
            input: ['12:30:45.500'],
            expected: ['12:30:45.500']
        },
        {
            name: "多条日志排序",
            input: ['0:0:0.0', '23:59:59.999', '12:0:0.0'],
            expected: ['0:0:0.0', '12:0:0.0', '23:59:59.999']
        }
    ];

    let allPass = true;
    for (const tc of testCases) {
        const result = [...tc.input].sort((a, b) => {
            const [h, m, s] = a.split(':').map(Number);
            const [h1, m1, s1] = b.split(':').map(Number);
            if (h !== h1) return h - h1;
            if (m !== m1) return m - m1;
            return s - s1;
        });
        
        const passed = JSON.stringify(result) === JSON.stringify(tc.expected);
        if (!passed) allPass = false;
        console.log(`${tc.name} 测试${passed ? "通过" : "失败"}`);
        if (!passed) {
            console.log(`  期望: ${tc.expected}`);
            console.log(`  实际: ${result}`);
        }
    }
    console.log(`\n总计: ${allPass ? "全部通过" : "有失败"}`);
}

// 运行测试
testSortLogs();

