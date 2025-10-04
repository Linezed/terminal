/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type Nameable from "./nameable.js";
import type Flag from "./flag.js";

export default interface Context extends Nameable {
    /// Flags associated with the context.
    flags: Map<string, Flag>;

    /// Get the flags
    Flags(): Map<string, Flag>;

    /// Add a flag to the context.
    Flag(name: string): Flag;
}
