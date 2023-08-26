"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const digit_equalizer_1 = __importDefault(require("./digit-equalizer"));
const zero_remover_1 = require("./zero-remover");
function subtraction(num1, num2) {
    const [int1, dec1] = num1.split(".");
    const [int2, dec2] = num2.split(".");
    const [n1, n2] = (0, digit_equalizer_1.default)([int1, int2]);
    let decDiff = "";
    let decCarry = 0;
    if (dec1 || dec2) {
        const [d1, d2] = (0, digit_equalizer_1.default)([dec1 || "", dec2 || ""], true);
        decDiff = subtract(d1, d2);
        if (decDiff.length > d1.length) {
            decCarry = 1;
            decDiff = decDiff.slice(1, decDiff.length);
        }
    }
    const ints = (0, zero_remover_1.shiftZeroes)(subtract(n1, n2, decCarry));
    const decs = (0, zero_remover_1.popZeroes)(decDiff);
    return `${ints || 0}${decs ? "." + decs : ""}`;
}
function subtract(n1, n2, c = 0) {
    let diff = "";
    let carry = c;
    for (let i = n1.length - 1; i >= 0; i--) {
        let digit1 = Number(n1[i]);
        const digit2 = Number(n2[i]) + carry;
        if (digit1 < digit2) {
            digit1 += 10;
            carry = 1;
        }
        else {
            carry = 0;
        }
        diff = (digit1 - digit2) + diff;
    }
    return `${carry || ""}${diff}`;
}
exports.default = subtraction;
//# sourceMappingURL=subtraction.js.map