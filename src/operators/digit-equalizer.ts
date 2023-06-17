function digitEqualizer(numbers: string[]): string[] {
    let largestLength = numbers.reduce((prevLen, curr) => {
        const currLen = `${curr}`.length;
        return prevLen > currLen ? prevLen : currLen;
    }, 0);
    const result: string[] = numbers.map(num =>
        Array(largestLength - `${num}`.length).fill("0").join("") + `${num}`
    );
    return result;
}

export default digitEqualizer;