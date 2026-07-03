class MaxHeap {
    constructor(compareFn = null) {
        this.heap = [];
        this.compare = compareFn || ((a, b) => a - b);
    }
    
    size() {
        return this.heap.length;
    }
    
    isEmpty() {
        return this.heap.length === 0;
    }
    
    peek() {
        return this.isEmpty() ? null : this.heap[0];
    }
    
    push(value) {
        this.heap.push(value);
        this.bubbleUp(this.heap.length - 1);
        return this.size();
    }
    
    pop() {
        if (this.isEmpty()) return null;
        const max = this.heap[0];
        const last = this.heap.pop();
        if (this.size() > 0) {
            this.heap[0] = last;
            this.bubbleDown(0);
        }
        return max;
    }
    
    bubbleUp(index) {
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (this.compare(this.heap[index], this.heap[parent]) <= 0) break;
            [this.heap[index], this.heap[parent]] = [this.heap[parent], this.heap[index]];
            index = parent;
        }
    }
    
    bubbleDown(index) {
        const len = this.heap.length;
        while (true) {
            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let largest = index;
            
            if (left < len && this.compare(this.heap[left], this.heap[largest]) > 0) {
                largest = left;
            }
            if (right < len && this.compare(this.heap[right], this.heap[largest]) > 0) {
                largest = right;
            }
            if (largest === index) break;
            [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
            index = largest;
        }
    }
}

function greedySinger(input) {
    const lines = input.trim().split('\n');
    const [T, N] = lines[0].split(' ').map(Number);
    const travelDays = lines[1].split(' ').map(Number);
    const cities = [];
    
    for (let i = 0; i < N; i++) {
        const [M, D] = lines[i + 2].split(' ').map(Number);
        cities.push({ M, D, workedDays: 0 });
    }
    
    const totalTravelDays = travelDays.reduce((a, b) => a + b, 0);
    const availableDays = T - totalTravelDays;
    
    if (availableDays <= 0) return 0;
    
    const heap = new MaxHeap((a, b) => {
        const profitA = Math.max(0, a.M - a.workedDays * a.D);
        const profitB = Math.max(0, b.M - b.workedDays * b.D);
        return profitA - profitB;
    });
    
    cities.forEach(city => heap.push(city));
    
    let totalProfit = 0;
    for (let day = 0; day < availableDays; day++) {
        const bestCity = heap.pop();
        const todayProfit = Math.max(0, bestCity.M - bestCity.workedDays * bestCity.D);
        totalProfit += todayProfit;
        bestCity.workedDays++;
        heap.push(bestCity);
    }
    
    return totalProfit;
}

function test() {
    const testCases = [
        {
            input: `10 2
1 1 2
120 20
90 10`,
            expected: 540
        },
        {
            input: `5 1
1 1
100 50`,
            expected: 150
        },
        {
            input: `3 1
1 1
50 10`,
            expected: 50
        },
        {
            input: `20 3
2 2 2 2
200 10
150 5
100 2`,
            expected: 1890
        },
        {
            input: `7 2
1 1 1
10 3
20 5`,
            expected: 55
        },
        {
            input: `60 3
10 10 10 10
500 10
400 5
300 2`,
            expected: 8415
        },
        {
            input: `10 3
1 1 1 1
10 10
10 10
10 10`,
            expected: 30
        },
        {
            input: `15 2
2 2 2
100 20
80 10`,
            expected: 580
        },
        {
            input: `8 1
1 3
50 10`,
            expected: 140
        },
        {
            input: `0 1
1 1
100 10`,
            expected: 0
        }
    ];
    
    let passed = 0;
    let failed = 0;
    
    testCases.forEach((tc, index) => {
        const result = greedySinger(tc.input);
        if (result === tc.expected) {
            console.log(`Test ${index + 1}: PASSED (${result})`);
            passed++;
        } else {
            console.log(`Test ${index + 1}: FAILED (expected ${tc.expected}, got ${result})`);
            failed++;
        }
    });
    
    console.log(`\nTotal: ${passed} passed, ${failed} failed`);
}

test();