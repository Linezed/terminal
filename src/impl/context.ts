/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type { Constructor } from "./constructor.js";
import type Typable from "../interface/typable.js";
import Types from "../types.js";
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
                // Ensure the flag is of type Typable
                if ((flag as Typable).Type === undefined) {
                    (flag as Typable).type = Types.Boolean;
                } else if ((flag as Typable).Type() === undefined) {
                    (flag as Typable).type = Types.Boolean;
                }

                this.flags.set(flag.Name(), flag);
            });

            return;
        }
    };
}

export default class IContext
    extends _ContextBase(class{})
{}