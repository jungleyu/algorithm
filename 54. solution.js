function rearrange(arr) {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
        const isEven = (i & 1) === 0;
        if (isEven) {
            if (arr[i] < arr[i - 1]) {
                [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
            }
        } else {
            if (arr[i] > arr[i - 1]) {
                [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
            }
        }
    }
    return arr;
}

console.log(rearrange([4, 3, 5, 7, 8]))