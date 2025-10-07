/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

export default function JSON_format(
    arg: any,
    length: number,
    specifier: string
) {
    // Type checking
    if (typeof arg != "object") {
        throw new Error(
            `Type mismatch: Expected object for format specifier {${specifier}}, got ${typeof arg}`
        );
    }

    // Format the JSON object
    return JSON.stringify(arg, null, length);
}
