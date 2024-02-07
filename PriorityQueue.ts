export default class PriorityQueue<T> {
    private heap: T[] = [new Object() as T];
    private compareFn: (a, b) => boolean;

    constructor(compareFn: (a, b) => boolean) {
        this.compareFn = compareFn;
    }

    insert(data: T): void {
        this.heap.push(data);
        
        let index = this.heap.length - 1;
        let pIndex = index >> 1;

        while (index > 1 && this.compareFn(this.heap[pIndex], this.heap[index])) {
            this.swap(index, pIndex);
            index >>= 1;
            pIndex >>= 1;
        }
    }

    pop(): T {
        if (this.heap.length <= 1) {
            return null;
        };

        const top = this.top();

        this.swap(1, this.heap.length - 1);
        this.heap.pop();

        const lastIndex = this.heap.length - 1;
        let index = 1;

        while (index <= (lastIndex >> 1)) {
            const leftChildIndex = index * 2;
            const rightChildIndex = index * 2 + 1;
            let compareChildIndex = leftChildIndex;

            if (rightChildIndex <= lastIndex && this.compareFn(this.heap[leftChildIndex], this.heap[rightChildIndex])) {
                compareChildIndex = rightChildIndex;
            }

            if (!this.compareFn(this.heap[index], this.heap[compareChildIndex])) {
                break;
            }
            
            this.swap(index, compareChildIndex);

            index = compareChildIndex;
        }

        return top;
    }

    top(): T {
        if (this.heap.length <= 1) {
            return null;
        }

        return this.heap[1];
    }

    isEmpty(): boolean {
        return this.heap.length <= 1;
    }

    showHeap(): void {
        console.log(this.heap);
    }

    private swap(index1: number, index2: number): void {
        [this.heap[index2], this.heap[index1]] = [this.heap[index1], this.heap[index2]];
    }
}

const pq = new PriorityQueue<Object>((a, b) => {
    if (a.age != b.age) {
        return a.age > b.age;
    }
    if (a.height != b.height) {
        return a.height > b.height;
    }
    return a.index > b.index;
});

for (let i = 0; i < 10; ++i) {
    const age = Math.floor(Math.random() * 100);
    const height = Math.floor(Math.random() * 20) + 160;
    const index = i;

    pq.insert({ age, height, index });
}

while (!pq.isEmpty()) {
    console.log(pq.top());
    pq.pop();
}
