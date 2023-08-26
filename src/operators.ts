import multiplication from "./helpers/multiplication";
import addition from "./helpers/addition";
import subtraction from "./helpers/subtraction";
import numValidator from "./helpers/num-validator";

type num = number | string;

function add(num1: num, num2: num): string {
    return addition(numValidator(`${num1}`), numValidator(`${num2}`))
}
function subtract(num1: num, num2: num): string {
    return subtraction(numValidator(`${num1}`), numValidator(`${num2}`))
}
function multiply(num1: num, num2: num): string {
    return multiplication(numValidator(`${num1}`), numValidator(`${num2}`))
}

export {
    add,
    subtract,
    multiply
};