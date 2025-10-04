/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import Types from "../types.js";

export default function ConvertToType(type: Types, result: string) {
    // Check the type
    if (type === Types.String) {
        // String
        return result;
    } else if (type === Types.Number) {
        // Number
        let num = Number(result);
        if (isNaN(num)) {
            throw new Error("Invalid number input");
        }

        return num;
    } else if (type === Types.Boolean) {
        // Boolean
        let lowered = result.toLowerCase();
        if (lowered === "true" || lowered === "1") {
            return true;
        } else if (lowered === "false" || lowered === "0") {
            return false;
        } else {
            throw new Error("Invalid boolean input");
        }
    } else {
        throw new Error("Unsupported type");
    }
}
