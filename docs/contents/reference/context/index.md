# Context

The `Context` interface defines functionality for any object that
accepts local or global flags.

## Implements

- [**`Nameable`**](/contents/reference/nameable/)

## API Documentation

- [**`Context.Flag(name: string): Flag`**](/contents/reference/flag/): Defines a new flag for the context.
- [**`Context.Flags(): Flag[]`**](/contents/reference/flag/): Gets the list of flags defined in the context.
- [**`Context.Name(): string`**](#): Gets the name of the context.
- [**`Context.Description(desc: string): Context`**](#): Sets the description for the context.