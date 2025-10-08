# Custom Formats

Linezed's Formatter also supports custom sub-formatters.
You can create your own sub-formatters to handle specific formatting needs.

## The `State` Object

The Formatter uses a `State` object to keep track of the current formatting state.
It collects all formats first, then uses its converter to apply the formats to the given value.
**Definition**:

```ts
export class State {
    /// The color of the string.
    color: string | undefined = undefined;

    /// The floating point precision.
    precision: number | undefined = undefined;

    /// Spaces for JSON formatting.
    json: undefined | number = undefined;

    /// Prop access.
    prop = {
        name: undefined as string | undefined,
        optional: false
    };

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
```

An instance of `State` is passed to all custom sub-formatters, allowing them to modify
the formatting state as needed.

## The `PrefixFunction` Type

This type defines a function that takes a prefix string and a `State` object.
It is used to create custom prefix sub-formatters.

The prefix is the part after the colon (`:`) in a sub-formatter.
For example, in `{:Red}`, the prefix is `Red`.

**Definition**:

```ts
export type PrefixFunction = (pref: string, state: State) => void;
```

## The `BaseFormatFunction` Type

This type defines a function that takes a value and a `State` object.
It is used to create custom base formatters.

**Definition**:

```ts
export type BaseFormatFunction = (range: number[], state: State) => void;
```

Given that base formats can have ranges, for example:

- `{.2f}` (where `.2` is the range for precision)
- `{.5s}` (where `.5` is the range for slicing)
- `{.(1.4)s}` (where `.1.4` is the range for slicing from index 1 to 4)
- `{.3j}` (where `.3` is the range for JSON indentation)
- `{.s}` (where there is no range)
- `{.f}` (where there is no range)
- `{.j}` (where there is no range)
- `{.(1,2,3)c` (where `.1,2,3` is the range for custom format with multiple arguments)

The range is passed as an array of numbers to the base format function.

Type checking is done by the Formatter, and the end handler is guaranteed
to always get an array of numbers as the range.

## Adding Custom Formats

As defined by the reference of [Formatter](/contents/reference/formatter),
the methods `AddPrefix` and `AddFormat` can be used to add custom sub-formatters.

In both cases, if a sub-formatter with the same name already exists, an error is thrown.

The validation of the length and the numbers within the range is up to the custom sub-formatter.

**Example**:

```ts
import { Formatter, State } from "@linezed/terminal";

Formatter.AddPrefix("Upper", (_: string, state: State) => {
    state.text.upper = true;
});

Formatter.AddFormat("s", (range: number[], state: State) => {
    if (range.length === 1) {
        state.text.slice.start = 0;
        state.text.slice.end = range[0];
    } else if (range.length === 2) {
        state.text.slice.start = range[0];
        state.text.slice.end = range[1];
    } else {
        throw new Error("Invalid range for .s format");
    }
});
```