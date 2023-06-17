import digitEqualizer from "./digit-equalizer";

function summation(numbers: string[]): string {
    const newArr = digitEqualizer(numbers);
    return newArr.reduce((p, c) => {
        const sum = { value: "", carry: 0 };
        for (let i = p.length - 1; i >= 0; i--) {
            const num1 = Number(p[i]);
            const num2 = Number(c[i]);
            const [digitSum] = digitEqualizer([`${num1 + num2 + sum.carry}`, `${99}`]);
            const [carry, value] = digitSum.split("");
            sum.value = value + sum.value;
            sum.carry = Number(carry);
        }
        return (sum.carry || "") + sum.value;
    }, Array(newArr[0].length).fill("0").join(""));
}

export default summation;