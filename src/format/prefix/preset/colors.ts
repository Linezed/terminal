/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type { PrefixFunction } from "../type.js";
import ColorKeys from "../../color_keys.js";
import type { State } from "../../state.js";

export default function FillPrefixColors(map: Map<string, PrefixFunction>) {
    // Iterate over all color keys
    for (const key in ColorKeys) {
        map.set(key, (_: string, state: State) => {
            // Set the color in the state
            state.color = key;
        });
    }
}