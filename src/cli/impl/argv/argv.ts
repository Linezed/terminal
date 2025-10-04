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
import Types from "../../../types.js";
import MatchType from "../../../util/type_matcher.js";

function _GetFlag(name: string, owner: App, cmd: Command) {
    // Attempt to get the default value from the owner
    let flag_map = owner?.Flags() as Map<string, Flag>;
    let flag = flag_map.get(name);

    // Make sure the flag exists
    if (!flag) {
        // Last resort: Try to find the flag in the command
        if (cmd && cmd.flags.has(name as string)) {
            return cmd.flags.get(name as string) as Flag;
        }

        throw new ArgvException(ArgvErrorCode.UnknownFlag, "Unknown flag");
    }

    // Return the default
    return flag;
}

export default class IArgv implements Argv {
    /// The owner of the argv
    owner: App | undefined = undefined;

    /// The error that occurred while parsing the argv
    Error: ArgvError | undefined;

    /// The parsed command
    command: Command | undefined = undefined;

    /// String flags
    strings: Map<string, string> = new Map();

    /// Boolean flags
    bools: Map<string, boolean> = new Map();

    /// Number flags
    numbers: Map<string, number> = new Map();

    /// The value of the command
    val: any = undefined;

    constructor(app: App, args: string[]) {
        try {
            this.owner = app;

            // Get commands and flags from the app
            let cmds = app.Commands();
            let flags = app.Flags() as Map<string, Flag>;
            let requiredFlags: Set<string> = new Set();

            // Save the name of the command
            let cmd_name: string | undefined = undefined;

            // Save the current command
            let cmd: Command | undefined = undefined;

            // Save the last parsed flag
            let last_flag: Flag | undefined = undefined;

            // Fill the required flags
            flags.forEach((flag: Flag) => {
                if (flag.Required()) {
                    requiredFlags.add(flag.Name());
                }
            });

            // Parse the args
            for (let arg of args) {
                // Parse flag values
                if (last_flag) {
                    // Parse directly
                    SetFlagValue(
                        last_flag,
                        arg,
                        this.strings,
                        this.bools,
                        this.numbers
                    );
                    last_flag = undefined; // No longer waiting on the value
                    continue;
                }

                // Check if we have a flag
                if (arg.startsWith("-")) {
                    // Check if we're waiting for a value
                    if (last_flag) {
                        throw new ArgvException(
                            ArgvErrorCode.ExpectedValue,
                            "Expected a value, not a flag"
                        );
                    }

                    // Set the last flag
                    last_flag = ParseFlag(
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

                // Parse command values
                if (cmd) {
                    this.val = ConvertToType(cmd.Type() as Types, arg);
                    cmd = undefined; // No longer waiting on the value
                    continue;
                }

                // Make sure we haven't parsed a command already
                if (this.val) {
                    throw new ArgvException(
                        ArgvErrorCode.AlreadyParsedCommand,
                        "Already parsed a command value"
                    );
                }

                // Parse the command
                cmd = ParseCommand(cmds, arg);
                cmd_name = cmd.Name();
            }

            // Make sure we have parsed a value
            if (!this.val) {
                throw new ArgvException(
                    ArgvErrorCode.NotParsedCommand,
                    "Never parsed a command value"
                );
            }

            // Make sure we aren't expecting a value
            if (cmd || last_flag) {
                throw new ArgvException(
                    ArgvErrorCode.ExpectedValue,
                    "Expected a value"
                );
            }

            // Make sure all required flags are present
            if (requiredFlags.size != 0) {
                throw new ArgvException(
                    ArgvErrorCode.MissingRequired,
                    "One or more required flags are missing"
                );
            }

            // Set the command
            this.command = cmds.get(cmd_name as string);
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

        // Fire the handler
        this.command?.handler?.(this);
    }

    Value() {
        return this.val;
    }

    Boolean(name: string): boolean {
        // Get the boolean flag
        if (this.bools.has(name)) {
            return this.bools.get(name) as boolean;
        }

        return !!_GetFlag(name, this.owner as App, this.command!).Default();
    }

    String(name: string): string {
        // Get the string flag
        if (this.strings.has(name)) {
            return this.strings.get(name) as string;
        }

        // Perform type checking
        let flag = _GetFlag(name, this.owner as App, this.command!);
        MatchType(Types.String, flag.Default());

        return flag.Default();
    }

    Number(name: string): number {
        // Get the number flag
        if (this.numbers.has(name)) {
            return this.numbers.get(name) as number;
        }

        // Perform type checking
        let flag = _GetFlag(name, this.owner as App, this.command!);
        MatchType(Types.Number, flag.Default());

        return flag.Default();
    }

    HasBoolean(name: string): boolean {
        return this.bools.has(name) as boolean;
    }

    HasString(name: string): boolean {
        throw this.strings.has(name) as boolean;
    }

    HasNumber(name: string): boolean {
        throw this.numbers.has(name) as boolean;
    }

    Has(name: string): boolean {
        throw (
            this.HasBoolean(name) ||
            this.HasNumber(name) ||
            this.HasString(name)
        );
    }
}
