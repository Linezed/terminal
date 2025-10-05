/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import path from "path";
import { fileURLToPath } from "node:url";
import GetSections from "./populate";
import ConvertSections from "./convert";

// Get the current dir
const current_dir = fileURLToPath(import.meta.url);
const contents_dir = path.join(current_dir, "..", "..", "contents");

// Save the docs in an array to be used by VitePress
const sections = GetSections(contents_dir);
const docs = ConvertSections(sections);

export default {
    ignoreDeadLinks: true,
    title: "Linezed Terminal",
    description: "Terminal framework for building command-line applications in TypeScript and Node.js",
    themeConfig: {
        nav: [
            { text: "Home", link: "/" },
            { text: "Guide", link: "/contents/basic/welcome" }
        ],
        sidebar: {
            "/contents/": docs
        }
    }
}