/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type Argv from "../../interface/argv/argv.js";
import type ArgvError from "../../interface/argv/error.js";

export default class IArgv implements Argv {
    Error: ArgvError | undefined;
}