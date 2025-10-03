/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import * as process from "node:process";
import IApp from "./impl/app.js";

export default class Terminal {
    /// Get the command-line arguments passed to the Node.js process.
    public static Args(): string[] {
        return process.argv;
    }

    /// Create a new terminal application instance.
    public static App(name: string): IApp {
        return new IApp(name);
    }
}