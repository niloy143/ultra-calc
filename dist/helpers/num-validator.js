"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function numValidator(num) {
    // const pattern = /^\d*\.?\d+$/;
    // if (!pattern.test(num)) {
    //     let number = num.length <= 20 ? num : `${num.slice(0, 20)}...`;
    //     throw new Error(`${number} is not the string of a valid number`);
    // }
    return num;
}
exports.default = numValidator;
//# sourceMappingURL=num-validator.js.map