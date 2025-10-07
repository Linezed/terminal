/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type Argv from "../../interface/argv/argv.js";
import { Colors } from "../../../index.js";
import Formatter from "../../../format/formatter.js";
import type App from "../../interface/app.js";
import CreateTypeText from "./types.js";
import CreateFlagsSection from "./flags.js";

export default function GenerateHelp(
    app: App,
    argv?: Argv
): string {
    // Get config
    let config = app.Config();
    let space = " ".repeat(config.indent);

    let resp = Formatter.FormatWithProps(
        config.format.name.format,
        app,
        ...config.format.name.args
    );

    // Add description if available
    if (app.description) {
        resp += "\n"; // Add some spacing
        resp += Formatter.FormatWithProps(
            config.format.description.format,
            app,
            ...config.format.description.args
        );
    }

    resp += config.spacing; // Add spacing

    // Add usage
    resp += Formatter.FormatWithProps(
        config.format.usage.format,
        app,
        ...config.format.usage.args
    );
    resp += config.spacing; // Add spacing

    // Add possible errors
    if (argv && argv.Error) {
        resp += Formatter.FormatWithProps(
            config.format.error.format,
            app,
            ...config.format.error.args
        );

        resp += config.spacing; // Add spacing
    }

    // Add available commands
    if (app.Commands().size > 0) {
        resp += Formatter.FormatWithProps(
            config.format.command.header.format,
            app,
            ...config.format.command.header.args
        );

        resp += "\n"; // New line
    }

    for (let [name, cmd] of app.Commands()) {
        // Ignore aliases
        if (name == cmd.shortcut) continue;
        let args = {...app, Command: cmd};

        // Add command name and description
        resp += space; // Indent
        resp += Formatter.FormatWithProps(
            config.format.command.item.format,
            args,
            ...config.format.command.item.args
        );

        // Add type
        resp += " ";
        resp += CreateTypeText(cmd.type, config.format.types);
        resp += "\n"; // New line

        // Add flags
        if (cmd.Flags().size > 0) {
            resp += space; // Indent
            resp += space; // Indent

            resp += Formatter.FormatWithProps(
                config.format.flag.header.format,
                args,
                ...config.format.flag.header.args
            );
            resp += "\n"; // New line

            resp += CreateFlagsSection(
                config.indent * 3,
                cmd.Flags(),
                args,
                config
            );
        }
    }

    // Add available flags
    if (app.Flags().size > 0) {
        resp += Formatter.FormatWithProps(
            config.format.flag.header.format,
            app,
            ...config.format.flag.header.args
        );

        resp += CreateFlagsSection(
            config.indent,
            app.Flags(),
            app,
            config
        );
    }

    return resp.trim(); // Trim any extra new lines
}
