import invalidErr from "../helpers/invalid-err";
import { BRACE_END, BRACE_START, DIVISION, INTO, MINUS, PLUS, operators } from "../utils/operators";
import isValidInput from "../validators/input-validator";
import { Stack } from "../helpers/stack";
import { add, divide, multiply, subtract } from "./operators";

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
    const blocks = separateBlocks(input);

    while (blocks.length > 1) {
        const into = blocks.indexOf(INTO);
        if (into !== -1) {
            const num1 = blocks[into - 1];
            const num2 = blocks[into + 1];

            const product = multiply(num1, num2);

            blocks.splice(into - 1, 3, product);

            continue;
        }
        const division = blocks.indexOf(DIVISION);
        if (division !== -1) {
            const dividend = blocks[division - 1];
            const divisor = blocks[division + 1];

            const quotient = divide(dividend, divisor);

            blocks.splice(division - 1, 3, quotient);

            continue;
        }
        const plus = blocks.indexOf(PLUS);
        if (plus !== -1) {
            const num1 = blocks[plus - 1];
            const num2 = blocks[plus + 1];

            const sum = add(num1, num2);

            blocks.splice(plus - 1, 3, sum);

            continue;
        }
        const minus = blocks.indexOf(MINUS);
        if (minus !== -1) {
            const num1 = blocks[minus - 1];
            const num2 = blocks[minus + 1];

            const diff = subtract(num1, num2);

            blocks.splice(minus - 1, 3, diff);

            continue;
        }
    }

    return blocks[0];
}

function separateBlocks(input: string): string[] {
    const blocks: string[] = [""];
    let i = 0;

    for (const x of input) {
        if (operators.includes(x)) {
            i++;
            blocks[i] = x;
            i++;
            blocks[i] = "";
        } else {
            blocks[i] += x;
        }
    }

    return blocks;
}