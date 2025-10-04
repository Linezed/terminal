/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import ArgvErrorCode from "../../interface/argv/codes.js";

export default class ArgvException extends Error {
    code: ArgvErrorCode = ArgvErrorCode.None;

    constructor(code: ArgvErrorCode = ArgvErrorCode.None, message: string) {
        super(message);
        this.code = code;
        this.name = "ArgvException";
    }
}
