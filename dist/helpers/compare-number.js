"use strict";
// 0 => equal
// 1 => first number is greater
// -1 => first number is smaller
Object.defineProperty(exports, "__esModule", { value: true });
function compareNumber(num1, num2) {
    if (num1.length > num2.length)
        return { big: num1, small: num2, result: 1 };
    if (num1.length < num2.length)
        return { small: num1, big: num2, result: -1 };
    for (let i = 0; i < num1.length; i++) {
        const n1 = Number(num1[i]);
        const n2 = Number(num2[i]);
        if (n1 > n2)
            return { big: num1, small: num2, result: 1 };
        else if (n1 < n2)
            return { small: num1, big: num2, result: -1 };
    }
    return { big: num1, small: num2, result: 0 };
}
exports.default = compareNumber;
//# sourceMappingURL=compare-number.js.map