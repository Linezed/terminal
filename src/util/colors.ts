/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

// Base ANSI Colors
export const Black = "\x1b[30m";
export const Red = "\x1b[31m";
export const Green = "\x1b[32m";
export const Yellow = "\x1b[33m";
export const Blue = "\x1b[34m";
export const Magenta = "\x1b[35m";
export const Cyan = "\x1b[36m";
export const White = "\x1b[37m";

// Reset
export const Reset = "\x1b[0m";

// Variants
export const Bright = {
    Black: "\x1b[90m",
    Red: "\x1b[91m",
    Green: "\x1b[92m",
    Yellow: "\x1b[93m",
    Blue: "\x1b[94m",
    Magenta: "\x1b[95m",
    Cyan: "\x1b[96m",
    White: "\x1b[97m",
};

export const Dim = {
    Black: "\x1b[2;30m",
    Red: "\x1b[2;31m",
    Green: "\x1b[2;32m",
    Yellow: "\x1b[2;33m",
    Blue: "\x1b[2;34m",
    Magenta: "\x1b[2;35m",
    Cyan: "\x1b[2;36m",
    White: "\x1b[2;37m",

    Bright: {
        Black: "\x1b[2;90m",
        Red: "\x1b[2;91m",
        Green: "\x1b[2;92m",
        Yellow: "\x1b[2;93m",
        Blue: "\x1b[2;94m",
        Magenta: "\x1b[2;95m",
        Cyan: "\x1b[2;96m",
        White: "\x1b[2;97m",
    },

    Bold: {
        Black: "\x1b[1;2;30m",
        Red: "\x1b[1;2;31m",
        Green: "\x1b[1;2;32m",
        Yellow: "\x1b[1;2;33m",
        Blue: "\x1b[1;2;34m",
        Magenta: "\x1b[1;2;35m",
        Cyan: "\x1b[1;2;36m",
        White: "\x1b[1;2;37m",

        Bright: {
            Black: "\x1b[1;2;90m",
            Red: "\x1b[1;2;91m",
            Green: "\x1b[1;2;92m",
            Yellow: "\x1b[1;2;93m",
            Blue: "\x1b[1;2;94m",
            Magenta: "\x1b[1;2;95m",
            Cyan: "\x1b[1;2;96m",
            White: "\x1b[1;2;97m",
        }
    }
};

export const Bold = {
    Black: "\x1b[1;30m",
    Red: "\x1b[1;31m",
    Green: "\x1b[1;32m",
    Yellow: "\x1b[1;33m",
    Blue: "\x1b[1;34m",
    Magenta: "\x1b[1;35m",
    Cyan: "\x1b[1;36m",
    White: "\x1b[1;37m",

    Bright: {
        Black: "\x1b[1;90m",
        Red: "\x1b[1;91m",
        Green: "\x1b[1;92m",
        Yellow: "\x1b[1;93m",
        Blue: "\x1b[1;94m",
        Magenta: "\x1b[1;95m",
        Cyan: "\x1b[1;96m",
        White: "\x1b[1;97m",
    }
};

export const Bg = {
    Black: "\x1b[40m",
    Red: "\x1b[41m",
    Green: "\x1b[42m",
    Yellow: "\x1b[43m",
    Blue: "\x1b[44m",
    Magenta: "\x1b[45m",
    Cyan: "\x1b[46m",
    White: "\x1b[47m",

    Bright: {
        Black: "\x1b[100m",
        Red: "\x1b[101m",
        Green: "\x1b[102m",
        Yellow: "\x1b[103m",
        Blue: "\x1b[104m",
        Magenta: "\x1b[105m",
        Cyan: "\x1b[106m",
        White: "\x1b[107m",
    },

    Dim: {
        Black: "\x1b[2;40m",
        Red: "\x1b[2;41m",
        Green: "\x1b[2;42m",
        Yellow: "\x1b[2;43m",
        Blue: "\x1b[2;44m",
        Magenta: "\x1b[2;45m",
        Cyan: "\x1b[2;46m",
        White: "\x1b[2;47m",

        Bright: {
            Black: "\x1b[2;100m",
            Red: "\x1b[2;101m",
            Green: "\x1b[2;102m",
            Yellow: "\x1b[2;103m",
            Blue: "\x1b[2;104m",
            Magenta: "\x1b[2;105m",
            Cyan: "\x1b[2;106m",
            White: "\x1b[2;107m",
        },

        Bold: {
            Black: "\x1b[1;2;40m",
            Red: "\x1b[1;2;41m",
            Green: "\x1b[1;2;42m",
            Yellow: "\x1b[1;2;43m",
            Blue: "\x1b[1;2;44m",
            Magenta: "\x1b[1;2;45m",
            Cyan: "\x1b[1;2;46m",
            White: "\x1b[1;2;47m",
        }
    },

    Bold: {
        Black: "\x1b[1;40m",
        Red: "\x1b[1;41m",
        Green: "\x1b[1;42m",
        Yellow: "\x1b[1;43m",
        Blue: "\x1b[1;44m",
        Magenta: "\x1b[1;45m",
        Cyan: "\x1b[1;46m",
        White: "\x1b[1;47m",

        Bright: {
            Black: "\x1b[1;100m",
            Red: "\x1b[1;101m",
            Green: "\x1b[1;102m",
            Yellow: "\x1b[1;103m",
            Blue: "\x1b[1;104m",
            Magenta: "\x1b[1;105m",
            Cyan: "\x1b[1;106m",
            White: "\x1b[1;107m",
        }
    }
}