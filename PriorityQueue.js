class PriorityQueue {
    #heap = [0];
    #compareFn;
    
    constructor(compareFn) {
        this.#compareFn = compareFn;
    }

    insert(data) {
        this.#heap.push(data);

        let index = this.#heap.length - 1;
        let pIndex = index >> 1;

        while (index > 1 && this.#compareFn(this.#heap[pIndex], this.#heap[index])) {
            this.#swap(index, pIndex);
            index >>= 1;
            pIndex >>= 1;
        }
    }

    pop() {
        if (this.#heap.length <= 1) {
            return null;
        }

        const top = this.top();

        this.#swap(1, this.#heap.length - 1);
        this.#heap.pop();

        const lastIndex = this.#heap.length - 1;
        let index = 1;

        while (index <= (lastIndex >> 1)) {
            const leftChildIndex = index * 2;
            const rightChildIndex = index * 2 + 1;
            let smallerChild = this.#heap[leftChildIndex];
            let smallerChildIndex = leftChildIndex;

            if (rightChildIndex <= lastIndex && this.#compareFn(this.#heap[leftChildIndex], this.#heap[rightChildIndex])) {
                smallerChild = this.#heap[rightChildIndex];
                smallerChildIndex = rightChildIndex;
            }

            if (!this.#compareFn(this.#heap[index], this.#heap[smallerChildIndex])) {
                break;
            }
            
            this.#swap(index, smallerChildIndex);

            index = smallerChildIndex;
        }

        return top;
    }

    top() {
        if (this.#heap.length <= 1) {
            return null;
        }

        return this.#heap[1];
    }

    isEmpty() {
        return this.#heap.length <= 1;
    }

    showHeap() {
        console.log(this.#heap);
    }

    #swap(index1, index2) {
        [this.#heap[index2], this.#heap[index1]] = [this.#heap[index1], this.#heap[index2]];
    }

}

const pq = new PriorityQueue((a, b) => {
    if (a.age == b.age) {
        return a.index < b.index;
    }
    return a.age > b.age;
});

for (let i = 0; i < 50; ++i) {
    const name = "abc" + i;
    const age = Math.floor(Math.random() * 100);
    const index = i;

    pq.insert({ name, age, index });
}

while (!pq.isEmpty()) {
    console.log(pq.top());
    pq.pop();
}
