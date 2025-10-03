/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type Command from "../interface/command.js";
import { _TypableBase } from "./typable.js";
import { _ContextBase } from "./context.js";
import { _TrimmableBase } from "./trimmable.js";
import type App from "../interface/app.js";
import type Argv from "../interface/argv/argv.js";

export class ICommand
    extends _TypableBase(_ContextBase(_TrimmableBase(class {})))
    implements Command
{
    /// The owner of the command
    owner: App | undefined;

    /// The command handler
    handler: ((ctx: Argv) => void) | null = null;

    /// Constructor
    constructor(app: App, name: string) {
        super();
        this.owner = app;
        this.name = name;
    }

    /// Set the handler for the command.
    Handler(handler: (ctx: Argv) => void): this {
        this.handler = handler;
        return this;
    }

    /// Getter and setter for the short name of the command.
    Shortcut(val?: string): string | this {
        if (val !== undefined) {
            // Make sure the command isn't already registered
            if (this.owner?.commands.has(val)) {
                throw Error("Command already registered");
            }

            // Register in the app as well
            this.owner?.commands.set(val, this);
        }

        return super.Shortcut(val);
    }
}