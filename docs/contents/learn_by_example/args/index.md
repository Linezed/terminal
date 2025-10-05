# Getting the Process Arguments

To access the command-line arguments passed to your Node.js application,
you can use `Terminal.Args()`. This method retrieves the arguments from the
`process.argv` array, excluding the first two elements (which are the path to
the Node.js executable and the path to the script being executed).

**Example:**

```js
import Terminal from "@linezed/terminal";

const args = Terminal.Args();
Terminal.Printfln("Arguments: {}", args);
```