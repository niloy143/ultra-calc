import invalidErr from "../helpers/invalid-err";
import { BRACE_END, BRACE_START, DIVISION, INTO, MINUS, PLUS, SPACE, ZERO, NEG_ZERO, operators, posNegTable } from "../utils/operators";
import isValidInput from "../validators/input-validator";
import { Stack } from "../helpers/stack";
import { add, divide, multiply, subtract } from "./operators";
import compareNumber from "../helpers/compare-number";

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
            let calculated = calculateRecursively(input.slice(begin, end));
            if (calculated[0] === MINUS) calculated = SPACE + calculated;
            const backInput = input.slice(end + 1, input.length);

            input = frontInput + calculated + backInput;
            i = frontInput.length + calculated.length;
            continue;
        }
        i++;
    }

    const blocks = separateBlocks(input);

    while (blocks.length > 1) {
        const division = blocks.indexOf(DIVISION);
        if (division !== -1) {
            let dividend = blocks[division - 1];
            let divisor = blocks[division + 1];

            let dividendPosNeg = PLUS;
            let divisorPosNeg = PLUS;

            if (dividend[0] === MINUS) {
                dividendPosNeg = MINUS;
                dividend = dividend.slice(1, dividend.length);
            }

            if (divisor[0] === MINUS) {
                divisorPosNeg = MINUS;
                divisor = divisor.slice(1, divisor.length);
            }

            const isNegAns = posNegTable[dividendPosNeg][divisorPosNeg] === MINUS;

            const quotient = divide(dividend, divisor);

            const ans = `${isNegAns ? MINUS : ""}${quotient}`;

            blocks.splice(division - 1, 3, ans);

            continue;
        }

        const into = blocks.indexOf(INTO);
        if (into !== -1) {
            let num1 = blocks[into - 1];
            let num2 = blocks[into + 1];
            let num1PosNeg = PLUS;
            let num2PosNeg = PLUS;

            if (num1[0] === MINUS) {
                num1PosNeg = MINUS;
                num1 = num1.slice(1, num1.length);
            }

            if (num2[0] === MINUS) {
                num2PosNeg = MINUS;
                num2 = num2.slice(1, num2.length);
            }

            const isNegAns = posNegTable[num1PosNeg][num2PosNeg] === MINUS;

            const product = multiply(num1, num2);

            const ans = `${isNegAns ? MINUS : ""}${product}`;

            blocks.splice(into - 1, 3, ans);

            continue;
        }

        const minus = blocks.indexOf(MINUS);
        if (minus !== -1) {
            let num1 = blocks[minus - 1];
            let num2 = blocks[minus + 1];

            let num1PosNeg = PLUS;
            let num2PosNeg = PLUS;

            if (num1[0] === MINUS) {
                num1PosNeg = MINUS;
                num1 = num1.slice(1, num1.length);
            }

            if (num2[0] === MINUS) {
                num2PosNeg = MINUS;
                num2 = num2.slice(1, num2.length);
            }

            const isSubtract = posNegTable[num1PosNeg][num2PosNeg] === PLUS;
            let result: string;
            let isNegAns = false;

            if (isSubtract) {
                if (compareNumber(num1, num2).result === -1) {
                    result = subtract(num2, num1);
                    if (num2PosNeg === PLUS)
                        isNegAns = true;
                } else {
                    result = subtract(num1, num2);
                    if (num1PosNeg === MINUS)
                        isNegAns = true;
                }
            }
            else {
                result = add(num1, num2);
                if (num1PosNeg === MINUS)
                    isNegAns = true;
            }

            const ans = `${isNegAns ? MINUS : ""}${result}`;

            blocks.splice(minus - 1, 3, ans);

            continue;
        }

        const plus = blocks.indexOf(PLUS);
        if (plus !== -1) {
            let num1 = blocks[plus - 1];
            let num2 = blocks[plus + 1];

            let num1PosNeg = PLUS;
            let num2PosNeg = PLUS;

            if (num1[0] === MINUS) {
                num1PosNeg = MINUS;
                num1 = num1.slice(1, num1.length);
            }

            if (num2[0] === MINUS) {
                num2PosNeg = MINUS;
                num2 = num2.slice(1, num2.length);
            }

            const isSubtract = posNegTable[num1PosNeg][num2PosNeg] === MINUS;
            let result: string;
            let isNegAns = false;

            if (isSubtract) {
                if (compareNumber(num1, num2).result === -1) {
                    result = subtract(num2, num1);
                    if (num2PosNeg === MINUS)
                        isNegAns = true;
                } else {
                    result = subtract(num1, num2);
                    if (num1PosNeg === MINUS)
                        isNegAns = true;
                }
            }
            else {
                result = add(num1, num2);
                if (num1PosNeg === MINUS || num2PosNeg === MINUS)
                    isNegAns = true;
            }

            const ans = `${isNegAns ? MINUS : ""}${result}`;

            blocks.splice(plus - 1, 3, ans);

            continue;
        }

    }

    let result = blocks[0];
    if (result === NEG_ZERO) result = ZERO;

    return result;
}

function separateBlocks(input: string): string[] {
    const blocks: string[] = [""];
    let k = 0;

    for (let i = 0; i < input.length; i++) {
        const x = input[i];
        const y = input[i + 1];

        if (x === SPACE) {
            blocks[k] = y;
            i++;
        }
        else if (operators.includes(x)) {
            k++;
            blocks[k] = x;
            k++;
            blocks[k] = "";
        }
        else {
            blocks[k] += x;
        }
    }

    return blocks;
}