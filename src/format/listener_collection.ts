/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type { CustomHandlerFunction } from "./custom/type.js";

export class ListenerCollection {
    highest = [] as CustomHandlerFunction[];
    high = [] as CustomHandlerFunction[];
    normal = [] as CustomHandlerFunction[];
    low = [] as CustomHandlerFunction[];
    lowest = [] as CustomHandlerFunction[];
}

export class NamedListenerCollection {
    highest = new Map<string, CustomHandlerFunction>();
    high = new Map<string, CustomHandlerFunction>();
    normal = new Map<string, CustomHandlerFunction>()
    low = new Map<string, CustomHandlerFunction>();
    lowest = new Map<string, CustomHandlerFunction>();
}

export class OrderedNamedListenerCollection {
    pre = new NamedListenerCollection();
    post = new NamedListenerCollection();
}

export default class OrderedListenerCollection {
    pre = new ListenerCollection();
    post = new ListenerCollection();
}