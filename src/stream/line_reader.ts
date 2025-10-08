/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

/// A utility class for reading lines from a string or stream.
export default class LineReader {
    /// Reads a line from the standard input.
    static async Read(): Promise<string> {
        return new Promise((resolve) => {
            // Get the standard input and output streams.
            const stdin = process.stdin;

            // Resume the standard input stream.
            stdin.resume();

            // Listen for data on the standard input stream.
            stdin.once("data", function (data) {
                resolve(data.toString().trim());
                stdin.pause(); // Pause the stream after reading
            });
        });
    }
}
