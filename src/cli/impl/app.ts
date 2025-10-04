/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type App from "../interface/app.js";
import type Command from "../interface/command.js";
import IContext from "./context.js";
import { ICommand } from "./command.js";
import IArgv from "./argv/argv.js";
import Formatter from "../../util/formatter.js";
import { Colors } from "../../index.js";
import type Argv from "../interface/argv/argv.js";
import GenerateHelp from "./help/help.js";

export default class IApp extends IContext implements App {
    commands: Map<string, Command> = new Map();

    /// Constructor
    constructor(name: string) {
        super(); // Offload to super class
        this.name = name;
    }

    /// Get the commands of the application.
    Commands(): Map<string, Command> {
        return this.commands;
    }

    /// Add a command to the application.
    Command(name: string): Command {
        // Check if the command already exists
        if (this.commands.has(name)) {
            return this.commands.get(name)!;
        }

        // Create a new command
        let inst = new ICommand(this, name);
        this.commands.set(name, inst); // Store in map

        // Return the command instance
        return inst;
    }

    /// Parse the given input
    Parse(input: string[]): IArgv {
        return new IArgv(this, input);
    }

    /// Generates a help message for the application
    Help(argv?: Argv, color: string = Colors.Blue): string {
        return GenerateHelp(this, argv, color);
    }
}
