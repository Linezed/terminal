/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type { PrefixFunction } from "../type.js";
import type { State } from "../../state.js";

export default function FillDatePrefixes(map: Map<string, PrefixFunction>) {
    map.set("ISO", (_: string, state: State) => {
        state.date.iso = true;
    });

    map.set("UTC", (_: string, state: State) => {
        state.date.utc = true;
    });
}