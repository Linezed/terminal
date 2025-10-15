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

    /// Boolean formatting.
    boolean: boolean = false;

    /// Selected custom formats
    custom = {
        pre: {
            highest: [] as CustomHandlerFunction[],
            high: [] as CustomHandlerFunction[],
            normal: [] as CustomHandlerFunction[],
            low: [] as CustomHandlerFunction[],
            lowest: [] as CustomHandlerFunction[]
        },
        
        post: {
            highest: [] as CustomHandlerFunction[],
            high: [] as CustomHandlerFunction[],
            normal: [] as CustomHandlerFunction[],
            low: [] as CustomHandlerFunction[],
            lowest: [] as CustomHandlerFunction[]
        }
    };

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

## User-defined behavior

Sometimes, user-defined behavior that goes beyond the provided
capabilities of the `State` object is needed. For example, 
you might want to create a custom format that adds a specific prefix
and suffix to a string, however the `State` object does not have
properties for that.

As per the reference of [Formatter](/contents/reference/formatter),
the methods `AddCustomPrefix` and `RemoveCustomPrefix` can be used to add
and remove user-defined formats.

User-defined formats are [Prefix Formats](#the-prefixfunction-type)
that also start with `:`, but must include a `!` after the colon to
indicate that they are user-defined.

They also have a priority level, which determines the order in which
they are applied. The priority levels are:

- Highest (`CustomHandlerPriority.Highest`)
- High (`CustomHandlerPriority.High`)
- Normal (`CustomHandlerPriority.Normal`)
- Low (`CustomHandlerPriority.Low`)
- Lowest (`CustomHandlerPriority.Lowest`)

Additionally, user-defined formats can be applied either before
or after all other formats, depending on the `order` parameter. The
options are:

- Pre (`CustomHandlerOrder.Pre`): Applied before all other formats.
- Post (`CustomHandlerOrder.Post`): Applied after all other formats.

As a safety measure, custom prefixes may never receive the whole
string to format, but only the positional argument or prop
value associated with the format they're modifying.

What this means is that if the format is:

```text
Hello, {:!MyCustomFormat | app.name}
```

Then the custom format will only receive the value of `app.name`,
and not the whole string `Hello, ...`.

This is to prevent custom formats from interfering with other parts
of the string that they should not be modifying.

### Execution Flow

![Linezed Formatter Execution Flow](https://cdn.jsdelivr.net/gh/Linezed/terminal@master/assets/docs-formatter-flow.png)

Hence, it is clearly appreciated how `Pre` and `Post` custom formats
can be useful to modify the value before or after all other formats
have been applied.

### Restrictions

- `Pre` formats will not receive prefixes added by other formats, while
`Post` formats will receive prefixes added by other formats.
- Both formats must return a string.
- `Post` formats are guaranteed to receive a string as input, while `Pre` formats
may receive values of any type.
- All formats are applied in the order of their priority, from highest to lowest.
- If two formats have the same priority, they are applied in the order they were added.

### Adding custom prefixes

As per the definition of `AddCustomPrefix` in the reference of [Formatter](/contents/reference/formatter),
custom prefixes can be added using the following method:

```ts
public static AddCustomPrefix(
    name: string,
    fn: CustomHandlerFunction,
    priority: CustomHandlerPriority,
    order: CustomHandlerOrder
)
```

The `CustomHandlerFunction` type is defined as follows:

```ts
export type CustomHandlerFunction = (obj: any, state: State) => string;
```

**Example**:

```ts
import { Formatter, State, CustomHandlerPriority, CustomHandlerOrder } from "@linezed/terminal";

Formatter.AddCustomPrefix(
    "MyCustomFormat",
    (obj: any, state: State) => {
        let str = String(obj);
        if (state.text.upper) {
            str = str.toUpperCase();
        }
        return `***${str}***`;
    },
    CustomHandlerPriority.Normal,
    CustomHandlerOrder.Pre
);
```

### Removing custom prefixes

As per the definition of `RemoveCustomPrefix` in the reference of [Formatter](/contents/reference/formatter),
custom prefixes can be removed using the following method:

```ts
public static RemoveCustomPrefix(
    name: string,
    priority?: Priority
)
```

The `Formatter` class keeps an internal map of priorities to custom prefixes,
so if the `priority` parameter is not provided, the custom prefix will be
removed from all priority levels, specifying the priority may improve performance.

**Example**:

```ts
import { Formatter, CustomHandlerPriority } from "@linezed/terminal";

Formatter.RemoveCustomPrefix("MyCustomFormat", CustomHandlerPriority.Normal);
```