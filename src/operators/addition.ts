import digitEqualizer from "./digit-equalizer";
import { popZero, shiftZero } from "./zero-remover";

function addition(num1: string, num2: string): string {
    const [int1, dec1] = num1.split(".");
    const [int2, dec2] = num2.split(".");
    const [n1, n2] = digitEqualizer([int1, int2]);

    let decSum = "";
    let decCarry: 0 | 1 = 0;
    if (dec1 || dec2) {
        const [d1, d2] = digitEqualizer([dec1 || "", dec2 || ""], true);
        decSum = add(d1, d2);
        if (decSum.length > d1.length) {
            decCarry = 1;
            decSum = decSum.slice(1, decSum.length);
        }
    }

    const ints = shiftZero(add(n1, n2, decCarry));
    const decs = popZero(decSum);

    return `${ints || 0}${decs ? "." + decs : ""}`;
}

function add(n1: string, n2: string, c: 0 | 1 = 0): string {
    let sum = "";
    let carry: 0 | 1 = c;
    for (let i = n1.length - 1; i >= 0; i--) {
        const digit1 = Number(n1[i]);
        const digit2 = Number(n2[i]);
        const sumResult = digit1 + digit2 + carry;
        if (sumResult > 9) {
            sum = (sumResult - 10) + sum;
            carry = 1;
        } else {
            sum = sumResult + sum;
            carry = 0;
        }
    }
    return `${carry || ""}${sum}`;
}

export default addition;