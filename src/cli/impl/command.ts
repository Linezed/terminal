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

export class ICommand
    extends _NameableBase(_TypableBase(_ContextBase(_TrimmableBase(class{}))))
    implements Command
{
    handler: ((cmd: Command) => void) | null = null;

    /// Constructor
    constructor(name: string) {
        super();
        this.name = name;
    }

    /// Set the handler for the command.
    Handler(handler: (cmd: Command) => void): void {
        this.handler = handler;
    }
}