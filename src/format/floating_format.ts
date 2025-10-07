/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

export default function FloatingFormat(
    arg: any,
    length: number,
    specifier: string
) {
    // Type checking
    if (typeof arg != "number") {
        throw new Error(
            `Type mismatch: Expected number for format specifier {${specifier}}, got ${typeof arg}`
        );
    }

    // Format the number
    return arg.toFixed(length);
}
