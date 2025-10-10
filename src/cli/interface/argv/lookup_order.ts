/*
 @linezed/terminal
 A simple yet powerful terminal framework for building command-line applications in TypeScript.
 License: MIT
 */

enum LookupOrder {
    LocalThenGlobal,
    GlobalThenLocal,
    LocalOnly,
    GlobalOnly
}

export default LookupOrder;