# CLI Application

In this example, we'll create a simple CLI application using `@linezed/terminal`.
This application will greet the user with a personalized message based on the provided name and age.

```javascript
import Terminal, { Types } from "@linezed/terminal";

let app = Terminal.App("greet-app");
app.Command("greet")
    .Shortcut("g")
    .Type(Types.String)
    .Description("Greet a user with their name and age")
    .Handler((ctx) => {
        const name = ctx.Value();
        const age = ctx.Number("age") || "unknown";
        Terminal.Printfln("Hello, {}! You are {} years old.", name, age);
    }).Flag("age")
        .Shortcut("a")
        .Type(Types.Number)
        .Description("The age of the user");

app.Parse(Terminal.Args());
```

### How to Run the Example

1. Make sure you have `@linezed/terminal` installed in your project. You can install it using npm:

   ```bash
   npm install @linezed/terminal
   ```
   
2. Save the above code in a file named `greet.js`.
3. Run the application from the command line, providing a name and optionally an age:

   ```bash
   node greet.js greet John --age 30
   ```