function solve(input) {
    const lines = input.trim().split('\n');
    const s = lines[0];
    const k = parseInt(lines[1]);
    const n = s.length;

    let total = 0;
    for (let i = 0; i < n; i++) { if (s[i] >= 'a') total++; }
    if (k > total) return 0;

    const freq = new Array(total + 2).fill(0);
    const cnt = new Array(10).fill(0);
    let uniq = 0, L = 0, lc = 0, rc = 0, ans = 0;

    for (let r = 0; r < n; r++) {
        const c = s[r];
        if (c >= 'a') { rc++; }
        else if (cnt[c]++ === 0) { uniq++; }

        while (uniq === 10 && L <= r) {
            const ch = s[L];
            freq[lc]++;
            if (ch >= 'a') { lc++; }
            else if (--cnt[ch] === 0) { uniq--; }
            L++;
        }

        const t = rc - k;
        if (t >= 0) { ans += freq[t]; }
    }

    return ans;
}

function runTests() {
    const cases = [
        ['a0123456789aa\n1', 2],
        ['aa01234a5678901234aa\n1', 22],
        ['0123456789\n0', 1],
        ['a0123456789b\n2', 1],
        ['0123456789a\n1', 1],
        ['abc0123456789def\n3', 4],
        ['abcdefghij0123456789\n10', 1],
        ['abc\n1', 0],
        ['012345678\n0', 0],
        ['a0b1c2d3e4f5g6h7i8j9k\n1', 0],
    ];

    let p = 0, f = 0;
    cases.forEach(([input, exp], i) => {
        const ok = solve(input) === exp;
        console.log(`${ok ? '✓' : '✗'} 测试 ${i + 1}${ok ? '' : ` 期望 ${exp} 实际 ${solve(input)}`}`);
        ok ? p++ : f++;
    });
    console.log(`\n${p}/${cases.length} 通过`);
}

runTests();
