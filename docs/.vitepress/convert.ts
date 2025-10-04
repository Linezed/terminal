/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import Docs, { Section } from "./docs";
import SortByAfter from "./sort";

export default function ConvertSections(sections: Section[]): Docs[] {
    const sortedSections = SortByAfter(sections);

    return sortedSections.map((section) => ({
        text: section.title,
        items: SortByAfter(section.items).map((page) => ({
            text: page.title,
            link: `/contents/${section.id}/${page.id}`,
        })),
    }));
}
