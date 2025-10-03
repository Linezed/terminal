/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type { Constructor } from "./constructor.js";
import type Flag from "../interface/flag.js";
import IFlag from "./flag.js";
import type Context from "../interface/context.js";
import { _NameableBase } from "./nameable.js";

export function _ContextBase<TBase extends Constructor>(Base: TBase) {
    return class
        extends _NameableBase(Base)
        implements Context
    {
        /// Flags associated with the context.
        flags: Map<string, Flag> = new Map<string, Flag>();

        /// Get the flags associated with the context.
        Flags(): Map<string, Flag>
        {
            return this.flags;
        }

        /// Creates a new flag and adds it to the context.
        Flag(name: string): Flag
        {
            // Create a new flag
            let f = new IFlag(this, name);
            this.flags.set(name, f); // Store in map

            // Return the flag instance
            return f;
        }
    };
}

export default class IContext
    extends _ContextBase(class{})
{}