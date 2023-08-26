"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zero_remover_1 = require("./zero-remover");
function numSanitizer(num) {
    let [int, frac] = num.split(".");
    if (int)
        int = (0, zero_remover_1.shiftZeroes)(int);
    if (frac)
        frac = (0, zero_remover_1.popZeroes)(frac);
    if (int && !frac)
        return int;
    if (!int && frac)
        return "0." + frac;
    if (!int && !frac)
        return "0";
    return int + "." + frac;
}
exports.default = numSanitizer;
//# sourceMappingURL=num-sanitizer.js.map