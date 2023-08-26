import multiplication from "./multiplication";
import numSanitizer from "./num-sanitizer";
import subtraction from "./subtraction";
import { shiftZeroes } from "./zero-remover";

export default function division(dividend: string, divisor: string, fractionLimit?: number): string {
    const quotient = divide(dividend, divisor, fractionLimit);
    // const dividendDecIndex = dividend.indexOf(".");
    // const divisorDecIndex = divisor.indexOf(".");

    // const dividendDecs = dividendDecIndex === -1 ? 0 : dividend.length - dividendDecIndex - 1;
    // const divisorDecs = divisorDecIndex === -1 ? 0 : divisor.length - divisorDecIndex - 1;
    // const totalDecs = dividendDecs - divisorDecs;

    // let quotient = divide(dividend.split(".").join(""), divisor.split(".").join(""));

    // if( totalDecs < 0) {
    //     // add more zeros to the end;
    // } else if (quotient.length > totalDecs) {
    //     const decIndex = quotient.length - totalDecs;
    //     quotient = quotient.slice(0, decIndex) + "." + quotient.slice(decIndex, quotient.length);
    // } else {
    //     quotient = "0." + Array(totalDecs - quotient.length).fill("0").join("") + quotient;
    // }

    return numSanitizer(quotient);
}

function divide(dividend: string, divisor: string, fractionLimit = 1000): string {
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
            let mul = multiplication(divisor, `${j}`);
            if (!greaterThan(mul, remainder)) {
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

function greaterThan(big: string, small: string) {
    return Number(big) > Number(small);
}