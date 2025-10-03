/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type Flag from "../flag.js";
import type Command from "../../interface/command.js";
import ArgvException from "./exception.js";
import ArgvErrorCode from "../../interface/argv/codes.js";
import Types from "../../../types.js";
import ConvertToType from "../../../util/converter.js";

function _ThrowUnknownFlag() {
    throw new ArgvException(ArgvErrorCode.UnknownFlag, "Unknown flag");
}

function _FindFlag(
    name: string,
    cmd: Command | undefined,
    flags: Map<string, Flag>
): Flag {
    // Make sure the flag has been found
    if (!flags.has(name as string)) {
        // Last resort: Try to find the flag in the command
        if (cmd && cmd.flags.has(name as string)) {
            return cmd.flags.get(name as string) as Flag;
        }

        _ThrowUnknownFlag();
    }

    return flags.get(name as string) as Flag;
}

export function SetFlagValue(
    flag: Flag,
    val: string,
    strings: Map<string, string> = new Map(),
    bools: Map<string, boolean> = new Map(),
    numbers: Map<string, number> = new Map()
) {
    // Try to parse the value's type
    let result = ConvertToType(flag.Type(), val);

    // Put the correct flag in the correct map
    switch (flag.Type()) {
        case Types.String:
            strings.set(flag.Name(), result as string);
            break;

        case Types.Number:
            numbers.set(flag.Name(), result as number);
            break;

        case Types.Boolean:
            bools.set(flag.Name(), result as boolean);
            break;
    }
}

export default function ParseFlag(
    arg: string,
    cmd: Command | undefined,
    flags: Map<string, Flag>,
    requiredFlags: Set<string>,
    strings: Map<string, string> = new Map(),
    bools: Map<string, boolean> = new Map(),
    numbers: Map<string, number> = new Map()
): Flag | undefined {
    let name: string | undefined;
    let val: string | undefined;
    let isShort = false;

    // Check for long flags
    if (arg[1] == "-") {
        name = arg.slice(2); // Skip the first 2 slashes
    }
    // Short flag detected
    else {
        isShort = true;
        // Set the flag name
        name = arg.slice(1); // Skip the first slash
    }

    // Check if we have a flag of the type "--flag=val"
    if (name.includes("=")) {
        // Split the string
        let split = name.split("=");

        // Validate the parts gotten
        if (split.length != 2) {
            throw new ArgvException(ArgvErrorCode.UnknownFlag, "Invalid flag");
        }

        // Set the variables
        name = split[0];
        val = split[1];
    }

    // Check for concatenated flags
    if (!val && isShort && !flags.has(name as string)) {
        // Get all concatenated flags
        for (let i = 0; i < (name as string).length; i++) {
            // Get the char
            const char = name?.charAt(i) as string;

            // Get the flag
            let flag = _FindFlag(char, cmd, flags);

            // Make sure the flag is boolean
            if (flag.Type() != Types.Boolean) {
                throw new ArgvException(
                    ArgvErrorCode.UnknownFlag,
                    "Cannot concatenate non-boolean flags"
                );
            }

            // Set the flag to true in boolean flags
            bools.set(flag.Name(), true);

            // Remove from required flags
            requiredFlags.delete(flag.Name());
        }

        // Return nothing, all flags parsed
        return;
    }

    // Get the flag
    let flag = _FindFlag(name as string, cmd, flags);

    // Check the flag type
    if (flag.Type() == Types.Boolean) {
        // Make sure we don't have a value
        if (val) {
            throw new ArgvException(
                ArgvErrorCode.InvalidFlag,
                "Boolean flags can't have values"
            );
        }

        // Set in the boolean flags
        bools.set(flag.Name(), true);
        return;
    }

    // Check if we have a value
    if (val) {
        // Remove from required flags
        requiredFlags.delete(flag.Name());

        SetFlagValue(flag, val, strings, bools, numbers);
        return; // No return value
    }

    // Remove from required flags
    requiredFlags.delete(flag.Name());

    return flag; // Return the flag
}