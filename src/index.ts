/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import process from "node:process";
import IApp from "./impl/app.js";
import BufferedOStream from "./buffered_ostream.js";

export default class Terminal {
    /// The output stream for the terminal.
    private static OStream = new BufferedOStream(process.stdout, 1024);

    /// Get the command-line arguments passed to the Node.js process.
    public static Args(): string[] {
        return process.argv;
    }

    /// Create a new terminal application instance.
    public static App(name: string): IApp {
        return new IApp(name);
    }

    /// Prints a line to the standard output
    public static Println(line: string): void {
        this.OStream.Write(line);
        this.OStream.Write("\n"); // New line
    }

    /// Prints to the standard output without a new line
    public static Print(text: string): void {
        this.OStream.Write(text);
    }

    /// Flush the output stream
    public static Flush(): void {
        this.OStream.Flush();
    }
}

// Flush on exit
process.on("beforeExit", () => {
    Terminal.Flush();
});