/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type Nameable from "../interface/nameable.js";
import type { Constructor } from "./constructor.js";

export function _NameableBase<TBase extends Constructor>(Base: TBase) {
    return class extends Base implements Nameable {
        /// The name of the entity.
        name: string = "";

        /// The description of the entity.
        description: string | undefined;

        /// Getter for the name of the entity.
        Name(): string {
            return this.name;
        }

        /// Getter and setter for the description of the entity.
        Description(val?: string): string | undefined {
            // Case 1: setter
            if (val !== undefined) {
                this.description = val;
                return;
            }

            // Case 2: getter
            return this.description;
        }
    };
}

export default class INameable
    extends _NameableBase(class{})
{
    /// Constructor
    constructor(name: string) {
        super(); // Offload to super class
        this.name = name;
    }
}