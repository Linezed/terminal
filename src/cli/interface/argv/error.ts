/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

/// A parsing error.
import type ArgvErrorCode from "./codes.js";

export default interface ArgvError {
    /// The error code
    code: ArgvErrorCode;
    /// The error message
    message: string;
    /// Additional details about the error
    details?: string | undefined;

    /// Getter for the error code
    Code(): ArgvErrorCode;

    /// Getter for the error message
    Message(): string;

    /// Getter for additional details about the error
    Data(): string | undefined;
}
