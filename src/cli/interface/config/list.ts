/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type Section from "./section.js";
import type Header from "./header.js";

export default interface List {
    /// The header format.
    header: Section,
    /// The format for each item.
    item: Header
}