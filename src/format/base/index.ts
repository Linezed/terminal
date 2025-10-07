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
        if (between.startsWith("{")) {
            // Make sure it ends with "}"
            if (!between.endsWith("}")) {
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

    // Consider this a prop access
    if (state.prop) {
        throw new Error("Multiple property accesses in a single format specifier are not allowed");
    }

    state.prop = pref;
}