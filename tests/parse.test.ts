/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import { test } from "uvu";
import * as assert from "uvu/assert";
import Terminal from "../src";

test("parses argv", () => {
    let app = Terminal.App("test-app");
    let cmd = app.Command("test");
    cmd.Shortcut("t");
    cmd.Description("test command");
    cmd.Handler((ctx: any) => {
        assert.is(ctx.Value(), "value");
    });

    app.Parse(["t", "value"]);
});

test.run();
