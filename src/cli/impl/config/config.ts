/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type Config from "../../interface/config/config.js";
import ISection from "./section.js";
import IList from "./list.js";
import IHeader from "./header.js";
import type App from "../../interface/app.js";

export default class IConfig implements Config {
    /// The app that owns this config.
    owner: App | undefined;

    /// Whether to add help flags automatically to commands and apps.
    auto_help: boolean = false;
    /// Whether to add version flags automatically to commands and apps.
    auto_version: boolean = false;

    /// The formats for messages.
    format = {
        /// The name format.
        name: new ISection(),

        /// The usage message format.
        usage: new ISection(),

        /// The help message format.
        description: new ISection(),

        /// The command section format.
        error: new IHeader(),

        /// The command section format.
        command: new IList(),

        /// The flag section format.
        flag: new IList(),
    };

    /// The constructor for the config.
    constructor(app: App) {
        this.owner = app; // Set the owner to the provided app instance.
    }
}