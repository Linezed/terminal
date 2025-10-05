# Argv

This class represents the parsed command-line arguments passed
to a command-line application.

## API Documentation

- [**`Argv.Error: ArgvError | null`**](/contents/reference/argv_error): Gets the error encountered during parsing, if any.
- [**`Argv.Value(): any`**](#): Gets the value of the parsed command entered by the user, converted to the appropriate type.
- [**`Argv.Boolean(name: string): boolean`**](#): Gets the boolean value of the specified flag.
- [**`Argv.String(name: string): string`**](#): Gets the string value of the specified flag.
- [**`Argv.Number(name: string): number`**](#): Gets the numeric value of the specified flag.
- [**`Argv.HasBoolean(name: string): boolean`**](#): Checks if the specified boolean flag was provided.
- [**`Argv.HasString(name: string): boolean`**](#): Checks
- [**`Argv.HasNumber(name: string): boolean`**](#): Checks if the specified numeric flag was provided.
- [**`Argv.Has(name: string): boolean`**](#): Checks if the specified flag was provided, regardless of its type.