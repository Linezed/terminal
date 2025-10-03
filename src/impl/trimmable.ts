/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type { Constructor } from "./constructor.js";
import type Trimmable from "../interface/trimmable.js";

export function _TrimmableBase<TBase extends Constructor>(Base: TBase) {
    return class extends Base implements Trimmable {
        /// The shortcut name of the entity.
        shortcut: string | undefined = undefined;

        /// Getter and setter for the short name of the entity.
        Shortcut(val?: string): string | undefined {
            // Case 1: setter
            if (val !== undefined) {
                this.shortcut = val;
                return;
            }

            // Case 2: getter
            return this.shortcut;
        }
    };
}

export default class ITrimmable
    extends _TrimmableBase(class{})
{}