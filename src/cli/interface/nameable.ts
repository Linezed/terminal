/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

export default interface Nameable {
    /// The name of the entity.
    name: string;

    /// The description of the entity.
    description: string | undefined;

    /// Getter for the name of the entity.
    Name(): string;

    /// Setter for the description of the entity.
    Description(val: string): this;

    /// Getter for the description of the entity.
    Description(): string;
}
