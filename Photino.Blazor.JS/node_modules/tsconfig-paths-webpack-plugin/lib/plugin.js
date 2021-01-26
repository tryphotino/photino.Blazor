"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const TsconfigPaths = require("tsconfig-paths");
const path = require("path");
const Options = require("./options");
const Logger = require("./logger");
const getInnerRequest = require("enhanced-resolve/lib/getInnerRequest");
class TsconfigPathsPlugin {
    constructor(rawOptions = {}) {
        this.source = "described-resolve";
        this.target = "resolve";
        const options = Options.getOptions(rawOptions);
        this.extensions = options.extensions;
        const colors = new chalk_1.default.constructor({ enabled: options.colors });
        this.log = Logger.makeLogger(options, colors);
        const context = options.context || process.cwd();
        const loadFrom = options.configFile || context;
        const loadResult = TsconfigPaths.loadConfig(loadFrom);
        if (loadResult.resultType === "failed") {
            this.log.logError(`Failed to load tsconfig.json: ${loadResult.message}`);
        }
        else {
            this.log.logInfo(`tsconfig-paths-webpack-plugin: Using config file at ${loadResult.configFileAbsolutePath}`);
            this.baseUrl = options.baseUrl || loadResult.baseUrl;
            this.absoluteBaseUrl = options.baseUrl
                ? path.resolve(options.baseUrl)
                : loadResult.absoluteBaseUrl;
            this.matchPath = TsconfigPaths.createMatchPathAsync(this.absoluteBaseUrl, loadResult.paths, options.mainFields);
        }
    }
    apply(resolver) {
        const { baseUrl } = this;
        if (!baseUrl) {
            // Nothing to do if there is no baseUrl
            this.log.logWarning("tsconfig-paths-webpack-plugin: Found no baseUrl in tsconfig.json, not applying tsconfig-paths-webpack-plugin");
            return;
        }
        // The file system only exists when the plugin is in the resolve context. This means it's also properly placed in the resolve.plugins array.
        // If not, we should warn the user that this plugin should be placed in resolve.plugins and not the plugins array of the root config for example.
        // This should hopefully prevent issues like: https://github.com/dividab/tsconfig-paths-webpack-plugin/issues/9
        if (!resolver.fileSystem) {
            this.log.logWarning("tsconfig-paths-webpack-plugin: No file system found on resolver." +
                " Please make sure you've placed the plugin in the correct part of the configuration." +
                " This plugin is a resolver plugin and should be placed in the resolve part of the Webpack configuration.");
            return;
        }
        // getHook will only exist in Webpack 4, if so we should comply to the Webpack 4 plugin system.
        if (resolver.getHook && typeof resolver.getHook === "function") {
            resolver
                .getHook(this.source)
                .tapAsync({ name: "TsconfigPathsPlugin" }, createPluginCallback(this.matchPath, resolver, this.absoluteBaseUrl, resolver.getHook(this.target), this.extensions));
        }
        else {
            // This is the legacy (Webpack < 4.0.0) way of using the plugin system.
            resolver.plugin(this.source, createPluginLegacy(this.matchPath, resolver, this.absoluteBaseUrl, this.target, this.extensions));
        }
    }
}
exports.TsconfigPathsPlugin = TsconfigPathsPlugin;
function createPluginCallback(matchPath, resolver, absoluteBaseUrl, hook, extensions) {
    const fileExistAsync = createFileExistAsync(resolver.fileSystem);
    const readJsonAsync = createReadJsonAsync(resolver.fileSystem);
    return (request, resolveContext, callback) => {
        const innerRequest = getInnerRequest(resolver, request);
        if (!innerRequest ||
            (innerRequest.startsWith(".") || innerRequest.startsWith(".."))) {
            return callback();
        }
        matchPath(innerRequest, readJsonAsync, fileExistAsync, extensions, (err, foundMatch) => {
            if (err) {
                return callback(err);
            }
            if (!foundMatch) {
                return callback();
            }
            const newRequest = Object.assign({}, request, { request: foundMatch, path: absoluteBaseUrl });
            // Only at this point we are sure we are dealing with the latest Webpack version (>= 4.0.0)
            // So only now can we require the createInnerContext function.
            // (It doesn't exist in legacy versions)
            const createInnerContext = require("enhanced-resolve/lib/createInnerContext");
            return resolver.doResolve(hook, newRequest, `Resolved request '${innerRequest}' to '${foundMatch}' using tsconfig.json paths mapping`, createInnerContext(Object.assign({}, resolveContext)), (err2, result2) => {
                // Pattern taken from:
                // https://github.com/webpack/enhanced-resolve/blob/42ff594140582c3f8f86811f95dea7bf6774a1c8/lib/AliasPlugin.js#L44
                if (err2) {
                    return callback(err2);
                }
                // Don't allow other aliasing or raw request
                if (result2 === undefined) {
                    return callback(null, null);
                }
                callback(null, result2);
            });
        });
    };
}
function createPluginLegacy(matchPath, resolver, absoluteBaseUrl, target, extensions) {
    const fileExistAsync = createFileExistAsync(resolver.fileSystem);
    const readJsonAsync = createReadJsonAsync(resolver.fileSystem);
    return (request, callback) => {
        const innerRequest = getInnerRequest(resolver, request);
        if (!innerRequest ||
            (innerRequest.startsWith(".") || innerRequest.startsWith(".."))) {
            return callback();
        }
        matchPath(innerRequest, readJsonAsync, fileExistAsync, extensions, (err, foundMatch) => {
            if (err) {
                return callback(err);
            }
            if (!foundMatch) {
                return callback();
            }
            const newRequest = Object.assign({}, request, { request: foundMatch, path: absoluteBaseUrl });
            // Only at this point we are sure we are dealing with a legacy Webpack version (< 4.0.0)
            // So only now can we require the createInnerCallback function.
            // (It's already deprecated and might be removed down the line).
            const createInnerCallback = require("enhanced-resolve/lib/createInnerCallback");
            return resolver.doResolve(target, newRequest, `Resolved request '${innerRequest}' to '${foundMatch}' using tsconfig.json paths mapping`, createInnerCallback(function (err2, result2) {
                // Note:
                //  *NOT* using an arrow function here because arguments.length implies we have "this"
                //  That means "this" has to be in the current function scope, and not the scope above.
                //  Pattern taken from:
                //  https://github.com/s-panferov/awesome-typescript-loader/blob/10653beff85f555f1f3b5d4bfd7d21513d0e54a4/src/paths-plugin.ts#L169
                if (arguments.length > 0) {
                    return callback(err2, result2);
                }
                // don't allow other aliasing or raw request
                callback(null, null);
            }, callback));
        });
    };
}
function createReadJsonAsync(filesystem) {
    // tslint:disable-next-line:no-any
    return (path2, callback2) => {
        filesystem.readJson(path2, (err, json) => {
            // If error assume file does not exist
            if (err || !json) {
                callback2();
                return;
            }
            callback2(undefined, json);
        });
    };
}
function createFileExistAsync(filesystem) {
    return (path2, callback2) => {
        filesystem.stat(path2, (err, stats) => {
            // If error assume file does not exist
            if (err) {
                callback2(undefined, false);
                return;
            }
            callback2(undefined, stats ? stats.isFile() : false);
        });
    };
}
