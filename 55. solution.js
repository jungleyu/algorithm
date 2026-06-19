function restoreSequence(s, n) {
    const targetFreq = countFrequency(s);
    const totalLen = s.length;
    
    const minDigits = Math.max(1, Math.floor(totalLen / n));
    const maxDigits = Math.min(6, Math.ceil(totalLen / n) + 1);
    
    for (let digits = minDigits; digits <= maxDigits; digits++) {
        const candidates = generateSmartCandidates(digits, n, targetFreq, totalLen);
        
        for (const start of candidates) {
            if (start.toString().startsWith('0')) continue;
            
            if (isValidSequence(start, n, { ...targetFreq }, totalLen)) {
                return start;
            }
        }
    }
    
    const lowerBound = Math.pow(10, minDigits - 1);
    const upperBound = Math.pow(10, maxDigits);
    for (let start = lowerBound; start < upperBound; start++) {
        if (isValidSequence(start, n, { ...targetFreq }, totalLen)) {
            return start;
        }
    }
    
    return -1;
}

function countFrequency(s) {
    const freq = {};
    for (const c of s) {
        freq[c] = (freq[c] || 0) + 1;
    }
    return freq;
}

function generateSmartCandidates(digits, n, freq, totalLen) {
    const candidates = new Set();
    const lowerBound = Math.pow(10, digits - 1);
    const upperBound = Math.pow(10, digits);
    
    const candidatesFromFreq = generateFromFrequency(freq, digits, n);
    candidatesFromFreq.forEach(c => candidates.add(c));
    
    const avgLen = totalLen / n;
    const estimatedStart = Math.round(avgLen);
    const range = Math.min(500, n * 10);
    for (let offset = -range; offset <= range; offset++) {
        const candidate = Math.max(lowerBound, Math.min(upperBound - 1, estimatedStart + offset));
        candidates.add(candidate);
    }
    
    for (let i = 0; i < 20; i++) {
        candidates.add(lowerBound + i);
        candidates.add(upperBound - 1 - i);
    }
    
    if (digits > 1) {
        const carryPoint = Math.pow(10, digits) - n + 1;
        for (let i = 0; i < n; i++) {
            candidates.add(carryPoint + i);
        }
    }
    
    const freqBasedStart = calculateFreqBasedStart(freq, digits, n);
    if (freqBasedStart >= lowerBound && freqBasedStart < upperBound) {
        candidates.add(freqBasedStart);
    }
    
    return Array.from(candidates).sort((a, b) => a - b);
}

function generateFromFrequency(freq, digits, n) {
    const candidates = [];
    const digitsStr = Object.keys(freq).sort();
    
    if (digitsStr.length > 0) {
        const firstDigit = digitsStr[0];
        candidates.push(parseInt(firstDigit.padEnd(digits, '0')));
        candidates.push(parseInt(firstDigit.padEnd(digits, '9')));
    }
    
    if (freq['9']) {
        const nineCount = freq['9'];
        if (nineCount >= n) {
            const candidate = Math.pow(10, digits) - Math.ceil(nineCount / n);
            if (candidate >= Math.pow(10, digits - 1)) {
                candidates.push(candidate);
            }
        }
    }
    
    return candidates;
}

function calculateFreqBasedStart(freq, digits, n) {
    let sum = 0;
    let count = 0;
    
    for (let i = 0; i <= 9; i++) {
        const c = String(i);
        if (freq[c]) {
            sum += i * freq[c];
            count += freq[c];
        }
    }
    
    if (count === 0) return Math.pow(10, digits - 1);
    
    const avgDigit = sum / count;
    let start = 0;
    for (let i = 0; i < digits; i++) {
        start = start * 10 + Math.round(avgDigit);
    }
    
    return start;
}

function isValidSequence(start, n, freq, totalLen) {
    let usedLen = 0;
    
    for (let i = 0; i < n; i++) {
        const num = start + i;
        const numStr = num.toString();
        
        for (const c of numStr) {
            if (!freq[c] || freq[c] <= 0) {
                return false;
            }
            freq[c]--;
            usedLen++;
        }
    }
    
    return usedLen === totalLen;
}

function test() {
    console.log("测试1:", restoreSequence("19801211", 5) === 8 ? "通过" : "失败");
    console.log("测试2:", restoreSequence("432111111111", 4) === 111 ? "通过" : "失败");
}

test();