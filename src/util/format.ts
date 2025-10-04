/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import Floating_format from "./floating_format.js";
import * as Colors from "./colors.js";

type _ColorFunction = (val: string) => string;

function _FormatColor(val: string, color: string): string {
    return `${color}${val}${Colors.Reset}`;
}

// Supported colors for formatting
const colors: { [key: string]: _ColorFunction } = {};

// Create an isolated scope to populate colors
{
    // Get the base colors from the Colors module
    const baseColors= Object.keys(Colors).filter(c =>
        typeof (Colors as any)[c] === "string"
    );

    // Populate the colors object with functions
    baseColors.forEach(color => {
        // Base colors
        (colors as any)[color] = (val: string) =>
            _FormatColor(val, (Colors as any)[color]);

        // Bright colors
        (colors as any)[`Bright.${color}`] = (val: string) =>
            _FormatColor(val, (Colors.Bright as any)[color]);

        // Dim colors
        (colors as any)[`Dim.${color}`] = (val: string) =>
            _FormatColor(val, (Colors.Dim as any)[color]);

        // Dim bright colors
        (colors as any)[`Dim.Bright.${color}`] = (val: string) =>
            _FormatColor(val, (Colors.Dim.Bright as any)[color]);

        // Dim bold colors
        (colors as any)[`Dim.Bold.${color}`] = (val: string) =>
            _FormatColor(val, (Colors.Dim.Bold as any)[color]);

        // Bold colors
        (colors as any)[`Bold.${color}`] = (val: string) =>
            _FormatColor(val, (Colors.Bold as any)[color]);

        // Bold bright colors
        (colors as any)[`Bold.Bright.${color}`] = (val: string) =>
            _FormatColor(val, (Colors.Bold.Bright as any)[color]);

        // Backgrounds
        (colors as any)[`Bg.${color}`] = (val: string) =>
            _FormatColor(val, (Colors.Bg as any)[color]);

        // Bright backgrounds
        (colors as any)[`Bg.Bright.${color}`] = (val: string) =>
            _FormatColor(val, (Colors.Bg.Bright as any)[color]);

        // Dim backgrounds
        (colors as any)[`Bg.Dim.${color}`] = (val: string) =>
            _FormatColor(val, (Colors.Bg.Dim as any)[color]);

        // Dim bright backgrounds
        (colors as any)[`Bg.Dim.Bright.${color}`] = (val: string) =>
            _FormatColor(val, (Colors.Bg.Dim.Bright as any)[color]);

        // Dim bold backgrounds
        (colors as any)[`Bg.Dim.Bold.${color}`] = (val: string) =>
            _FormatColor(val, (Colors.Bg.Dim.Bold as any)[color]);

        // Bold backgrounds
        (colors as any)[`Bg.Bold.${color}`] = (val: string) =>
            _FormatColor(val, (Colors.Bg.Bold as any)[color]);

        // Bold bright backgrounds
        (colors as any)[`Bg.Bold.Bright.${color}`] = (val: string) =>
            _FormatColor(val, (Colors.Bg.Bold.Bright as any)[color]);
    });
}

function _FormatBase(
    arg_idx: number,
    args: any[]
) {
    // Get the argument
    let arg = args[arg_idx];

    // Handle null and undefined explicitly
    if (arg === null) {
        return "(null)";
    } else if (arg === undefined) {
        return "(undefined)";
    } else if (!arg) {
        return "(empty)";
    } else {
        // Check if we have an object
        if (typeof arg === "object") {
            // Try to JSON stringify it
            try {
                return JSON.stringify(arg);
            } catch {
                // Fallback to toString
                return arg.toString();
            }
        }

        // Write the argument
        return args[arg_idx].toString();
    }
}

/// Output formatter utility.
export default function FormatOutput(
    format: string,
    idx: number,
    arg_idx: number,
    args: any[]
): [string, number] {
    // Ensure there's a corresponding argument
    if (arg_idx >= args.length) {
        throw new Error("Insufficient arguments for format string");
    }

    // See if we don't have any format
    if (format[idx + 1] == "}") {
        return [_FormatBase(arg_idx, args), idx + 1]; // Default format
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
                throw new Error(`Type mismatch: Expected number for format specifier {${specifier}}, got ${typeof arg}`);
            }

            // Format the string
            return [arg.slice(0, length), idx];
        }
    }

    // Handle colors
    if (specifier in colors) {
        // Use basic formatting
        let basic = _FormatBase(arg_idx, args);

        // Format the color
        return [(colors[specifier] as _ColorFunction)(basic), idx];
    }

    // Unknown specifier
    throw new Error(`Unknown format specifier: {${specifier}}`);
}