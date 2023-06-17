function compareNumber(num1: string, num2: string): [string, string] {
    let result: [string, string] = [num1, num2];
    for (let i = 0; i < num1.length; i++) {
        const n1 = Number(num1[i]);
        const n2 = Number(num2[i]);
        if (n1 != n2) {
            if (n1 < n2)
                result = [num2, num1];
            break;
        }
    }
    return result; // [big, small]
}

export default compareNumber;