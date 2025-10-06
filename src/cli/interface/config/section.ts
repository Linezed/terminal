/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

export default interface Section {
    /// The format string.
    format: string;
    /// The arguments for the format string.
    args: string[];
}