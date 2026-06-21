function stringDigest(str) {
    str = str.toLowerCase();
    const map = new Map();
    for (let s of str) {
        map.set(s, (map.get(s) || 0) + 1)
    }
    const rs = [];
    for (let i = 0; i < str.length; i++) {
        let cnt = map.get(str[i])

        let count = 1;
        while (i < str.length - 1 && str[i] === str[i + 1]) {
            count++;
            i++;
        }
        if (count === 1) {
            rs.push([str[i], cnt - count])
        } else {
            rs.push([str[i], count])
        }
        map.set(str[i], cnt - count)
    }
    rs.sort((a, b) => {
        if (a[1] !== b[1]) {
            return b[1] - a[1];
        }
        return a[0].charCodeAt() - b[0].charCodeAt();
    })
    return rs.map(r => r.join('')).join('')
}