/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

export default interface Trimmable {
    /// The shortcut name of the entity.
    shortcut: string | undefined;

    /// Setter for the short name of the entity.
    Shortcut(val: string): this;

    /// Getter for the short name of the entity.
    Shortcut(): string;
}