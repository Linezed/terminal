/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import Types from "../../types/types.js";
import type Typable from "../interface/typable.js";
import type { Constructor } from "./constructor.js";

export function _TypableBase<TBase extends Constructor>(Base: TBase) {
    return class extends Base implements Typable {
        type: Types = Types.Boolean;

        Type(t: Types): this;
        Type(): Types;
        Type(t?: Types): this | Types {
            // Case 1: setter
            if (t !== undefined) {
                this.type = t;
                return this;
            }

            // Case 2: getter
            return this.type;
        }
    };
}

export default class ITypable extends _TypableBase(class {}) {}
