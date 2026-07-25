function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}

/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
    let small = new ListNode();
    let large = new ListNode();
    const smallHead = small;
    const largeHead = large;
    while (head) {
        if (head.val < x) {
            small.next = head;
            small = small.next;
        } else {
            large.next = head;
            large = large.next;
        }
        head = head.next;
    }
    large.next = null;
    small.next = largeHead.next;
    return smallHead.next;
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

function testPartition() {
    const testCases = [
        { input: [], x: 3, expected: [], desc: "空链表" },
        { input: [1], x: 0, expected: [1], desc: "单个节点，节点值大于x" },
        { input: [1], x: 2, expected: [1], desc: "单个节点，节点值小于x" },
        { input: [1], x: 1, expected: [1], desc: "单个节点，节点值等于x" },
        { input: [1, 4, 3, 2, 5, 2], x: 3, expected: [1, 2, 2, 4, 3, 5], desc: "标准示例1" },
        { input: [2, 1], x: 2, expected: [1, 2], desc: "标准示例2" },
        { input: [5, 6, 7], x: 3, expected: [5, 6, 7], desc: "所有节点都大于x" },
        { input: [1, 2, 3], x: 10, expected: [1, 2, 3], desc: "所有节点都小于x" },
        { input: [3, 3, 3], x: 3, expected: [3, 3, 3], desc: "所有节点都等于x" },
        { input: [1, 1, 1], x: 1, expected: [1, 1, 1], desc: "所有节点都等于x" },
        { input: [1, 3, 2, 4, 5], x: 3, expected: [1, 2, 3, 4, 5], desc: "部分节点小于x" },
        { input: [-1, -2, -3], x: -2, expected: [-3, -1, -2], desc: "负数节点" },
        { input: [-1, 2, -3, 4], x: 0, expected: [-1, -3, 2, 4], desc: "混合正负节点" },
        { input: [1, 2, 3, 4, 5], x: 3, expected: [1, 2, 3, 4, 5], desc: "递增有序链表" },
        { input: [5, 4, 3, 2, 1], x: 3, expected: [2, 1, 5, 4, 3], desc: "递减有序链表" },
        { input: [2, 1, 4, 3, 6, 5], x: 4, expected: [2, 1, 3, 4, 6, 5], desc: "交替大小链表" },
        { input: [0, 0, 0, 0], x: 0, expected: [0, 0, 0, 0], desc: "所有节点为0" },
        { input: [100, -100, 50, -50], x: 0, expected: [-100, -50, 100, 50], desc: "边界值节点" },
        { input: [1, 3, 2, 3, 1], x: 2, expected: [1, 1, 3, 2, 3], desc: "重复值节点" },
        { input: [2, 1, 2, 1, 2], x: 2, expected: [1, 1, 2, 2, 2], desc: "交替重复节点" }
    ];

    let passed = 0;
    let failed = 0;

    testCases.forEach((tc, index) => {
        const head = arrayToList(tc.input);
        const result = partition(head, tc.x);
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
        console.log(`  输入: [${tc.input}], x = ${tc.x}`);
        console.log(`  预期: [${tc.expected}], 实际: [${resultArr}]`);
        console.log('');
    });

    console.log(`\n测试结果: ${passed} 个通过, ${failed} 个失败`);
}

testPartition();