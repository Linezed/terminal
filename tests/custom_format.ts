/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

import { test } from "uvu";
import * as assert from "uvu/assert";
import { Colors, Formatter } from "../src";
import CustomHandlerPriority from "../src/format/custom/priority";
import CustomHandlerOrder from "../src/format/custom/order";

test("honors custom formatters", () => {
    Formatter.AddCustomPrefix("MyFormat", (obj, state) => {
        obj = obj.toString().toUpperCase();
        return obj;
    }, CustomHandlerPriority.Highest, CustomHandlerOrder.Post);

    let fmt = Formatter.Format("Hello, {:Red | :!MyFormat}", "Asd");
    assert.is(fmt, "Hello, " + Colors.Red + "ASD" + Colors.Reset);

    fmt = Formatter.FormatWithProps(
        "Hello, {:Red | :!MyFormat | my.name}",
        {
            my: {
                name: "John Doe"
            }
        }
    );

    assert.is(fmt, "Hello, " + Colors.Red + "JOHN DOE" + Colors.Reset);

    fmt = Formatter.Format(
        "Hello, {:Red | :!MyFormat | 'John Doe'}",
        "!"
    );

    assert.is(fmt, "Hello, " + Colors.Red + "JOHN DOE!" + Colors.Reset);
});

test.run();
