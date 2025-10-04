/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import fs from "fs";
import path from "path";
import * as Constants from "./constants";

export default interface Metadata {
    id: string;
    title: string;
    after?: string;
}

export function ReadMetadata(p: string): Metadata {
    return JSON.parse(
        fs.readFileSync(
            path.join(p, Constants.metadata_name),
            "utf-8"
        ).trim()
    ) as Metadata;
}