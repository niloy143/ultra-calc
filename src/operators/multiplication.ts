import digitEqualizer from "./digit-equalizer";

function multiplication(num1: string, num2: string): string {
    const [n1, n2] = digitEqualizer([num1, num2]);
    return `${Number(n1) * Number(n2)}`;
}

export default multiplication;