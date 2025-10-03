/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

/// A Flag interface.
import { _NameableBase } from "./nameable.js";
import { _TypableBase } from "./typable.js";
import { _TrimmableBase } from "./trimmable.js";
import MatchType from "../../util/type_matcher.js";

export default class Flag
    extends _NameableBase(_TypableBase(_TrimmableBase(class{})))
    implements Flag
{
    /// The default value for the flag.
    default: any;

    /// Whether the flag is required.
    required: boolean = false;

    /// Get or set the default value for the flag.
    Default(val?: any): any | void {
        // Case 1: setter
        if (val !== undefined) {
            // Perform type checking
            MatchType(this.type, val);

            this.default = val;
        }

        // Case 2: getter
        return this.default;
    }

    /// Get or set whether the flag is required.
    Required(val?: boolean): boolean | void {
        // Case 1: setter
        if (val !== undefined) {
            this.required = val;
            return;
        }

        // Case 2: getter
        return this.required;
    }

    /// Constructor
    constructor(name: string) {
        super(); // Offload to super class
        this.name = name;
    }
}