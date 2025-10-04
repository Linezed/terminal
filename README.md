<div align="center">
    <img src="https://assets.linezed.dev/logo-stripped.png" alt="Linezed" height="40" />
    <h2>Linezed</h2>
    <p>Empowering the Web with modern technologies.</p>
    <hr>
</div>

### Welcome!

`@linezed/terminal` is a command-line interface tool that simplifies
command-line interactions with a powerful and user-friendly interface.

---

### Getting started

To install the package locally, run:

```bash
npm install @linezed/terminal
```

---

### Quick start

**Prerequisites:**

- Node.js (version 14 or higher)
- npm (Node Package Manager)
- [Have the package installed](#getting-started)

In your `main.js` file, add the following code:

```javascript
import Terminal from "@linezed/terminal";
/*import { IArgv, ErrorCodes } from '@linezed/terminal';*/

// Handlers
function greetHandler(env /*: IArgv */) {
    const val = env.Value(); // Get the value passed to the command
    console.log(`Hello, ${val || "World"}!`); // Greet the user
    if (env.Boolean("verbose")) {
        console.log("Verbose mode is enabled.");
    }
}

// Create a new terminal application
const MyTerminalApp = Terminal.App("My App");
MyTerminalApp.Description("This is my terminal application.");
MyTerminalApp.Command("greet") // Command name
    .Type(Terminal.Types.STRING) // Command type
    .Default("World") // Default value if none provided
    .Description("Greets the user") // Command description
    .Flags([
        // Scoped flags per command
        Terminal.Flag("verbose") // Flag name
            .Shortcut("v") // Shortcut for the flag
            .Description("Enable verbose output") // Flag description
            .Type(Terminal.Types.BOOLEAN) // Flag type
            .Default(false), // Default value for the flag
    ]) // Flags for the command
    .Handler(greetHandler); // Command handler function

// Register global flags
MyTerminalApp.Flags([
    Terminal.Flag("debug")
        .Shortcut("d")
        .Description("Enable debug mode")
        .Type(Terminal.Types.BOOLEAN)
        .Default(false),
]);

// Parse the command-line arguments
const res /*: IArgv */ = MyTerminalApp.Parse(Terminal.Args());
if (res.Error) {
    // res.Error.Code() -> Error code, look at ErrorCodes from @linezed/terminal for more details
    // res.Error.Message() -> Error message
    // res.Error.Data() -> Additional error data
    // MyTerminalApp.Help() -> Generate a help message
    console.log(MyTerminalApp.Help());
    return;
}

// Other code you may need here, handlers are fired automatically
```

---

### Other utilities

- `Terminal.Args()`: Retrieves command-line arguments.
- `Terminal.Types`: Provides various data types for commands and flags.
- `Terminal.Read()`: Reads input from the terminal.
- `Terminal.Colors.*`: Utilities for colored terminal output.
- `Terminal.Cursor.*`: Utilities for cursor manipulation in the terminal.

---

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
