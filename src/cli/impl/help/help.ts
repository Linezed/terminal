/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type Argv from "../../interface/argv/argv.js";
import { Colors } from "../../../index.js";
import Formatter from "../../../util/formatter.js";
import type App from "../../interface/app.js";
import CreateTypeText from "./types.js";
import CreateFlagsSection from "./flags.js";

export default function GenerateHelp(
    app: App,
    argv?: Argv,
    color: string = Colors.Blue
): string {
    let resp = Formatter.Format( // Format the name first
        "{}{}{}",
        color,
        app.name,
        Colors.Reset
    );

    // Add description if available
    if (app.description) {
        resp += "\n"; // Add some spacing
        resp += app.description;
    }

    resp += "\n\n"; // Add some spacing

    // Add usage
    resp += Formatter.Format(
        "{Yellow}\n  {}{}{} {Bright.Black}\n\n",
        "Usage:",
        color,
        app.name,
        Colors.Reset,
        "[--global-flags] <command> [--cmd-flags] [--global-flags]"
    );

    // Add possible errors
    if (argv && argv.Error) {
        resp += Formatter.Format(
            "{Red}\n  {Bright.Black}\n\n",
            "Error:",
            argv.Error.message,
        );
    }

    // Add available commands
    if (app.Commands().size > 0) {
        resp += Formatter.Format("{Yellow}\n", "Available Commands:");
    }

    for (let [name, cmd] of app.Commands()) {
        // Ignore aliases
        if (name == cmd.shortcut) continue;

        // Add command name and description
        resp += Formatter.Format(
            "  {Bright.Black} {}{}",
            "➥",
            color,
            name
        );

        // Add shortcuts if available
        if (cmd.shortcut) {
            resp += Formatter.Format(
                ", {}",
                cmd.shortcut
            );
        }

        resp += Colors.Reset; // Reset colors
        resp += Formatter.Format(
            " {Bright.Black} {Bright.Black}\n",
            "→",
            cmd.description ?? "(No description provided)"
        );

        // Add type
        resp += "    "; // Indent a bit
        resp += CreateTypeText(cmd.type);

        // Add flags
        if (cmd.Flags().size > 0) {
            resp += Formatter.Format(
                "    {Bright.Black}\n",
                "➠ Available flags:"
            );

            resp += CreateFlagsSection(6, cmd.Flags(), color);
        }
    }

    // Add available flags
    if (app.Flags().size > 0) {
        resp += Formatter.Format("{Yellow}\n", "Global Flags:");
        resp += CreateFlagsSection(2, app.Flags(), color);
    }

    return resp.trim(); // Trim any extra new lines
}