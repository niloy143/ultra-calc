"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stack_1 = require("../helpers/stack");
const operators_1 = require("../utils/operators");
function isValidInput(input) {
    const braces = new stack_1.Stack();
    let currNum = "";
    let dotExists = false;
    const resetCurrNum = () => {
        currNum = "";
        dotExists = false;
    };
    for (let i = 0; i < input.length; i++) {
        const prev = input[i - 1];
        const curr = input[i];
        const next = input[i + 1];
        if (curr === operators_1.BRACE_START) {
            if (!!currNum)
                return false;
            braces.push(operators_1.BRACE_START);
        }
        else if (curr === operators_1.BRACE_END) {
            if (braces.top() !== operators_1.BRACE_START)
                return false;
            else
                braces.pop();
        }
        else if (curr === operators_1.DOT) {
            if (dotExists || isNaN(Number(prev)) || isNaN(Number(next)))
                return false;
            dotExists = true;
            currNum += curr;
        }
        else if (operators_1.operators.includes(curr)) {
            if (!currNum) {
                if (curr === operators_1.INTO || curr === operators_1.DIVISION)
                    return false;
                else if (prev !== operators_1.BRACE_START && prev !== undefined)
                    return false;
            }
            if (next === undefined || next === operators_1.BRACE_END)
                return false;
            resetCurrNum();
        }
        else {
            if (curr === operators_1.SPACE)
                continue;
            if (isNaN(Number(curr)))
                return false;
            currNum += curr;
        }
    }
    if (!braces.empty())
        return false;
    return true;
}
exports.default = isValidInput;
//# sourceMappingURL=input-validator.js.map