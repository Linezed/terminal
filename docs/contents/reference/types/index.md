# Types

The `Types` enum defines the various data types
that can be used for command and flag arguments in a
terminal application. Each type corresponds to a specific
kind of input that the application can accept.

**Available Types:**

- `Types.String`: Represents a string input.
- `Types.Number`: Represents a numeric input.
- `Types.Boolean`: Represents a boolean input (true/false).

**Example Usage:**

```javascript
import Terminal, { Types } from "@linezed/terminal";

Terminal.Read(Types.String)
    .then((input) => {
        Terminal.Printfln("You entered a string: {}", input);
    });
```

This reads a line of input from the user and parses it as a string,
then prints it back to the terminal.