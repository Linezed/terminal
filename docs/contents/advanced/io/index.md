# IO

Linezed Terminal uses buffered output for printing to the terminal.
This means that output is collected in a buffer and written to
the terminal in chunks, rather than writing each piece of output
immediately. This approach can improve performance, especially when
dealing with a large amount of output.

Unlike `console.log`, which writes output directly to the terminal,
Linezed Terminal's uses a ring buffer to manage output. This allows
for more efficient handling of output, as it can batch multiple
output operations together.

Due to the nature of this approach, Linezed Terminal may register
an `onExit` handler to ensure that any buffered output is
flushed to the terminal when the application exits.

However, you can also manually flush the output buffer at any
time using the `Terminal.Flush()` method. This can be useful if
you want to ensure that all pending output is written to the
terminal at a specific point in your application.

Note that all output is flushed before calling any `Terminal.Read`
methods, so you don't need to manually flush the buffer before
reading input from the user.

**Example:**

```javascript
import Terminal from "@linezed/terminal";

Terminal.Print("This is a buffered output example.");
// At this point, the output may not yet be visible in the terminal.
Terminal.Flush(); // Manually flush the output buffer
// Now the output is guaranteed to be written to the terminal.
```

### Benchmark results

The following benchmark compares the performance of `console.log`
with Linezed Terminal's `Terminal.Print` method when printing
a large number of lines to the terminal.

**Benchmark setup:**
- Number of lines: 100,000
- Content of each line: "Hello, world!"
- Environment: Node.js

**Code:**

For Linezed Terminal:
```js
const start = Date.now();
for (let i = 0; i < 100_000; i++) {
    Terminal.Println("Hello, world!");
}

const end = Date.now();
Terminal.Println(`Time taken: ${end - start}ms`);
```

For `console.log`:
```js
const start = Date.now();
for (let i = 0; i < 100_000; i++) {
    console.log("Hello, world!");
}
const end = Date.now();
Terminal.Println(`Time taken: ${end - start}ms`);
```

**Results:**

- **Linezed Terminal: ~153ms**
- **`console.log`:** ~6613ms

Please note that results may vary based on the environment and system
specifications. However, the benchmark consistently shows that
Linezed Terminal's buffered output approach is significantly
faster than using `console.log` for large amounts of output.

Formally, this speedup is due to the reduced number of syscalls
made, as `Terminal.Print` uses a ring buffer and flushes output
in larger chunks, whereas `console.log` makes a syscall for each
line printed. This results in a substantial performance improvement,
especially when printing a large number of lines.