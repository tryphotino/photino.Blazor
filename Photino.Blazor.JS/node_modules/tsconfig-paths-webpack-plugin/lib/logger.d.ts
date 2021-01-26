import { Options } from "./options";
import { Chalk } from "chalk";
export declare type LoggerFunc = (message: string) => void;
export interface Logger {
    log: LoggerFunc;
    logInfo: LoggerFunc;
    logWarning: LoggerFunc;
    logError: LoggerFunc;
}
export declare function makeLogger(options: Options, colors: Chalk): Logger;
