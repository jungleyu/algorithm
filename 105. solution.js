/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
    const ans = [];
    let i = 0;
    const n = intervals.length;
    while (i < n && intervals[i][1] < newInterval[0]) {
        ans.push(intervals[i]);
        i++;
    }
    while (i < n && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    ans.push(newInterval);

    while (i < n) {
        ans.push(intervals[i]);
        i++;
    }
    return ans;
};

function testInsert() {
    const testCases = [
        { intervals: [], newInterval: [5,7], expected: [[5,7]], desc: "空区间列表" },
        { intervals: [[1,3],[6,9]], newInterval: [2,5], expected: [[1,5],[6,9]], desc: "标准示例1" },
        { intervals: [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval: [4,8], expected: [[1,2],[3,10],[12,16]], desc: "标准示例2" },
        { intervals: [[1,5]], newInterval: [2,3], expected: [[1,5]], desc: "新区间完全在已有区间内" },
        { intervals: [[1,5]], newInterval: [0,6], expected: [[0,6]], desc: "新区间覆盖已有区间" },
        { intervals: [[1,5]], newInterval: [-1,0], expected: [[-1,0],[1,5]], desc: "新区间在已有区间之前" },
        { intervals: [[1,5]], newInterval: [6,8], expected: [[1,5],[6,8]], desc: "新区间在已有区间之后" },
        { intervals: [[1,2],[5,9]], newInterval: [3,4], expected: [[1,2],[3,4],[5,9]], desc: "新区间在两个区间的间隙中" },
        { intervals: [[1,2],[5,9]], newInterval: [2,5], expected: [[1,9]], desc: "新区间连接两个相邻区间" },
        { intervals: [[1,3],[4,6],[8,10]], newInterval: [5,7], expected: [[1,3],[4,7],[8,10]], desc: "新区间合并一个区间" },
        { intervals: [[1,10]], newInterval: [2,3], expected: [[1,10]], desc: "单个大区间，新区间在内部" },
        { intervals: [[1,10]], newInterval: [-5,15], expected: [[-5,15]], desc: "单个区间，新区间覆盖" },
        { intervals: [[1,3],[4,6],[7,9]], newInterval: [0,10], expected: [[0,10]], desc: "新区间覆盖所有区间" },
        { intervals: [[1,3],[6,8],[11,13]], newInterval: [0,0], expected: [[0,0],[1,3],[6,8],[11,13]], desc: "新区间为单个点，在最前面" },
        { intervals: [[1,3],[6,8],[11,13]], newInterval: [14,14], expected: [[1,3],[6,8],[11,13],[14,14]], desc: "新区间为单个点，在最后面" },
        { intervals: [[1,3],[6,8],[11,13]], newInterval: [4,5], expected: [[1,3],[4,5],[6,8],[11,13]], desc: "新区间在间隙中" },
        { intervals: [[1,5],[10,15]], newInterval: [5,10], expected: [[1,15]], desc: "新区间连接两个端点接触的区间" },
        { intervals: [[1,5],[10,15]], newInterval: [6,9], expected: [[1,5],[6,9],[10,15]], desc: "新区间在两个区间之间" },
        { intervals: [[1,4],[5,7],[8,12]], newInterval: [3,10], expected: [[1,12]], desc: "新区间合并所有区间" },
        { intervals: [[1,2],[3,4],[5,6]], newInterval: [0,7], expected: [[0,7]], desc: "新区间完全覆盖所有区间" },
        { intervals: [[1,2],[4,5],[7,8]], newInterval: [3,6], expected: [[1,2],[3,6],[7,8]], desc: "新区间合并一个区间" },
        { intervals: [[1,3],[5,7],[9,11]], newInterval: [0,12], expected: [[0,12]], desc: "新区间从前面覆盖到后面" },
        { intervals: [[10,20],[30,40],[50,60]], newInterval: [15,45], expected: [[10,45],[50,60]], desc: "新区间合并前两个区间" },
        { intervals: [[10,20],[30,40],[50,60]], newInterval: [25,55], expected: [[10,20],[25,60]], desc: "新区间合并后两个区间" },
        { intervals: [[0,0],[2,2],[5,5]], newInterval: [1,1], expected: [[0,0],[1,1],[2,2],[5,5]], desc: "单点区间，插入单点" },
        { intervals: [[0,0],[1,1],[2,2]], newInterval: [0,2], expected: [[0,2]], desc: "单点区间，新区间合并" },
        { intervals: [[1,100]], newInterval: [50,50], expected: [[1,100]], desc: "大区间内插入单点" },
        { intervals: [[1,5],[8,10],[12,15]], newInterval: [6,7], expected: [[1,5],[6,7],[8,10],[12,15]], desc: "新区间在第一个间隙" },
        { intervals: [[1,5],[8,10],[12,15]], newInterval: [11,11], expected: [[1,5],[8,10],[11,11],[12,15]], desc: "新区间在第二个间隙" },
        { intervals: [[1,3],[7,9]], newInterval: [4,6], expected: [[1,3],[4,6],[7,9]], desc: "新区间在中间间隙" }
    ];

    let passed = 0;
    let failed = 0;

    testCases.forEach((tc, index) => {
        const result = insert(tc.intervals, tc.newInterval);
        const isEqual = JSON.stringify(result) === JSON.stringify(tc.expected);
        const status = isEqual ? '✓' : '✗';
        if (isEqual) {
            passed++;
        } else {
            failed++;
        }
        console.log(`测试用例 ${index + 1}: ${status}`);
        console.log(`  描述: ${tc.desc}`);
        console.log(`  输入: intervals = ${JSON.stringify(tc.intervals)}, newInterval = ${JSON.stringify(tc.newInterval)}`);
        console.log(`  预期: ${JSON.stringify(tc.expected)}`);
        console.log(`  实际: ${JSON.stringify(result)}`);
        console.log('');
    });

    console.log(`\n测试结果: ${passed} 个通过, ${failed} 个失败`);
}

testInsert();