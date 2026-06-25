function findIt(input) {
    const lines = input.trim().split('\n');
    const [n,m] = lines[0].split(' ').map(Number);
    const target = lines[1];
    const grid = lines.slice(2).map(line => line.split(''));
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    let ans = 'NO'
    
    outer: for(let i=0; i<n; i++) {
        for(let j=0; j<m; j++) {
            if (grid[i][j] === target[0]) {
                const visited = Array(n).fill(false).map(() => Array(m).fill(false));
                if(dfs(i, j, 0, visited)) {
                    ans = `${i+1} ${j+1}`;
                    break outer;
                };
            }
        }
    }

    
    function dfs(x,y, idx, visited) {
        if (x <0 || y<0 || x>=n || y>=m) {
            return false;
        }
        if (visited[x][y]) {
            return false;
        }
        if (grid[x][y] !== target[idx]) {
            return false;
        }
        if (idx === target.length -1) {
            return true;
        }
        visited[x][y] = true;
        for(let [dx, dy] of dirs) {
            const px = dx + x, py = dy + y;
            if (dfs(px, py, idx+1, visited)) {
                return true
            }
        }
        visited[x][y] = false;
        return false;
    };

    return ans;
    
}

// 测试用例
function runTests() {
    const testCases = [
        {
            input: `5 5
HELLOWORLD
CPUCY
EKLQH
CHELL
LROWO
DGRBC`,
            expected: '3 2',
            description: '示例1：标准查找成功'
        },
        {
            input: `5 5
Helloworld
CPUCh
wolle
ordo
EKLQo
PGRBC`,
            expected: 'NO',
            description: '示例2：区分大小写导致查找失败'
        },
        {
            input: `3 3
XYZ
ABC
DEF
GHI`,
            expected: 'NO',
            description: '单词完全不存在于矩阵中'
        },
        {
            input: `3 3
A
ABC
DEF
GHI`,
            expected: '1 1',
            description: '单字符单词存在于矩阵中'
        },
        {
            input: `3 3
Z
ABC
DEF
GHI`,
            expected: 'NO',
            description: '单字符单词不存在于矩阵中'
        },
        {
            input: `3 4
LKJ
ABCD
EFGH
IJKL`,
            expected: '3 4',
            description: '单词起点在矩阵最后一个位置'
        },
        {
            input: `3 3
ABD
ABC
ABD
EAG`,
            expected: '2 1',
            description: '多个相同首字母，需回溯排除错误起点'
        },
        {
            input: `1 5
BCD
ABCDE`,
            expected: '1 2',
            description: '单行矩阵'
        },
        {
            input: `5 1
BCD
A
B
C
D
E`,
            expected: '2 1',
            description: '单列矩阵'
        },
        {
            input: `3 4
ABFJI
ABCD
EFGH
IJKL`,
            expected: '1 1',
            description: '蛇形路径（折线前进）'
        }
    ];

    let passed = 0;
    let failed = 0;

    testCases.forEach((test, index) => {
        const result = findIt(test.input);
        const success = result === test.expected;

        if (success) {
            passed++;
            console.log(`✓ 测试 ${index + 1}: ${test.description}`);
        } else {
            failed++;
            console.log(`✗ 测试 ${index + 1}: ${test.description}`);
            console.log(`  期望: ${test.expected}`);
            console.log(`  实际: ${result}`);
        }
    });

    console.log(`\n测试结果: ${passed}/${testCases.length} 通过`);
}

runTests();