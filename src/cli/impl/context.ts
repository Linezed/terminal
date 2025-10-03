/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type { Constructor } from "./constructor.js";
import type Typable from "../interface/typable.js";
import Types from "../../types.js";
import type Flag from "../interface/flag.js";

export function _ContextBase<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        /// Flags associated with the context.
        flags: Map<string, Flag> = new Map<string, Flag>();

        /// Get or set the flags associated with the context.
        Flags(val?: Flag[]): Map<string, Flag> | void
        {
            // Case 1: getter
            if (val === undefined) {
                return this.flags;
            }

            // Case 2: setter
            val.forEach((flag) => {
                // Make sure the flag isn't already registered
                if (this.flags.has(flag.name) || (flag.shortcut && this.flags.has(flag.shortcut))) {
                    throw new Error("Flag already registered");
                }

                // Ensure the flag is of type Typable
                if ((flag as Typable).Type === undefined) {
                    (flag as Typable).type = Types.Boolean;
                } else if ((flag as Typable).Type() === undefined) {
                    (flag as Typable).type = Types.Boolean;
                }

                // Set the flag
                this.flags.set(flag.Name(), flag);

                // Also set the alias
                const alias = flag.Shortcut();
                if (!!alias) {
                    this.flags.set(alias as string, flag);
                }
            });

            return;
        }
    };
}

export default class IContext
    extends _ContextBase(class{})
{}