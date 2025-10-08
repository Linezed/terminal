/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type { State } from "../state.js";
import prefixes from "./collection.js";
import UnknownFormat from "../unknown_format.js";
import FormatPadding from "./preset/padding.js";

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

    // Determine what to do based on the prefix
    let fn = prefixes.get(pref);

    // If the prefix is not found, throw an error
    if (!fn) {
        throw new UnknownFormat(pref);
    }

    // Call the prefix function
    fn(pref, state);
}