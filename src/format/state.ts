/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

export class State {
    /// The color of the string.
    color: string | undefined = undefined;

    /// The floating point precision.
    precision: number | undefined = undefined;

    /// Spaces for JSON formatting.
    json: undefined | number = undefined;

    /// Prop access.
    prop: string | undefined = undefined;

    /// Text formatting.
    text = {
        upper: false,
        lower: false,
        title: false,
        trim: false,

        /// Text appended before the string.
        prefix: undefined as string | undefined,

        /// Padding for text.
        padding: {
            left: 0,
            right: 0
        },

        /// Slicing for text.
        slice: {
            start: Infinity,
            end: Infinity
        }
    };

    /// Date formatting.
    date = {
        iso: false,
        utc: false,
    }
}