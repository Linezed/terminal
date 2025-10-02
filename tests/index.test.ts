import { test } from "uvu";
import * as assert from "uvu/assert";
import { sum } from "../src"; // note the `.js` for ESM

test("adds numbers", () => {
    assert.is(sum(2, 3), 5);
});

test.run();
