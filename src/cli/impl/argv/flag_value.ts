/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type Flag from "../../interface/flag.js";
import ConvertToType from "../../../types/converter.js";
import Types from "../../../types/types.js";

export default function SetFlagValue(
    flag: Flag,
    val: string,
    strings: Map<string, string> = new Map(),
    bools: Map<string, boolean> = new Map(),
    numbers: Map<string, number> = new Map()
) {
    // Try to parse the value's type
    let result = ConvertToType(flag.Type() as Types, val);

    // Put the correct flag in the correct map
    switch (flag.Type()) {
        case Types.String:
            strings.set(flag.Name(), result as string);
            break;

        case Types.Number:
            numbers.set(flag.Name(), result as number);
            break;

        case Types.Boolean:
            bools.set(flag.Name(), result as boolean);
            break;
    }
}