/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type Section from "./section.js";

export default interface Header {
    /// The header format.
    header: Section,
    /// The description format.
    desc: Section
}