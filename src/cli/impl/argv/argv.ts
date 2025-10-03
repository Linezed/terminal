/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type Argv from "../../interface/argv/argv.js";
import type ArgvError from "../../interface/argv/error.js";
import type App from "../../interface/app.js";
import type Flag from "../flag.js";
import type Command from "../../interface/command.js";
import ParseFlag, { SetFlagValue } from "./flag.js";
import ArgvException from "./exception.js";
import ArgvErrorCode from "../../interface/argv/codes.js";
import ConvertToType from "../../../util/converter.js";
import ParseCommand from "./command.js";
import IArgvError from "./error.js";

export default class IArgv implements Argv {
    Error: ArgvError | undefined;

    /// String flags
    strings: Map<string, string> = new Map();

    /// Boolean flags
    bools: Map<string, boolean> = new Map();

    /// Number flags
    numbers: Map<string, number> = new Map();

    constructor(app: App, args: string[]) {
        try {
            // Get commands and flags from the app
            let cmds = app.Commands();
            let flags = app.Flags() as Map<string, Flag>;
            let requiredFlags: Set<string> = new Set();

            // Save the value of the command
            let val: any = undefined;

            // Save the name of the command
            let cmdName: string | undefined = undefined;

            // Save the current command
            let cmd: Command | undefined = undefined;

            // Save the last parsed flag
            let lastFlag: Flag | undefined= undefined;

            // Fill the required flags
            flags.forEach((flag: Flag) => {
                if (flag.Required()) {
                    requiredFlags.add(flag.Name());
                }
            })

            // Parse the args
            for (let arg of args) {
                // Parse flag values
                if (lastFlag) {
                    // Parse directly
                    SetFlagValue(lastFlag, arg, this.strings, this.bools, this.numbers);
                    lastFlag = undefined; // No longer waiting on the value
                    continue;
                }

                // Parse command values
                if (cmd) {
                    val = ConvertToType(cmd.Type(), val);
                    cmd = undefined; // No longer waiting on the value
                    continue;
                }

                // Check if we have a flag
                if (arg.startsWith("-")) {
                    // Check if we're waiting for a value
                    if (lastFlag || cmd) {
                        throw new ArgvException(ArgvErrorCode.ExpectedValue, "Expected a value, not a flag");
                    }

                    // Set the last flag
                    lastFlag = ParseFlag(
                        arg,
                        cmd,
                        flags,
                        requiredFlags,
                        this.strings,
                        this.bools,
                        this.numbers
                    );

                    continue;
                }

                // Make sure we haven't parsed a command already
                if (val) {
                    throw new ArgvException(ArgvErrorCode.AlreadyParsedCommand, "Already parsed a command value");
                }

                // Parse the command
                cmd = ParseCommand(cmds, arg);
                cmdName = cmd.Name();
            }

            // Make sure we have parsed a value
            if (!val) {
                throw new ArgvException(ArgvErrorCode.NotParsedCommand, "Never parsed a command value");
            }

            // Make sure we aren't expecting a value
            if (cmd || lastFlag) {
                throw new ArgvException(ArgvErrorCode.ExpectedValue, "Expected a value");
            }

            // Make sure all required flags are present
            if (requiredFlags.size != 0) {
                throw new ArgvException(ArgvErrorCode.MissingRequired, "One or more required flags are missing");
            }

            // Fire the handler
            (cmds.get(cmdName as string) as Command).handler?.(this);
        } catch (e) {
            if (e instanceof ArgvException) {
                // Set the appropriate code
                if (!this.Error) {
                    this.Error = new IArgvError();
                }

                this.Error.code = e.code;
                return;
            }

            // Formatting exception
            if (!this.Error) {
                this.Error = new IArgvError();
            }

            this.Error.code = ArgvErrorCode.TypeMismatch;
        }
    }

}