/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type { BaseFormatFunction } from "../type.js";

export default function FillSlicePrefixes(map: Map<string, BaseFormatFunction>) {
    map.set("s", (range: number[], state) => {
        // Make sure the range is valid
        if (range.length > 2 || range[0]! < 0 || range[1]! < 0) {
            throw new Error("Invalid range for string slice");
        }

        // Set the slice range in the state
        state.text.slice.start = range[0]!;
        state.text.slice.end = range[1] ?? Infinity;
    });
}