/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import { test } from "uvu";
import * as assert from "uvu/assert";
import app from "./app.test";

test("registers an app", () => {
    assert.is(app.Name(), "test-app");
});

test("registers a command", () => {
    assert.is(app.Commands().has("test-command"), true);
    assert.is(app.Commands().has("t"), true);
});

test("registers a flag", () => {
    assert.is(app.Command("test-command").Flags().has("help"), true);
    assert.is(app.Command("test-command").Flags().has("h"), true);
});

test.run();
