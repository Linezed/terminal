# Types

The `Types` enum defines the various data types
that can be used for command and flag arguments in a
terminal application. Each type corresponds to a specific
kind of input that the application can accept.

**Available Types:**

- `Types.String`: Represents a string input.
- `Types.Number`: Represents a numeric input.
- `Types.Boolean`: Represents a boolean input (true/false).

**Numerical Representations:**

- `Types.String` becomes `0` after compilation.
- `Types.Number` becomes `1` after compilation.
- `Types.Boolean` becomes `2` after compilation.