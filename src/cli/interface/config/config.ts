/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type Section from "./section.js";
import type List from "./list.js";
import type App from "../app.js";

export default interface Config {
    /// The app that owns this config.
    owner: App | undefined;

    /// Whether to add help flags automatically to commands and apps.
    auto_help: boolean;

    /// Whether to add version flags automatically to commands and apps.
    auto_version: boolean;

    /// The number of spaces to use for indentation.
    indent: number;

    /// The characters to use to separate sections.
    spacing: string;

    /// The formats for messages.
    format: {
        /// The name format.
        name: Section;

        /// The usage message format.
        usage: Section;

        /// The help message format.
        description: Section;

        /// The command section format.
        error: Section;

        /// The command section format.
        command: List;

        /// The flag section format.
        flag: List;
    };
}