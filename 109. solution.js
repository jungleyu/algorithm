/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function (head, k) {
    if (head === null) {
        return null;
    }
    let cur = head, len = 1;
    //获取链表长度
    while (cur.next) {
        len++;
        cur = cur.next;
    }
    k = k % len; // k的值可能会比链表长度大,所以要对len取模
    cur.next = head; // 将链表收尾相连, 后续在合适位置再断开

    let tail = head;
    for (let i = 0; i < len - k - 1; i++) {
        tail = tail.next;
    }
    let ans = tail.next;
    tail.next = null; //防止成环

    return ans;
};

function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

function arrayToList(arr) {
    if (arr.length === 0) return null;
    const head = new ListNode(arr[0]);
    let cur = head;
    for (let i = 1; i < arr.length; i++) {
        cur.next = new ListNode(arr[i]);
        cur = cur.next;
    }
    return head;
}

function listToArray(head) {
    const result = [];
    while (head) {
        result.push(head.val);
        head = head.next;
    }
    return result;
}

function testRotateRight() {
    const testCases = [
        { arr: [1, 2, 3, 4, 5], k: 2, expected: [4, 5, 1, 2, 3], desc: "标准示例1" },
        { arr: [0, 1, 2], k: 4, expected: [2, 0, 1], desc: "标准示例2" },
        { arr: [], k: 0, expected: [], desc: "空链表" },
        { arr: [1], k: 0, expected: [1], desc: "单个节点，k=0" },
        { arr: [1], k: 1, expected: [1], desc: "单个节点，k=1" },
        { arr: [1], k: 100, expected: [1], desc: "单个节点，k=100" },
        { arr: [1, 2], k: 1, expected: [2, 1], desc: "两个节点，k=1" },
        { arr: [1, 2], k: 2, expected: [1, 2], desc: "两个节点，k=2(等于长度)" },
        { arr: [1, 2], k: 3, expected: [2, 1], desc: "两个节点，k=3(大于长度)" },
        { arr: [1, 2, 3], k: 0, expected: [1, 2, 3], desc: "k=0，不旋转" },
        { arr: [1, 2, 3], k: 3, expected: [1, 2, 3], desc: "k=3，等于长度" },
        { arr: [1, 2, 3, 4, 5], k: 5, expected: [1, 2, 3, 4, 5], desc: "k等于链表长度" },
        { arr: [1, 2, 3, 4, 5], k: 7, expected: [4, 5, 1, 2, 3], desc: "k=7，大于长度(7%5=2)" },
        { arr: [1, 2, 3, 4, 5], k: 1, expected: [5, 1, 2, 3, 4], desc: "k=1，旋转1位" },
        { arr: [1, 2, 3, 4, 5], k: 4, expected: [2, 3, 4, 5, 1], desc: "k=4，旋转4位" },
        { arr: [-1, -2, -3], k: 2, expected: [-2, -3, -1], desc: "负数节点值" },
        { arr: [100, -100, 0], k: 1, expected: [0, 100, -100], desc: "边界节点值(-100到100)" },
        { arr: [1, 1, 1], k: 2, expected: [1, 1, 1], desc: "所有节点值相同" },
        { arr: [1, 2, 3, 4, 5], k: 1000000000, expected: [1, 2, 3, 4, 5], desc: "k=10^9，大数k" },
        { arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], k: 5, expected: [6, 7, 8, 9, 10, 1, 2, 3, 4, 5], desc: "10个节点，k=5" },
        { arr: [1, 2, 3, 4, 5], k: 6, expected: [5, 1, 2, 3, 4], desc: "k=6(6%5=1)" },
        { arr: [1, 2, 3, 4, 5], k: 8, expected: [3, 4, 5, 1, 2], desc: "k=8(8%5=3)" },
        { arr: [1, 2, 3, 4, 5], k: 10, expected: [1, 2, 3, 4, 5], desc: "k=10(10%5=0)" },
        { arr: [1], k: 2147483647, expected: [1], desc: "单个节点，极大k值" },
        { arr: [1, 2, 3], k: 999999999, expected: [1, 2, 3], desc: "k=999999999(999999999%3=0)" }
    ];

    let passed = 0;
    let failed = 0;

    testCases.forEach((tc, index) => {
        const head = arrayToList(tc.arr);
        const result = listToArray(rotateRight(head, tc.k));
        const status = JSON.stringify(result) === JSON.stringify(tc.expected) ? '✓' : '✗';
        if (JSON.stringify(result) === JSON.stringify(tc.expected)) {
            passed++;
        } else {
            failed++;
        }
        console.log(`测试用例 ${index + 1}: ${status}`);
        console.log(`  描述: ${tc.desc}`);
        console.log(`  输入: [${tc.arr}], k=${tc.k}`);
        console.log(`  预期: [${tc.expected}]`);
        console.log(`  实际: [${result}]`);
        console.log('');
    });

    console.log(`\n测试结果: ${passed} 个通过, ${failed} 个失败`);
}

testRotateRight();