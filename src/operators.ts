import multiplication from "./helpers/multiplication";
import addition from "./helpers/addition";
import subtraction from "./helpers/subtraction";
import numValidator from "./helpers/num-validator";
import division from "./helpers/division";

function add(num1: string, num2: string): string {
    return addition(numValidator(`${num1}`), numValidator(`${num2}`))
}
function subtract(num1: string, num2: string): string {
    return subtraction(numValidator(`${num1}`), numValidator(`${num2}`))
}
function multiply(num1: string, num2: string): string {
    return multiplication(numValidator(`${num1}`), numValidator(`${num2}`))
}
function divide(dividend: string, divisor: string): string {
    return division(numValidator(`${dividend}`), numValidator(`${divisor}`))
}

export {
    add,
    subtract,
    multiply,
    divide
};