/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type { State } from "../state.js";
import prefixes from "./collection.js";
import UnknownFormat from "../unknown_format.js";
import FormatPadding from "./preset/padding.js";
import custom_prefixes from "../custom/collection.js";

export default function FormatPrefix(
    pref: string,
    state: State
) {
    // Ignore the first character of the prefix
    pref = pref.slice(1);

    // Check for special cases
    // Padding
    if (pref.startsWith(">") || pref.startsWith("<")) {
        FormatPadding(pref, state);
        return; // Exit after handling padding
    }

    // Custom prefixes
    if (pref.startsWith("!")) {
        const custom_pref = pref.slice(1);
        const custom_fn = custom_prefixes.get(custom_pref);
        if (!custom_fn) {
            throw new UnknownFormat(pref);
        }

        // Add the custom handler to the state
        state.custom_handlers.push(custom_fn);
        return; // Exit after handling custom prefix
    }

    // Determine what to do based on the prefix
    let fn = prefixes.get(pref);

    // If the prefix is not found, throw an error
    if (!fn) {
        throw new UnknownFormat(pref);
    }

    // Call the prefix function
    fn(pref, state);
}