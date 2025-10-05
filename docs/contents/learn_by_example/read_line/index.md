# Reading a line

In this example, we'll create a simple program that reads a line of
input from the user and then prints it back to the console.

```javascript
import Terminal, { Types } from "@linezed/terminal";

Terminal.Print("Please enter your name: ");
Terminal.Read(Types.String)
    .then((name) => {
        Terminal.Printfln("Hello, {}!", name);
    });
```

### How to Run the Example

1. Make sure you have `@linezed/terminal` installed in your project. You can install it using npm:

   ```bash
   npm install @linezed/terminal
   ```
   
2. Save the above code in a file named `read_line.js`.
3. Run the application from the command line:

   ```bash
   node read_line.js
   ```
   
4. Follow the prompt to enter your name, and see the greeting message printed back to you.

