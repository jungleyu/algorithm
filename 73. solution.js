function getFilteredStr(nums, mask) {
    const map = ['abc', 'def', 'ghi', 'jkl', 'mno', 'pqr', 'st', 'uv', 'wx', 'yz']
    const comb = [];
    const maskChars = new Set(mask);
    const maskCount = maskChars.size;

    function dfs(index, path, count) {
        if (count === 0) {
            return;
        }
        if (index === nums.length) {
            comb.push(path);
            return;
        }
        for (const ch of map[parseInt(nums[index], 10)]) {
            let newCount = count;
            if (maskChars.has(ch)) {
                newCount--;
            }
            dfs(index + 1, path + ch, newCount);
        }
    }
    dfs(0, '', maskCount === 0 ? Infinity : maskCount);
    return comb.join(',') + ',';
}