function queryCompressedLogs(input) {
    const lines = input.trim().split('\n');
    const [queryStart, queryEnd] = lines[0].split(',').map(BigInt);
    const N = parseInt(lines[1]);
    const logs = [];
    
    for (let i = 0; i < N; i++) {
        const [start, end, kpi] = lines[i + 2].split(',');
        logs.push({
            start: BigInt(start),
            end: BigInt(end),
            kpi: parseInt(kpi)
        });
    }
    
    const result = [];
    let currentTime = queryStart;
    
    while (currentTime <= queryEnd) {
        for (const log of logs) {
            if (currentTime >= log.start && currentTime <= log.end) {
                result.push(`${currentTime},${log.kpi}`);
                break;
            }
        }
        currentTime = addOneMinuteOptimized(currentTime);
    }
    
    if (result.length === 0) {
        return ['-1'];
    }
    
    return result;
}

function addOneMinuteOptimized(time) {
    const timeNum = Number(time);
    const minute = timeNum % 100;
    const hour = Math.floor(timeNum / 100) % 100;
    const day = Math.floor(timeNum / 10000) % 100;
    const month = Math.floor(timeNum / 1000000) % 100;
    const year = Math.floor(timeNum / 100000000);
    
    let newMinute = minute + 1;
    let newHour = hour;
    let newDay = day;
    let newMonth = month;
    let newYear = year;
    
    if (newMinute >= 60) {
        newMinute = 0;
        newHour++;
    }
    
    if (newHour >= 24) {
        newHour = 0;
        newDay++;
    }
    
    const daysInMonth = getDaysInMonth(newYear, newMonth);
    if (newDay > daysInMonth) {
        newDay = 1;
        newMonth++;
    }
    
    if (newMonth > 12) {
        newMonth = 1;
        newYear++;
    }
    
    return BigInt(
        `${newYear.toString().padStart(4, '0')}${newMonth.toString().padStart(2, '0')}${newDay.toString().padStart(2, '0')}${newHour.toString().padStart(2, '0')}${newMinute.toString().padStart(2, '0')}`
    );
}

function getDaysInMonth(year, month) {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2 && isLeapYear(year)) {
        return 29;
    }
    return daysInMonth[month - 1];
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function test() {
    const input1 = `202411231010,202411231013
4
202411231000,202411231010,11
202411231011,202411231012,10
202411231013,202411231020,16
202411231021,202411231028,17`;
    
    console.log("测试1:");
    console.log(queryCompressedLogs(input1).join('\n'));
}

test();