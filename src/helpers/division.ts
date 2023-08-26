import compareNumber from "./compare-number";
import multiplication from "./multiplication";
import numSanitizer from "./num-sanitizer";
import subtraction from "./subtraction";
import { shiftZeroes } from "./zero-remover";

export default function division(dividend: string, divisor: string, fractionLimit?: number): string {
    const dividendDecIndex = dividend.indexOf(".");
    const divisorDecIndex = divisor.indexOf(".");

    const dividendDecs = dividendDecIndex === -1 ? 0 : dividend.length - dividendDecIndex - 1;
    const divisorDecs = divisorDecIndex === -1 ? 0 : divisor.length - divisorDecIndex - 1;
    const totalDecs = dividendDecs - divisorDecs;

    let quotient = divide(dividend.split(".").join(""), divisor.split(".").join(""), fractionLimit);
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

function divide(dividend: string, divisor: string, fractionLimit = 10): string {
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

        let j = 9;
        while (j >= 0) {
            if (compareNumber(remainder, divisor).result === -1) j = 0;
            const mul = multiplication(divisor, `${j}`);
            if (compareNumber(mul, remainder).result !== 1) {
                quotient += j;
                remainder = subtraction(remainder, mul);
                break;
            }
            j--
        }
        i++;
    } while ((shiftZeroes(remainder) || i < dividend.length) && (i - dividend.length) < fractionLimit)

    return quotient;
}