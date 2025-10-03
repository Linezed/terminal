/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import { test } from "uvu";
import * as assert from "uvu/assert";
import Terminal from "../src";

test("registers an app", () => {
    let app = Terminal.App("test-app");
    assert.is(app.Name(), "test-app");
});

test("registers a command", () => {
    let app = Terminal.App("test-app");
    let cmd = app.Command("test-command");
    cmd.Shortcut("t");
    assert.is(app.Commands().has("test-command"), true);
    assert.is(app.Commands().has("t"), true);
});

test.run();
