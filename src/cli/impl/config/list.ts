/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import type List from "../../interface/config/list.js";
import ISection from "./section.js";

export default class IList implements List {
    header = new ISection();

    item = {
        header: new ISection(),
        desc: new ISection()
    };
}