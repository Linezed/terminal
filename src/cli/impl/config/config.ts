/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type Config from "../../interface/config/config.js";
import ISection from "./section.js";
import IList from "./list.js";
import IHeader from "./header.js";

export default class IConfig implements Config {
    auto_help: boolean = true;
    auto_version: boolean = true;

    format = {
        name: new ISection(),

        usage: {
            format: new ISection(),
            sample: new ISection()
        },

        description: new ISection(),
        error: new IHeader(),

        command: new IList(),
        flag: new IList()
    };

}