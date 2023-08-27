export class Stack<T> {
    entries: T[];

    constructor() {
        this.entries = [];
    }

    top(): T {
        return this.entries[this.entries.length - 1];
    }

    pop(): T {
        const top = this.top();
        this.entries.pop();
        return top;
    }

    push(entry: T): void {
        this.entries.push(entry)
    }

    size(): number {
        return this.entries.length;
    }

    empty(): boolean {
        return this.size() === 0;
    }

    clear(): void {
        this.entries = [];
    }
}