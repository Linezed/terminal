/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

export default interface Trimmable {
    /// The shortcut name of the entity.
    shortcut: string | undefined;

    /// Getter overload
    Shortcut(): string | undefined;

    /// Setter overload
    Shortcut(val: string): this;
}