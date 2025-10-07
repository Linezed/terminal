/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */


import type Header from "../../interface/config/header.js";
import ISection from "./section.js";

export default class IHeader implements Header {
    header = new ISection();
    desc = new ISection();
}