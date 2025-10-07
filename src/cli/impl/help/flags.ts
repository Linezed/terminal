/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type Flag from "../../interface/flag.js";
import Formatter from "../../../format/formatter.js";
import CreateTypeText from "./types.js";
import type Config from "../../interface/config/config.js";

export default function CreateFlagsSection(
    spaces: number,
    flags: Map<string, Flag>,
    args: Record<string, any>,
    config: Config
): string {
    let res = "";
    const sp = " ".repeat(spaces);

    for (let [name, flag] of flags) {
        // Ignore aliases
        if (name == flag.shortcut) continue;
        args.Flag = flag;

        // Add flag name and description
        res += Formatter.FormatWithProps(
            config.format.flag.header.format,
            args,
            ...config.format.flag.header.args
        );
        res += "\n"; // New line

        // Add type
        res += sp;
        res += "   "; // Indent a bit
        res += CreateTypeText(flag.type, config.format.types);
    }

    return res;
}
