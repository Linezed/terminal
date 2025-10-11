/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import Formatter from "../../../format/index.js";
import Types from "../../../types/types.js";
import type TypesSection from "../../interface/config/types.js";

export default function CreateTypeText(t: Types, s: TypesSection) {
    switch (t) {
        case Types.String:
            return Formatter.Format(s.string.format, ...s.string.args);
        case Types.Number:
            return Formatter.Format(s.number.format, ...s.number.args);
        default:
            return Formatter.Format(s.boolean.format, ...s.boolean.args);
    }
}
