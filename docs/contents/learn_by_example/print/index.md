# Printing

In this example, we'll go over how to use the `Terminal.Print*` functions to print
formatted or plain output to the terminal.

## `Terminal.Print`

This function prints a plain message to the terminal.
It does not add a newline at the end.

**Example:**

```javascript
import Terminal from "@linezed/terminal";

Terminal.Print("Hello, ");
Terminal.Print("world!");
// Output: Hello, world!
```

## `Terminal.Println`

This function prints a message to the terminal and adds a newline at the end.

**Example:**

```javascript
import Terminal from "@linezed/terminal";
Terminal.Println("Hello, world!");
// Output: Hello, world!
```

## `Terminal.Printf`

This function prints a formatted message to the terminal.
It uses `{}` as a placeholder for values, which will be
replaced by the provided arguments.

For a complete list of format specifiers, refer to [Formatter](/contents/reference/formatter).

For a complete list of colors, refer to [Colors](/contents/reference/colors).

**Example:**

```javascript
import Terminal from "@linezed/terminal";

Terminal.Printf("Hello, {}!", "world");
// Output: Hello, world!
Terminal.Printf("Pi is approximately {.2f}", 3.14159);
// Output: Pi is approximately 3.14
Terminal.Printf("Truncated string: {.5s}", "Hello, world!");
// Output: Truncated string: Hello
Terminal.Printf("This is a {:Red}.", "word");
// Output: This is a word. (with "word" in red color)
```

## `Terminal.Printfln`

This function is similar to `Terminal.Printf`, but it adds a newline at the end.

**Example:**

```javascript
import Terminal from "@linezed/terminal";

Terminal.Printfln("Hello, {}!", "world");
// Output: Hello, world!
Terminal.Printfln("Pi is approximately {:.2f}", 3.14159);
// Output: Pi is approximately 3.14
Terminal.Printfln("This is a {:Red}.", "word");
// Output: This is a word. (with "word" in red color)
```
