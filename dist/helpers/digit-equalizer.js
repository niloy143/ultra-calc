"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function digitEqualizer(numbers, isDecimal = false) {
    let largestLength = numbers.reduce((prevLen, curr) => {
        const currLen = `${curr || ""}`.length;
        return prevLen > currLen ? prevLen : currLen;
    }, 0);
    const result = numbers.map(num => {
        const zeros = Array(largestLength - `${num}`.length).fill("0").join("");
        return isDecimal ? num + zeros : zeros + num;
    });
    return result;
}
exports.default = digitEqualizer;
//# sourceMappingURL=digit-equalizer.js.map