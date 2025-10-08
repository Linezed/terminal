# Formatter

The `Formatter` class is responsible for formatting strings
with various styles and colors for terminal output.

## API Documentation

- **`Formatter.Format(format: string, ...args: any[]): string`**:
    Formats a string using the specified format and arguments.

- **`Formatter.FormatWithProps(format: string, props: Record<string, any>, ...args: any[]): string`**:
  Formats a string using the specified format and arguments.

- [**`Formatter.AddPrefix(name: string, fn: PrefixFunction): void`**](/contents/advanced/custom_formats/):
  Adds a custom prefix sub-formatter function to the Formatter. Throws an error if the prefix already exists.

- [**`Formatter.AddFormat(name: string, fn: BaseFormatFunction): void`**](/contents/advanced/custom_formats/):
  Adds a custom base sub-formatter function to the Formatter. Throws an error if the sub-formatter already exists.

- [**`Formatter.RemovePrefix(name: string): void`**](/contents/advanced/custom_formats/):
  Removes a custom prefix sub-formatter function from the Formatter. 
  Throws an error if the sub-formatter does not exist.

- [**`Formatter.RemoveFormat(name: string): void`**](/contents/advanced/custom_formats/):
  Removes a custom base sub-formatter function from the Formatter.
  Throws an error if the sub-formatter does not exist.

## Format Specifiers

The Formatter supports two main types of sub-formatters:

- **Base Sub-Formatters**: These start with a dot (`.`), end with an identifier
    (like `s`, `d`, `f`, etc.), and can include optional ranges.
- **Prefix Sub-Formatters**: These start with a colon (`:`) and cannot include
    ranges, like `:Red`, `:Bold.Red`, etc.

## Base Sub-Formatters

There are several basic sub-formatters available:

- **String (`s`)**: Formats the argument as a string.
  - `.Ns`: Truncates the string to the first `N` characters.
  - `.(start.end)s`: Extracts a substring from `start` to `end`.
  - **Example**:
    ```js
    Formatter.Format("Hello, {.5s}!", "worldwide");
    // Output: Hello, world!
    ```
- **Number (`f`)**: Formats the argument as an integer.
  - `.Nf`: Sets the floating-point precision to `N` digits.
  - **Example**:
    ```js
    Formatter.Format("Pi is approximately {.2f}", 3.14159);
    // Output: Pi is approximately 3.14
    ```
- **JSON (`j`)**: Formats the argument as a JSON string.
  - `.Nj`: Pretty-prints the JSON with an indentation of `N` spaces.
  - **Example**:
    ```js
    Formatter.Format("Data: {.2j}", { name: "Alice", age: 30 });
    // Output: Data: {
    //   "name": "Alice",
    //   "age": 30
    // }
    ```

## Prefix Sub-Formatters

Prefix sub-formatters are used to apply styles and colors to the text.
They start with a colon (`:`) and contain a single identifier.

- **Colors**: You can use various colors like `Red`, `Green`, `Blue`, etc.
  - Supports all colors in the [Colors](/contents/reference/colors) documentation.
  - **Example**:
    ```js
    Formatter.Format("This is a {:Red} word.", "red");
    // Output: This is a red word. (with "red" in red color)
    Formatter.Format("This is a {:Bold.Blue} word.", "blue");
    // Output: This is a blue word. (with "blue" in bold blue color)
    ```
- **Text Cases**:
  - `Upper`: Converts text to uppercase.
  - `Lower`: Converts text to lowercase.
  - `Title`: Converts text to title case.
  - **Example**:
    ```js
    Formatter.Format("This is {:Upper} text.", "uppercase");
    // Output: This is UPPERCASE text.
    Formatter.Format("This is {:Lower} TEXT.", "LOWERCASE");
    // Output: This is lowercase text.
    Formatter.Format("This is {:Title} text.", "title case");
    // Output: This is Title Case text.
    ```
- **Dates**:
  - `ISO`: Formats dates in ISO 8601 format.
  - `UTC`: Formats dates in UTC format.
  - **Example**:
    ```js
    const date = new Date("2023-01-01T12:00:00Z");
    Formatter.Format("Date in ISO format: {:ISO}", date);
    // Output: Date in ISO format: 2023-01-01T12:00:00.000Z
    Formatter.Format("Date in UTC format: {:UTC}", date);
    // Output: Date in UTC format: Sun, 01 Jan 2023 12:00:00 GMT
    ```
- **Padding**:
  - `<N`: Pads the text on the left to a total width of `N` characters.
  - `>N`: Pads the text on the right to a total width of `N` characters.
  - **Example**:
    ```js
    Formatter.Format("'{:<10}'", "text");
    // Output: '      text'
    Formatter.Format("'{:>10}'", "text");
    // Output: 'text      '
    ```

## Combining Sub-Formatters

You can combine multiple sub-formatters in a single placeholder.
This can be done by piping them together.

For example, to format a string to be uppercase and red, you can use:
```js
Formatter.Format("This is a {:Upper | :Red} word.", "important");
// Output: This is a IMPORTANT word. (with "IMPORTANT" in red color)
```

You can pipe base and prefix sub-formatters together as well:
```js
Formatter.Format("Truncated and colored: {.5s | :Green}", "Hello, world!");
// Output: Truncated and colored: Hello (with "Hello" in green color)
```

## Adding prefixes

The Formatter can also add prefixes to formatted strings.
Prefixes should be enclosed in single quotes.

There is no specific order as to where you can palce them,
but it is recommended that they're placed at the start of
the format specifier for better readability.

**Example**:
```js
Formatter.Format("This is a {:Red | '>>'} word.", "word");
// Output: This is a >>word. (with ">>word" in red color)
Formatter.Format("This is a {.5s | '...'}", "Hello, world!");
// Output: This is a ...Hello
```

The prefix will be added before the formatted value, and it will share
the same styles and colors as the formatted value.

## Formatting with property maps

The `Formatter.FormatWithProps` method allows you to format strings
using a property map for named arguments, in addition to the standard
positional arguments.

**Example**:
```js
const props = { name: "Alice", age: 30 };
Formatter.FormatWithProps("Name: {name}, Age: {age}", props);
// Output: Name: Alice, Age: 30
Formatter.FormatWithProps("Name: {name}, Age: {.2f | age}", props);
// Output: Name: Alice, Age: 30.00
Formatter.FormatWithProps("This is a {:Blue | name}.", props);
// Output: This is a Alice. (with "Alice" in blue color)
Formatter.FormatWithProps("Truncated name: {.3s | name}", props);
// Output: Truncated name: Ali
```

## Optional prop formatting

A prop may not always be present in the property map. To handle such cases,
you can use the `?` operator to make the formatting optional.

In the case the property is not found, the Formatter will replace
the placeholder with an empty string, and will ignore all prefixes.

**Example**:
```js
const props = { name: "Alice" };
Formatter.FormatWithProps("Name: {name}, Age: {age?}", props);
// Output: Name: Alice, Age: 
```

It is also possible to pipe optional props with other sub-formatters.
In this case, if the prop is not found, the entire placeholder
will be replaced with an empty string.

**Example**:
```js
const props = { name: "Alice" };

Formatter.FormatWithProps("Name: {name}, Age: {:Red | .2f | age?}", props);
// Output: Name: Alice, Age: 
```

## Error Handling

If an invalid format specifier is used, the Formatter will throw an error.
Make sure to use valid format specifiers as described in this documentation.