/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type { State } from "./state.js";

export type FormatFunction = (pref: string, state: State) => void;