/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type { State } from "../../state.js";

export default function FormatPadding(
    pref: string,
    state: State
) {
    // Get the first character of the prefix
    const char = pref.charAt(0);

    // Ignore the first character
    pref = pref.slice(1);

    // Parse the number after the character
    const num = parseInt(pref, 10);

    // If the number is not a valid number, throw an error
    if (isNaN(num)) {
        throw new Error(`Invalid padding number: ${pref}`);
    }

    // See if the character is ">" or "<"
    if (char === ">") {
        // Right padding
        state.text.padding.right = num;
    } else if (char === "<") {
        // Left padding
        state.text.padding.left = num;
    } else {
        throw new Error(`Invalid padding character: ${char}`);
    }
}