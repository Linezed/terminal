/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type { State } from "../state.js";
import base_fns from "./collection.js";
import UnknownFormat from "../unknown_format.js";

function _ParseNum(str: string): number {
    const num = parseInt(str, 10);
    if (isNaN(num)) {
        throw new Error(`Invalid number: ${str}`);
    }

    return num;
}

export default function FormatBase(
    pref: string,
    state: State
) {
    // Determine what to do based on the first character of the prefix
    if (pref[0] == ".") {
        // Get the last letter
        const last = pref[pref.length - 1]!;

        // Get the string in between
        const between = pref.slice(1, -1);

        // Define the range
        const range = [];

        // Parse the range
        if (between.startsWith("(")) {
            // Make sure it ends with ")"
            if (!between.endsWith(")")) {
                throw new Error(`Invalid range format: ${pref}`);
            }

            // Get the string in between the braces
            const brace_content = between.slice(1, -1);

            // Split by comma
            const parts = brace_content.split(",");

            // Parse each part
            for (const part of parts) {
                range.push(_ParseNum(part));
            }
        } else {
            // Parse as a single number
            range.push(_ParseNum(between));
        }

        // Determine what to do based on the last character
        const fn = base_fns.get(last);
        if (!fn) {
            throw new UnknownFormat(pref);
        }

        fn(range, state);
        return;
    }

    // Check for string literal (enclosed in single quotes)
    if (pref[0] == "'") {
        // Make sure it ends with a single quote
        if (!pref.endsWith("'") || pref.length < 2) {
            throw new Error(`Invalid string literal format: ${pref}`);
        }

        // Extract the string content
        const str_content = pref.slice(1, -1);

        // Append to existing prefix if it exists
        if (state.text.prefix) {
            state.text.prefix += str_content;
        } else {
            state.text.prefix = str_content;
        }

        return;
    }

    // Check if it ends in "?"
    if (pref.endsWith("?")) {
        // Remove the "?"
        pref = pref.slice(0, -1);

        // Set as optional
        state.prop.optional = true;
    }

    // Consider this a prop access
    if (state.prop.name) {
        throw new Error("Multiple property accesses in a single format specifier are not allowed");
    }

    state.prop.name = pref;
}