/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type { CustomHandlerFunction } from "./custom/type.js";

export class ListenerCollection {
    highest = [] as CustomHandlerFunction[];
    high = [] as CustomHandlerFunction[];
    medium = [] as CustomHandlerFunction[];
    low = [] as CustomHandlerFunction[];
    lowest = [] as CustomHandlerFunction[];
}

export default class OrderedListenerCollection {
    pre = new ListenerCollection();
    post = new ListenerCollection();
}