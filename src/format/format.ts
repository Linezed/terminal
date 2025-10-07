/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import Floating_format from "./floating_format.js";
import JSON_format from "./json_format.js";
import ColorKeys from "./format_color.js";
import FormatBase, { FormatValue } from "./base.js";

/// Output formatter utility.
export default function FormatOutput(
    format: string,
    idx: number,
    arg_idx: number,
    props: Record<string, any> | null,
    args: any[]
): [string, number] {
    // Ensure there's a corresponding argument
    if (arg_idx >= args.length) {
        throw new Error("Insufficient arguments for format string");
    }

    // See if we don't have any format
    if (format[idx + 1] == "}") {
        return [FormatBase(arg_idx, args), idx + 1]; // Default format
    }

    // Collect the format specifier
    let specifier = "";
    idx++; // Move past the '{'

    while (idx < format.length && format[idx] !== "}") {
        specifier += format[idx];
        idx++;
    }

    // Get the argument
    let arg = args[arg_idx];

    // Handle different specifiers
    if (specifier.startsWith(".")) {
        // Get the number of decimal places
        let length = parseInt(specifier.slice(1));
        if (isNaN(length)) {
            throw new Error(`Invalid format specifier: {${length}}`);
        }

        // Floating point precision
        if (specifier.endsWith("f")) {
            return [Floating_format(arg, length, specifier), idx];
        }
        // String slicing
        else if (specifier.endsWith("s")) {
            // Type checking
            if (typeof arg != "string") {
                throw new Error(
                    `Type mismatch: Expected number for format specifier {${specifier}}, got ${typeof arg}`
                );
            }

            // Format the string
            return [arg.slice(0, length), idx];
        }
        // JSON object formatting
        else if (specifier.endsWith("j")) {
            return [JSON_format(arg, length, specifier), idx];
        }
    }

    // Handle colors
    if (specifier in ColorKeys) {
        // Use basic formatting
        let basic = FormatBase(arg_idx, args);

        // Format the color
        return [(ColorKeys[specifier] as Function)(basic), idx];
    }

    // Check if it's a property access
    if (props) {
        // Split the specifier by dots
        let parts = specifier.split(".");

        // Traverse the properties
        let current: any = props;

        for (let part of parts) {
            if (part in current) {
                current = current[part];
            } else {
                throw new Error(`Property not found: ${part} in {${specifier}}`);
            }
        }

        // Return the found property as string
        return [FormatValue(current), idx];
    }

    // Unknown specifier
    throw new Error(`Unknown format specifier: {${specifier}}`);
}
