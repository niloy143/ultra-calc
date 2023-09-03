"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("../utils/operators");
const compare_number_1 = __importDefault(require("./compare-number"));
const multiplication_1 = __importDefault(require("./multiplication"));
const num_sanitizer_1 = __importDefault(require("./num-sanitizer"));
const subtraction_1 = __importDefault(require("./subtraction"));
const zero_remover_1 = require("./zero-remover");
function division(dividend, divisor, fractionLimit) {
    const dividendDecIndex = dividend.indexOf(".");
    const divisorDecIndex = divisor.indexOf(".");
    const dividendDecs = dividendDecIndex === -1 ? 0 : dividend.length - dividendDecIndex - 1;
    const divisorDecs = divisorDecIndex === -1 ? 0 : divisor.length - divisorDecIndex - 1;
    const totalDecs = dividendDecs - divisorDecs;
    dividend = (0, num_sanitizer_1.default)(dividend.split(".").join(""));
    divisor = divisor.split(".").join("");
    let quotient = divide(dividend, divisor, fractionLimit);
    let currDecIndex = quotient.indexOf(".");
    currDecIndex = currDecIndex === -1 ? quotient.length : currDecIndex;
    const targetDecIndex = currDecIndex - totalDecs;
    quotient = quotient.split(".").join("");
    if (targetDecIndex > 0 && targetDecIndex < quotient.length) {
        quotient = quotient.slice(0, targetDecIndex) + "." + quotient.slice(targetDecIndex, quotient.length);
    }
    else if (targetDecIndex <= 0) {
        quotient = "0." + Array(Math.abs(targetDecIndex)).fill("0").join("") + quotient;
    }
    else {
        quotient += Array(targetDecIndex - quotient.length).fill("0").join("");
    }
    return (0, num_sanitizer_1.default)(quotient);
}
exports.default = division;
function divide(dividend, divisor, fractionLimit = 1000) {
    if (divisor === operators_1.ZERO)
        throw new Error("Cannot divide by zero");
    let quotient = "";
    let remainder = "";
    let i = 0;
    do {
        if (i < dividend.length) {
            remainder += dividend[i];
        }
        else {
            if (i == dividend.length) {
                quotient += ".";
            }
            remainder += "0";
        }
        let j = 0;
        let currProd = "";
        while (j <= 9) {
            const product = (0, multiplication_1.default)(divisor, `${j}`);
            if ((0, compare_number_1.default)(product, remainder).result === 1)
                break;
            currProd = product;
            j++;
        }
        quotient += (j - 1);
        remainder = (0, subtraction_1.default)(remainder, currProd);
        i++;
    } while (((0, zero_remover_1.shiftZeroes)(remainder) || i < dividend.length) && (i - dividend.length) < fractionLimit);
    return quotient;
}
//# sourceMappingURL=division.js.map