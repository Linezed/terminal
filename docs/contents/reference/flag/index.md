# Flag

The `Flag` class represents a command-line flag that can be associated
with commands or applications. Flags are used to modify the behavior of
commands or to provide additional options.

**Implements**
- [**`Nameable`**](/contents/reference/nameable/)
- [**`Trimmable`**](/contents/reference/trimmable/)
- [**`Typable`**](/contents/reference/typable/)

**API Documentation:**

- [**`Flag.Name(): string`**](#): Gets the name of the flag.
- [**`Flag.Description(desc: string): Flag`**](#): Sets the description for the flag.
- [**`Flag.Description(): string`**](#): Gets the description
- [**`Flag.Shortcut(): string`**](#): Gets the shortcut of the flag.
- [**`Flag.Shortcut(shortcut: string): Flag`**](#): Sets the shortcut for the flag.
- [**`Flag.Type(): string`**](#): Gets the type of the flag.
- [**`Flag.Type(type: string): Flag`**](#): Sets the type for the flag.
- [**`Flag.Default(): any`**](#): Gets the default value of the flag.
- [**`Flag.Default(value: any): Flag`**](#): Sets the default
- [**`Flag.Required(): boolean`**](#): Checks if the flag is required.
- [**`Flag.Required(required: boolean): Flag`**](#): Sets whether the