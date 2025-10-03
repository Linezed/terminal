/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type Types from "../../types.js";

export default interface Typable {
    /// The type of the entity.
    type: Types;

    /// Set the type of the entity.
    Type(t: Types): this;

    // Get the type of the entity.
    Type(): Types;
}