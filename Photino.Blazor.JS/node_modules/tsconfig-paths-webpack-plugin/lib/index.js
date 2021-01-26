"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var plugin_1 = require("./plugin");
exports.TsconfigPathsPlugin = plugin_1.TsconfigPathsPlugin;
const plugin_2 = require("./plugin");
// tslint:disable-next-line:no-default-export
exports.default = plugin_2.TsconfigPathsPlugin;
// This is to make it importable in all these ways
// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
// import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
// import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
const theClass = require("./plugin").TsconfigPathsPlugin;
theClass.TsconfigPathsPlugin = plugin_2.TsconfigPathsPlugin;
theClass.default = plugin_2.TsconfigPathsPlugin;
module.exports = theClass;
