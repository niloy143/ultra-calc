"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addition_1 = __importDefault(require("./addition"));
const compare_number_1 = __importDefault(require("./compare-number"));
const num_sanitizer_1 = __importDefault(require("./num-sanitizer"));
function multiplication(num1, num2) {
    const n1DecIndex = num1.indexOf(".");
    const n2DecIndex = num2.indexOf(".");
    const d1 = n1DecIndex === -1 ? 0 : num1.length - n1DecIndex - 1;
    const d2 = n2DecIndex === -1 ? 0 : num2.length - n2DecIndex - 1;
    const totalDecs = d1 + d2;
    let product = multiply(num1.split(".").join(""), num2.split(".").join(""));
    if (product.length > totalDecs) {
        const decIndex = product.length - totalDecs;
        product = product.slice(0, decIndex) + "." + product.slice(decIndex, product.length);
    }
    else {
        product = "0." + Array(totalDecs - product.length).fill("0").join("") + product;
    }
    return (0, num_sanitizer_1.default)(product);
}
function multiply(num1, num2) {
    const { big: multiplicand, small: multiplier } = (0, compare_number_1.default)(num1, num2);
    let sumOfMul = "";
    for (let i = multiplier.length - 1; i >= 0; i--) {
        const digit1 = Number(multiplier[i]);
        if (!digit1)
            continue;
        let mulResult = "";
        let carry = 0;
        for (let j = multiplicand.length - 1; j >= 0; j--) {
            const digit2 = Number(multiplicand[j]);
            const mul = (digit1 * digit2) + carry;
            carry = Math.floor(mul / 10);
            mulResult = mul % 10 + mulResult;
        }
        const currMul = `${carry || ""}${mulResult}` + Array(multiplier.length - 1 - i).fill("0").join("");
        sumOfMul = (0, addition_1.default)(sumOfMul, currMul);
    }
    return sumOfMul || "0";
}
exports.default = multiplication;
//# sourceMappingURL=multiplication.js.map