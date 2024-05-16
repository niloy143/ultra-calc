"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const invalid_err_1 = __importDefault(require("../helpers/invalid-err"));
const operators_1 = require("../utils/operators");
const input_validator_1 = __importDefault(require("../validators/input-validator"));
const stack_1 = require("../helpers/stack");
const operators_2 = require("./operators");
const compare_number_1 = __importDefault(require("../helpers/compare-number"));
const round_1 = __importDefault(require("../helpers/round"));
/**
 * Calculates the operation given as input string
 * @param input operation format: "1 + 2 - 3 * 4 / 5 * (6+7) / (8-9)"
 * @returns result: "34.2"
 */
function calculate(input) {
    input = input.split(" ").join("");
    (0, invalid_err_1.default)(!(0, input_validator_1.default)(input));
    let ans = calculateRecursively(input);
    return (0, round_1.default)(ans);
}
exports.default = calculate;
function calculateRecursively(input) {
    const braces = new stack_1.Stack();
    let i = 0;
    while (i < input.length) {
        if (input[i] === operators_1.BRACE_START) {
            braces.push(i);
        }
        else if (input[i] === operators_1.BRACE_END) {
            const begin = braces.pop() + 1;
            const end = i;
            const frontInput = input.slice(0, begin - 1);
            let calculated = calculateRecursively(input.slice(begin, end));
            if (calculated[0] === operators_1.MINUS)
                calculated = operators_1.SPACE + calculated;
            const backInput = input.slice(end + 1, input.length);
            input = frontInput + calculated + backInput;
            i = frontInput.length + calculated.length;
            continue;
        }
        i++;
    }
    const blocks = separateBlocks(input);
    while (blocks.length > 1) {
        // console.log(blocks)
        const division = blocks.indexOf(operators_1.DIVISION);
        if (division !== -1) {
            let dividend = blocks[division - 1];
            let divisor = blocks[division + 1];
            let dividendPosNeg = operators_1.PLUS;
            let divisorPosNeg = operators_1.PLUS;
            if (dividend[0] === operators_1.MINUS) {
                dividendPosNeg = operators_1.MINUS;
                dividend = dividend.slice(1, dividend.length);
            }
            if (divisor[0] === operators_1.MINUS) {
                divisorPosNeg = operators_1.MINUS;
                divisor = divisor.slice(1, divisor.length);
            }
            const isNegAns = operators_1.posNegTable[dividendPosNeg][divisorPosNeg] === operators_1.MINUS;
            const quotient = (0, operators_2.divide)(dividend, divisor);
            const ans = `${isNegAns ? operators_1.MINUS : ""}${quotient}`;
            blocks.splice(division - 1, 3, ans);
            continue;
        }
        const into = blocks.indexOf(operators_1.INTO);
        if (into !== -1) {
            let num1 = blocks[into - 1];
            let num2 = blocks[into + 1];
            let num1PosNeg = operators_1.PLUS;
            let num2PosNeg = operators_1.PLUS;
            if (num1[0] === operators_1.MINUS) {
                num1PosNeg = operators_1.MINUS;
                num1 = num1.slice(1, num1.length);
            }
            if (num2[0] === operators_1.MINUS) {
                num2PosNeg = operators_1.MINUS;
                num2 = num2.slice(1, num2.length);
            }
            const isNegAns = operators_1.posNegTable[num1PosNeg][num2PosNeg] === operators_1.MINUS;
            const product = (0, operators_2.multiply)(num1, num2);
            const ans = `${isNegAns ? operators_1.MINUS : ""}${product}`;
            blocks.splice(into - 1, 3, ans);
            continue;
        }
        const minus = blocks.indexOf(operators_1.MINUS);
        if (minus !== -1) {
            let num1 = blocks[minus - 1];
            let num2 = blocks[minus + 1];
            let num1PosNeg = operators_1.PLUS;
            let num2PosNeg = operators_1.PLUS;
            if (num1[0] === operators_1.MINUS) {
                num1PosNeg = operators_1.MINUS;
                num1 = num1.slice(1, num1.length);
            }
            if (num2[0] === operators_1.MINUS) {
                num2PosNeg = operators_1.MINUS;
                num2 = num2.slice(1, num2.length);
            }
            const isSubtract = operators_1.posNegTable[num1PosNeg][num2PosNeg] === operators_1.PLUS;
            let result;
            let isNegAns = false;
            if (isSubtract) {
                if ((0, compare_number_1.default)(num1, num2).result === -1) {
                    result = (0, operators_2.subtract)(num2, num1);
                    if (num2PosNeg === operators_1.PLUS)
                        isNegAns = true;
                }
                else {
                    result = (0, operators_2.subtract)(num1, num2);
                    if (num1PosNeg === operators_1.MINUS)
                        isNegAns = true;
                }
            }
            else {
                result = (0, operators_2.add)(num1, num2);
                if (num1PosNeg === operators_1.MINUS)
                    isNegAns = true;
            }
            const ans = `${isNegAns ? operators_1.MINUS : ""}${result}`;
            blocks.splice(minus - 1, 3, ans);
            continue;
        }
        const plus = blocks.indexOf(operators_1.PLUS);
        if (plus !== -1) {
            let num1 = blocks[plus - 1];
            let num2 = blocks[plus + 1];
            let num1PosNeg = operators_1.PLUS;
            let num2PosNeg = operators_1.PLUS;
            if (num1[0] === operators_1.MINUS) {
                num1PosNeg = operators_1.MINUS;
                num1 = num1.slice(1, num1.length);
            }
            if (num2[0] === operators_1.MINUS) {
                num2PosNeg = operators_1.MINUS;
                num2 = num2.slice(1, num2.length);
            }
            const isSubtract = operators_1.posNegTable[num1PosNeg][num2PosNeg] === operators_1.MINUS;
            let result;
            let isNegAns = false;
            if (isSubtract) {
                if ((0, compare_number_1.default)(num1, num2).result === -1) {
                    result = (0, operators_2.subtract)(num2, num1);
                    if (num2PosNeg === operators_1.MINUS)
                        isNegAns = true;
                }
                else {
                    result = (0, operators_2.subtract)(num1, num2);
                    if (num1PosNeg === operators_1.MINUS)
                        isNegAns = true;
                }
            }
            else {
                result = (0, operators_2.add)(num1, num2);
                if (num1PosNeg === operators_1.MINUS || num2PosNeg === operators_1.MINUS)
                    isNegAns = true;
            }
            const ans = `${isNegAns ? operators_1.MINUS : ""}${result}`;
            blocks.splice(plus - 1, 3, ans);
            continue;
        }
    }
    let result = blocks[0];
    if (result === operators_1.NEG_ZERO)
        result = operators_1.ZERO;
    return result;
}
function separateBlocks(input) {
    const blocks = [""];
    let k = 0;
    for (let i = 0; i < input.length; i++) {
        const x = input[i];
        const y = input[i + 1];
        if (x === operators_1.SPACE) {
            blocks[k] = y;
            i++;
        }
        else if (operators_1.operators.includes(x)) {
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
//# sourceMappingURL=calculate.js.map