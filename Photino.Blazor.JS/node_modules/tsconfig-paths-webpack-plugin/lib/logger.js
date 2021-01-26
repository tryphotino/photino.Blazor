"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["INFO"] = 1] = "INFO";
    LogLevel[LogLevel["WARN"] = 2] = "WARN";
    LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
})(LogLevel || (LogLevel = {}));
const stderrConsole = new console_1.Console(process.stderr);
const stdoutConsole = new console_1.Console(process.stdout);
const doNothingLogger = (_message) => {
    /* Do nothing */
};
const makeLoggerFunc = (options) => options.silent
    ?
        (_whereToLog, _message) => {
            /* Do nothing */
        }
    :
        (whereToLog, message) => console.log.call(whereToLog, message);
const makeExternalLogger = (loaderOptions, logger) => (message) => logger(loaderOptions.logInfoToStdOut ? stdoutConsole : stderrConsole, message);
const makeLogInfo = (options, logger, green) => LogLevel[options.logLevel] <= LogLevel.INFO
    ? (message) => logger(options.logInfoToStdOut ? stdoutConsole : stderrConsole, green(message))
    : doNothingLogger;
const makeLogError = (options, logger, red) => LogLevel[options.logLevel] <= LogLevel.ERROR
    ? (message) => logger(stderrConsole, red(message))
    : doNothingLogger;
const makeLogWarning = (options, logger, yellow) => LogLevel[options.logLevel] <= LogLevel.WARN
    ? (message) => logger(stderrConsole, yellow(message))
    : doNothingLogger;
function makeLogger(options, colors) {
    const logger = makeLoggerFunc(options);
    return {
        log: makeExternalLogger(options, logger),
        logInfo: makeLogInfo(options, logger, colors.green),
        logWarning: makeLogWarning(options, logger, colors.yellow),
        logError: makeLogError(options, logger, colors.red)
    };
}
exports.makeLogger = makeLogger;
