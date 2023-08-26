"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const digit_equalizer_1 = __importDefault(require("./digit-equalizer"));
const zero_remover_1 = require("./zero-remover");
function addition(num1, num2) {
    const [int1, dec1] = num1.split(".");
    const [int2, dec2] = num2.split(".");
    const [n1, n2] = (0, digit_equalizer_1.default)([int1, int2]);
    let decSum = "";
    let decCarry = 0;
    if (dec1 || dec2) {
        const [d1, d2] = (0, digit_equalizer_1.default)([dec1 || "", dec2 || ""], true);
        decSum = add(d1, d2);
        if (decSum.length > d1.length) {
            decCarry = 1;
            decSum = decSum.slice(1, decSum.length);
        }
    }
    const ints = (0, zero_remover_1.shiftZeroes)(add(n1, n2, decCarry));
    const decs = (0, zero_remover_1.popZeroes)(decSum);
    return `${ints || 0}${decs ? "." + decs : ""}`;
}
function add(n1, n2, c = 0) {
    let sum = "";
    let carry = c;
    for (let i = n1.length - 1; i >= 0; i--) {
        const digit1 = Number(n1[i]);
        const digit2 = Number(n2[i]);
        const sumResult = digit1 + digit2 + carry;
        if (sumResult > 9) {
            sum = (sumResult - 10) + sum;
            carry = 1;
        }
        else {
            sum = sumResult + sum;
            carry = 0;
        }
    }
    return `${carry || ""}${sum}`;
}
exports.default = addition;
//# sourceMappingURL=addition.js.map