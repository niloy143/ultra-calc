"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addition_1 = __importDefault(require("./addition"));
const division_1 = require("./division");
/**
 * Removes the last decimal digit and rounds the number
 * @param num a valid sanitized number (@type String)
 */
function round(num) {
    let [int, dec] = num.split(".");
    if (!(dec === null || dec === void 0 ? void 0 : dec.length) || dec.length <= division_1.FRACTION_LIMIT)
        return num;
    const lastDigit = Number(dec[dec.length - 1]);
    const decArray = dec.slice(0, dec.length - 1).split("");
    let carry = false;
    if (lastDigit >= 5) {
        carry = true;
    }
    while (carry && decArray.length) {
        decArray[decArray.length - 1] = (0, addition_1.default)(decArray[decArray.length - 1], "1");
        if (decArray[decArray.length - 1].length > 1) {
            decArray.pop();
        }
        else {
            carry = false;
        }
    }
    if (carry)
        int = (0, addition_1.default)(int, "1");
    dec = decArray.join("");
    return int + (dec.length ? `.${dec}` : "");
}
exports.default = round;
//# sourceMappingURL=round.js.map