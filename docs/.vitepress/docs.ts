/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import Metadata from "./metadata";

export default interface Docs {
    text: string;
    items: Array<{
        text: string;
        link: string;
    }>;
}

export interface Page extends Metadata {
    link: string;
}

export interface Section extends Metadata {
    items: Array<Page>;
}