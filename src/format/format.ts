/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

/// Output formatter utility.
import FormatValue from "./value.js";
import { State } from "./state.js";
import FormatPrefix from "./prefix/index.js";
import FormatBase from "./base/index.js";
import ConvertState from "./convert/index.js";

export default function FormatOutput(
    format: string,
    idx: number,
    arg_idx: number,
    props: Record<string, any> | null,
    args: any[]
): [string, number, boolean] {
    // See if we don't have any format
    if (format[idx + 1] == "}") {
        return [FormatValue(args[arg_idx]), idx + 1, true]; // Default format
    }

    // Collect the format specifier
    let specifier = "";
    let state = new State();
    idx++; // Move past the '{'

    while (idx < format.length && format[idx] !== "}") {
        specifier += format[idx];
        idx++;
    }

    // Split the parts of the specifier
    let parts = specifier.split("|");
    let never_move = false;

    // Iterate through the parts
    for (let part of parts) {
        // Trim whitespace
        part = part.trim();

        // Check if we have a prefix formatter
        if (part.startsWith(":")) {
            // true = Parsed custom handler
            if (FormatPrefix(part, state)) {
                never_move = true; // We parsed a custom handler, so don't move the arg index
            }
        } else {
            // Use the base formatter
            FormatBase(part, state);
        }
    }

    // Apply the formatting based on the state
    return [
        ConvertState(arg_idx, props, state, args),
        idx,
        !state.prop.name || never_move
    ];
}
