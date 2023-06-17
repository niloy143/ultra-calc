import addition from "./addition";
import compareNumber from "./compare-number";
import digitEqualizer from "./digit-equalizer";

function multiplication(num1: string, num2: string): string {
    const [bigNum, smallNum] = compareNumber(num1, num2);
    const digitMultiplications: string[] = Array(smallNum.length).fill("");
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
        digitMultiplications[digitMultiplications.length - 1 - i] = `${carry || ""}${mulResult}`;
    }
    const result = digitMultiplications.reduce((prev, curr, i) => {
        const currNum = curr + Array(i).fill("0").join("");
        return addition(prev, currNum);
    }, "")
    return result;
}

export default multiplication;