/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import IConfig from "../config.js";

export default class DefaultConfig extends IConfig {

    /// The constructor for the config.
    constructor() {
        super();

        // Set default values
        this.auto_help = true;
        this.auto_version = true;
        this.indent = 2; // Default indent size
        this.spacing = "\n\n"; // Default spacing between sections

        // Default name format
        this.format.name.format = "{:Bright.Green | name} {:Bright.Black}{:Bright.Black | version}";
        this.format.name.args = [ "v" ];
        // No need for positional args here, since we are using props

        // Default usage format
        this.format.usage.format = "{:Cyan} {:Bright.Green | name} {:Bright.Black}";
        this.format.usage.args = [
            "usage:",
            "[--global-flags] <command> [--cmd-flags] [--global-flags]"
        ];

        // Default error format
        this.format.error.format = "{:Bold.Bright.Red} {:Bright.Red | Error.message}";
        this.format.error.args = [ "error: " ];

        // Default command list format
        this.format.command.header.format = "{:Bright.Green}"
        this.format.command.header.args = [ "available commands:" ];
        this.format.command.item.format = "{:Bright.Black} " +
            "{:Cyan | Command.name} {:Bright.Black}" +
            "{:Bright.Black | Command.description}";

        this.format.command.item.args = [
            "▶",
            "~",
            "["
        ];

        // Default flag list format
        this.format.flag.header.format = "{:Bright.Green}"
        this.format.flag.header.args = [ "available flags:" ];
        this.format.flag.item.format = "{:Bright.Black} " +
            "{:Cyan | Flag.name} {:Bright.Black}" +
            "{:Bright.Black | Flag.description}";

        this.format.flag.item.args = [
            "▶",
            "~",
            "["
        ];
    }

}