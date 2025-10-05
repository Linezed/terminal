# Command

The `Command` class represents a command in a command-line application.
It allows you to define the behavior of the command, including its
name, description, type, flags, and handler function.

**Implements**

- [**`Context`**](/contents/reference/context/)
- [**`Typable`**](/contents/reference/typable/)
- [**`Trimmable`**](/contents/reference/trimmable/)

**API Documentation:**

- [**`Command.Name(): string`**](#): Gets the name of the command.
- [**`Command.Description(desc: string): Command`**](#): Sets the description for the command.
- [**`Command.Description(): string`**](#): Gets the description of the command
- [**`Command.Type(): string`**](#): Gets the type of the command.
- [**`Command.Type(type: string): Command`**](#): Sets the type for the command.
- [**`Command.Handler(): (args: Argv) => void | Promise<void>`**](#): Gets the handler function for the command.
- [**`Command.Handler(handler: (args: Argv) => void | Promise<void>): Command`**](#): Sets the handler function to be executed when the command is invoked.
- [**`Command.Flags(): Flag[]`**](#): Gets the list of flags defined for the command.
- [**`Command.Flag(name: string): Flag`**](#): Defines a new flag for the command.