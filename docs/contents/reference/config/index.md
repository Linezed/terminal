# Config

The `Config` class encapsulates configuration settings for command-line
applications. It allows you to customize various aspects of the application's
behavior and appearance.

## Definition

```ts
type Config = {
    /// Whether to add help flags automatically to commands and apps.
    auto_help: boolean;

    /// Whether to add version flags automatically to commands and apps.
    auto_version: boolean;

    /// The number of spaces to use for indentation.
    indent: number;

    /// The characters to use to separate sections.
    spacing: string;

    /// The formats for messages.
    format: {
        /// The name format.
        name: {
            /// The format string.
            format: string;
            /// The arguments for the format string.
            args: string[];
        };

        /// The usage message format.
        usage: {
            /// The format string.
            format: string;
            /// The arguments for the format string.
            args: string[];
        };

        /// The help message format.
        description: {
            /// The format string.
            format: string;
            /// The arguments for the format string.
            args: string[];
        };

        /// The command section format.
        error: {
            /// The format string.
            format: string;
            /// The arguments for the format string.
            args: string[];
        };

        /// The command section format.
        command: {
            /// The header format.
            header: {
                /// The format string.
                format: string;
                /// The arguments for the format string.
                args: string[];
            };
            /// The format for each item.
            item: {
                /// The format string.
                format: string;
                /// The arguments for the format string.
                args: string[];
            };
        };

        /// The flag section format.
        flag: {
            /// The header format.
            header: {
                /// The format string.
                format: string;
                /// The arguments for the format string.
                args: string[];
            };
            
            /// The format for each item.
            item: {
                /// The format string.
                format: string;
                /// The arguments for the format string.
                args: string[];
            };
        };

        /// The format for types.
        types: {
            string: {
                /// The format string.
                format: string;
                /// The arguments for the format string.
                args: string[];
            };
            number: {
                /// The format string.
                format: string;
                /// The arguments for the format string.
                args: string[];
            };
            boolean: {
                /// The format string.
                format: string;
                /// The arguments for the format string.
                args: string[];
            };
        }
    }
}
```

## Implementing a custom Config

You can create a custom configuration by defining an object that adheres to the
`Config` type, or creating a class that extends `IConfig` (exported by
`@linezed/terminal`).

All objects that have `format` and `args` properties are passed
through the [Formatter](/contents/reference/formatter) before being used.

For `item` in `command` and `flag`, the `Command` or `Flag` (respectively)
are bind to the formatter's props, so you can grab their properties, for example:

```ts
let customConfig: Config = {
    ///...
    command: {
        /// The header format.
        header: {
            /// The format string.
            format: "{:Bold.Cyan}",
            /// The arguments for the format string.
            args: [ "Commands:" ],
        },
        /// The format for each item.
        item: {
            /// The format string.
            format: "{:Cyan | name} - {Command.description}\n",
            /// The arguments for the format string.
            args: [],
        },
    },
    ///...
}
```