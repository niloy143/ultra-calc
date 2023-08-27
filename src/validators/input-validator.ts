import { Stack } from "../helpers/stack";
import { BRACE_END, BRACE_START, DIVISION, DOT, INTO, SPACE, operators } from "../utils/operators";

export default function isValidInput(input: string): boolean {
    const braces = new Stack<string>();

    let currNum = "";
    let dotExists = false;
    const resetCurrNum = () => {
        currNum = "";
        dotExists = false;
    }

    for (let i = 0; i < input.length; i++) {
        const prev = input[i - 1];
        const curr = input[i];
        const next = input[i + 1];

        if (curr === BRACE_START) {
            if (!!currNum) return false;
            braces.push(BRACE_START);
        }
        else if (curr === BRACE_END) {
            if (braces.top() !== BRACE_START) return false;
            else braces.pop();
        }
        else if (curr === DOT) {
            if (dotExists || isNaN(Number(prev)) || isNaN(Number(next))) return false;
            dotExists = true;
            currNum += curr;
        }
        else if (operators.includes(curr)) {
            if (!currNum) {
                if (curr === INTO || curr === DIVISION) return false;
                else if (prev !== BRACE_START && prev !== undefined) return false;
            }
            if (next === undefined || next === BRACE_END) return false;
            resetCurrNum();
        }
        else {
            if (curr === SPACE) continue;
            if (isNaN(Number(curr))) return false;
            currNum += curr;
        }
    }

    if (!braces.empty()) return false;

    return true;
}