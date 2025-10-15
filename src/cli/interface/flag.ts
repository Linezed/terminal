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

    /// Whether the flag is local (belongs to a specific command) or global (belongs to the entire application).
    local: boolean;

    /// Whether the flag is required.
    required: boolean;

    /// Setter for the default value for the flag.
    Default(val: any): this;

    /// Getter for the default value for the flag.
    Default(): any;

    /// Setter for whether the flag is required.
    Required(val: boolean): this;

    /// Getter for whether the flag is required.
    Required(): boolean;

    /// Getter for whether the flag is local.
    Local(): boolean;
}
