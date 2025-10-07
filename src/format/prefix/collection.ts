/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type { PrefixFunction } from "./type.js";
import FillColorPrefixes from "./preset/colors.js";
import FillTextPrefixes from "./preset/text.js";
import FillDatePrefixes from "./preset/date.js";

const prefixes = new Map<string, PrefixFunction>();
FillColorPrefixes(prefixes);
FillTextPrefixes(prefixes);
FillDatePrefixes(prefixes);

export default prefixes;