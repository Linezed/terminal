/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type Config from "../../interface/config/config.js";
import ISection from "./section.js";
import IList from "./list.js";

export default class IConfig implements Config {
    /// Whether to add help flags automatically to commands and apps.
    auto_help: boolean = false;
    /// Whether to add version flags automatically to commands and apps.
    auto_version: boolean = false;

    /// The number of spaces to use for indentation.
    indent: number = 0;

    /// The characters to use to separate sections.
    spacing: string = "";

    /// The formats for messages.
    format = {
        /// The name format.
        name: new ISection(),

        /// The usage message format.
        usage: new ISection(),

        /// The help message format.
        description: new ISection(),

        /// The command section format.
        error: new ISection(),

        /// The command section format.
        command: new IList(),

        /// The flag section format.
        flag: new IList(),

        /// The format for types.
        types: {
            string: new ISection(),
            number: new ISection(),
            boolean: new ISection(),
        }
    };
}