/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import ArgvErrorCode from "../../interface/argv/codes.js";
import type ArgvError from "../../interface/argv/error.js";

export default class IArgvError implements ArgvError {
    /// The error code
    code: ArgvErrorCode = ArgvErrorCode.NONE;

    /// The error message
    message: string = "";

    /// Additional details about the error
    details?: string | undefined;

    /// Getter for the error code
    Code(): ArgvErrorCode {
        return this.code;
    }

    /// Getter for the error message
    Message(): string {
        return this.message;
    }

    /// Getter for additional details about the error
    Data(): string | undefined {
        return this.details;
    }
}