"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function invalidErr(condition) {
    if (condition) {
        throw new Error("Invalid Input");
    }
}
exports.default = invalidErr;
//# sourceMappingURL=invalid-err.js.map