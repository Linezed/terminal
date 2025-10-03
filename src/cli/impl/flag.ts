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
import type Flag from "../interface/flag.js";
import type Context from "../interface/context.js";

export default class IFlag
    extends _NameableBase(_TypableBase(_TrimmableBase(class{})))
    implements Flag
{
    /// The owner of the flag.
    owner: Context | undefined = undefined;

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
    Required(val?: boolean): boolean | this {
        // Case 1: setter
        if (val !== undefined) {
            this.required = val;
            return this;
        }

        // Case 2: getter
        return this.required;
    }

    /// Constructor
    constructor(owner: Context, name: string) {
        super(); // Offload to super class
        this.name = name;
        this.owner = owner;
    }

    /// Setter for the short name of the entity.
    Shortcut(val?: string): this | string {
        // Case 1: setter
        if (val !== undefined) {
            // Make sure the flag isn't already registered
            if (this.owner?.flags.has(val)) {
                throw Error("Flag already registered");
            }

            // Register in the context as well
            this.owner?.flags.set(val, this);
        }

        return super.Shortcut(val);
    }
}