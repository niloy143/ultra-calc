import { ZERO } from "../utils/operators";
import compareNumber from "./compare-number";
import multiplication from "./multiplication";
import numSanitizer from "./num-sanitizer";
import subtraction from "./subtraction";
import { shiftZeroes } from "./zero-remover";

export const FRACTION_LIMIT = 1000;

export default function division(dividend: string, divisor: string): string {
    const dividendDecIndex = dividend.indexOf(".");
    const divisorDecIndex = divisor.indexOf(".");

    const dividendDecs = dividendDecIndex === -1 ? 0 : dividend.length - dividendDecIndex - 1;
    const divisorDecs = divisorDecIndex === -1 ? 0 : divisor.length - divisorDecIndex - 1;
    const totalDecs = dividendDecs - divisorDecs;

    dividend = numSanitizer(dividend.split(".").join(""));
    divisor = divisor.split(".").join("");
    let quotient = divide(dividend, divisor);
    let currDecIndex = quotient.indexOf(".");
    currDecIndex = currDecIndex === -1 ? quotient.length : currDecIndex;
    const targetDecIndex = currDecIndex - totalDecs;

    quotient = quotient.split(".").join("");
    if (targetDecIndex > 0 && targetDecIndex < quotient.length) {
        quotient = quotient.slice(0, targetDecIndex) + "." + quotient.slice(targetDecIndex, quotient.length);
    } else if (targetDecIndex <= 0) {
        quotient = "0." + Array(Math.abs(targetDecIndex)).fill("0").join("") + quotient;
    } else {
        quotient += Array(targetDecIndex - quotient.length).fill("0").join("");
    }

    return numSanitizer(quotient);
}

function divide(dividend: string, divisor: string): string {
    const fractionLimit = FRACTION_LIMIT+1; // the last decimal digit is used to round the number

    if (divisor === ZERO)
        throw new Error("Cannot divide by zero")

    let quotient = "";
    let remainder = "";

    let i = 0;
    do {
        if (i < dividend.length) {
            remainder += dividend[i];
        } else {
            if (i == dividend.length) {
                quotient += ".";
            }
            remainder += "0";
        }

        let j = 0;
        let currProd = "";
        while (j <= 9) {
            const product = multiplication(divisor, `${j}`);
            if (compareNumber(product, remainder).result === 1) break;
            currProd = product;
            j++;
        }
        quotient += (j - 1);
        remainder = subtraction(remainder, currProd);

        i++;
    } while ((shiftZeroes(remainder) || i < dividend.length) && (i - dividend.length) < fractionLimit)

    return quotient;
}