/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type { State } from "../state.js";
import prefixes from "./collection.js";
import UnknownFormat from "../unknown_format.js";
import FormatPadding from "./preset/padding.js";
import { SearchCustomPrefix } from "../custom/collection.js";
import CustomHandlerPriority from "../custom/priority.js";
import CustomHandlerOrder from "../custom/order.js";

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

        const custom_fn = custom_combo[0];
        const priority = custom_combo[1];
        const order = custom_combo[2];
        const obj = order == CustomHandlerOrder.Pre ?
            state.custom.pre :
            state.custom.post;

        // Add the custom handler to the state
        switch (priority) {
            case CustomHandlerPriority.Highest:
                obj.highest.push(custom_fn);
                break;
            case CustomHandlerPriority.High:
                obj.high.push(custom_fn);
                break;
            case CustomHandlerPriority.Normal:
                obj.normal.push(custom_fn);
                break;
            case CustomHandlerPriority.Low:
                obj.low.push(custom_fn);
                break;
            case CustomHandlerPriority.Lowest:
                obj.lowest.push(custom_fn);
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