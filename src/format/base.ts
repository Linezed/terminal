/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

export function FormatValue(arg: any): string {
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
        return arg.toString();
    }
}

export default function FormatBase(arg_idx: number, args: any[]) {
    // Format the argument
    return FormatValue(args[arg_idx]);
}