/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

/// The parsed arguments from the command line.
import type ArgvError from "./error.js";
import type LookupOrder from "./lookup_order.js";

export default interface Argv {
    Error: ArgvError | undefined;

    /// The value of the parsed command
    Value(): any;

    /// Gets a boolean flag
    Boolean(name: string, order: LookupOrder): boolean;

    /// Gets a string flag
    String(name: string, order: LookupOrder): string;

    /// Gets a number flag
    Number(name: string, order: LookupOrder): number;

    /// Checks if a boolean flag is present
    HasBoolean(name: string, order: LookupOrder): boolean;

    /// Checks if a string flag is present
    HasString(name: string, order: LookupOrder): boolean;

    /// Checks if a number flag is present
    HasNumber(name: string, order: LookupOrder): boolean;

    /// Checks if a flag is present
    Has(name: string, order: LookupOrder): boolean;
}
