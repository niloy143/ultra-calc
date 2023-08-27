"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.posNegTable = exports.operators = exports.NEG_ZERO = exports.ZERO = exports.SPACE = exports.DOT = exports.BRACE_END = exports.BRACE_START = exports.DIVISION = exports.INTO = exports.MINUS = exports.PLUS = void 0;
_a = ["+", "-", "*", "/", "(", ")", ".", " ", "0", "-0"], exports.PLUS = _a[0], exports.MINUS = _a[1], exports.INTO = _a[2], exports.DIVISION = _a[3], exports.BRACE_START = _a[4], exports.BRACE_END = _a[5], exports.DOT = _a[6], exports.SPACE = _a[7], exports.ZERO = _a[8], exports.NEG_ZERO = _a[9];
exports.operators = [exports.INTO, exports.DIVISION, exports.PLUS, exports.MINUS];
exports.posNegTable = {
    [exports.PLUS]: {
        [exports.PLUS]: exports.PLUS,
        [exports.MINUS]: exports.MINUS,
    },
    [exports.MINUS]: {
        [exports.MINUS]: exports.PLUS,
        [exports.PLUS]: exports.MINUS,
    }
};
//# sourceMappingURL=operators.js.map