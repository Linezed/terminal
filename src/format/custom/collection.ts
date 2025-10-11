/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type { CustomHandlerFunction } from "./type.js";

const custom_prefixes = new Map<string, CustomHandlerFunction>();

export default custom_prefixes;