/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type Section from "./section.js";

export default interface TypesSection {
    string: Section;
    number: Section;
    boolean: Section;
}