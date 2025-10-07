/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type { PrefixFunction } from "../type.js";
import ColorKeys from "../../color_keys.js";
import type { State } from "../../state.js";

export default function FillTextPrefixes(map: Map<string, PrefixFunction>) {
    // Lowercase
    map.set("Lower", (_: string, state: State) => {
        state.text.lower = true;
    });

    // Uppercase
    map.set("Upper", (_: string, state: State) => {
        state.text.upper = true;
    });

    // Capitalize
    map.set("Title", (_: string, state: State) => {
        state.text.title = true;
    });

    // Trim
    map.set("Trim", (_: string, state: State) => {
        state.text.trim = true;
    });
}