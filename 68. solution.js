function ipToInt(ip) {
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet), 0) >>> 0;
}

function findCityByIP(ipSegments, ip) {
    const target = ipToInt(ip);
    let bestCity = '';
    let minLength = Infinity;

    for (const segment of ipSegments) {
        if (target >= segment.start && target <= segment.end) {
            const length = segment.end - segment.start;
            if (length < minLength) {
                minLength = length;
                bestCity = segment.city;
            }
        }
    }

    return bestCity;
}

function solve(input) {
    const lines = input.trim().split('\n');
    if (lines.length < 2) return '';

    const ipSegmentStr = lines[0];
    const queryIps = lines[1].split(',');

    const ipSegments = [];
    const segments = ipSegmentStr.split(';');

    for (const segment of segments) {
        if (!segment || !segment.includes('=')) continue;
        const [cityPart, ipRange] = segment.split('=');
        if (!ipRange) continue;
        const [startIp, endIp] = ipRange.split(',');
        ipSegments.push({
            city: cityPart,
            start: ipToInt(startIp),
            end: ipToInt(endIp)
        });
    }

    const results = queryIps.map(ip => findCityByIP(ipSegments, ip.trim()));
    return results.join(',');
}

function test() {
    const testCases = [
        {
            input: `City1=1.1.1.1,1.1.1.2;City1=1.1.1.11,1.1.1.16;City2=3.3.3.3,4.4.4.4;City3=2.2.2.2,6.6.6.6
1.1.1.15,3.3.3.5,2.2.2.3`,
            expected: 'City1,City2,City3',
            description: '示例测试'
        },
        {
            input: `A=10.0.0.1,10.0.0.10;B=10.0.0.5,10.0.0.8;C=10.0.0.1,10.0.0.255
10.0.0.6,10.0.0.15,10.0.0.254`,
            expected: 'B,C,C',
            description: '嵌套IP段测试'
        },
        {
            input: `CityA=192.168.0.1,192.168.0.255;CityB=192.168.0.100,192.168.0.200
192.168.0.150,192.168.0.50,192.168.0.250`,
            expected: 'CityB,CityA,CityA',
            description: '部分重叠测试'
        },
        {
            input: `Server1=1.2.3.4,1.2.3.4;Server2=5.6.7.8,5.6.7.8
1.2.3.4,5.6.7.8,9.10.11.12`,
            expected: 'Server1,Server2,',
            description: '单IP匹配与未匹配测试'
        },
        {
            input: `CN=1.0.0.0,1.255.255.255;US=2.0.0.0,2.255.255.255;JP=3.0.0.0,3.255.255.255
1.1.1.1,2.2.2.2,3.3.3.3,4.4.4.4`,
            expected: 'CN,US,JP,',
            description: '不同国家IP段测试'
        },
        {
            input: `Inner=100.100.100.100,100.100.100.200;Outer=100.100.100.1,100.100.100.255;Middle=100.100.100.50,100.100.100.250
100.100.100.150,100.100.100.25,100.100.100.220`,
            expected: 'Inner,Outer,Middle',
            description: '三层嵌套测试'
        },
        {
            input: `CityX=192.168.1.0,192.168.1.255;CityY=192.168.0.0,192.168.255.255
192.168.1.100,192.168.2.100`,
            expected: 'CityX,CityY',
            description: '大小网段测试'
        },
        {
            input: `a=0.0.0.0,0.0.0.0;b=255.255.255.255,255.255.255.255
0.0.0.0,255.255.255.255,127.0.0.1`,
            expected: 'a,b,',
            description: '边界IP测试'
        },
        {
            input: `TestCity=172.16.0.1,172.16.0.100;TestCity=172.16.1.1,172.16.1.100
172.16.0.50,172.16.1.50,172.16.2.50`,
            expected: 'TestCity,TestCity,',
            description: '同一城市多个IP段测试'
        },
        {
            input: `A=1.1.1.1,1.1.1.1
1.1.1.1`,
            expected: 'A',
            description: '简单单IP测试'
        }
    ];

    console.log('='.repeat(60));
    console.log('根据IP查找城市 - 测试用例');
    console.log('='.repeat(60));

    let passed = 0;
    let failed = 0;

    testCases.forEach((tc, index) => {
        const actual = solve(tc.input);
        const isPassed = actual === tc.expected;
        
        console.log(`\n测试用例 ${index + 1}: ${tc.description}`);
        console.log(`输入:\n${tc.input}`);
        console.log(`期望输出: ${tc.expected}`);
        console.log(`实际输出: ${actual}`);
        console.log(`结果: ${isPassed ? '✅ 通过' : '❌ 失败'}`);

        if (isPassed) passed++;
        else failed++;
    });

    console.log('\n' + '='.repeat(60));
    console.log(`测试结果: ${passed} 通过, ${failed} 失败`);
    console.log('='.repeat(60));
}

test();