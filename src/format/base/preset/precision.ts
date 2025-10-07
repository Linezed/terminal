/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type { BaseFormatFunction } from "../type.js";

export default function FillPrecisionPrefixes(map: Map<string, BaseFormatFunction>) {
    map.set("f", (range: number[], state) => {
        // Make sure the range is valid
        if (range.length != 1 || range[0]! < 0) {
            throw new Error("Invalid range for float precision");
        }

        // Set the float precision
        state.precision = range[0]!;
    });
}