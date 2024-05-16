import addition from "./addition";
import { FRACTION_LIMIT } from "./division";

/**
 * Removes the last decimal digit and rounds the number
 * @param num a valid sanitized number (@type String)
 */
export default function round(num: string) {
	let [int, dec] = num.split(".");

	if (!dec?.length || dec.length <= FRACTION_LIMIT) return num;

	const lastDigit = Number(dec[dec.length - 1]);
	const decArray = dec.slice(0, dec.length - 1).split("");

	let carry = false;
	if (lastDigit >= 5) {
		carry = true;
	}

	while (carry && decArray.length) {
		decArray[decArray.length - 1] = addition(decArray[decArray.length - 1], "1");
		if (decArray[decArray.length - 1].length > 1) {
			decArray.pop();
		} else {
			carry = false;
		}
	}

	if (carry) int = addition(int, "1");
	dec = decArray.join("");

	return int + (dec.length ? `.${dec}` : "");
}
