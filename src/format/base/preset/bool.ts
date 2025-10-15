/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type { BaseFormatFunction } from "../type.js";

export default function FillBooleanPrefixes(map: Map<string, BaseFormatFunction>) {
    map.set("b", (range: number[], state) => {
        // Make sure the range is valid
        if (range.length != 0) {
            throw new Error("Boolean format does not take a range");
        }

        // Set the JSON format in the state
        state.boolean = true;
    });
}