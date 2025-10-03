/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

/// The parsed arguments from the command line.
import type ArgvError from "./error.js";

export default interface Argv {
    Error: ArgvError | undefined;
}