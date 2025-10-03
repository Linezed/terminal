/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import { _NameableBase } from "./nameable.js";
import type App from "../interface/app.js";
import type Command from "../interface/command.js";
import { _ContextBase } from "./context.js";
import { ICommand } from "./command.js";
import IArgv from "./argv/argv.js";

export default class IApp
    extends _NameableBase(_ContextBase(class {}))
    implements App
{
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
        let inst = new ICommand(name);
        this.commands.set(name, inst); // Store in map

        // Return the command instance
        return inst;
    }

    /// Parse the given input
    Parse(input: string[]): IArgv {
        return new IArgv(this, input);
    }
}