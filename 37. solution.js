function getSquare(input) { 
    input = input.split('\n'); 
    let n = parseInt(input[0]); 
    input.shift(); 
    let points = input.map(point => point.split(' ').map(Number)); 
    
    // 去重处理
    const uniquePoints = [...new Set(points.map(([x,y]) => `${x},${y}`))];
    points = uniquePoints.map(s => s.split(',').map(Number));
    n = points.length;
    
    const pointSets = new Set(uniquePoints); 
    let ans = 0; 
    
    for(let i=0; i<n; i++) { 
        for(let j=i+1; j<n; j++) { 
            const p1 = points[i], p2 = points[j]; 
            const [x1, y1] = p1, [x2, y2] = p2; 
            const midx = (x1+x2)/2, midy = (y1+y2)/2; 
            const dx = (x2-x1)/2, dy = (y2-y1)/2; 
            const p3 = [midx-dy, midy+dx]; 
            const p4 = [midx+dy, midy-dx]; 
            if (pointSets.has(`${p3[0]},${p3[1]}`) && pointSets.has(`${p4[0]},${p4[1]}`)) { 
                ans++; 
            } 
        } 
    } 
    return ans/2; 
} 

function generateTestCases() {
    const testCases = [];

    testCases.push({
        name: "3个点",
        input: "3\n1 3\n2 4\n3 1",
        expected: 0
    });

    testCases.push({
        name: "4个点构成正方形",
        input: "4\n0 0\n1 2\n3 1\n2 -1",
        expected: 1
    });

    testCases.push({
        name: "含重复点",
        input: "6\n0 0\n0 0\n1 2\n3 1\n2 -1\n0 0",
        expected: 1
    });

    testCases.push({
        name: "标准正方形",
        input: "4\n0 0\n0 1\n1 0\n1 1",
        expected: 1
    });

    testCases.push({
        name: "两个重叠正方形",
        input: "5\n0 0\n0 1\n1 0\n1 1\n0.5 0.5",
        expected: 1
    });

    testCases.push({
        name: "多个正方形",
        input: "9\n0 0\n0 1\n1 0\n1 1\n2 0\n2 1\n3 0\n3 1\n1 2",
        expected: 4
    });

    return testCases;
}

function runTests() {
    const testCases = generateTestCases();
    let passed = 0;
    let failed = 0;

    for (const tc of testCases) {
        const result = getSquare(tc.input);
        const status = Math.abs(result - tc.expected) < 0.001 ? "通过" : "失败";
        if (status === "通过") {
            passed++;
        } else {
            failed++;
        }
        console.log(`${tc.name} 测试${status}: 期望 ${tc.expected}, 实际 ${result}`);
    }

    console.log(`\n总计: ${passed} 通过, ${failed} 失败`);
}

runTests();