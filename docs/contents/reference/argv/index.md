# Argv

This class represents the parsed command-line arguments passed
to a command-line application.

## API Documentation

- [**`Argv.Error: ArgvError | null`**](/contents/reference/argv_error): Gets the error encountered during parsing, if any.
- [**`Argv.Value(): any`**](#): Gets the value of the parsed command entered by the user, converted to the appropriate type.
- [**`Argv.Boolean(name: string, order: LookupOrder): boolean`**](#): Gets the boolean value of the specified flag.
- [**`Argv.String(name: string, order: LookupOrder): string`**](#): Gets the string value of the specified flag.
- [**`Argv.Number(name: string, order: LookupOrder): number`**](#): Gets the numeric value of the specified flag.
- [**`Argv.HasBoolean(name: string, order: LookupOrder): boolean`**](#): Checks if the specified boolean flag was provided.
- [**`Argv.HasString(name: string, order: LookupOrder): boolean`**](#): Checks
- [**`Argv.HasNumber(name: string, order: LookupOrder): boolean`**](#): Checks if the specified numeric flag was provided.
- [**`Argv.Has(name: string, order: LookupOrder): boolean`**](#): Checks if the specified flag was provided, regardless of its type.

## Lookup order

The `order` parameter in the methods above specifies the order in which
to look for the flag. It can take one of the following values:

- `LookupOrder.GlobalThenLocal`: Look for the flag in global flags first, then in local flags.
- `LookupOrder.LocalThenGlobal`: Look for the flag in local flags first, then in
- `LookupOrder.GlobalOnly`: Look for the flag only in global flags.
- `LookupOrder.LocalOnly`: Look for the flag only in local flags.