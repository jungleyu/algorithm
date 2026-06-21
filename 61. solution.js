function sortPokerCards(input) {
    const arr = input.split(' ').map(Number);

    const card = {};

    // 统计各种牌面的数量
    for (let num of arr) {
        card[num] ? card[num]++ : (card[num] = 1);
    }

    // 统计组合，4代表炸弹，3+2代表葫芦，3代表三张，2代表对子，1代表单张
    const combine = {
        4: [],
        "3+2": [],
        3: [],
        2: [],
        1: [],
    };

    // 首先将初始组合统计出来
    for (let num in card) {
        switch (card[num]) {
            case 3:
                combine[3].push(num - 0);
                break;
            case 2:
                combine[2].push(num - 0);
                break;
            case 1:
                combine[1].push(num - 0);
                break;
            default:
                combine[4].push([num - 0, card[num]]); // 由于炸弹可能有4张以上相同牌面组成，因此既需要统计牌面num，也需要统计牌数card[num]
        }
    }

    // 炸弹排序
    combine[4].sort((a, b) => (a[1] != b[1] ? b[1] - a[1] : b[0] - a[0]));

    // 三张排序，牌面值越大，三张越大
    combine[3].sort((a, b) => b - a);

    // 对子降序，牌面值越大，对子越大
    combine[2].sort((a, b) => b - a);

    // 尝试组合出葫芦
    while (combine[3].length) {
        // 如果对子用完，三张还有一个，那么可以直接结束循环
        if (combine[2].length === 0 && combine[3].length === 1) break;

        // 选取一个最大的三张
        const san_top = combine[3].shift();

        let tmp;
        // 如果第二大的三张的牌面，比最大的对子牌面大，或者没有对子了，则可以拆分三张，组合出葫芦
        if (
            combine[2].length === 0 ||
            (combine[3].length >= 1 && combine[3][0] > combine[2][0])
        ) {
            tmp = combine[3].shift();
            // 拆分三张为对子的话，会多出一个单张
            combine[1].push(tmp);
        } else {
            // 如果对子牌面比三张大，则不需要拆分三张，直接使用对子组合出葫芦
            tmp = combine[2].shift();
        }
        combine["3+2"].push([san_top, tmp]); // 葫芦元素含义：[三张牌面，对子牌面]
    }

    // 处理完葫芦后，就可以对单张进行降序了（因为组合葫芦的过程中，可能产生新的单张，因此单张排序要在葫芦组合得到后进行）
    combine[1].sort((a, b) => b - a);

    // ans存放题解
    const ans = [];

    // 首先将炸弹放到ans中
    for (let card of combine[4]) {
        const [score, count] = card;
        ans.push(...new Array(count).fill(score));
    }

    // 然后将葫芦放大ans中
    for (let card of combine["3+2"]) {
        const [san, er] = card;
        ans.push(...new Array(3).fill(san), ...new Array(2).fill(er));
    }

    // 之后将三张放到ans中
    for (let san of combine[3]) {
        ans.push(...new Array(3).fill(san));
    }

    // 接着是对子放到ans中
    for (let er of combine[2]) {
        ans.push(...new Array(2).fill(er));
    }

    // 最后是单张放到ans中
    ans.push(...combine[1]);

    return ans.join(" ");
}

function test() {
    console.log("=".repeat(60));
    console.log("扑克牌排序算法测试用例");
    console.log("=".repeat(60));
    console.log();

    const testCases = [
        {
            name: "示例1 - 基本三张",
            input: "1 3 3 3 2 1 5",
            expected: "3 3 3 1 1 5 2"
        },
        {
            name: "示例2 - 葫芦大于三张",
            input: "4 4 2 1 2 1 3 3 3 4",
            expected: "4 4 4 3 3 2 2 1 1 3"
        },
        {
            name: "单张牌",
            input: "7",
            expected: "7"
        },
        {
            name: "两张相同牌",
            input: "5 5",
            expected: "5 5"
        },
        {
            name: "三张相同牌",
            input: "8 8 8",
            expected: "8 8 8"
        },
        {
            name: "四张相同牌 - 炸弹",
            input: "9 9 9 9",
            expected: "9 9 9 9"
        },
        {
            name: "五张相同牌混合其他牌",
            input: "6 6 6 6 6 3 2",
            expected: "6 6 6 6 6 3 2"
        },
        {
            name: "六张相同牌混合其他牌",
            input: "10 10 10 10 10 10 5 4 4",
            expected: "10 10 10 10 10 10 4 4 5"
        },
        {
            name: "七张相同牌混合其他牌",
            input: "11 11 11 11 11 11 11 8 8 7",
            expected: "11 11 11 11 11 11 11 8 8 7"
        },
        {
            name: "八张相同牌混合其他牌",
            input: "12 12 12 12 12 12 12 12 9 9 9",
            expected: "12 12 12 12 12 12 12 12 9 9 9"
        },
        {
            name: "只有单张 - 降序排列",
            input: "1 2 3 4 5",
            expected: "5 4 3 2 1"
        },
        {
            name: "只有对子",
            input: "1 1 2 2 3 3",
            expected: "3 3 2 2 1 1"
        },
        {
            name: "混合单张和对子",
            input: "1 2 2 3 4",
            expected: "2 2 4 3 1"
        },
        {
            name: "两个三张",
            input: "5 5 5 7 7 7",
            expected: "7 7 7 5 5 5"
        },
        {
            name: "炸弹优先于三张",
            input: "4 4 4 4 5 5 5",
            expected: "4 4 4 4 5 5 5"
        },
        {
            name: "多个炸弹",
            input: "6 6 6 6 6 9 9 9 9",
            expected: "6 6 6 6 6 9 9 9 9"
        },
        {
            name: "有炸弹和多个三张",
            input: "7 7 7 7 5 5 5 4 4 4 6 6 6 3 3",
            expected: "7 7 7 7 6 6 6 5 5 4 4 4 3 3 5"
        },
        {
            name: "复杂混合 - 炸弹三张对子单张",
            input: "10 10 10 10 8 8 8 5 5 3",
            expected: "10 10 10 10 8 8 8 5 5 3"
        },
        {
            name: "边界 - 扑克牌最大值13",
            input: "13 13 13 13",
            expected: "13 13 13 13"
        },
        {
            name: "边界 - 扑克牌最小值1",
            input: "1 1 1 1",
            expected: "1 1 1 1"
        },
        {
            name: "包含炸弹但也有三张和单张",
            input: "9 9 9 9 9 2 2 2 5",
            expected: "9 9 9 9 9 2 2 2 5"
        },
        {
            name: "相同数字不同顺序输入",
            input: "3 1 2 3 3 1 2",
            expected: "3 3 3 2 2 1 1"
        }
    ];

    let passed = 0;
    let failed = 0;

    for (const tc of testCases) {
        const result = sortPokerCards(tc.input);
        const isPassed = result === tc.expected;

        if (isPassed) {
            passed++;
            console.log(`✅ ${tc.name}`);
        } else {
            failed++;
            console.log(`❌ ${tc.name}`);
        }
        console.log(`   输入: ${tc.input}`);
        console.log(`   输出: ${result}`);
        console.log(`   预期: ${tc.expected}`);
        console.log();
    }

    console.log("=".repeat(60));
    console.log(`测试结果: ${passed} 通过, ${failed} 失败`);
    console.log("=".repeat(60));
}

test();