/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import Types from "../../types.js";
import type Typable from "../interface/typable.js";
import type { Constructor } from "./constructor.js";

export function _TypableBase<TBase extends Constructor>(Base: TBase) {
    return class extends Base implements Typable {
        type: Types = Types.Boolean;

        Type(): Types {
            return this.type;
        }
    };
}

export default class ITypable
    extends _TypableBase(class{})
{}