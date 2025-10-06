/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type Section from "./section.js";
import type Header from "./header.js";
import type List from "./list.js";

export default interface Config {
    /// Whether to add help flags automatically to commands and apps.
    auto_help: boolean;

    /// Whether to add version flags automatically to commands and apps.
    auto_version: boolean;

    /// The formats for messages.
    format: {
        /// The name format.
        name: Section;

        /// The usage message format.
        usage: {
            format: Section;
            sample: Section
        };

        /// The help message format.
        description: Section;

        /// The command section format.
        error: Header;

        /// The command section format.
        command: List;

        /// The flag section format.
        flag: List;
    };
}