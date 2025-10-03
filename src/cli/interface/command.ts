/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type Typable from "./typable.js";
import type Context from "./context.js";
import type Trimmable from "./trimmable.js";
import type Argv from "./argv/argv.js";

/// A Command interface.
export default interface Command extends Typable, Context, Trimmable {
    handler: ((ctx: Argv) => void) | null;

    /// Set the handler for the command.
    Handler(handler: (ctx: Argv) => void): this;
}