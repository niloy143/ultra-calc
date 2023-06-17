import digitEqualizer from "./digit-equalizer";
import { popZero, shiftZero } from "./zero-remover";

function subtraction(num1: string, num2: string): string {
    const [int1, dec1] = num1.split(".");
    const [int2, dec2] = num2.split(".");
    const [n1, n2] = digitEqualizer([int1, int2]);

    let decDiff = "";
    let decCarry: 0 | 1 = 0;
    if (dec1 || dec2) {
        const [d1, d2] = digitEqualizer([dec1 || "", dec2 || ""], true);
        decDiff = subtract(d1, d2);
        if (decDiff.length > d1.length) {
            decCarry = 1;
            decDiff = decDiff.slice(1, decDiff.length);
        }
    }

    const ints = shiftZero(subtract(n1, n2, decCarry));
    const decs = popZero(decDiff);

    return `${ints || 0}${decs ? "." + decs : ""}`;
}

function subtract(n1: string, n2: string, c: 0 | 1 = 0): string {
    let diff = "";
    let carry: 0 | 1 = c;
    for (let i = n1.length - 1; i >= 0; i--) {
        let digit1 = Number(n1[i]);
        const digit2 = Number(n2[i]) + carry;
        if (digit1 < digit2) {
            digit1 += 10;
            carry = 1;
        } else {
            carry = 0;
        }
        diff = (digit1 - digit2) + diff;
    }
    return `${carry || ""}${diff}`;
}

export default subtraction;