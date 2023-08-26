"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shiftZeroes = exports.popZeroes = void 0;
function popZeroes(num) {
    let zeros = 0;
    while (true) {
        if (num[num.length - 1 - zeros] == "0")
            zeros++;
        else
            break;
    }
    return num.slice(0, num.length - zeros);
}
exports.popZeroes = popZeroes;
;
function shiftZeroes(num) {
    let zeros = 0;
    while (true) {
        if (num[zeros] == "0")
            zeros++;
        else
            break;
    }
    return num.slice(zeros, num.length);
}
exports.shiftZeroes = shiftZeroes;
;
//# sourceMappingURL=zero-remover.js.map