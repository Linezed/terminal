# BufferedOStream

`BufferedOStream` is a class that provides buffered output stream
functionality. It is designed to improve performance by reducing the
number of write operations to the underlying output stream.

It takes a `WritableStream` as input and buffers the data before writing it
to the stream.

**API Documentation:**

- `BufferedOStream(stream: WritableStream, bufferSize?: number)`: Constructor that
initializes the buffered output stream with the given writable
stream and buffer size.
- `BufferedOStream.Flush(): void`: Flushes the buffered data to the underlying stream.
- `BufferedOStream.Write(data: string): void`: Writes data to the buffer. If the buffer
exceeds the specified size, it automatically flushes the data to the stream.

**Additional Notes:**

This concept was borrowed from [Zelix STL](https://github.com/zelix-lang/STL),
however JavaScript does not have native support for destructors, so the
`Flush` method must be called manually when the stream goes out
of scope to ensure all buffered data is written.

`Terminal` manages this concern by registering a Node.js hook:

```js
process.on("beforeExit", () => {
    Terminal.Flush();
});
```