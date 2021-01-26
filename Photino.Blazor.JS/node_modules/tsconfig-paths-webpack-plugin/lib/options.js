"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validOptions = [
    "configFile",
    "extensions",
    "baseUrl",
    "silent",
    "logLevel",
    "logInfoToStdOut",
    "context",
    "mainFields"
];
/**
 * Takes raw options from the webpack config,
 * validates them and adds defaults for missing options
 */
function getOptions(rawOptions) {
    validateOptions(rawOptions);
    const options = makeOptions(rawOptions);
    return options;
}
exports.getOptions = getOptions;
/**
 * Validate the supplied loader options.
 * At present this validates the option names only; in future we may look at validating the values too
 * @param rawOptions
 */
function validateOptions(rawOptions) {
    const loaderOptionKeys = Object.keys(rawOptions);
    for (let i = 0; i < loaderOptionKeys.length; i++) {
        const option = loaderOptionKeys[i];
        const isUnexpectedOption = validOptions.indexOf(option) === -1;
        if (isUnexpectedOption) {
            throw new Error(`tsconfig-paths-webpack-plugin was supplied with an unexpected loader option: ${option}
Please take a look at the options you are supplying; the following are valid options:
${validOptions.join(" / ")}
`);
        }
    }
}
function makeOptions(rawOptions) {
    const options = Object.assign({}, {
        configFile: "tsconfig.json",
        extensions: [".ts", ".tsx"],
        baseUrl: undefined,
        silent: false,
        logLevel: "WARN",
        logInfoToStdOut: false,
        context: undefined,
        colors: true,
        mainFields: ["main"]
    }, rawOptions);
    const options2 = Object.assign({}, options, { logLevel: options.logLevel.toUpperCase() });
    return options2;
}
