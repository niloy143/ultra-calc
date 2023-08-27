import calculate from "./calculate/calculate";
import { add, subtract, multiply, divide } from "./calculate/operators";

console.log(calculate("45 / 9+(3*9)-30"));

export {
    add,
    subtract,
    multiply,
    divide
};