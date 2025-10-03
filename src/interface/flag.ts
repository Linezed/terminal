/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

/// A Command interface.
import type Nameable from "./nameable.js";
import type Typable from "./typable.js";
import type Trimmable from "./trimmable.js";

/// A Flag interface.
export default interface Flag extends Nameable, Typable, Trimmable {
    /// The default value for the flag.
    default: any;

    /// Get or set the default value for the flag.
    Default(val?: any): any | void;
}