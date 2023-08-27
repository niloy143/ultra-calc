export const
    [PLUS, MINUS, INTO, DIVISION, BRACE_START, BRACE_END, DOT, SPACE, ZERO, NEG_ZERO] =
        ["+", "-", "*", "/", "(", ")", ".", " ", "0", "-0"];

export const operators = [INTO, DIVISION, PLUS, MINUS];

export const posNegTable = {
    [PLUS]: {
        [PLUS]: PLUS,
        [MINUS]: MINUS,
    },
    [MINUS]: {
        [MINUS]: PLUS,
        [PLUS]: MINUS,
    }
}