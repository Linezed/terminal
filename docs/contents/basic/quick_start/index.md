# Quick Start

To get started, make sure you have read the [Getting Started](/) section.

After installing the package, you can create a simple terminal application
following the steps below:

> **Warning:** This example assumes you have Node.js and npm installed on your machine.
> It also assumes you have already initialized a Node.js project using `npm init`.

**1. Create a main script:**

If you haven't already, create a file named `index.js` in your project directory.

**On Unix-based systems (Linux, macOS):**

```bash
touch index.js
```

**On Windows:**

```cmd
type nul > index.js
```

**2. Add the following code to `index.js`:**

```javascript
import Terminal, { Types } from "@linezed/terminal";

let app = Terminal.App("test-app");

app.Command("test-command")
    .Shortcut("t")
    .Type(Types.String)
    .Description("test command")
    .Handler((ctx) => {
        Terminal.Printfln("Test command executed with value {}!", ctx.Value());
    }).Flag("help")
        .Shortcut("h")
        .Type(Types.Boolean)
        .Description("display help");
```

**3. Run your application:**

```bash
node index.js test-command -h
```

**That's it!** You have successfully created a simple terminal application
using `@linezed/terminal`. You can now expand upon this example by adding more
commands, flags, and functionality as needed.