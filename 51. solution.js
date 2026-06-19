function perfectWalk(s) {
    const n = s.length;
    const target = n / 4;
    
    // 统计整个字符串的字符计数
    const cnt = { W: 0, A: 0, S: 0, D: 0 };
    for (const c of s) cnt[c]++;
    
    // 检查是否已经是完美走位
    if (cnt.W === target && cnt.A === target && cnt.S === target && cnt.D === target) {
        return 0;
    }
    
    // 滑动窗口：[left, right)，窗口内是待替换的子序列
    let minLen = n;
    let left = 0;
    
    for (let right = 0; right < n; right++) {
        // 窗口右扩，减少剩余字符的计数
        cnt[s[right]]--;
        
        // 检查当前窗口外的字符是否满足条件：每个字符 <= target
        while (cnt.W <= target && cnt.A <= target && cnt.S <= target && cnt.D <= target) {
            // 更新最小窗口长度
            minLen = Math.min(minLen, right - left + 1);
            // 窗口左缩，增加剩余字符的计数
            cnt[s[left]]++;
            left++;
        }
    }
    
    return minLen;
}

function test() {
    const testCases = [
        { name: "示例1", s: "WASDAASD", expected: 1 },
        { name: "示例2", s: "AAAA", expected: 3 },
        { name: "示例3", s: "WWWWAAAASSSS", expected: 6 },
    ];

    for (const tc of testCases) {
        const result = perfectWalk(tc.s);
        const passed = result === tc.expected;
        console.log(`${tc.name} ${passed ? "通过" : "失败"}: 期望 ${tc.expected}, 实际 ${result}`);
    }
}

test();
