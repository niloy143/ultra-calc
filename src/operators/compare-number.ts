// return [big, small]
function compareNumber(num1: string, num2: string): [string, string] {
    for (let i = 0; i < num1.length; i++) {
        const n1 = Number(num1[i]);
        const n2 = Number(num2[i]);
        if (n1 != n2) {
            if (n1 < n2)
                return [num2, num1];
            break;
        }
    }
    return [num1, num2];
}

export default compareNumber;