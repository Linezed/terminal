/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import FormatValue from "../value.js";

export default function ConvertProp(
    prop: string,
    props: Record<string, any> | null
) {
    if (!props) {
        throw new Error(`No properties available to access: ${prop}`); // No props available
    }

    // Split prop by dot
    const parts = prop.split(".");

    // Traverse props by parts
    let current: any = props;
    for (const part of parts) {
        if (current && typeof current === "object" && part in current) {
            current = current[part];
        } else {
            throw new Error(`Property not found: ${prop}`); // Property not found
        }
    }

    // Return the final value
    return current;
}