/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type { BaseFormatFunction } from "./type.js";
import FillJSONPrefixes from "./preset/json.js";
import FillPrecisionPrefixes from "./preset/precision.js";
import FillSlicePrefixes from "./preset/slice.js";

const prefixes = new Map<string, BaseFormatFunction>();
FillJSONPrefixes(prefixes);
FillPrecisionPrefixes(prefixes);
FillSlicePrefixes(prefixes);

export default prefixes;