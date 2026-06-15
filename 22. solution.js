function encodeInt(str) {
    let bin = BigInt(str).toString(2);
    let n = bin.length;
    let ans = '';
    while (n > 0) {
        let sub = bin.slice(Math.max(0, n - 7), n);
        if (n - 7 > 0) {
            sub = sub.padStart(8, '1')
        }
        const decimal = parseInt(sub, 2);
        let hex = decimal.toString(16);
        hex = `${hex}`.padStart(2, '0');
        ans += hex.toUpperCase();
        n -= 7;
    }
    return ans;
}