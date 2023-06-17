function multiplication(numbers: number[]): number {
    return numbers.reduce((prev, cur) => {
        const small = prev > cur ? cur : prev;
        const large = prev < cur ? cur : prev;

        // const digits = `${small}`.length;
        // const multiplications = new Array(digits).fill([]).map((_, digitIndex) => {
        //     return `${large}`.split("").map(x => Number(x) * Number(`${small}`[digitIndex]))
        // })
        // console.log(small, large, multiplications)

        return small * large;
    }, 1);
}

export default multiplication;