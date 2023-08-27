import invalidErr from "../helpers/invalid-err";
import { BRACE_END, BRACE_START } from "../utils/operators";
import isValidInput from "../validators/input-validator";
import { Stack } from "../helpers/stack";

export default function calculate(input: string): string {
    input = input.split(" ").join("");
    invalidErr(!isValidInput(input));

    return calculateRecursively(input);
}

function calculateRecursively(input: string): string {
    const braces = new Stack<number>();

    let i = 0;
    while (i < input.length) {
        if (input[i] === BRACE_START) {
            braces.push(i);
        }
        else if (input[i] === BRACE_END) {
            const begin = braces.pop() + 1;
            const end = i;

            const frontInput = input.slice(0, begin - 1);
            const calculated = calculateRecursively(input.slice(begin, end));
            const backInput = input.slice(end + 1, input.length);

            input = frontInput + calculated + backInput;
            i = frontInput.length + calculated.length;
            continue;
        }
        i++;
    }

    // calculate here

    return input;
}
