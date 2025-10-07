/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type { State } from "../state.js";
import ConvertProp from "./prop.js";
import FormatValue from "../value.js";
import MatchType, { MatchInstance } from "../../types/type_matcher.js";
import Types from "../../types/types.js";
import ColorKeys from "../color_keys.js";

export default function ConvertState(
    arg_idx: number,
    props: Record<string, any> | null,
    state: State,
    args: any[]
) {
    // Define the base value
    let base: any;

    // Check if we have a prop access
    if (state.prop) {
        base = ConvertProp(state.prop, props);
    } else {
        // Otherwise, use the argument at the specified index
        base = args[arg_idx];
    }

    // Check if we are supposed to format floats
    if (state.precision) {
        // Ensure the base is a number
        MatchType(Types.Number, base);

        // Format the number with the specified precision
        base = base.toFixed(state.precision);
    }
    // Check for JSON objects
    else if (state.json) {
        try {
            base = JSON.stringify(base, null, state.json);
        } catch {
            base = "(invalid JSON)";
        }
    }
    // Check for date formatting
    else if (state.date.iso) {
        MatchInstance(Date, base);
        base = (base as Date).toISOString();
    }
    else if (state.date.utc) {
        MatchInstance(Date, base);
        base = (base as Date).toUTCString();
    }
    // Use default value if base is null or undefined
    else {
        base = FormatValue(base);
    }

    // Honor text formatting
    if (state.text.trim) {
        base = base.trim();
    }

    // Apply text case transformations
    if (state.text.upper) {
        base = base.toUpperCase();
    }

    // Lower case
    if (state.text.lower) {
        base = base.toLowerCase();
    }

    // Title case
    if (state.text.title) {
        base = base[0].toUpperCase() + base.slice(1).toLowerCase();
    }

    // Add padding
    for (let i = 0; i < state.text.padding.left; i++) {
        base = " " + base;
    }

    // Right padding
    for (let i = 0; i < state.text.padding.right; i++) {
        base = base + " ";
    }

    // Slice the string if needed
    if (state.text.slice.start !== Infinity) {
        if (state.text.slice.end == Infinity) {
            base = base.slice(0, state.text.slice.start);
        } else {
            base = base.slice(
                state.text.slice.start ?? undefined,
                state.text.slice.end ?? undefined
            );
        }
    }

    // Apply colors
    if (state.color) {
        base = ColorKeys[state.color as string]?.(base);
    }

    // Return the final value
    return base;
}