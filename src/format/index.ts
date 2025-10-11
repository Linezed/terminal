/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import FormatOutput from "./format.js";
import type { PrefixFunction } from "./prefix/type.js";
import prefixes from "./prefix/collection.js";
import type { BaseFormatFunction } from "./base/type.js";
import base_fns from "./base/collection.js";
import type { CustomHandlerFunction } from "./custom/type.js";
import custom_prefixes from "./custom/collection.js";

export default class Formatter {
    public static FormatWithProps(
        format: string,
        props: Record<string, any> | null,
        ...args: any[]
    ): string {
        let resp = "";

        // Print each character of the format string
        let arg_idx = 0; // Current argument index
        for (let i = 0; i < format.length; i++) {
            // Get the current character
            let char = format[i];

            // Check if it's a format specifier ("{}")
            if (char === "{") {
                // Format the argument
                let [res, skipped, move_arg] = FormatOutput(format, i, arg_idx, props, args);

                // Write the formatted argument
                resp += res;
                if (move_arg) arg_idx++; // Move to the next argument
                i = skipped; // Skip the processed characters
            } else {
                // Write the character as is
                resp += char;
            }
        }

        return resp;
    }

    public static Format(format: string, ...args: any[]): string {
        return this.FormatWithProps(format, null, ...args);
    }

    public static AddPrefix(name: string, fn: PrefixFunction) {
        // Make sure the prefix doesn't already exist
        if (prefixes.has(name)) {
            throw new Error(`Prefix "${name}" already exists.`);
        }

        // Add the prefix
        prefixes.set(name, fn);
    }

    public static RemovePrefix(name: string) {
        // Make sure the prefix exists
        if (!(prefixes.has(name))) {
            throw new Error(`Prefix "${name}" does not exist.`);
        }

        // Remove the prefix
        prefixes.delete(name);
    }

    public static AddFormat(name: string, fn: BaseFormatFunction) {
        // Make sure the format doesn't already exist
        if (base_fns.has(name)) {
            throw new Error(`Format "${name}" already exists.`);
        }

        // Add the format
        base_fns.set(name, fn);
    }

    public static RemoveFormat(name: string) {
        // Make sure the format exists
        if (!(base_fns.has(name))) {
            throw new Error(`Format "${name}" does not exist.`);
        }

        // Remove the format
        base_fns.delete(name);
    }

    public static AddCustomPrefix(name: string, fn: CustomHandlerFunction) {
        if (custom_prefixes.has(name)) {
            throw new Error(`Custom format "${name}" already exists.`);
        }

        custom_prefixes.set(name, fn);
    }

    public static RemoveCustomPrefix(name: string) {
        if (!(custom_prefixes.has(name))) {
            throw new Error(`Custom format "${name}" does not exist.`);
        }

        custom_prefixes.delete(name);
    }
}
