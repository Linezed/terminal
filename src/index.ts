/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import process from "node:process";
import IApp from "./cli/impl/app.js";
import BufferedOStream from "./util/buffered_ostream.js";
import Types from "./types.js";
import LineReader from "./util/line_reader.js";
import FormatOutput from "./util/format.js";

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
    public static Println(...text: string[]): void {
        // Write all strings
        for (let str of text) {
            this.OStream.Write(str);
            this.OStream.Write("\n"); // New line
        }
    }

    /// Prints to the standard output without a new line
    public static Print(...text: string[]): void {
        // Write all strings
        for (let str of text) {
            this.OStream.Write(str);
        }
    }

    /// Prints the specified format to the standard output
    public static Printf(format: string, ...args: any[]): void {
        // Print each character of the format string
        let arg_idx = 0; // Current argument index
        for (let i = 0; i < format.length; i++) {
            // Get the current character
            let char = format[i];

            // Check if it's a format specifier ("{}")
            if (char === "{") {
                // Format the argument
                let [res, skipped] = FormatOutput(format, i, arg_idx, args);

                // Write the formatted argument
                this.OStream.Write(res);
                arg_idx++; // Move to the next argument
                i += skipped; // Skip the processed characters
            } else {
                // Write the character as is
                this.OStream.Write(char as string);
            }
        }
    }

    /// Prints the specified format to the standard output with a new line
    public static Printfln(format: string, ...args: any[]): void {
        this.Printf(format, ...args);
        this.OStream.Write("\n"); // New line
    }

    /// Flush the output stream
    public static Flush(): void {
        this.OStream.Flush();
    }

    /// Reads a line from standard input
    public static async Read(type: Types): Promise<string | number | boolean> {
        Terminal.Flush(); // Flush before reading
        let result = await LineReader.Read(); // Read a line

        // Check the type
        if (type === Types.String) {
            // String
            return result;
        } else if (type === Types.Number) {
            // Number
            let num = Number(result);
            if (isNaN(num)) {
                throw new Error("Invalid number input");
            }

            return num;
        } else if (type === Types.Boolean) {
            // Boolean
            let lowered = result.toLowerCase();
            if (lowered === "true" || lowered === "1") {
                return true;
            } else if (lowered === "false" || lowered === "0") {
                return false;
            } else {
                throw new Error("Invalid boolean input");
            }
        } else {
            throw new Error("Unsupported type");
        }
    }
}

// Flush on exit
process.on("beforeExit", () => {
    Terminal.Flush();
});

// Other exports
export { Types };