/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

/// A terminal application interface.
import type Nameable from "./nameable.js";
import type Context from "./context.js";
import type Command from "./command.js";
import type Argv from "./argv/argv.js";

export default interface App extends Nameable, Context {
    /// Commands of the application.
    commands: Map<string, Command>;

    /// Get the commands of the application.
    Commands(): Map<string, Command>;

    /// Add a command to the application.
    Command(name: string): Command;

    /// Parse the given input
    Parse(input: string): Argv;
}