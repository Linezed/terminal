/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import { test } from "uvu";
import * as assert from "uvu/assert";
import IArgv from "../src/cli/impl/argv/argv";
import app from "./app.test";

test("parses argv", () => {
    let ctx: IArgv = app.Parse(["t", "-h", "value"]);
    assert.is(ctx.Value(), "value");
    assert.is(ctx.Has("help"), true);
});

test.run();
