import Terminal, { Types } from "../src";
import Argv from "../src/cli/interface/argv/argv";

let app = Terminal.App("test-app");

app.Command("test-command")
    .Shortcut("t")
    .Type(Types.String)
    .Description("test command")
    .Handler((ctx: Argv) => {});

export default app;
