export default function numValidator(num: string): string {

    const pattern = /^\d+\.?\d+$/;
    if (!pattern.test(num)) error("Invalid number");
    console.log(pattern.test(num));

    return num;
}

function error(message: string): void {
    throw new Error(message);
}