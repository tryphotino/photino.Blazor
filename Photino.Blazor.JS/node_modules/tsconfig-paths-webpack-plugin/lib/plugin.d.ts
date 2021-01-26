/// <reference types="node" />
import * as TsconfigPaths from "tsconfig-paths";
import * as Options from "./options";
import * as Logger from "./logger";
import { Stats } from "fs";
export interface ResolverPlugin {
    readonly apply: (resolver: Resolver) => void;
}
export interface Resolver {
    readonly apply: (plugin: ResolverPlugin) => void;
    readonly plugin: (source: string, cb: ResolverCallbackLegacy) => void;
    readonly doResolve: doResolveLegacy | doResolve;
    readonly join: (relativePath: string, innerRequest: Request) => Request;
    readonly fileSystem: ResolverFileSystem;
    readonly getHook: (hook: string) => Tapable;
}
export declare type doResolveLegacy = (target: string, req: Request, desc: string, callback: Callback) => void;
export declare type doResolve = (hook: Tapable, req: Request, message: string, resolveContext: ResolveContext, callback: Callback) => void;
export interface ResolverFileSystem {
    readonly stat: (path: string, callback: (err: Error, stats: Stats) => void) => void;
    readonly readdir: (path: string, callback: (err: Error, files: ReadonlyArray<string>) => void) => void;
    readonly readFile: (path: string, callback: (err: Error, data: {}) => void) => void;
    readonly readlink: (path: string, callback: (err: Error, linkString: string) => void) => void;
    readonly readJson: (path: string, callback: (err: Error, json: {}) => void) => void;
    readonly statSync: (path: string) => Stats;
    readonly readdirSync: (path: string) => ReadonlyArray<string>;
    readonly readFileSync: (path: string) => {};
    readonly readlinkSync: (path: string) => string;
    readonly readJsonSync: (path: string) => {};
}
export interface ResolveContext {
    log?: string;
    stack?: string;
    missing?: string;
}
export interface Tapable {
    readonly tapAsync: (options: TapableOptions, callback: ResolverCallback) => Promise<void>;
}
export interface TapableOptions {
    readonly name: string;
}
export declare type ResolverCallbackLegacy = (request: Request, callback: Callback) => void;
export declare type ResolverCallback = (request: Request, resolveContext: ResolveContext, callback: Callback) => void;
export interface Request {
    readonly request?: Request | string;
    readonly relativePath: string;
    readonly path: string;
    readonly context: {
        readonly issuer: string;
    };
}
export interface Callback {
    (err?: Error, result?: string): void;
    log?: string;
    stack?: string;
    missing?: string;
}
export declare class TsconfigPathsPlugin implements ResolverPlugin {
    source: string;
    target: string;
    log: Logger.Logger;
    baseUrl: string;
    absoluteBaseUrl: string;
    extensions: ReadonlyArray<string>;
    matchPath: TsconfigPaths.MatchPathAsync;
    constructor(rawOptions?: Partial<Options.Options>);
    apply(resolver: Resolver): void;
}
