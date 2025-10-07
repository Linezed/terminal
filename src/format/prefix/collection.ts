/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type { PrefixFunction } from "./type.js";
import FillPrefixColors from "./preset/colors.js";

const prefixes = new Map<string, PrefixFunction>();
FillPrefixColors(prefixes);

export default prefixes;