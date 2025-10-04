/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import fs from "fs";
import path from "path";
import { ReadMetadata } from "./metadata";
import { Section } from "./docs";
import * as Constants from "./constants";

export default function GetSections(contents_dir: string): Array<Section> {
    const files = fs.readdirSync(contents_dir)
    const sections = [] as Array<Section>;

    // Iterate over each file in the contents directory
    files.forEach((file) => {
        // Get the full path
        const section_path = path.join(contents_dir, file);

        // Get the section metadata
        let section_metadata = ReadMetadata(section_path);

        // Read all files in the section directory
        const section_files = fs.readdirSync(section_path)
            .filter(file => file != Constants.metadata_name);

        // Populate the items array
        const items = section_files.map(f => {
            const item_path = path.join(section_path, f);
            const item_md = ReadMetadata(item_path);
            const item_link = `/contents/${file}/${f}`;

            return {
                title: item_md.title,
                link: item_link,
                after: item_md.after,
                id: f
            };
        });

        // Add the section to the sections array
        sections.push({
            title: section_metadata.title,
            after: section_metadata.after,
            items: items,
            id: file
        });
    });

    return sections;
}