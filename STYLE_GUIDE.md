<div align="center">
    <img src="https://assets.linezed.dev/logo-stripped.png" alt="Linezed" height="40" />
    <h2>Linezed</h2>
    <p>Empowering the Web with modern technologies.</p>
    <hr>
</div>

### Welcome!

In this file, you will find detailed instruction on the code style and conventions used in the `@linezed/terminal` project.
Adhering to these guidelines will help maintain a consistent codebase and improve collaboration among contributors.

### General Guidelines

- **Readability**: Write code that is easy to read and understand. Use meaningful variable and function names that convey their purpose.
- **Comments**: Use comments to explain complex logic or decisions in the code. Avoid obvious comments that do not add value.
- **Consistent Formatting**: Follow consistent formatting practices, including indentation, spacing, and line breaks. 
- **Avoid Deep Nesting**: Limit the depth of nested code blocks to improve readability. Refactor deeply nested code into smaller functions if necessary.
- **Error Handling**: Implement proper error handling to manage exceptions and edge cases gracefully.
- **Performance**: Write efficient code that minimizes resource usage and optimizes performance where applicable.

---

### Formatting

This project comes with prettier installed, to format your code, simply run:

```bash
npm run format
```

**Other formatting rules:**
- Use 4 spaces for indentation.
- Limit lines to a maximum of 100 characters.
- Use single quotes for strings, except when the string contains a single quote that would require escaping
- Place opening braces on the same line as the statement (e.g., `if`, `for`, `function`).
- Use trailing commas in multi-line object and array literals.
- Use semicolons to terminate statements.
- Use parentheses for multi-line arrow function parameters.
- Use template literals for string interpolation.

---

### Code Structure & Good Practices

Follow the established code principles as closely as possible:

**CLEAN:**
- **C**larity: Ensure that your code is clear and easy to understand.
- **L**ogical: Organize code logically, grouping related functions and variables together.
- **E**fficient: Write code that is efficient and avoids unnecessary computations.
- **A**bstraction: Use abstraction to simplify complex logic and improve code reuse.
- **N**aming: Use meaningful and descriptive names for variables, functions, and classes.

**SOLID:**
- **S**ingle Responsibility Principle: A class should have only one reason to change.
- **O**pen/Closed Principle: Software entities should be open for extension but closed for modification.
- **L**iskov Substitution Principle: Subtypes must be substitutable for their base types.
- **I**nterface Segregation Principle: Clients should not be forced to depend on interfaces they do not use.
- **D**ependency Inversion Principle: Depend on abstractions, not on concretions.

---

### Naming conventions

Please follow these naming conventions:
- Use `snake_case` for file, variable and class member names.
- Use `PascalCase` for class, function, enums, methods names 
and the names of their methods (or members for enums).

**Additional rules:**
- For internal functions, add a leading underscore (e.g., `_InternalFunction`).
- Use descriptive names that convey the purpose of the variable or function.
- Avoid abbreviations unless they are widely recognized and understood.
- Use consistent naming conventions throughout the codebase.

---

### Git Commit Messages

When making commits, please follow these guidelines for writing clear and informative commit messages:
- Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.
- Use the present tense (e.g., "Add feature" instead of "Added feature").
- Limit the subject line to 50 characters.
- Provide a detailed description in the body of the commit message, if necessary.
- Reference any related issues or pull requests in the commit message.

---

### Async/Await

When working with asynchronous code, prefer using `async/await` over traditional promise chaining.
This improves readability and makes error handling more straightforward.

---

### Imports

Follow these import guidelines as closely as possible:
- Use ES6 module syntax (`import`/`export`) for all imports and exports.
- Group imports into three sections: standard library imports, third-party imports, and local imports.
- Avoid using wildcard imports (e.g., `import * as ...`), unless absolutely necessary.
- Use absolute imports for modules within the project, and relative imports for modules outside the project.
- Keep import statements at the top of the file, before any other code.
- Avoid circular dependencies by restructuring code.
- Use named imports/exports whenever possible to improve tree-shaking and reduce bundle size.
- Avoid deep import paths; prefer importing from the module's main entry point.