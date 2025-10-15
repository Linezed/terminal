/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import { test } from "uvu";
import * as assert from "uvu/assert";
import IArgv from "../src/cli/impl/argv/argv";
import app from "./app.test";
import LookupOrder from "../src/cli/interface/argv/lookup_order";

test("parses local and global flags", () => {
    let ctx: IArgv = app.Parse(["t", "-h", "value"]);
    let ctx_2: IArgv = app.Parse(["t", "-h", "value", "-h"]);
    assert.is(ctx.Has("help", LookupOrder.LocalOnly), true);
    assert.is(ctx_2.Has("help", LookupOrder.GlobalOnly), true);
    assert.is(ctx_2.Has("help", LookupOrder.LocalOnly), true);
});

test.run();
