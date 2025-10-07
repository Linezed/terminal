/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import * as Colors from "../colors/colors.js";

type _ColorFunction = (val: string) => string;

function _FormatColor(val: string, color: string): string {
    return `${color}${val}${Colors.Reset}`;
}

// Supported colors for formatting
const ColorKeys: { [key: string]: _ColorFunction } = {};

// Create an isolated scope to populate colors
{
    // Get the base colors from the Colors module
    const base_colors = Object.keys(Colors).filter(
        (c) => typeof (Colors as any)[c] === "string"
    );

    // Populate the colors object with functions
    base_colors.forEach((color) => {
        // Base colors
        (ColorKeys as any)[color] = (val: string) =>
            _FormatColor(val, (Colors as any)[color]);

        // Bright colors
        (ColorKeys as any)[`Bright.${color}`] = (val: string) =>
            _FormatColor(val, (Colors.Bright as any)[color]);

        // Dim colors
        (ColorKeys as any)[`Dim.${color}`] = (val: string) =>
            _FormatColor(val, (Colors.Dim as any)[color]);

        // Dim bright colors
        (ColorKeys as any)[`Dim.Bright.${color}`] = (val: string) =>
            _FormatColor(val, (Colors.Dim.Bright as any)[color]);

        // Dim bold colors
        (ColorKeys as any)[`Dim.Bold.${color}`] = (val: string) =>
            _FormatColor(val, (Colors.Dim.Bold as any)[color]);

        // Bold colors
        (ColorKeys as any)[`Bold.${color}`] = (val: string) =>
            _FormatColor(val, (Colors.Bold as any)[color]);

        // Bold bright colors
        (ColorKeys as any)[`Bold.Bright.${color}`] = (val: string) =>
            _FormatColor(val, (Colors.Bold.Bright as any)[color]);

        // Backgrounds
        (ColorKeys as any)[`Bg.${color}`] = (val: string) =>
            _FormatColor(val, (Colors.Bg as any)[color]);

        // Bright backgrounds
        (ColorKeys as any)[`Bg.Bright.${color}`] = (val: string) =>
            _FormatColor(val, (Colors.Bg.Bright as any)[color]);

        // Dim backgrounds
        (ColorKeys as any)[`Bg.Dim.${color}`] = (val: string) =>
            _FormatColor(val, (Colors.Bg.Dim as any)[color]);

        // Dim bright backgrounds
        (ColorKeys as any)[`Bg.Dim.Bright.${color}`] = (val: string) =>
            _FormatColor(val, (Colors.Bg.Dim.Bright as any)[color]);

        // Dim bold backgrounds
        (ColorKeys as any)[`Bg.Dim.Bold.${color}`] = (val: string) =>
            _FormatColor(val, (Colors.Bg.Dim.Bold as any)[color]);

        // Bold backgrounds
        (ColorKeys as any)[`Bg.Bold.${color}`] = (val: string) =>
            _FormatColor(val, (Colors.Bg.Bold as any)[color]);

        // Bold bright backgrounds
        (ColorKeys as any)[`Bg.Bold.Bright.${color}`] = (val: string) =>
            _FormatColor(val, (Colors.Bg.Bold.Bright as any)[color]);
    });
}

export default ColorKeys;