/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import Types from "../types.js";

export default function MatchType(expected: Types, got: any) {
    if (typeof got == "string" && expected != Types.String) {
        throw new Error("Expected a string");
    }

    if (typeof got == "number" && expected != Types.Number) {
        throw new Error("Expected a number");
    }

    if (typeof got == "boolean" && expected != Types.Boolean) {
        throw new Error("Expected a boolean");
    }
}
