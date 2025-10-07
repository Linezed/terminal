/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type { PrefixFunction } from "./type.js";
import FillColorPrefixes from "./preset/colors.js";
import FillTextPrefixes from "./preset/text.js";

const prefixes = new Map<string, PrefixFunction>();
FillColorPrefixes(prefixes);
FillTextPrefixes(prefixes);

export default prefixes;