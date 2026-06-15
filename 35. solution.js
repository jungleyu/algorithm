function getNK(n, k) {
    n = BigInt(n);
    k = BigInt(k);
    if (n === 1n) {
        return 'red'
    }
    if (n === 2n) {
        if (k === 0n) {
            return 'blue'
        } else {
            return 'red'
        }
    }

    const half = 1n << (n - 2n);
    if (k >= half) {
        return getNK(n - 1n, k - half);
    } else {
        return getNK(n - 1n, k) === 'red' ? 'blue' : 'red';
    }
}