import { popZeroes, shiftZeroes } from "./zero-remover";

export default function numSanitizer(num: string): string {
    let [int, frac] = num.split(".");
    int = shiftZeroes(int);
    frac = popZeroes(frac);

    if (int && !frac) return int;
    if (!int && frac) return "0." + frac;
    if (!int && !frac) return "0";

    return int + "." + frac;
}