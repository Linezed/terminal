/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */


import type Command from "../../interface/command.js";
import ArgvException from "./exception.js";
import ArgvErrorCode from "../../interface/argv/codes.js";

export default function ParseCommand(
    cmds: Map<string, Command>,
    arg: string
): Command {
    // Make sure the commands contain the searched command
    if (cmds.has(arg)) {
        return cmds.get(arg) as Command;
    }

    throw new ArgvException(ArgvErrorCode.UnknownArgument, "Unknown command");
}