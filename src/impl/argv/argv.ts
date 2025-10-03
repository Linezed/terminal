/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type Argv from "../../interface/argv/argv.js";
import type ArgvError from "../../interface/argv/error.js";
import type App from "../../interface/app.js";

export default class IArgv implements Argv {
    Error: ArgvError | undefined;

    constructor(app: App, args: string[]) {
    }

}