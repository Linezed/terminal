/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type Flag from "../flag.js";
import type Command from "../../interface/command.js";

export default function ParseFlag(
    arg: string,
    cmd: Command | undefined,
    flags: Map<string, Flag>
): Flag | undefined {
    return;
}