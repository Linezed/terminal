/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

/// A buffered output stream.
export default class BufferedOStream {
    /// The internal buffer.
    private readonly buffer: string[] = [];

    /// The current length of the buffer.
    private readonly length: number = 0;

    /// The current position in the buffer.
    private curr: number = 0;

    /// The stream to write to
    private stream: NodeJS.WritableStream;

    /// Constructor
    constructor(stream: NodeJS.WritableStream, max: number) {
        this.stream = stream;
        this.buffer = new Array<string>(max);
        this.length = max;
    }

    /// Copies a string into the buffer.
    private CopyToBuffer(str: string): void {
        for (let i = 0; i < str.length; i++) {
            // Write the character to the buffer
            this.buffer[this.curr++] = str[i] as string;
        }
    }

    /// Flushes the buffer to the stream.
    public Flush(): void {
        if (this.curr == 0) return; // Nothing to flush

        // Write the buffer to the stream
        this.stream.write(
            this.buffer.slice(0, this.curr)
            .join('')
        );

        // Reset the buffer
        this.curr = 0;
    }

    /// Writes a string to the buffer.
    public Write(str: string): void {
        // Make sure the string fits in the buffer
        if (this.curr >= this.length) {
            this.Flush();
        }

        // Write what fits in the buffer
        let space = this.length - this.curr;
        if (str.length <= space) {
            this.CopyToBuffer(str); // Write the whole string
            return;
        }

        // Write what fits until the buffer is full
        let remaining = str.length;
        let written = 0;
        while (remaining > 0) {
            // See if we can write the whole string
            if (remaining <= space) {
                this.CopyToBuffer(str.slice(str.length - remaining));
                return;
            }

            // Get what fits
            let writeStr = str.slice(written, written + space);
            this.CopyToBuffer(writeStr);
            this.Flush(); // Flush the buffer

            // Update counters
            written += space;
            remaining -= space;
            space = this.length; // Reset space
        }
    }
}