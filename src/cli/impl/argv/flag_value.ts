/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type Flag from "../../interface/flag.js";
import ConvertToType from "../../../types/converter.js";
import Types from "../../../types/types.js";
import type FlagCollection from "./flag_collection.js";

function _SetValue(
    flag: Flag,
    local: FlagCollection,
    val: any,
    global: FlagCollection
) {
    let map: Map<string, any>;

    if (flag.local) {
        switch (flag.Type()) {
            case Types.String:
                map = local.strings;
                break;

            case Types.Number:
                map = local.numbers;
                break;

            case Types.Boolean:
                map = local.bools;
                break;
        }
    } else {
        switch (flag.Type()) {
            case Types.String:
                map = global.strings;
                break;

            case Types.Number:
                map = global.numbers;
                break;

            case Types.Boolean:
                map = global.bools;
                break
        }
    }

    map.set(flag.Name(), val);
}

export default function SetFlagValue(
    flag: Flag,
    val: string,
    local: FlagCollection,
    global: FlagCollection
) {
    // Try to parse the value's type
    let result = ConvertToType(flag.Type() as Types, val);

    // Put the correct flag in the correct map
    _SetValue(flag, local, result, global);
}