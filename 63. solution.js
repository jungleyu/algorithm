function timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
}

function parseAppRegistration(line) {
    const parts = line.trim().split(/\s+/);
    if (parts.length !== 4) return null;

    const [name, priority, startTime, endTime] = parts;
    return {
        name,
        priority: parseInt(priority),
        start: timeToMinutes(startTime),
        end: timeToMinutes(endTime)
    };
}

function registerApps(registrations) {
    const registered = [];

    for (const app of registrations) {
        if (app.start >= app.end) {
            continue;
        }

        const conflicts = registered.filter(r =>
            !(app.end <= r.start || app.start >= r.end)
        );

        let canRegister = true;

        for (const conflict of conflicts) {
            if (conflict.priority > app.priority) {
                canRegister = false;
                break;
            } else if (conflict.priority === app.priority) {
                canRegister = false;
                break;
            } else {
                const idx = registered.indexOf(conflict);
                if (idx !== -1) {
                    registered.splice(idx, 1);
                }
            }
        }

        if (canRegister) {
            registered.push(app);
        }
    }

    return registered;
}

function queryApp(registered, timeStr) {
    const time = timeToMinutes(timeStr);

    for (const app of registered) {
        if (time >= app.start && time < app.end) {
            return app.name;
        }
    }

    return 'NA';
}

function test() {
    const testCases = [
        {
            input: [
                '1',
                'App1 1 09:00 10:00',
                '09:30'
            ],
            expected: 'App1'
        },
        {
            input: [
                '2',
                'App1 1 09:00 10:00',
                'App2 2 09:10 09:30',
                '09:20'
            ],
            expected: 'App2'
        },
        {
            input: [
                '2',
                'App1 1 09:00 10:00',
                'App2 2 09:10 09:30',
                '09:50'
            ],
            expected: 'NA'
        },
        {
            input: [
                '3',
                'App1 1 09:00 12:00',
                'App2 2 10:00 11:00',
                'App3 3 11:30 14:00',
                '11:30'
            ],
            expected: 'App3'
        }
    ];

    let passed = 0;
    let failed = 0;

    for (const tc of testCases) {
        const n = parseInt(tc.input[0]);
        const registrations = [];

        for (let i = 1; i <= n; i++) {
            const app = parseAppRegistration(tc.input[i]);
            if (app) registrations.push(app);
        }

        const queryTime = tc.input[n + 1];
        const registered = registerApps(registrations);
        const result = queryApp(registered, queryTime);

        if (result === tc.expected) {
            console.log(`✓ 测试通过: 输入 ${tc.input.join(', ')} => ${result}`);
            passed++;
        } else {
            console.log(`✗ 测试失败: 输入 ${tc.input.join(', ')}`);
            console.log(`  期望: ${tc.expected}, 实际: ${result}`);
            failed++;
        }
    }

    console.log(`\n总计: ${passed} 通过, ${failed} 失败`);
}

test();