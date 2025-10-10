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
import ParseFlag from "./flag.js";
import ArgvException from "./exception.js";
import ArgvErrorCode from "../../interface/argv/codes.js";
import ConvertToType from "../../../types/converter.js";
import ParseCommand from "./command.js";
import IArgvError from "./error.js";
import Types from "../../../types/types.js";
import MatchType from "../../../types/type_matcher.js";
import FlagCollection from "./flag_collection.js";
import SetFlagValue from "./flag_value.js";

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

function _LookupValue<T>(name: string, local_first: boolean, localMap: Map<string, T>, globalMap: Map<string, T>): T | undefined {
    // Determine the order of lookup
    const sources = local_first ? [localMap, globalMap] : [globalMap, localMap];

    // Lookup the value in the specified order
    for (const src of sources) {
        const attempt = src.get(name);
        if (attempt !== undefined) return attempt;
    }

    return undefined;
}

function _HandleError(
    argv: Argv,
    code: ArgvErrorCode | undefined,
    message: string
) {
    // Create the error if it doesn't exist
    if (!argv.Error) {
        argv.Error = new IArgvError();
    }

    if (code) {
        argv.Error.code = code;
        argv.Error.message = message;
        return;
    }

    argv.Error.code = ArgvErrorCode.TypeMismatch;
    argv.Error.message = message;
}

export default class IArgv implements Argv {
    /// The owner of the argv
    owner: App | undefined = undefined;

    /// The error that occurred while parsing the argv
    Error: ArgvError | undefined;

    /// The parsed command
    command: Command | undefined = undefined;

    /// Collection of local flags
    local = new FlagCollection();

    /// Collection of global flags
    global = new FlagCollection();

    /// The value of the command
    val: any = undefined;

    constructor(app: App, args: string[]) {
        try {
            this.owner = app;

            // Get commands and flags from the app
            let cmds = app.Commands();
            let flags = app.Flags() as Map<string, Flag>;
            let required_flags: Set<string> = new Set();

            // Save the name of the command
            let cmd_name: string | undefined = undefined;

            // Save the current command
            let cmd: Command | undefined = undefined;

            // Save the last parsed flag
            let last_flag: Flag | undefined = undefined;

            // Fill the required flags
            flags.forEach((flag: Flag) => {
                if (flag.Required()) {
                    required_flags.add(flag.Name());
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
                        this.local,
                        this.global
                    );

                    last_flag = undefined; // No longer waiting on the value
                    continue;
                }

                // Check if we have a flag
                if (arg.startsWith("-")) {
                    // Check if we're waiting for a value
                    if (last_flag) {
                        _HandleError(
                            this,
                            ArgvErrorCode.ExpectedValue,
                            "Expected a value, not a flag"
                        );

                        return;
                    }

                    // Set the last flag
                    last_flag = ParseFlag(
                        arg,
                        cmd,
                        flags,
                        required_flags,
                        this.local,
                        this.global
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
                    _HandleError(
                        this,
                        ArgvErrorCode.AlreadyParsedCommand,
                        "Already parsed a command value"
                    );

                    return;
                }

                // Parse the command
                cmd = ParseCommand(cmds, arg);
                cmd_name = cmd.Name();
            }

            // Make sure we have parsed a value
            if (!this.val) {
                _HandleError(
                    this,
                    ArgvErrorCode.NotParsedCommand,
                    "Missing command"
                );

                return;
            }

            // Make sure we aren't expecting a value
            if (cmd || last_flag) {
                _HandleError(
                    this,
                    ArgvErrorCode.ExpectedValue,
                    "Expected a value, not the end of input"
                );

                return;
            }

            // Make sure all required flags are present
            if (required_flags.size != 0) {
                _HandleError(
                    this,
                    ArgvErrorCode.MissingRequired,
                    `Missing required flag: ${[...required_flags].join(", ")}`
                );
            }

            // Set the command
            this.command = cmds.get(cmd_name as string);
        } catch (e) {
            if (e instanceof ArgvException) {
                _HandleError(this, e.code, e.message);
                return;
            }

            _HandleError(this, undefined, (e as Error).message);
            return;
        }

        // Fire the handler
        this.command?.handler?.(this);
    }

    Value() {
        return this.val;
    }

    Boolean(name: string, local_first = true): boolean {
        let first_attempt = _LookupValue<boolean>(name, local_first, this.local.bools, this.global.bools);
        if (first_attempt !== undefined) {
            return first_attempt;
        }

        // Get the default value from the flag
        return !!_GetFlag(name, this.owner as App, this.command!).Default();
    }

    String(name: string, local_first = true): string {
        let first_attempt = _LookupValue<string>(
            name,
            local_first,
            this.local.strings,
            this.global.strings
        );

        if (first_attempt !== undefined) {
            return first_attempt;
        }

        // Perform type checking
        let flag = _GetFlag(name, this.owner as App, this.command!);
        MatchType(Types.String, flag.Default());

        return flag.Default();
    }

    Number(name: string, local_first = true): number {
        let first_attempt = _LookupValue<number>(
            name,
            local_first,
            this.local.numbers,
            this.global.numbers
        );

        if (first_attempt !== undefined) {
            return first_attempt;
        }

        // Perform type checking
        let flag = _GetFlag(name, this.owner as App, this.command!);
        MatchType(Types.Number, flag.Default());

        return flag.Default();
    }

    HasBoolean(name: string, local_first = true): boolean {
        return _LookupValue<boolean>(
            name,
            local_first,
            this.local.bools,
            this.global.bools
        ) !== undefined;
    }

    HasString(name: string, local_first = true): boolean {
        return _LookupValue<string>(
            name,
            local_first,
            this.local.strings,
            this.global.strings
        ) !== undefined;
    }

    HasNumber(name: string, local_first = true): boolean {
        return _LookupValue<number>(
            name,
            local_first,
            this.local.numbers,
            this.global.numbers
        ) !== undefined;
    }

    Has(name: string, local_first = true): boolean {
        const order = local_first ? [this.local, this.global] : [this.global, this.local];
        for (const src of order) {
            if (src.Has(name)) return true;
        }

        return false;
    }
}
