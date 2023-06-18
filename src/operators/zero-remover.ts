export function popZeroes(num: string) {
    let zeros = 0;
    while (true) {
        if (num[num.length - 1 - zeros] == "0")
            zeros++;
        else break;
    }
    return num.slice(0, num.length - zeros);
};
export function shiftZeroes(num: string) {
    let zeros = 0;
    while (true) {
        if (num[zeros] == "0")
            zeros++;
        else break;
    }
    return num.slice(zeros, num.length);
};