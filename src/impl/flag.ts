/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

/// A Flag interface.
import { _NameableBase } from "./nameable.js";
import { _TypableBase } from "./typable.js";
import { _TrimmableBase } from "./trimmable.js";

export default class Flag
    extends _NameableBase(_TypableBase(_TrimmableBase(class{})))
{
    /// The default value for the flag.
    default: any;

    /// Get or set the default value for the flag.
    Default(val?: any): any | void {
        // Case 1: setter
        if (val !== undefined) {
            this.default = val;
        }

        // Case 2: getter
        return this.default;
    }
}