import addition from "./addition";
import compareNumber from "./compare-number";

function multiplication(num1: string, num2: string): string {
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