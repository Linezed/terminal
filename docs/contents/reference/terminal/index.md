# Terminal

This class provides various static methods to facilitate command-line
interactions, including printing messages, parsing arguments,
and creating command-line applications.

- [**`Terminal.Args(): string[]`**](/contents/learn_by_example/args/): Retrieves the
command-line arguments passed to the Node.js application. 
- [**`Terminal.Print(message: string): void`**](/contents/learn_by_example/print/):
Prints a message to the terminal without a newline.
- [**`Terminal.Println(message: string): void`**](/contents/learn_by_example/print/):
Prints a message to the terminal with a newline.
- [**`Terminal.Printf(format: string, ...args: any[]): void`**](/contents/learn_by_example/print/):
Prints a formatted message to the terminal.
- [**`Terminal.Read(type: Types): Promise<any>`**](/contents/learn_by_example/read_line/):
Reads a line of input from the user and parses it into the specified type.
- [**`Terminal.App(name: string, config?: Config): App`**](/contents/reference/app/):
Creates a new command-line application instance with the given name and optional configuration.
- [**`Terminal.Read(t: Types): Promise<?>`**](/contents/learn_by_example/read_line/):
Reads a line of input from the user and parses it into the specified type.
- [**`Terminal.Flush(): void`**](/contents/advanced/io/):
Flushes the output buffer, ensuring all pending output is written to the terminal.


