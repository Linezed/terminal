/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type { BaseFormatFunction } from "./type.js";
import FillJSONPrefixes from "./preset/json.js";
import FillPrecisionPrefixes from "./preset/precision.js";
import FillSlicePrefixes from "./preset/slice.js";
import FillBooleanPrefixes from "./preset/bool.js";

const base_fns = new Map<string, BaseFormatFunction>();
FillJSONPrefixes(base_fns);
FillPrecisionPrefixes(base_fns);
FillSlicePrefixes(base_fns);
FillBooleanPrefixes(base_fns);

export default base_fns;