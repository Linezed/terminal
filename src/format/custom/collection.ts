/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type { CustomHandlerFunction } from "./type.js";
import CustomHandlerPriority from "./priority.js";
import ListenerCollection from "../listener_collection.js";

const custom_prefixes = {
    pre: new ListenerCollection(),
    post: new ListenerCollection(),
};

function _SearchCustomPrefix(
    prefix: string,
    obj: Map<string, CustomHandlerPriority>,
    priority: CustomHandlerPriority
) {
    if (obj.has(prefix)) {
        return [obj.get(prefix), priority] as
            [CustomHandlerFunction, CustomHandlerPriority];
    }
}

export function SearchCustomPrefix(
    prefix: string,
    priority?: CustomHandlerPriority
): [CustomHandlerFunction, CustomHandlerPriority] | undefined {
    // Search in specified priority level first
    if (priority) {
        const level = custom_prefixes[priority];
        if (level.has(prefix)) {
            return [level.get(prefix), priority];
        }

        // Fallback to searching all levels if not
        // found in specified priority
    }

    let highest = _SearchCustomPrefix(
        prefix,
        custom_prefixes.highest,
        CustomHandlerPriority.Highest
    );

    if (highest) return highest;

    let high = _SearchCustomPrefix(
        prefix,
        custom_prefixes.high,
        CustomHandlerPriority.High
    );

    if (high) return high;

    let medium = _SearchCustomPrefix(
        prefix,
        custom_prefixes.medium,
        CustomHandlerPriority.Normal
    );

    if (medium) return medium;

    let low = _SearchCustomPrefix(
        prefix,
        custom_prefixes.low,
        CustomHandlerPriority.Low
    );

    if (low) return low;

    let lowest = _SearchCustomPrefix(
        prefix,
        custom_prefixes.lowest,
        CustomHandlerPriority.Lowest
    );

    if (lowest) return lowest;
}

export default custom_prefixes;