/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type Section from "../../interface/config/section.js";

export default class ISection implements Section {
    format: string = "";
    args: string[] = [];
}