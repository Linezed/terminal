import { FormatValue } from "./base.js";

export default function PropFormat(
    props: Record<string, any>,
    specifier: string
) {
    // Split the specifier by dots
    let parts = specifier.split(".");

    // Traverse the properties
    let current: any = props;

    for (let part of parts) {
        if (part in current) {
            current = current[part];
        } else {
            throw new Error(`Property not found: ${part} in {${specifier}}`);
        }
    }

    // Return the found property as string
    return FormatValue(current);
}