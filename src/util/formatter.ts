/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import FormatOutput from "./format.js";

export default class Formatter {
    public static Format(format: string, ...args: any[]): string {
        let resp = "";

        // Print each character of the format string
        let arg_idx = 0; // Current argument index
        for (let i = 0; i < format.length; i++) {
            // Get the current character
            let char = format[i];

            // Check if it's a format specifier ("{}")
            if (char === "{") {
                // Format the argument
                let [res, skipped] = FormatOutput(format, i, arg_idx, args);

                // Write the formatted argument
                resp += res;
                arg_idx++; // Move to the next argument
                i = skipped; // Skip the processed characters
            } else {
                // Write the character as is
                resp += char;
            }
        }

        return resp;
    }
}
