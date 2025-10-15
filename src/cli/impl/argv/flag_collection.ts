/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

export default class FlagCollection {
    /// String flags
    strings: Map<string, string> = new Map();

    /// Boolean flags
    bools: Map<string, boolean> = new Map();

    /// Number flags
    numbers: Map<string, number> = new Map();

    /// Gets a string
    String(name: string): string | undefined {
        return this.strings.get(name);
    }

    /// Gets a boolean
    Boolean(name: string): boolean | undefined {
        return this.bools.get(name);
    }

    /// Gets a number
    Number(name: string): number | undefined {
        return this.numbers.get(name);
    }

    /// Checks if a flag is present, regardless of type
    Has(name: string): boolean {
        return this.strings.has(name) || this.bools.has(name) || this.numbers.has(name);
    }
}