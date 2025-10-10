/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

/// The parsed arguments from the command line.
import type ArgvError from "./error.js";

export default interface Argv {
    Error: ArgvError | undefined;

    /// The value of the parsed command
    Value(): any;

    /// Gets a boolean flag
    /// @param local_first If true, checks local flags before global flags
    Boolean(name: string, local_first: boolean): boolean;

    /// Gets a string flag
    /// @param local_first If true, checks local flags before global flags
    String(name: string, local_first: boolean): string;

    /// Gets a number flag
    /// @param local_first If true, checks local flags before global flags
    Number(name: string, local_first: boolean): number;

    /// Checks if a boolean flag is present
    /// @param local_first If true, checks local flags before global flags
    HasBoolean(name: string, local_first: boolean): boolean;

    /// Checks if a string flag is present
    /// @param local_first If true, checks local flags before global flags
    HasString(name: string, local_first: boolean): boolean;

    /// Checks if a number flag is present
    /// @param local_first If true, checks local flags before global flags
    HasNumber(name: string, local_first: boolean): boolean;

    /// Checks if a flag is present
    /// @param local_first If true, checks local flags before global flags
    Has(name: string, local_first: boolean): boolean;
}
