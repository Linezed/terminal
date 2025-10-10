/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import { test } from "uvu";
import * as assert from "uvu/assert";
import IArgv from "../src/cli/impl/argv/argv";
import app from "./app.test";
import { Formatter } from "../src";

test("formats text", () => {
    let str = Formatter.Format("Hello, {}", "world!");
    assert.is(str, "Hello, world!");

    str = Formatter.Format("Number: {}, String: {}, Bool: {}", 42, "test", true);
    assert.is(str, "Number: 42, String: test, Bool: true");

    str = Formatter.Format("No placeholders here.");
    assert.is(str, "No placeholders here.");

    str = Formatter.FormatWithProps(
        "Hello, {curr.name}",
        {
            curr: {
                name: "world!"
            }
        }
    );
    assert.is(str, "Hello, world!");

    str = Formatter.FormatWithProps(
        "Hello, {:Upper | curr.name?}",
        {}
    );
    assert.is(str, "Hello, ");
});

test.run();
