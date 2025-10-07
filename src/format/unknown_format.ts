/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

export default class UnknownFormat extends Error {
    constructor(format: string) {
        super(`Unknown format: ${format}`);
    }
}