/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import Formatter from "../../../format/formatter.js";
import StringifyType from "../../../util/type_stringify.js";
import Types from "../../../types.js";

export default function CreateTypeText(t: Types) {
    return Formatter.Format(
        "{Bright.Black} {Bright.Green}\n",
        "➠ Type:",
        StringifyType(t)
    );
}
