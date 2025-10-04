/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type Flag from "../../interface/flag.js";
import Formatter from "../../../util/formatter.js";
import { Colors } from "../../../index.js";
import CreateTypeText from "./types.js";

export default function CreateFlagsSection(
    spaces: number,
    flags: Map<string, Flag>,
    color: string
): string {
    let res = "";
    const sp = " ".repeat(spaces);

    for (let [name, flag] of flags) {
        // Ignore aliases
        if (name == flag.shortcut) continue;

        // Add flag name and description
        res += Formatter.Format(
            "{}{Bright.Black} {}--{}",
            sp,
            "➥",
            color,
            name
        );

        // Add shortcuts if available
        if (flag.shortcut) {
            res += Formatter.Format(", -{}", flag.shortcut);
        }

        // Reset colors
        res += Colors.Reset;

        // Add description
        res += Formatter.Format(
            " {Bright.Black} {Bright.Black}",
            "→",
            flag.description ?? "(No description provided)"
        );

        // Add whether required or not
        if (flag.Required()) {
            res += Formatter.Format(" {Bold.Bright.Red}", "[required]");
        }

        res += "\n"; // New line

        // Add type
        res += sp;
        res += "   "; // Indent a bit
        res += CreateTypeText(flag.type);
    }

    return res;
}
