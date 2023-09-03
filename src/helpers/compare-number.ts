import { DOT } from "../utils/operators";

type ComparedResult = { big: string, small: string, result: 1 | 0 | -1 }

function getResult(x: string, y: string) {
    return {
        greater: { big: x, small: y, result: 1 } as ComparedResult,
        smaller: { big: y, small: x, result: -1 } as ComparedResult,
        equal: { big: x, small: y, result: 0 } as ComparedResult
    }
}

function compareNumber(n1: string, n2: string): ComparedResult {
    const result = getResult(n1, n2);

    const [num1, dec1] = n1.split(DOT);
    const [num2, dec2] = n2.split(DOT);

    if (num1.length > num2.length) return result.greater;
    if (num1.length < num2.length) return result.smaller;

    for (let i = 0; i < num1.length; i++) {
        const n1 = Number(num1[i]);
        const n2 = Number(num2[i]);
        if (n1 > n2)
            return result.greater;
        else if (n1 < n2)
            return result.smaller;
    }

    let i = 0;
    while (dec1?.[i] !== undefined || dec2?.[i] !== undefined) {
        const x = Number(dec1[i]);
        const y = Number(dec2[i]);
        if (x > y) return result.greater;
        else if (x < y) return result.smaller;
        i++;
    }

    return result.equal;
}

export default compareNumber;