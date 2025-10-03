/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import process from "node:process";
import IApp from "./impl/app.js";
import BufferedOStream from "./util/buffered_ostream.js";
import Types from "./types.js";
import LineReader from "./util/line_reader.js";

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

    /// Flush the output stream
    public static Flush(): void {
        this.OStream.Flush();
    }

    /// Reads a line from standard input
    public static async Read(type: Types): Promise<string | number | boolean> {
        Terminal.Flush(); // Flush before reading
        let result = await LineReader.Read(); // Read a line

        // Check the type
        if (type === Types.STRING) {
            // String
            return result;
        } else if (type === Types.NUMBER) {
            // Number
            let num = Number(result);
            if (isNaN(num)) {
                throw new Error("Invalid number input");
            }

            return num;
        } else if (type === Types.BOOLEAN) {
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