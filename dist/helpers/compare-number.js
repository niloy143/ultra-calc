"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("../utils/operators");
function getResult(x, y) {
    return {
        greater: { big: x, small: y, result: 1 },
        smaller: { big: y, small: x, result: -1 },
        equal: { big: x, small: y, result: 0 }
    };
}
function compareNumber(n1, n2) {
    const result = getResult(n1, n2);
    const [num1, dec1] = n1.split(operators_1.DOT);
    const [num2, dec2] = n2.split(operators_1.DOT);
    if (num1.length > num2.length)
        return result.greater;
    if (num1.length < num2.length)
        return result.smaller;
    for (let i = 0; i < num1.length; i++) {
        const n1 = Number(num1[i]);
        const n2 = Number(num2[i]);
        if (n1 > n2)
            return result.greater;
        else if (n1 < n2)
            return result.smaller;
    }
    let i = 0;
    while ((dec1 === null || dec1 === void 0 ? void 0 : dec1[i]) !== undefined || (dec2 === null || dec2 === void 0 ? void 0 : dec2[i]) !== undefined) {
        const x = Number(dec1[i]);
        const y = Number(dec2[i]);
        if (x > y)
            return result.greater;
        else if (x < y)
            return result.smaller;
        i++;
    }
    return result.equal;
}
exports.default = compareNumber;
//# sourceMappingURL=compare-number.js.map