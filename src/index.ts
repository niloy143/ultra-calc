import multiplication from "./operators/multiplication";
import addition from "./operators/addition";
import subtraction from "./operators/subtraction";

const num1 = Array(10000000).fill("9").join("");
const num2 = Array(2).fill("9").join("");

const start = Date.now();
console.log(multiplication(num1, num2).length); // gunok er length beshi hole loop onek beshi hoy
// console.log(addition(num1, num2).length);
// console.log(subtraction(num1, num2));
console.log(Date.now() - start);