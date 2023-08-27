"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.divide = exports.multiply = exports.subtract = exports.add = void 0;
const multiplication_1 = __importDefault(require("../helpers/multiplication"));
const addition_1 = __importDefault(require("../helpers/addition"));
const subtraction_1 = __importDefault(require("../helpers/subtraction"));
const num_validator_1 = __importDefault(require("../helpers/num-validator"));
const division_1 = __importDefault(require("../helpers/division"));
function add(num1, num2) {
    return (0, addition_1.default)((0, num_validator_1.default)(`${num1}`), (0, num_validator_1.default)(`${num2}`));
}
exports.add = add;
function subtract(num1, num2) {
    return (0, subtraction_1.default)((0, num_validator_1.default)(`${num1}`), (0, num_validator_1.default)(`${num2}`));
}
exports.subtract = subtract;
function multiply(num1, num2) {
    return (0, multiplication_1.default)((0, num_validator_1.default)(`${num1}`), (0, num_validator_1.default)(`${num2}`));
}
exports.multiply = multiply;
function divide(dividend, divisor, fractionLimit) {
    return (0, division_1.default)((0, num_validator_1.default)(`${dividend}`), (0, num_validator_1.default)(`${divisor}`), fractionLimit);
}
exports.divide = divide;
//# sourceMappingURL=operators.js.map