/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "node:url";

// Get the current dir
const current_dir = fileURLToPath(import.meta.url);
const contents_dir = path.join(current_dir, "..", "..", "contents");

// Read all files in the contents directory
const files = fs.readdirSync(contents_dir);

// Save the docs in an array to be used by VitePress
const docs = [] as Array<{
    text: string;
    link: string;
}>;

// Populate the docs array
files.forEach((file) => {
    if (file.endsWith(".md")) return; // Ignore markdown files

    // Get the full path
    const full_path = path.join(contents_dir, file);

    // Read the title
    const title = fs.readFileSync(
        path.join(full_path, "title.txt"),
        "utf-8"
    ).trim();

    // Get the contents path
    const contents_path = `/contents/${file}`;

    // Add to the docs array
    docs.push({
        text: title,
        link: contents_path
    });
});

export default {
    title: "Linezed Terminal",
    description: "Terminal framework for building command-line applications in TypeScript and Node.js",
    themeConfig: {
        nav: [
            { text: "Home", link: "/" },
            { text: "Guide", link: "/contents/" }
        ],
        sidebar: {
            "/contents/": [
                {
                    text: "Guide",
                    items: [
                        { text: "Getting Started", link: "/contents/" },
                        ...docs
                    ]
                }
            ]
        }
    }
}