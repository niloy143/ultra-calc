"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
class Stack {
    constructor() {
        this.entries = [];
    }
    top() {
        return this.entries[this.entries.length - 1];
    }
    pop() {
        const top = this.top();
        this.entries.pop();
        return top;
    }
    push(entry) {
        this.entries.push(entry);
    }
    size() {
        return this.entries.length;
    }
    empty() {
        return this.size() === 0;
    }
    clear() {
        this.entries = [];
    }
}
exports.Stack = Stack;
//# sourceMappingURL=stack.js.map