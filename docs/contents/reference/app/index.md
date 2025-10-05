# App

The App class allows you to create command-line applications with support
for commands, flags, and argument parsing. It provides a structured way
to define the behavior of your CLI application.

**API Documentation:**

- [**`App.Command(name: string): Command`**](/contents/reference/command): Defines a new command for the application.
- [**`App.Commands(): Command[]`**](/contents/reference/command): Gets the list of commands defined in the application.
- [**`App.Flag(name: string): Flag`**](/contents/reference/flag): Defines a new global flag for the application.
- [**`App.Flags(): Flag[]`**](/contents/reference/flag): Gets the list of global flags defined in the application.
- [**`App.Name(): string`**](#): Gets the name of the application.
- [**`App.Description(desc: string): App`**](#): Sets the description
- [**`App.Parse(args: string[]): Argv`**](/contents/reference/argv): Parses the provided command-line arguments.
- [**`App.Help(): string`**](#): Generates and returns the help message for the application.