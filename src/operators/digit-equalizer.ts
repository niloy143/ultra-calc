function digitEqualizer(numbers: string[], isDecimal: boolean = false): string[] {
    let largestLength = numbers.reduce((prevLen, curr) => {
        const currLen = `${curr || ""}`.length;
        return prevLen > currLen ? prevLen : currLen;
    }, 0);
    const result: string[] = numbers.map(num => {
        const zeros = Array(largestLength - `${num}`.length).fill("0").join("");
        return isDecimal ? num + zeros : zeros + num;
    }
    );
    return result;
}

export default digitEqualizer;