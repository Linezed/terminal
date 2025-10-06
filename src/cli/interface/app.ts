/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

/// A terminal application interface.
import type Context from "./context.js";
import type Command from "./command.js";
import type Argv from "./argv/argv.js";
import type Config from "./config/config.js";

export default interface App extends Context {
    /// Commands of the application.
    commands: Map<string, Command>;

    /// The version of the application.
    version: string;

    /// The configuration for the application.
    config: Config;

    /// Get the commands of the application.
    Commands(): Map<string, Command>;

    /// Add a command to the application.
    Command(name: string): Command;

    /// Parse the given input
    Parse(input: string[]): Argv;

    /// Get the version of the application.
    Version(): string;

    /// Set the version of the application.
    Version(version: string): this;

    /// Generates a help message for the application.
    Help(argv?: Argv, color?: string): string;

    /// Gets the configuration.
    Config(): Config;
}
