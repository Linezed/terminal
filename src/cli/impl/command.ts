/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type Command from "../interface/command.js";
import { _NameableBase } from "./nameable.js";
import { _TypableBase } from "./typable.js";
import { _ContextBase } from "./context.js";
import { _TrimmableBase } from "./trimmable.js";
import type App from "../interface/app.js";

export class ICommand
    extends _NameableBase(_TypableBase(_ContextBase(_TrimmableBase(class{}))))
    implements Command
{
    /// The owner of the command
    owner: App | undefined;

    /// The command handler
    handler: ((cmd: Command) => void) | null = null;

    /// Constructor
    constructor(app: App, name: string) {
        super();
        this.owner = app;
        this.name = name;
    }

    /// Set the handler for the command.
    Handler(handler: (cmd: Command) => void): void {
        this.handler = handler;
    }
}