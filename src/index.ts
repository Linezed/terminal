/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import process from "node:process";
import IApp from "./cli/impl/app.js";
import BufferedOStream from "./stream/buffered_ostream.js";
import Types from "./types/types.js";
import LineReader from "./stream/line_reader.js";
import ConvertToType from "./types/converter.js";
import * as Colors from "./colors/colors.js";
import Formatter from "./format/formatter.js";
import ArgvErrorCode from "./cli/interface/argv/codes.js";

export default class Terminal {
    /// The output stream for the terminal.
    private static OStream = new BufferedOStream(process.stdout, 1024);
    private static args = process.argv.slice(2); // Skip the first two arguments (node and script path)

    /// Get the command-line arguments passed to the Node.js process.
    public static Args(): string[] {
        return Terminal.args;
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
        this.OStream.Write(Formatter.Format(format, ...args));
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
        return ConvertToType(type, await LineReader.Read());
    }
}

// Flush on exit
process.on("beforeExit", () => {
    Terminal.Flush();
});

// Other exports
export { Types, Colors, ArgvErrorCode };
