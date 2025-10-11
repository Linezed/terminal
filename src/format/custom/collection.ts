/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type { CustomHandlerFunction } from "./type.js";
import CustomHandlerPriority from "./priority.js";
import {
    OrderedNamedListenerCollection,
} from "../listener_collection.js";
import CustomHandlerOrder from "./order.js";

const custom_prefixes = new OrderedNamedListenerCollection();

function _SearchCustomPrefix(
    prefix: string,
    obj: OrderedNamedListenerCollection,
    priority: CustomHandlerPriority
) {
    const levels = [obj.pre, obj.post];
    let is_pre = false;

    for (const level of levels) {
        let map: Map<string, CustomHandlerFunction[]>;

        switch (priority) {
            case CustomHandlerPriority.Highest:
                map = level.highest;
                break;
            case CustomHandlerPriority.High:
                map = level.high;
                break;
            case CustomHandlerPriority.Normal:
                map = level.normal;
                break;
            case CustomHandlerPriority.Low:
                map = level.low;
                break;
            case CustomHandlerPriority.Lowest:
                map = level.lowest;
                break;
            default:
                throw new Error("Invalid priority level.");
        }

        if (map.has(prefix)) {
            return [
                map.get(prefix),
                priority,
                is_pre ? CustomHandlerOrder.Pre :
                    CustomHandlerOrder.Post
            ];
        }

        is_pre = false; // Switch to post level for next iteration
    }
}

export function SearchCustomPrefix(
    prefix: string,
    priority?: CustomHandlerPriority
): [CustomHandlerFunction, CustomHandlerPriority, CustomHandlerOrder]
    | undefined {
    // Search in specified priority level first
    if (priority) {
        let res = _SearchCustomPrefix(
            prefix,
            custom_prefixes,
            priority
        );

        if (res) return res;
        // Fallback to searching all levels if not
        // found in specified priority
    }

    let highest = _SearchCustomPrefix(
        prefix,
        custom_prefixes,
        CustomHandlerPriority.Highest
    );

    if (highest) return highest;

    let high = _SearchCustomPrefix(
        prefix,
        custom_prefixes,
        CustomHandlerPriority.High
    );

    if (high) return high;

    let medium = _SearchCustomPrefix(
        prefix,
        custom_prefixes,
        CustomHandlerPriority.Normal
    );

    if (medium) return medium;

    let low = _SearchCustomPrefix(
        prefix,
        custom_prefixes,
        CustomHandlerPriority.Low
    );

    if (low) return low;

    let lowest = _SearchCustomPrefix(
        prefix,
        custom_prefixes,
        CustomHandlerPriority.Lowest
    );

    if (lowest) return lowest;
}

export default custom_prefixes;