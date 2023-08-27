export default function invalidErr(condition: boolean): void {
    if (condition) {
        throw new Error("Invalid Input");
    }
}