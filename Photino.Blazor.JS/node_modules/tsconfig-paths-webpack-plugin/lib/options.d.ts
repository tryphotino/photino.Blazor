export declare type LogLevel = "INFO" | "WARN" | "ERROR";
export interface Options {
    readonly configFile: string;
    readonly extensions: ReadonlyArray<string>;
    readonly baseUrl: string;
    readonly silent: boolean;
    readonly logLevel: LogLevel;
    readonly logInfoToStdOut: boolean;
    readonly context: string;
    readonly colors: boolean;
    readonly mainFields: string[];
}
/**
 * Takes raw options from the webpack config,
 * validates them and adds defaults for missing options
 */
export declare function getOptions(rawOptions: {}): Options;
