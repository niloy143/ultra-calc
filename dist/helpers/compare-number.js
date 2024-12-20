"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("../utils/operators");
const digit_equalizer_1 = __importDefault(require("./digit-equalizer"));
const num_sanitizer_1 = __importDefault(require("./num-sanitizer"));
function getResult(x, y) {
    return {
        greater: { big: x, small: y, result: 1 },
        smaller: { big: y, small: x, result: -1 },
        equal: { big: x, small: y, result: 0 }
    };
}
function compareNumber(n1, n2) {
    const result = getResult(n1, n2);
    let [num1, dec1] = (0, num_sanitizer_1.default)(n1).split(operators_1.DOT);
    let [num2, dec2] = (0, num_sanitizer_1.default)(n2).split(operators_1.DOT);
    [num1, num2] = (0, digit_equalizer_1.default)([num1 || "", num2 || ""]);
    [dec1, dec2] = (0, digit_equalizer_1.default)([dec1 || "", dec2 || ""], true);
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