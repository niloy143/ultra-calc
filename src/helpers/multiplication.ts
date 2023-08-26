import addition from "./addition";
import compareNumber from "./compare-number";
import numSanitizer from "./num-sanitizer";

function multiplication(num1: string, num2: string): string {
    const n1DecIndex = num1.indexOf(".");
    const n2DecIndex = num2.indexOf(".");

    const d1 = n1DecIndex === -1 ? 0 : num1.length - n1DecIndex - 1;
    const d2 = n2DecIndex === -1 ? 0 : num2.length - n2DecIndex - 1;
    const totalDecs = d1 + d2;

    let product = multiply(num1.split(".").join(""), num2.split(".").join(""));

    if (product.length > totalDecs) {
        const decIndex = product.length - totalDecs;
        product = product.slice(0, decIndex) + "." + product.slice(decIndex, product.length);
    } else {
        product = "0." + Array(totalDecs - product.length).fill("0").join("") + product;
    }

    return numSanitizer(product);
}

function multiply(num1: string, num2: string) {
    const [bigNum, smallNum] = compareNumber(num1, num2);
    let sumOfMul = "";
    for (let i = smallNum.length - 1; i >= 0; i--) {
        const digit1 = Number(smallNum[i]);
        if (!digit1) continue;
        let mulResult = "";
        let carry = 0;
        for (let j = bigNum.length - 1; j >= 0; j--) {
            const digit2 = Number(bigNum[j]);
            const mul = (digit1 * digit2) + carry;
            carry = Math.floor(mul / 10);
            mulResult = mul % 10 + mulResult;
        }
        const currMul = `${carry || ""}${mulResult}` + Array(smallNum.length - 1 - i).fill("0").join("");
        sumOfMul = addition(sumOfMul, currMul);
    }
    return sumOfMul || "0";
}

export default multiplication;