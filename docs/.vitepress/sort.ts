/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import Metadata from "./metadata";

export default function SortByAfter<T extends Metadata>(items: T[]): T[] {
    // adjacency list
    const after_map = new Map<string | null, T[]>();

    for (const item of items) {
        const key = item.after ?? null;
        if (!after_map.has(key)) after_map.set(key, []);
        after_map.get(key)!.push(item);
    }

    // sort groups alphabetically
    for (const [_, arr] of after_map) {
        arr.sort((a, b) => a.title.localeCompare(b.title));
    }

    const result: T[] = [];

    function visit(id: string | null) {
        if (!after_map.has(id)) return;
        for (const next of after_map.get(id)!) {
            result.push(next);
            visit(next.id); // place things that come after it
        }
    }

    visit(null); // start with roots
    return result;
}