/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import Types from "./types.js";

export default function StringifyType(type: Types): string {
    switch (type) {
        case Types.String:
            return "string";
        case Types.Number:
            return "number";
        case Types.Boolean:
            return "boolean";
    }
}
