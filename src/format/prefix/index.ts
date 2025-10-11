/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type { State } from "../state.js";
import prefixes from "./collection.js";
import UnknownFormat from "../unknown_format.js";
import FormatPadding from "./preset/padding.js";
import custom_prefixes, { SearchCustomPrefix } from "../custom/collection.js";
import CustomHandlerPriority from "../custom/priority.js";

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
        const custom_combo = SearchCustomPrefix(custom_pref);

        if (!custom_combo) {
            throw new UnknownFormat(pref);
        }

        const priority = custom_combo[1];
        // Add the custom handler to the state
        switch (priority) {
            case CustomHandlerPriority.Highest:
                state.custom.highest.push(custom_fn);
                break;
            case CustomHandlerPriority.High:
                state.custom.high.push(custom_fn);
                break;
            case CustomHandlerPriority.Normal:
                state.custom.normal.push(custom_fn);
                break;
            case CustomHandlerPriority.Low:
                state.custom.low.push(custom_fn);
                break;
            case CustomHandlerPriority.Lowest:
                state.custom.lowest.push(custom_fn);
                break;
        }

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