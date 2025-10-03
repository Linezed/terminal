/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

/// The error codes for argument parsing.
enum ArgvErrorCode {
    TYPE_MISMATCH,
    MISSING_REQUIRED,
    UNKNOWN_ARGUMENT,
    UNKNOWN_FLAG,
    NONE
}

export default ArgvErrorCode;