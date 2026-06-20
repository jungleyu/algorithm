function sendMessage(input) {
    const lines = input.trim().split('\n');
    const publishers = lines[0].match(/\d+ \d+/g).map(v => v.split(' ').map(Number)).sort((a, b) => a[0] - b[0]);
    const consumers = lines[1].match(/\d+ \d+/g).map(v => v.split(' ').map(Number));

    const ans = new Array(consumers.length).fill([]);

    for (const [msgTime, msgContent] of publishers) {
        for (let j = consumers.length - 1; j >= 0; j--) {
            const [subTime, unsubTime] = consumers[j];
            if (msgTime >= subTime && msgTime < unsubTime) {
                ans[j].push(msgContent);
                break;
            }
        }
    }

    return ans;
}