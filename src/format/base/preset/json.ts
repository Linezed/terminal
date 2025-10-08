/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type { BaseFormatFunction } from "../type.js";

export default function FillJSONPrefixes(map: Map<string, BaseFormatFunction>) {
    map.set("j", (range: number[], state) => {
        // Make sure the range is valid
        if (range.length != 1 || range[0]! < 0) {
            throw new Error("Invalid range for JSON format");
        }

        // Set the JSON format in the state
        state.json = range[0]!;
    });
}