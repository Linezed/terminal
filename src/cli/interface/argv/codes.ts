/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

/// The error codes for argument parsing.
enum ArgvErrorCode {
    TypeMismatch,
    ExpectedValue,
    MissingRequired,
    AlreadyParsedCommand,
    UnknownArgument,
    UnknownFlag,
    InvalidFlag,
    None
}

export default ArgvErrorCode;