function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
    const dummy = new ListNode(0, head);
    let cur = dummy;
    while (cur.next && cur.next.next) {
        let val = cur.next.val;
        if (val === cur.next.next.val) {
            while (cur.next && cur.next.val === val) {
                cur.next = cur.next.next;
            }
        } else {
            cur = cur.next;
        }
    }
    return dummy.next;
};

function arrayToList(arr) {
    if (!arr || arr.length === 0) return null;
    const head = new ListNode(arr[0]);
    let cur = head;
    for (let i = 1; i < arr.length; i++) {
        cur.next = new ListNode(arr[i]);
        cur = cur.next;
    }
    return head;
}

function listToArray(head) {
    const arr = [];
    let cur = head;
    while (cur) {
        arr.push(cur.val);
        cur = cur.next;
    }
    return arr;
}

function testDeleteDuplicates() {
    const testCases = [
        { input: [], expected: [], desc: "空链表" },
        { input: [1], expected: [1], desc: "单个节点" },
        { input: [1, 1], expected: [], desc: "两个相同节点，全部删除" },
        { input: [1, 2, 3], expected: [1, 2, 3], desc: "无重复节点" },
        { input: [1, 1, 2, 3], expected: [2, 3], desc: "头部重复" },
        { input: [1, 2, 3, 3], expected: [1, 2], desc: "尾部重复" },
        { input: [1, 1, 2, 2, 3], expected: [3], desc: "多个重复组" },
        { input: [1, 1, 2, 2, 3, 3], expected: [], desc: "所有节点都重复，全部删除" },
        { input: [1, 2, 3, 3, 4, 4, 5], expected: [1, 2, 5], desc: "标准示例1" },
        { input: [1, 1, 1, 2, 3], expected: [2, 3], desc: "标准示例2" },
        { input: [1, 1, 2, 3, 3], expected: [2], desc: "头部和尾部都重复" },
        { input: [0, 0, 0, 0], expected: [], desc: "所有元素相同" },
        { input: [-1, -1, 0, 0, 1, 1], expected: [], desc: "负数全部重复" },
        { input: [-2, -1, -1, 0, 1], expected: [-2, 0, 1], desc: "负数部分重复" },
        { input: [1, 1, 1], expected: [], desc: "三个相同节点" }
    ];

    let passed = 0;
    let failed = 0;

    testCases.forEach((tc, index) => {
        const head = arrayToList(tc.input);
        const result = deleteDuplicates(head);
        const resultArr = listToArray(result);
        const arrMatch = JSON.stringify(resultArr) === JSON.stringify(tc.expected);
        const status = arrMatch ? '✓' : '✗';
        if (arrMatch) {
            passed++;
        } else {
            failed++;
        }
        console.log(`测试用例 ${index + 1}: ${status}`);
        console.log(`  描述: ${tc.desc}`);
        console.log(`  输入: [${tc.input}]`);
        console.log(`  预期: [${tc.expected}], 实际: [${resultArr}]`);
        console.log('');
    });

    console.log(`\n测试结果: ${passed} 个通过, ${failed} 个失败`);
}

testDeleteDuplicates();