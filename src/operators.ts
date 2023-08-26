import multiplication from "./helpers/multiplication";
import addition from "./helpers/addition";
import subtraction from "./helpers/subtraction";
import numValidator from "./helpers/num-validator";

function add(num1: string, num2: string): string {
    return addition(numValidator(`${num1}`), numValidator(`${num2}`))
}
function subtract(num1: string, num2: string): string {
    return subtraction(numValidator(`${num1}`), numValidator(`${num2}`))
}
function multiply(num1: string, num2: string): string {
    return multiplication(numValidator(`${num1}`), numValidator(`${num2}`))
}

export {
    add,
    subtract,
    multiply
};