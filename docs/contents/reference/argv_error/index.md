# ArgvError

The `ArgvError` class represents an error that occurs
when there is an issue parsing command-line arguments.

**API Documentation:**

- [**`ArgvError.Message(): string`**](#): Gets the error message describing the issue.
- [**`ArgvError.Code(): ArgvErrorCode`**](/contents/reference/argv_error_code):
Gets the error code representing the type of error.

**Deprecated members:**
- [**`ArgvError.Data(): string | undefined`**](#): Gets any additional data associated with the error, if available.

> **Note:** The `Data` member is deprecated and will be removed in future versions.
> Use `Message` and `Code` for error details.