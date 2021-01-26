/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Boot.Desktop.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@dotnet/jsinterop/dist/Microsoft.JSInterop.js":
/*!********************************************************************!*\
  !*** ./node_modules/@dotnet/jsinterop/dist/Microsoft.JSInterop.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// This is a single-file self-contained module to avoid the need for a Webpack build
var DotNet;
(function (DotNet) {
    window.DotNet = DotNet; // Ensure reachable from anywhere
    var jsonRevivers = [];
    var pendingAsyncCalls = {};
    var cachedJSFunctions = {};
    var nextAsyncCallId = 1; // Start at 1 because zero signals "no response needed"
    var dotNetDispatcher = null;
    /**
     * Sets the specified .NET call dispatcher as the current instance so that it will be used
     * for future invocations.
     *
     * @param dispatcher An object that can dispatch calls from JavaScript to a .NET runtime.
     */
    function attachDispatcher(dispatcher) {
        dotNetDispatcher = dispatcher;
    }
    DotNet.attachDispatcher = attachDispatcher;
    /**
     * Adds a JSON reviver callback that will be used when parsing arguments received from .NET.
     * @param reviver The reviver to add.
     */
    function attachReviver(reviver) {
        jsonRevivers.push(reviver);
    }
    DotNet.attachReviver = attachReviver;
    /**
     * Invokes the specified .NET public method synchronously. Not all hosting scenarios support
     * synchronous invocation, so if possible use invokeMethodAsync instead.
     *
     * @param assemblyName The short name (without key/version or .dll extension) of the .NET assembly containing the method.
     * @param methodIdentifier The identifier of the method to invoke. The method must have a [JSInvokable] attribute specifying this identifier.
     * @param args Arguments to pass to the method, each of which must be JSON-serializable.
     * @returns The result of the operation.
     */
    function invokeMethod(assemblyName, methodIdentifier) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return invokePossibleInstanceMethod(assemblyName, methodIdentifier, null, args);
    }
    DotNet.invokeMethod = invokeMethod;
    /**
     * Invokes the specified .NET public method asynchronously.
     *
     * @param assemblyName The short name (without key/version or .dll extension) of the .NET assembly containing the method.
     * @param methodIdentifier The identifier of the method to invoke. The method must have a [JSInvokable] attribute specifying this identifier.
     * @param args Arguments to pass to the method, each of which must be JSON-serializable.
     * @returns A promise representing the result of the operation.
     */
    function invokeMethodAsync(assemblyName, methodIdentifier) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return invokePossibleInstanceMethodAsync(assemblyName, methodIdentifier, null, args);
    }
    DotNet.invokeMethodAsync = invokeMethodAsync;
    function invokePossibleInstanceMethod(assemblyName, methodIdentifier, dotNetObjectId, args) {
        var dispatcher = getRequiredDispatcher();
        if (dispatcher.invokeDotNetFromJS) {
            var argsJson = JSON.stringify(args, argReplacer);
            var resultJson = dispatcher.invokeDotNetFromJS(assemblyName, methodIdentifier, dotNetObjectId, argsJson);
            return resultJson ? parseJsonWithRevivers(resultJson) : null;
        }
        else {
            throw new Error('The current dispatcher does not support synchronous calls from JS to .NET. Use invokeMethodAsync instead.');
        }
    }
    function invokePossibleInstanceMethodAsync(assemblyName, methodIdentifier, dotNetObjectId, args) {
        if (assemblyName && dotNetObjectId) {
            throw new Error("For instance method calls, assemblyName should be null. Received '" + assemblyName + "'.");
        }
        var asyncCallId = nextAsyncCallId++;
        var resultPromise = new Promise(function (resolve, reject) {
            pendingAsyncCalls[asyncCallId] = { resolve: resolve, reject: reject };
        });
        try {
            var argsJson = JSON.stringify(args, argReplacer);
            getRequiredDispatcher().beginInvokeDotNetFromJS(asyncCallId, assemblyName, methodIdentifier, dotNetObjectId, argsJson);
        }
        catch (ex) {
            // Synchronous failure
            completePendingCall(asyncCallId, false, ex);
        }
        return resultPromise;
    }
    function getRequiredDispatcher() {
        if (dotNetDispatcher !== null) {
            return dotNetDispatcher;
        }
        throw new Error('No .NET call dispatcher has been set.');
    }
    function completePendingCall(asyncCallId, success, resultOrError) {
        if (!pendingAsyncCalls.hasOwnProperty(asyncCallId)) {
            throw new Error("There is no pending async call with ID " + asyncCallId + ".");
        }
        var asyncCall = pendingAsyncCalls[asyncCallId];
        delete pendingAsyncCalls[asyncCallId];
        if (success) {
            asyncCall.resolve(resultOrError);
        }
        else {
            asyncCall.reject(resultOrError);
        }
    }
    /**
     * Receives incoming calls from .NET and dispatches them to JavaScript.
     */
    DotNet.jsCallDispatcher = {
        /**
         * Finds the JavaScript function matching the specified identifier.
         *
         * @param identifier Identifies the globally-reachable function to be returned.
         * @returns A Function instance.
         */
        findJSFunction: findJSFunction,
        /**
         * Invokes the specified synchronous JavaScript function.
         *
         * @param identifier Identifies the globally-reachable function to invoke.
         * @param argsJson JSON representation of arguments to be passed to the function.
         * @returns JSON representation of the invocation result.
         */
        invokeJSFromDotNet: function (identifier, argsJson) {
            var result = findJSFunction(identifier).apply(null, parseJsonWithRevivers(argsJson));
            return result === null || result === undefined
                ? null
                : JSON.stringify(result, argReplacer);
        },
        /**
         * Invokes the specified synchronous or asynchronous JavaScript function.
         *
         * @param asyncHandle A value identifying the asynchronous operation. This value will be passed back in a later call to endInvokeJSFromDotNet.
         * @param identifier Identifies the globally-reachable function to invoke.
         * @param argsJson JSON representation of arguments to be passed to the function.
         */
        beginInvokeJSFromDotNet: function (asyncHandle, identifier, argsJson) {
            // Coerce synchronous functions into async ones, plus treat
            // synchronous exceptions the same as async ones
            var promise = new Promise(function (resolve) {
                var synchronousResultOrPromise = findJSFunction(identifier).apply(null, parseJsonWithRevivers(argsJson));
                resolve(synchronousResultOrPromise);
            });
            // We only listen for a result if the caller wants to be notified about it
            if (asyncHandle) {
                // On completion, dispatch result back to .NET
                // Not using "await" because it codegens a lot of boilerplate
                promise.then(function (result) { return getRequiredDispatcher().endInvokeJSFromDotNet(asyncHandle, true, JSON.stringify([asyncHandle, true, result], argReplacer)); }, function (error) { return getRequiredDispatcher().endInvokeJSFromDotNet(asyncHandle, false, JSON.stringify([asyncHandle, false, formatError(error)])); });
            }
        },
        /**
         * Receives notification that an async call from JS to .NET has completed.
         * @param asyncCallId The identifier supplied in an earlier call to beginInvokeDotNetFromJS.
         * @param success A flag to indicate whether the operation completed successfully.
         * @param resultOrExceptionMessage Either the operation result or an error message.
         */
        endInvokeDotNetFromJS: function (asyncCallId, success, resultOrExceptionMessage) {
            var resultOrError = success ? resultOrExceptionMessage : new Error(resultOrExceptionMessage);
            completePendingCall(parseInt(asyncCallId), success, resultOrError);
        }
    };
    function parseJsonWithRevivers(json) {
        return json ? JSON.parse(json, function (key, initialValue) {
            // Invoke each reviver in order, passing the output from the previous reviver,
            // so that each one gets a chance to transform the value
            return jsonRevivers.reduce(function (latestValue, reviver) { return reviver(key, latestValue); }, initialValue);
        }) : null;
    }
    function formatError(error) {
        if (error instanceof Error) {
            return error.message + "\n" + error.stack;
        }
        else {
            return error ? error.toString() : 'null';
        }
    }
    function findJSFunction(identifier) {
        if (cachedJSFunctions.hasOwnProperty(identifier)) {
            return cachedJSFunctions[identifier];
        }
        var result = window;
        var resultIdentifier = 'window';
        var lastSegmentValue;
        identifier.split('.').forEach(function (segment) {
            if (segment in result) {
                lastSegmentValue = result;
                result = result[segment];
                resultIdentifier += '.' + segment;
            }
            else {
                throw new Error("Could not find '" + segment + "' in '" + resultIdentifier + "'.");
            }
        });
        if (result instanceof Function) {
            result = result.bind(lastSegmentValue);
            cachedJSFunctions[identifier] = result;
            return result;
        }
        else {
            throw new Error("The value '" + resultIdentifier + "' is not a function.");
        }
    }
    var DotNetObject = /** @class */ (function () {
        function DotNetObject(_id) {
            this._id = _id;
        }
        DotNetObject.prototype.invokeMethod = function (methodIdentifier) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return invokePossibleInstanceMethod(null, methodIdentifier, this._id, args);
        };
        DotNetObject.prototype.invokeMethodAsync = function (methodIdentifier) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return invokePossibleInstanceMethodAsync(null, methodIdentifier, this._id, args);
        };
        DotNetObject.prototype.dispose = function () {
            var promise = invokePossibleInstanceMethodAsync(null, '__Dispose', this._id, null);
            promise.catch(function (error) { return console.error(error); });
        };
        DotNetObject.prototype.serializeAsArg = function () {
            return { __dotNetObject: this._id };
        };
        return DotNetObject;
    }());
    var dotNetObjectRefKey = '__dotNetObject';
    attachReviver(function reviveDotNetObject(key, value) {
        if (value && typeof value === 'object' && value.hasOwnProperty(dotNetObjectRefKey)) {
            return new DotNetObject(value.__dotNetObject);
        }
        // Unrecognized - let another reviver handle it
        return value;
    });
    function argReplacer(key, value) {
        return value instanceof DotNetObject ? value.serializeAsArg() : value;
    }
})(DotNet || (DotNet = {}));
//# sourceMappingURL=Microsoft.JSInterop.js.map

/***/ }),

/***/ "./node_modules/base64-arraybuffer/lib/base64-arraybuffer.js":
/*!*******************************************************************!*\
  !*** ./node_modules/base64-arraybuffer/lib/base64-arraybuffer.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */
(function(){
  "use strict";

  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  // Use a lookup table to find the index.
  var lookup = new Uint8Array(256);
  for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
  }

  exports.encode = function(arraybuffer) {
    var bytes = new Uint8Array(arraybuffer),
    i, len = bytes.length, base64 = "";

    for (i = 0; i < len; i+=3) {
      base64 += chars[bytes[i] >> 2];
      base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
      base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
      base64 += chars[bytes[i + 2] & 63];
    }

    if ((len % 3) === 2) {
      base64 = base64.substring(0, base64.length - 1) + "=";
    } else if (len % 3 === 1) {
      base64 = base64.substring(0, base64.length - 2) + "==";
    }

    return base64;
  };

  exports.decode =  function(base64) {
    var bufferLength = base64.length * 0.75,
    len = base64.length, i, p = 0,
    encoded1, encoded2, encoded3, encoded4;

    if (base64[base64.length - 1] === "=") {
      bufferLength--;
      if (base64[base64.length - 2] === "=") {
        bufferLength--;
      }
    }

    var arraybuffer = new ArrayBuffer(bufferLength),
    bytes = new Uint8Array(arraybuffer);

    for (i = 0; i < len; i+=4) {
      encoded1 = lookup[base64.charCodeAt(i)];
      encoded2 = lookup[base64.charCodeAt(i+1)];
      encoded3 = lookup[base64.charCodeAt(i+2)];
      encoded4 = lookup[base64.charCodeAt(i+3)];

      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
      bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
      bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }

    return arraybuffer;
  };
})();


/***/ }),

/***/ "./src/Boot.Desktop.ts":
/*!*****************************!*\
  !*** ./src/Boot.Desktop.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! @dotnet/jsinterop/dist/Microsoft.JSInterop */ "./node_modules/@dotnet/jsinterop/dist/Microsoft.JSInterop.js");
__webpack_require__(/*! @browserjs/GlobalExports */ "./upstream/aspnetcore/web.js/src/GlobalExports.ts");
var OutOfProcessRenderBatch_1 = __webpack_require__(/*! @browserjs/Rendering/RenderBatch/OutOfProcessRenderBatch */ "./upstream/aspnetcore/web.js/src/Rendering/RenderBatch/OutOfProcessRenderBatch.ts");
var RendererEventDispatcher_1 = __webpack_require__(/*! @browserjs/Rendering/RendererEventDispatcher */ "./upstream/aspnetcore/web.js/src/Rendering/RendererEventDispatcher.ts");
var NavigationManager_1 = __webpack_require__(/*! @browserjs/Services/NavigationManager */ "./upstream/aspnetcore/web.js/src/Services/NavigationManager.ts");
var Renderer_1 = __webpack_require__(/*! @browserjs/Rendering/Renderer */ "./upstream/aspnetcore/web.js/src/Rendering/Renderer.ts");
var base64_arraybuffer_1 = __webpack_require__(/*! base64-arraybuffer */ "./node_modules/base64-arraybuffer/lib/base64-arraybuffer.js");
var ipc = __webpack_require__(/*! ./IPC */ "./src/IPC.ts");
function boot() {
    RendererEventDispatcher_1.setEventDispatcher(function (eventDescriptor, eventArgs) { return DotNet.invokeMethodAsync('WebWindow.Blazor', 'DispatchEvent', eventDescriptor, JSON.stringify(eventArgs)); });
    NavigationManager_1.internalFunctions.listenForNavigationEvents(function (uri, intercepted) {
        return DotNet.invokeMethodAsync('WebWindow.Blazor', 'NotifyLocationChanged', uri, intercepted);
    });
    // Configure the mechanism for JS<->NET calls
    DotNet.attachDispatcher({
        beginInvokeDotNetFromJS: function (callId, assemblyName, methodIdentifier, dotNetObjectId, argsJson) {
            ipc.send('BeginInvokeDotNetFromJS', [callId ? callId.toString() : null, assemblyName, methodIdentifier, dotNetObjectId || 0, argsJson]);
        },
        endInvokeJSFromDotNet: function (callId, succeeded, resultOrError) {
            ipc.send('EndInvokeJSFromDotNet', [callId, succeeded, resultOrError]);
        }
    });
    NavigationManager_1.internalFunctions.enableNavigationInterception();
    ipc.on('JS.BeginInvokeJS', function (asyncHandle, identifier, argsJson) {
        DotNet.jsCallDispatcher.beginInvokeJSFromDotNet(asyncHandle, identifier, argsJson);
    });
    ipc.on('JS.EndInvokeDotNet', function (callId, success, resultOrError) {
        DotNet.jsCallDispatcher.endInvokeDotNetFromJS(callId, success, resultOrError);
    });
    ipc.on('JS.RenderBatch', function (rendererId, batchBase64) {
        var batchData = new Uint8Array(base64_arraybuffer_1.decode(batchBase64));
        Renderer_1.renderBatch(rendererId, new OutOfProcessRenderBatch_1.OutOfProcessRenderBatch(batchData));
    });
    ipc.on('JS.Error', function (message) {
        console.error(message);
    });
    // Confirm that the JS side is ready for the app to start
    ipc.send('components:init', [
        NavigationManager_1.internalFunctions.getLocationHref().replace(/\/index\.html$/, ''),
        NavigationManager_1.internalFunctions.getBaseURI()
    ]);
}
boot();


/***/ }),

/***/ "./src/IPC.ts":
/*!********************!*\
  !*** ./src/IPC.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var registrations = {};
function on(eventName, callback) {
    if (!(eventName in registrations)) {
        registrations[eventName] = [];
    }
    registrations[eventName].push(callback);
}
exports.on = on;
function off(eventName, callback) {
    var group = registrations[eventName];
    var index = group.indexOf(callback);
    if (index >= 0) {
        group.splice(index, 1);
    }
}
exports.off = off;
function once(eventName, callback) {
    var callbackOnce = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        off(eventName, callbackOnce);
        callback.apply(null, args);
    };
    on(eventName, callbackOnce);
}
exports.once = once;
function send(eventName, args) {
    window.external.sendMessage("ipc:" + eventName + " " + JSON.stringify(args));
}
exports.send = send;
window.external.receiveMessage(function (message) {
    var colonPos = message.indexOf(':');
    var eventName = message.substring(0, colonPos);
    var argsJson = message.substr(colonPos + 1);
    var group = registrations[eventName];
    if (group) {
        var args_1 = JSON.parse(argsJson);
        group.forEach(function (callback) { return callback.apply(null, args_1); });
    }
});


/***/ }),

/***/ "./upstream/aspnetcore/web.js/src/Environment.ts":
/*!*******************************************************!*\
  !*** ./upstream/aspnetcore/web.js/src/Environment.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function setPlatform(platformInstance) {
    exports.platform = platformInstance;
    return exports.platform;
}
exports.setPlatform = setPlatform;


/***/ }),

/***/ "./upstream/aspnetcore/web.js/src/GlobalExports.ts":
/*!*********************************************************!*\
  !*** ./upstream/aspnetcore/web.js/src/GlobalExports.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NavigationManager_1 = __webpack_require__(/*! ./Services/NavigationManager */ "./upstream/aspnetcore/web.js/src/Services/NavigationManager.ts");
var Renderer_1 = __webpack_require__(/*! ./Rendering/Renderer */ "./upstream/aspnetcore/web.js/src/Rendering/Renderer.ts");
// Make the following APIs available in global scope for invocation from JS
window['Blazor'] = {
    navigateTo: NavigationManager_1.navigateTo,
    _internal: {
        attachRootComponentToElement: Renderer_1.attachRootComponentToElement,
        navigationManager: NavigationManager_1.internalFunctions,
    },
};


/***/ }),

/***/ "./upstream/aspnetcore/web.js/src/Platform/Platform.ts":
/*!*************************************************************!*\
  !*** ./upstream/aspnetcore/web.js/src/Platform/Platform.ts ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./upstream/aspnetcore/web.js/src/Rendering/BrowserRenderer.ts":
/*!*********************************************************************!*\
  !*** ./upstream/aspnetcore/web.js/src/Rendering/BrowserRenderer.ts ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var RenderBatch_1 = __webpack_require__(/*! ./RenderBatch/RenderBatch */ "./upstream/aspnetcore/web.js/src/Rendering/RenderBatch/RenderBatch.ts");
var EventDelegator_1 = __webpack_require__(/*! ./EventDelegator */ "./upstream/aspnetcore/web.js/src/Rendering/EventDelegator.ts");
var LogicalElements_1 = __webpack_require__(/*! ./LogicalElements */ "./upstream/aspnetcore/web.js/src/Rendering/LogicalElements.ts");
var ElementReferenceCapture_1 = __webpack_require__(/*! ./ElementReferenceCapture */ "./upstream/aspnetcore/web.js/src/Rendering/ElementReferenceCapture.ts");
var RendererEventDispatcher_1 = __webpack_require__(/*! ./RendererEventDispatcher */ "./upstream/aspnetcore/web.js/src/Rendering/RendererEventDispatcher.ts");
var NavigationManager_1 = __webpack_require__(/*! ../Services/NavigationManager */ "./upstream/aspnetcore/web.js/src/Services/NavigationManager.ts");
var selectValuePropname = '_blazorSelectValue';
var sharedTemplateElemForParsing = document.createElement('template');
var sharedSvgElemForParsing = document.createElementNS('http://www.w3.org/2000/svg', 'g');
var preventDefaultEvents = { submit: true };
var rootComponentsPendingFirstRender = {};
var internalAttributeNamePrefix = '__internal_';
var eventPreventDefaultAttributeNamePrefix = 'preventDefault_';
var eventStopPropagationAttributeNamePrefix = 'stopPropagation_';
var BrowserRenderer = /** @class */ (function () {
    function BrowserRenderer(browserRendererId) {
        var _this = this;
        this.childComponentLocations = {};
        this.browserRendererId = browserRendererId;
        this.eventDelegator = new EventDelegator_1.EventDelegator(function (event, eventHandlerId, eventArgs, eventFieldInfo) {
            raiseEvent(event, _this.browserRendererId, eventHandlerId, eventArgs, eventFieldInfo);
        });
        // We don't yet know whether or not navigation interception will be enabled, but in case it will be,
        // we wire up the navigation manager to the event delegator so it has the option to participate
        // in the synthetic event bubbling process later
        NavigationManager_1.attachToEventDelegator(this.eventDelegator);
    }
    BrowserRenderer.prototype.attachRootComponentToLogicalElement = function (componentId, element) {
        this.attachComponentToElement(componentId, element);
        rootComponentsPendingFirstRender[componentId] = element;
    };
    BrowserRenderer.prototype.updateComponent = function (batch, componentId, edits, referenceFrames) {
        var element = this.childComponentLocations[componentId];
        if (!element) {
            throw new Error("No element is currently associated with component " + componentId);
        }
        // On the first render for each root component, clear any existing content (e.g., prerendered)
        var rootElementToClear = rootComponentsPendingFirstRender[componentId];
        if (rootElementToClear) {
            var rootElementToClearEnd = LogicalElements_1.getLogicalSiblingEnd(rootElementToClear);
            delete rootComponentsPendingFirstRender[componentId];
            if (!rootElementToClearEnd) {
                clearElement(rootElementToClear);
            }
            else {
                clearBetween(rootElementToClear, rootElementToClearEnd);
            }
        }
        var ownerDocument = LogicalElements_1.getClosestDomElement(element).ownerDocument;
        var activeElementBefore = ownerDocument && ownerDocument.activeElement;
        this.applyEdits(batch, componentId, element, 0, edits, referenceFrames);
        // Try to restore focus in case it was lost due to an element move
        if ((activeElementBefore instanceof HTMLElement) && ownerDocument && ownerDocument.activeElement !== activeElementBefore) {
            activeElementBefore.focus();
        }
    };
    BrowserRenderer.prototype.disposeComponent = function (componentId) {
        delete this.childComponentLocations[componentId];
    };
    BrowserRenderer.prototype.disposeEventHandler = function (eventHandlerId) {
        this.eventDelegator.removeListener(eventHandlerId);
    };
    BrowserRenderer.prototype.attachComponentToElement = function (componentId, element) {
        this.childComponentLocations[componentId] = element;
    };
    BrowserRenderer.prototype.applyEdits = function (batch, componentId, parent, childIndex, edits, referenceFrames) {
        var currentDepth = 0;
        var childIndexAtCurrentDepth = childIndex;
        var permutationList;
        var arrayBuilderSegmentReader = batch.arrayBuilderSegmentReader;
        var editReader = batch.editReader;
        var frameReader = batch.frameReader;
        var editsValues = arrayBuilderSegmentReader.values(edits);
        var editsOffset = arrayBuilderSegmentReader.offset(edits);
        var editsLength = arrayBuilderSegmentReader.count(edits);
        var maxEditIndexExcl = editsOffset + editsLength;
        for (var editIndex = editsOffset; editIndex < maxEditIndexExcl; editIndex++) {
            var edit = batch.diffReader.editsEntry(editsValues, editIndex);
            var editType = editReader.editType(edit);
            switch (editType) {
                case RenderBatch_1.EditType.prependFrame: {
                    var frameIndex = editReader.newTreeIndex(edit);
                    var frame = batch.referenceFramesEntry(referenceFrames, frameIndex);
                    var siblingIndex = editReader.siblingIndex(edit);
                    this.insertFrame(batch, componentId, parent, childIndexAtCurrentDepth + siblingIndex, referenceFrames, frame, frameIndex);
                    break;
                }
                case RenderBatch_1.EditType.removeFrame: {
                    var siblingIndex = editReader.siblingIndex(edit);
                    LogicalElements_1.removeLogicalChild(parent, childIndexAtCurrentDepth + siblingIndex);
                    break;
                }
                case RenderBatch_1.EditType.setAttribute: {
                    var frameIndex = editReader.newTreeIndex(edit);
                    var frame = batch.referenceFramesEntry(referenceFrames, frameIndex);
                    var siblingIndex = editReader.siblingIndex(edit);
                    var element = LogicalElements_1.getLogicalChild(parent, childIndexAtCurrentDepth + siblingIndex);
                    if (element instanceof Element) {
                        this.applyAttribute(batch, componentId, element, frame);
                    }
                    else {
                        throw new Error('Cannot set attribute on non-element child');
                    }
                    break;
                }
                case RenderBatch_1.EditType.removeAttribute: {
                    // Note that we don't have to dispose the info we track about event handlers here, because the
                    // disposed event handler IDs are delivered separately (in the 'disposedEventHandlerIds' array)
                    var siblingIndex = editReader.siblingIndex(edit);
                    var element = LogicalElements_1.getLogicalChild(parent, childIndexAtCurrentDepth + siblingIndex);
                    if (element instanceof HTMLElement) {
                        var attributeName = editReader.removedAttributeName(edit);
                        // First try to remove any special property we use for this attribute
                        if (!this.tryApplySpecialProperty(batch, element, attributeName, null)) {
                            // If that's not applicable, it's a regular DOM attribute so remove that
                            element.removeAttribute(attributeName);
                        }
                    }
                    else {
                        throw new Error('Cannot remove attribute from non-element child');
                    }
                    break;
                }
                case RenderBatch_1.EditType.updateText: {
                    var frameIndex = editReader.newTreeIndex(edit);
                    var frame = batch.referenceFramesEntry(referenceFrames, frameIndex);
                    var siblingIndex = editReader.siblingIndex(edit);
                    var textNode = LogicalElements_1.getLogicalChild(parent, childIndexAtCurrentDepth + siblingIndex);
                    if (textNode instanceof Text) {
                        textNode.textContent = frameReader.textContent(frame);
                    }
                    else {
                        throw new Error('Cannot set text content on non-text child');
                    }
                    break;
                }
                case RenderBatch_1.EditType.updateMarkup: {
                    var frameIndex = editReader.newTreeIndex(edit);
                    var frame = batch.referenceFramesEntry(referenceFrames, frameIndex);
                    var siblingIndex = editReader.siblingIndex(edit);
                    LogicalElements_1.removeLogicalChild(parent, childIndexAtCurrentDepth + siblingIndex);
                    this.insertMarkup(batch, parent, childIndexAtCurrentDepth + siblingIndex, frame);
                    break;
                }
                case RenderBatch_1.EditType.stepIn: {
                    var siblingIndex = editReader.siblingIndex(edit);
                    parent = LogicalElements_1.getLogicalChild(parent, childIndexAtCurrentDepth + siblingIndex);
                    currentDepth++;
                    childIndexAtCurrentDepth = 0;
                    break;
                }
                case RenderBatch_1.EditType.stepOut: {
                    parent = LogicalElements_1.getLogicalParent(parent);
                    currentDepth--;
                    childIndexAtCurrentDepth = currentDepth === 0 ? childIndex : 0; // The childIndex is only ever nonzero at zero depth
                    break;
                }
                case RenderBatch_1.EditType.permutationListEntry: {
                    permutationList = permutationList || [];
                    permutationList.push({
                        fromSiblingIndex: childIndexAtCurrentDepth + editReader.siblingIndex(edit),
                        toSiblingIndex: childIndexAtCurrentDepth + editReader.moveToSiblingIndex(edit),
                    });
                    break;
                }
                case RenderBatch_1.EditType.permutationListEnd: {
                    LogicalElements_1.permuteLogicalChildren(parent, permutationList);
                    permutationList = undefined;
                    break;
                }
                default: {
                    var unknownType = editType; // Compile-time verification that the switch was exhaustive
                    throw new Error("Unknown edit type: " + unknownType);
                }
            }
        }
    };
    BrowserRenderer.prototype.insertFrame = function (batch, componentId, parent, childIndex, frames, frame, frameIndex) {
        var frameReader = batch.frameReader;
        var frameType = frameReader.frameType(frame);
        switch (frameType) {
            case RenderBatch_1.FrameType.element:
                this.insertElement(batch, componentId, parent, childIndex, frames, frame, frameIndex);
                return 1;
            case RenderBatch_1.FrameType.text:
                this.insertText(batch, parent, childIndex, frame);
                return 1;
            case RenderBatch_1.FrameType.attribute:
                throw new Error('Attribute frames should only be present as leading children of element frames.');
            case RenderBatch_1.FrameType.component:
                this.insertComponent(batch, parent, childIndex, frame);
                return 1;
            case RenderBatch_1.FrameType.region:
                return this.insertFrameRange(batch, componentId, parent, childIndex, frames, frameIndex + 1, frameIndex + frameReader.subtreeLength(frame));
            case RenderBatch_1.FrameType.elementReferenceCapture:
                if (parent instanceof Element) {
                    ElementReferenceCapture_1.applyCaptureIdToElement(parent, frameReader.elementReferenceCaptureId(frame));
                    return 0; // A "capture" is a child in the diff, but has no node in the DOM
                }
                else {
                    throw new Error('Reference capture frames can only be children of element frames.');
                }
            case RenderBatch_1.FrameType.markup:
                this.insertMarkup(batch, parent, childIndex, frame);
                return 1;
            default:
                var unknownType = frameType; // Compile-time verification that the switch was exhaustive
                throw new Error("Unknown frame type: " + unknownType);
        }
    };
    BrowserRenderer.prototype.insertElement = function (batch, componentId, parent, childIndex, frames, frame, frameIndex) {
        var frameReader = batch.frameReader;
        var tagName = frameReader.elementName(frame);
        var newDomElementRaw = tagName === 'svg' || LogicalElements_1.isSvgElement(parent) ?
            document.createElementNS('http://www.w3.org/2000/svg', tagName) :
            document.createElement(tagName);
        var newElement = LogicalElements_1.toLogicalElement(newDomElementRaw);
        LogicalElements_1.insertLogicalChild(newDomElementRaw, parent, childIndex);
        // Apply attributes
        var descendantsEndIndexExcl = frameIndex + frameReader.subtreeLength(frame);
        for (var descendantIndex = frameIndex + 1; descendantIndex < descendantsEndIndexExcl; descendantIndex++) {
            var descendantFrame = batch.referenceFramesEntry(frames, descendantIndex);
            if (frameReader.frameType(descendantFrame) === RenderBatch_1.FrameType.attribute) {
                this.applyAttribute(batch, componentId, newDomElementRaw, descendantFrame);
            }
            else {
                // As soon as we see a non-attribute child, all the subsequent child frames are
                // not attributes, so bail out and insert the remnants recursively
                this.insertFrameRange(batch, componentId, newElement, 0, frames, descendantIndex, descendantsEndIndexExcl);
                break;
            }
        }
        // We handle setting 'value' on a <select> in two different ways:
        // [1] When inserting a corresponding <option>, in case you're dynamically adding options
        // [2] After we finish inserting the <select>, in case the descendant options are being
        //     added as an opaque markup block rather than individually
        // Right here we implement [2]
        if (newDomElementRaw instanceof HTMLSelectElement && selectValuePropname in newDomElementRaw) {
            var selectValue = newDomElementRaw[selectValuePropname];
            newDomElementRaw.value = selectValue;
            delete newDomElementRaw[selectValuePropname];
        }
    };
    BrowserRenderer.prototype.insertComponent = function (batch, parent, childIndex, frame) {
        var containerElement = LogicalElements_1.createAndInsertLogicalContainer(parent, childIndex);
        // All we have to do is associate the child component ID with its location. We don't actually
        // do any rendering here, because the diff for the child will appear later in the render batch.
        var childComponentId = batch.frameReader.componentId(frame);
        this.attachComponentToElement(childComponentId, containerElement);
    };
    BrowserRenderer.prototype.insertText = function (batch, parent, childIndex, textFrame) {
        var textContent = batch.frameReader.textContent(textFrame);
        var newTextNode = document.createTextNode(textContent);
        LogicalElements_1.insertLogicalChild(newTextNode, parent, childIndex);
    };
    BrowserRenderer.prototype.insertMarkup = function (batch, parent, childIndex, markupFrame) {
        var markupContainer = LogicalElements_1.createAndInsertLogicalContainer(parent, childIndex);
        var markupContent = batch.frameReader.markupContent(markupFrame);
        var parsedMarkup = parseMarkup(markupContent, LogicalElements_1.isSvgElement(parent));
        var logicalSiblingIndex = 0;
        while (parsedMarkup.firstChild) {
            LogicalElements_1.insertLogicalChild(parsedMarkup.firstChild, markupContainer, logicalSiblingIndex++);
        }
    };
    BrowserRenderer.prototype.applyAttribute = function (batch, componentId, toDomElement, attributeFrame) {
        var frameReader = batch.frameReader;
        var attributeName = frameReader.attributeName(attributeFrame);
        var eventHandlerId = frameReader.attributeEventHandlerId(attributeFrame);
        if (eventHandlerId) {
            var eventName = stripOnPrefix(attributeName);
            this.eventDelegator.setListener(toDomElement, eventName, eventHandlerId, componentId);
            return;
        }
        // First see if we have special handling for this attribute
        if (!this.tryApplySpecialProperty(batch, toDomElement, attributeName, attributeFrame)) {
            // If not, treat it as a regular string-valued attribute
            toDomElement.setAttribute(attributeName, frameReader.attributeValue(attributeFrame));
        }
    };
    BrowserRenderer.prototype.tryApplySpecialProperty = function (batch, element, attributeName, attributeFrame) {
        switch (attributeName) {
            case 'value':
                return this.tryApplyValueProperty(batch, element, attributeFrame);
            case 'checked':
                return this.tryApplyCheckedProperty(batch, element, attributeFrame);
            default: {
                if (attributeName.startsWith(internalAttributeNamePrefix)) {
                    this.applyInternalAttribute(batch, element, attributeName.substring(internalAttributeNamePrefix.length), attributeFrame);
                    return true;
                }
                return false;
            }
        }
    };
    BrowserRenderer.prototype.applyInternalAttribute = function (batch, element, internalAttributeName, attributeFrame) {
        var attributeValue = attributeFrame ? batch.frameReader.attributeValue(attributeFrame) : null;
        if (internalAttributeName.startsWith(eventStopPropagationAttributeNamePrefix)) {
            // Stop propagation
            var eventName = stripOnPrefix(internalAttributeName.substring(eventStopPropagationAttributeNamePrefix.length));
            this.eventDelegator.setStopPropagation(element, eventName, attributeValue !== null);
        }
        else if (internalAttributeName.startsWith(eventPreventDefaultAttributeNamePrefix)) {
            // Prevent default
            var eventName = stripOnPrefix(internalAttributeName.substring(eventPreventDefaultAttributeNamePrefix.length));
            this.eventDelegator.setPreventDefault(element, eventName, attributeValue !== null);
        }
        else {
            // The prefix makes this attribute name reserved, so any other usage is disallowed
            throw new Error("Unsupported internal attribute '" + internalAttributeName + "'");
        }
    };
    BrowserRenderer.prototype.tryApplyValueProperty = function (batch, element, attributeFrame) {
        // Certain elements have built-in behaviour for their 'value' property
        var frameReader = batch.frameReader;
        if (element.tagName === 'INPUT' && element.getAttribute('type') === 'time' && !element.getAttribute('step')) {
            var timeValue = attributeFrame ? frameReader.attributeValue(attributeFrame) : null;
            if (timeValue) {
                element['value'] = timeValue.substring(0, 5);
                return true;
            }
        }
        switch (element.tagName) {
            case 'INPUT':
            case 'SELECT':
            case 'TEXTAREA': {
                var value = attributeFrame ? frameReader.attributeValue(attributeFrame) : null;
                element.value = value;
                if (element.tagName === 'SELECT') {
                    // <select> is special, in that anything we write to .value will be lost if there
                    // isn't yet a matching <option>. To maintain the expected behavior no matter the
                    // element insertion/update order, preserve the desired value separately so
                    // we can recover it when inserting any matching <option> or after inserting an
                    // entire markup block of descendants.
                    element[selectValuePropname] = value;
                }
                return true;
            }
            case 'OPTION': {
                var value = attributeFrame ? frameReader.attributeValue(attributeFrame) : null;
                if (value) {
                    element.setAttribute('value', value);
                }
                else {
                    element.removeAttribute('value');
                }
                // See above for why we have this special handling for <select>/<option>
                // Note that this is only one of the two cases where we set the value on a <select>
                var selectElem = this.findClosestAncestorSelectElement(element);
                if (selectElem && (selectValuePropname in selectElem) && selectElem[selectValuePropname] === value) {
                    this.tryApplyValueProperty(batch, selectElem, attributeFrame);
                    delete selectElem[selectValuePropname];
                }
                return true;
            }
            default:
                return false;
        }
    };
    BrowserRenderer.prototype.tryApplyCheckedProperty = function (batch, element, attributeFrame) {
        // Certain elements have built-in behaviour for their 'checked' property
        if (element.tagName === 'INPUT') {
            var value = attributeFrame ? batch.frameReader.attributeValue(attributeFrame) : null;
            element.checked = value !== null;
            return true;
        }
        else {
            return false;
        }
    };
    BrowserRenderer.prototype.findClosestAncestorSelectElement = function (element) {
        while (element) {
            if (element instanceof HTMLSelectElement) {
                return element;
            }
            else {
                element = element.parentElement;
            }
        }
        return null;
    };
    BrowserRenderer.prototype.insertFrameRange = function (batch, componentId, parent, childIndex, frames, startIndex, endIndexExcl) {
        var origChildIndex = childIndex;
        for (var index = startIndex; index < endIndexExcl; index++) {
            var frame = batch.referenceFramesEntry(frames, index);
            var numChildrenInserted = this.insertFrame(batch, componentId, parent, childIndex, frames, frame, index);
            childIndex += numChildrenInserted;
            // Skip over any descendants, since they are already dealt with recursively
            index += countDescendantFrames(batch, frame);
        }
        return (childIndex - origChildIndex); // Total number of children inserted
    };
    return BrowserRenderer;
}());
exports.BrowserRenderer = BrowserRenderer;
function parseMarkup(markup, isSvg) {
    if (isSvg) {
        sharedSvgElemForParsing.innerHTML = markup || ' ';
        return sharedSvgElemForParsing;
    }
    else {
        sharedTemplateElemForParsing.innerHTML = markup || ' ';
        return sharedTemplateElemForParsing.content;
    }
}
function countDescendantFrames(batch, frame) {
    var frameReader = batch.frameReader;
    switch (frameReader.frameType(frame)) {
        // The following frame types have a subtree length. Other frames may use that memory slot
        // to mean something else, so we must not read it. We should consider having nominal subtypes
        // of RenderTreeFramePointer that prevent access to non-applicable fields.
        case RenderBatch_1.FrameType.component:
        case RenderBatch_1.FrameType.element:
        case RenderBatch_1.FrameType.region:
            return frameReader.subtreeLength(frame) - 1;
        default:
            return 0;
    }
}
function raiseEvent(event, browserRendererId, eventHandlerId, eventArgs, eventFieldInfo) {
    if (preventDefaultEvents[event.type]) {
        event.preventDefault();
    }
    var eventDescriptor = {
        browserRendererId: browserRendererId,
        eventHandlerId: eventHandlerId,
        eventArgsType: eventArgs.type,
        eventFieldInfo: eventFieldInfo,
    };
    RendererEventDispatcher_1.dispatchEvent(eventDescriptor, eventArgs.data);
}
function clearElement(element) {
    var childNode;
    while (childNode = element.firstChild) {
        element.removeChild(childNode);
    }
}
function clearBetween(start, end) {
    var logicalParent = LogicalElements_1.getLogicalParent(start);
    if (!logicalParent) {
        throw new Error("Can't clear between nodes. The start node does not have a logical parent.");
    }
    var children = LogicalElements_1.getLogicalChildrenArray(logicalParent);
    var removeStart = children.indexOf(start) + 1;
    var endIndex = children.indexOf(end);
    // We remove the end component comment from the DOM as we don't need it after this point.
    for (var i = removeStart; i <= endIndex; i++) {
        LogicalElements_1.removeLogicalChild(logicalParent, removeStart);
    }
    // We sanitize the start comment by removing all the information from it now that we don't need it anymore
    // as it adds noise to the DOM.
    start.textContent = '!';
}
function stripOnPrefix(attributeName) {
    if (attributeName.startsWith('on')) {
        return attributeName.substring(2);
    }
    throw new Error("Attribute should be an event name, but doesn't start with 'on'. Value: '" + attributeName + "'");
}


/***/ }),

/***/ "./upstream/aspnetcore/web.js/src/Rendering/ElementReferenceCapture.ts":
/*!*****************************************************************************!*\
  !*** ./upstream/aspnetcore/web.js/src/Rendering/ElementReferenceCapture.ts ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function applyCaptureIdToElement(element, referenceCaptureId) {
    element.setAttribute(getCaptureIdAttributeName(referenceCaptureId), '');
}
exports.applyCaptureIdToElement = applyCaptureIdToElement;
function getElementByCaptureId(referenceCaptureId) {
    var selector = "[" + getCaptureIdAttributeName(referenceCaptureId) + "]";
    return document.querySelector(selector);
}
function getCaptureIdAttributeName(referenceCaptureId) {
    return "_bl_" + referenceCaptureId;
}
// Support receiving ElementRef instances as args in interop calls
var elementRefKey = '__internalId'; // Keep in sync with ElementRef.cs
DotNet.attachReviver(function (key, value) {
    if (value && typeof value === 'object' && value.hasOwnProperty(elementRefKey) && typeof value[elementRefKey] === 'string') {
        return getElementByCaptureId(value[elementRefKey]);
    }
    else {
        return value;
    }
});


/***/ }),

/***/ "./upstream/aspnetcore/web.js/src/Rendering/EventDelegator.ts":
/*!********************************************************************!*\
  !*** ./upstream/aspnetcore/web.js/src/Rendering/EventDelegator.ts ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventForDotNet_1 = __webpack_require__(/*! ./EventForDotNet */ "./upstream/aspnetcore/web.js/src/Rendering/EventForDotNet.ts");
var EventFieldInfo_1 = __webpack_require__(/*! ./EventFieldInfo */ "./upstream/aspnetcore/web.js/src/Rendering/EventFieldInfo.ts");
var nonBubblingEvents = toLookup([
    'abort',
    'blur',
    'change',
    'error',
    'focus',
    'load',
    'loadend',
    'loadstart',
    'mouseenter',
    'mouseleave',
    'progress',
    'reset',
    'scroll',
    'submit',
    'unload',
    'DOMNodeInsertedIntoDocument',
    'DOMNodeRemovedFromDocument',
]);
var disableableEventNames = toLookup(['click', 'dblclick', 'mousedown', 'mousemove', 'mouseup']);
// Responsible for adding/removing the eventInfo on an expando property on DOM elements, and
// calling an EventInfoStore that deals with registering/unregistering the underlying delegated
// event listeners as required (and also maps actual events back to the given callback).
var EventDelegator = /** @class */ (function () {
    function EventDelegator(onEvent) {
        this.onEvent = onEvent;
        this.afterClickCallbacks = [];
        var eventDelegatorId = ++EventDelegator.nextEventDelegatorId;
        this.eventsCollectionKey = "_blazorEvents_" + eventDelegatorId;
        this.eventInfoStore = new EventInfoStore(this.onGlobalEvent.bind(this));
    }
    EventDelegator.prototype.setListener = function (element, eventName, eventHandlerId, renderingComponentId) {
        var infoForElement = this.getEventHandlerInfosForElement(element, true);
        var existingHandler = infoForElement.getHandler(eventName);
        if (existingHandler) {
            // We can cheaply update the info on the existing object and don't need any other housekeeping
            // Note that this also takes care of updating the eventHandlerId on the existing handler object
            this.eventInfoStore.update(existingHandler.eventHandlerId, eventHandlerId);
        }
        else {
            // Go through the whole flow which might involve registering a new global handler
            var newInfo = { element: element, eventName: eventName, eventHandlerId: eventHandlerId, renderingComponentId: renderingComponentId };
            this.eventInfoStore.add(newInfo);
            infoForElement.setHandler(eventName, newInfo);
        }
    };
    EventDelegator.prototype.removeListener = function (eventHandlerId) {
        // This method gets called whenever the .NET-side code reports that a certain event handler
        // has been disposed. However we will already have disposed the info about that handler if
        // the eventHandlerId for the (element,eventName) pair was replaced during diff application.
        var info = this.eventInfoStore.remove(eventHandlerId);
        if (info) {
            // Looks like this event handler wasn't already disposed
            // Remove the associated data from the DOM element
            var element = info.element;
            var elementEventInfos = this.getEventHandlerInfosForElement(element, false);
            if (elementEventInfos) {
                elementEventInfos.removeHandler(info.eventName);
            }
        }
    };
    EventDelegator.prototype.notifyAfterClick = function (callback) {
        // This is extremely special-case. It's needed so that navigation link click interception
        // can be sure to run *after* our synthetic bubbling process. If a need arises, we can
        // generalise this, but right now it's a purely internal detail.
        this.afterClickCallbacks.push(callback);
        this.eventInfoStore.addGlobalListener('click'); // Ensure we always listen for this
    };
    EventDelegator.prototype.setStopPropagation = function (element, eventName, value) {
        var infoForElement = this.getEventHandlerInfosForElement(element, true);
        infoForElement.stopPropagation(eventName, value);
    };
    EventDelegator.prototype.setPreventDefault = function (element, eventName, value) {
        var infoForElement = this.getEventHandlerInfosForElement(element, true);
        infoForElement.preventDefault(eventName, value);
    };
    EventDelegator.prototype.onGlobalEvent = function (evt) {
        if (!(evt.target instanceof Element)) {
            return;
        }
        // Scan up the element hierarchy, looking for any matching registered event handlers
        var candidateElement = evt.target;
        var eventArgs = null; // Populate lazily
        var eventIsNonBubbling = nonBubblingEvents.hasOwnProperty(evt.type);
        var stopPropagationWasRequested = false;
        while (candidateElement) {
            var handlerInfos = this.getEventHandlerInfosForElement(candidateElement, false);
            if (handlerInfos) {
                var handlerInfo = handlerInfos.getHandler(evt.type);
                if (handlerInfo && !eventIsDisabledOnElement(candidateElement, evt.type)) {
                    // We are going to raise an event for this element, so prepare info needed by the .NET code
                    if (!eventArgs) {
                        eventArgs = EventForDotNet_1.EventForDotNet.fromDOMEvent(evt);
                    }
                    var eventFieldInfo = EventFieldInfo_1.EventFieldInfo.fromEvent(handlerInfo.renderingComponentId, evt);
                    this.onEvent(evt, handlerInfo.eventHandlerId, eventArgs, eventFieldInfo);
                }
                if (handlerInfos.stopPropagation(evt.type)) {
                    stopPropagationWasRequested = true;
                }
                if (handlerInfos.preventDefault(evt.type)) {
                    evt.preventDefault();
                }
            }
            candidateElement = (eventIsNonBubbling || stopPropagationWasRequested) ? null : candidateElement.parentElement;
        }
        // Special case for navigation interception
        if (evt.type === 'click') {
            this.afterClickCallbacks.forEach(function (callback) { return callback(evt); });
        }
    };
    EventDelegator.prototype.getEventHandlerInfosForElement = function (element, createIfNeeded) {
        if (element.hasOwnProperty(this.eventsCollectionKey)) {
            return element[this.eventsCollectionKey];
        }
        else if (createIfNeeded) {
            return (element[this.eventsCollectionKey] = new EventHandlerInfosForElement());
        }
        else {
            return null;
        }
    };
    EventDelegator.nextEventDelegatorId = 0;
    return EventDelegator;
}());
exports.EventDelegator = EventDelegator;
// Responsible for adding and removing the global listener when the number of listeners
// for a given event name changes between zero and nonzero
var EventInfoStore = /** @class */ (function () {
    function EventInfoStore(globalListener) {
        this.globalListener = globalListener;
        this.infosByEventHandlerId = {};
        this.countByEventName = {};
    }
    EventInfoStore.prototype.add = function (info) {
        if (this.infosByEventHandlerId[info.eventHandlerId]) {
            // Should never happen, but we want to know if it does
            throw new Error("Event " + info.eventHandlerId + " is already tracked");
        }
        this.infosByEventHandlerId[info.eventHandlerId] = info;
        this.addGlobalListener(info.eventName);
    };
    EventInfoStore.prototype.addGlobalListener = function (eventName) {
        if (this.countByEventName.hasOwnProperty(eventName)) {
            this.countByEventName[eventName]++;
        }
        else {
            this.countByEventName[eventName] = 1;
            // To make delegation work with non-bubbling events, register a 'capture' listener.
            // We preserve the non-bubbling behavior by only dispatching such events to the targeted element.
            var useCapture = nonBubblingEvents.hasOwnProperty(eventName);
            document.addEventListener(eventName, this.globalListener, useCapture);
        }
    };
    EventInfoStore.prototype.update = function (oldEventHandlerId, newEventHandlerId) {
        if (this.infosByEventHandlerId.hasOwnProperty(newEventHandlerId)) {
            // Should never happen, but we want to know if it does
            throw new Error("Event " + newEventHandlerId + " is already tracked");
        }
        // Since we're just updating the event handler ID, there's no need to update the global counts
        var info = this.infosByEventHandlerId[oldEventHandlerId];
        delete this.infosByEventHandlerId[oldEventHandlerId];
        info.eventHandlerId = newEventHandlerId;
        this.infosByEventHandlerId[newEventHandlerId] = info;
    };
    EventInfoStore.prototype.remove = function (eventHandlerId) {
        var info = this.infosByEventHandlerId[eventHandlerId];
        if (info) {
            delete this.infosByEventHandlerId[eventHandlerId];
            var eventName = info.eventName;
            if (--this.countByEventName[eventName] === 0) {
                delete this.countByEventName[eventName];
                document.removeEventListener(eventName, this.globalListener);
            }
        }
        return info;
    };
    return EventInfoStore;
}());
var EventHandlerInfosForElement = /** @class */ (function () {
    function EventHandlerInfosForElement() {
        // Although we *could* track multiple event handlers per (element, eventName) pair
        // (since they have distinct eventHandlerId values), there's no point doing so because
        // our programming model is that you declare event handlers as attributes. An element
        // can only have one attribute with a given name, hence only one event handler with
        // that name at any one time.
        // So to keep things simple, only track one EventHandlerInfo per (element, eventName)
        this.handlers = {};
        this.preventDefaultFlags = null;
        this.stopPropagationFlags = null;
    }
    EventHandlerInfosForElement.prototype.getHandler = function (eventName) {
        return this.handlers.hasOwnProperty(eventName) ? this.handlers[eventName] : null;
    };
    EventHandlerInfosForElement.prototype.setHandler = function (eventName, handler) {
        this.handlers[eventName] = handler;
    };
    EventHandlerInfosForElement.prototype.removeHandler = function (eventName) {
        delete this.handlers[eventName];
    };
    EventHandlerInfosForElement.prototype.preventDefault = function (eventName, setValue) {
        if (setValue !== undefined) {
            this.preventDefaultFlags = this.preventDefaultFlags || {};
            this.preventDefaultFlags[eventName] = setValue;
        }
        return this.preventDefaultFlags ? this.preventDefaultFlags[eventName] : false;
    };
    EventHandlerInfosForElement.prototype.stopPropagation = function (eventName, setValue) {
        if (setValue !== undefined) {
            this.stopPropagationFlags = this.stopPropagationFlags || {};
            this.stopPropagationFlags[eventName] = setValue;
        }
        return this.stopPropagationFlags ? this.stopPropagationFlags[eventName] : false;
    };
    return EventHandlerInfosForElement;
}());
function toLookup(items) {
    var result = {};
    items.forEach(function (value) {
        result[value] = true;
    });
    return result;
}
function eventIsDisabledOnElement(element, eventName) {
    // We want to replicate the normal DOM event behavior that, for 'interactive' elements
    // with a 'disabled' attribute, certain mouse events are suppressed
    return (element instanceof HTMLButtonElement || element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement)
        && disableableEventNames.hasOwnProperty(eventName)
        && element.disabled;
}


/***/ }),

/***/ "./upstream/aspnetcore/web.js/src/Rendering/EventFieldInfo.ts":
/*!********************************************************************!*\
  !*** ./upstream/aspnetcore/web.js/src/Rendering/EventFieldInfo.ts ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventFieldInfo = /** @class */ (function () {
    function EventFieldInfo(componentId, fieldValue) {
        this.componentId = componentId;
        this.fieldValue = fieldValue;
    }
    EventFieldInfo.fromEvent = function (componentId, event) {
        var elem = event.target;
        if (elem instanceof Element) {
            var fieldData = getFormFieldData(elem);
            if (fieldData) {
                return new EventFieldInfo(componentId, fieldData.value);
            }
        }
        // This event isn't happening on a form field that we can reverse-map back to some incoming attribute
        return null;
    };
    return EventFieldInfo;
}());
exports.EventFieldInfo = EventFieldInfo;
function getFormFieldData(elem) {
    // The logic in here should be the inverse of the logic in BrowserRenderer's tryApplySpecialProperty.
    // That is, we're doing the reverse mapping, starting from an HTML property and reconstructing which
    // "special" attribute would have been mapped to that property.
    if (elem instanceof HTMLInputElement) {
        return (elem.type && elem.type.toLowerCase() === 'checkbox')
            ? { value: elem.checked }
            : { value: elem.value };
    }
    if (elem instanceof HTMLSelectElement || elem instanceof HTMLTextAreaElement) {
        return { value: elem.value };
    }
    return null;
}


/***/ }),

/***/ "./upstream/aspnetcore/web.js/src/Rendering/EventForDotNet.ts":
/*!********************************************************************!*\
  !*** ./upstream/aspnetcore/web.js/src/Rendering/EventForDotNet.ts ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var EventForDotNet = /** @class */ (function () {
    function EventForDotNet(type, data) {
        this.type = type;
        this.data = data;
    }
    EventForDotNet.fromDOMEvent = function (event) {
        var element = event.target;
        switch (event.type) {
            case 'input':
            case 'change': {
                if (isTimeBasedInput(element)) {
                    var normalizedValue = normalizeTimeBasedValue(element);
                    return new EventForDotNet('change', { type: event.type, value: normalizedValue });
                }
                var targetIsCheckbox = isCheckbox(element);
                var newValue = targetIsCheckbox ? !!element['checked'] : element['value'];
                return new EventForDotNet('change', { type: event.type, value: newValue });
            }
            case 'copy':
            case 'cut':
            case 'paste':
                return new EventForDotNet('clipboard', { type: event.type });
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
                return new EventForDotNet('drag', parseDragEvent(event));
            case 'focus':
            case 'blur':
            case 'focusin':
            case 'focusout':
                return new EventForDotNet('focus', { type: event.type });
            case 'keydown':
            case 'keyup':
            case 'keypress':
                return new EventForDotNet('keyboard', parseKeyboardEvent(event));
            case 'contextmenu':
            case 'click':
            case 'mouseover':
            case 'mouseout':
            case 'mousemove':
            case 'mousedown':
            case 'mouseup':
            case 'dblclick':
                return new EventForDotNet('mouse', parseMouseEvent(event));
            case 'error':
                return new EventForDotNet('error', parseErrorEvent(event));
            case 'loadstart':
            case 'timeout':
            case 'abort':
            case 'load':
            case 'loadend':
            case 'progress':
                return new EventForDotNet('progress', parseProgressEvent(event));
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchenter':
            case 'touchleave':
            case 'touchstart':
                return new EventForDotNet('touch', parseTouchEvent(event));
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointerenter':
            case 'pointerleave':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
                return new EventForDotNet('pointer', parsePointerEvent(event));
            case 'wheel':
            case 'mousewheel':
                return new EventForDotNet('wheel', parseWheelEvent(event));
            default:
                return new EventForDotNet('unknown', { type: event.type });
        }
    };
    return EventForDotNet;
}());
exports.EventForDotNet = EventForDotNet;
function parseDragEvent(event) {
    return __assign(__assign({}, parseMouseEvent(event)), { dataTransfer: event.dataTransfer });
}
function parseWheelEvent(event) {
    return __assign(__assign({}, parseMouseEvent(event)), { deltaX: event.deltaX, deltaY: event.deltaY, deltaZ: event.deltaZ, deltaMode: event.deltaMode });
}
function parseErrorEvent(event) {
    return {
        type: event.type,
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
    };
}
function parseProgressEvent(event) {
    return {
        type: event.type,
        lengthComputable: event.lengthComputable,
        loaded: event.loaded,
        total: event.total,
    };
}
function parseTouchEvent(event) {
    function parseTouch(touchList) {
        var touches = [];
        for (var i = 0; i < touchList.length; i++) {
            var touch = touchList[i];
            touches.push({
                identifier: touch.identifier,
                clientX: touch.clientX,
                clientY: touch.clientY,
                screenX: touch.screenX,
                screenY: touch.screenY,
                pageX: touch.pageX,
                pageY: touch.pageY,
            });
        }
        return touches;
    }
    return {
        type: event.type,
        detail: event.detail,
        touches: parseTouch(event.touches),
        targetTouches: parseTouch(event.targetTouches),
        changedTouches: parseTouch(event.changedTouches),
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        altKey: event.altKey,
        metaKey: event.metaKey,
    };
}
function parseKeyboardEvent(event) {
    return {
        type: event.type,
        key: event.key,
        code: event.code,
        location: event.location,
        repeat: event.repeat,
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        altKey: event.altKey,
        metaKey: event.metaKey,
    };
}
function parsePointerEvent(event) {
    return __assign(__assign({}, parseMouseEvent(event)), { pointerId: event.pointerId, width: event.width, height: event.height, pressure: event.pressure, tiltX: event.tiltX, tiltY: event.tiltY, pointerType: event.pointerType, isPrimary: event.isPrimary });
}
function parseMouseEvent(event) {
    return {
        type: event.type,
        detail: event.detail,
        screenX: event.screenX,
        screenY: event.screenY,
        clientX: event.clientX,
        clientY: event.clientY,
        button: event.button,
        buttons: event.buttons,
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        altKey: event.altKey,
        metaKey: event.metaKey,
    };
}
function isCheckbox(element) {
    return !!element && element.tagName === 'INPUT' && element.getAttribute('type') === 'checkbox';
}
var timeBasedInputs = [
    'date',
    'datetime-local',
    'month',
    'time',
    'week',
];
function isTimeBasedInput(element) {
    return timeBasedInputs.indexOf(element.getAttribute('type')) !== -1;
}
function normalizeTimeBasedValue(element) {
    var value = element.value;
    var type = element.type;
    switch (type) {
        case 'date':
        case 'datetime-local':
        case 'month':
            return value;
        case 'time':
            return value.length === 5 ? value + ':00' : value; // Convert hh:mm to hh:mm:00
        case 'week':
            // For now we are not going to normalize input type week as it is not trivial
            return value;
    }
    throw new Error("Invalid element type '" + type + "'.");
}


/***/ }),

/***/ "./upstream/aspnetcore/web.js/src/Rendering/LogicalElements.ts":
/*!*********************************************************************!*\
  !*** ./upstream/aspnetcore/web.js/src/Rendering/LogicalElements.ts ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
  A LogicalElement plays the same role as an Element instance from the point of view of the
  API consumer. Inserting and removing logical elements updates the browser DOM just the same.

  The difference is that, unlike regular DOM mutation APIs, the LogicalElement APIs don't use
  the underlying DOM structure as the data storage for the element hierarchy. Instead, the
  LogicalElement APIs take care of tracking hierarchical relationships separately. The point
  of this is to permit a logical tree structure in which parent/child relationships don't
  have to be materialized in terms of DOM element parent/child relationships. And the reason
  why we want that is so that hierarchies of Blazor components can be tracked even when those
  components' render output need not be a single literal DOM element.

  Consumers of the API don't need to know about the implementation, but how it's done is:
  - Each LogicalElement is materialized in the DOM as either:
    - A Node instance, for actual Node instances inserted using 'insertLogicalChild' or
      for Element instances promoted to LogicalElement via 'toLogicalElement'
    - A Comment instance, for 'logical container' instances inserted using 'createAndInsertLogicalContainer'
  - Then, on that instance (i.e., the Node or Comment), we store an array of 'logical children'
    instances, e.g.,
      [firstChild, secondChild, thirdChild, ...]
    ... plus we store a reference to the 'logical parent' (if any)
  - The 'logical children' array means we can look up in O(1):
    - The number of logical children (not currently implemented because not required, but trivial)
    - The logical child at any given index
  - Whenever a logical child is added or removed, we update the parent's array of logical children
*/
Object.defineProperty(exports, "__esModule", { value: true });
var logicalChildrenPropname = createSymbolOrFallback('_blazorLogicalChildren');
var logicalParentPropname = createSymbolOrFallback('_blazorLogicalParent');
var logicalEndSiblingPropname = createSymbolOrFallback('_blazorLogicalEnd');
function toLogicalRootCommentElement(start, end) {
    // Now that we support start/end comments as component delimiters we are going to be setting up
    // adding the components rendered output as siblings of the start/end tags (between).
    // For that to work, we need to appropriately configure the parent element to be a logical element
    // with all their children being the child elements.
    // For example, imagine you have
    // <app>
    // <div><p>Static content</p></div>
    // <!-- start component
    // <!-- end component
    // <footer>Some other content</footer>
    // <app>
    // We want the parent element to be something like
    // *app
    // |- *div
    // |- *component
    // |- *footer
    if (!start.parentNode) {
        throw new Error("Comment not connected to the DOM " + start.textContent);
    }
    var parent = start.parentNode;
    var parentLogicalElement = toLogicalElement(parent, /* allow existing contents */ true);
    var children = getLogicalChildrenArray(parentLogicalElement);
    Array.from(parent.childNodes).forEach(function (n) { return children.push(n); });
    start[logicalParentPropname] = parentLogicalElement;
    // We might not have an end comment in the case of non-prerendered components.
    if (end) {
        start[logicalEndSiblingPropname] = end;
        toLogicalElement(end, /* allowExistingcontents */ true);
    }
    return toLogicalElement(start, /* allowExistingContents */ true);
}
exports.toLogicalRootCommentElement = toLogicalRootCommentElement;
function toLogicalElement(element, allowExistingContents) {
    // Normally it's good to assert that the element has started empty, because that's the usual
    // situation and we probably have a bug if it's not. But for the element that contain prerendered
    // root components, we want to let them keep their content until we replace it.
    if (element.childNodes.length > 0 && !allowExistingContents) {
        throw new Error('New logical elements must start empty, or allowExistingContents must be true');
    }
    element[logicalChildrenPropname] = [];
    return element;
}
exports.toLogicalElement = toLogicalElement;
function createAndInsertLogicalContainer(parent, childIndex) {
    var containerElement = document.createComment('!');
    insertLogicalChild(containerElement, parent, childIndex);
    return containerElement;
}
exports.createAndInsertLogicalContainer = createAndInsertLogicalContainer;
function insertLogicalChild(child, parent, childIndex) {
    var childAsLogicalElement = child;
    if (child instanceof Comment) {
        var existingGrandchildren = getLogicalChildrenArray(childAsLogicalElement);
        if (existingGrandchildren && getLogicalChildrenArray(childAsLogicalElement).length > 0) {
            // There's nothing to stop us implementing support for this scenario, and it's not difficult
            // (after inserting 'child' itself, also iterate through its logical children and physically
            // put them as following-siblings in the DOM). However there's no scenario that requires it
            // presently, so if we did implement it there'd be no good way to have tests for it.
            throw new Error('Not implemented: inserting non-empty logical container');
        }
    }
    if (getLogicalParent(childAsLogicalElement)) {
        // Likewise, we could easily support this scenario too (in this 'if' block, just splice
        // out 'child' from the logical children array of its previous logical parent by using
        // Array.prototype.indexOf to determine its previous sibling index).
        // But again, since there's not currently any scenario that would use it, we would not
        // have any test coverage for such an implementation.
        throw new Error('Not implemented: moving existing logical children');
    }
    var newSiblings = getLogicalChildrenArray(parent);
    if (childIndex < newSiblings.length) {
        // Insert
        var nextSibling = newSiblings[childIndex];
        nextSibling.parentNode.insertBefore(child, nextSibling);
        newSiblings.splice(childIndex, 0, childAsLogicalElement);
    }
    else {
        // Append
        appendDomNode(child, parent);
        newSiblings.push(childAsLogicalElement);
    }
    childAsLogicalElement[logicalParentPropname] = parent;
    if (!(logicalChildrenPropname in childAsLogicalElement)) {
        childAsLogicalElement[logicalChildrenPropname] = [];
    }
}
exports.insertLogicalChild = insertLogicalChild;
function removeLogicalChild(parent, childIndex) {
    var childrenArray = getLogicalChildrenArray(parent);
    var childToRemove = childrenArray.splice(childIndex, 1)[0];
    // If it's a logical container, also remove its descendants
    if (childToRemove instanceof Comment) {
        var grandchildrenArray = getLogicalChildrenArray(childToRemove);
        while (grandchildrenArray.length > 0) {
            removeLogicalChild(childToRemove, 0);
        }
    }
    // Finally, remove the node itself
    var domNodeToRemove = childToRemove;
    domNodeToRemove.parentNode.removeChild(domNodeToRemove);
}
exports.removeLogicalChild = removeLogicalChild;
function getLogicalParent(element) {
    return element[logicalParentPropname] || null;
}
exports.getLogicalParent = getLogicalParent;
function getLogicalSiblingEnd(element) {
    return element[logicalEndSiblingPropname] || null;
}
exports.getLogicalSiblingEnd = getLogicalSiblingEnd;
function getLogicalChild(parent, childIndex) {
    return getLogicalChildrenArray(parent)[childIndex];
}
exports.getLogicalChild = getLogicalChild;
function isSvgElement(element) {
    return getClosestDomElement(element).namespaceURI === 'http://www.w3.org/2000/svg';
}
exports.isSvgElement = isSvgElement;
function getLogicalChildrenArray(element) {
    return element[logicalChildrenPropname];
}
exports.getLogicalChildrenArray = getLogicalChildrenArray;
function permuteLogicalChildren(parent, permutationList) {
    // The permutationList must represent a valid permutation, i.e., the list of 'from' indices
    // is distinct, and the list of 'to' indices is a permutation of it. The algorithm here
    // relies on that assumption.
    // Each of the phases here has to happen separately, because each one is designed not to
    // interfere with the indices or DOM entries used by subsequent phases.
    // Phase 1: track which nodes we will move
    var siblings = getLogicalChildrenArray(parent);
    permutationList.forEach(function (listEntry) {
        listEntry.moveRangeStart = siblings[listEntry.fromSiblingIndex];
        listEntry.moveRangeEnd = findLastDomNodeInRange(listEntry.moveRangeStart);
    });
    // Phase 2: insert markers
    permutationList.forEach(function (listEntry) {
        var marker = listEntry.moveToBeforeMarker = document.createComment('marker');
        var insertBeforeNode = siblings[listEntry.toSiblingIndex + 1];
        if (insertBeforeNode) {
            insertBeforeNode.parentNode.insertBefore(marker, insertBeforeNode);
        }
        else {
            appendDomNode(marker, parent);
        }
    });
    // Phase 3: move descendants & remove markers
    permutationList.forEach(function (listEntry) {
        var insertBefore = listEntry.moveToBeforeMarker;
        var parentDomNode = insertBefore.parentNode;
        var elementToMove = listEntry.moveRangeStart;
        var moveEndNode = listEntry.moveRangeEnd;
        var nextToMove = elementToMove;
        while (nextToMove) {
            var nextNext = nextToMove.nextSibling;
            parentDomNode.insertBefore(nextToMove, insertBefore);
            if (nextToMove === moveEndNode) {
                break;
            }
            else {
                nextToMove = nextNext;
            }
        }
        parentDomNode.removeChild(insertBefore);
    });
    // Phase 4: update siblings index
    permutationList.forEach(function (listEntry) {
        siblings[listEntry.toSiblingIndex] = listEntry.moveRangeStart;
    });
}
exports.permuteLogicalChildren = permuteLogicalChildren;
function getClosestDomElement(logicalElement) {
    if (logicalElement instanceof Element) {
        return logicalElement;
    }
    else if (logicalElement instanceof Comment) {
        return logicalElement.parentNode;
    }
    else {
        throw new Error('Not a valid logical element');
    }
}
exports.getClosestDomElement = getClosestDomElement;
function getLogicalNextSibling(element) {
    var siblings = getLogicalChildrenArray(getLogicalParent(element));
    var siblingIndex = Array.prototype.indexOf.call(siblings, element);
    return siblings[siblingIndex + 1] || null;
}
function appendDomNode(child, parent) {
    // This function only puts 'child' into the DOM in the right place relative to 'parent'
    // It does not update the logical children array of anything
    if (parent instanceof Element) {
        parent.appendChild(child);
    }
    else if (parent instanceof Comment) {
        var parentLogicalNextSibling = getLogicalNextSibling(parent);
        if (parentLogicalNextSibling) {
            // Since the parent has a logical next-sibling, its appended child goes right before that
            parentLogicalNextSibling.parentNode.insertBefore(child, parentLogicalNextSibling);
        }
        else {
            // Since the parent has no logical next-sibling, keep recursing upwards until we find
            // a logical ancestor that does have a next-sibling or is a physical element.
            appendDomNode(child, getLogicalParent(parent));
        }
    }
    else {
        // Should never happen
        throw new Error("Cannot append node because the parent is not a valid logical element. Parent: " + parent);
    }
}
// Returns the final node (in depth-first evaluation order) that is a descendant of the logical element.
// As such, the entire subtree is between 'element' and 'findLastDomNodeInRange(element)' inclusive.
function findLastDomNodeInRange(element) {
    if (element instanceof Element) {
        return element;
    }
    var nextSibling = getLogicalNextSibling(element);
    if (nextSibling) {
        // Simple case: not the last logical sibling, so take the node before the next sibling
        return nextSibling.previousSibling;
    }
    else {
        // Harder case: there's no logical next-sibling, so recurse upwards until we find
        // a logical ancestor that does have one, or a physical element
        var logicalParent = getLogicalParent(element);
        return logicalParent instanceof Element
            ? logicalParent.lastChild
            : findLastDomNodeInRange(logicalParent);
    }
}
function createSymbolOrFallback(fallback) {
    return typeof Symbol === 'function' ? Symbol() : fallback;
}


/***/ }),

/***/ "./upstream/aspnetcore/web.js/src/Rendering/RenderBatch/OutOfProcessRenderBatch.ts":
/*!*****************************************************************************************!*\
  !*** ./upstream/aspnetcore/web.js/src/Rendering/RenderBatch/OutOfProcessRenderBatch.ts ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utf8Decoder_1 = __webpack_require__(/*! ./Utf8Decoder */ "./upstream/aspnetcore/web.js/src/Rendering/RenderBatch/Utf8Decoder.ts");
var updatedComponentsEntryLength = 4; // Each is a single int32 giving the location of the data
var referenceFramesEntryLength = 20; // 1 int for frame type, then 16 bytes for type-specific data
var disposedComponentIdsEntryLength = 4; // Each is an int32 giving the ID
var disposedEventHandlerIdsEntryLength = 8; // Each is an int64 giving the ID
var editsEntryLength = 16; // 4 ints
var stringTableEntryLength = 4; // Each is an int32 giving the string data location, or -1 for null
var uint64HighPartShift = Math.pow(2, 32);
var maxSafeNumberHighPart = Math.pow(2, 21) - 1; // The high-order int32 from Number.MAX_SAFE_INTEGER
var OutOfProcessRenderBatch = /** @class */ (function () {
    function OutOfProcessRenderBatch(batchData) {
        this.batchData = batchData;
        var stringReader = new OutOfProcessStringReader(batchData);
        this.arrayRangeReader = new OutOfProcessArrayRangeReader(batchData);
        this.arrayBuilderSegmentReader = new OutOfProcessArrayBuilderSegmentReader(batchData);
        this.diffReader = new OutOfProcessRenderTreeDiffReader(batchData);
        this.editReader = new OutOfProcessRenderTreeEditReader(batchData, stringReader);
        this.frameReader = new OutOfProcessRenderTreeFrameReader(batchData, stringReader);
    }
    OutOfProcessRenderBatch.prototype.updatedComponents = function () {
        return readInt32LE(this.batchData, this.batchData.length - 20); // 5th-from-last int32
    };
    OutOfProcessRenderBatch.prototype.referenceFrames = function () {
        return readInt32LE(this.batchData, this.batchData.length - 16); // 4th-from-last int32
    };
    OutOfProcessRenderBatch.prototype.disposedComponentIds = function () {
        return readInt32LE(this.batchData, this.batchData.length - 12); // 3rd-from-last int32
    };
    OutOfProcessRenderBatch.prototype.disposedEventHandlerIds = function () {
        return readInt32LE(this.batchData, this.batchData.length - 8); // 2th-from-last int32
    };
    OutOfProcessRenderBatch.prototype.updatedComponentsEntry = function (values, index) {
        var tableEntryPos = values + index * updatedComponentsEntryLength;
        return readInt32LE(this.batchData, tableEntryPos);
    };
    OutOfProcessRenderBatch.prototype.referenceFramesEntry = function (values, index) {
        return values + index * referenceFramesEntryLength;
    };
    OutOfProcessRenderBatch.prototype.disposedComponentIdsEntry = function (values, index) {
        var entryPos = values + index * disposedComponentIdsEntryLength;
        return readInt32LE(this.batchData, entryPos);
    };
    OutOfProcessRenderBatch.prototype.disposedEventHandlerIdsEntry = function (values, index) {
        var entryPos = values + index * disposedEventHandlerIdsEntryLength;
        return readUint64LE(this.batchData, entryPos);
    };
    return OutOfProcessRenderBatch;
}());
exports.OutOfProcessRenderBatch = OutOfProcessRenderBatch;
var OutOfProcessRenderTreeDiffReader = /** @class */ (function () {
    function OutOfProcessRenderTreeDiffReader(batchDataUint8) {
        this.batchDataUint8 = batchDataUint8;
    }
    OutOfProcessRenderTreeDiffReader.prototype.componentId = function (diff) {
        // First int32 is componentId
        return readInt32LE(this.batchDataUint8, diff);
    };
    OutOfProcessRenderTreeDiffReader.prototype.edits = function (diff) {
        // Entries data starts after the componentId (which is a 4-byte int)
        return (diff + 4);
    };
    OutOfProcessRenderTreeDiffReader.prototype.editsEntry = function (values, index) {
        return values + index * editsEntryLength;
    };
    return OutOfProcessRenderTreeDiffReader;
}());
var OutOfProcessRenderTreeEditReader = /** @class */ (function () {
    function OutOfProcessRenderTreeEditReader(batchDataUint8, stringReader) {
        this.batchDataUint8 = batchDataUint8;
        this.stringReader = stringReader;
    }
    OutOfProcessRenderTreeEditReader.prototype.editType = function (edit) {
        return readInt32LE(this.batchDataUint8, edit); // 1st int
    };
    OutOfProcessRenderTreeEditReader.prototype.siblingIndex = function (edit) {
        return readInt32LE(this.batchDataUint8, edit + 4); // 2nd int
    };
    OutOfProcessRenderTreeEditReader.prototype.newTreeIndex = function (edit) {
        return readInt32LE(this.batchDataUint8, edit + 8); // 3rd int
    };
    OutOfProcessRenderTreeEditReader.prototype.moveToSiblingIndex = function (edit) {
        return readInt32LE(this.batchDataUint8, edit + 8); // 3rd int
    };
    OutOfProcessRenderTreeEditReader.prototype.removedAttributeName = function (edit) {
        var stringIndex = readInt32LE(this.batchDataUint8, edit + 12); // 4th int
        return this.stringReader.readString(stringIndex);
    };
    return OutOfProcessRenderTreeEditReader;
}());
var OutOfProcessRenderTreeFrameReader = /** @class */ (function () {
    function OutOfProcessRenderTreeFrameReader(batchDataUint8, stringReader) {
        this.batchDataUint8 = batchDataUint8;
        this.stringReader = stringReader;
    }
    // For render frames, the 2nd-4th ints have different meanings depending on frameType.
    // It's the caller's responsibility not to evaluate properties that aren't applicable to the frameType.
    OutOfProcessRenderTreeFrameReader.prototype.frameType = function (frame) {
        return readInt32LE(this.batchDataUint8, frame); // 1st int
    };
    OutOfProcessRenderTreeFrameReader.prototype.subtreeLength = function (frame) {
        return readInt32LE(this.batchDataUint8, frame + 4); // 2nd int
    };
    OutOfProcessRenderTreeFrameReader.prototype.elementReferenceCaptureId = function (frame) {
        var stringIndex = readInt32LE(this.batchDataUint8, frame + 4); // 2nd int
        return this.stringReader.readString(stringIndex);
    };
    OutOfProcessRenderTreeFrameReader.prototype.componentId = function (frame) {
        return readInt32LE(this.batchDataUint8, frame + 8); // 3rd int
    };
    OutOfProcessRenderTreeFrameReader.prototype.elementName = function (frame) {
        var stringIndex = readInt32LE(this.batchDataUint8, frame + 8); // 3rd int
        return this.stringReader.readString(stringIndex);
    };
    OutOfProcessRenderTreeFrameReader.prototype.textContent = function (frame) {
        var stringIndex = readInt32LE(this.batchDataUint8, frame + 4); // 2nd int
        return this.stringReader.readString(stringIndex);
    };
    OutOfProcessRenderTreeFrameReader.prototype.markupContent = function (frame) {
        var stringIndex = readInt32LE(this.batchDataUint8, frame + 4); // 2nd int
        return this.stringReader.readString(stringIndex);
    };
    OutOfProcessRenderTreeFrameReader.prototype.attributeName = function (frame) {
        var stringIndex = readInt32LE(this.batchDataUint8, frame + 4); // 2nd int
        return this.stringReader.readString(stringIndex);
    };
    OutOfProcessRenderTreeFrameReader.prototype.attributeValue = function (frame) {
        var stringIndex = readInt32LE(this.batchDataUint8, frame + 8); // 3rd int
        return this.stringReader.readString(stringIndex);
    };
    OutOfProcessRenderTreeFrameReader.prototype.attributeEventHandlerId = function (frame) {
        return readUint64LE(this.batchDataUint8, frame + 12); // Bytes 12-19
    };
    return OutOfProcessRenderTreeFrameReader;
}());
var OutOfProcessStringReader = /** @class */ (function () {
    function OutOfProcessStringReader(batchDataUint8) {
        this.batchDataUint8 = batchDataUint8;
        // Final int gives start position of the string table
        this.stringTableStartIndex = readInt32LE(batchDataUint8, batchDataUint8.length - 4);
    }
    OutOfProcessStringReader.prototype.readString = function (index) {
        if (index === -1) { // Special value encodes 'null'
            return null;
        }
        else {
            var stringTableEntryPos = readInt32LE(this.batchDataUint8, this.stringTableStartIndex + index * stringTableEntryLength);
            // By default, .NET's BinaryWriter gives LEB128-length-prefixed UTF-8 data.
            // This is convenient enough to decode in JavaScript.
            var numUtf8Bytes = readLEB128(this.batchDataUint8, stringTableEntryPos);
            var charsStart = stringTableEntryPos + numLEB128Bytes(numUtf8Bytes);
            var utf8Data = new Uint8Array(this.batchDataUint8.buffer, this.batchDataUint8.byteOffset + charsStart, numUtf8Bytes);
            return Utf8Decoder_1.decodeUtf8(utf8Data);
        }
    };
    return OutOfProcessStringReader;
}());
var OutOfProcessArrayRangeReader = /** @class */ (function () {
    function OutOfProcessArrayRangeReader(batchDataUint8) {
        this.batchDataUint8 = batchDataUint8;
    }
    OutOfProcessArrayRangeReader.prototype.count = function (arrayRange) {
        // First int is count
        return readInt32LE(this.batchDataUint8, arrayRange);
    };
    OutOfProcessArrayRangeReader.prototype.values = function (arrayRange) {
        // Entries data starts after the 'count' int (i.e., after 4 bytes)
        return arrayRange + 4;
    };
    return OutOfProcessArrayRangeReader;
}());
var OutOfProcessArrayBuilderSegmentReader = /** @class */ (function () {
    function OutOfProcessArrayBuilderSegmentReader(batchDataUint8) {
        this.batchDataUint8 = batchDataUint8;
    }
    OutOfProcessArrayBuilderSegmentReader.prototype.offset = function (arrayBuilderSegment) {
        // Not used by the out-of-process representation of RenderBatch data.
        // This only exists on the ArrayBuilderSegmentReader for the shared-memory representation.
        return 0;
    };
    OutOfProcessArrayBuilderSegmentReader.prototype.count = function (arrayBuilderSegment) {
        // First int is count
        return readInt32LE(this.batchDataUint8, arrayBuilderSegment);
    };
    OutOfProcessArrayBuilderSegmentReader.prototype.values = function (arrayBuilderSegment) {
        // Entries data starts after the 'count' int (i.e., after 4 bytes)
        return arrayBuilderSegment + 4;
    };
    return OutOfProcessArrayBuilderSegmentReader;
}());
function readInt32LE(buffer, position) {
    return (buffer[position])
        | (buffer[position + 1] << 8)
        | (buffer[position + 2] << 16)
        | (buffer[position + 3] << 24);
}
function readUint32LE(buffer, position) {
    return (buffer[position])
        + (buffer[position + 1] << 8)
        + (buffer[position + 2] << 16)
        + ((buffer[position + 3] << 24) >>> 0); // The >>> 0 coerces the value to unsigned
}
function readUint64LE(buffer, position) {
    // This cannot be done using bit-shift operators in JavaScript, because
    // those all implicitly convert to int32
    var highPart = readUint32LE(buffer, position + 4);
    if (highPart > maxSafeNumberHighPart) {
        throw new Error("Cannot read uint64 with high order part " + highPart + ", because the result would exceed Number.MAX_SAFE_INTEGER.");
    }
    return (highPart * uint64HighPartShift) + readUint32LE(buffer, position);
}
function readLEB128(buffer, position) {
    var result = 0;
    var shift = 0;
    for (var index = 0; index < 4; index++) {
        var byte = buffer[position + index];
        result |= (byte & 127) << shift;
        if (byte < 128) {
            break;
        }
        shift += 7;
    }
    return result;
}
function numLEB128Bytes(value) {
    return value < 128 ? 1
        : value < 16384 ? 2
            : value < 2097152 ? 3 : 4;
}


/***/ }),

/***/ "./upstream/aspnetcore/web.js/src/Rendering/RenderBatch/RenderBatch.ts":
/*!*****************************************************************************!*\
  !*** ./upstream/aspnetcore/web.js/src/Rendering/RenderBatch/RenderBatch.ts ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EditType;
(function (EditType) {
    // The values must be kept in sync with the .NET equivalent in RenderTreeEditType.cs
    EditType[EditType["prependFrame"] = 1] = "prependFrame";
    EditType[EditType["removeFrame"] = 2] = "removeFrame";
    EditType[EditType["setAttribute"] = 3] = "setAttribute";
    EditType[EditType["removeAttribute"] = 4] = "removeAttribute";
    EditType[EditType["updateText"] = 5] = "updateText";
    EditType[EditType["stepIn"] = 6] = "stepIn";
    EditType[EditType["stepOut"] = 7] = "stepOut";
    EditType[EditType["updateMarkup"] = 8] = "updateMarkup";
    EditType[EditType["permutationListEntry"] = 9] = "permutationListEntry";
    EditType[EditType["permutationListEnd"] = 10] = "permutationListEnd";
})(EditType = exports.EditType || (exports.EditType = {}));
var FrameType;
(function (FrameType) {
    // The values must be kept in sync with the .NET equivalent in RenderTreeFrameType.cs
    FrameType[FrameType["element"] = 1] = "element";
    FrameType[FrameType["text"] = 2] = "text";
    FrameType[FrameType["attribute"] = 3] = "attribute";
    FrameType[FrameType["component"] = 4] = "component";
    FrameType[FrameType["region"] = 5] = "region";
    FrameType[FrameType["elementReferenceCapture"] = 6] = "elementReferenceCapture";
    FrameType[FrameType["markup"] = 8] = "markup";
})(FrameType = exports.FrameType || (exports.FrameType = {}));


/***/ }),

/***/ "./upstream/aspnetcore/web.js/src/Rendering/RenderBatch/Utf8Decoder.ts":
/*!*****************************************************************************!*\
  !*** ./upstream/aspnetcore/web.js/src/Rendering/RenderBatch/Utf8Decoder.ts ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var nativeDecoder = typeof TextDecoder === 'function'
    ? new TextDecoder('utf-8')
    : null;
exports.decodeUtf8 = nativeDecoder ? nativeDecoder.decode.bind(nativeDecoder) : decodeImpl;
/* !
Logic in decodeImpl is derived from fast-text-encoding
https://github.com/samthor/fast-text-encoding

License for fast-text-encoding: Apache 2.0
https://github.com/samthor/fast-text-encoding/blob/master/LICENSE
*/
function decodeImpl(bytes) {
    var pos = 0;
    var len = bytes.length;
    var out = [];
    var substrings = [];
    while (pos < len) {
        var byte1 = bytes[pos++];
        if (byte1 === 0) {
            break; // NULL
        }
        if ((byte1 & 0x80) === 0) { // 1-byte
            out.push(byte1);
        }
        else if ((byte1 & 0xe0) === 0xc0) { // 2-byte
            var byte2 = bytes[pos++] & 0x3f;
            out.push(((byte1 & 0x1f) << 6) | byte2);
        }
        else if ((byte1 & 0xf0) === 0xe0) {
            var byte2 = bytes[pos++] & 0x3f;
            var byte3 = bytes[pos++] & 0x3f;
            out.push(((byte1 & 0x1f) << 12) | (byte2 << 6) | byte3);
        }
        else if ((byte1 & 0xf8) === 0xf0) {
            var byte2 = bytes[pos++] & 0x3f;
            var byte3 = bytes[pos++] & 0x3f;
            var byte4 = bytes[pos++] & 0x3f;
            // this can be > 0xffff, so possibly generate surrogates
            var codepoint = ((byte1 & 0x07) << 0x12) | (byte2 << 0x0c) | (byte3 << 0x06) | byte4;
            if (codepoint > 0xffff) {
                // codepoint &= ~0x10000;
                codepoint -= 0x10000;
                out.push((codepoint >>> 10) & 0x3ff | 0xd800);
                codepoint = 0xdc00 | codepoint & 0x3ff;
            }
            out.push(codepoint);
        }
        else {
            // FIXME: we're ignoring this
        }
        // As a workaround for https://github.com/samthor/fast-text-encoding/issues/1,
        // make sure the 'out' array never gets too long. When it reaches a limit, we
        // stringify what we have so far and append to a list of outputs.
        if (out.length > 1024) {
            substrings.push(String.fromCharCode.apply(null, out));
            out.length = 0;
        }
    }
    substrings.push(String.fromCharCode.apply(null, out));
    return substrings.join('');
}


/***/ }),

/***/ "./upstream/aspnetcore/web.js/src/Rendering/Renderer.ts":
/*!**************************************************************!*\
  !*** ./upstream/aspnetcore/web.js/src/Rendering/Renderer.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/camelcase */
__webpack_require__(/*! ../Platform/Platform */ "./upstream/aspnetcore/web.js/src/Platform/Platform.ts");
__webpack_require__(/*! ../Environment */ "./upstream/aspnetcore/web.js/src/Environment.ts");
var BrowserRenderer_1 = __webpack_require__(/*! ./BrowserRenderer */ "./upstream/aspnetcore/web.js/src/Rendering/BrowserRenderer.ts");
var LogicalElements_1 = __webpack_require__(/*! ./LogicalElements */ "./upstream/aspnetcore/web.js/src/Rendering/LogicalElements.ts");
var browserRenderers = {};
var shouldResetScrollAfterNextBatch = false;
function attachRootComponentToLogicalElement(browserRendererId, logicalElement, componentId) {
    var browserRenderer = browserRenderers[browserRendererId];
    if (!browserRenderer) {
        browserRenderer = browserRenderers[browserRendererId] = new BrowserRenderer_1.BrowserRenderer(browserRendererId);
    }
    browserRenderer.attachRootComponentToLogicalElement(componentId, logicalElement);
}
exports.attachRootComponentToLogicalElement = attachRootComponentToLogicalElement;
function attachRootComponentToElement(elementSelector, componentId, browserRendererId) {
    var element = document.querySelector(elementSelector);
    if (!element) {
        throw new Error("Could not find any element matching selector '" + elementSelector + "'.");
    }
    // 'allowExistingContents' to keep any prerendered content until we do the first client-side render
    // Only client-side Blazor supplies a browser renderer ID
    attachRootComponentToLogicalElement(browserRendererId || 0, LogicalElements_1.toLogicalElement(element, /* allow existing contents */ true), componentId);
}
exports.attachRootComponentToElement = attachRootComponentToElement;
function renderBatch(browserRendererId, batch) {
    var browserRenderer = browserRenderers[browserRendererId];
    if (!browserRenderer) {
        throw new Error("There is no browser renderer with ID " + browserRendererId + ".");
    }
    var arrayRangeReader = batch.arrayRangeReader;
    var updatedComponentsRange = batch.updatedComponents();
    var updatedComponentsValues = arrayRangeReader.values(updatedComponentsRange);
    var updatedComponentsLength = arrayRangeReader.count(updatedComponentsRange);
    var referenceFrames = batch.referenceFrames();
    var referenceFramesValues = arrayRangeReader.values(referenceFrames);
    var diffReader = batch.diffReader;
    for (var i = 0; i < updatedComponentsLength; i++) {
        var diff = batch.updatedComponentsEntry(updatedComponentsValues, i);
        var componentId = diffReader.componentId(diff);
        var edits = diffReader.edits(diff);
        browserRenderer.updateComponent(batch, componentId, edits, referenceFramesValues);
    }
    var disposedComponentIdsRange = batch.disposedComponentIds();
    var disposedComponentIdsValues = arrayRangeReader.values(disposedComponentIdsRange);
    var disposedComponentIdsLength = arrayRangeReader.count(disposedComponentIdsRange);
    for (var i = 0; i < disposedComponentIdsLength; i++) {
        var componentId = batch.disposedComponentIdsEntry(disposedComponentIdsValues, i);
        browserRenderer.disposeComponent(componentId);
    }
    var disposedEventHandlerIdsRange = batch.disposedEventHandlerIds();
    var disposedEventHandlerIdsValues = arrayRangeReader.values(disposedEventHandlerIdsRange);
    var disposedEventHandlerIdsLength = arrayRangeReader.count(disposedEventHandlerIdsRange);
    for (var i = 0; i < disposedEventHandlerIdsLength; i++) {
        var eventHandlerId = batch.disposedEventHandlerIdsEntry(disposedEventHandlerIdsValues, i);
        browserRenderer.disposeEventHandler(eventHandlerId);
    }
    resetScrollIfNeeded();
}
exports.renderBatch = renderBatch;
function resetScrollAfterNextBatch() {
    shouldResetScrollAfterNextBatch = true;
}
exports.resetScrollAfterNextBatch = resetScrollAfterNextBatch;
function resetScrollIfNeeded() {
    if (shouldResetScrollAfterNextBatch) {
        shouldResetScrollAfterNextBatch = false;
        // This assumes the scroller is on the window itself. There isn't a general way to know
        // if some other element is playing the role of the primary scroll region.
        window.scrollTo && window.scrollTo(0, 0);
    }
}


/***/ }),

/***/ "./upstream/aspnetcore/web.js/src/Rendering/RendererEventDispatcher.ts":
/*!*****************************************************************************!*\
  !*** ./upstream/aspnetcore/web.js/src/Rendering/RendererEventDispatcher.ts ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var eventDispatcherInstance;
function dispatchEvent(eventDescriptor, eventArgs) {
    if (!eventDispatcherInstance) {
        throw new Error('eventDispatcher not initialized. Call \'setEventDispatcher\' to configure it.');
    }
    return eventDispatcherInstance(eventDescriptor, eventArgs);
}
exports.dispatchEvent = dispatchEvent;
function setEventDispatcher(newDispatcher) {
    eventDispatcherInstance = newDispatcher;
}
exports.setEventDispatcher = setEventDispatcher;


/***/ }),

/***/ "./upstream/aspnetcore/web.js/src/Services/NavigationManager.ts":
/*!**********************************************************************!*\
  !*** ./upstream/aspnetcore/web.js/src/Services/NavigationManager.ts ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// import '@dotnet/jsinterop'; Imported elsewhere
var Renderer_1 = __webpack_require__(/*! ../Rendering/Renderer */ "./upstream/aspnetcore/web.js/src/Rendering/Renderer.ts");
var hasEnabledNavigationInterception = false;
var hasRegisteredNavigationEventListeners = false;
// Will be initialized once someone registers
var notifyLocationChangedCallback = null;
// These are the functions we're making available for invocation from .NET
exports.internalFunctions = {
    listenForNavigationEvents: listenForNavigationEvents,
    enableNavigationInterception: enableNavigationInterception,
    navigateTo: navigateTo,
    getBaseURI: function () { return document.baseURI; },
    getLocationHref: function () { return location.href; },
};
function listenForNavigationEvents(callback) {
    notifyLocationChangedCallback = callback;
    if (hasRegisteredNavigationEventListeners) {
        return;
    }
    hasRegisteredNavigationEventListeners = true;
    window.addEventListener('popstate', function () { return notifyLocationChanged(false); });
}
function enableNavigationInterception() {
    hasEnabledNavigationInterception = true;
}
function attachToEventDelegator(eventDelegator) {
    // We need to respond to clicks on <a> elements *after* the EventDelegator has finished
    // running its simulated bubbling process so that we can respect any preventDefault requests.
    // So instead of registering our own native event, register using the EventDelegator.
    eventDelegator.notifyAfterClick(function (event) {
        if (!hasEnabledNavigationInterception) {
            return;
        }
        if (event.button !== 0 || eventHasSpecialKey(event)) {
            // Don't stop ctrl/meta-click (etc) from opening links in new tabs/windows
            return;
        }
        if (event.defaultPrevented) {
            return;
        }
        // Intercept clicks on all <a> elements where the href is within the <base href> URI space
        // We must explicitly check if it has an 'href' attribute, because if it doesn't, the result might be null or an empty string depending on the browser
        var anchorTarget = findClosestAncestor(event.target, 'A');
        var hrefAttributeName = 'href';
        if (anchorTarget && anchorTarget.hasAttribute(hrefAttributeName)) {
            var targetAttributeValue = anchorTarget.getAttribute('target');
            var opensInSameFrame = !targetAttributeValue || targetAttributeValue === '_self';
            if (!opensInSameFrame) {
                return;
            }
            var href = anchorTarget.getAttribute(hrefAttributeName);
            var absoluteHref = toAbsoluteUri(href);
            if (isWithinBaseUriSpace(absoluteHref)) {
                event.preventDefault();
                performInternalNavigation(absoluteHref, true);
            }
        }
    });
}
exports.attachToEventDelegator = attachToEventDelegator;
function navigateTo(uri, forceLoad) {
    var absoluteUri = toAbsoluteUri(uri);
    if (!forceLoad && isWithinBaseUriSpace(absoluteUri)) {
        // It's an internal URL, so do client-side navigation
        performInternalNavigation(absoluteUri, false);
    }
    else if (forceLoad && location.href === uri) {
        // Force-loading the same URL you're already on requires special handling to avoid
        // triggering browser-specific behavior issues.
        // For details about what this fixes and why, see https://github.com/aspnet/AspNetCore/pull/10839
        var temporaryUri = uri + '?';
        history.replaceState(null, '', temporaryUri);
        location.replace(uri);
    }
    else {
        // It's either an external URL, or forceLoad is requested, so do a full page load
        location.href = uri;
    }
}
exports.navigateTo = navigateTo;
function performInternalNavigation(absoluteInternalHref, interceptedLink) {
    // Since this was *not* triggered by a back/forward gesture (that goes through a different
    // code path starting with a popstate event), we don't want to preserve the current scroll
    // position, so reset it.
    // To avoid ugly flickering effects, we don't want to change the scroll position until the
    // we render the new page. As a best approximation, wait until the next batch.
    Renderer_1.resetScrollAfterNextBatch();
    history.pushState(null, /* ignored title */ '', absoluteInternalHref);
    notifyLocationChanged(interceptedLink);
}
function notifyLocationChanged(interceptedLink) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!notifyLocationChangedCallback) return [3 /*break*/, 2];
                    return [4 /*yield*/, notifyLocationChangedCallback(location.href, interceptedLink)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
var testAnchor;
function toAbsoluteUri(relativeUri) {
    testAnchor = testAnchor || document.createElement('a');
    testAnchor.href = relativeUri;
    return testAnchor.href;
}
function findClosestAncestor(element, tagName) {
    return !element
        ? null
        : element.tagName === tagName
            ? element
            : findClosestAncestor(element.parentElement, tagName);
}
function isWithinBaseUriSpace(href) {
    var baseUriWithTrailingSlash = toBaseUriWithTrailingSlash(document.baseURI); // TODO: Might baseURI really be null?
    return href.startsWith(baseUriWithTrailingSlash);
}
function toBaseUriWithTrailingSlash(baseUri) {
    return baseUri.substr(0, baseUri.lastIndexOf('/') + 1);
}
function eventHasSpecialKey(event) {
    return event.ctrlKey || event.shiftKey || event.altKey || event.metaKey;
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bkb3RuZXQvanNpbnRlcm9wL2Rpc3QvTWljcm9zb2Z0LkpTSW50ZXJvcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFzZTY0LWFycmF5YnVmZmVyL2xpYi9iYXNlNjQtYXJyYXlidWZmZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Jvb3QuRGVza3RvcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvSVBDLnRzIiwid2VicGFjazovLy8uL3Vwc3RyZWFtL2FzcG5ldGNvcmUvd2ViLmpzL3NyYy9FbnZpcm9ubWVudC50cyIsIndlYnBhY2s6Ly8vLi91cHN0cmVhbS9hc3BuZXRjb3JlL3dlYi5qcy9zcmMvR2xvYmFsRXhwb3J0cy50cyIsIndlYnBhY2s6Ly8vLi91cHN0cmVhbS9hc3BuZXRjb3JlL3dlYi5qcy9zcmMvUmVuZGVyaW5nL0Jyb3dzZXJSZW5kZXJlci50cyIsIndlYnBhY2s6Ly8vLi91cHN0cmVhbS9hc3BuZXRjb3JlL3dlYi5qcy9zcmMvUmVuZGVyaW5nL0VsZW1lbnRSZWZlcmVuY2VDYXB0dXJlLnRzIiwid2VicGFjazovLy8uL3Vwc3RyZWFtL2FzcG5ldGNvcmUvd2ViLmpzL3NyYy9SZW5kZXJpbmcvRXZlbnREZWxlZ2F0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vdXBzdHJlYW0vYXNwbmV0Y29yZS93ZWIuanMvc3JjL1JlbmRlcmluZy9FdmVudEZpZWxkSW5mby50cyIsIndlYnBhY2s6Ly8vLi91cHN0cmVhbS9hc3BuZXRjb3JlL3dlYi5qcy9zcmMvUmVuZGVyaW5nL0V2ZW50Rm9yRG90TmV0LnRzIiwid2VicGFjazovLy8uL3Vwc3RyZWFtL2FzcG5ldGNvcmUvd2ViLmpzL3NyYy9SZW5kZXJpbmcvTG9naWNhbEVsZW1lbnRzLnRzIiwid2VicGFjazovLy8uL3Vwc3RyZWFtL2FzcG5ldGNvcmUvd2ViLmpzL3NyYy9SZW5kZXJpbmcvUmVuZGVyQmF0Y2gvT3V0T2ZQcm9jZXNzUmVuZGVyQmF0Y2gudHMiLCJ3ZWJwYWNrOi8vLy4vdXBzdHJlYW0vYXNwbmV0Y29yZS93ZWIuanMvc3JjL1JlbmRlcmluZy9SZW5kZXJCYXRjaC9SZW5kZXJCYXRjaC50cyIsIndlYnBhY2s6Ly8vLi91cHN0cmVhbS9hc3BuZXRjb3JlL3dlYi5qcy9zcmMvUmVuZGVyaW5nL1JlbmRlckJhdGNoL1V0ZjhEZWNvZGVyLnRzIiwid2VicGFjazovLy8uL3Vwc3RyZWFtL2FzcG5ldGNvcmUvd2ViLmpzL3NyYy9SZW5kZXJpbmcvUmVuZGVyZXIudHMiLCJ3ZWJwYWNrOi8vLy4vdXBzdHJlYW0vYXNwbmV0Y29yZS93ZWIuanMvc3JjL1JlbmRlcmluZy9SZW5kZXJlckV2ZW50RGlzcGF0Y2hlci50cyIsIndlYnBhY2s6Ly8vLi91cHN0cmVhbS9hc3BuZXRjb3JlL3dlYi5qcy9zcmMvU2VydmljZXMvTmF2aWdhdGlvbk1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNE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QUFDbkQsQ0FBQztBQUVELFNBQVMsMEJBQTBCLENBQUMsT0FBZTtJQUNqRCxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDekQsQ0FBQztBQUVELFNBQVMsa0JBQWtCLENBQUMsS0FBaUI7SUFDM0MsT0FBTyxLQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDO0FBQzFFLENBQUMiLCJmaWxlIjoiYmxhem9yLmRlc2t0b3AuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9Cb290LkRlc2t0b3AudHNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vIFRoaXMgaXMgYSBzaW5nbGUtZmlsZSBzZWxmLWNvbnRhaW5lZCBtb2R1bGUgdG8gYXZvaWQgdGhlIG5lZWQgZm9yIGEgV2VicGFjayBidWlsZFxudmFyIERvdE5ldDtcbihmdW5jdGlvbiAoRG90TmV0KSB7XG4gICAgd2luZG93LkRvdE5ldCA9IERvdE5ldDsgLy8gRW5zdXJlIHJlYWNoYWJsZSBmcm9tIGFueXdoZXJlXG4gICAgdmFyIGpzb25SZXZpdmVycyA9IFtdO1xuICAgIHZhciBwZW5kaW5nQXN5bmNDYWxscyA9IHt9O1xuICAgIHZhciBjYWNoZWRKU0Z1bmN0aW9ucyA9IHt9O1xuICAgIHZhciBuZXh0QXN5bmNDYWxsSWQgPSAxOyAvLyBTdGFydCBhdCAxIGJlY2F1c2UgemVybyBzaWduYWxzIFwibm8gcmVzcG9uc2UgbmVlZGVkXCJcbiAgICB2YXIgZG90TmV0RGlzcGF0Y2hlciA9IG51bGw7XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgc3BlY2lmaWVkIC5ORVQgY2FsbCBkaXNwYXRjaGVyIGFzIHRoZSBjdXJyZW50IGluc3RhbmNlIHNvIHRoYXQgaXQgd2lsbCBiZSB1c2VkXG4gICAgICogZm9yIGZ1dHVyZSBpbnZvY2F0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBkaXNwYXRjaGVyIEFuIG9iamVjdCB0aGF0IGNhbiBkaXNwYXRjaCBjYWxscyBmcm9tIEphdmFTY3JpcHQgdG8gYSAuTkVUIHJ1bnRpbWUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gYXR0YWNoRGlzcGF0Y2hlcihkaXNwYXRjaGVyKSB7XG4gICAgICAgIGRvdE5ldERpc3BhdGNoZXIgPSBkaXNwYXRjaGVyO1xuICAgIH1cbiAgICBEb3ROZXQuYXR0YWNoRGlzcGF0Y2hlciA9IGF0dGFjaERpc3BhdGNoZXI7XG4gICAgLyoqXG4gICAgICogQWRkcyBhIEpTT04gcmV2aXZlciBjYWxsYmFjayB0aGF0IHdpbGwgYmUgdXNlZCB3aGVuIHBhcnNpbmcgYXJndW1lbnRzIHJlY2VpdmVkIGZyb20gLk5FVC5cbiAgICAgKiBAcGFyYW0gcmV2aXZlciBUaGUgcmV2aXZlciB0byBhZGQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gYXR0YWNoUmV2aXZlcihyZXZpdmVyKSB7XG4gICAgICAgIGpzb25SZXZpdmVycy5wdXNoKHJldml2ZXIpO1xuICAgIH1cbiAgICBEb3ROZXQuYXR0YWNoUmV2aXZlciA9IGF0dGFjaFJldml2ZXI7XG4gICAgLyoqXG4gICAgICogSW52b2tlcyB0aGUgc3BlY2lmaWVkIC5ORVQgcHVibGljIG1ldGhvZCBzeW5jaHJvbm91c2x5LiBOb3QgYWxsIGhvc3Rpbmcgc2NlbmFyaW9zIHN1cHBvcnRcbiAgICAgKiBzeW5jaHJvbm91cyBpbnZvY2F0aW9uLCBzbyBpZiBwb3NzaWJsZSB1c2UgaW52b2tlTWV0aG9kQXN5bmMgaW5zdGVhZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBhc3NlbWJseU5hbWUgVGhlIHNob3J0IG5hbWUgKHdpdGhvdXQga2V5L3ZlcnNpb24gb3IgLmRsbCBleHRlbnNpb24pIG9mIHRoZSAuTkVUIGFzc2VtYmx5IGNvbnRhaW5pbmcgdGhlIG1ldGhvZC5cbiAgICAgKiBAcGFyYW0gbWV0aG9kSWRlbnRpZmllciBUaGUgaWRlbnRpZmllciBvZiB0aGUgbWV0aG9kIHRvIGludm9rZS4gVGhlIG1ldGhvZCBtdXN0IGhhdmUgYSBbSlNJbnZva2FibGVdIGF0dHJpYnV0ZSBzcGVjaWZ5aW5nIHRoaXMgaWRlbnRpZmllci5cbiAgICAgKiBAcGFyYW0gYXJncyBBcmd1bWVudHMgdG8gcGFzcyB0byB0aGUgbWV0aG9kLCBlYWNoIG9mIHdoaWNoIG11c3QgYmUgSlNPTi1zZXJpYWxpemFibGUuXG4gICAgICogQHJldHVybnMgVGhlIHJlc3VsdCBvZiB0aGUgb3BlcmF0aW9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGludm9rZU1ldGhvZChhc3NlbWJseU5hbWUsIG1ldGhvZElkZW50aWZpZXIpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAyOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGFyZ3NbX2kgLSAyXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGludm9rZVBvc3NpYmxlSW5zdGFuY2VNZXRob2QoYXNzZW1ibHlOYW1lLCBtZXRob2RJZGVudGlmaWVyLCBudWxsLCBhcmdzKTtcbiAgICB9XG4gICAgRG90TmV0Lmludm9rZU1ldGhvZCA9IGludm9rZU1ldGhvZDtcbiAgICAvKipcbiAgICAgKiBJbnZva2VzIHRoZSBzcGVjaWZpZWQgLk5FVCBwdWJsaWMgbWV0aG9kIGFzeW5jaHJvbm91c2x5LlxuICAgICAqXG4gICAgICogQHBhcmFtIGFzc2VtYmx5TmFtZSBUaGUgc2hvcnQgbmFtZSAod2l0aG91dCBrZXkvdmVyc2lvbiBvciAuZGxsIGV4dGVuc2lvbikgb2YgdGhlIC5ORVQgYXNzZW1ibHkgY29udGFpbmluZyB0aGUgbWV0aG9kLlxuICAgICAqIEBwYXJhbSBtZXRob2RJZGVudGlmaWVyIFRoZSBpZGVudGlmaWVyIG9mIHRoZSBtZXRob2QgdG8gaW52b2tlLiBUaGUgbWV0aG9kIG11c3QgaGF2ZSBhIFtKU0ludm9rYWJsZV0gYXR0cmlidXRlIHNwZWNpZnlpbmcgdGhpcyBpZGVudGlmaWVyLlxuICAgICAqIEBwYXJhbSBhcmdzIEFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZSBtZXRob2QsIGVhY2ggb2Ygd2hpY2ggbXVzdCBiZSBKU09OLXNlcmlhbGl6YWJsZS5cbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgcmVwcmVzZW50aW5nIHRoZSByZXN1bHQgb2YgdGhlIG9wZXJhdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpbnZva2VNZXRob2RBc3luYyhhc3NlbWJseU5hbWUsIG1ldGhvZElkZW50aWZpZXIpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAyOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGFyZ3NbX2kgLSAyXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGludm9rZVBvc3NpYmxlSW5zdGFuY2VNZXRob2RBc3luYyhhc3NlbWJseU5hbWUsIG1ldGhvZElkZW50aWZpZXIsIG51bGwsIGFyZ3MpO1xuICAgIH1cbiAgICBEb3ROZXQuaW52b2tlTWV0aG9kQXN5bmMgPSBpbnZva2VNZXRob2RBc3luYztcbiAgICBmdW5jdGlvbiBpbnZva2VQb3NzaWJsZUluc3RhbmNlTWV0aG9kKGFzc2VtYmx5TmFtZSwgbWV0aG9kSWRlbnRpZmllciwgZG90TmV0T2JqZWN0SWQsIGFyZ3MpIHtcbiAgICAgICAgdmFyIGRpc3BhdGNoZXIgPSBnZXRSZXF1aXJlZERpc3BhdGNoZXIoKTtcbiAgICAgICAgaWYgKGRpc3BhdGNoZXIuaW52b2tlRG90TmV0RnJvbUpTKSB7XG4gICAgICAgICAgICB2YXIgYXJnc0pzb24gPSBKU09OLnN0cmluZ2lmeShhcmdzLCBhcmdSZXBsYWNlcik7XG4gICAgICAgICAgICB2YXIgcmVzdWx0SnNvbiA9IGRpc3BhdGNoZXIuaW52b2tlRG90TmV0RnJvbUpTKGFzc2VtYmx5TmFtZSwgbWV0aG9kSWRlbnRpZmllciwgZG90TmV0T2JqZWN0SWQsIGFyZ3NKc29uKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRKc29uID8gcGFyc2VKc29uV2l0aFJldml2ZXJzKHJlc3VsdEpzb24pIDogbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGN1cnJlbnQgZGlzcGF0Y2hlciBkb2VzIG5vdCBzdXBwb3J0IHN5bmNocm9ub3VzIGNhbGxzIGZyb20gSlMgdG8gLk5FVC4gVXNlIGludm9rZU1ldGhvZEFzeW5jIGluc3RlYWQuJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gaW52b2tlUG9zc2libGVJbnN0YW5jZU1ldGhvZEFzeW5jKGFzc2VtYmx5TmFtZSwgbWV0aG9kSWRlbnRpZmllciwgZG90TmV0T2JqZWN0SWQsIGFyZ3MpIHtcbiAgICAgICAgaWYgKGFzc2VtYmx5TmFtZSAmJiBkb3ROZXRPYmplY3RJZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRm9yIGluc3RhbmNlIG1ldGhvZCBjYWxscywgYXNzZW1ibHlOYW1lIHNob3VsZCBiZSBudWxsLiBSZWNlaXZlZCAnXCIgKyBhc3NlbWJseU5hbWUgKyBcIicuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhc3luY0NhbGxJZCA9IG5leHRBc3luY0NhbGxJZCsrO1xuICAgICAgICB2YXIgcmVzdWx0UHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHBlbmRpbmdBc3luY0NhbGxzW2FzeW5jQ2FsbElkXSA9IHsgcmVzb2x2ZTogcmVzb2x2ZSwgcmVqZWN0OiByZWplY3QgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgYXJnc0pzb24gPSBKU09OLnN0cmluZ2lmeShhcmdzLCBhcmdSZXBsYWNlcik7XG4gICAgICAgICAgICBnZXRSZXF1aXJlZERpc3BhdGNoZXIoKS5iZWdpbkludm9rZURvdE5ldEZyb21KUyhhc3luY0NhbGxJZCwgYXNzZW1ibHlOYW1lLCBtZXRob2RJZGVudGlmaWVyLCBkb3ROZXRPYmplY3RJZCwgYXJnc0pzb24pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChleCkge1xuICAgICAgICAgICAgLy8gU3luY2hyb25vdXMgZmFpbHVyZVxuICAgICAgICAgICAgY29tcGxldGVQZW5kaW5nQ2FsbChhc3luY0NhbGxJZCwgZmFsc2UsIGV4KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0UHJvbWlzZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0UmVxdWlyZWREaXNwYXRjaGVyKCkge1xuICAgICAgICBpZiAoZG90TmV0RGlzcGF0Y2hlciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGRvdE5ldERpc3BhdGNoZXI7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyAuTkVUIGNhbGwgZGlzcGF0Y2hlciBoYXMgYmVlbiBzZXQuJyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNvbXBsZXRlUGVuZGluZ0NhbGwoYXN5bmNDYWxsSWQsIHN1Y2Nlc3MsIHJlc3VsdE9yRXJyb3IpIHtcbiAgICAgICAgaWYgKCFwZW5kaW5nQXN5bmNDYWxscy5oYXNPd25Qcm9wZXJ0eShhc3luY0NhbGxJZCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZXJlIGlzIG5vIHBlbmRpbmcgYXN5bmMgY2FsbCB3aXRoIElEIFwiICsgYXN5bmNDYWxsSWQgKyBcIi5cIik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFzeW5jQ2FsbCA9IHBlbmRpbmdBc3luY0NhbGxzW2FzeW5jQ2FsbElkXTtcbiAgICAgICAgZGVsZXRlIHBlbmRpbmdBc3luY0NhbGxzW2FzeW5jQ2FsbElkXTtcbiAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIGFzeW5jQ2FsbC5yZXNvbHZlKHJlc3VsdE9yRXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYXN5bmNDYWxsLnJlamVjdChyZXN1bHRPckVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWNlaXZlcyBpbmNvbWluZyBjYWxscyBmcm9tIC5ORVQgYW5kIGRpc3BhdGNoZXMgdGhlbSB0byBKYXZhU2NyaXB0LlxuICAgICAqL1xuICAgIERvdE5ldC5qc0NhbGxEaXNwYXRjaGVyID0ge1xuICAgICAgICAvKipcbiAgICAgICAgICogRmluZHMgdGhlIEphdmFTY3JpcHQgZnVuY3Rpb24gbWF0Y2hpbmcgdGhlIHNwZWNpZmllZCBpZGVudGlmaWVyLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gaWRlbnRpZmllciBJZGVudGlmaWVzIHRoZSBnbG9iYWxseS1yZWFjaGFibGUgZnVuY3Rpb24gdG8gYmUgcmV0dXJuZWQuXG4gICAgICAgICAqIEByZXR1cm5zIEEgRnVuY3Rpb24gaW5zdGFuY2UuXG4gICAgICAgICAqL1xuICAgICAgICBmaW5kSlNGdW5jdGlvbjogZmluZEpTRnVuY3Rpb24sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnZva2VzIHRoZSBzcGVjaWZpZWQgc3luY2hyb25vdXMgSmF2YVNjcmlwdCBmdW5jdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGlkZW50aWZpZXIgSWRlbnRpZmllcyB0aGUgZ2xvYmFsbHktcmVhY2hhYmxlIGZ1bmN0aW9uIHRvIGludm9rZS5cbiAgICAgICAgICogQHBhcmFtIGFyZ3NKc29uIEpTT04gcmVwcmVzZW50YXRpb24gb2YgYXJndW1lbnRzIHRvIGJlIHBhc3NlZCB0byB0aGUgZnVuY3Rpb24uXG4gICAgICAgICAqIEByZXR1cm5zIEpTT04gcmVwcmVzZW50YXRpb24gb2YgdGhlIGludm9jYXRpb24gcmVzdWx0LlxuICAgICAgICAgKi9cbiAgICAgICAgaW52b2tlSlNGcm9tRG90TmV0OiBmdW5jdGlvbiAoaWRlbnRpZmllciwgYXJnc0pzb24pIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBmaW5kSlNGdW5jdGlvbihpZGVudGlmaWVyKS5hcHBseShudWxsLCBwYXJzZUpzb25XaXRoUmV2aXZlcnMoYXJnc0pzb24pKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQgPT09IG51bGwgfHwgcmVzdWx0ID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICA/IG51bGxcbiAgICAgICAgICAgICAgICA6IEpTT04uc3RyaW5naWZ5KHJlc3VsdCwgYXJnUmVwbGFjZXIpO1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogSW52b2tlcyB0aGUgc3BlY2lmaWVkIHN5bmNocm9ub3VzIG9yIGFzeW5jaHJvbm91cyBKYXZhU2NyaXB0IGZ1bmN0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gYXN5bmNIYW5kbGUgQSB2YWx1ZSBpZGVudGlmeWluZyB0aGUgYXN5bmNocm9ub3VzIG9wZXJhdGlvbi4gVGhpcyB2YWx1ZSB3aWxsIGJlIHBhc3NlZCBiYWNrIGluIGEgbGF0ZXIgY2FsbCB0byBlbmRJbnZva2VKU0Zyb21Eb3ROZXQuXG4gICAgICAgICAqIEBwYXJhbSBpZGVudGlmaWVyIElkZW50aWZpZXMgdGhlIGdsb2JhbGx5LXJlYWNoYWJsZSBmdW5jdGlvbiB0byBpbnZva2UuXG4gICAgICAgICAqIEBwYXJhbSBhcmdzSnNvbiBKU09OIHJlcHJlc2VudGF0aW9uIG9mIGFyZ3VtZW50cyB0byBiZSBwYXNzZWQgdG8gdGhlIGZ1bmN0aW9uLlxuICAgICAgICAgKi9cbiAgICAgICAgYmVnaW5JbnZva2VKU0Zyb21Eb3ROZXQ6IGZ1bmN0aW9uIChhc3luY0hhbmRsZSwgaWRlbnRpZmllciwgYXJnc0pzb24pIHtcbiAgICAgICAgICAgIC8vIENvZXJjZSBzeW5jaHJvbm91cyBmdW5jdGlvbnMgaW50byBhc3luYyBvbmVzLCBwbHVzIHRyZWF0XG4gICAgICAgICAgICAvLyBzeW5jaHJvbm91cyBleGNlcHRpb25zIHRoZSBzYW1lIGFzIGFzeW5jIG9uZXNcbiAgICAgICAgICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3luY2hyb25vdXNSZXN1bHRPclByb21pc2UgPSBmaW5kSlNGdW5jdGlvbihpZGVudGlmaWVyKS5hcHBseShudWxsLCBwYXJzZUpzb25XaXRoUmV2aXZlcnMoYXJnc0pzb24pKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHN5bmNocm9ub3VzUmVzdWx0T3JQcm9taXNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gV2Ugb25seSBsaXN0ZW4gZm9yIGEgcmVzdWx0IGlmIHRoZSBjYWxsZXIgd2FudHMgdG8gYmUgbm90aWZpZWQgYWJvdXQgaXRcbiAgICAgICAgICAgIGlmIChhc3luY0hhbmRsZSkge1xuICAgICAgICAgICAgICAgIC8vIE9uIGNvbXBsZXRpb24sIGRpc3BhdGNoIHJlc3VsdCBiYWNrIHRvIC5ORVRcbiAgICAgICAgICAgICAgICAvLyBOb3QgdXNpbmcgXCJhd2FpdFwiIGJlY2F1c2UgaXQgY29kZWdlbnMgYSBsb3Qgb2YgYm9pbGVycGxhdGVcbiAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkgeyByZXR1cm4gZ2V0UmVxdWlyZWREaXNwYXRjaGVyKCkuZW5kSW52b2tlSlNGcm9tRG90TmV0KGFzeW5jSGFuZGxlLCB0cnVlLCBKU09OLnN0cmluZ2lmeShbYXN5bmNIYW5kbGUsIHRydWUsIHJlc3VsdF0sIGFyZ1JlcGxhY2VyKSk7IH0sIGZ1bmN0aW9uIChlcnJvcikgeyByZXR1cm4gZ2V0UmVxdWlyZWREaXNwYXRjaGVyKCkuZW5kSW52b2tlSlNGcm9tRG90TmV0KGFzeW5jSGFuZGxlLCBmYWxzZSwgSlNPTi5zdHJpbmdpZnkoW2FzeW5jSGFuZGxlLCBmYWxzZSwgZm9ybWF0RXJyb3IoZXJyb3IpXSkpOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlY2VpdmVzIG5vdGlmaWNhdGlvbiB0aGF0IGFuIGFzeW5jIGNhbGwgZnJvbSBKUyB0byAuTkVUIGhhcyBjb21wbGV0ZWQuXG4gICAgICAgICAqIEBwYXJhbSBhc3luY0NhbGxJZCBUaGUgaWRlbnRpZmllciBzdXBwbGllZCBpbiBhbiBlYXJsaWVyIGNhbGwgdG8gYmVnaW5JbnZva2VEb3ROZXRGcm9tSlMuXG4gICAgICAgICAqIEBwYXJhbSBzdWNjZXNzIEEgZmxhZyB0byBpbmRpY2F0ZSB3aGV0aGVyIHRoZSBvcGVyYXRpb24gY29tcGxldGVkIHN1Y2Nlc3NmdWxseS5cbiAgICAgICAgICogQHBhcmFtIHJlc3VsdE9yRXhjZXB0aW9uTWVzc2FnZSBFaXRoZXIgdGhlIG9wZXJhdGlvbiByZXN1bHQgb3IgYW4gZXJyb3IgbWVzc2FnZS5cbiAgICAgICAgICovXG4gICAgICAgIGVuZEludm9rZURvdE5ldEZyb21KUzogZnVuY3Rpb24gKGFzeW5jQ2FsbElkLCBzdWNjZXNzLCByZXN1bHRPckV4Y2VwdGlvbk1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHRPckVycm9yID0gc3VjY2VzcyA/IHJlc3VsdE9yRXhjZXB0aW9uTWVzc2FnZSA6IG5ldyBFcnJvcihyZXN1bHRPckV4Y2VwdGlvbk1lc3NhZ2UpO1xuICAgICAgICAgICAgY29tcGxldGVQZW5kaW5nQ2FsbChwYXJzZUludChhc3luY0NhbGxJZCksIHN1Y2Nlc3MsIHJlc3VsdE9yRXJyb3IpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBmdW5jdGlvbiBwYXJzZUpzb25XaXRoUmV2aXZlcnMoanNvbikge1xuICAgICAgICByZXR1cm4ganNvbiA/IEpTT04ucGFyc2UoanNvbiwgZnVuY3Rpb24gKGtleSwgaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgICAgICAvLyBJbnZva2UgZWFjaCByZXZpdmVyIGluIG9yZGVyLCBwYXNzaW5nIHRoZSBvdXRwdXQgZnJvbSB0aGUgcHJldmlvdXMgcmV2aXZlcixcbiAgICAgICAgICAgIC8vIHNvIHRoYXQgZWFjaCBvbmUgZ2V0cyBhIGNoYW5jZSB0byB0cmFuc2Zvcm0gdGhlIHZhbHVlXG4gICAgICAgICAgICByZXR1cm4ganNvblJldml2ZXJzLnJlZHVjZShmdW5jdGlvbiAobGF0ZXN0VmFsdWUsIHJldml2ZXIpIHsgcmV0dXJuIHJldml2ZXIoa2V5LCBsYXRlc3RWYWx1ZSk7IH0sIGluaXRpYWxWYWx1ZSk7XG4gICAgICAgIH0pIDogbnVsbDtcbiAgICB9XG4gICAgZnVuY3Rpb24gZm9ybWF0RXJyb3IoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvci5tZXNzYWdlICsgXCJcXG5cIiArIGVycm9yLnN0YWNrO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yID8gZXJyb3IudG9TdHJpbmcoKSA6ICdudWxsJztcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBmaW5kSlNGdW5jdGlvbihpZGVudGlmaWVyKSB7XG4gICAgICAgIGlmIChjYWNoZWRKU0Z1bmN0aW9ucy5oYXNPd25Qcm9wZXJ0eShpZGVudGlmaWVyKSkge1xuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZEpTRnVuY3Rpb25zW2lkZW50aWZpZXJdO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXN1bHQgPSB3aW5kb3c7XG4gICAgICAgIHZhciByZXN1bHRJZGVudGlmaWVyID0gJ3dpbmRvdyc7XG4gICAgICAgIHZhciBsYXN0U2VnbWVudFZhbHVlO1xuICAgICAgICBpZGVudGlmaWVyLnNwbGl0KCcuJykuZm9yRWFjaChmdW5jdGlvbiAoc2VnbWVudCkge1xuICAgICAgICAgICAgaWYgKHNlZ21lbnQgaW4gcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgbGFzdFNlZ21lbnRWYWx1ZSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHRbc2VnbWVudF07XG4gICAgICAgICAgICAgICAgcmVzdWx0SWRlbnRpZmllciArPSAnLicgKyBzZWdtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgJ1wiICsgc2VnbWVudCArIFwiJyBpbiAnXCIgKyByZXN1bHRJZGVudGlmaWVyICsgXCInLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmJpbmQobGFzdFNlZ21lbnRWYWx1ZSk7XG4gICAgICAgICAgICBjYWNoZWRKU0Z1bmN0aW9uc1tpZGVudGlmaWVyXSA9IHJlc3VsdDtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgdmFsdWUgJ1wiICsgcmVzdWx0SWRlbnRpZmllciArIFwiJyBpcyBub3QgYSBmdW5jdGlvbi5cIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIERvdE5ldE9iamVjdCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gRG90TmV0T2JqZWN0KF9pZCkge1xuICAgICAgICAgICAgdGhpcy5faWQgPSBfaWQ7XG4gICAgICAgIH1cbiAgICAgICAgRG90TmV0T2JqZWN0LnByb3RvdHlwZS5pbnZva2VNZXRob2QgPSBmdW5jdGlvbiAobWV0aG9kSWRlbnRpZmllcikge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgYXJnc1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpbnZva2VQb3NzaWJsZUluc3RhbmNlTWV0aG9kKG51bGwsIG1ldGhvZElkZW50aWZpZXIsIHRoaXMuX2lkLCBhcmdzKTtcbiAgICAgICAgfTtcbiAgICAgICAgRG90TmV0T2JqZWN0LnByb3RvdHlwZS5pbnZva2VNZXRob2RBc3luYyA9IGZ1bmN0aW9uIChtZXRob2RJZGVudGlmaWVyKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICBhcmdzW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGludm9rZVBvc3NpYmxlSW5zdGFuY2VNZXRob2RBc3luYyhudWxsLCBtZXRob2RJZGVudGlmaWVyLCB0aGlzLl9pZCwgYXJncyk7XG4gICAgICAgIH07XG4gICAgICAgIERvdE5ldE9iamVjdC5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBwcm9taXNlID0gaW52b2tlUG9zc2libGVJbnN0YW5jZU1ldGhvZEFzeW5jKG51bGwsICdfX0Rpc3Bvc2UnLCB0aGlzLl9pZCwgbnVsbCk7XG4gICAgICAgICAgICBwcm9taXNlLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikgeyByZXR1cm4gY29uc29sZS5lcnJvcihlcnJvcik7IH0pO1xuICAgICAgICB9O1xuICAgICAgICBEb3ROZXRPYmplY3QucHJvdG90eXBlLnNlcmlhbGl6ZUFzQXJnID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgX19kb3ROZXRPYmplY3Q6IHRoaXMuX2lkIH07XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBEb3ROZXRPYmplY3Q7XG4gICAgfSgpKTtcbiAgICB2YXIgZG90TmV0T2JqZWN0UmVmS2V5ID0gJ19fZG90TmV0T2JqZWN0JztcbiAgICBhdHRhY2hSZXZpdmVyKGZ1bmN0aW9uIHJldml2ZURvdE5ldE9iamVjdChrZXksIHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlLmhhc093blByb3BlcnR5KGRvdE5ldE9iamVjdFJlZktleSkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRG90TmV0T2JqZWN0KHZhbHVlLl9fZG90TmV0T2JqZWN0KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBVbnJlY29nbml6ZWQgLSBsZXQgYW5vdGhlciByZXZpdmVyIGhhbmRsZSBpdFxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSk7XG4gICAgZnVuY3Rpb24gYXJnUmVwbGFjZXIoa2V5LCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBEb3ROZXRPYmplY3QgPyB2YWx1ZS5zZXJpYWxpemVBc0FyZygpIDogdmFsdWU7XG4gICAgfVxufSkoRG90TmV0IHx8IChEb3ROZXQgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TWljcm9zb2Z0LkpTSW50ZXJvcC5qcy5tYXAiLCIvKlxuICogYmFzZTY0LWFycmF5YnVmZmVyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbmlrbGFzdmgvYmFzZTY0LWFycmF5YnVmZmVyXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEyIE5pa2xhcyB2b24gSGVydHplblxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICovXG4oZnVuY3Rpb24oKXtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIGNoYXJzID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCI7XG5cbiAgLy8gVXNlIGEgbG9va3VwIHRhYmxlIHRvIGZpbmQgdGhlIGluZGV4LlxuICB2YXIgbG9va3VwID0gbmV3IFVpbnQ4QXJyYXkoMjU2KTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykge1xuICAgIGxvb2t1cFtjaGFycy5jaGFyQ29kZUF0KGkpXSA9IGk7XG4gIH1cblxuICBleHBvcnRzLmVuY29kZSA9IGZ1bmN0aW9uKGFycmF5YnVmZmVyKSB7XG4gICAgdmFyIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpLFxuICAgIGksIGxlbiA9IGJ5dGVzLmxlbmd0aCwgYmFzZTY0ID0gXCJcIjtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrPTMpIHtcbiAgICAgIGJhc2U2NCArPSBjaGFyc1tieXRlc1tpXSA+PiAyXTtcbiAgICAgIGJhc2U2NCArPSBjaGFyc1soKGJ5dGVzW2ldICYgMykgPDwgNCkgfCAoYnl0ZXNbaSArIDFdID4+IDQpXTtcbiAgICAgIGJhc2U2NCArPSBjaGFyc1soKGJ5dGVzW2kgKyAxXSAmIDE1KSA8PCAyKSB8IChieXRlc1tpICsgMl0gPj4gNildO1xuICAgICAgYmFzZTY0ICs9IGNoYXJzW2J5dGVzW2kgKyAyXSAmIDYzXTtcbiAgICB9XG5cbiAgICBpZiAoKGxlbiAlIDMpID09PSAyKSB7XG4gICAgICBiYXNlNjQgPSBiYXNlNjQuc3Vic3RyaW5nKDAsIGJhc2U2NC5sZW5ndGggLSAxKSArIFwiPVwiO1xuICAgIH0gZWxzZSBpZiAobGVuICUgMyA9PT0gMSkge1xuICAgICAgYmFzZTY0ID0gYmFzZTY0LnN1YnN0cmluZygwLCBiYXNlNjQubGVuZ3RoIC0gMikgKyBcIj09XCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJhc2U2NDtcbiAgfTtcblxuICBleHBvcnRzLmRlY29kZSA9ICBmdW5jdGlvbihiYXNlNjQpIHtcbiAgICB2YXIgYnVmZmVyTGVuZ3RoID0gYmFzZTY0Lmxlbmd0aCAqIDAuNzUsXG4gICAgbGVuID0gYmFzZTY0Lmxlbmd0aCwgaSwgcCA9IDAsXG4gICAgZW5jb2RlZDEsIGVuY29kZWQyLCBlbmNvZGVkMywgZW5jb2RlZDQ7XG5cbiAgICBpZiAoYmFzZTY0W2Jhc2U2NC5sZW5ndGggLSAxXSA9PT0gXCI9XCIpIHtcbiAgICAgIGJ1ZmZlckxlbmd0aC0tO1xuICAgICAgaWYgKGJhc2U2NFtiYXNlNjQubGVuZ3RoIC0gMl0gPT09IFwiPVwiKSB7XG4gICAgICAgIGJ1ZmZlckxlbmd0aC0tO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBhcnJheWJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihidWZmZXJMZW5ndGgpLFxuICAgIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSs9NCkge1xuICAgICAgZW5jb2RlZDEgPSBsb29rdXBbYmFzZTY0LmNoYXJDb2RlQXQoaSldO1xuICAgICAgZW5jb2RlZDIgPSBsb29rdXBbYmFzZTY0LmNoYXJDb2RlQXQoaSsxKV07XG4gICAgICBlbmNvZGVkMyA9IGxvb2t1cFtiYXNlNjQuY2hhckNvZGVBdChpKzIpXTtcbiAgICAgIGVuY29kZWQ0ID0gbG9va3VwW2Jhc2U2NC5jaGFyQ29kZUF0KGkrMyldO1xuXG4gICAgICBieXRlc1twKytdID0gKGVuY29kZWQxIDw8IDIpIHwgKGVuY29kZWQyID4+IDQpO1xuICAgICAgYnl0ZXNbcCsrXSA9ICgoZW5jb2RlZDIgJiAxNSkgPDwgNCkgfCAoZW5jb2RlZDMgPj4gMik7XG4gICAgICBieXRlc1twKytdID0gKChlbmNvZGVkMyAmIDMpIDw8IDYpIHwgKGVuY29kZWQ0ICYgNjMpO1xuICAgIH1cblxuICAgIHJldHVybiBhcnJheWJ1ZmZlcjtcbiAgfTtcbn0pKCk7XG4iLCJpbXBvcnQgJ0Bkb3RuZXQvanNpbnRlcm9wL2Rpc3QvTWljcm9zb2Z0LkpTSW50ZXJvcCc7XHJcbmltcG9ydCAnQGJyb3dzZXJqcy9HbG9iYWxFeHBvcnRzJztcclxuaW1wb3J0IHsgT3V0T2ZQcm9jZXNzUmVuZGVyQmF0Y2ggfSBmcm9tICdAYnJvd3NlcmpzL1JlbmRlcmluZy9SZW5kZXJCYXRjaC9PdXRPZlByb2Nlc3NSZW5kZXJCYXRjaCc7XHJcbmltcG9ydCB7IHNldEV2ZW50RGlzcGF0Y2hlciB9IGZyb20gJ0Bicm93c2VyanMvUmVuZGVyaW5nL1JlbmRlcmVyRXZlbnREaXNwYXRjaGVyJztcclxuaW1wb3J0IHsgaW50ZXJuYWxGdW5jdGlvbnMgYXMgbmF2aWdhdGlvbk1hbmFnZXJGdW5jdGlvbnMgfSBmcm9tICdAYnJvd3NlcmpzL1NlcnZpY2VzL05hdmlnYXRpb25NYW5hZ2VyJztcclxuaW1wb3J0IHsgcmVuZGVyQmF0Y2ggfSBmcm9tICdAYnJvd3NlcmpzL1JlbmRlcmluZy9SZW5kZXJlcic7XHJcbmltcG9ydCB7IGRlY29kZSB9IGZyb20gJ2Jhc2U2NC1hcnJheWJ1ZmZlcic7XHJcbmltcG9ydCAqIGFzIGlwYyBmcm9tICcuL0lQQyc7XHJcblxyXG5mdW5jdGlvbiBib290KCkge1xyXG4gIHNldEV2ZW50RGlzcGF0Y2hlcigoZXZlbnREZXNjcmlwdG9yLCBldmVudEFyZ3MpID0+IERvdE5ldC5pbnZva2VNZXRob2RBc3luYygnV2ViV2luZG93LkJsYXpvcicsICdEaXNwYXRjaEV2ZW50JywgZXZlbnREZXNjcmlwdG9yLCBKU09OLnN0cmluZ2lmeShldmVudEFyZ3MpKSk7XHJcbiAgbmF2aWdhdGlvbk1hbmFnZXJGdW5jdGlvbnMubGlzdGVuRm9yTmF2aWdhdGlvbkV2ZW50cygodXJpOiBzdHJpbmcsIGludGVyY2VwdGVkOiBib29sZWFuKSA9PiB7XHJcbiAgICByZXR1cm4gRG90TmV0Lmludm9rZU1ldGhvZEFzeW5jKCdXZWJXaW5kb3cuQmxhem9yJywgJ05vdGlmeUxvY2F0aW9uQ2hhbmdlZCcsIHVyaSwgaW50ZXJjZXB0ZWQpO1xyXG4gIH0pO1xyXG5cclxuICAvLyBDb25maWd1cmUgdGhlIG1lY2hhbmlzbSBmb3IgSlM8LT5ORVQgY2FsbHNcclxuICBEb3ROZXQuYXR0YWNoRGlzcGF0Y2hlcih7XHJcbiAgICBiZWdpbkludm9rZURvdE5ldEZyb21KUzogKGNhbGxJZDogbnVtYmVyLCBhc3NlbWJseU5hbWU6IHN0cmluZyB8IG51bGwsIG1ldGhvZElkZW50aWZpZXI6IHN0cmluZywgZG90TmV0T2JqZWN0SWQ6IG51bWJlciB8IG51bGwsIGFyZ3NKc29uOiBzdHJpbmcpID0+IHtcclxuICAgICAgaXBjLnNlbmQoJ0JlZ2luSW52b2tlRG90TmV0RnJvbUpTJywgW2NhbGxJZCA/IGNhbGxJZC50b1N0cmluZygpIDogbnVsbCwgYXNzZW1ibHlOYW1lLCBtZXRob2RJZGVudGlmaWVyLCBkb3ROZXRPYmplY3RJZCB8fCAwLCBhcmdzSnNvbl0pO1xyXG4gICAgfSxcclxuICAgIGVuZEludm9rZUpTRnJvbURvdE5ldDogKGNhbGxJZDogbnVtYmVyLCBzdWNjZWVkZWQ6IGJvb2xlYW4sIHJlc3VsdE9yRXJyb3I6IGFueSkgPT4ge1xyXG4gICAgICBpcGMuc2VuZCgnRW5kSW52b2tlSlNGcm9tRG90TmV0JywgW2NhbGxJZCwgc3VjY2VlZGVkLCByZXN1bHRPckVycm9yXSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIG5hdmlnYXRpb25NYW5hZ2VyRnVuY3Rpb25zLmVuYWJsZU5hdmlnYXRpb25JbnRlcmNlcHRpb24oKTtcclxuXHJcbiAgaXBjLm9uKCdKUy5CZWdpbkludm9rZUpTJywgKGFzeW5jSGFuZGxlLCBpZGVudGlmaWVyLCBhcmdzSnNvbikgPT4ge1xyXG4gICAgRG90TmV0LmpzQ2FsbERpc3BhdGNoZXIuYmVnaW5JbnZva2VKU0Zyb21Eb3ROZXQoYXN5bmNIYW5kbGUsIGlkZW50aWZpZXIsIGFyZ3NKc29uKTtcclxuICB9KTtcclxuXHJcbiAgaXBjLm9uKCdKUy5FbmRJbnZva2VEb3ROZXQnLCAoY2FsbElkLCBzdWNjZXNzLCByZXN1bHRPckVycm9yKSA9PiB7XHJcbiAgICBEb3ROZXQuanNDYWxsRGlzcGF0Y2hlci5lbmRJbnZva2VEb3ROZXRGcm9tSlMoY2FsbElkLCBzdWNjZXNzLCByZXN1bHRPckVycm9yKTtcclxuICB9KTtcclxuXHJcbiAgaXBjLm9uKCdKUy5SZW5kZXJCYXRjaCcsIChyZW5kZXJlcklkLCBiYXRjaEJhc2U2NCkgPT4ge1xyXG4gICAgdmFyIGJhdGNoRGF0YSA9IG5ldyBVaW50OEFycmF5KGRlY29kZShiYXRjaEJhc2U2NCkpO1xyXG4gICAgcmVuZGVyQmF0Y2gocmVuZGVyZXJJZCwgbmV3IE91dE9mUHJvY2Vzc1JlbmRlckJhdGNoKGJhdGNoRGF0YSkpO1xyXG4gIH0pO1xyXG5cclxuICBpcGMub24oJ0pTLkVycm9yJywgKG1lc3NhZ2UpID0+IHtcclxuICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XHJcbiAgfSk7XHJcblxyXG4gIC8vIENvbmZpcm0gdGhhdCB0aGUgSlMgc2lkZSBpcyByZWFkeSBmb3IgdGhlIGFwcCB0byBzdGFydFxyXG4gIGlwYy5zZW5kKCdjb21wb25lbnRzOmluaXQnLCBbXHJcbiAgICBuYXZpZ2F0aW9uTWFuYWdlckZ1bmN0aW9ucy5nZXRMb2NhdGlvbkhyZWYoKS5yZXBsYWNlKC9cXC9pbmRleFxcLmh0bWwkLywgJycpLFxyXG4gICAgbmF2aWdhdGlvbk1hbmFnZXJGdW5jdGlvbnMuZ2V0QmFzZVVSSSgpXSk7XHJcbn1cclxuXHJcbmJvb3QoKTtcclxuIiwiaW50ZXJmYWNlIENhbGxiYWNrIHtcclxuICAgICguLi5hcmdzOiBhbnlbXSk6IHZvaWQ7XHJcbn1cclxuXHJcbmNvbnN0IHJlZ2lzdHJhdGlvbnMgPSB7fSBhcyB7IFtldmVudE5hbWU6IHN0cmluZ106IENhbGxiYWNrW10gfTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvbihldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IENhbGxiYWNrKTogdm9pZCB7XHJcbiAgICBpZiAoIShldmVudE5hbWUgaW4gcmVnaXN0cmF0aW9ucykpIHtcclxuICAgICAgICByZWdpc3RyYXRpb25zW2V2ZW50TmFtZV0gPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICByZWdpc3RyYXRpb25zW2V2ZW50TmFtZV0ucHVzaChjYWxsYmFjayk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvZmYoZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBDYWxsYmFjayk6IHZvaWQge1xyXG4gICAgY29uc3QgZ3JvdXAgPSByZWdpc3RyYXRpb25zW2V2ZW50TmFtZV07XHJcbiAgICBjb25zdCBpbmRleCA9IGdyb3VwLmluZGV4T2YoY2FsbGJhY2spO1xyXG4gICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgICBncm91cC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25jZShldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IENhbGxiYWNrKTogdm9pZCB7XHJcbiAgICBjb25zdCBjYWxsYmFja09uY2U6IENhbGxiYWNrID0gKC4uLmFyZ3M6IGFueVtdKSA9PiB7XHJcbiAgICAgICAgb2ZmKGV2ZW50TmFtZSwgY2FsbGJhY2tPbmNlKTtcclxuICAgICAgICBjYWxsYmFjay5hcHBseShudWxsLCBhcmdzKTtcclxuICAgIH07XHJcblxyXG4gICAgb24oZXZlbnROYW1lLCBjYWxsYmFja09uY2UpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2VuZChldmVudE5hbWU6IHN0cmluZywgYXJnczogYW55KTogdm9pZCB7XHJcbiAgICAod2luZG93IGFzIGFueSkuZXh0ZXJuYWwuc2VuZE1lc3NhZ2UoYGlwYzoke2V2ZW50TmFtZX0gJHtKU09OLnN0cmluZ2lmeShhcmdzKX1gKTtcclxufVxyXG5cclxuKHdpbmRvdyBhcyBhbnkpLmV4dGVybmFsLnJlY2VpdmVNZXNzYWdlKChtZXNzYWdlOiBzdHJpbmcpID0+IHtcclxuICAgIGNvbnN0IGNvbG9uUG9zID0gbWVzc2FnZS5pbmRleE9mKCc6Jyk7XHJcbiAgICBjb25zdCBldmVudE5hbWUgPSBtZXNzYWdlLnN1YnN0cmluZygwLCBjb2xvblBvcyk7XHJcbiAgICBjb25zdCBhcmdzSnNvbiA9IG1lc3NhZ2Uuc3Vic3RyKGNvbG9uUG9zICsgMSk7XHJcblxyXG4gICAgY29uc3QgZ3JvdXAgPSByZWdpc3RyYXRpb25zW2V2ZW50TmFtZV07XHJcbiAgICBpZiAoZ3JvdXApIHtcclxuICAgICAgICBjb25zdCBhcmdzOiBhbnlbXSA9IEpTT04ucGFyc2UoYXJnc0pzb24pO1xyXG4gICAgICAgIGdyb3VwLmZvckVhY2goY2FsbGJhY2sgPT4gY2FsbGJhY2suYXBwbHkobnVsbCwgYXJncykpO1xyXG4gICAgfVxyXG59KTtcclxuIiwiLy8gRXhwb3NlIGFuIGV4cG9ydCBjYWxsZWQgJ3BsYXRmb3JtJyBvZiB0aGUgaW50ZXJmYWNlIHR5cGUgJ1BsYXRmb3JtJyxcclxuLy8gc28gdGhhdCBjb25zdW1lcnMgY2FuIGJlIGFnbm9zdGljIGFib3V0IHdoaWNoIGltcGxlbWVudGF0aW9uIHRoZXkgdXNlLlxyXG4vLyBCYXNpYyBhbHRlcm5hdGl2ZSB0byBoYXZpbmcgYW4gYWN0dWFsIERJIGNvbnRhaW5lci5cclxuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICcuL1BsYXRmb3JtL1BsYXRmb3JtJztcclxuXHJcbmV4cG9ydCBsZXQgcGxhdGZvcm06IFBsYXRmb3JtO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFBsYXRmb3JtKHBsYXRmb3JtSW5zdGFuY2U6IFBsYXRmb3JtKSB7XHJcbiAgcGxhdGZvcm0gPSBwbGF0Zm9ybUluc3RhbmNlO1xyXG4gIHJldHVybiBwbGF0Zm9ybTtcclxufVxyXG4iLCJpbXBvcnQgeyBuYXZpZ2F0ZVRvLCBpbnRlcm5hbEZ1bmN0aW9ucyBhcyBuYXZpZ2F0aW9uTWFuYWdlckludGVybmFsRnVuY3Rpb25zIH0gZnJvbSAnLi9TZXJ2aWNlcy9OYXZpZ2F0aW9uTWFuYWdlcic7XHJcbmltcG9ydCB7IGF0dGFjaFJvb3RDb21wb25lbnRUb0VsZW1lbnQgfSBmcm9tICcuL1JlbmRlcmluZy9SZW5kZXJlcic7XHJcblxyXG4vLyBNYWtlIHRoZSBmb2xsb3dpbmcgQVBJcyBhdmFpbGFibGUgaW4gZ2xvYmFsIHNjb3BlIGZvciBpbnZvY2F0aW9uIGZyb20gSlNcclxud2luZG93WydCbGF6b3InXSA9IHtcclxuICBuYXZpZ2F0ZVRvLFxyXG5cclxuICBfaW50ZXJuYWw6IHtcclxuICAgIGF0dGFjaFJvb3RDb21wb25lbnRUb0VsZW1lbnQsXHJcbiAgICBuYXZpZ2F0aW9uTWFuYWdlcjogbmF2aWdhdGlvbk1hbmFnZXJJbnRlcm5hbEZ1bmN0aW9ucyxcclxuICB9LFxyXG59O1xyXG4iLCJpbXBvcnQgeyBSZW5kZXJCYXRjaCwgQXJyYXlCdWlsZGVyU2VnbWVudCwgUmVuZGVyVHJlZUVkaXQsIFJlbmRlclRyZWVGcmFtZSwgRWRpdFR5cGUsIEZyYW1lVHlwZSwgQXJyYXlWYWx1ZXMgfSBmcm9tICcuL1JlbmRlckJhdGNoL1JlbmRlckJhdGNoJztcclxuaW1wb3J0IHsgRXZlbnREZWxlZ2F0b3IgfSBmcm9tICcuL0V2ZW50RGVsZWdhdG9yJztcclxuaW1wb3J0IHsgRXZlbnRGb3JEb3ROZXQsIFVJRXZlbnRBcmdzLCBFdmVudEFyZ3NUeXBlIH0gZnJvbSAnLi9FdmVudEZvckRvdE5ldCc7XHJcbmltcG9ydCB7IExvZ2ljYWxFbGVtZW50LCBQZXJtdXRhdGlvbkxpc3RFbnRyeSwgdG9Mb2dpY2FsRWxlbWVudCwgaW5zZXJ0TG9naWNhbENoaWxkLCByZW1vdmVMb2dpY2FsQ2hpbGQsIGdldExvZ2ljYWxQYXJlbnQsIGdldExvZ2ljYWxDaGlsZCwgY3JlYXRlQW5kSW5zZXJ0TG9naWNhbENvbnRhaW5lciwgaXNTdmdFbGVtZW50LCBnZXRMb2dpY2FsQ2hpbGRyZW5BcnJheSwgZ2V0TG9naWNhbFNpYmxpbmdFbmQsIHBlcm11dGVMb2dpY2FsQ2hpbGRyZW4sIGdldENsb3Nlc3REb21FbGVtZW50IH0gZnJvbSAnLi9Mb2dpY2FsRWxlbWVudHMnO1xyXG5pbXBvcnQgeyBhcHBseUNhcHR1cmVJZFRvRWxlbWVudCB9IGZyb20gJy4vRWxlbWVudFJlZmVyZW5jZUNhcHR1cmUnO1xyXG5pbXBvcnQgeyBFdmVudEZpZWxkSW5mbyB9IGZyb20gJy4vRXZlbnRGaWVsZEluZm8nO1xyXG5pbXBvcnQgeyBkaXNwYXRjaEV2ZW50IH0gZnJvbSAnLi9SZW5kZXJlckV2ZW50RGlzcGF0Y2hlcic7XHJcbmltcG9ydCB7IGF0dGFjaFRvRXZlbnREZWxlZ2F0b3IgYXMgYXR0YWNoTmF2aWdhdGlvbk1hbmFnZXJUb0V2ZW50RGVsZWdhdG9yIH0gZnJvbSAnLi4vU2VydmljZXMvTmF2aWdhdGlvbk1hbmFnZXInO1xyXG5jb25zdCBzZWxlY3RWYWx1ZVByb3BuYW1lID0gJ19ibGF6b3JTZWxlY3RWYWx1ZSc7XHJcbmNvbnN0IHNoYXJlZFRlbXBsYXRlRWxlbUZvclBhcnNpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xyXG5jb25zdCBzaGFyZWRTdmdFbGVtRm9yUGFyc2luZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnZycpO1xyXG5jb25zdCBwcmV2ZW50RGVmYXVsdEV2ZW50czogeyBbZXZlbnRUeXBlOiBzdHJpbmddOiBib29sZWFuIH0gPSB7IHN1Ym1pdDogdHJ1ZSB9O1xyXG5jb25zdCByb290Q29tcG9uZW50c1BlbmRpbmdGaXJzdFJlbmRlcjogeyBbY29tcG9uZW50SWQ6IG51bWJlcl06IExvZ2ljYWxFbGVtZW50IH0gPSB7fTtcclxuY29uc3QgaW50ZXJuYWxBdHRyaWJ1dGVOYW1lUHJlZml4ID0gJ19faW50ZXJuYWxfJztcclxuY29uc3QgZXZlbnRQcmV2ZW50RGVmYXVsdEF0dHJpYnV0ZU5hbWVQcmVmaXggPSAncHJldmVudERlZmF1bHRfJztcclxuY29uc3QgZXZlbnRTdG9wUHJvcGFnYXRpb25BdHRyaWJ1dGVOYW1lUHJlZml4ID0gJ3N0b3BQcm9wYWdhdGlvbl8nO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJyb3dzZXJSZW5kZXJlciB7XHJcbiAgcHJpdmF0ZSBldmVudERlbGVnYXRvcjogRXZlbnREZWxlZ2F0b3I7XHJcblxyXG4gIHByaXZhdGUgY2hpbGRDb21wb25lbnRMb2NhdGlvbnM6IHsgW2NvbXBvbmVudElkOiBudW1iZXJdOiBMb2dpY2FsRWxlbWVudCB9ID0ge307XHJcblxyXG4gIHByaXZhdGUgYnJvd3NlclJlbmRlcmVySWQ6IG51bWJlcjtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKGJyb3dzZXJSZW5kZXJlcklkOiBudW1iZXIpIHtcclxuICAgIHRoaXMuYnJvd3NlclJlbmRlcmVySWQgPSBicm93c2VyUmVuZGVyZXJJZDtcclxuICAgIHRoaXMuZXZlbnREZWxlZ2F0b3IgPSBuZXcgRXZlbnREZWxlZ2F0b3IoKGV2ZW50LCBldmVudEhhbmRsZXJJZCwgZXZlbnRBcmdzLCBldmVudEZpZWxkSW5mbykgPT4ge1xyXG4gICAgICByYWlzZUV2ZW50KGV2ZW50LCB0aGlzLmJyb3dzZXJSZW5kZXJlcklkLCBldmVudEhhbmRsZXJJZCwgZXZlbnRBcmdzLCBldmVudEZpZWxkSW5mbyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBXZSBkb24ndCB5ZXQga25vdyB3aGV0aGVyIG9yIG5vdCBuYXZpZ2F0aW9uIGludGVyY2VwdGlvbiB3aWxsIGJlIGVuYWJsZWQsIGJ1dCBpbiBjYXNlIGl0IHdpbGwgYmUsXHJcbiAgICAvLyB3ZSB3aXJlIHVwIHRoZSBuYXZpZ2F0aW9uIG1hbmFnZXIgdG8gdGhlIGV2ZW50IGRlbGVnYXRvciBzbyBpdCBoYXMgdGhlIG9wdGlvbiB0byBwYXJ0aWNpcGF0ZVxyXG4gICAgLy8gaW4gdGhlIHN5bnRoZXRpYyBldmVudCBidWJibGluZyBwcm9jZXNzIGxhdGVyXHJcbiAgICBhdHRhY2hOYXZpZ2F0aW9uTWFuYWdlclRvRXZlbnREZWxlZ2F0b3IodGhpcy5ldmVudERlbGVnYXRvcik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXR0YWNoUm9vdENvbXBvbmVudFRvTG9naWNhbEVsZW1lbnQoY29tcG9uZW50SWQ6IG51bWJlciwgZWxlbWVudDogTG9naWNhbEVsZW1lbnQpOiB2b2lkIHtcclxuICAgIHRoaXMuYXR0YWNoQ29tcG9uZW50VG9FbGVtZW50KGNvbXBvbmVudElkLCBlbGVtZW50KTtcclxuICAgIHJvb3RDb21wb25lbnRzUGVuZGluZ0ZpcnN0UmVuZGVyW2NvbXBvbmVudElkXSA9IGVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdXBkYXRlQ29tcG9uZW50KGJhdGNoOiBSZW5kZXJCYXRjaCwgY29tcG9uZW50SWQ6IG51bWJlciwgZWRpdHM6IEFycmF5QnVpbGRlclNlZ21lbnQ8UmVuZGVyVHJlZUVkaXQ+LCByZWZlcmVuY2VGcmFtZXM6IEFycmF5VmFsdWVzPFJlbmRlclRyZWVGcmFtZT4pOiB2b2lkIHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmNoaWxkQ29tcG9uZW50TG9jYXRpb25zW2NvbXBvbmVudElkXTtcclxuICAgIGlmICghZWxlbWVudCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIGVsZW1lbnQgaXMgY3VycmVudGx5IGFzc29jaWF0ZWQgd2l0aCBjb21wb25lbnQgJHtjb21wb25lbnRJZH1gKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBPbiB0aGUgZmlyc3QgcmVuZGVyIGZvciBlYWNoIHJvb3QgY29tcG9uZW50LCBjbGVhciBhbnkgZXhpc3RpbmcgY29udGVudCAoZS5nLiwgcHJlcmVuZGVyZWQpXHJcbiAgICBjb25zdCByb290RWxlbWVudFRvQ2xlYXIgPSByb290Q29tcG9uZW50c1BlbmRpbmdGaXJzdFJlbmRlcltjb21wb25lbnRJZF07XHJcbiAgICBpZiAocm9vdEVsZW1lbnRUb0NsZWFyKSB7XHJcbiAgICAgIGNvbnN0IHJvb3RFbGVtZW50VG9DbGVhckVuZCA9IGdldExvZ2ljYWxTaWJsaW5nRW5kKHJvb3RFbGVtZW50VG9DbGVhcik7XHJcbiAgICAgIGRlbGV0ZSByb290Q29tcG9uZW50c1BlbmRpbmdGaXJzdFJlbmRlcltjb21wb25lbnRJZF07XHJcblxyXG4gICAgICBpZiAoIXJvb3RFbGVtZW50VG9DbGVhckVuZCkge1xyXG4gICAgICAgIGNsZWFyRWxlbWVudChyb290RWxlbWVudFRvQ2xlYXIgYXMgdW5rbm93biBhcyBFbGVtZW50KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjbGVhckJldHdlZW4ocm9vdEVsZW1lbnRUb0NsZWFyIGFzIHVua25vd24gYXMgTm9kZSwgcm9vdEVsZW1lbnRUb0NsZWFyRW5kIGFzIHVua25vd24gYXMgQ29tbWVudCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvd25lckRvY3VtZW50ID0gZ2V0Q2xvc2VzdERvbUVsZW1lbnQoZWxlbWVudCkub3duZXJEb2N1bWVudDtcclxuICAgIGNvbnN0IGFjdGl2ZUVsZW1lbnRCZWZvcmUgPSBvd25lckRvY3VtZW50ICYmIG93bmVyRG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcclxuXHJcbiAgICB0aGlzLmFwcGx5RWRpdHMoYmF0Y2gsIGNvbXBvbmVudElkLCBlbGVtZW50LCAwLCBlZGl0cywgcmVmZXJlbmNlRnJhbWVzKTtcclxuXHJcbiAgICAvLyBUcnkgdG8gcmVzdG9yZSBmb2N1cyBpbiBjYXNlIGl0IHdhcyBsb3N0IGR1ZSB0byBhbiBlbGVtZW50IG1vdmVcclxuICAgIGlmICgoYWN0aXZlRWxlbWVudEJlZm9yZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSAmJiBvd25lckRvY3VtZW50ICYmIG93bmVyRG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gYWN0aXZlRWxlbWVudEJlZm9yZSkge1xyXG4gICAgICBhY3RpdmVFbGVtZW50QmVmb3JlLmZvY3VzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGlzcG9zZUNvbXBvbmVudChjb21wb25lbnRJZDogbnVtYmVyKSB7XHJcbiAgICBkZWxldGUgdGhpcy5jaGlsZENvbXBvbmVudExvY2F0aW9uc1tjb21wb25lbnRJZF07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGlzcG9zZUV2ZW50SGFuZGxlcihldmVudEhhbmRsZXJJZDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmV2ZW50RGVsZWdhdG9yLnJlbW92ZUxpc3RlbmVyKGV2ZW50SGFuZGxlcklkKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXR0YWNoQ29tcG9uZW50VG9FbGVtZW50KGNvbXBvbmVudElkOiBudW1iZXIsIGVsZW1lbnQ6IExvZ2ljYWxFbGVtZW50KSB7XHJcbiAgICB0aGlzLmNoaWxkQ29tcG9uZW50TG9jYXRpb25zW2NvbXBvbmVudElkXSA9IGVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFwcGx5RWRpdHMoYmF0Y2g6IFJlbmRlckJhdGNoLCBjb21wb25lbnRJZDogbnVtYmVyLCBwYXJlbnQ6IExvZ2ljYWxFbGVtZW50LCBjaGlsZEluZGV4OiBudW1iZXIsIGVkaXRzOiBBcnJheUJ1aWxkZXJTZWdtZW50PFJlbmRlclRyZWVFZGl0PiwgcmVmZXJlbmNlRnJhbWVzOiBBcnJheVZhbHVlczxSZW5kZXJUcmVlRnJhbWU+KSB7XHJcbiAgICBsZXQgY3VycmVudERlcHRoID0gMDtcclxuICAgIGxldCBjaGlsZEluZGV4QXRDdXJyZW50RGVwdGggPSBjaGlsZEluZGV4O1xyXG4gICAgbGV0IHBlcm11dGF0aW9uTGlzdDogUGVybXV0YXRpb25MaXN0RW50cnlbXSB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICBjb25zdCBhcnJheUJ1aWxkZXJTZWdtZW50UmVhZGVyID0gYmF0Y2guYXJyYXlCdWlsZGVyU2VnbWVudFJlYWRlcjtcclxuICAgIGNvbnN0IGVkaXRSZWFkZXIgPSBiYXRjaC5lZGl0UmVhZGVyO1xyXG4gICAgY29uc3QgZnJhbWVSZWFkZXIgPSBiYXRjaC5mcmFtZVJlYWRlcjtcclxuICAgIGNvbnN0IGVkaXRzVmFsdWVzID0gYXJyYXlCdWlsZGVyU2VnbWVudFJlYWRlci52YWx1ZXMoZWRpdHMpO1xyXG4gICAgY29uc3QgZWRpdHNPZmZzZXQgPSBhcnJheUJ1aWxkZXJTZWdtZW50UmVhZGVyLm9mZnNldChlZGl0cyk7XHJcbiAgICBjb25zdCBlZGl0c0xlbmd0aCA9IGFycmF5QnVpbGRlclNlZ21lbnRSZWFkZXIuY291bnQoZWRpdHMpO1xyXG4gICAgY29uc3QgbWF4RWRpdEluZGV4RXhjbCA9IGVkaXRzT2Zmc2V0ICsgZWRpdHNMZW5ndGg7XHJcblxyXG4gICAgZm9yIChsZXQgZWRpdEluZGV4ID0gZWRpdHNPZmZzZXQ7IGVkaXRJbmRleCA8IG1heEVkaXRJbmRleEV4Y2w7IGVkaXRJbmRleCsrKSB7XHJcbiAgICAgIGNvbnN0IGVkaXQgPSBiYXRjaC5kaWZmUmVhZGVyLmVkaXRzRW50cnkoZWRpdHNWYWx1ZXMsIGVkaXRJbmRleCk7XHJcbiAgICAgIGNvbnN0IGVkaXRUeXBlID0gZWRpdFJlYWRlci5lZGl0VHlwZShlZGl0KTtcclxuICAgICAgc3dpdGNoIChlZGl0VHlwZSkge1xyXG4gICAgICAgIGNhc2UgRWRpdFR5cGUucHJlcGVuZEZyYW1lOiB7XHJcbiAgICAgICAgICBjb25zdCBmcmFtZUluZGV4ID0gZWRpdFJlYWRlci5uZXdUcmVlSW5kZXgoZWRpdCk7XHJcbiAgICAgICAgICBjb25zdCBmcmFtZSA9IGJhdGNoLnJlZmVyZW5jZUZyYW1lc0VudHJ5KHJlZmVyZW5jZUZyYW1lcywgZnJhbWVJbmRleCk7XHJcbiAgICAgICAgICBjb25zdCBzaWJsaW5nSW5kZXggPSBlZGl0UmVhZGVyLnNpYmxpbmdJbmRleChlZGl0KTtcclxuICAgICAgICAgIHRoaXMuaW5zZXJ0RnJhbWUoYmF0Y2gsIGNvbXBvbmVudElkLCBwYXJlbnQsIGNoaWxkSW5kZXhBdEN1cnJlbnREZXB0aCArIHNpYmxpbmdJbmRleCwgcmVmZXJlbmNlRnJhbWVzLCBmcmFtZSwgZnJhbWVJbmRleCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSBFZGl0VHlwZS5yZW1vdmVGcmFtZToge1xyXG4gICAgICAgICAgY29uc3Qgc2libGluZ0luZGV4ID0gZWRpdFJlYWRlci5zaWJsaW5nSW5kZXgoZWRpdCk7XHJcbiAgICAgICAgICByZW1vdmVMb2dpY2FsQ2hpbGQocGFyZW50LCBjaGlsZEluZGV4QXRDdXJyZW50RGVwdGggKyBzaWJsaW5nSW5kZXgpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgRWRpdFR5cGUuc2V0QXR0cmlidXRlOiB7XHJcbiAgICAgICAgICBjb25zdCBmcmFtZUluZGV4ID0gZWRpdFJlYWRlci5uZXdUcmVlSW5kZXgoZWRpdCk7XHJcbiAgICAgICAgICBjb25zdCBmcmFtZSA9IGJhdGNoLnJlZmVyZW5jZUZyYW1lc0VudHJ5KHJlZmVyZW5jZUZyYW1lcywgZnJhbWVJbmRleCk7XHJcbiAgICAgICAgICBjb25zdCBzaWJsaW5nSW5kZXggPSBlZGl0UmVhZGVyLnNpYmxpbmdJbmRleChlZGl0KTtcclxuICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBnZXRMb2dpY2FsQ2hpbGQocGFyZW50LCBjaGlsZEluZGV4QXRDdXJyZW50RGVwdGggKyBzaWJsaW5nSW5kZXgpO1xyXG4gICAgICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwbHlBdHRyaWJ1dGUoYmF0Y2gsIGNvbXBvbmVudElkLCBlbGVtZW50LCBmcmFtZSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBzZXQgYXR0cmlidXRlIG9uIG5vbi1lbGVtZW50IGNoaWxkJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSBFZGl0VHlwZS5yZW1vdmVBdHRyaWJ1dGU6IHtcclxuICAgICAgICAgIC8vIE5vdGUgdGhhdCB3ZSBkb24ndCBoYXZlIHRvIGRpc3Bvc2UgdGhlIGluZm8gd2UgdHJhY2sgYWJvdXQgZXZlbnQgaGFuZGxlcnMgaGVyZSwgYmVjYXVzZSB0aGVcclxuICAgICAgICAgIC8vIGRpc3Bvc2VkIGV2ZW50IGhhbmRsZXIgSURzIGFyZSBkZWxpdmVyZWQgc2VwYXJhdGVseSAoaW4gdGhlICdkaXNwb3NlZEV2ZW50SGFuZGxlcklkcycgYXJyYXkpXHJcbiAgICAgICAgICBjb25zdCBzaWJsaW5nSW5kZXggPSBlZGl0UmVhZGVyLnNpYmxpbmdJbmRleChlZGl0KTtcclxuICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBnZXRMb2dpY2FsQ2hpbGQocGFyZW50LCBjaGlsZEluZGV4QXRDdXJyZW50RGVwdGggKyBzaWJsaW5nSW5kZXgpO1xyXG4gICAgICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgICAgICBjb25zdCBhdHRyaWJ1dGVOYW1lID0gZWRpdFJlYWRlci5yZW1vdmVkQXR0cmlidXRlTmFtZShlZGl0KSE7XHJcbiAgICAgICAgICAgIC8vIEZpcnN0IHRyeSB0byByZW1vdmUgYW55IHNwZWNpYWwgcHJvcGVydHkgd2UgdXNlIGZvciB0aGlzIGF0dHJpYnV0ZVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMudHJ5QXBwbHlTcGVjaWFsUHJvcGVydHkoYmF0Y2gsIGVsZW1lbnQsIGF0dHJpYnV0ZU5hbWUsIG51bGwpKSB7XHJcbiAgICAgICAgICAgICAgLy8gSWYgdGhhdCdzIG5vdCBhcHBsaWNhYmxlLCBpdCdzIGEgcmVndWxhciBET00gYXR0cmlidXRlIHNvIHJlbW92ZSB0aGF0XHJcbiAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHJlbW92ZSBhdHRyaWJ1dGUgZnJvbSBub24tZWxlbWVudCBjaGlsZCcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgRWRpdFR5cGUudXBkYXRlVGV4dDoge1xyXG4gICAgICAgICAgY29uc3QgZnJhbWVJbmRleCA9IGVkaXRSZWFkZXIubmV3VHJlZUluZGV4KGVkaXQpO1xyXG4gICAgICAgICAgY29uc3QgZnJhbWUgPSBiYXRjaC5yZWZlcmVuY2VGcmFtZXNFbnRyeShyZWZlcmVuY2VGcmFtZXMsIGZyYW1lSW5kZXgpO1xyXG4gICAgICAgICAgY29uc3Qgc2libGluZ0luZGV4ID0gZWRpdFJlYWRlci5zaWJsaW5nSW5kZXgoZWRpdCk7XHJcbiAgICAgICAgICBjb25zdCB0ZXh0Tm9kZSA9IGdldExvZ2ljYWxDaGlsZChwYXJlbnQsIGNoaWxkSW5kZXhBdEN1cnJlbnREZXB0aCArIHNpYmxpbmdJbmRleCk7XHJcbiAgICAgICAgICBpZiAodGV4dE5vZGUgaW5zdGFuY2VvZiBUZXh0KSB7XHJcbiAgICAgICAgICAgIHRleHROb2RlLnRleHRDb250ZW50ID0gZnJhbWVSZWFkZXIudGV4dENvbnRlbnQoZnJhbWUpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3Qgc2V0IHRleHQgY29udGVudCBvbiBub24tdGV4dCBjaGlsZCcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgRWRpdFR5cGUudXBkYXRlTWFya3VwOiB7XHJcbiAgICAgICAgICBjb25zdCBmcmFtZUluZGV4ID0gZWRpdFJlYWRlci5uZXdUcmVlSW5kZXgoZWRpdCk7XHJcbiAgICAgICAgICBjb25zdCBmcmFtZSA9IGJhdGNoLnJlZmVyZW5jZUZyYW1lc0VudHJ5KHJlZmVyZW5jZUZyYW1lcywgZnJhbWVJbmRleCk7XHJcbiAgICAgICAgICBjb25zdCBzaWJsaW5nSW5kZXggPSBlZGl0UmVhZGVyLnNpYmxpbmdJbmRleChlZGl0KTtcclxuICAgICAgICAgIHJlbW92ZUxvZ2ljYWxDaGlsZChwYXJlbnQsIGNoaWxkSW5kZXhBdEN1cnJlbnREZXB0aCArIHNpYmxpbmdJbmRleCk7XHJcbiAgICAgICAgICB0aGlzLmluc2VydE1hcmt1cChiYXRjaCwgcGFyZW50LCBjaGlsZEluZGV4QXRDdXJyZW50RGVwdGggKyBzaWJsaW5nSW5kZXgsIGZyYW1lKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlIEVkaXRUeXBlLnN0ZXBJbjoge1xyXG4gICAgICAgICAgY29uc3Qgc2libGluZ0luZGV4ID0gZWRpdFJlYWRlci5zaWJsaW5nSW5kZXgoZWRpdCk7XHJcbiAgICAgICAgICBwYXJlbnQgPSBnZXRMb2dpY2FsQ2hpbGQocGFyZW50LCBjaGlsZEluZGV4QXRDdXJyZW50RGVwdGggKyBzaWJsaW5nSW5kZXgpO1xyXG4gICAgICAgICAgY3VycmVudERlcHRoKys7XHJcbiAgICAgICAgICBjaGlsZEluZGV4QXRDdXJyZW50RGVwdGggPSAwO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgRWRpdFR5cGUuc3RlcE91dDoge1xyXG4gICAgICAgICAgcGFyZW50ID0gZ2V0TG9naWNhbFBhcmVudChwYXJlbnQpITtcclxuICAgICAgICAgIGN1cnJlbnREZXB0aC0tO1xyXG4gICAgICAgICAgY2hpbGRJbmRleEF0Q3VycmVudERlcHRoID0gY3VycmVudERlcHRoID09PSAwID8gY2hpbGRJbmRleCA6IDA7IC8vIFRoZSBjaGlsZEluZGV4IGlzIG9ubHkgZXZlciBub256ZXJvIGF0IHplcm8gZGVwdGhcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlIEVkaXRUeXBlLnBlcm11dGF0aW9uTGlzdEVudHJ5OiB7XHJcbiAgICAgICAgICBwZXJtdXRhdGlvbkxpc3QgPSBwZXJtdXRhdGlvbkxpc3QgfHwgW107XHJcbiAgICAgICAgICBwZXJtdXRhdGlvbkxpc3QucHVzaCh7XHJcbiAgICAgICAgICAgIGZyb21TaWJsaW5nSW5kZXg6IGNoaWxkSW5kZXhBdEN1cnJlbnREZXB0aCArIGVkaXRSZWFkZXIuc2libGluZ0luZGV4KGVkaXQpLFxyXG4gICAgICAgICAgICB0b1NpYmxpbmdJbmRleDogY2hpbGRJbmRleEF0Q3VycmVudERlcHRoICsgZWRpdFJlYWRlci5tb3ZlVG9TaWJsaW5nSW5kZXgoZWRpdCksXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlIEVkaXRUeXBlLnBlcm11dGF0aW9uTGlzdEVuZDoge1xyXG4gICAgICAgICAgcGVybXV0ZUxvZ2ljYWxDaGlsZHJlbihwYXJlbnQsIHBlcm11dGF0aW9uTGlzdCEpO1xyXG4gICAgICAgICAgcGVybXV0YXRpb25MaXN0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICAgIGNvbnN0IHVua25vd25UeXBlOiBuZXZlciA9IGVkaXRUeXBlOyAvLyBDb21waWxlLXRpbWUgdmVyaWZpY2F0aW9uIHRoYXQgdGhlIHN3aXRjaCB3YXMgZXhoYXVzdGl2ZVxyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGVkaXQgdHlwZTogJHt1bmtub3duVHlwZX1gKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5zZXJ0RnJhbWUoYmF0Y2g6IFJlbmRlckJhdGNoLCBjb21wb25lbnRJZDogbnVtYmVyLCBwYXJlbnQ6IExvZ2ljYWxFbGVtZW50LCBjaGlsZEluZGV4OiBudW1iZXIsIGZyYW1lczogQXJyYXlWYWx1ZXM8UmVuZGVyVHJlZUZyYW1lPiwgZnJhbWU6IFJlbmRlclRyZWVGcmFtZSwgZnJhbWVJbmRleDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIGNvbnN0IGZyYW1lUmVhZGVyID0gYmF0Y2guZnJhbWVSZWFkZXI7XHJcbiAgICBjb25zdCBmcmFtZVR5cGUgPSBmcmFtZVJlYWRlci5mcmFtZVR5cGUoZnJhbWUpO1xyXG4gICAgc3dpdGNoIChmcmFtZVR5cGUpIHtcclxuICAgICAgY2FzZSBGcmFtZVR5cGUuZWxlbWVudDpcclxuICAgICAgICB0aGlzLmluc2VydEVsZW1lbnQoYmF0Y2gsIGNvbXBvbmVudElkLCBwYXJlbnQsIGNoaWxkSW5kZXgsIGZyYW1lcywgZnJhbWUsIGZyYW1lSW5kZXgpO1xyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgICBjYXNlIEZyYW1lVHlwZS50ZXh0OlxyXG4gICAgICAgIHRoaXMuaW5zZXJ0VGV4dChiYXRjaCwgcGFyZW50LCBjaGlsZEluZGV4LCBmcmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgIGNhc2UgRnJhbWVUeXBlLmF0dHJpYnV0ZTpcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0dHJpYnV0ZSBmcmFtZXMgc2hvdWxkIG9ubHkgYmUgcHJlc2VudCBhcyBsZWFkaW5nIGNoaWxkcmVuIG9mIGVsZW1lbnQgZnJhbWVzLicpO1xyXG4gICAgICBjYXNlIEZyYW1lVHlwZS5jb21wb25lbnQ6XHJcbiAgICAgICAgdGhpcy5pbnNlcnRDb21wb25lbnQoYmF0Y2gsIHBhcmVudCwgY2hpbGRJbmRleCwgZnJhbWUpO1xyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgICBjYXNlIEZyYW1lVHlwZS5yZWdpb246XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zZXJ0RnJhbWVSYW5nZShiYXRjaCwgY29tcG9uZW50SWQsIHBhcmVudCwgY2hpbGRJbmRleCwgZnJhbWVzLCBmcmFtZUluZGV4ICsgMSwgZnJhbWVJbmRleCArIGZyYW1lUmVhZGVyLnN1YnRyZWVMZW5ndGgoZnJhbWUpKTtcclxuICAgICAgY2FzZSBGcmFtZVR5cGUuZWxlbWVudFJlZmVyZW5jZUNhcHR1cmU6XHJcbiAgICAgICAgaWYgKHBhcmVudCBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcclxuICAgICAgICAgIGFwcGx5Q2FwdHVyZUlkVG9FbGVtZW50KHBhcmVudCwgZnJhbWVSZWFkZXIuZWxlbWVudFJlZmVyZW5jZUNhcHR1cmVJZChmcmFtZSkhKTtcclxuICAgICAgICAgIHJldHVybiAwOyAvLyBBIFwiY2FwdHVyZVwiIGlzIGEgY2hpbGQgaW4gdGhlIGRpZmYsIGJ1dCBoYXMgbm8gbm9kZSBpbiB0aGUgRE9NXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUmVmZXJlbmNlIGNhcHR1cmUgZnJhbWVzIGNhbiBvbmx5IGJlIGNoaWxkcmVuIG9mIGVsZW1lbnQgZnJhbWVzLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgY2FzZSBGcmFtZVR5cGUubWFya3VwOlxyXG4gICAgICAgIHRoaXMuaW5zZXJ0TWFya3VwKGJhdGNoLCBwYXJlbnQsIGNoaWxkSW5kZXgsIGZyYW1lKTtcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb25zdCB1bmtub3duVHlwZTogbmV2ZXIgPSBmcmFtZVR5cGU7IC8vIENvbXBpbGUtdGltZSB2ZXJpZmljYXRpb24gdGhhdCB0aGUgc3dpdGNoIHdhcyBleGhhdXN0aXZlXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGZyYW1lIHR5cGU6ICR7dW5rbm93blR5cGV9YCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluc2VydEVsZW1lbnQoYmF0Y2g6IFJlbmRlckJhdGNoLCBjb21wb25lbnRJZDogbnVtYmVyLCBwYXJlbnQ6IExvZ2ljYWxFbGVtZW50LCBjaGlsZEluZGV4OiBudW1iZXIsIGZyYW1lczogQXJyYXlWYWx1ZXM8UmVuZGVyVHJlZUZyYW1lPiwgZnJhbWU6IFJlbmRlclRyZWVGcmFtZSwgZnJhbWVJbmRleDogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBmcmFtZVJlYWRlciA9IGJhdGNoLmZyYW1lUmVhZGVyO1xyXG4gICAgY29uc3QgdGFnTmFtZSA9IGZyYW1lUmVhZGVyLmVsZW1lbnROYW1lKGZyYW1lKSE7XHJcbiAgICBjb25zdCBuZXdEb21FbGVtZW50UmF3ID0gdGFnTmFtZSA9PT0gJ3N2ZycgfHwgaXNTdmdFbGVtZW50KHBhcmVudCkgP1xyXG4gICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgdGFnTmFtZSkgOlxyXG4gICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xyXG4gICAgY29uc3QgbmV3RWxlbWVudCA9IHRvTG9naWNhbEVsZW1lbnQobmV3RG9tRWxlbWVudFJhdyk7XHJcbiAgICBpbnNlcnRMb2dpY2FsQ2hpbGQobmV3RG9tRWxlbWVudFJhdywgcGFyZW50LCBjaGlsZEluZGV4KTtcclxuXHJcbiAgICAvLyBBcHBseSBhdHRyaWJ1dGVzXHJcbiAgICBjb25zdCBkZXNjZW5kYW50c0VuZEluZGV4RXhjbCA9IGZyYW1lSW5kZXggKyBmcmFtZVJlYWRlci5zdWJ0cmVlTGVuZ3RoKGZyYW1lKTtcclxuICAgIGZvciAobGV0IGRlc2NlbmRhbnRJbmRleCA9IGZyYW1lSW5kZXggKyAxOyBkZXNjZW5kYW50SW5kZXggPCBkZXNjZW5kYW50c0VuZEluZGV4RXhjbDsgZGVzY2VuZGFudEluZGV4KyspIHtcclxuICAgICAgY29uc3QgZGVzY2VuZGFudEZyYW1lID0gYmF0Y2gucmVmZXJlbmNlRnJhbWVzRW50cnkoZnJhbWVzLCBkZXNjZW5kYW50SW5kZXgpO1xyXG4gICAgICBpZiAoZnJhbWVSZWFkZXIuZnJhbWVUeXBlKGRlc2NlbmRhbnRGcmFtZSkgPT09IEZyYW1lVHlwZS5hdHRyaWJ1dGUpIHtcclxuICAgICAgICB0aGlzLmFwcGx5QXR0cmlidXRlKGJhdGNoLCBjb21wb25lbnRJZCwgbmV3RG9tRWxlbWVudFJhdywgZGVzY2VuZGFudEZyYW1lKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBBcyBzb29uIGFzIHdlIHNlZSBhIG5vbi1hdHRyaWJ1dGUgY2hpbGQsIGFsbCB0aGUgc3Vic2VxdWVudCBjaGlsZCBmcmFtZXMgYXJlXHJcbiAgICAgICAgLy8gbm90IGF0dHJpYnV0ZXMsIHNvIGJhaWwgb3V0IGFuZCBpbnNlcnQgdGhlIHJlbW5hbnRzIHJlY3Vyc2l2ZWx5XHJcbiAgICAgICAgdGhpcy5pbnNlcnRGcmFtZVJhbmdlKGJhdGNoLCBjb21wb25lbnRJZCwgbmV3RWxlbWVudCwgMCwgZnJhbWVzLCBkZXNjZW5kYW50SW5kZXgsIGRlc2NlbmRhbnRzRW5kSW5kZXhFeGNsKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFdlIGhhbmRsZSBzZXR0aW5nICd2YWx1ZScgb24gYSA8c2VsZWN0PiBpbiB0d28gZGlmZmVyZW50IHdheXM6XHJcbiAgICAvLyBbMV0gV2hlbiBpbnNlcnRpbmcgYSBjb3JyZXNwb25kaW5nIDxvcHRpb24+LCBpbiBjYXNlIHlvdSdyZSBkeW5hbWljYWxseSBhZGRpbmcgb3B0aW9uc1xyXG4gICAgLy8gWzJdIEFmdGVyIHdlIGZpbmlzaCBpbnNlcnRpbmcgdGhlIDxzZWxlY3Q+LCBpbiBjYXNlIHRoZSBkZXNjZW5kYW50IG9wdGlvbnMgYXJlIGJlaW5nXHJcbiAgICAvLyAgICAgYWRkZWQgYXMgYW4gb3BhcXVlIG1hcmt1cCBibG9jayByYXRoZXIgdGhhbiBpbmRpdmlkdWFsbHlcclxuICAgIC8vIFJpZ2h0IGhlcmUgd2UgaW1wbGVtZW50IFsyXVxyXG4gICAgaWYgKG5ld0RvbUVsZW1lbnRSYXcgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCAmJiBzZWxlY3RWYWx1ZVByb3BuYW1lIGluIG5ld0RvbUVsZW1lbnRSYXcpIHtcclxuICAgICAgY29uc3Qgc2VsZWN0VmFsdWUgPSBuZXdEb21FbGVtZW50UmF3W3NlbGVjdFZhbHVlUHJvcG5hbWVdO1xyXG4gICAgICBuZXdEb21FbGVtZW50UmF3LnZhbHVlID0gc2VsZWN0VmFsdWU7XHJcbiAgICAgIGRlbGV0ZSBuZXdEb21FbGVtZW50UmF3W3NlbGVjdFZhbHVlUHJvcG5hbWVdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbnNlcnRDb21wb25lbnQoYmF0Y2g6IFJlbmRlckJhdGNoLCBwYXJlbnQ6IExvZ2ljYWxFbGVtZW50LCBjaGlsZEluZGV4OiBudW1iZXIsIGZyYW1lOiBSZW5kZXJUcmVlRnJhbWUpIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lckVsZW1lbnQgPSBjcmVhdGVBbmRJbnNlcnRMb2dpY2FsQ29udGFpbmVyKHBhcmVudCwgY2hpbGRJbmRleCk7XHJcblxyXG4gICAgLy8gQWxsIHdlIGhhdmUgdG8gZG8gaXMgYXNzb2NpYXRlIHRoZSBjaGlsZCBjb21wb25lbnQgSUQgd2l0aCBpdHMgbG9jYXRpb24uIFdlIGRvbid0IGFjdHVhbGx5XHJcbiAgICAvLyBkbyBhbnkgcmVuZGVyaW5nIGhlcmUsIGJlY2F1c2UgdGhlIGRpZmYgZm9yIHRoZSBjaGlsZCB3aWxsIGFwcGVhciBsYXRlciBpbiB0aGUgcmVuZGVyIGJhdGNoLlxyXG4gICAgY29uc3QgY2hpbGRDb21wb25lbnRJZCA9IGJhdGNoLmZyYW1lUmVhZGVyLmNvbXBvbmVudElkKGZyYW1lKTtcclxuICAgIHRoaXMuYXR0YWNoQ29tcG9uZW50VG9FbGVtZW50KGNoaWxkQ29tcG9uZW50SWQsIGNvbnRhaW5lckVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbnNlcnRUZXh0KGJhdGNoOiBSZW5kZXJCYXRjaCwgcGFyZW50OiBMb2dpY2FsRWxlbWVudCwgY2hpbGRJbmRleDogbnVtYmVyLCB0ZXh0RnJhbWU6IFJlbmRlclRyZWVGcmFtZSkge1xyXG4gICAgY29uc3QgdGV4dENvbnRlbnQgPSBiYXRjaC5mcmFtZVJlYWRlci50ZXh0Q29udGVudCh0ZXh0RnJhbWUpITtcclxuICAgIGNvbnN0IG5ld1RleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dENvbnRlbnQpO1xyXG4gICAgaW5zZXJ0TG9naWNhbENoaWxkKG5ld1RleHROb2RlLCBwYXJlbnQsIGNoaWxkSW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbnNlcnRNYXJrdXAoYmF0Y2g6IFJlbmRlckJhdGNoLCBwYXJlbnQ6IExvZ2ljYWxFbGVtZW50LCBjaGlsZEluZGV4OiBudW1iZXIsIG1hcmt1cEZyYW1lOiBSZW5kZXJUcmVlRnJhbWUpIHtcclxuICAgIGNvbnN0IG1hcmt1cENvbnRhaW5lciA9IGNyZWF0ZUFuZEluc2VydExvZ2ljYWxDb250YWluZXIocGFyZW50LCBjaGlsZEluZGV4KTtcclxuXHJcbiAgICBjb25zdCBtYXJrdXBDb250ZW50ID0gYmF0Y2guZnJhbWVSZWFkZXIubWFya3VwQ29udGVudChtYXJrdXBGcmFtZSk7XHJcbiAgICBjb25zdCBwYXJzZWRNYXJrdXAgPSBwYXJzZU1hcmt1cChtYXJrdXBDb250ZW50LCBpc1N2Z0VsZW1lbnQocGFyZW50KSk7XHJcbiAgICBsZXQgbG9naWNhbFNpYmxpbmdJbmRleCA9IDA7XHJcbiAgICB3aGlsZSAocGFyc2VkTWFya3VwLmZpcnN0Q2hpbGQpIHtcclxuICAgICAgaW5zZXJ0TG9naWNhbENoaWxkKHBhcnNlZE1hcmt1cC5maXJzdENoaWxkLCBtYXJrdXBDb250YWluZXIsIGxvZ2ljYWxTaWJsaW5nSW5kZXgrKyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFwcGx5QXR0cmlidXRlKGJhdGNoOiBSZW5kZXJCYXRjaCwgY29tcG9uZW50SWQ6IG51bWJlciwgdG9Eb21FbGVtZW50OiBFbGVtZW50LCBhdHRyaWJ1dGVGcmFtZTogUmVuZGVyVHJlZUZyYW1lKSB7XHJcbiAgICBjb25zdCBmcmFtZVJlYWRlciA9IGJhdGNoLmZyYW1lUmVhZGVyO1xyXG4gICAgY29uc3QgYXR0cmlidXRlTmFtZSA9IGZyYW1lUmVhZGVyLmF0dHJpYnV0ZU5hbWUoYXR0cmlidXRlRnJhbWUpITtcclxuICAgIGNvbnN0IGV2ZW50SGFuZGxlcklkID0gZnJhbWVSZWFkZXIuYXR0cmlidXRlRXZlbnRIYW5kbGVySWQoYXR0cmlidXRlRnJhbWUpO1xyXG5cclxuICAgIGlmIChldmVudEhhbmRsZXJJZCkge1xyXG4gICAgICBjb25zdCBldmVudE5hbWUgPSBzdHJpcE9uUHJlZml4KGF0dHJpYnV0ZU5hbWUpO1xyXG4gICAgICB0aGlzLmV2ZW50RGVsZWdhdG9yLnNldExpc3RlbmVyKHRvRG9tRWxlbWVudCwgZXZlbnROYW1lLCBldmVudEhhbmRsZXJJZCwgY29tcG9uZW50SWQpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRmlyc3Qgc2VlIGlmIHdlIGhhdmUgc3BlY2lhbCBoYW5kbGluZyBmb3IgdGhpcyBhdHRyaWJ1dGVcclxuICAgIGlmICghdGhpcy50cnlBcHBseVNwZWNpYWxQcm9wZXJ0eShiYXRjaCwgdG9Eb21FbGVtZW50LCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVGcmFtZSkpIHtcclxuICAgICAgLy8gSWYgbm90LCB0cmVhdCBpdCBhcyBhIHJlZ3VsYXIgc3RyaW5nLXZhbHVlZCBhdHRyaWJ1dGVcclxuICAgICAgdG9Eb21FbGVtZW50LnNldEF0dHJpYnV0ZShcclxuICAgICAgICBhdHRyaWJ1dGVOYW1lLFxyXG4gICAgICAgIGZyYW1lUmVhZGVyLmF0dHJpYnV0ZVZhbHVlKGF0dHJpYnV0ZUZyYW1lKSFcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdHJ5QXBwbHlTcGVjaWFsUHJvcGVydHkoYmF0Y2g6IFJlbmRlckJhdGNoLCBlbGVtZW50OiBFbGVtZW50LCBhdHRyaWJ1dGVOYW1lOiBzdHJpbmcsIGF0dHJpYnV0ZUZyYW1lOiBSZW5kZXJUcmVlRnJhbWUgfCBudWxsKSB7XHJcbiAgICBzd2l0Y2ggKGF0dHJpYnV0ZU5hbWUpIHtcclxuICAgICAgY2FzZSAndmFsdWUnOlxyXG4gICAgICAgIHJldHVybiB0aGlzLnRyeUFwcGx5VmFsdWVQcm9wZXJ0eShiYXRjaCwgZWxlbWVudCwgYXR0cmlidXRlRnJhbWUpO1xyXG4gICAgICBjYXNlICdjaGVja2VkJzpcclxuICAgICAgICByZXR1cm4gdGhpcy50cnlBcHBseUNoZWNrZWRQcm9wZXJ0eShiYXRjaCwgZWxlbWVudCwgYXR0cmlidXRlRnJhbWUpO1xyXG4gICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgaWYgKGF0dHJpYnV0ZU5hbWUuc3RhcnRzV2l0aChpbnRlcm5hbEF0dHJpYnV0ZU5hbWVQcmVmaXgpKSB7XHJcbiAgICAgICAgICB0aGlzLmFwcGx5SW50ZXJuYWxBdHRyaWJ1dGUoYmF0Y2gsIGVsZW1lbnQsIGF0dHJpYnV0ZU5hbWUuc3Vic3RyaW5nKGludGVybmFsQXR0cmlidXRlTmFtZVByZWZpeC5sZW5ndGgpLCBhdHRyaWJ1dGVGcmFtZSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFwcGx5SW50ZXJuYWxBdHRyaWJ1dGUoYmF0Y2g6IFJlbmRlckJhdGNoLCBlbGVtZW50OiBFbGVtZW50LCBpbnRlcm5hbEF0dHJpYnV0ZU5hbWU6IHN0cmluZywgYXR0cmlidXRlRnJhbWU6IFJlbmRlclRyZWVGcmFtZSB8IG51bGwpIHtcclxuICAgIGNvbnN0IGF0dHJpYnV0ZVZhbHVlID0gYXR0cmlidXRlRnJhbWUgPyBiYXRjaC5mcmFtZVJlYWRlci5hdHRyaWJ1dGVWYWx1ZShhdHRyaWJ1dGVGcmFtZSkgOiBudWxsO1xyXG5cclxuICAgIGlmIChpbnRlcm5hbEF0dHJpYnV0ZU5hbWUuc3RhcnRzV2l0aChldmVudFN0b3BQcm9wYWdhdGlvbkF0dHJpYnV0ZU5hbWVQcmVmaXgpKSB7XHJcbiAgICAgIC8vIFN0b3AgcHJvcGFnYXRpb25cclxuICAgICAgY29uc3QgZXZlbnROYW1lID0gc3RyaXBPblByZWZpeChpbnRlcm5hbEF0dHJpYnV0ZU5hbWUuc3Vic3RyaW5nKGV2ZW50U3RvcFByb3BhZ2F0aW9uQXR0cmlidXRlTmFtZVByZWZpeC5sZW5ndGgpKTtcclxuICAgICAgdGhpcy5ldmVudERlbGVnYXRvci5zZXRTdG9wUHJvcGFnYXRpb24oZWxlbWVudCwgZXZlbnROYW1lLCBhdHRyaWJ1dGVWYWx1ZSAhPT0gbnVsbCk7XHJcbiAgICB9IGVsc2UgaWYgKGludGVybmFsQXR0cmlidXRlTmFtZS5zdGFydHNXaXRoKGV2ZW50UHJldmVudERlZmF1bHRBdHRyaWJ1dGVOYW1lUHJlZml4KSkge1xyXG4gICAgICAvLyBQcmV2ZW50IGRlZmF1bHRcclxuICAgICAgY29uc3QgZXZlbnROYW1lID0gc3RyaXBPblByZWZpeChpbnRlcm5hbEF0dHJpYnV0ZU5hbWUuc3Vic3RyaW5nKGV2ZW50UHJldmVudERlZmF1bHRBdHRyaWJ1dGVOYW1lUHJlZml4Lmxlbmd0aCkpO1xyXG4gICAgICB0aGlzLmV2ZW50RGVsZWdhdG9yLnNldFByZXZlbnREZWZhdWx0KGVsZW1lbnQsIGV2ZW50TmFtZSwgYXR0cmlidXRlVmFsdWUgIT09IG51bGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gVGhlIHByZWZpeCBtYWtlcyB0aGlzIGF0dHJpYnV0ZSBuYW1lIHJlc2VydmVkLCBzbyBhbnkgb3RoZXIgdXNhZ2UgaXMgZGlzYWxsb3dlZFxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIGludGVybmFsIGF0dHJpYnV0ZSAnJHtpbnRlcm5hbEF0dHJpYnV0ZU5hbWV9J2ApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0cnlBcHBseVZhbHVlUHJvcGVydHkoYmF0Y2g6IFJlbmRlckJhdGNoLCBlbGVtZW50OiBFbGVtZW50LCBhdHRyaWJ1dGVGcmFtZTogUmVuZGVyVHJlZUZyYW1lIHwgbnVsbCk6IGJvb2xlYW4ge1xyXG4gICAgLy8gQ2VydGFpbiBlbGVtZW50cyBoYXZlIGJ1aWx0LWluIGJlaGF2aW91ciBmb3IgdGhlaXIgJ3ZhbHVlJyBwcm9wZXJ0eVxyXG4gICAgY29uc3QgZnJhbWVSZWFkZXIgPSBiYXRjaC5mcmFtZVJlYWRlcjtcclxuXHJcbiAgICBpZiAoZWxlbWVudC50YWdOYW1lID09PSAnSU5QVVQnICYmIGVsZW1lbnQuZ2V0QXR0cmlidXRlKCd0eXBlJykgPT09ICd0aW1lJyAmJiAhZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3N0ZXAnKSkge1xyXG4gICAgICBjb25zdCB0aW1lVmFsdWUgPSBhdHRyaWJ1dGVGcmFtZSA/IGZyYW1lUmVhZGVyLmF0dHJpYnV0ZVZhbHVlKGF0dHJpYnV0ZUZyYW1lKSA6IG51bGw7XHJcbiAgICAgIGlmICh0aW1lVmFsdWUpIHtcclxuICAgICAgICBlbGVtZW50Wyd2YWx1ZSddID0gdGltZVZhbHVlLnN1YnN0cmluZygwLCA1KTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN3aXRjaCAoZWxlbWVudC50YWdOYW1lKSB7XHJcbiAgICAgIGNhc2UgJ0lOUFVUJzpcclxuICAgICAgY2FzZSAnU0VMRUNUJzpcclxuICAgICAgY2FzZSAnVEVYVEFSRUEnOiB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBhdHRyaWJ1dGVGcmFtZSA/IGZyYW1lUmVhZGVyLmF0dHJpYnV0ZVZhbHVlKGF0dHJpYnV0ZUZyYW1lKSA6IG51bGw7XHJcbiAgICAgICAgKGVsZW1lbnQgYXMgYW55KS52YWx1ZSA9IHZhbHVlO1xyXG5cclxuICAgICAgICBpZiAoZWxlbWVudC50YWdOYW1lID09PSAnU0VMRUNUJykge1xyXG4gICAgICAgICAgLy8gPHNlbGVjdD4gaXMgc3BlY2lhbCwgaW4gdGhhdCBhbnl0aGluZyB3ZSB3cml0ZSB0byAudmFsdWUgd2lsbCBiZSBsb3N0IGlmIHRoZXJlXHJcbiAgICAgICAgICAvLyBpc24ndCB5ZXQgYSBtYXRjaGluZyA8b3B0aW9uPi4gVG8gbWFpbnRhaW4gdGhlIGV4cGVjdGVkIGJlaGF2aW9yIG5vIG1hdHRlciB0aGVcclxuICAgICAgICAgIC8vIGVsZW1lbnQgaW5zZXJ0aW9uL3VwZGF0ZSBvcmRlciwgcHJlc2VydmUgdGhlIGRlc2lyZWQgdmFsdWUgc2VwYXJhdGVseSBzb1xyXG4gICAgICAgICAgLy8gd2UgY2FuIHJlY292ZXIgaXQgd2hlbiBpbnNlcnRpbmcgYW55IG1hdGNoaW5nIDxvcHRpb24+IG9yIGFmdGVyIGluc2VydGluZyBhblxyXG4gICAgICAgICAgLy8gZW50aXJlIG1hcmt1cCBibG9jayBvZiBkZXNjZW5kYW50cy5cclxuICAgICAgICAgIGVsZW1lbnRbc2VsZWN0VmFsdWVQcm9wbmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnT1BUSU9OJzoge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gYXR0cmlidXRlRnJhbWUgPyBmcmFtZVJlYWRlci5hdHRyaWJ1dGVWYWx1ZShhdHRyaWJ1dGVGcmFtZSkgOiBudWxsO1xyXG4gICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgdmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgndmFsdWUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gU2VlIGFib3ZlIGZvciB3aHkgd2UgaGF2ZSB0aGlzIHNwZWNpYWwgaGFuZGxpbmcgZm9yIDxzZWxlY3Q+LzxvcHRpb24+XHJcbiAgICAgICAgLy8gTm90ZSB0aGF0IHRoaXMgaXMgb25seSBvbmUgb2YgdGhlIHR3byBjYXNlcyB3aGVyZSB3ZSBzZXQgdGhlIHZhbHVlIG9uIGEgPHNlbGVjdD5cclxuICAgICAgICBjb25zdCBzZWxlY3RFbGVtID0gdGhpcy5maW5kQ2xvc2VzdEFuY2VzdG9yU2VsZWN0RWxlbWVudChlbGVtZW50KTtcclxuICAgICAgICBpZiAoc2VsZWN0RWxlbSAmJiAoc2VsZWN0VmFsdWVQcm9wbmFtZSBpbiBzZWxlY3RFbGVtKSAmJiBzZWxlY3RFbGVtW3NlbGVjdFZhbHVlUHJvcG5hbWVdID09PSB2YWx1ZSkge1xyXG4gICAgICAgICAgdGhpcy50cnlBcHBseVZhbHVlUHJvcGVydHkoYmF0Y2gsIHNlbGVjdEVsZW0sIGF0dHJpYnV0ZUZyYW1lKTtcclxuICAgICAgICAgIGRlbGV0ZSBzZWxlY3RFbGVtW3NlbGVjdFZhbHVlUHJvcG5hbWVdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdHJ5QXBwbHlDaGVja2VkUHJvcGVydHkoYmF0Y2g6IFJlbmRlckJhdGNoLCBlbGVtZW50OiBFbGVtZW50LCBhdHRyaWJ1dGVGcmFtZTogUmVuZGVyVHJlZUZyYW1lIHwgbnVsbCkge1xyXG4gICAgLy8gQ2VydGFpbiBlbGVtZW50cyBoYXZlIGJ1aWx0LWluIGJlaGF2aW91ciBmb3IgdGhlaXIgJ2NoZWNrZWQnIHByb3BlcnR5XHJcbiAgICBpZiAoZWxlbWVudC50YWdOYW1lID09PSAnSU5QVVQnKSB7XHJcbiAgICAgIGNvbnN0IHZhbHVlID0gYXR0cmlidXRlRnJhbWUgPyBiYXRjaC5mcmFtZVJlYWRlci5hdHRyaWJ1dGVWYWx1ZShhdHRyaWJ1dGVGcmFtZSkgOiBudWxsO1xyXG4gICAgICAoZWxlbWVudCBhcyBhbnkpLmNoZWNrZWQgPSB2YWx1ZSAhPT0gbnVsbDtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZpbmRDbG9zZXN0QW5jZXN0b3JTZWxlY3RFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQgfCBudWxsKSB7XHJcbiAgICB3aGlsZSAoZWxlbWVudCkge1xyXG4gICAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbnNlcnRGcmFtZVJhbmdlKGJhdGNoOiBSZW5kZXJCYXRjaCwgY29tcG9uZW50SWQ6IG51bWJlciwgcGFyZW50OiBMb2dpY2FsRWxlbWVudCwgY2hpbGRJbmRleDogbnVtYmVyLCBmcmFtZXM6IEFycmF5VmFsdWVzPFJlbmRlclRyZWVGcmFtZT4sIHN0YXJ0SW5kZXg6IG51bWJlciwgZW5kSW5kZXhFeGNsOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgY29uc3Qgb3JpZ0NoaWxkSW5kZXggPSBjaGlsZEluZGV4O1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSBzdGFydEluZGV4OyBpbmRleCA8IGVuZEluZGV4RXhjbDsgaW5kZXgrKykge1xyXG4gICAgICBjb25zdCBmcmFtZSA9IGJhdGNoLnJlZmVyZW5jZUZyYW1lc0VudHJ5KGZyYW1lcywgaW5kZXgpO1xyXG4gICAgICBjb25zdCBudW1DaGlsZHJlbkluc2VydGVkID0gdGhpcy5pbnNlcnRGcmFtZShiYXRjaCwgY29tcG9uZW50SWQsIHBhcmVudCwgY2hpbGRJbmRleCwgZnJhbWVzLCBmcmFtZSwgaW5kZXgpO1xyXG4gICAgICBjaGlsZEluZGV4ICs9IG51bUNoaWxkcmVuSW5zZXJ0ZWQ7XHJcblxyXG4gICAgICAvLyBTa2lwIG92ZXIgYW55IGRlc2NlbmRhbnRzLCBzaW5jZSB0aGV5IGFyZSBhbHJlYWR5IGRlYWx0IHdpdGggcmVjdXJzaXZlbHlcclxuICAgICAgaW5kZXggKz0gY291bnREZXNjZW5kYW50RnJhbWVzKGJhdGNoLCBmcmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChjaGlsZEluZGV4IC0gb3JpZ0NoaWxkSW5kZXgpOyAvLyBUb3RhbCBudW1iZXIgb2YgY2hpbGRyZW4gaW5zZXJ0ZWRcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29tcG9uZW50RGVzY3JpcHRvciB7XHJcbiAgc3RhcnQ6IE5vZGU7XHJcbiAgZW5kOiBOb2RlO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEV2ZW50RGVzY3JpcHRvciB7XHJcbiAgYnJvd3NlclJlbmRlcmVySWQ6IG51bWJlcjtcclxuICBldmVudEhhbmRsZXJJZDogbnVtYmVyO1xyXG4gIGV2ZW50QXJnc1R5cGU6IEV2ZW50QXJnc1R5cGU7XHJcbiAgZXZlbnRGaWVsZEluZm86IEV2ZW50RmllbGRJbmZvIHwgbnVsbDtcclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VNYXJrdXAobWFya3VwOiBzdHJpbmcsIGlzU3ZnOiBib29sZWFuKSB7XHJcbiAgaWYgKGlzU3ZnKSB7XHJcbiAgICBzaGFyZWRTdmdFbGVtRm9yUGFyc2luZy5pbm5lckhUTUwgPSBtYXJrdXAgfHwgJyAnO1xyXG4gICAgcmV0dXJuIHNoYXJlZFN2Z0VsZW1Gb3JQYXJzaW5nO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBzaGFyZWRUZW1wbGF0ZUVsZW1Gb3JQYXJzaW5nLmlubmVySFRNTCA9IG1hcmt1cCB8fCAnICc7XHJcbiAgICByZXR1cm4gc2hhcmVkVGVtcGxhdGVFbGVtRm9yUGFyc2luZy5jb250ZW50O1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY291bnREZXNjZW5kYW50RnJhbWVzKGJhdGNoOiBSZW5kZXJCYXRjaCwgZnJhbWU6IFJlbmRlclRyZWVGcmFtZSk6IG51bWJlciB7XHJcbiAgY29uc3QgZnJhbWVSZWFkZXIgPSBiYXRjaC5mcmFtZVJlYWRlcjtcclxuICBzd2l0Y2ggKGZyYW1lUmVhZGVyLmZyYW1lVHlwZShmcmFtZSkpIHtcclxuICAgIC8vIFRoZSBmb2xsb3dpbmcgZnJhbWUgdHlwZXMgaGF2ZSBhIHN1YnRyZWUgbGVuZ3RoLiBPdGhlciBmcmFtZXMgbWF5IHVzZSB0aGF0IG1lbW9yeSBzbG90XHJcbiAgICAvLyB0byBtZWFuIHNvbWV0aGluZyBlbHNlLCBzbyB3ZSBtdXN0IG5vdCByZWFkIGl0LiBXZSBzaG91bGQgY29uc2lkZXIgaGF2aW5nIG5vbWluYWwgc3VidHlwZXNcclxuICAgIC8vIG9mIFJlbmRlclRyZWVGcmFtZVBvaW50ZXIgdGhhdCBwcmV2ZW50IGFjY2VzcyB0byBub24tYXBwbGljYWJsZSBmaWVsZHMuXHJcbiAgICBjYXNlIEZyYW1lVHlwZS5jb21wb25lbnQ6XHJcbiAgICBjYXNlIEZyYW1lVHlwZS5lbGVtZW50OlxyXG4gICAgY2FzZSBGcmFtZVR5cGUucmVnaW9uOlxyXG4gICAgICByZXR1cm4gZnJhbWVSZWFkZXIuc3VidHJlZUxlbmd0aChmcmFtZSkgLSAxO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByYWlzZUV2ZW50KFxyXG4gIGV2ZW50OiBFdmVudCxcclxuICBicm93c2VyUmVuZGVyZXJJZDogbnVtYmVyLFxyXG4gIGV2ZW50SGFuZGxlcklkOiBudW1iZXIsXHJcbiAgZXZlbnRBcmdzOiBFdmVudEZvckRvdE5ldDxVSUV2ZW50QXJncz4sXHJcbiAgZXZlbnRGaWVsZEluZm86IEV2ZW50RmllbGRJbmZvIHwgbnVsbFxyXG4pOiB2b2lkIHtcclxuICBpZiAocHJldmVudERlZmF1bHRFdmVudHNbZXZlbnQudHlwZV0pIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBldmVudERlc2NyaXB0b3IgPSB7XHJcbiAgICBicm93c2VyUmVuZGVyZXJJZCxcclxuICAgIGV2ZW50SGFuZGxlcklkLFxyXG4gICAgZXZlbnRBcmdzVHlwZTogZXZlbnRBcmdzLnR5cGUsXHJcbiAgICBldmVudEZpZWxkSW5mbzogZXZlbnRGaWVsZEluZm8sXHJcbiAgfTtcclxuXHJcbiAgZGlzcGF0Y2hFdmVudChldmVudERlc2NyaXB0b3IsIGV2ZW50QXJncy5kYXRhKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQpIHtcclxuICBsZXQgY2hpbGROb2RlOiBOb2RlIHwgbnVsbDtcclxuICB3aGlsZSAoY2hpbGROb2RlID0gZWxlbWVudC5maXJzdENoaWxkKSB7XHJcbiAgICBlbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhckJldHdlZW4oc3RhcnQ6IE5vZGUsIGVuZDogTm9kZSk6IHZvaWQge1xyXG4gIGNvbnN0IGxvZ2ljYWxQYXJlbnQgPSBnZXRMb2dpY2FsUGFyZW50KHN0YXJ0IGFzIHVua25vd24gYXMgTG9naWNhbEVsZW1lbnQpO1xyXG4gIGlmICghbG9naWNhbFBhcmVudCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgY2xlYXIgYmV0d2VlbiBub2Rlcy4gVGhlIHN0YXJ0IG5vZGUgZG9lcyBub3QgaGF2ZSBhIGxvZ2ljYWwgcGFyZW50LlwiKTtcclxuICB9XHJcbiAgY29uc3QgY2hpbGRyZW4gPSBnZXRMb2dpY2FsQ2hpbGRyZW5BcnJheShsb2dpY2FsUGFyZW50KTtcclxuICBjb25zdCByZW1vdmVTdGFydCA9IGNoaWxkcmVuLmluZGV4T2Yoc3RhcnQgYXMgdW5rbm93biBhcyBMb2dpY2FsRWxlbWVudCkgKyAxO1xyXG4gIGNvbnN0IGVuZEluZGV4ID0gY2hpbGRyZW4uaW5kZXhPZihlbmQgYXMgdW5rbm93biBhcyBMb2dpY2FsRWxlbWVudCk7XHJcblxyXG4gIC8vIFdlIHJlbW92ZSB0aGUgZW5kIGNvbXBvbmVudCBjb21tZW50IGZyb20gdGhlIERPTSBhcyB3ZSBkb24ndCBuZWVkIGl0IGFmdGVyIHRoaXMgcG9pbnQuXHJcbiAgZm9yIChsZXQgaSA9IHJlbW92ZVN0YXJ0OyBpIDw9IGVuZEluZGV4OyBpKyspIHtcclxuICAgIHJlbW92ZUxvZ2ljYWxDaGlsZChsb2dpY2FsUGFyZW50LCByZW1vdmVTdGFydCk7XHJcbiAgfVxyXG5cclxuICAvLyBXZSBzYW5pdGl6ZSB0aGUgc3RhcnQgY29tbWVudCBieSByZW1vdmluZyBhbGwgdGhlIGluZm9ybWF0aW9uIGZyb20gaXQgbm93IHRoYXQgd2UgZG9uJ3QgbmVlZCBpdCBhbnltb3JlXHJcbiAgLy8gYXMgaXQgYWRkcyBub2lzZSB0byB0aGUgRE9NLlxyXG4gIHN0YXJ0LnRleHRDb250ZW50ID0gJyEnO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdHJpcE9uUHJlZml4KGF0dHJpYnV0ZU5hbWU6IHN0cmluZykge1xyXG4gIGlmIChhdHRyaWJ1dGVOYW1lLnN0YXJ0c1dpdGgoJ29uJykpIHtcclxuICAgIHJldHVybiBhdHRyaWJ1dGVOYW1lLnN1YnN0cmluZygyKTtcclxuICB9XHJcblxyXG4gIHRocm93IG5ldyBFcnJvcihgQXR0cmlidXRlIHNob3VsZCBiZSBhbiBldmVudCBuYW1lLCBidXQgZG9lc24ndCBzdGFydCB3aXRoICdvbicuIFZhbHVlOiAnJHthdHRyaWJ1dGVOYW1lfSdgKTtcclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gYXBwbHlDYXB0dXJlSWRUb0VsZW1lbnQoZWxlbWVudDogRWxlbWVudCwgcmVmZXJlbmNlQ2FwdHVyZUlkOiBzdHJpbmcpIHtcclxuICBlbGVtZW50LnNldEF0dHJpYnV0ZShnZXRDYXB0dXJlSWRBdHRyaWJ1dGVOYW1lKHJlZmVyZW5jZUNhcHR1cmVJZCksICcnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RWxlbWVudEJ5Q2FwdHVyZUlkKHJlZmVyZW5jZUNhcHR1cmVJZDogc3RyaW5nKSB7XHJcbiAgY29uc3Qgc2VsZWN0b3IgPSBgWyR7Z2V0Q2FwdHVyZUlkQXR0cmlidXRlTmFtZShyZWZlcmVuY2VDYXB0dXJlSWQpfV1gO1xyXG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Q2FwdHVyZUlkQXR0cmlidXRlTmFtZShyZWZlcmVuY2VDYXB0dXJlSWQ6IHN0cmluZykge1xyXG4gIHJldHVybiBgX2JsXyR7cmVmZXJlbmNlQ2FwdHVyZUlkfWA7XHJcbn1cclxuXHJcbi8vIFN1cHBvcnQgcmVjZWl2aW5nIEVsZW1lbnRSZWYgaW5zdGFuY2VzIGFzIGFyZ3MgaW4gaW50ZXJvcCBjYWxsc1xyXG5jb25zdCBlbGVtZW50UmVmS2V5ID0gJ19faW50ZXJuYWxJZCc7IC8vIEtlZXAgaW4gc3luYyB3aXRoIEVsZW1lbnRSZWYuY3NcclxuRG90TmV0LmF0dGFjaFJldml2ZXIoKGtleSwgdmFsdWUpID0+IHtcclxuICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZS5oYXNPd25Qcm9wZXJ0eShlbGVtZW50UmVmS2V5KSAmJiB0eXBlb2YgdmFsdWVbZWxlbWVudFJlZktleV0gPT09ICdzdHJpbmcnKSB7XHJcbiAgICByZXR1cm4gZ2V0RWxlbWVudEJ5Q2FwdHVyZUlkKHZhbHVlW2VsZW1lbnRSZWZLZXldKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxufSk7XHJcbiIsImltcG9ydCB7IEV2ZW50Rm9yRG90TmV0LCBVSUV2ZW50QXJncyB9IGZyb20gJy4vRXZlbnRGb3JEb3ROZXQnO1xyXG5pbXBvcnQgeyBFdmVudEZpZWxkSW5mbyB9IGZyb20gJy4vRXZlbnRGaWVsZEluZm8nO1xyXG5cclxuY29uc3Qgbm9uQnViYmxpbmdFdmVudHMgPSB0b0xvb2t1cChbXHJcbiAgJ2Fib3J0JyxcclxuICAnYmx1cicsXHJcbiAgJ2NoYW5nZScsXHJcbiAgJ2Vycm9yJyxcclxuICAnZm9jdXMnLFxyXG4gICdsb2FkJyxcclxuICAnbG9hZGVuZCcsXHJcbiAgJ2xvYWRzdGFydCcsXHJcbiAgJ21vdXNlZW50ZXInLFxyXG4gICdtb3VzZWxlYXZlJyxcclxuICAncHJvZ3Jlc3MnLFxyXG4gICdyZXNldCcsXHJcbiAgJ3Njcm9sbCcsXHJcbiAgJ3N1Ym1pdCcsXHJcbiAgJ3VubG9hZCcsXHJcbiAgJ0RPTU5vZGVJbnNlcnRlZEludG9Eb2N1bWVudCcsXHJcbiAgJ0RPTU5vZGVSZW1vdmVkRnJvbURvY3VtZW50JyxcclxuXSk7XHJcblxyXG5jb25zdCBkaXNhYmxlYWJsZUV2ZW50TmFtZXMgPSB0b0xvb2t1cChbJ2NsaWNrJywgJ2RibGNsaWNrJywgJ21vdXNlZG93bicsICdtb3VzZW1vdmUnLCAnbW91c2V1cCddKTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgT25FdmVudENhbGxiYWNrIHtcclxuICAoZXZlbnQ6IEV2ZW50LCBldmVudEhhbmRsZXJJZDogbnVtYmVyLCBldmVudEFyZ3M6IEV2ZW50Rm9yRG90TmV0PFVJRXZlbnRBcmdzPiwgZXZlbnRGaWVsZEluZm86IEV2ZW50RmllbGRJbmZvIHwgbnVsbCk6IHZvaWQ7XHJcbn1cclxuXHJcbi8vIFJlc3BvbnNpYmxlIGZvciBhZGRpbmcvcmVtb3ZpbmcgdGhlIGV2ZW50SW5mbyBvbiBhbiBleHBhbmRvIHByb3BlcnR5IG9uIERPTSBlbGVtZW50cywgYW5kXHJcbi8vIGNhbGxpbmcgYW4gRXZlbnRJbmZvU3RvcmUgdGhhdCBkZWFscyB3aXRoIHJlZ2lzdGVyaW5nL3VucmVnaXN0ZXJpbmcgdGhlIHVuZGVybHlpbmcgZGVsZWdhdGVkXHJcbi8vIGV2ZW50IGxpc3RlbmVycyBhcyByZXF1aXJlZCAoYW5kIGFsc28gbWFwcyBhY3R1YWwgZXZlbnRzIGJhY2sgdG8gdGhlIGdpdmVuIGNhbGxiYWNrKS5cclxuZXhwb3J0IGNsYXNzIEV2ZW50RGVsZWdhdG9yIHtcclxuICBwcml2YXRlIHN0YXRpYyBuZXh0RXZlbnREZWxlZ2F0b3JJZCA9IDA7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgZXZlbnRzQ29sbGVjdGlvbktleTogc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IGFmdGVyQ2xpY2tDYWxsYmFja3M6ICgoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHZvaWQpW10gPSBbXTtcclxuXHJcbiAgcHJpdmF0ZSBldmVudEluZm9TdG9yZTogRXZlbnRJbmZvU3RvcmU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgb25FdmVudDogT25FdmVudENhbGxiYWNrKSB7XHJcbiAgICBjb25zdCBldmVudERlbGVnYXRvcklkID0gKytFdmVudERlbGVnYXRvci5uZXh0RXZlbnREZWxlZ2F0b3JJZDtcclxuICAgIHRoaXMuZXZlbnRzQ29sbGVjdGlvbktleSA9IGBfYmxhem9yRXZlbnRzXyR7ZXZlbnREZWxlZ2F0b3JJZH1gO1xyXG4gICAgdGhpcy5ldmVudEluZm9TdG9yZSA9IG5ldyBFdmVudEluZm9TdG9yZSh0aGlzLm9uR2xvYmFsRXZlbnQuYmluZCh0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0TGlzdGVuZXIoZWxlbWVudDogRWxlbWVudCwgZXZlbnROYW1lOiBzdHJpbmcsIGV2ZW50SGFuZGxlcklkOiBudW1iZXIsIHJlbmRlcmluZ0NvbXBvbmVudElkOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IGluZm9Gb3JFbGVtZW50ID0gdGhpcy5nZXRFdmVudEhhbmRsZXJJbmZvc0ZvckVsZW1lbnQoZWxlbWVudCwgdHJ1ZSkhO1xyXG4gICAgY29uc3QgZXhpc3RpbmdIYW5kbGVyID0gaW5mb0ZvckVsZW1lbnQuZ2V0SGFuZGxlcihldmVudE5hbWUpO1xyXG5cclxuICAgIGlmIChleGlzdGluZ0hhbmRsZXIpIHtcclxuICAgICAgLy8gV2UgY2FuIGNoZWFwbHkgdXBkYXRlIHRoZSBpbmZvIG9uIHRoZSBleGlzdGluZyBvYmplY3QgYW5kIGRvbid0IG5lZWQgYW55IG90aGVyIGhvdXNla2VlcGluZ1xyXG4gICAgICAvLyBOb3RlIHRoYXQgdGhpcyBhbHNvIHRha2VzIGNhcmUgb2YgdXBkYXRpbmcgdGhlIGV2ZW50SGFuZGxlcklkIG9uIHRoZSBleGlzdGluZyBoYW5kbGVyIG9iamVjdFxyXG4gICAgICB0aGlzLmV2ZW50SW5mb1N0b3JlLnVwZGF0ZShleGlzdGluZ0hhbmRsZXIuZXZlbnRIYW5kbGVySWQsIGV2ZW50SGFuZGxlcklkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIEdvIHRocm91Z2ggdGhlIHdob2xlIGZsb3cgd2hpY2ggbWlnaHQgaW52b2x2ZSByZWdpc3RlcmluZyBhIG5ldyBnbG9iYWwgaGFuZGxlclxyXG4gICAgICBjb25zdCBuZXdJbmZvID0geyBlbGVtZW50LCBldmVudE5hbWUsIGV2ZW50SGFuZGxlcklkLCByZW5kZXJpbmdDb21wb25lbnRJZCB9O1xyXG4gICAgICB0aGlzLmV2ZW50SW5mb1N0b3JlLmFkZChuZXdJbmZvKTtcclxuICAgICAgaW5mb0ZvckVsZW1lbnQuc2V0SGFuZGxlcihldmVudE5hbWUsIG5ld0luZm8pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZUxpc3RlbmVyKGV2ZW50SGFuZGxlcklkOiBudW1iZXIpIHtcclxuICAgIC8vIFRoaXMgbWV0aG9kIGdldHMgY2FsbGVkIHdoZW5ldmVyIHRoZSAuTkVULXNpZGUgY29kZSByZXBvcnRzIHRoYXQgYSBjZXJ0YWluIGV2ZW50IGhhbmRsZXJcclxuICAgIC8vIGhhcyBiZWVuIGRpc3Bvc2VkLiBIb3dldmVyIHdlIHdpbGwgYWxyZWFkeSBoYXZlIGRpc3Bvc2VkIHRoZSBpbmZvIGFib3V0IHRoYXQgaGFuZGxlciBpZlxyXG4gICAgLy8gdGhlIGV2ZW50SGFuZGxlcklkIGZvciB0aGUgKGVsZW1lbnQsZXZlbnROYW1lKSBwYWlyIHdhcyByZXBsYWNlZCBkdXJpbmcgZGlmZiBhcHBsaWNhdGlvbi5cclxuICAgIGNvbnN0IGluZm8gPSB0aGlzLmV2ZW50SW5mb1N0b3JlLnJlbW92ZShldmVudEhhbmRsZXJJZCk7XHJcbiAgICBpZiAoaW5mbykge1xyXG4gICAgICAvLyBMb29rcyBsaWtlIHRoaXMgZXZlbnQgaGFuZGxlciB3YXNuJ3QgYWxyZWFkeSBkaXNwb3NlZFxyXG4gICAgICAvLyBSZW1vdmUgdGhlIGFzc29jaWF0ZWQgZGF0YSBmcm9tIHRoZSBET00gZWxlbWVudFxyXG4gICAgICBjb25zdCBlbGVtZW50ID0gaW5mby5lbGVtZW50O1xyXG4gICAgICBjb25zdCBlbGVtZW50RXZlbnRJbmZvcyA9IHRoaXMuZ2V0RXZlbnRIYW5kbGVySW5mb3NGb3JFbGVtZW50KGVsZW1lbnQsIGZhbHNlKTtcclxuICAgICAgaWYgKGVsZW1lbnRFdmVudEluZm9zKSB7XHJcbiAgICAgICAgZWxlbWVudEV2ZW50SW5mb3MucmVtb3ZlSGFuZGxlcihpbmZvLmV2ZW50TmFtZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBub3RpZnlBZnRlckNsaWNrKGNhbGxiYWNrOiAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHZvaWQpIHtcclxuICAgIC8vIFRoaXMgaXMgZXh0cmVtZWx5IHNwZWNpYWwtY2FzZS4gSXQncyBuZWVkZWQgc28gdGhhdCBuYXZpZ2F0aW9uIGxpbmsgY2xpY2sgaW50ZXJjZXB0aW9uXHJcbiAgICAvLyBjYW4gYmUgc3VyZSB0byBydW4gKmFmdGVyKiBvdXIgc3ludGhldGljIGJ1YmJsaW5nIHByb2Nlc3MuIElmIGEgbmVlZCBhcmlzZXMsIHdlIGNhblxyXG4gICAgLy8gZ2VuZXJhbGlzZSB0aGlzLCBidXQgcmlnaHQgbm93IGl0J3MgYSBwdXJlbHkgaW50ZXJuYWwgZGV0YWlsLlxyXG4gICAgdGhpcy5hZnRlckNsaWNrQ2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xyXG4gICAgdGhpcy5ldmVudEluZm9TdG9yZS5hZGRHbG9iYWxMaXN0ZW5lcignY2xpY2snKTsgLy8gRW5zdXJlIHdlIGFsd2F5cyBsaXN0ZW4gZm9yIHRoaXNcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRTdG9wUHJvcGFnYXRpb24oZWxlbWVudDogRWxlbWVudCwgZXZlbnROYW1lOiBzdHJpbmcsIHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICBjb25zdCBpbmZvRm9yRWxlbWVudCA9IHRoaXMuZ2V0RXZlbnRIYW5kbGVySW5mb3NGb3JFbGVtZW50KGVsZW1lbnQsIHRydWUpITtcclxuICAgIGluZm9Gb3JFbGVtZW50LnN0b3BQcm9wYWdhdGlvbihldmVudE5hbWUsIHZhbHVlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRQcmV2ZW50RGVmYXVsdChlbGVtZW50OiBFbGVtZW50LCBldmVudE5hbWU6IHN0cmluZywgdmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIGNvbnN0IGluZm9Gb3JFbGVtZW50ID0gdGhpcy5nZXRFdmVudEhhbmRsZXJJbmZvc0ZvckVsZW1lbnQoZWxlbWVudCwgdHJ1ZSkhO1xyXG4gICAgaW5mb0ZvckVsZW1lbnQucHJldmVudERlZmF1bHQoZXZlbnROYW1lLCB2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uR2xvYmFsRXZlbnQoZXZ0OiBFdmVudCkge1xyXG4gICAgaWYgKCEoZXZ0LnRhcmdldCBpbnN0YW5jZW9mIEVsZW1lbnQpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTY2FuIHVwIHRoZSBlbGVtZW50IGhpZXJhcmNoeSwgbG9va2luZyBmb3IgYW55IG1hdGNoaW5nIHJlZ2lzdGVyZWQgZXZlbnQgaGFuZGxlcnNcclxuICAgIGxldCBjYW5kaWRhdGVFbGVtZW50ID0gZXZ0LnRhcmdldCBhcyBFbGVtZW50IHwgbnVsbDtcclxuICAgIGxldCBldmVudEFyZ3M6IEV2ZW50Rm9yRG90TmV0PFVJRXZlbnRBcmdzPiB8IG51bGwgPSBudWxsOyAvLyBQb3B1bGF0ZSBsYXppbHlcclxuICAgIGNvbnN0IGV2ZW50SXNOb25CdWJibGluZyA9IG5vbkJ1YmJsaW5nRXZlbnRzLmhhc093blByb3BlcnR5KGV2dC50eXBlKTtcclxuICAgIGxldCBzdG9wUHJvcGFnYXRpb25XYXNSZXF1ZXN0ZWQgPSBmYWxzZTtcclxuICAgIHdoaWxlIChjYW5kaWRhdGVFbGVtZW50KSB7XHJcbiAgICAgIGNvbnN0IGhhbmRsZXJJbmZvcyA9IHRoaXMuZ2V0RXZlbnRIYW5kbGVySW5mb3NGb3JFbGVtZW50KGNhbmRpZGF0ZUVsZW1lbnQsIGZhbHNlKTtcclxuICAgICAgaWYgKGhhbmRsZXJJbmZvcykge1xyXG4gICAgICAgIGNvbnN0IGhhbmRsZXJJbmZvID0gaGFuZGxlckluZm9zLmdldEhhbmRsZXIoZXZ0LnR5cGUpO1xyXG4gICAgICAgIGlmIChoYW5kbGVySW5mbyAmJiAhZXZlbnRJc0Rpc2FibGVkT25FbGVtZW50KGNhbmRpZGF0ZUVsZW1lbnQsIGV2dC50eXBlKSkge1xyXG4gICAgICAgICAgLy8gV2UgYXJlIGdvaW5nIHRvIHJhaXNlIGFuIGV2ZW50IGZvciB0aGlzIGVsZW1lbnQsIHNvIHByZXBhcmUgaW5mbyBuZWVkZWQgYnkgdGhlIC5ORVQgY29kZVxyXG4gICAgICAgICAgaWYgKCFldmVudEFyZ3MpIHtcclxuICAgICAgICAgICAgZXZlbnRBcmdzID0gRXZlbnRGb3JEb3ROZXQuZnJvbURPTUV2ZW50KGV2dCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc3QgZXZlbnRGaWVsZEluZm8gPSBFdmVudEZpZWxkSW5mby5mcm9tRXZlbnQoaGFuZGxlckluZm8ucmVuZGVyaW5nQ29tcG9uZW50SWQsIGV2dCk7XHJcbiAgICAgICAgICB0aGlzLm9uRXZlbnQoZXZ0LCBoYW5kbGVySW5mby5ldmVudEhhbmRsZXJJZCwgZXZlbnRBcmdzLCBldmVudEZpZWxkSW5mbyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaGFuZGxlckluZm9zLnN0b3BQcm9wYWdhdGlvbihldnQudHlwZSkpIHtcclxuICAgICAgICAgIHN0b3BQcm9wYWdhdGlvbldhc1JlcXVlc3RlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaGFuZGxlckluZm9zLnByZXZlbnREZWZhdWx0KGV2dC50eXBlKSkge1xyXG4gICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjYW5kaWRhdGVFbGVtZW50ID0gKGV2ZW50SXNOb25CdWJibGluZyB8fCBzdG9wUHJvcGFnYXRpb25XYXNSZXF1ZXN0ZWQpID8gbnVsbCA6IGNhbmRpZGF0ZUVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTcGVjaWFsIGNhc2UgZm9yIG5hdmlnYXRpb24gaW50ZXJjZXB0aW9uXHJcbiAgICBpZiAoZXZ0LnR5cGUgPT09ICdjbGljaycpIHtcclxuICAgICAgdGhpcy5hZnRlckNsaWNrQ2FsbGJhY2tzLmZvckVhY2goY2FsbGJhY2sgPT4gY2FsbGJhY2soZXZ0IGFzIE1vdXNlRXZlbnQpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0RXZlbnRIYW5kbGVySW5mb3NGb3JFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQsIGNyZWF0ZUlmTmVlZGVkOiBib29sZWFuKTogRXZlbnRIYW5kbGVySW5mb3NGb3JFbGVtZW50IHwgbnVsbCB7XHJcbiAgICBpZiAoZWxlbWVudC5oYXNPd25Qcm9wZXJ0eSh0aGlzLmV2ZW50c0NvbGxlY3Rpb25LZXkpKSB7XHJcbiAgICAgIHJldHVybiBlbGVtZW50W3RoaXMuZXZlbnRzQ29sbGVjdGlvbktleV07XHJcbiAgICB9IGVsc2UgaWYgKGNyZWF0ZUlmTmVlZGVkKSB7XHJcbiAgICAgIHJldHVybiAoZWxlbWVudFt0aGlzLmV2ZW50c0NvbGxlY3Rpb25LZXldID0gbmV3IEV2ZW50SGFuZGxlckluZm9zRm9yRWxlbWVudCgpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gUmVzcG9uc2libGUgZm9yIGFkZGluZyBhbmQgcmVtb3ZpbmcgdGhlIGdsb2JhbCBsaXN0ZW5lciB3aGVuIHRoZSBudW1iZXIgb2YgbGlzdGVuZXJzXHJcbi8vIGZvciBhIGdpdmVuIGV2ZW50IG5hbWUgY2hhbmdlcyBiZXR3ZWVuIHplcm8gYW5kIG5vbnplcm9cclxuY2xhc3MgRXZlbnRJbmZvU3RvcmUge1xyXG4gIHByaXZhdGUgaW5mb3NCeUV2ZW50SGFuZGxlcklkOiB7IFtldmVudEhhbmRsZXJJZDogbnVtYmVyXTogRXZlbnRIYW5kbGVySW5mbyB9ID0ge307XHJcblxyXG4gIHByaXZhdGUgY291bnRCeUV2ZW50TmFtZTogeyBbZXZlbnROYW1lOiBzdHJpbmddOiBudW1iZXIgfSA9IHt9O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdsb2JhbExpc3RlbmVyOiBFdmVudExpc3RlbmVyKSB7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkKGluZm86IEV2ZW50SGFuZGxlckluZm8pIHtcclxuICAgIGlmICh0aGlzLmluZm9zQnlFdmVudEhhbmRsZXJJZFtpbmZvLmV2ZW50SGFuZGxlcklkXSkge1xyXG4gICAgICAvLyBTaG91bGQgbmV2ZXIgaGFwcGVuLCBidXQgd2Ugd2FudCB0byBrbm93IGlmIGl0IGRvZXNcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBFdmVudCAke2luZm8uZXZlbnRIYW5kbGVySWR9IGlzIGFscmVhZHkgdHJhY2tlZGApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaW5mb3NCeUV2ZW50SGFuZGxlcklkW2luZm8uZXZlbnRIYW5kbGVySWRdID0gaW5mbztcclxuXHJcbiAgICB0aGlzLmFkZEdsb2JhbExpc3RlbmVyKGluZm8uZXZlbnROYW1lKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGRHbG9iYWxMaXN0ZW5lcihldmVudE5hbWU6IHN0cmluZykge1xyXG4gICAgaWYgKHRoaXMuY291bnRCeUV2ZW50TmFtZS5oYXNPd25Qcm9wZXJ0eShldmVudE5hbWUpKSB7XHJcbiAgICAgIHRoaXMuY291bnRCeUV2ZW50TmFtZVtldmVudE5hbWVdKys7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNvdW50QnlFdmVudE5hbWVbZXZlbnROYW1lXSA9IDE7XHJcblxyXG4gICAgICAvLyBUbyBtYWtlIGRlbGVnYXRpb24gd29yayB3aXRoIG5vbi1idWJibGluZyBldmVudHMsIHJlZ2lzdGVyIGEgJ2NhcHR1cmUnIGxpc3RlbmVyLlxyXG4gICAgICAvLyBXZSBwcmVzZXJ2ZSB0aGUgbm9uLWJ1YmJsaW5nIGJlaGF2aW9yIGJ5IG9ubHkgZGlzcGF0Y2hpbmcgc3VjaCBldmVudHMgdG8gdGhlIHRhcmdldGVkIGVsZW1lbnQuXHJcbiAgICAgIGNvbnN0IHVzZUNhcHR1cmUgPSBub25CdWJibGluZ0V2ZW50cy5oYXNPd25Qcm9wZXJ0eShldmVudE5hbWUpO1xyXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgdGhpcy5nbG9iYWxMaXN0ZW5lciwgdXNlQ2FwdHVyZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdXBkYXRlKG9sZEV2ZW50SGFuZGxlcklkOiBudW1iZXIsIG5ld0V2ZW50SGFuZGxlcklkOiBudW1iZXIpIHtcclxuICAgIGlmICh0aGlzLmluZm9zQnlFdmVudEhhbmRsZXJJZC5oYXNPd25Qcm9wZXJ0eShuZXdFdmVudEhhbmRsZXJJZCkpIHtcclxuICAgICAgLy8gU2hvdWxkIG5ldmVyIGhhcHBlbiwgYnV0IHdlIHdhbnQgdG8ga25vdyBpZiBpdCBkb2VzXHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRXZlbnQgJHtuZXdFdmVudEhhbmRsZXJJZH0gaXMgYWxyZWFkeSB0cmFja2VkYCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2luY2Ugd2UncmUganVzdCB1cGRhdGluZyB0aGUgZXZlbnQgaGFuZGxlciBJRCwgdGhlcmUncyBubyBuZWVkIHRvIHVwZGF0ZSB0aGUgZ2xvYmFsIGNvdW50c1xyXG4gICAgY29uc3QgaW5mbyA9IHRoaXMuaW5mb3NCeUV2ZW50SGFuZGxlcklkW29sZEV2ZW50SGFuZGxlcklkXTtcclxuICAgIGRlbGV0ZSB0aGlzLmluZm9zQnlFdmVudEhhbmRsZXJJZFtvbGRFdmVudEhhbmRsZXJJZF07XHJcbiAgICBpbmZvLmV2ZW50SGFuZGxlcklkID0gbmV3RXZlbnRIYW5kbGVySWQ7XHJcbiAgICB0aGlzLmluZm9zQnlFdmVudEhhbmRsZXJJZFtuZXdFdmVudEhhbmRsZXJJZF0gPSBpbmZvO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZShldmVudEhhbmRsZXJJZDogbnVtYmVyKTogRXZlbnRIYW5kbGVySW5mbyB7XHJcbiAgICBjb25zdCBpbmZvID0gdGhpcy5pbmZvc0J5RXZlbnRIYW5kbGVySWRbZXZlbnRIYW5kbGVySWRdO1xyXG4gICAgaWYgKGluZm8pIHtcclxuICAgICAgZGVsZXRlIHRoaXMuaW5mb3NCeUV2ZW50SGFuZGxlcklkW2V2ZW50SGFuZGxlcklkXTtcclxuXHJcbiAgICAgIGNvbnN0IGV2ZW50TmFtZSA9IGluZm8uZXZlbnROYW1lO1xyXG4gICAgICBpZiAoLS10aGlzLmNvdW50QnlFdmVudE5hbWVbZXZlbnROYW1lXSA9PT0gMCkge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmNvdW50QnlFdmVudE5hbWVbZXZlbnROYW1lXTtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgdGhpcy5nbG9iYWxMaXN0ZW5lcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaW5mbztcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIEV2ZW50SGFuZGxlckluZm9zRm9yRWxlbWVudCB7XHJcbiAgLy8gQWx0aG91Z2ggd2UgKmNvdWxkKiB0cmFjayBtdWx0aXBsZSBldmVudCBoYW5kbGVycyBwZXIgKGVsZW1lbnQsIGV2ZW50TmFtZSkgcGFpclxyXG4gIC8vIChzaW5jZSB0aGV5IGhhdmUgZGlzdGluY3QgZXZlbnRIYW5kbGVySWQgdmFsdWVzKSwgdGhlcmUncyBubyBwb2ludCBkb2luZyBzbyBiZWNhdXNlXHJcbiAgLy8gb3VyIHByb2dyYW1taW5nIG1vZGVsIGlzIHRoYXQgeW91IGRlY2xhcmUgZXZlbnQgaGFuZGxlcnMgYXMgYXR0cmlidXRlcy4gQW4gZWxlbWVudFxyXG4gIC8vIGNhbiBvbmx5IGhhdmUgb25lIGF0dHJpYnV0ZSB3aXRoIGEgZ2l2ZW4gbmFtZSwgaGVuY2Ugb25seSBvbmUgZXZlbnQgaGFuZGxlciB3aXRoXHJcbiAgLy8gdGhhdCBuYW1lIGF0IGFueSBvbmUgdGltZS5cclxuICAvLyBTbyB0byBrZWVwIHRoaW5ncyBzaW1wbGUsIG9ubHkgdHJhY2sgb25lIEV2ZW50SGFuZGxlckluZm8gcGVyIChlbGVtZW50LCBldmVudE5hbWUpXHJcbiAgcHJpdmF0ZSBoYW5kbGVyczogeyBbZXZlbnROYW1lOiBzdHJpbmddOiBFdmVudEhhbmRsZXJJbmZvIH0gPSB7fTtcclxuICBwcml2YXRlIHByZXZlbnREZWZhdWx0RmxhZ3M6IHsgW2V2ZW50TmFtZTogc3RyaW5nXTogYm9vbGVhbiB9IHwgbnVsbCA9IG51bGw7XHJcbiAgcHJpdmF0ZSBzdG9wUHJvcGFnYXRpb25GbGFnczogeyBbZXZlbnROYW1lOiBzdHJpbmddOiBib29sZWFuIH0gfCBudWxsID0gbnVsbDtcclxuXHJcbiAgcHVibGljIGdldEhhbmRsZXIoZXZlbnROYW1lOiBzdHJpbmcpOiBFdmVudEhhbmRsZXJJbmZvIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVycy5oYXNPd25Qcm9wZXJ0eShldmVudE5hbWUpID8gdGhpcy5oYW5kbGVyc1tldmVudE5hbWVdIDogbnVsbDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRIYW5kbGVyKGV2ZW50TmFtZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudEhhbmRsZXJJbmZvKSB7XHJcbiAgICB0aGlzLmhhbmRsZXJzW2V2ZW50TmFtZV0gPSBoYW5kbGVyO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZUhhbmRsZXIoZXZlbnROYW1lOiBzdHJpbmcpIHtcclxuICAgIGRlbGV0ZSB0aGlzLmhhbmRsZXJzW2V2ZW50TmFtZV07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcHJldmVudERlZmF1bHQoZXZlbnROYW1lOiBzdHJpbmcsIHNldFZhbHVlPzogYm9vbGVhbik6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHNldFZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5wcmV2ZW50RGVmYXVsdEZsYWdzID0gdGhpcy5wcmV2ZW50RGVmYXVsdEZsYWdzIHx8IHt9O1xyXG4gICAgICB0aGlzLnByZXZlbnREZWZhdWx0RmxhZ3NbZXZlbnROYW1lXSA9IHNldFZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLnByZXZlbnREZWZhdWx0RmxhZ3MgPyB0aGlzLnByZXZlbnREZWZhdWx0RmxhZ3NbZXZlbnROYW1lXSA6IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0b3BQcm9wYWdhdGlvbihldmVudE5hbWU6IHN0cmluZywgc2V0VmFsdWU/OiBib29sZWFuKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoc2V0VmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnN0b3BQcm9wYWdhdGlvbkZsYWdzID0gdGhpcy5zdG9wUHJvcGFnYXRpb25GbGFncyB8fCB7fTtcclxuICAgICAgdGhpcy5zdG9wUHJvcGFnYXRpb25GbGFnc1tldmVudE5hbWVdID0gc2V0VmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuc3RvcFByb3BhZ2F0aW9uRmxhZ3MgPyB0aGlzLnN0b3BQcm9wYWdhdGlvbkZsYWdzW2V2ZW50TmFtZV0gOiBmYWxzZTtcclxuICB9XHJcbn1cclxuXHJcbmludGVyZmFjZSBFdmVudEhhbmRsZXJJbmZvIHtcclxuICBlbGVtZW50OiBFbGVtZW50O1xyXG4gIGV2ZW50TmFtZTogc3RyaW5nO1xyXG4gIGV2ZW50SGFuZGxlcklkOiBudW1iZXI7XHJcblxyXG4gIC8vIFRoZSBjb21wb25lbnQgd2hvc2UgdHJlZSBpbmNsdWRlcyB0aGUgZXZlbnQgaGFuZGxlciBhdHRyaWJ1dGUgZnJhbWUsICpub3QqIG5lY2Vzc2FyaWx5IHRoZVxyXG4gIC8vIHNhbWUgY29tcG9uZW50IHRoYXQgd2lsbCBiZSByZS1yZW5kZXJlZCBhZnRlciB0aGUgZXZlbnQgaXMgaGFuZGxlZCAoc2luY2Ugd2UgcmUtcmVuZGVyIHRoZVxyXG4gIC8vIGNvbXBvbmVudCB0aGF0IHN1cHBsaWVkIHRoZSBkZWxlZ2F0ZSwgbm90IHRoZSBvbmUgdGhhdCByZW5kZXJlZCB0aGUgZXZlbnQgaGFuZGxlciBmcmFtZSlcclxuICByZW5kZXJpbmdDb21wb25lbnRJZDogbnVtYmVyO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0b0xvb2t1cChpdGVtczogc3RyaW5nW10pOiB7IFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfSB7XHJcbiAgY29uc3QgcmVzdWx0ID0ge307XHJcbiAgaXRlbXMuZm9yRWFjaCh2YWx1ZSA9PiB7XHJcbiAgICByZXN1bHRbdmFsdWVdID0gdHJ1ZTtcclxuICB9KTtcclxuICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBldmVudElzRGlzYWJsZWRPbkVsZW1lbnQoZWxlbWVudDogRWxlbWVudCwgZXZlbnROYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAvLyBXZSB3YW50IHRvIHJlcGxpY2F0ZSB0aGUgbm9ybWFsIERPTSBldmVudCBiZWhhdmlvciB0aGF0LCBmb3IgJ2ludGVyYWN0aXZlJyBlbGVtZW50c1xyXG4gIC8vIHdpdGggYSAnZGlzYWJsZWQnIGF0dHJpYnV0ZSwgY2VydGFpbiBtb3VzZSBldmVudHMgYXJlIHN1cHByZXNzZWRcclxuICByZXR1cm4gKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCB8fCBlbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCB8fCBlbGVtZW50IGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCB8fCBlbGVtZW50IGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpXHJcbiAgICAmJiBkaXNhYmxlYWJsZUV2ZW50TmFtZXMuaGFzT3duUHJvcGVydHkoZXZlbnROYW1lKVxyXG4gICAgJiYgZWxlbWVudC5kaXNhYmxlZDtcclxufVxyXG4iLCJleHBvcnQgY2xhc3MgRXZlbnRGaWVsZEluZm8ge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIGNvbXBvbmVudElkOiBudW1iZXIsIHB1YmxpYyBmaWVsZFZhbHVlOiBzdHJpbmcgfCBib29sZWFuKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBmcm9tRXZlbnQoY29tcG9uZW50SWQ6IG51bWJlciwgZXZlbnQ6IEV2ZW50KTogRXZlbnRGaWVsZEluZm8gfCBudWxsIHtcclxuICAgICAgICBjb25zdCBlbGVtID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgIGlmIChlbGVtIGluc3RhbmNlb2YgRWxlbWVudCkge1xyXG4gICAgICAgICAgICBjb25zdCBmaWVsZERhdGEgPSBnZXRGb3JtRmllbGREYXRhKGVsZW0pO1xyXG4gICAgICAgICAgICBpZiAoZmllbGREYXRhKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEV2ZW50RmllbGRJbmZvKGNvbXBvbmVudElkLCBmaWVsZERhdGEudmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUaGlzIGV2ZW50IGlzbid0IGhhcHBlbmluZyBvbiBhIGZvcm0gZmllbGQgdGhhdCB3ZSBjYW4gcmV2ZXJzZS1tYXAgYmFjayB0byBzb21lIGluY29taW5nIGF0dHJpYnV0ZVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRGb3JtRmllbGREYXRhKGVsZW06IEVsZW1lbnQpIHtcclxuICAgIC8vIFRoZSBsb2dpYyBpbiBoZXJlIHNob3VsZCBiZSB0aGUgaW52ZXJzZSBvZiB0aGUgbG9naWMgaW4gQnJvd3NlclJlbmRlcmVyJ3MgdHJ5QXBwbHlTcGVjaWFsUHJvcGVydHkuXHJcbiAgICAvLyBUaGF0IGlzLCB3ZSdyZSBkb2luZyB0aGUgcmV2ZXJzZSBtYXBwaW5nLCBzdGFydGluZyBmcm9tIGFuIEhUTUwgcHJvcGVydHkgYW5kIHJlY29uc3RydWN0aW5nIHdoaWNoXHJcbiAgICAvLyBcInNwZWNpYWxcIiBhdHRyaWJ1dGUgd291bGQgaGF2ZSBiZWVuIG1hcHBlZCB0byB0aGF0IHByb3BlcnR5LlxyXG4gICAgaWYgKGVsZW0gaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIChlbGVtLnR5cGUgJiYgZWxlbS50eXBlLnRvTG93ZXJDYXNlKCkgPT09ICdjaGVja2JveCcpXHJcbiAgICAgICAgICAgID8geyB2YWx1ZTogZWxlbS5jaGVja2VkIH1cclxuICAgICAgICAgICAgOiB7IHZhbHVlOiBlbGVtLnZhbHVlIH07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGVsZW0gaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCB8fCBlbGVtIGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCkge1xyXG4gICAgICAgIHJldHVybiB7IHZhbHVlOiBlbGVtLnZhbHVlIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIEV2ZW50Rm9yRG90TmV0PFREYXRhIGV4dGVuZHMgVUlFdmVudEFyZ3M+IHtcclxuICBwdWJsaWMgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHR5cGU6IEV2ZW50QXJnc1R5cGUsIHB1YmxpYyByZWFkb25seSBkYXRhOiBURGF0YSkge1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBmcm9tRE9NRXZlbnQoZXZlbnQ6IEV2ZW50KTogRXZlbnRGb3JEb3ROZXQ8VUlFdmVudEFyZ3M+IHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBldmVudC50YXJnZXQgYXMgRWxlbWVudDtcclxuICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xyXG5cclxuICAgICAgY2FzZSAnaW5wdXQnOlxyXG4gICAgICBjYXNlICdjaGFuZ2UnOiB7XHJcblxyXG4gICAgICAgIGlmIChpc1RpbWVCYXNlZElucHV0KGVsZW1lbnQpKSB7XHJcbiAgICAgICAgICBjb25zdCBub3JtYWxpemVkVmFsdWUgPSBub3JtYWxpemVUaW1lQmFzZWRWYWx1ZShlbGVtZW50KTtcclxuICAgICAgICAgIHJldHVybiBuZXcgRXZlbnRGb3JEb3ROZXQ8VUlDaGFuZ2VFdmVudEFyZ3M+KCdjaGFuZ2UnLCB7IHR5cGU6IGV2ZW50LnR5cGUsIHZhbHVlOiBub3JtYWxpemVkVmFsdWUgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB0YXJnZXRJc0NoZWNrYm94ID0gaXNDaGVja2JveChlbGVtZW50KTtcclxuICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IHRhcmdldElzQ2hlY2tib3ggPyAhIWVsZW1lbnRbJ2NoZWNrZWQnXSA6IGVsZW1lbnRbJ3ZhbHVlJ107XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFdmVudEZvckRvdE5ldDxVSUNoYW5nZUV2ZW50QXJncz4oJ2NoYW5nZScsIHsgdHlwZTogZXZlbnQudHlwZSwgdmFsdWU6IG5ld1ZhbHVlIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjYXNlICdjb3B5JzpcclxuICAgICAgY2FzZSAnY3V0JzpcclxuICAgICAgY2FzZSAncGFzdGUnOlxyXG4gICAgICAgIHJldHVybiBuZXcgRXZlbnRGb3JEb3ROZXQ8VUlDbGlwYm9hcmRFdmVudEFyZ3M+KCdjbGlwYm9hcmQnLCB7IHR5cGU6IGV2ZW50LnR5cGUgfSk7XHJcblxyXG4gICAgICBjYXNlICdkcmFnJzpcclxuICAgICAgY2FzZSAnZHJhZ2VuZCc6XHJcbiAgICAgIGNhc2UgJ2RyYWdlbnRlcic6XHJcbiAgICAgIGNhc2UgJ2RyYWdsZWF2ZSc6XHJcbiAgICAgIGNhc2UgJ2RyYWdvdmVyJzpcclxuICAgICAgY2FzZSAnZHJhZ3N0YXJ0JzpcclxuICAgICAgY2FzZSAnZHJvcCc6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFdmVudEZvckRvdE5ldDxVSURyYWdFdmVudEFyZ3M+KCdkcmFnJywgcGFyc2VEcmFnRXZlbnQoZXZlbnQpKTtcclxuXHJcbiAgICAgIGNhc2UgJ2ZvY3VzJzpcclxuICAgICAgY2FzZSAnYmx1cic6XHJcbiAgICAgIGNhc2UgJ2ZvY3VzaW4nOlxyXG4gICAgICBjYXNlICdmb2N1c291dCc6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFdmVudEZvckRvdE5ldDxVSUZvY3VzRXZlbnRBcmdzPignZm9jdXMnLCB7IHR5cGU6IGV2ZW50LnR5cGUgfSk7XHJcblxyXG4gICAgICBjYXNlICdrZXlkb3duJzpcclxuICAgICAgY2FzZSAna2V5dXAnOlxyXG4gICAgICBjYXNlICdrZXlwcmVzcyc6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFdmVudEZvckRvdE5ldDxVSUtleWJvYXJkRXZlbnRBcmdzPigna2V5Ym9hcmQnLCBwYXJzZUtleWJvYXJkRXZlbnQoZXZlbnQgYXMgS2V5Ym9hcmRFdmVudCkpO1xyXG5cclxuICAgICAgY2FzZSAnY29udGV4dG1lbnUnOlxyXG4gICAgICBjYXNlICdjbGljayc6XHJcbiAgICAgIGNhc2UgJ21vdXNlb3Zlcic6XHJcbiAgICAgIGNhc2UgJ21vdXNlb3V0JzpcclxuICAgICAgY2FzZSAnbW91c2Vtb3ZlJzpcclxuICAgICAgY2FzZSAnbW91c2Vkb3duJzpcclxuICAgICAgY2FzZSAnbW91c2V1cCc6XHJcbiAgICAgIGNhc2UgJ2RibGNsaWNrJzpcclxuICAgICAgICByZXR1cm4gbmV3IEV2ZW50Rm9yRG90TmV0PFVJTW91c2VFdmVudEFyZ3M+KCdtb3VzZScsIHBhcnNlTW91c2VFdmVudChldmVudCBhcyBNb3VzZUV2ZW50KSk7XHJcblxyXG4gICAgICBjYXNlICdlcnJvcic6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFdmVudEZvckRvdE5ldDxVSUVycm9yRXZlbnRBcmdzPignZXJyb3InLCBwYXJzZUVycm9yRXZlbnQoZXZlbnQgYXMgRXJyb3JFdmVudCkpO1xyXG5cclxuICAgICAgY2FzZSAnbG9hZHN0YXJ0JzpcclxuICAgICAgY2FzZSAndGltZW91dCc6XHJcbiAgICAgIGNhc2UgJ2Fib3J0JzpcclxuICAgICAgY2FzZSAnbG9hZCc6XHJcbiAgICAgIGNhc2UgJ2xvYWRlbmQnOlxyXG4gICAgICBjYXNlICdwcm9ncmVzcyc6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFdmVudEZvckRvdE5ldDxVSVByb2dyZXNzRXZlbnRBcmdzPigncHJvZ3Jlc3MnLCBwYXJzZVByb2dyZXNzRXZlbnQoZXZlbnQgYXMgUHJvZ3Jlc3NFdmVudCkpO1xyXG5cclxuICAgICAgY2FzZSAndG91Y2hjYW5jZWwnOlxyXG4gICAgICBjYXNlICd0b3VjaGVuZCc6XHJcbiAgICAgIGNhc2UgJ3RvdWNobW92ZSc6XHJcbiAgICAgIGNhc2UgJ3RvdWNoZW50ZXInOlxyXG4gICAgICBjYXNlICd0b3VjaGxlYXZlJzpcclxuICAgICAgY2FzZSAndG91Y2hzdGFydCc6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFdmVudEZvckRvdE5ldDxVSVRvdWNoRXZlbnRBcmdzPigndG91Y2gnLCBwYXJzZVRvdWNoRXZlbnQoZXZlbnQgYXMgVG91Y2hFdmVudCkpO1xyXG5cclxuICAgICAgY2FzZSAnZ290cG9pbnRlcmNhcHR1cmUnOlxyXG4gICAgICBjYXNlICdsb3N0cG9pbnRlcmNhcHR1cmUnOlxyXG4gICAgICBjYXNlICdwb2ludGVyY2FuY2VsJzpcclxuICAgICAgY2FzZSAncG9pbnRlcmRvd24nOlxyXG4gICAgICBjYXNlICdwb2ludGVyZW50ZXInOlxyXG4gICAgICBjYXNlICdwb2ludGVybGVhdmUnOlxyXG4gICAgICBjYXNlICdwb2ludGVybW92ZSc6XHJcbiAgICAgIGNhc2UgJ3BvaW50ZXJvdXQnOlxyXG4gICAgICBjYXNlICdwb2ludGVyb3Zlcic6XHJcbiAgICAgIGNhc2UgJ3BvaW50ZXJ1cCc6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFdmVudEZvckRvdE5ldDxVSVBvaW50ZXJFdmVudEFyZ3M+KCdwb2ludGVyJywgcGFyc2VQb2ludGVyRXZlbnQoZXZlbnQgYXMgUG9pbnRlckV2ZW50KSk7XHJcblxyXG4gICAgICBjYXNlICd3aGVlbCc6XHJcbiAgICAgIGNhc2UgJ21vdXNld2hlZWwnOlxyXG4gICAgICAgIHJldHVybiBuZXcgRXZlbnRGb3JEb3ROZXQ8VUlXaGVlbEV2ZW50QXJncz4oJ3doZWVsJywgcGFyc2VXaGVlbEV2ZW50KGV2ZW50IGFzIFdoZWVsRXZlbnQpKTtcclxuXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFdmVudEZvckRvdE5ldDxVSUV2ZW50QXJncz4oJ3Vua25vd24nLCB7IHR5cGU6IGV2ZW50LnR5cGUgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZURyYWdFdmVudChldmVudDogYW55KSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLnBhcnNlTW91c2VFdmVudChldmVudCksXHJcbiAgICBkYXRhVHJhbnNmZXI6IGV2ZW50LmRhdGFUcmFuc2ZlcixcclxuXHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VXaGVlbEV2ZW50KGV2ZW50OiBXaGVlbEV2ZW50KSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLnBhcnNlTW91c2VFdmVudChldmVudCksXHJcbiAgICBkZWx0YVg6IGV2ZW50LmRlbHRhWCxcclxuICAgIGRlbHRhWTogZXZlbnQuZGVsdGFZLFxyXG4gICAgZGVsdGFaOiBldmVudC5kZWx0YVosXHJcbiAgICBkZWx0YU1vZGU6IGV2ZW50LmRlbHRhTW9kZSxcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZUVycm9yRXZlbnQoZXZlbnQ6IEVycm9yRXZlbnQpIHtcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogZXZlbnQudHlwZSxcclxuICAgIG1lc3NhZ2U6IGV2ZW50Lm1lc3NhZ2UsXHJcbiAgICBmaWxlbmFtZTogZXZlbnQuZmlsZW5hbWUsXHJcbiAgICBsaW5lbm86IGV2ZW50LmxpbmVubyxcclxuICAgIGNvbG5vOiBldmVudC5jb2xubyxcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZVByb2dyZXNzRXZlbnQoZXZlbnQ6IFByb2dyZXNzRXZlbnQpIHtcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogZXZlbnQudHlwZSxcclxuICAgIGxlbmd0aENvbXB1dGFibGU6IGV2ZW50Lmxlbmd0aENvbXB1dGFibGUsXHJcbiAgICBsb2FkZWQ6IGV2ZW50LmxvYWRlZCxcclxuICAgIHRvdGFsOiBldmVudC50b3RhbCxcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZVRvdWNoRXZlbnQoZXZlbnQ6IFRvdWNoRXZlbnQpIHtcclxuXHJcbiAgZnVuY3Rpb24gcGFyc2VUb3VjaCh0b3VjaExpc3Q6IFRvdWNoTGlzdCkge1xyXG4gICAgY29uc3QgdG91Y2hlczogVUlUb3VjaFBvaW50W10gPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvdWNoTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCB0b3VjaCA9IHRvdWNoTGlzdFtpXTtcclxuICAgICAgdG91Y2hlcy5wdXNoKHtcclxuICAgICAgICBpZGVudGlmaWVyOiB0b3VjaC5pZGVudGlmaWVyLFxyXG4gICAgICAgIGNsaWVudFg6IHRvdWNoLmNsaWVudFgsXHJcbiAgICAgICAgY2xpZW50WTogdG91Y2guY2xpZW50WSxcclxuICAgICAgICBzY3JlZW5YOiB0b3VjaC5zY3JlZW5YLFxyXG4gICAgICAgIHNjcmVlblk6IHRvdWNoLnNjcmVlblksXHJcbiAgICAgICAgcGFnZVg6IHRvdWNoLnBhZ2VYLFxyXG4gICAgICAgIHBhZ2VZOiB0b3VjaC5wYWdlWSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG91Y2hlcztcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBldmVudC50eXBlLFxyXG4gICAgZGV0YWlsOiBldmVudC5kZXRhaWwsXHJcbiAgICB0b3VjaGVzOiBwYXJzZVRvdWNoKGV2ZW50LnRvdWNoZXMpLFxyXG4gICAgdGFyZ2V0VG91Y2hlczogcGFyc2VUb3VjaChldmVudC50YXJnZXRUb3VjaGVzKSxcclxuICAgIGNoYW5nZWRUb3VjaGVzOiBwYXJzZVRvdWNoKGV2ZW50LmNoYW5nZWRUb3VjaGVzKSxcclxuICAgIGN0cmxLZXk6IGV2ZW50LmN0cmxLZXksXHJcbiAgICBzaGlmdEtleTogZXZlbnQuc2hpZnRLZXksXHJcbiAgICBhbHRLZXk6IGV2ZW50LmFsdEtleSxcclxuICAgIG1ldGFLZXk6IGV2ZW50Lm1ldGFLZXksXHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VLZXlib2FyZEV2ZW50KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IGV2ZW50LnR5cGUsXHJcbiAgICBrZXk6IGV2ZW50LmtleSxcclxuICAgIGNvZGU6IGV2ZW50LmNvZGUsXHJcbiAgICBsb2NhdGlvbjogZXZlbnQubG9jYXRpb24sXHJcbiAgICByZXBlYXQ6IGV2ZW50LnJlcGVhdCxcclxuICAgIGN0cmxLZXk6IGV2ZW50LmN0cmxLZXksXHJcbiAgICBzaGlmdEtleTogZXZlbnQuc2hpZnRLZXksXHJcbiAgICBhbHRLZXk6IGV2ZW50LmFsdEtleSxcclxuICAgIG1ldGFLZXk6IGV2ZW50Lm1ldGFLZXksXHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VQb2ludGVyRXZlbnQoZXZlbnQ6IFBvaW50ZXJFdmVudCkge1xyXG4gIHJldHVybiB7XHJcbiAgICAuLi5wYXJzZU1vdXNlRXZlbnQoZXZlbnQpLFxyXG4gICAgcG9pbnRlcklkOiBldmVudC5wb2ludGVySWQsXHJcbiAgICB3aWR0aDogZXZlbnQud2lkdGgsXHJcbiAgICBoZWlnaHQ6IGV2ZW50LmhlaWdodCxcclxuICAgIHByZXNzdXJlOiBldmVudC5wcmVzc3VyZSxcclxuICAgIHRpbHRYOiBldmVudC50aWx0WCxcclxuICAgIHRpbHRZOiBldmVudC50aWx0WSxcclxuICAgIHBvaW50ZXJUeXBlOiBldmVudC5wb2ludGVyVHlwZSxcclxuICAgIGlzUHJpbWFyeTogZXZlbnQuaXNQcmltYXJ5LFxyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlTW91c2VFdmVudChldmVudDogTW91c2VFdmVudCkge1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBldmVudC50eXBlLFxyXG4gICAgZGV0YWlsOiBldmVudC5kZXRhaWwsXHJcbiAgICBzY3JlZW5YOiBldmVudC5zY3JlZW5YLFxyXG4gICAgc2NyZWVuWTogZXZlbnQuc2NyZWVuWSxcclxuICAgIGNsaWVudFg6IGV2ZW50LmNsaWVudFgsXHJcbiAgICBjbGllbnRZOiBldmVudC5jbGllbnRZLFxyXG4gICAgYnV0dG9uOiBldmVudC5idXR0b24sXHJcbiAgICBidXR0b25zOiBldmVudC5idXR0b25zLFxyXG4gICAgY3RybEtleTogZXZlbnQuY3RybEtleSxcclxuICAgIHNoaWZ0S2V5OiBldmVudC5zaGlmdEtleSxcclxuICAgIGFsdEtleTogZXZlbnQuYWx0S2V5LFxyXG4gICAgbWV0YUtleTogZXZlbnQubWV0YUtleSxcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc0NoZWNrYm94KGVsZW1lbnQ6IEVsZW1lbnQgfCBudWxsKTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuICEhZWxlbWVudCAmJiBlbGVtZW50LnRhZ05hbWUgPT09ICdJTlBVVCcgJiYgZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKSA9PT0gJ2NoZWNrYm94JztcclxufVxyXG5cclxuY29uc3QgdGltZUJhc2VkSW5wdXRzID0gW1xyXG4gICdkYXRlJyxcclxuICAnZGF0ZXRpbWUtbG9jYWwnLFxyXG4gICdtb250aCcsXHJcbiAgJ3RpbWUnLFxyXG4gICd3ZWVrJyxcclxuXTtcclxuXHJcbmZ1bmN0aW9uIGlzVGltZUJhc2VkSW5wdXQoZWxlbWVudDogRWxlbWVudCk6IGVsZW1lbnQgaXMgSFRNTElucHV0RWxlbWVudCB7XHJcbiAgcmV0dXJuIHRpbWVCYXNlZElucHV0cy5pbmRleE9mKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCd0eXBlJykhKSAhPT0gLTE7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5vcm1hbGl6ZVRpbWVCYXNlZFZhbHVlKGVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQpOiBzdHJpbmcge1xyXG4gIGNvbnN0IHZhbHVlID0gZWxlbWVudC52YWx1ZTtcclxuICBjb25zdCB0eXBlID0gZWxlbWVudC50eXBlO1xyXG4gIHN3aXRjaCAodHlwZSkge1xyXG4gICAgY2FzZSAnZGF0ZSc6XHJcbiAgICBjYXNlICdkYXRldGltZS1sb2NhbCc6XHJcbiAgICBjYXNlICdtb250aCc6XHJcbiAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIGNhc2UgJ3RpbWUnOlxyXG4gICAgICByZXR1cm4gdmFsdWUubGVuZ3RoID09PSA1ID8gdmFsdWUgKyAnOjAwJyA6IHZhbHVlOyAvLyBDb252ZXJ0IGhoOm1tIHRvIGhoOm1tOjAwXHJcbiAgICBjYXNlICd3ZWVrJzpcclxuICAgICAgLy8gRm9yIG5vdyB3ZSBhcmUgbm90IGdvaW5nIHRvIG5vcm1hbGl6ZSBpbnB1dCB0eXBlIHdlZWsgYXMgaXQgaXMgbm90IHRyaXZpYWxcclxuICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGVsZW1lbnQgdHlwZSAnJHt0eXBlfScuYCk7XHJcbn1cclxuXHJcbi8vIFRoZSBmb2xsb3dpbmcgaW50ZXJmYWNlcyBtdXN0IGJlIGtlcHQgaW4gc3luYyB3aXRoIHRoZSBVSUV2ZW50QXJncyBDIyBjbGFzc2VzXHJcblxyXG5leHBvcnQgdHlwZSBFdmVudEFyZ3NUeXBlID0gJ2NoYW5nZScgfCAnY2xpcGJvYXJkJyB8ICdkcmFnJyB8ICdlcnJvcicgfCAnZm9jdXMnIHwgJ2tleWJvYXJkJyB8ICdtb3VzZScgfCAncG9pbnRlcicgfCAncHJvZ3Jlc3MnIHwgJ3RvdWNoJyB8ICd1bmtub3duJyB8ICd3aGVlbCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFVJRXZlbnRBcmdzIHtcclxuICB0eXBlOiBzdHJpbmc7XHJcbn1cclxuXHJcbmludGVyZmFjZSBVSUNoYW5nZUV2ZW50QXJncyBleHRlbmRzIFVJRXZlbnRBcmdzIHtcclxuICB2YWx1ZTogc3RyaW5nIHwgYm9vbGVhbjtcclxufVxyXG5cclxuaW50ZXJmYWNlIFVJQ2xpcGJvYXJkRXZlbnRBcmdzIGV4dGVuZHMgVUlFdmVudEFyZ3Mge1xyXG59XHJcblxyXG5pbnRlcmZhY2UgVUlEcmFnRXZlbnRBcmdzIGV4dGVuZHMgVUlFdmVudEFyZ3Mge1xyXG4gIGRldGFpbDogbnVtYmVyO1xyXG4gIGRhdGFUcmFuc2ZlcjogVUlEYXRhVHJhbnNmZXI7XHJcbiAgc2NyZWVuWDogbnVtYmVyO1xyXG4gIHNjcmVlblk6IG51bWJlcjtcclxuICBjbGllbnRYOiBudW1iZXI7XHJcbiAgY2xpZW50WTogbnVtYmVyO1xyXG4gIGJ1dHRvbjogbnVtYmVyO1xyXG4gIGJ1dHRvbnM6IG51bWJlcjtcclxuICBjdHJsS2V5OiBib29sZWFuO1xyXG4gIHNoaWZ0S2V5OiBib29sZWFuO1xyXG4gIGFsdEtleTogYm9vbGVhbjtcclxuICBtZXRhS2V5OiBib29sZWFuO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgVUlEYXRhVHJhbnNmZXIge1xyXG4gIGRyb3BFZmZlY3Q6IHN0cmluZztcclxuICBlZmZlY3RBbGxvd2VkOiBzdHJpbmc7XHJcbiAgZmlsZXM6IHN0cmluZ1tdO1xyXG4gIGl0ZW1zOiBVSURhdGFUcmFuc2Zlckl0ZW1bXTtcclxuICB0eXBlczogc3RyaW5nW107XHJcbn1cclxuXHJcbmludGVyZmFjZSBVSURhdGFUcmFuc2Zlckl0ZW0ge1xyXG4gIGtpbmQ6IHN0cmluZztcclxuICB0eXBlOiBzdHJpbmc7XHJcbn1cclxuXHJcbmludGVyZmFjZSBVSUVycm9yRXZlbnRBcmdzIGV4dGVuZHMgVUlFdmVudEFyZ3Mge1xyXG4gIG1lc3NhZ2U6IHN0cmluZztcclxuICBmaWxlbmFtZTogc3RyaW5nO1xyXG4gIGxpbmVubzogbnVtYmVyO1xyXG4gIGNvbG5vOiBudW1iZXI7XHJcblxyXG4gIC8vIG9taXR0aW5nICdlcnJvcicgaGVyZSBzaW5jZSB3ZSdkIGhhdmUgdG8gc2VyaWFsaXplIGl0LCBhbmQgaXQncyBub3QgY2xlYXIgd2Ugd2lsbCB3YW50IHRvXHJcbiAgLy8gZG8gdGhhdC4gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0Vycm9yRXZlbnRcclxufVxyXG5cclxuaW50ZXJmYWNlIFVJRm9jdXNFdmVudEFyZ3MgZXh0ZW5kcyBVSUV2ZW50QXJncyB7XHJcbn1cclxuXHJcbmludGVyZmFjZSBVSUtleWJvYXJkRXZlbnRBcmdzIGV4dGVuZHMgVUlFdmVudEFyZ3Mge1xyXG4gIGtleTogc3RyaW5nO1xyXG4gIGNvZGU6IHN0cmluZztcclxuICBsb2NhdGlvbjogbnVtYmVyO1xyXG4gIHJlcGVhdDogYm9vbGVhbjtcclxuICBjdHJsS2V5OiBib29sZWFuO1xyXG4gIHNoaWZ0S2V5OiBib29sZWFuO1xyXG4gIGFsdEtleTogYm9vbGVhbjtcclxuICBtZXRhS2V5OiBib29sZWFuO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgVUlNb3VzZUV2ZW50QXJncyBleHRlbmRzIFVJRXZlbnRBcmdzIHtcclxuICBkZXRhaWw6IG51bWJlcjtcclxuICBzY3JlZW5YOiBudW1iZXI7XHJcbiAgc2NyZWVuWTogbnVtYmVyO1xyXG4gIGNsaWVudFg6IG51bWJlcjtcclxuICBjbGllbnRZOiBudW1iZXI7XHJcbiAgYnV0dG9uOiBudW1iZXI7XHJcbiAgYnV0dG9uczogbnVtYmVyO1xyXG4gIGN0cmxLZXk6IGJvb2xlYW47XHJcbiAgc2hpZnRLZXk6IGJvb2xlYW47XHJcbiAgYWx0S2V5OiBib29sZWFuO1xyXG4gIG1ldGFLZXk6IGJvb2xlYW47XHJcbn1cclxuXHJcbmludGVyZmFjZSBVSVBvaW50ZXJFdmVudEFyZ3MgZXh0ZW5kcyBVSU1vdXNlRXZlbnRBcmdzIHtcclxuICBwb2ludGVySWQ6IG51bWJlcjtcclxuICB3aWR0aDogbnVtYmVyO1xyXG4gIGhlaWdodDogbnVtYmVyO1xyXG4gIHByZXNzdXJlOiBudW1iZXI7XHJcbiAgdGlsdFg6IG51bWJlcjtcclxuICB0aWx0WTogbnVtYmVyO1xyXG4gIHBvaW50ZXJUeXBlOiBzdHJpbmc7XHJcbiAgaXNQcmltYXJ5OiBib29sZWFuO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgVUlQcm9ncmVzc0V2ZW50QXJncyBleHRlbmRzIFVJRXZlbnRBcmdzIHtcclxuICBsZW5ndGhDb21wdXRhYmxlOiBib29sZWFuO1xyXG4gIGxvYWRlZDogbnVtYmVyO1xyXG4gIHRvdGFsOiBudW1iZXI7XHJcbn1cclxuXHJcbmludGVyZmFjZSBVSVRvdWNoRXZlbnRBcmdzIGV4dGVuZHMgVUlFdmVudEFyZ3Mge1xyXG4gIGRldGFpbDogbnVtYmVyO1xyXG4gIHRvdWNoZXM6IFVJVG91Y2hQb2ludFtdO1xyXG4gIHRhcmdldFRvdWNoZXM6IFVJVG91Y2hQb2ludFtdO1xyXG4gIGNoYW5nZWRUb3VjaGVzOiBVSVRvdWNoUG9pbnRbXTtcclxuICBjdHJsS2V5OiBib29sZWFuO1xyXG4gIHNoaWZ0S2V5OiBib29sZWFuO1xyXG4gIGFsdEtleTogYm9vbGVhbjtcclxuICBtZXRhS2V5OiBib29sZWFuO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgVUlUb3VjaFBvaW50IHtcclxuICBpZGVudGlmaWVyOiBudW1iZXI7XHJcbiAgc2NyZWVuWDogbnVtYmVyO1xyXG4gIHNjcmVlblk6IG51bWJlcjtcclxuICBjbGllbnRYOiBudW1iZXI7XHJcbiAgY2xpZW50WTogbnVtYmVyO1xyXG4gIHBhZ2VYOiBudW1iZXI7XHJcbiAgcGFnZVk6IG51bWJlcjtcclxufVxyXG5cclxuaW50ZXJmYWNlIFVJV2hlZWxFdmVudEFyZ3MgZXh0ZW5kcyBVSU1vdXNlRXZlbnRBcmdzIHtcclxuICBkZWx0YVg6IG51bWJlcjtcclxuICBkZWx0YVk6IG51bWJlcjtcclxuICBkZWx0YVo6IG51bWJlcjtcclxuICBkZWx0YU1vZGU6IG51bWJlcjtcclxufVxyXG4iLCIvKlxyXG4gIEEgTG9naWNhbEVsZW1lbnQgcGxheXMgdGhlIHNhbWUgcm9sZSBhcyBhbiBFbGVtZW50IGluc3RhbmNlIGZyb20gdGhlIHBvaW50IG9mIHZpZXcgb2YgdGhlXHJcbiAgQVBJIGNvbnN1bWVyLiBJbnNlcnRpbmcgYW5kIHJlbW92aW5nIGxvZ2ljYWwgZWxlbWVudHMgdXBkYXRlcyB0aGUgYnJvd3NlciBET00ganVzdCB0aGUgc2FtZS5cclxuXHJcbiAgVGhlIGRpZmZlcmVuY2UgaXMgdGhhdCwgdW5saWtlIHJlZ3VsYXIgRE9NIG11dGF0aW9uIEFQSXMsIHRoZSBMb2dpY2FsRWxlbWVudCBBUElzIGRvbid0IHVzZVxyXG4gIHRoZSB1bmRlcmx5aW5nIERPTSBzdHJ1Y3R1cmUgYXMgdGhlIGRhdGEgc3RvcmFnZSBmb3IgdGhlIGVsZW1lbnQgaGllcmFyY2h5LiBJbnN0ZWFkLCB0aGVcclxuICBMb2dpY2FsRWxlbWVudCBBUElzIHRha2UgY2FyZSBvZiB0cmFja2luZyBoaWVyYXJjaGljYWwgcmVsYXRpb25zaGlwcyBzZXBhcmF0ZWx5LiBUaGUgcG9pbnRcclxuICBvZiB0aGlzIGlzIHRvIHBlcm1pdCBhIGxvZ2ljYWwgdHJlZSBzdHJ1Y3R1cmUgaW4gd2hpY2ggcGFyZW50L2NoaWxkIHJlbGF0aW9uc2hpcHMgZG9uJ3RcclxuICBoYXZlIHRvIGJlIG1hdGVyaWFsaXplZCBpbiB0ZXJtcyBvZiBET00gZWxlbWVudCBwYXJlbnQvY2hpbGQgcmVsYXRpb25zaGlwcy4gQW5kIHRoZSByZWFzb25cclxuICB3aHkgd2Ugd2FudCB0aGF0IGlzIHNvIHRoYXQgaGllcmFyY2hpZXMgb2YgQmxhem9yIGNvbXBvbmVudHMgY2FuIGJlIHRyYWNrZWQgZXZlbiB3aGVuIHRob3NlXHJcbiAgY29tcG9uZW50cycgcmVuZGVyIG91dHB1dCBuZWVkIG5vdCBiZSBhIHNpbmdsZSBsaXRlcmFsIERPTSBlbGVtZW50LlxyXG5cclxuICBDb25zdW1lcnMgb2YgdGhlIEFQSSBkb24ndCBuZWVkIHRvIGtub3cgYWJvdXQgdGhlIGltcGxlbWVudGF0aW9uLCBidXQgaG93IGl0J3MgZG9uZSBpczpcclxuICAtIEVhY2ggTG9naWNhbEVsZW1lbnQgaXMgbWF0ZXJpYWxpemVkIGluIHRoZSBET00gYXMgZWl0aGVyOlxyXG4gICAgLSBBIE5vZGUgaW5zdGFuY2UsIGZvciBhY3R1YWwgTm9kZSBpbnN0YW5jZXMgaW5zZXJ0ZWQgdXNpbmcgJ2luc2VydExvZ2ljYWxDaGlsZCcgb3JcclxuICAgICAgZm9yIEVsZW1lbnQgaW5zdGFuY2VzIHByb21vdGVkIHRvIExvZ2ljYWxFbGVtZW50IHZpYSAndG9Mb2dpY2FsRWxlbWVudCdcclxuICAgIC0gQSBDb21tZW50IGluc3RhbmNlLCBmb3IgJ2xvZ2ljYWwgY29udGFpbmVyJyBpbnN0YW5jZXMgaW5zZXJ0ZWQgdXNpbmcgJ2NyZWF0ZUFuZEluc2VydExvZ2ljYWxDb250YWluZXInXHJcbiAgLSBUaGVuLCBvbiB0aGF0IGluc3RhbmNlIChpLmUuLCB0aGUgTm9kZSBvciBDb21tZW50KSwgd2Ugc3RvcmUgYW4gYXJyYXkgb2YgJ2xvZ2ljYWwgY2hpbGRyZW4nXHJcbiAgICBpbnN0YW5jZXMsIGUuZy4sXHJcbiAgICAgIFtmaXJzdENoaWxkLCBzZWNvbmRDaGlsZCwgdGhpcmRDaGlsZCwgLi4uXVxyXG4gICAgLi4uIHBsdXMgd2Ugc3RvcmUgYSByZWZlcmVuY2UgdG8gdGhlICdsb2dpY2FsIHBhcmVudCcgKGlmIGFueSlcclxuICAtIFRoZSAnbG9naWNhbCBjaGlsZHJlbicgYXJyYXkgbWVhbnMgd2UgY2FuIGxvb2sgdXAgaW4gTygxKTpcclxuICAgIC0gVGhlIG51bWJlciBvZiBsb2dpY2FsIGNoaWxkcmVuIChub3QgY3VycmVudGx5IGltcGxlbWVudGVkIGJlY2F1c2Ugbm90IHJlcXVpcmVkLCBidXQgdHJpdmlhbClcclxuICAgIC0gVGhlIGxvZ2ljYWwgY2hpbGQgYXQgYW55IGdpdmVuIGluZGV4XHJcbiAgLSBXaGVuZXZlciBhIGxvZ2ljYWwgY2hpbGQgaXMgYWRkZWQgb3IgcmVtb3ZlZCwgd2UgdXBkYXRlIHRoZSBwYXJlbnQncyBhcnJheSBvZiBsb2dpY2FsIGNoaWxkcmVuXHJcbiovXHJcblxyXG5jb25zdCBsb2dpY2FsQ2hpbGRyZW5Qcm9wbmFtZSA9IGNyZWF0ZVN5bWJvbE9yRmFsbGJhY2soJ19ibGF6b3JMb2dpY2FsQ2hpbGRyZW4nKTtcclxuY29uc3QgbG9naWNhbFBhcmVudFByb3BuYW1lID0gY3JlYXRlU3ltYm9sT3JGYWxsYmFjaygnX2JsYXpvckxvZ2ljYWxQYXJlbnQnKTtcclxuY29uc3QgbG9naWNhbEVuZFNpYmxpbmdQcm9wbmFtZSA9IGNyZWF0ZVN5bWJvbE9yRmFsbGJhY2soJ19ibGF6b3JMb2dpY2FsRW5kJyk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG9Mb2dpY2FsUm9vdENvbW1lbnRFbGVtZW50KHN0YXJ0OiBDb21tZW50LCBlbmQ6IENvbW1lbnQpOiBMb2dpY2FsRWxlbWVudCB7XHJcbiAgLy8gTm93IHRoYXQgd2Ugc3VwcG9ydCBzdGFydC9lbmQgY29tbWVudHMgYXMgY29tcG9uZW50IGRlbGltaXRlcnMgd2UgYXJlIGdvaW5nIHRvIGJlIHNldHRpbmcgdXBcclxuICAvLyBhZGRpbmcgdGhlIGNvbXBvbmVudHMgcmVuZGVyZWQgb3V0cHV0IGFzIHNpYmxpbmdzIG9mIHRoZSBzdGFydC9lbmQgdGFncyAoYmV0d2VlbikuXHJcbiAgLy8gRm9yIHRoYXQgdG8gd29yaywgd2UgbmVlZCB0byBhcHByb3ByaWF0ZWx5IGNvbmZpZ3VyZSB0aGUgcGFyZW50IGVsZW1lbnQgdG8gYmUgYSBsb2dpY2FsIGVsZW1lbnRcclxuICAvLyB3aXRoIGFsbCB0aGVpciBjaGlsZHJlbiBiZWluZyB0aGUgY2hpbGQgZWxlbWVudHMuXHJcbiAgLy8gRm9yIGV4YW1wbGUsIGltYWdpbmUgeW91IGhhdmVcclxuICAvLyA8YXBwPlxyXG4gIC8vIDxkaXY+PHA+U3RhdGljIGNvbnRlbnQ8L3A+PC9kaXY+XHJcbiAgLy8gPCEtLSBzdGFydCBjb21wb25lbnRcclxuICAvLyA8IS0tIGVuZCBjb21wb25lbnRcclxuICAvLyA8Zm9vdGVyPlNvbWUgb3RoZXIgY29udGVudDwvZm9vdGVyPlxyXG4gIC8vIDxhcHA+XHJcbiAgLy8gV2Ugd2FudCB0aGUgcGFyZW50IGVsZW1lbnQgdG8gYmUgc29tZXRoaW5nIGxpa2VcclxuICAvLyAqYXBwXHJcbiAgLy8gfC0gKmRpdlxyXG4gIC8vIHwtICpjb21wb25lbnRcclxuICAvLyB8LSAqZm9vdGVyXHJcbiAgaWYgKCFzdGFydC5wYXJlbnROb2RlKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENvbW1lbnQgbm90IGNvbm5lY3RlZCB0byB0aGUgRE9NICR7c3RhcnQudGV4dENvbnRlbnR9YCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBwYXJlbnQgPSBzdGFydC5wYXJlbnROb2RlO1xyXG4gIGNvbnN0IHBhcmVudExvZ2ljYWxFbGVtZW50ID0gdG9Mb2dpY2FsRWxlbWVudChwYXJlbnQsIC8qIGFsbG93IGV4aXN0aW5nIGNvbnRlbnRzICovIHRydWUpO1xyXG4gIGNvbnN0IGNoaWxkcmVuID0gZ2V0TG9naWNhbENoaWxkcmVuQXJyYXkocGFyZW50TG9naWNhbEVsZW1lbnQpO1xyXG4gIEFycmF5LmZyb20ocGFyZW50LmNoaWxkTm9kZXMpLmZvckVhY2gobiA9PiBjaGlsZHJlbi5wdXNoKG4gYXMgdW5rbm93biBhcyBMb2dpY2FsRWxlbWVudCkpO1xyXG4gIHN0YXJ0W2xvZ2ljYWxQYXJlbnRQcm9wbmFtZV0gPSBwYXJlbnRMb2dpY2FsRWxlbWVudDtcclxuICAvLyBXZSBtaWdodCBub3QgaGF2ZSBhbiBlbmQgY29tbWVudCBpbiB0aGUgY2FzZSBvZiBub24tcHJlcmVuZGVyZWQgY29tcG9uZW50cy5cclxuICBpZiAoZW5kKSB7XHJcbiAgICBzdGFydFtsb2dpY2FsRW5kU2libGluZ1Byb3BuYW1lXSA9IGVuZDtcclxuICAgIHRvTG9naWNhbEVsZW1lbnQoZW5kLCAvKiBhbGxvd0V4aXN0aW5nY29udGVudHMgKi8gdHJ1ZSk7XHJcbiAgfVxyXG4gIHJldHVybiB0b0xvZ2ljYWxFbGVtZW50KHN0YXJ0LCAvKiBhbGxvd0V4aXN0aW5nQ29udGVudHMgKi8gdHJ1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0b0xvZ2ljYWxFbGVtZW50KGVsZW1lbnQ6IE5vZGUsIGFsbG93RXhpc3RpbmdDb250ZW50cz86IGJvb2xlYW4pOiBMb2dpY2FsRWxlbWVudCB7XHJcbiAgLy8gTm9ybWFsbHkgaXQncyBnb29kIHRvIGFzc2VydCB0aGF0IHRoZSBlbGVtZW50IGhhcyBzdGFydGVkIGVtcHR5LCBiZWNhdXNlIHRoYXQncyB0aGUgdXN1YWxcclxuICAvLyBzaXR1YXRpb24gYW5kIHdlIHByb2JhYmx5IGhhdmUgYSBidWcgaWYgaXQncyBub3QuIEJ1dCBmb3IgdGhlIGVsZW1lbnQgdGhhdCBjb250YWluIHByZXJlbmRlcmVkXHJcbiAgLy8gcm9vdCBjb21wb25lbnRzLCB3ZSB3YW50IHRvIGxldCB0aGVtIGtlZXAgdGhlaXIgY29udGVudCB1bnRpbCB3ZSByZXBsYWNlIGl0LlxyXG4gIGlmIChlbGVtZW50LmNoaWxkTm9kZXMubGVuZ3RoID4gMCAmJiAhYWxsb3dFeGlzdGluZ0NvbnRlbnRzKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldyBsb2dpY2FsIGVsZW1lbnRzIG11c3Qgc3RhcnQgZW1wdHksIG9yIGFsbG93RXhpc3RpbmdDb250ZW50cyBtdXN0IGJlIHRydWUnKTtcclxuICB9XHJcblxyXG4gIGVsZW1lbnRbbG9naWNhbENoaWxkcmVuUHJvcG5hbWVdID0gW107XHJcbiAgcmV0dXJuIGVsZW1lbnQgYXMgdW5rbm93biBhcyBMb2dpY2FsRWxlbWVudDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFuZEluc2VydExvZ2ljYWxDb250YWluZXIocGFyZW50OiBMb2dpY2FsRWxlbWVudCwgY2hpbGRJbmRleDogbnVtYmVyKTogTG9naWNhbEVsZW1lbnQge1xyXG4gIGNvbnN0IGNvbnRhaW5lckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KCchJyk7XHJcbiAgaW5zZXJ0TG9naWNhbENoaWxkKGNvbnRhaW5lckVsZW1lbnQsIHBhcmVudCwgY2hpbGRJbmRleCk7XHJcbiAgcmV0dXJuIGNvbnRhaW5lckVsZW1lbnQgYXMgYW55IGFzIExvZ2ljYWxFbGVtZW50O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0TG9naWNhbENoaWxkKGNoaWxkOiBOb2RlLCBwYXJlbnQ6IExvZ2ljYWxFbGVtZW50LCBjaGlsZEluZGV4OiBudW1iZXIpIHtcclxuICBjb25zdCBjaGlsZEFzTG9naWNhbEVsZW1lbnQgPSBjaGlsZCBhcyBhbnkgYXMgTG9naWNhbEVsZW1lbnQ7XHJcbiAgaWYgKGNoaWxkIGluc3RhbmNlb2YgQ29tbWVudCkge1xyXG4gICAgY29uc3QgZXhpc3RpbmdHcmFuZGNoaWxkcmVuID0gZ2V0TG9naWNhbENoaWxkcmVuQXJyYXkoY2hpbGRBc0xvZ2ljYWxFbGVtZW50KTtcclxuICAgIGlmIChleGlzdGluZ0dyYW5kY2hpbGRyZW4gJiYgZ2V0TG9naWNhbENoaWxkcmVuQXJyYXkoY2hpbGRBc0xvZ2ljYWxFbGVtZW50KS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIC8vIFRoZXJlJ3Mgbm90aGluZyB0byBzdG9wIHVzIGltcGxlbWVudGluZyBzdXBwb3J0IGZvciB0aGlzIHNjZW5hcmlvLCBhbmQgaXQncyBub3QgZGlmZmljdWx0XHJcbiAgICAgIC8vIChhZnRlciBpbnNlcnRpbmcgJ2NoaWxkJyBpdHNlbGYsIGFsc28gaXRlcmF0ZSB0aHJvdWdoIGl0cyBsb2dpY2FsIGNoaWxkcmVuIGFuZCBwaHlzaWNhbGx5XHJcbiAgICAgIC8vIHB1dCB0aGVtIGFzIGZvbGxvd2luZy1zaWJsaW5ncyBpbiB0aGUgRE9NKS4gSG93ZXZlciB0aGVyZSdzIG5vIHNjZW5hcmlvIHRoYXQgcmVxdWlyZXMgaXRcclxuICAgICAgLy8gcHJlc2VudGx5LCBzbyBpZiB3ZSBkaWQgaW1wbGVtZW50IGl0IHRoZXJlJ2QgYmUgbm8gZ29vZCB3YXkgdG8gaGF2ZSB0ZXN0cyBmb3IgaXQuXHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkOiBpbnNlcnRpbmcgbm9uLWVtcHR5IGxvZ2ljYWwgY29udGFpbmVyJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAoZ2V0TG9naWNhbFBhcmVudChjaGlsZEFzTG9naWNhbEVsZW1lbnQpKSB7XHJcbiAgICAvLyBMaWtld2lzZSwgd2UgY291bGQgZWFzaWx5IHN1cHBvcnQgdGhpcyBzY2VuYXJpbyB0b28gKGluIHRoaXMgJ2lmJyBibG9jaywganVzdCBzcGxpY2VcclxuICAgIC8vIG91dCAnY2hpbGQnIGZyb20gdGhlIGxvZ2ljYWwgY2hpbGRyZW4gYXJyYXkgb2YgaXRzIHByZXZpb3VzIGxvZ2ljYWwgcGFyZW50IGJ5IHVzaW5nXHJcbiAgICAvLyBBcnJheS5wcm90b3R5cGUuaW5kZXhPZiB0byBkZXRlcm1pbmUgaXRzIHByZXZpb3VzIHNpYmxpbmcgaW5kZXgpLlxyXG4gICAgLy8gQnV0IGFnYWluLCBzaW5jZSB0aGVyZSdzIG5vdCBjdXJyZW50bHkgYW55IHNjZW5hcmlvIHRoYXQgd291bGQgdXNlIGl0LCB3ZSB3b3VsZCBub3RcclxuICAgIC8vIGhhdmUgYW55IHRlc3QgY292ZXJhZ2UgZm9yIHN1Y2ggYW4gaW1wbGVtZW50YXRpb24uXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZDogbW92aW5nIGV4aXN0aW5nIGxvZ2ljYWwgY2hpbGRyZW4nKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IG5ld1NpYmxpbmdzID0gZ2V0TG9naWNhbENoaWxkcmVuQXJyYXkocGFyZW50KTtcclxuICBpZiAoY2hpbGRJbmRleCA8IG5ld1NpYmxpbmdzLmxlbmd0aCkge1xyXG4gICAgLy8gSW5zZXJ0XHJcbiAgICBjb25zdCBuZXh0U2libGluZyA9IG5ld1NpYmxpbmdzW2NoaWxkSW5kZXhdIGFzIGFueSBhcyBOb2RlO1xyXG4gICAgbmV4dFNpYmxpbmcucGFyZW50Tm9kZSEuaW5zZXJ0QmVmb3JlKGNoaWxkLCBuZXh0U2libGluZyk7XHJcbiAgICBuZXdTaWJsaW5ncy5zcGxpY2UoY2hpbGRJbmRleCwgMCwgY2hpbGRBc0xvZ2ljYWxFbGVtZW50KTtcclxuICB9IGVsc2Uge1xyXG4gICAgLy8gQXBwZW5kXHJcbiAgICBhcHBlbmREb21Ob2RlKGNoaWxkLCBwYXJlbnQpO1xyXG4gICAgbmV3U2libGluZ3MucHVzaChjaGlsZEFzTG9naWNhbEVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgY2hpbGRBc0xvZ2ljYWxFbGVtZW50W2xvZ2ljYWxQYXJlbnRQcm9wbmFtZV0gPSBwYXJlbnQ7XHJcbiAgaWYgKCEobG9naWNhbENoaWxkcmVuUHJvcG5hbWUgaW4gY2hpbGRBc0xvZ2ljYWxFbGVtZW50KSkge1xyXG4gICAgY2hpbGRBc0xvZ2ljYWxFbGVtZW50W2xvZ2ljYWxDaGlsZHJlblByb3BuYW1lXSA9IFtdO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUxvZ2ljYWxDaGlsZChwYXJlbnQ6IExvZ2ljYWxFbGVtZW50LCBjaGlsZEluZGV4OiBudW1iZXIpIHtcclxuICBjb25zdCBjaGlsZHJlbkFycmF5ID0gZ2V0TG9naWNhbENoaWxkcmVuQXJyYXkocGFyZW50KTtcclxuICBjb25zdCBjaGlsZFRvUmVtb3ZlID0gY2hpbGRyZW5BcnJheS5zcGxpY2UoY2hpbGRJbmRleCwgMSlbMF07XHJcblxyXG4gIC8vIElmIGl0J3MgYSBsb2dpY2FsIGNvbnRhaW5lciwgYWxzbyByZW1vdmUgaXRzIGRlc2NlbmRhbnRzXHJcbiAgaWYgKGNoaWxkVG9SZW1vdmUgaW5zdGFuY2VvZiBDb21tZW50KSB7XHJcbiAgICBjb25zdCBncmFuZGNoaWxkcmVuQXJyYXkgPSBnZXRMb2dpY2FsQ2hpbGRyZW5BcnJheShjaGlsZFRvUmVtb3ZlKTtcclxuICAgIHdoaWxlIChncmFuZGNoaWxkcmVuQXJyYXkubGVuZ3RoID4gMCkge1xyXG4gICAgICByZW1vdmVMb2dpY2FsQ2hpbGQoY2hpbGRUb1JlbW92ZSwgMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBGaW5hbGx5LCByZW1vdmUgdGhlIG5vZGUgaXRzZWxmXHJcbiAgY29uc3QgZG9tTm9kZVRvUmVtb3ZlID0gY2hpbGRUb1JlbW92ZSBhcyBhbnkgYXMgTm9kZTtcclxuICBkb21Ob2RlVG9SZW1vdmUucGFyZW50Tm9kZSEucmVtb3ZlQ2hpbGQoZG9tTm9kZVRvUmVtb3ZlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldExvZ2ljYWxQYXJlbnQoZWxlbWVudDogTG9naWNhbEVsZW1lbnQpOiBMb2dpY2FsRWxlbWVudCB8IG51bGwge1xyXG4gIHJldHVybiAoZWxlbWVudFtsb2dpY2FsUGFyZW50UHJvcG5hbWVdIGFzIExvZ2ljYWxFbGVtZW50KSB8fCBudWxsO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9naWNhbFNpYmxpbmdFbmQoZWxlbWVudDogTG9naWNhbEVsZW1lbnQpOiBMb2dpY2FsRWxlbWVudCB8IG51bGwge1xyXG4gIHJldHVybiAoZWxlbWVudFtsb2dpY2FsRW5kU2libGluZ1Byb3BuYW1lXSBhcyBMb2dpY2FsRWxlbWVudCkgfHwgbnVsbDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldExvZ2ljYWxDaGlsZChwYXJlbnQ6IExvZ2ljYWxFbGVtZW50LCBjaGlsZEluZGV4OiBudW1iZXIpOiBMb2dpY2FsRWxlbWVudCB7XHJcbiAgcmV0dXJuIGdldExvZ2ljYWxDaGlsZHJlbkFycmF5KHBhcmVudClbY2hpbGRJbmRleF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1N2Z0VsZW1lbnQoZWxlbWVudDogTG9naWNhbEVsZW1lbnQpIHtcclxuICByZXR1cm4gZ2V0Q2xvc2VzdERvbUVsZW1lbnQoZWxlbWVudCkubmFtZXNwYWNlVVJJID09PSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9naWNhbENoaWxkcmVuQXJyYXkoZWxlbWVudDogTG9naWNhbEVsZW1lbnQpIHtcclxuICByZXR1cm4gZWxlbWVudFtsb2dpY2FsQ2hpbGRyZW5Qcm9wbmFtZV0gYXMgTG9naWNhbEVsZW1lbnRbXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBlcm11dGVMb2dpY2FsQ2hpbGRyZW4ocGFyZW50OiBMb2dpY2FsRWxlbWVudCwgcGVybXV0YXRpb25MaXN0OiBQZXJtdXRhdGlvbkxpc3RFbnRyeVtdKSB7XHJcbiAgLy8gVGhlIHBlcm11dGF0aW9uTGlzdCBtdXN0IHJlcHJlc2VudCBhIHZhbGlkIHBlcm11dGF0aW9uLCBpLmUuLCB0aGUgbGlzdCBvZiAnZnJvbScgaW5kaWNlc1xyXG4gIC8vIGlzIGRpc3RpbmN0LCBhbmQgdGhlIGxpc3Qgb2YgJ3RvJyBpbmRpY2VzIGlzIGEgcGVybXV0YXRpb24gb2YgaXQuIFRoZSBhbGdvcml0aG0gaGVyZVxyXG4gIC8vIHJlbGllcyBvbiB0aGF0IGFzc3VtcHRpb24uXHJcblxyXG4gIC8vIEVhY2ggb2YgdGhlIHBoYXNlcyBoZXJlIGhhcyB0byBoYXBwZW4gc2VwYXJhdGVseSwgYmVjYXVzZSBlYWNoIG9uZSBpcyBkZXNpZ25lZCBub3QgdG9cclxuICAvLyBpbnRlcmZlcmUgd2l0aCB0aGUgaW5kaWNlcyBvciBET00gZW50cmllcyB1c2VkIGJ5IHN1YnNlcXVlbnQgcGhhc2VzLlxyXG5cclxuICAvLyBQaGFzZSAxOiB0cmFjayB3aGljaCBub2RlcyB3ZSB3aWxsIG1vdmVcclxuICBjb25zdCBzaWJsaW5ncyA9IGdldExvZ2ljYWxDaGlsZHJlbkFycmF5KHBhcmVudCk7XHJcbiAgcGVybXV0YXRpb25MaXN0LmZvckVhY2goKGxpc3RFbnRyeTogUGVybXV0YXRpb25MaXN0RW50cnlXaXRoVHJhY2tpbmdEYXRhKSA9PiB7XHJcbiAgICBsaXN0RW50cnkubW92ZVJhbmdlU3RhcnQgPSBzaWJsaW5nc1tsaXN0RW50cnkuZnJvbVNpYmxpbmdJbmRleF07XHJcbiAgICBsaXN0RW50cnkubW92ZVJhbmdlRW5kID0gZmluZExhc3REb21Ob2RlSW5SYW5nZShsaXN0RW50cnkubW92ZVJhbmdlU3RhcnQpO1xyXG4gIH0pO1xyXG5cclxuICAvLyBQaGFzZSAyOiBpbnNlcnQgbWFya2Vyc1xyXG4gIHBlcm11dGF0aW9uTGlzdC5mb3JFYWNoKChsaXN0RW50cnk6IFBlcm11dGF0aW9uTGlzdEVudHJ5V2l0aFRyYWNraW5nRGF0YSkgPT4ge1xyXG4gICAgY29uc3QgbWFya2VyID0gbGlzdEVudHJ5Lm1vdmVUb0JlZm9yZU1hcmtlciA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoJ21hcmtlcicpO1xyXG4gICAgY29uc3QgaW5zZXJ0QmVmb3JlTm9kZSA9IHNpYmxpbmdzW2xpc3RFbnRyeS50b1NpYmxpbmdJbmRleCArIDFdIGFzIGFueSBhcyBOb2RlO1xyXG4gICAgaWYgKGluc2VydEJlZm9yZU5vZGUpIHtcclxuICAgICAgaW5zZXJ0QmVmb3JlTm9kZS5wYXJlbnROb2RlIS5pbnNlcnRCZWZvcmUobWFya2VyLCBpbnNlcnRCZWZvcmVOb2RlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFwcGVuZERvbU5vZGUobWFya2VyLCBwYXJlbnQpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyBQaGFzZSAzOiBtb3ZlIGRlc2NlbmRhbnRzICYgcmVtb3ZlIG1hcmtlcnNcclxuICBwZXJtdXRhdGlvbkxpc3QuZm9yRWFjaCgobGlzdEVudHJ5OiBQZXJtdXRhdGlvbkxpc3RFbnRyeVdpdGhUcmFja2luZ0RhdGEpID0+IHtcclxuICAgIGNvbnN0IGluc2VydEJlZm9yZSA9IGxpc3RFbnRyeS5tb3ZlVG9CZWZvcmVNYXJrZXIhO1xyXG4gICAgY29uc3QgcGFyZW50RG9tTm9kZSA9IGluc2VydEJlZm9yZS5wYXJlbnROb2RlITtcclxuICAgIGNvbnN0IGVsZW1lbnRUb01vdmUgPSBsaXN0RW50cnkubW92ZVJhbmdlU3RhcnQhO1xyXG4gICAgY29uc3QgbW92ZUVuZE5vZGUgPSBsaXN0RW50cnkubW92ZVJhbmdlRW5kITtcclxuICAgIGxldCBuZXh0VG9Nb3ZlID0gZWxlbWVudFRvTW92ZSBhcyBhbnkgYXMgTm9kZSB8IG51bGw7XHJcbiAgICB3aGlsZSAobmV4dFRvTW92ZSkge1xyXG4gICAgICBjb25zdCBuZXh0TmV4dCA9IG5leHRUb01vdmUubmV4dFNpYmxpbmc7XHJcbiAgICAgIHBhcmVudERvbU5vZGUuaW5zZXJ0QmVmb3JlKG5leHRUb01vdmUsIGluc2VydEJlZm9yZSk7XHJcblxyXG4gICAgICBpZiAobmV4dFRvTW92ZSA9PT0gbW92ZUVuZE5vZGUpIHtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBuZXh0VG9Nb3ZlID0gbmV4dE5leHQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwYXJlbnREb21Ob2RlLnJlbW92ZUNoaWxkKGluc2VydEJlZm9yZSk7XHJcbiAgfSk7XHJcblxyXG4gIC8vIFBoYXNlIDQ6IHVwZGF0ZSBzaWJsaW5ncyBpbmRleFxyXG4gIHBlcm11dGF0aW9uTGlzdC5mb3JFYWNoKChsaXN0RW50cnk6IFBlcm11dGF0aW9uTGlzdEVudHJ5V2l0aFRyYWNraW5nRGF0YSkgPT4ge1xyXG4gICAgc2libGluZ3NbbGlzdEVudHJ5LnRvU2libGluZ0luZGV4XSA9IGxpc3RFbnRyeS5tb3ZlUmFuZ2VTdGFydCE7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDbG9zZXN0RG9tRWxlbWVudChsb2dpY2FsRWxlbWVudDogTG9naWNhbEVsZW1lbnQpIHtcclxuICBpZiAobG9naWNhbEVsZW1lbnQgaW5zdGFuY2VvZiBFbGVtZW50KSB7XHJcbiAgICByZXR1cm4gbG9naWNhbEVsZW1lbnQ7XHJcbiAgfSBlbHNlIGlmIChsb2dpY2FsRWxlbWVudCBpbnN0YW5jZW9mIENvbW1lbnQpIHtcclxuICAgIHJldHVybiBsb2dpY2FsRWxlbWVudC5wYXJlbnROb2RlISBhcyBFbGVtZW50O1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBhIHZhbGlkIGxvZ2ljYWwgZWxlbWVudCcpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQZXJtdXRhdGlvbkxpc3RFbnRyeSB7XHJcbiAgZnJvbVNpYmxpbmdJbmRleDogbnVtYmVyLFxyXG4gIHRvU2libGluZ0luZGV4OiBudW1iZXIsXHJcbn1cclxuXHJcbmludGVyZmFjZSBQZXJtdXRhdGlvbkxpc3RFbnRyeVdpdGhUcmFja2luZ0RhdGEgZXh0ZW5kcyBQZXJtdXRhdGlvbkxpc3RFbnRyeSB7XHJcbiAgLy8gVGhlc2UgZXh0cmEgcHJvcGVydGllcyBhcmUgdXNlZCBpbnRlcm5hbGx5IHdoZW4gcHJvY2Vzc2luZyB0aGUgcGVybXV0YXRpb24gbGlzdFxyXG4gIG1vdmVSYW5nZVN0YXJ0PzogTG9naWNhbEVsZW1lbnQsXHJcbiAgbW92ZVJhbmdlRW5kPzogTm9kZSxcclxuICBtb3ZlVG9CZWZvcmVNYXJrZXI/OiBOb2RlLFxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRMb2dpY2FsTmV4dFNpYmxpbmcoZWxlbWVudDogTG9naWNhbEVsZW1lbnQpOiBMb2dpY2FsRWxlbWVudCB8IG51bGwge1xyXG4gIGNvbnN0IHNpYmxpbmdzID0gZ2V0TG9naWNhbENoaWxkcmVuQXJyYXkoZ2V0TG9naWNhbFBhcmVudChlbGVtZW50KSEpO1xyXG4gIGNvbnN0IHNpYmxpbmdJbmRleCA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoc2libGluZ3MsIGVsZW1lbnQpO1xyXG4gIHJldHVybiBzaWJsaW5nc1tzaWJsaW5nSW5kZXggKyAxXSB8fCBudWxsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBlbmREb21Ob2RlKGNoaWxkOiBOb2RlLCBwYXJlbnQ6IExvZ2ljYWxFbGVtZW50KSB7XHJcbiAgLy8gVGhpcyBmdW5jdGlvbiBvbmx5IHB1dHMgJ2NoaWxkJyBpbnRvIHRoZSBET00gaW4gdGhlIHJpZ2h0IHBsYWNlIHJlbGF0aXZlIHRvICdwYXJlbnQnXHJcbiAgLy8gSXQgZG9lcyBub3QgdXBkYXRlIHRoZSBsb2dpY2FsIGNoaWxkcmVuIGFycmF5IG9mIGFueXRoaW5nXHJcbiAgaWYgKHBhcmVudCBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcclxuICAgIHBhcmVudC5hcHBlbmRDaGlsZChjaGlsZCk7XHJcbiAgfSBlbHNlIGlmIChwYXJlbnQgaW5zdGFuY2VvZiBDb21tZW50KSB7XHJcbiAgICBjb25zdCBwYXJlbnRMb2dpY2FsTmV4dFNpYmxpbmcgPSBnZXRMb2dpY2FsTmV4dFNpYmxpbmcocGFyZW50KSBhcyBhbnkgYXMgTm9kZTtcclxuICAgIGlmIChwYXJlbnRMb2dpY2FsTmV4dFNpYmxpbmcpIHtcclxuICAgICAgLy8gU2luY2UgdGhlIHBhcmVudCBoYXMgYSBsb2dpY2FsIG5leHQtc2libGluZywgaXRzIGFwcGVuZGVkIGNoaWxkIGdvZXMgcmlnaHQgYmVmb3JlIHRoYXRcclxuICAgICAgcGFyZW50TG9naWNhbE5leHRTaWJsaW5nLnBhcmVudE5vZGUhLmluc2VydEJlZm9yZShjaGlsZCwgcGFyZW50TG9naWNhbE5leHRTaWJsaW5nKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFNpbmNlIHRoZSBwYXJlbnQgaGFzIG5vIGxvZ2ljYWwgbmV4dC1zaWJsaW5nLCBrZWVwIHJlY3Vyc2luZyB1cHdhcmRzIHVudGlsIHdlIGZpbmRcclxuICAgICAgLy8gYSBsb2dpY2FsIGFuY2VzdG9yIHRoYXQgZG9lcyBoYXZlIGEgbmV4dC1zaWJsaW5nIG9yIGlzIGEgcGh5c2ljYWwgZWxlbWVudC5cclxuICAgICAgYXBwZW5kRG9tTm9kZShjaGlsZCwgZ2V0TG9naWNhbFBhcmVudChwYXJlbnQpISk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIFNob3VsZCBuZXZlciBoYXBwZW5cclxuICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGFwcGVuZCBub2RlIGJlY2F1c2UgdGhlIHBhcmVudCBpcyBub3QgYSB2YWxpZCBsb2dpY2FsIGVsZW1lbnQuIFBhcmVudDogJHtwYXJlbnR9YCk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBSZXR1cm5zIHRoZSBmaW5hbCBub2RlIChpbiBkZXB0aC1maXJzdCBldmFsdWF0aW9uIG9yZGVyKSB0aGF0IGlzIGEgZGVzY2VuZGFudCBvZiB0aGUgbG9naWNhbCBlbGVtZW50LlxyXG4vLyBBcyBzdWNoLCB0aGUgZW50aXJlIHN1YnRyZWUgaXMgYmV0d2VlbiAnZWxlbWVudCcgYW5kICdmaW5kTGFzdERvbU5vZGVJblJhbmdlKGVsZW1lbnQpJyBpbmNsdXNpdmUuXHJcbmZ1bmN0aW9uIGZpbmRMYXN0RG9tTm9kZUluUmFuZ2UoZWxlbWVudDogTG9naWNhbEVsZW1lbnQpIHtcclxuICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcclxuICAgIHJldHVybiBlbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbmV4dFNpYmxpbmcgPSBnZXRMb2dpY2FsTmV4dFNpYmxpbmcoZWxlbWVudCk7XHJcbiAgaWYgKG5leHRTaWJsaW5nKSB7XHJcbiAgICAvLyBTaW1wbGUgY2FzZTogbm90IHRoZSBsYXN0IGxvZ2ljYWwgc2libGluZywgc28gdGFrZSB0aGUgbm9kZSBiZWZvcmUgdGhlIG5leHQgc2libGluZ1xyXG4gICAgcmV0dXJuIChuZXh0U2libGluZyBhcyBhbnkgYXMgTm9kZSkucHJldmlvdXNTaWJsaW5nO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBIYXJkZXIgY2FzZTogdGhlcmUncyBubyBsb2dpY2FsIG5leHQtc2libGluZywgc28gcmVjdXJzZSB1cHdhcmRzIHVudGlsIHdlIGZpbmRcclxuICAgIC8vIGEgbG9naWNhbCBhbmNlc3RvciB0aGF0IGRvZXMgaGF2ZSBvbmUsIG9yIGEgcGh5c2ljYWwgZWxlbWVudFxyXG4gICAgY29uc3QgbG9naWNhbFBhcmVudCA9IGdldExvZ2ljYWxQYXJlbnQoZWxlbWVudCkhO1xyXG4gICAgcmV0dXJuIGxvZ2ljYWxQYXJlbnQgaW5zdGFuY2VvZiBFbGVtZW50XHJcbiAgICAgID8gbG9naWNhbFBhcmVudC5sYXN0Q2hpbGRcclxuICAgICAgOiBmaW5kTGFzdERvbU5vZGVJblJhbmdlKGxvZ2ljYWxQYXJlbnQpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlU3ltYm9sT3JGYWxsYmFjayhmYWxsYmFjazogc3RyaW5nKTogc3ltYm9sIHwgc3RyaW5nIHtcclxuICByZXR1cm4gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyA/IFN5bWJvbCgpIDogZmFsbGJhY2s7XHJcbn1cclxuXHJcbi8vIE5vbWluYWwgdHlwZSB0byByZXByZXNlbnQgYSBsb2dpY2FsIGVsZW1lbnQgd2l0aG91dCBuZWVkaW5nIHRvIGFsbG9jYXRlIGFueSBvYmplY3QgZm9yIGluc3RhbmNlc1xyXG5leHBvcnQgaW50ZXJmYWNlIExvZ2ljYWxFbGVtZW50IHsgTG9naWNhbEVsZW1lbnRfX0RPX05PVF9JTVBMRU1FTlQ6IGFueSB9XHJcbiIsImltcG9ydCB7IFJlbmRlckJhdGNoLCBBcnJheVJhbmdlLCBSZW5kZXJUcmVlRGlmZiwgQXJyYXlWYWx1ZXMsIFJlbmRlclRyZWVFZGl0LCBFZGl0VHlwZSwgRnJhbWVUeXBlLCBSZW5kZXJUcmVlRnJhbWUsIFJlbmRlclRyZWVEaWZmUmVhZGVyLCBSZW5kZXJUcmVlRnJhbWVSZWFkZXIsIFJlbmRlclRyZWVFZGl0UmVhZGVyLCBBcnJheVJhbmdlUmVhZGVyLCBBcnJheUJ1aWxkZXJTZWdtZW50UmVhZGVyLCBBcnJheUJ1aWxkZXJTZWdtZW50IH0gZnJvbSAnLi9SZW5kZXJCYXRjaCc7XHJcbmltcG9ydCB7IGRlY29kZVV0ZjggfSBmcm9tICcuL1V0ZjhEZWNvZGVyJztcclxuXHJcbmNvbnN0IHVwZGF0ZWRDb21wb25lbnRzRW50cnlMZW5ndGggPSA0OyAvLyBFYWNoIGlzIGEgc2luZ2xlIGludDMyIGdpdmluZyB0aGUgbG9jYXRpb24gb2YgdGhlIGRhdGFcclxuY29uc3QgcmVmZXJlbmNlRnJhbWVzRW50cnlMZW5ndGggPSAyMDsgLy8gMSBpbnQgZm9yIGZyYW1lIHR5cGUsIHRoZW4gMTYgYnl0ZXMgZm9yIHR5cGUtc3BlY2lmaWMgZGF0YVxyXG5jb25zdCBkaXNwb3NlZENvbXBvbmVudElkc0VudHJ5TGVuZ3RoID0gNDsgLy8gRWFjaCBpcyBhbiBpbnQzMiBnaXZpbmcgdGhlIElEXHJcbmNvbnN0IGRpc3Bvc2VkRXZlbnRIYW5kbGVySWRzRW50cnlMZW5ndGggPSA4OyAvLyBFYWNoIGlzIGFuIGludDY0IGdpdmluZyB0aGUgSURcclxuY29uc3QgZWRpdHNFbnRyeUxlbmd0aCA9IDE2OyAvLyA0IGludHNcclxuY29uc3Qgc3RyaW5nVGFibGVFbnRyeUxlbmd0aCA9IDQ7IC8vIEVhY2ggaXMgYW4gaW50MzIgZ2l2aW5nIHRoZSBzdHJpbmcgZGF0YSBsb2NhdGlvbiwgb3IgLTEgZm9yIG51bGxcclxuY29uc3QgdWludDY0SGlnaFBhcnRTaGlmdCA9IE1hdGgucG93KDIsIDMyKTtcclxuY29uc3QgbWF4U2FmZU51bWJlckhpZ2hQYXJ0ID0gTWF0aC5wb3coMiwgMjEpIC0gMTsgLy8gVGhlIGhpZ2gtb3JkZXIgaW50MzIgZnJvbSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUlxyXG5cclxuZXhwb3J0IGNsYXNzIE91dE9mUHJvY2Vzc1JlbmRlckJhdGNoIGltcGxlbWVudHMgUmVuZGVyQmF0Y2gge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYmF0Y2hEYXRhOiBVaW50OEFycmF5KSB7XHJcbiAgICBjb25zdCBzdHJpbmdSZWFkZXIgPSBuZXcgT3V0T2ZQcm9jZXNzU3RyaW5nUmVhZGVyKGJhdGNoRGF0YSk7XHJcblxyXG4gICAgdGhpcy5hcnJheVJhbmdlUmVhZGVyID0gbmV3IE91dE9mUHJvY2Vzc0FycmF5UmFuZ2VSZWFkZXIoYmF0Y2hEYXRhKTtcclxuICAgIHRoaXMuYXJyYXlCdWlsZGVyU2VnbWVudFJlYWRlciA9IG5ldyBPdXRPZlByb2Nlc3NBcnJheUJ1aWxkZXJTZWdtZW50UmVhZGVyKGJhdGNoRGF0YSk7XHJcbiAgICB0aGlzLmRpZmZSZWFkZXIgPSBuZXcgT3V0T2ZQcm9jZXNzUmVuZGVyVHJlZURpZmZSZWFkZXIoYmF0Y2hEYXRhKTtcclxuICAgIHRoaXMuZWRpdFJlYWRlciA9IG5ldyBPdXRPZlByb2Nlc3NSZW5kZXJUcmVlRWRpdFJlYWRlcihiYXRjaERhdGEsIHN0cmluZ1JlYWRlcik7XHJcbiAgICB0aGlzLmZyYW1lUmVhZGVyID0gbmV3IE91dE9mUHJvY2Vzc1JlbmRlclRyZWVGcmFtZVJlYWRlcihiYXRjaERhdGEsIHN0cmluZ1JlYWRlcik7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVkQ29tcG9uZW50cygpOiBBcnJheVJhbmdlPFJlbmRlclRyZWVEaWZmPiB7XHJcbiAgICByZXR1cm4gcmVhZEludDMyTEUodGhpcy5iYXRjaERhdGEsIHRoaXMuYmF0Y2hEYXRhLmxlbmd0aCAtIDIwKTsgLy8gNXRoLWZyb20tbGFzdCBpbnQzMlxyXG4gIH1cclxuXHJcbiAgcmVmZXJlbmNlRnJhbWVzKCk6IEFycmF5UmFuZ2U8UmVuZGVyVHJlZUZyYW1lPiB7XHJcbiAgICByZXR1cm4gcmVhZEludDMyTEUodGhpcy5iYXRjaERhdGEsIHRoaXMuYmF0Y2hEYXRhLmxlbmd0aCAtIDE2KTsgLy8gNHRoLWZyb20tbGFzdCBpbnQzMlxyXG4gIH1cclxuXHJcbiAgZGlzcG9zZWRDb21wb25lbnRJZHMoKTogQXJyYXlSYW5nZTxudW1iZXI+IHtcclxuICAgIHJldHVybiByZWFkSW50MzJMRSh0aGlzLmJhdGNoRGF0YSwgdGhpcy5iYXRjaERhdGEubGVuZ3RoIC0gMTIpOyAvLyAzcmQtZnJvbS1sYXN0IGludDMyXHJcbiAgfVxyXG5cclxuICBkaXNwb3NlZEV2ZW50SGFuZGxlcklkcygpOiBBcnJheVJhbmdlPG51bWJlcj4ge1xyXG4gICAgcmV0dXJuIHJlYWRJbnQzMkxFKHRoaXMuYmF0Y2hEYXRhLCB0aGlzLmJhdGNoRGF0YS5sZW5ndGggLSA4KTsgLy8gMnRoLWZyb20tbGFzdCBpbnQzMlxyXG4gIH1cclxuXHJcbiAgdXBkYXRlZENvbXBvbmVudHNFbnRyeSh2YWx1ZXM6IEFycmF5VmFsdWVzPFJlbmRlclRyZWVEaWZmPiwgaW5kZXg6IG51bWJlcik6IFJlbmRlclRyZWVEaWZmIHtcclxuICAgIGNvbnN0IHRhYmxlRW50cnlQb3MgPSAodmFsdWVzIGFzIGFueSkgKyBpbmRleCAqIHVwZGF0ZWRDb21wb25lbnRzRW50cnlMZW5ndGg7XHJcbiAgICByZXR1cm4gcmVhZEludDMyTEUodGhpcy5iYXRjaERhdGEsIHRhYmxlRW50cnlQb3MpO1xyXG4gIH1cclxuXHJcbiAgcmVmZXJlbmNlRnJhbWVzRW50cnkodmFsdWVzOiBBcnJheVZhbHVlczxSZW5kZXJUcmVlRnJhbWU+LCBpbmRleDogbnVtYmVyKTogUmVuZGVyVHJlZUZyYW1lIHtcclxuICAgIHJldHVybiAodmFsdWVzIGFzIGFueSkgKyBpbmRleCAqIHJlZmVyZW5jZUZyYW1lc0VudHJ5TGVuZ3RoIGFzIGFueTtcclxuICB9XHJcblxyXG4gIGRpc3Bvc2VkQ29tcG9uZW50SWRzRW50cnkodmFsdWVzOiBBcnJheVZhbHVlczxudW1iZXI+LCBpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIGNvbnN0IGVudHJ5UG9zID0gKHZhbHVlcyBhcyBhbnkpICsgaW5kZXggKiBkaXNwb3NlZENvbXBvbmVudElkc0VudHJ5TGVuZ3RoO1xyXG4gICAgcmV0dXJuIHJlYWRJbnQzMkxFKHRoaXMuYmF0Y2hEYXRhLCBlbnRyeVBvcyk7XHJcbiAgfVxyXG5cclxuICBkaXNwb3NlZEV2ZW50SGFuZGxlcklkc0VudHJ5KHZhbHVlczogQXJyYXlWYWx1ZXM8bnVtYmVyPiwgaW5kZXg6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICBjb25zdCBlbnRyeVBvcyA9ICh2YWx1ZXMgYXMgYW55KSArIGluZGV4ICogZGlzcG9zZWRFdmVudEhhbmRsZXJJZHNFbnRyeUxlbmd0aDtcclxuICAgIHJldHVybiByZWFkVWludDY0TEUodGhpcy5iYXRjaERhdGEsIGVudHJ5UG9zKTtcclxuICB9XHJcblxyXG4gIGRpZmZSZWFkZXI6IFJlbmRlclRyZWVEaWZmUmVhZGVyO1xyXG5cclxuICBlZGl0UmVhZGVyOiBSZW5kZXJUcmVlRWRpdFJlYWRlcjtcclxuXHJcbiAgZnJhbWVSZWFkZXI6IFJlbmRlclRyZWVGcmFtZVJlYWRlcjtcclxuXHJcbiAgYXJyYXlSYW5nZVJlYWRlcjogQXJyYXlSYW5nZVJlYWRlcjtcclxuXHJcbiAgYXJyYXlCdWlsZGVyU2VnbWVudFJlYWRlcjogQXJyYXlCdWlsZGVyU2VnbWVudFJlYWRlcjtcclxufVxyXG5cclxuY2xhc3MgT3V0T2ZQcm9jZXNzUmVuZGVyVHJlZURpZmZSZWFkZXIgaW1wbGVtZW50cyBSZW5kZXJUcmVlRGlmZlJlYWRlciB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBiYXRjaERhdGFVaW50ODogVWludDhBcnJheSkge1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50SWQoZGlmZjogUmVuZGVyVHJlZURpZmYpIHtcclxuICAgIC8vIEZpcnN0IGludDMyIGlzIGNvbXBvbmVudElkXHJcbiAgICByZXR1cm4gcmVhZEludDMyTEUodGhpcy5iYXRjaERhdGFVaW50OCwgZGlmZiBhcyBhbnkpO1xyXG4gIH1cclxuXHJcbiAgZWRpdHMoZGlmZjogUmVuZGVyVHJlZURpZmYpIHtcclxuICAgIC8vIEVudHJpZXMgZGF0YSBzdGFydHMgYWZ0ZXIgdGhlIGNvbXBvbmVudElkICh3aGljaCBpcyBhIDQtYnl0ZSBpbnQpXHJcbiAgICByZXR1cm4gKGRpZmYgYXMgYW55ICsgNCk7XHJcbiAgfVxyXG5cclxuICBlZGl0c0VudHJ5KHZhbHVlczogQXJyYXlWYWx1ZXM8UmVuZGVyVHJlZUVkaXQ+LCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gKHZhbHVlcyBhcyBhbnkpICsgaW5kZXggKiBlZGl0c0VudHJ5TGVuZ3RoO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgT3V0T2ZQcm9jZXNzUmVuZGVyVHJlZUVkaXRSZWFkZXIgaW1wbGVtZW50cyBSZW5kZXJUcmVlRWRpdFJlYWRlciB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBiYXRjaERhdGFVaW50ODogVWludDhBcnJheSwgcHJpdmF0ZSBzdHJpbmdSZWFkZXI6IE91dE9mUHJvY2Vzc1N0cmluZ1JlYWRlcikge1xyXG4gIH1cclxuXHJcbiAgZWRpdFR5cGUoZWRpdDogUmVuZGVyVHJlZUVkaXQpIHtcclxuICAgIHJldHVybiByZWFkSW50MzJMRSh0aGlzLmJhdGNoRGF0YVVpbnQ4LCBlZGl0IGFzIGFueSk7IC8vIDFzdCBpbnRcclxuICB9XHJcblxyXG4gIHNpYmxpbmdJbmRleChlZGl0OiBSZW5kZXJUcmVlRWRpdCkge1xyXG4gICAgcmV0dXJuIHJlYWRJbnQzMkxFKHRoaXMuYmF0Y2hEYXRhVWludDgsIGVkaXQgYXMgYW55ICsgNCk7IC8vIDJuZCBpbnRcclxuICB9XHJcblxyXG4gIG5ld1RyZWVJbmRleChlZGl0OiBSZW5kZXJUcmVlRWRpdCkge1xyXG4gICAgcmV0dXJuIHJlYWRJbnQzMkxFKHRoaXMuYmF0Y2hEYXRhVWludDgsIGVkaXQgYXMgYW55ICsgOCk7IC8vIDNyZCBpbnRcclxuICB9XHJcblxyXG4gIG1vdmVUb1NpYmxpbmdJbmRleChlZGl0OiBSZW5kZXJUcmVlRWRpdCkge1xyXG4gICAgcmV0dXJuIHJlYWRJbnQzMkxFKHRoaXMuYmF0Y2hEYXRhVWludDgsIGVkaXQgYXMgYW55ICsgOCk7IC8vIDNyZCBpbnRcclxuICB9XHJcblxyXG4gIHJlbW92ZWRBdHRyaWJ1dGVOYW1lKGVkaXQ6IFJlbmRlclRyZWVFZGl0KSB7XHJcbiAgICBjb25zdCBzdHJpbmdJbmRleCA9IHJlYWRJbnQzMkxFKHRoaXMuYmF0Y2hEYXRhVWludDgsIGVkaXQgYXMgYW55ICsgMTIpOyAvLyA0dGggaW50XHJcbiAgICByZXR1cm4gdGhpcy5zdHJpbmdSZWFkZXIucmVhZFN0cmluZyhzdHJpbmdJbmRleCk7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBPdXRPZlByb2Nlc3NSZW5kZXJUcmVlRnJhbWVSZWFkZXIgaW1wbGVtZW50cyBSZW5kZXJUcmVlRnJhbWVSZWFkZXIge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYmF0Y2hEYXRhVWludDg6IFVpbnQ4QXJyYXksIHByaXZhdGUgc3RyaW5nUmVhZGVyOiBPdXRPZlByb2Nlc3NTdHJpbmdSZWFkZXIpIHtcclxuICB9XHJcblxyXG4gIC8vIEZvciByZW5kZXIgZnJhbWVzLCB0aGUgMm5kLTR0aCBpbnRzIGhhdmUgZGlmZmVyZW50IG1lYW5pbmdzIGRlcGVuZGluZyBvbiBmcmFtZVR5cGUuXHJcbiAgLy8gSXQncyB0aGUgY2FsbGVyJ3MgcmVzcG9uc2liaWxpdHkgbm90IHRvIGV2YWx1YXRlIHByb3BlcnRpZXMgdGhhdCBhcmVuJ3QgYXBwbGljYWJsZSB0byB0aGUgZnJhbWVUeXBlLlxyXG5cclxuICBmcmFtZVR5cGUoZnJhbWU6IFJlbmRlclRyZWVGcmFtZSkge1xyXG4gICAgcmV0dXJuIHJlYWRJbnQzMkxFKHRoaXMuYmF0Y2hEYXRhVWludDgsIGZyYW1lIGFzIGFueSk7IC8vIDFzdCBpbnRcclxuICB9XHJcblxyXG4gIHN1YnRyZWVMZW5ndGgoZnJhbWU6IFJlbmRlclRyZWVGcmFtZSkge1xyXG4gICAgcmV0dXJuIHJlYWRJbnQzMkxFKHRoaXMuYmF0Y2hEYXRhVWludDgsIGZyYW1lIGFzIGFueSArIDQpOyAvLyAybmQgaW50XHJcbiAgfVxyXG5cclxuICBlbGVtZW50UmVmZXJlbmNlQ2FwdHVyZUlkKGZyYW1lOiBSZW5kZXJUcmVlRnJhbWUpIHtcclxuICAgIGNvbnN0IHN0cmluZ0luZGV4ID0gcmVhZEludDMyTEUodGhpcy5iYXRjaERhdGFVaW50OCwgZnJhbWUgYXMgYW55ICsgNCk7IC8vIDJuZCBpbnRcclxuICAgIHJldHVybiB0aGlzLnN0cmluZ1JlYWRlci5yZWFkU3RyaW5nKHN0cmluZ0luZGV4KTtcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudElkKGZyYW1lOiBSZW5kZXJUcmVlRnJhbWUpIHtcclxuICAgIHJldHVybiByZWFkSW50MzJMRSh0aGlzLmJhdGNoRGF0YVVpbnQ4LCBmcmFtZSBhcyBhbnkgKyA4KTsgLy8gM3JkIGludFxyXG4gIH1cclxuXHJcbiAgZWxlbWVudE5hbWUoZnJhbWU6IFJlbmRlclRyZWVGcmFtZSkge1xyXG4gICAgY29uc3Qgc3RyaW5nSW5kZXggPSByZWFkSW50MzJMRSh0aGlzLmJhdGNoRGF0YVVpbnQ4LCBmcmFtZSBhcyBhbnkgKyA4KTsgLy8gM3JkIGludFxyXG4gICAgcmV0dXJuIHRoaXMuc3RyaW5nUmVhZGVyLnJlYWRTdHJpbmcoc3RyaW5nSW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgdGV4dENvbnRlbnQoZnJhbWU6IFJlbmRlclRyZWVGcmFtZSkge1xyXG4gICAgY29uc3Qgc3RyaW5nSW5kZXggPSByZWFkSW50MzJMRSh0aGlzLmJhdGNoRGF0YVVpbnQ4LCBmcmFtZSBhcyBhbnkgKyA0KTsgLy8gMm5kIGludFxyXG4gICAgcmV0dXJuIHRoaXMuc3RyaW5nUmVhZGVyLnJlYWRTdHJpbmcoc3RyaW5nSW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgbWFya3VwQ29udGVudChmcmFtZTogUmVuZGVyVHJlZUZyYW1lKSB7XHJcbiAgICBjb25zdCBzdHJpbmdJbmRleCA9IHJlYWRJbnQzMkxFKHRoaXMuYmF0Y2hEYXRhVWludDgsIGZyYW1lIGFzIGFueSArIDQpOyAvLyAybmQgaW50XHJcbiAgICByZXR1cm4gdGhpcy5zdHJpbmdSZWFkZXIucmVhZFN0cmluZyhzdHJpbmdJbmRleCkhO1xyXG4gIH1cclxuXHJcbiAgYXR0cmlidXRlTmFtZShmcmFtZTogUmVuZGVyVHJlZUZyYW1lKSB7XHJcbiAgICBjb25zdCBzdHJpbmdJbmRleCA9IHJlYWRJbnQzMkxFKHRoaXMuYmF0Y2hEYXRhVWludDgsIGZyYW1lIGFzIGFueSArIDQpOyAvLyAybmQgaW50XHJcbiAgICByZXR1cm4gdGhpcy5zdHJpbmdSZWFkZXIucmVhZFN0cmluZyhzdHJpbmdJbmRleCk7XHJcbiAgfVxyXG5cclxuICBhdHRyaWJ1dGVWYWx1ZShmcmFtZTogUmVuZGVyVHJlZUZyYW1lKSB7XHJcbiAgICBjb25zdCBzdHJpbmdJbmRleCA9IHJlYWRJbnQzMkxFKHRoaXMuYmF0Y2hEYXRhVWludDgsIGZyYW1lIGFzIGFueSArIDgpOyAvLyAzcmQgaW50XHJcbiAgICByZXR1cm4gdGhpcy5zdHJpbmdSZWFkZXIucmVhZFN0cmluZyhzdHJpbmdJbmRleCk7XHJcbiAgfVxyXG5cclxuICBhdHRyaWJ1dGVFdmVudEhhbmRsZXJJZChmcmFtZTogUmVuZGVyVHJlZUZyYW1lKSB7XHJcbiAgICByZXR1cm4gcmVhZFVpbnQ2NExFKHRoaXMuYmF0Y2hEYXRhVWludDgsIGZyYW1lIGFzIGFueSArIDEyKTsgLy8gQnl0ZXMgMTItMTlcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIE91dE9mUHJvY2Vzc1N0cmluZ1JlYWRlciB7XHJcbiAgcHJpdmF0ZSBzdHJpbmdUYWJsZVN0YXJ0SW5kZXg6IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBiYXRjaERhdGFVaW50ODogVWludDhBcnJheSkge1xyXG4gICAgLy8gRmluYWwgaW50IGdpdmVzIHN0YXJ0IHBvc2l0aW9uIG9mIHRoZSBzdHJpbmcgdGFibGVcclxuICAgIHRoaXMuc3RyaW5nVGFibGVTdGFydEluZGV4ID0gcmVhZEludDMyTEUoYmF0Y2hEYXRhVWludDgsIGJhdGNoRGF0YVVpbnQ4Lmxlbmd0aCAtIDQpO1xyXG4gIH1cclxuXHJcbiAgcmVhZFN0cmluZyhpbmRleDogbnVtYmVyKTogc3RyaW5nIHwgbnVsbCB7XHJcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7IC8vIFNwZWNpYWwgdmFsdWUgZW5jb2RlcyAnbnVsbCdcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBzdHJpbmdUYWJsZUVudHJ5UG9zID0gcmVhZEludDMyTEUodGhpcy5iYXRjaERhdGFVaW50OCwgdGhpcy5zdHJpbmdUYWJsZVN0YXJ0SW5kZXggKyBpbmRleCAqIHN0cmluZ1RhYmxlRW50cnlMZW5ndGgpO1xyXG5cclxuICAgICAgLy8gQnkgZGVmYXVsdCwgLk5FVCdzIEJpbmFyeVdyaXRlciBnaXZlcyBMRUIxMjgtbGVuZ3RoLXByZWZpeGVkIFVURi04IGRhdGEuXHJcbiAgICAgIC8vIFRoaXMgaXMgY29udmVuaWVudCBlbm91Z2ggdG8gZGVjb2RlIGluIEphdmFTY3JpcHQuXHJcbiAgICAgIGNvbnN0IG51bVV0ZjhCeXRlcyA9IHJlYWRMRUIxMjgodGhpcy5iYXRjaERhdGFVaW50OCwgc3RyaW5nVGFibGVFbnRyeVBvcyk7XHJcbiAgICAgIGNvbnN0IGNoYXJzU3RhcnQgPSBzdHJpbmdUYWJsZUVudHJ5UG9zICsgbnVtTEVCMTI4Qnl0ZXMobnVtVXRmOEJ5dGVzKTtcclxuICAgICAgY29uc3QgdXRmOERhdGEgPSBuZXcgVWludDhBcnJheShcclxuICAgICAgICB0aGlzLmJhdGNoRGF0YVVpbnQ4LmJ1ZmZlcixcclxuICAgICAgICB0aGlzLmJhdGNoRGF0YVVpbnQ4LmJ5dGVPZmZzZXQgKyBjaGFyc1N0YXJ0LFxyXG4gICAgICAgIG51bVV0ZjhCeXRlc1xyXG4gICAgICApO1xyXG4gICAgICByZXR1cm4gZGVjb2RlVXRmOCh1dGY4RGF0YSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBPdXRPZlByb2Nlc3NBcnJheVJhbmdlUmVhZGVyIGltcGxlbWVudHMgQXJyYXlSYW5nZVJlYWRlciB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBiYXRjaERhdGFVaW50ODogVWludDhBcnJheSkge1xyXG4gIH1cclxuXHJcbiAgY291bnQ8VD4oYXJyYXlSYW5nZTogQXJyYXlSYW5nZTxUPikge1xyXG4gICAgLy8gRmlyc3QgaW50IGlzIGNvdW50XHJcbiAgICByZXR1cm4gcmVhZEludDMyTEUodGhpcy5iYXRjaERhdGFVaW50OCwgYXJyYXlSYW5nZSBhcyBhbnkpO1xyXG4gIH1cclxuXHJcbiAgdmFsdWVzPFQ+KGFycmF5UmFuZ2U6IEFycmF5UmFuZ2U8VD4pIHtcclxuICAgIC8vIEVudHJpZXMgZGF0YSBzdGFydHMgYWZ0ZXIgdGhlICdjb3VudCcgaW50IChpLmUuLCBhZnRlciA0IGJ5dGVzKVxyXG4gICAgcmV0dXJuIGFycmF5UmFuZ2UgYXMgYW55ICsgNDtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIE91dE9mUHJvY2Vzc0FycmF5QnVpbGRlclNlZ21lbnRSZWFkZXIgaW1wbGVtZW50cyBBcnJheUJ1aWxkZXJTZWdtZW50UmVhZGVyIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJhdGNoRGF0YVVpbnQ4OiBVaW50OEFycmF5KSB7XHJcbiAgfVxyXG5cclxuICBvZmZzZXQ8VD4oYXJyYXlCdWlsZGVyU2VnbWVudDogQXJyYXlCdWlsZGVyU2VnbWVudDxUPikge1xyXG4gICAgLy8gTm90IHVzZWQgYnkgdGhlIG91dC1vZi1wcm9jZXNzIHJlcHJlc2VudGF0aW9uIG9mIFJlbmRlckJhdGNoIGRhdGEuXHJcbiAgICAvLyBUaGlzIG9ubHkgZXhpc3RzIG9uIHRoZSBBcnJheUJ1aWxkZXJTZWdtZW50UmVhZGVyIGZvciB0aGUgc2hhcmVkLW1lbW9yeSByZXByZXNlbnRhdGlvbi5cclxuICAgIHJldHVybiAwO1xyXG4gIH1cclxuXHJcbiAgY291bnQ8VD4oYXJyYXlCdWlsZGVyU2VnbWVudDogQXJyYXlCdWlsZGVyU2VnbWVudDxUPikge1xyXG4gICAgLy8gRmlyc3QgaW50IGlzIGNvdW50XHJcbiAgICByZXR1cm4gcmVhZEludDMyTEUodGhpcy5iYXRjaERhdGFVaW50OCwgYXJyYXlCdWlsZGVyU2VnbWVudCBhcyBhbnkpO1xyXG4gIH1cclxuXHJcbiAgdmFsdWVzPFQ+KGFycmF5QnVpbGRlclNlZ21lbnQ6IEFycmF5QnVpbGRlclNlZ21lbnQ8VD4pOiBBcnJheVZhbHVlczxUPiB7XHJcbiAgICAvLyBFbnRyaWVzIGRhdGEgc3RhcnRzIGFmdGVyIHRoZSAnY291bnQnIGludCAoaS5lLiwgYWZ0ZXIgNCBieXRlcylcclxuICAgIHJldHVybiBhcnJheUJ1aWxkZXJTZWdtZW50IGFzIGFueSArIDQ7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZWFkSW50MzJMRShidWZmZXI6IFVpbnQ4QXJyYXksIHBvc2l0aW9uOiBudW1iZXIpOiBhbnkge1xyXG4gIHJldHVybiAoYnVmZmVyW3Bvc2l0aW9uXSlcclxuICAgIHwgKGJ1ZmZlcltwb3NpdGlvbiArIDFdIDw8IDgpXHJcbiAgICB8IChidWZmZXJbcG9zaXRpb24gKyAyXSA8PCAxNilcclxuICAgIHwgKGJ1ZmZlcltwb3NpdGlvbiArIDNdIDw8IDI0KTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVhZFVpbnQzMkxFKGJ1ZmZlcjogVWludDhBcnJheSwgcG9zaXRpb246IG51bWJlcik6IGFueSB7XHJcbiAgcmV0dXJuIChidWZmZXJbcG9zaXRpb25dKVxyXG4gICAgKyAoYnVmZmVyW3Bvc2l0aW9uICsgMV0gPDwgOClcclxuICAgICsgKGJ1ZmZlcltwb3NpdGlvbiArIDJdIDw8IDE2KVxyXG4gICAgKyAoKGJ1ZmZlcltwb3NpdGlvbiArIDNdIDw8IDI0KSA+Pj4gMCk7IC8vIFRoZSA+Pj4gMCBjb2VyY2VzIHRoZSB2YWx1ZSB0byB1bnNpZ25lZFxyXG59XHJcblxyXG5mdW5jdGlvbiByZWFkVWludDY0TEUoYnVmZmVyOiBVaW50OEFycmF5LCBwb3NpdGlvbjogbnVtYmVyKTogYW55IHtcclxuICAvLyBUaGlzIGNhbm5vdCBiZSBkb25lIHVzaW5nIGJpdC1zaGlmdCBvcGVyYXRvcnMgaW4gSmF2YVNjcmlwdCwgYmVjYXVzZVxyXG4gIC8vIHRob3NlIGFsbCBpbXBsaWNpdGx5IGNvbnZlcnQgdG8gaW50MzJcclxuICBjb25zdCBoaWdoUGFydCA9IHJlYWRVaW50MzJMRShidWZmZXIsIHBvc2l0aW9uICsgNCk7XHJcbiAgaWYgKGhpZ2hQYXJ0ID4gbWF4U2FmZU51bWJlckhpZ2hQYXJ0KSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCByZWFkIHVpbnQ2NCB3aXRoIGhpZ2ggb3JkZXIgcGFydCAke2hpZ2hQYXJ0fSwgYmVjYXVzZSB0aGUgcmVzdWx0IHdvdWxkIGV4Y2VlZCBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUi5gKTtcclxuICB9XHJcblxyXG4gIHJldHVybiAoaGlnaFBhcnQgKiB1aW50NjRIaWdoUGFydFNoaWZ0KSArIHJlYWRVaW50MzJMRShidWZmZXIsIHBvc2l0aW9uKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVhZExFQjEyOChidWZmZXI6IFVpbnQ4QXJyYXksIHBvc2l0aW9uOiBudW1iZXIpIHtcclxuICBsZXQgcmVzdWx0ID0gMDtcclxuICBsZXQgc2hpZnQgPSAwO1xyXG4gIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCA0OyBpbmRleCsrKSB7XHJcbiAgICBjb25zdCBieXRlID0gYnVmZmVyW3Bvc2l0aW9uICsgaW5kZXhdO1xyXG4gICAgcmVzdWx0IHw9IChieXRlICYgMTI3KSA8PCBzaGlmdDtcclxuICAgIGlmIChieXRlIDwgMTI4KSB7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgc2hpZnQgKz0gNztcclxuICB9XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZnVuY3Rpb24gbnVtTEVCMTI4Qnl0ZXModmFsdWU6IG51bWJlcikge1xyXG4gIHJldHVybiB2YWx1ZSA8IDEyOCA/IDFcclxuICAgIDogdmFsdWUgPCAxNjM4NCA/IDJcclxuICAgICAgOiB2YWx1ZSA8IDIwOTcxNTIgPyAzIDogNDtcclxufVxyXG4iLCJleHBvcnQgaW50ZXJmYWNlIFJlbmRlckJhdGNoIHtcclxuICB1cGRhdGVkQ29tcG9uZW50cygpOiBBcnJheVJhbmdlPFJlbmRlclRyZWVEaWZmPjtcclxuICByZWZlcmVuY2VGcmFtZXMoKTogQXJyYXlSYW5nZTxSZW5kZXJUcmVlRnJhbWU+O1xyXG4gIGRpc3Bvc2VkQ29tcG9uZW50SWRzKCk6IEFycmF5UmFuZ2U8bnVtYmVyPjtcclxuICBkaXNwb3NlZEV2ZW50SGFuZGxlcklkcygpOiBBcnJheVJhbmdlPG51bWJlcj47XHJcblxyXG4gIHVwZGF0ZWRDb21wb25lbnRzRW50cnkodmFsdWVzOiBBcnJheVZhbHVlczxSZW5kZXJUcmVlRGlmZj4sIGluZGV4OiBudW1iZXIpOiBSZW5kZXJUcmVlRGlmZjtcclxuICByZWZlcmVuY2VGcmFtZXNFbnRyeSh2YWx1ZXM6IEFycmF5VmFsdWVzPFJlbmRlclRyZWVGcmFtZT4sIGluZGV4OiBudW1iZXIpOiBSZW5kZXJUcmVlRnJhbWU7XHJcbiAgZGlzcG9zZWRDb21wb25lbnRJZHNFbnRyeSh2YWx1ZXM6IEFycmF5VmFsdWVzPG51bWJlcj4sIGluZGV4OiBudW1iZXIpOiBudW1iZXI7XHJcbiAgZGlzcG9zZWRFdmVudEhhbmRsZXJJZHNFbnRyeSh2YWx1ZXM6IEFycmF5VmFsdWVzPG51bWJlcj4sIGluZGV4OiBudW1iZXIpOiBudW1iZXI7XHJcblxyXG4gIGRpZmZSZWFkZXI6IFJlbmRlclRyZWVEaWZmUmVhZGVyO1xyXG4gIGVkaXRSZWFkZXI6IFJlbmRlclRyZWVFZGl0UmVhZGVyO1xyXG4gIGZyYW1lUmVhZGVyOiBSZW5kZXJUcmVlRnJhbWVSZWFkZXI7XHJcbiAgYXJyYXlSYW5nZVJlYWRlcjogQXJyYXlSYW5nZVJlYWRlcjtcclxuICBhcnJheUJ1aWxkZXJTZWdtZW50UmVhZGVyOiBBcnJheUJ1aWxkZXJTZWdtZW50UmVhZGVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFycmF5UmFuZ2VSZWFkZXIge1xyXG4gIGNvdW50PFQ+KGFycmF5UmFuZ2U6IEFycmF5UmFuZ2U8VD4pOiBudW1iZXI7XHJcbiAgdmFsdWVzPFQ+KGFycmF5UmFuZ2U6IEFycmF5UmFuZ2U8VD4pOiBBcnJheVZhbHVlczxUPjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBBcnJheUJ1aWxkZXJTZWdtZW50UmVhZGVyIHtcclxuICBvZmZzZXQ8VD4oYXJyYXlCdWlsZGVyU2VnbWVudDogQXJyYXlCdWlsZGVyU2VnbWVudDxUPik6IG51bWJlcjtcclxuICBjb3VudDxUPihhcnJheUJ1aWxkZXJTZWdtZW50OiBBcnJheUJ1aWxkZXJTZWdtZW50PFQ+KTogbnVtYmVyO1xyXG4gIHZhbHVlczxUPihhcnJheUJ1aWxkZXJTZWdtZW50OiBBcnJheUJ1aWxkZXJTZWdtZW50PFQ+KTogQXJyYXlWYWx1ZXM8VD47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVuZGVyVHJlZURpZmZSZWFkZXIge1xyXG4gIGNvbXBvbmVudElkKGRpZmY6IFJlbmRlclRyZWVEaWZmKTogbnVtYmVyO1xyXG4gIGVkaXRzKGRpZmY6IFJlbmRlclRyZWVEaWZmKTogQXJyYXlCdWlsZGVyU2VnbWVudDxSZW5kZXJUcmVlRWRpdD47XHJcbiAgZWRpdHNFbnRyeSh2YWx1ZXM6IEFycmF5VmFsdWVzPFJlbmRlclRyZWVFZGl0PiwgaW5kZXg6IG51bWJlcik6IFJlbmRlclRyZWVFZGl0O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlbmRlclRyZWVFZGl0UmVhZGVyIHtcclxuICBlZGl0VHlwZShlZGl0OiBSZW5kZXJUcmVlRWRpdCk6IEVkaXRUeXBlO1xyXG4gIHNpYmxpbmdJbmRleChlZGl0OiBSZW5kZXJUcmVlRWRpdCk6IG51bWJlcjtcclxuICBuZXdUcmVlSW5kZXgoZWRpdDogUmVuZGVyVHJlZUVkaXQpOiBudW1iZXI7XHJcbiAgbW92ZVRvU2libGluZ0luZGV4KGVkaXQ6IFJlbmRlclRyZWVFZGl0KTogbnVtYmVyO1xyXG4gIHJlbW92ZWRBdHRyaWJ1dGVOYW1lKGVkaXQ6IFJlbmRlclRyZWVFZGl0KTogc3RyaW5nIHwgbnVsbDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZW5kZXJUcmVlRnJhbWVSZWFkZXIge1xyXG4gIGZyYW1lVHlwZShmcmFtZTogUmVuZGVyVHJlZUZyYW1lKTogRnJhbWVUeXBlO1xyXG4gIHN1YnRyZWVMZW5ndGgoZnJhbWU6IFJlbmRlclRyZWVGcmFtZSk6IG51bWJlcjtcclxuICBlbGVtZW50UmVmZXJlbmNlQ2FwdHVyZUlkKGZyYW1lOiBSZW5kZXJUcmVlRnJhbWUpOiBzdHJpbmcgfCBudWxsO1xyXG4gIGNvbXBvbmVudElkKGZyYW1lOiBSZW5kZXJUcmVlRnJhbWUpOiBudW1iZXI7XHJcbiAgZWxlbWVudE5hbWUoZnJhbWU6IFJlbmRlclRyZWVGcmFtZSk6IHN0cmluZyB8IG51bGw7XHJcbiAgdGV4dENvbnRlbnQoZnJhbWU6IFJlbmRlclRyZWVGcmFtZSk6IHN0cmluZyB8IG51bGw7XHJcbiAgbWFya3VwQ29udGVudChmcmFtZTogUmVuZGVyVHJlZUZyYW1lKTogc3RyaW5nO1xyXG4gIGF0dHJpYnV0ZU5hbWUoZnJhbWU6IFJlbmRlclRyZWVGcmFtZSk6IHN0cmluZyB8IG51bGw7XHJcbiAgYXR0cmlidXRlVmFsdWUoZnJhbWU6IFJlbmRlclRyZWVGcmFtZSk6IHN0cmluZyB8IG51bGw7XHJcbiAgYXR0cmlidXRlRXZlbnRIYW5kbGVySWQoZnJhbWU6IFJlbmRlclRyZWVGcmFtZSk6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBBcnJheVJhbmdlPFQ+IHsgQXJyYXlSYW5nZV9fRE9fTk9UX0lNUExFTUVOVDogYW55IH1cclxuZXhwb3J0IGludGVyZmFjZSBBcnJheUJ1aWxkZXJTZWdtZW50PFQ+IHsgQXJyYXlCdWlsZGVyU2VnbWVudF9fRE9fTk9UX0lNUExFTUVOVDogYW55IH1cclxuZXhwb3J0IGludGVyZmFjZSBBcnJheVZhbHVlczxUPiB7IEFycmF5VmFsdWVzX19ET19OT1RfSU1QTEVNRU5UOiBhbnkgfVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZW5kZXJUcmVlRGlmZiB7IFJlbmRlclRyZWVEaWZmX19ET19OT1RfSU1QTEVNRU5UOiBhbnkgfVxyXG5leHBvcnQgaW50ZXJmYWNlIFJlbmRlclRyZWVGcmFtZSB7IFJlbmRlclRyZWVGcmFtZV9fRE9fTk9UX0lNUExFTUVOVDogYW55IH1cclxuZXhwb3J0IGludGVyZmFjZSBSZW5kZXJUcmVlRWRpdCB7IFJlbmRlclRyZWVFZGl0X19ET19OT1RfSU1QTEVNRU5UOiBhbnkgfVxyXG5cclxuZXhwb3J0IGVudW0gRWRpdFR5cGUge1xyXG4gIC8vIFRoZSB2YWx1ZXMgbXVzdCBiZSBrZXB0IGluIHN5bmMgd2l0aCB0aGUgLk5FVCBlcXVpdmFsZW50IGluIFJlbmRlclRyZWVFZGl0VHlwZS5jc1xyXG4gIHByZXBlbmRGcmFtZSA9IDEsXHJcbiAgcmVtb3ZlRnJhbWUgPSAyLFxyXG4gIHNldEF0dHJpYnV0ZSA9IDMsXHJcbiAgcmVtb3ZlQXR0cmlidXRlID0gNCxcclxuICB1cGRhdGVUZXh0ID0gNSxcclxuICBzdGVwSW4gPSA2LFxyXG4gIHN0ZXBPdXQgPSA3LFxyXG4gIHVwZGF0ZU1hcmt1cCA9IDgsXHJcbiAgcGVybXV0YXRpb25MaXN0RW50cnkgPSA5LFxyXG4gIHBlcm11dGF0aW9uTGlzdEVuZCA9IDEwLFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBGcmFtZVR5cGUge1xyXG4gIC8vIFRoZSB2YWx1ZXMgbXVzdCBiZSBrZXB0IGluIHN5bmMgd2l0aCB0aGUgLk5FVCBlcXVpdmFsZW50IGluIFJlbmRlclRyZWVGcmFtZVR5cGUuY3NcclxuICBlbGVtZW50ID0gMSxcclxuICB0ZXh0ID0gMixcclxuICBhdHRyaWJ1dGUgPSAzLFxyXG4gIGNvbXBvbmVudCA9IDQsXHJcbiAgcmVnaW9uID0gNSxcclxuICBlbGVtZW50UmVmZXJlbmNlQ2FwdHVyZSA9IDYsXHJcbiAgbWFya3VwID0gOCxcclxufVxyXG4iLCJjb25zdCBuYXRpdmVEZWNvZGVyID0gdHlwZW9mIFRleHREZWNvZGVyID09PSAnZnVuY3Rpb24nXHJcbiAgPyBuZXcgVGV4dERlY29kZXIoJ3V0Zi04JylcclxuICA6IG51bGw7XHJcblxyXG5leHBvcnQgY29uc3QgZGVjb2RlVXRmODogKGJ5dGVzOiBVaW50OEFycmF5KSA9PiBzdHJpbmdcclxuICA9IG5hdGl2ZURlY29kZXIgPyBuYXRpdmVEZWNvZGVyLmRlY29kZS5iaW5kKG5hdGl2ZURlY29kZXIpIDogZGVjb2RlSW1wbDtcclxuXHJcbi8qICFcclxuTG9naWMgaW4gZGVjb2RlSW1wbCBpcyBkZXJpdmVkIGZyb20gZmFzdC10ZXh0LWVuY29kaW5nXHJcbmh0dHBzOi8vZ2l0aHViLmNvbS9zYW10aG9yL2Zhc3QtdGV4dC1lbmNvZGluZ1xyXG5cclxuTGljZW5zZSBmb3IgZmFzdC10ZXh0LWVuY29kaW5nOiBBcGFjaGUgMi4wXHJcbmh0dHBzOi8vZ2l0aHViLmNvbS9zYW10aG9yL2Zhc3QtdGV4dC1lbmNvZGluZy9ibG9iL21hc3Rlci9MSUNFTlNFXHJcbiovXHJcblxyXG5mdW5jdGlvbiBkZWNvZGVJbXBsKGJ5dGVzOiBVaW50OEFycmF5KTogc3RyaW5nIHtcclxuICBsZXQgcG9zID0gMDtcclxuICBjb25zdCBsZW4gPSBieXRlcy5sZW5ndGg7XHJcbiAgY29uc3Qgb3V0OiBudW1iZXJbXSA9IFtdO1xyXG4gIGNvbnN0IHN1YnN0cmluZ3M6IHN0cmluZ1tdID0gW107XHJcblxyXG4gIHdoaWxlIChwb3MgPCBsZW4pIHtcclxuICAgIGNvbnN0IGJ5dGUxID0gYnl0ZXNbcG9zKytdO1xyXG4gICAgaWYgKGJ5dGUxID09PSAwKSB7XHJcbiAgICAgIGJyZWFrOyAvLyBOVUxMXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKChieXRlMSAmIDB4ODApID09PSAwKSB7IC8vIDEtYnl0ZVxyXG4gICAgICBvdXQucHVzaChieXRlMSk7XHJcbiAgICB9IGVsc2UgaWYgKChieXRlMSAmIDB4ZTApID09PSAweGMwKSB7IC8vIDItYnl0ZVxyXG4gICAgICBjb25zdCBieXRlMiA9IGJ5dGVzW3BvcysrXSAmIDB4M2Y7XHJcbiAgICAgIG91dC5wdXNoKCgoYnl0ZTEgJiAweDFmKSA8PCA2KSB8IGJ5dGUyKTtcclxuICAgIH0gZWxzZSBpZiAoKGJ5dGUxICYgMHhmMCkgPT09IDB4ZTApIHtcclxuICAgICAgY29uc3QgYnl0ZTIgPSBieXRlc1twb3MrK10gJiAweDNmO1xyXG4gICAgICBjb25zdCBieXRlMyA9IGJ5dGVzW3BvcysrXSAmIDB4M2Y7XHJcbiAgICAgIG91dC5wdXNoKCgoYnl0ZTEgJiAweDFmKSA8PCAxMikgfCAoYnl0ZTIgPDwgNikgfCBieXRlMyk7XHJcbiAgICB9IGVsc2UgaWYgKChieXRlMSAmIDB4ZjgpID09PSAweGYwKSB7XHJcbiAgICAgIGNvbnN0IGJ5dGUyID0gYnl0ZXNbcG9zKytdICYgMHgzZjtcclxuICAgICAgY29uc3QgYnl0ZTMgPSBieXRlc1twb3MrK10gJiAweDNmO1xyXG4gICAgICBjb25zdCBieXRlNCA9IGJ5dGVzW3BvcysrXSAmIDB4M2Y7XHJcblxyXG4gICAgICAvLyB0aGlzIGNhbiBiZSA+IDB4ZmZmZiwgc28gcG9zc2libHkgZ2VuZXJhdGUgc3Vycm9nYXRlc1xyXG4gICAgICBsZXQgY29kZXBvaW50ID0gKChieXRlMSAmIDB4MDcpIDw8IDB4MTIpIHwgKGJ5dGUyIDw8IDB4MGMpIHwgKGJ5dGUzIDw8IDB4MDYpIHwgYnl0ZTQ7XHJcbiAgICAgIGlmIChjb2RlcG9pbnQgPiAweGZmZmYpIHtcclxuICAgICAgICAvLyBjb2RlcG9pbnQgJj0gfjB4MTAwMDA7XHJcbiAgICAgICAgY29kZXBvaW50IC09IDB4MTAwMDA7XHJcbiAgICAgICAgb3V0LnB1c2goKGNvZGVwb2ludCA+Pj4gMTApICYgMHgzZmYgfCAweGQ4MDApO1xyXG4gICAgICAgIGNvZGVwb2ludCA9IDB4ZGMwMCB8IGNvZGVwb2ludCAmIDB4M2ZmO1xyXG4gICAgICB9XHJcbiAgICAgIG91dC5wdXNoKGNvZGVwb2ludCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBGSVhNRTogd2UncmUgaWdub3JpbmcgdGhpc1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFzIGEgd29ya2Fyb3VuZCBmb3IgaHR0cHM6Ly9naXRodWIuY29tL3NhbXRob3IvZmFzdC10ZXh0LWVuY29kaW5nL2lzc3Vlcy8xLFxyXG4gICAgLy8gbWFrZSBzdXJlIHRoZSAnb3V0JyBhcnJheSBuZXZlciBnZXRzIHRvbyBsb25nLiBXaGVuIGl0IHJlYWNoZXMgYSBsaW1pdCwgd2VcclxuICAgIC8vIHN0cmluZ2lmeSB3aGF0IHdlIGhhdmUgc28gZmFyIGFuZCBhcHBlbmQgdG8gYSBsaXN0IG9mIG91dHB1dHMuXHJcbiAgICBpZiAob3V0Lmxlbmd0aCA+IDEwMjQpIHtcclxuICAgICAgc3Vic3RyaW5ncy5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgb3V0KSk7XHJcbiAgICAgIG91dC5sZW5ndGggPSAwO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3Vic3RyaW5ncy5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgb3V0KSk7XHJcbiAgcmV0dXJuIHN1YnN0cmluZ3Muam9pbignJyk7XHJcbn1cclxuIiwiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L2NhbWVsY2FzZSAqL1xyXG5pbXBvcnQgJy4uL1BsYXRmb3JtL1BsYXRmb3JtJztcclxuaW1wb3J0ICcuLi9FbnZpcm9ubWVudCc7XHJcbmltcG9ydCB7IFJlbmRlckJhdGNoIH0gZnJvbSAnLi9SZW5kZXJCYXRjaC9SZW5kZXJCYXRjaCc7XHJcbmltcG9ydCB7IEJyb3dzZXJSZW5kZXJlciB9IGZyb20gJy4vQnJvd3NlclJlbmRlcmVyJztcclxuaW1wb3J0IHsgdG9Mb2dpY2FsRWxlbWVudCwgTG9naWNhbEVsZW1lbnQgfSBmcm9tICcuL0xvZ2ljYWxFbGVtZW50cyc7XHJcblxyXG5pbnRlcmZhY2UgQnJvd3NlclJlbmRlcmVyUmVnaXN0cnkge1xyXG4gIFticm93c2VyUmVuZGVyZXJJZDogbnVtYmVyXTogQnJvd3NlclJlbmRlcmVyO1xyXG59XHJcbmNvbnN0IGJyb3dzZXJSZW5kZXJlcnM6IEJyb3dzZXJSZW5kZXJlclJlZ2lzdHJ5ID0ge307XHJcbmxldCBzaG91bGRSZXNldFNjcm9sbEFmdGVyTmV4dEJhdGNoID0gZmFsc2U7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXR0YWNoUm9vdENvbXBvbmVudFRvTG9naWNhbEVsZW1lbnQoYnJvd3NlclJlbmRlcmVySWQ6IG51bWJlciwgbG9naWNhbEVsZW1lbnQ6IExvZ2ljYWxFbGVtZW50LCBjb21wb25lbnRJZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgbGV0IGJyb3dzZXJSZW5kZXJlciA9IGJyb3dzZXJSZW5kZXJlcnNbYnJvd3NlclJlbmRlcmVySWRdO1xyXG4gIGlmICghYnJvd3NlclJlbmRlcmVyKSB7XHJcbiAgICBicm93c2VyUmVuZGVyZXIgPSBicm93c2VyUmVuZGVyZXJzW2Jyb3dzZXJSZW5kZXJlcklkXSA9IG5ldyBCcm93c2VyUmVuZGVyZXIoYnJvd3NlclJlbmRlcmVySWQpO1xyXG4gIH1cclxuXHJcbiAgYnJvd3NlclJlbmRlcmVyLmF0dGFjaFJvb3RDb21wb25lbnRUb0xvZ2ljYWxFbGVtZW50KGNvbXBvbmVudElkLCBsb2dpY2FsRWxlbWVudCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhdHRhY2hSb290Q29tcG9uZW50VG9FbGVtZW50KGVsZW1lbnRTZWxlY3Rvcjogc3RyaW5nLCBjb21wb25lbnRJZDogbnVtYmVyLCBicm93c2VyUmVuZGVyZXJJZD86IG51bWJlcik6IHZvaWQge1xyXG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnRTZWxlY3Rvcik7XHJcbiAgaWYgKCFlbGVtZW50KSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kIGFueSBlbGVtZW50IG1hdGNoaW5nIHNlbGVjdG9yICcke2VsZW1lbnRTZWxlY3Rvcn0nLmApO1xyXG4gIH1cclxuXHJcbiAgLy8gJ2FsbG93RXhpc3RpbmdDb250ZW50cycgdG8ga2VlcCBhbnkgcHJlcmVuZGVyZWQgY29udGVudCB1bnRpbCB3ZSBkbyB0aGUgZmlyc3QgY2xpZW50LXNpZGUgcmVuZGVyXHJcbiAgLy8gT25seSBjbGllbnQtc2lkZSBCbGF6b3Igc3VwcGxpZXMgYSBicm93c2VyIHJlbmRlcmVyIElEXHJcbiAgYXR0YWNoUm9vdENvbXBvbmVudFRvTG9naWNhbEVsZW1lbnQoYnJvd3NlclJlbmRlcmVySWQgfHwgMCwgdG9Mb2dpY2FsRWxlbWVudChlbGVtZW50LCAvKiBhbGxvdyBleGlzdGluZyBjb250ZW50cyAqLyB0cnVlKSwgY29tcG9uZW50SWQpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyQmF0Y2goYnJvd3NlclJlbmRlcmVySWQ6IG51bWJlciwgYmF0Y2g6IFJlbmRlckJhdGNoKTogdm9pZCB7XHJcbiAgY29uc3QgYnJvd3NlclJlbmRlcmVyID0gYnJvd3NlclJlbmRlcmVyc1ticm93c2VyUmVuZGVyZXJJZF07XHJcbiAgaWYgKCFicm93c2VyUmVuZGVyZXIpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgVGhlcmUgaXMgbm8gYnJvd3NlciByZW5kZXJlciB3aXRoIElEICR7YnJvd3NlclJlbmRlcmVySWR9LmApO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgYXJyYXlSYW5nZVJlYWRlciA9IGJhdGNoLmFycmF5UmFuZ2VSZWFkZXI7XHJcbiAgY29uc3QgdXBkYXRlZENvbXBvbmVudHNSYW5nZSA9IGJhdGNoLnVwZGF0ZWRDb21wb25lbnRzKCk7XHJcbiAgY29uc3QgdXBkYXRlZENvbXBvbmVudHNWYWx1ZXMgPSBhcnJheVJhbmdlUmVhZGVyLnZhbHVlcyh1cGRhdGVkQ29tcG9uZW50c1JhbmdlKTtcclxuICBjb25zdCB1cGRhdGVkQ29tcG9uZW50c0xlbmd0aCA9IGFycmF5UmFuZ2VSZWFkZXIuY291bnQodXBkYXRlZENvbXBvbmVudHNSYW5nZSk7XHJcbiAgY29uc3QgcmVmZXJlbmNlRnJhbWVzID0gYmF0Y2gucmVmZXJlbmNlRnJhbWVzKCk7XHJcbiAgY29uc3QgcmVmZXJlbmNlRnJhbWVzVmFsdWVzID0gYXJyYXlSYW5nZVJlYWRlci52YWx1ZXMocmVmZXJlbmNlRnJhbWVzKTtcclxuICBjb25zdCBkaWZmUmVhZGVyID0gYmF0Y2guZGlmZlJlYWRlcjtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB1cGRhdGVkQ29tcG9uZW50c0xlbmd0aDsgaSsrKSB7XHJcbiAgICBjb25zdCBkaWZmID0gYmF0Y2gudXBkYXRlZENvbXBvbmVudHNFbnRyeSh1cGRhdGVkQ29tcG9uZW50c1ZhbHVlcywgaSk7XHJcbiAgICBjb25zdCBjb21wb25lbnRJZCA9IGRpZmZSZWFkZXIuY29tcG9uZW50SWQoZGlmZik7XHJcbiAgICBjb25zdCBlZGl0cyA9IGRpZmZSZWFkZXIuZWRpdHMoZGlmZik7XHJcbiAgICBicm93c2VyUmVuZGVyZXIudXBkYXRlQ29tcG9uZW50KGJhdGNoLCBjb21wb25lbnRJZCwgZWRpdHMsIHJlZmVyZW5jZUZyYW1lc1ZhbHVlcyk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBkaXNwb3NlZENvbXBvbmVudElkc1JhbmdlID0gYmF0Y2guZGlzcG9zZWRDb21wb25lbnRJZHMoKTtcclxuICBjb25zdCBkaXNwb3NlZENvbXBvbmVudElkc1ZhbHVlcyA9IGFycmF5UmFuZ2VSZWFkZXIudmFsdWVzKGRpc3Bvc2VkQ29tcG9uZW50SWRzUmFuZ2UpO1xyXG4gIGNvbnN0IGRpc3Bvc2VkQ29tcG9uZW50SWRzTGVuZ3RoID0gYXJyYXlSYW5nZVJlYWRlci5jb3VudChkaXNwb3NlZENvbXBvbmVudElkc1JhbmdlKTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGRpc3Bvc2VkQ29tcG9uZW50SWRzTGVuZ3RoOyBpKyspIHtcclxuICAgIGNvbnN0IGNvbXBvbmVudElkID0gYmF0Y2guZGlzcG9zZWRDb21wb25lbnRJZHNFbnRyeShkaXNwb3NlZENvbXBvbmVudElkc1ZhbHVlcywgaSk7XHJcbiAgICBicm93c2VyUmVuZGVyZXIuZGlzcG9zZUNvbXBvbmVudChjb21wb25lbnRJZCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBkaXNwb3NlZEV2ZW50SGFuZGxlcklkc1JhbmdlID0gYmF0Y2guZGlzcG9zZWRFdmVudEhhbmRsZXJJZHMoKTtcclxuICBjb25zdCBkaXNwb3NlZEV2ZW50SGFuZGxlcklkc1ZhbHVlcyA9IGFycmF5UmFuZ2VSZWFkZXIudmFsdWVzKGRpc3Bvc2VkRXZlbnRIYW5kbGVySWRzUmFuZ2UpO1xyXG4gIGNvbnN0IGRpc3Bvc2VkRXZlbnRIYW5kbGVySWRzTGVuZ3RoID0gYXJyYXlSYW5nZVJlYWRlci5jb3VudChkaXNwb3NlZEV2ZW50SGFuZGxlcklkc1JhbmdlKTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGRpc3Bvc2VkRXZlbnRIYW5kbGVySWRzTGVuZ3RoOyBpKyspIHtcclxuICAgIGNvbnN0IGV2ZW50SGFuZGxlcklkID0gYmF0Y2guZGlzcG9zZWRFdmVudEhhbmRsZXJJZHNFbnRyeShkaXNwb3NlZEV2ZW50SGFuZGxlcklkc1ZhbHVlcywgaSk7XHJcbiAgICBicm93c2VyUmVuZGVyZXIuZGlzcG9zZUV2ZW50SGFuZGxlcihldmVudEhhbmRsZXJJZCk7XHJcbiAgfVxyXG5cclxuICByZXNldFNjcm9sbElmTmVlZGVkKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZXNldFNjcm9sbEFmdGVyTmV4dEJhdGNoKCkge1xyXG4gIHNob3VsZFJlc2V0U2Nyb2xsQWZ0ZXJOZXh0QmF0Y2ggPSB0cnVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZXNldFNjcm9sbElmTmVlZGVkKCkge1xyXG4gIGlmIChzaG91bGRSZXNldFNjcm9sbEFmdGVyTmV4dEJhdGNoKSB7XHJcbiAgICBzaG91bGRSZXNldFNjcm9sbEFmdGVyTmV4dEJhdGNoID0gZmFsc2U7XHJcblxyXG4gICAgLy8gVGhpcyBhc3N1bWVzIHRoZSBzY3JvbGxlciBpcyBvbiB0aGUgd2luZG93IGl0c2VsZi4gVGhlcmUgaXNuJ3QgYSBnZW5lcmFsIHdheSB0byBrbm93XHJcbiAgICAvLyBpZiBzb21lIG90aGVyIGVsZW1lbnQgaXMgcGxheWluZyB0aGUgcm9sZSBvZiB0aGUgcHJpbWFyeSBzY3JvbGwgcmVnaW9uLlxyXG4gICAgd2luZG93LnNjcm9sbFRvICYmIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRXZlbnREZXNjcmlwdG9yIH0gZnJvbSAnLi9Ccm93c2VyUmVuZGVyZXInO1xyXG5pbXBvcnQgeyBVSUV2ZW50QXJncyB9IGZyb20gJy4vRXZlbnRGb3JEb3ROZXQnO1xyXG5cclxudHlwZSBFdmVudERpc3BhdGNoZXIgPSAoZXZlbnREZXNjcmlwdG9yOiBFdmVudERlc2NyaXB0b3IsIGV2ZW50QXJnczogVUlFdmVudEFyZ3MpID0+IHZvaWQ7XHJcblxyXG5sZXQgZXZlbnREaXNwYXRjaGVySW5zdGFuY2U6IEV2ZW50RGlzcGF0Y2hlcjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkaXNwYXRjaEV2ZW50KGV2ZW50RGVzY3JpcHRvcjogRXZlbnREZXNjcmlwdG9yLCBldmVudEFyZ3M6IFVJRXZlbnRBcmdzKTogdm9pZCB7XHJcbiAgaWYgKCFldmVudERpc3BhdGNoZXJJbnN0YW5jZSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdldmVudERpc3BhdGNoZXIgbm90IGluaXRpYWxpemVkLiBDYWxsIFxcJ3NldEV2ZW50RGlzcGF0Y2hlclxcJyB0byBjb25maWd1cmUgaXQuJyk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZXZlbnREaXNwYXRjaGVySW5zdGFuY2UoZXZlbnREZXNjcmlwdG9yLCBldmVudEFyZ3MpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0RXZlbnREaXNwYXRjaGVyKG5ld0Rpc3BhdGNoZXI6IChldmVudERlc2NyaXB0b3I6IEV2ZW50RGVzY3JpcHRvciwgZXZlbnRBcmdzOiBVSUV2ZW50QXJncykgPT4gUHJvbWlzZTx2b2lkPik6IHZvaWQge1xyXG4gIGV2ZW50RGlzcGF0Y2hlckluc3RhbmNlID0gbmV3RGlzcGF0Y2hlcjtcclxufVxyXG4iLCIvLyBpbXBvcnQgJ0Bkb3RuZXQvanNpbnRlcm9wJzsgSW1wb3J0ZWQgZWxzZXdoZXJlXHJcbmltcG9ydCB7IHJlc2V0U2Nyb2xsQWZ0ZXJOZXh0QmF0Y2ggfSBmcm9tICcuLi9SZW5kZXJpbmcvUmVuZGVyZXInO1xyXG5pbXBvcnQgeyBFdmVudERlbGVnYXRvciB9IGZyb20gJy4uL1JlbmRlcmluZy9FdmVudERlbGVnYXRvcic7XHJcblxyXG5sZXQgaGFzRW5hYmxlZE5hdmlnYXRpb25JbnRlcmNlcHRpb24gPSBmYWxzZTtcclxubGV0IGhhc1JlZ2lzdGVyZWROYXZpZ2F0aW9uRXZlbnRMaXN0ZW5lcnMgPSBmYWxzZTtcclxuXHJcbi8vIFdpbGwgYmUgaW5pdGlhbGl6ZWQgb25jZSBzb21lb25lIHJlZ2lzdGVyc1xyXG5sZXQgbm90aWZ5TG9jYXRpb25DaGFuZ2VkQ2FsbGJhY2s6ICgodXJpOiBzdHJpbmcsIGludGVyY2VwdGVkOiBib29sZWFuKSA9PiBQcm9taXNlPHZvaWQ+KSB8IG51bGwgPSBudWxsO1xyXG5cclxuLy8gVGhlc2UgYXJlIHRoZSBmdW5jdGlvbnMgd2UncmUgbWFraW5nIGF2YWlsYWJsZSBmb3IgaW52b2NhdGlvbiBmcm9tIC5ORVRcclxuZXhwb3J0IGNvbnN0IGludGVybmFsRnVuY3Rpb25zID0ge1xyXG4gIGxpc3RlbkZvck5hdmlnYXRpb25FdmVudHMsXHJcbiAgZW5hYmxlTmF2aWdhdGlvbkludGVyY2VwdGlvbixcclxuICBuYXZpZ2F0ZVRvLFxyXG4gIGdldEJhc2VVUkk6ICgpID0+IGRvY3VtZW50LmJhc2VVUkksXHJcbiAgZ2V0TG9jYXRpb25IcmVmOiAoKSA9PiBsb2NhdGlvbi5ocmVmLFxyXG59O1xyXG5cclxuZnVuY3Rpb24gbGlzdGVuRm9yTmF2aWdhdGlvbkV2ZW50cyhjYWxsYmFjazogKHVyaTogc3RyaW5nLCBpbnRlcmNlcHRlZDogYm9vbGVhbikgPT4gUHJvbWlzZTx2b2lkPikge1xyXG4gIG5vdGlmeUxvY2F0aW9uQ2hhbmdlZENhbGxiYWNrID0gY2FsbGJhY2s7XHJcblxyXG4gIGlmIChoYXNSZWdpc3RlcmVkTmF2aWdhdGlvbkV2ZW50TGlzdGVuZXJzKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBoYXNSZWdpc3RlcmVkTmF2aWdhdGlvbkV2ZW50TGlzdGVuZXJzID0gdHJ1ZTtcclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCAoKSA9PiBub3RpZnlMb2NhdGlvbkNoYW5nZWQoZmFsc2UpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZW5hYmxlTmF2aWdhdGlvbkludGVyY2VwdGlvbigpIHtcclxuICBoYXNFbmFibGVkTmF2aWdhdGlvbkludGVyY2VwdGlvbiA9IHRydWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhdHRhY2hUb0V2ZW50RGVsZWdhdG9yKGV2ZW50RGVsZWdhdG9yOiBFdmVudERlbGVnYXRvcikge1xyXG4gIC8vIFdlIG5lZWQgdG8gcmVzcG9uZCB0byBjbGlja3Mgb24gPGE+IGVsZW1lbnRzICphZnRlciogdGhlIEV2ZW50RGVsZWdhdG9yIGhhcyBmaW5pc2hlZFxyXG4gIC8vIHJ1bm5pbmcgaXRzIHNpbXVsYXRlZCBidWJibGluZyBwcm9jZXNzIHNvIHRoYXQgd2UgY2FuIHJlc3BlY3QgYW55IHByZXZlbnREZWZhdWx0IHJlcXVlc3RzLlxyXG4gIC8vIFNvIGluc3RlYWQgb2YgcmVnaXN0ZXJpbmcgb3VyIG93biBuYXRpdmUgZXZlbnQsIHJlZ2lzdGVyIHVzaW5nIHRoZSBFdmVudERlbGVnYXRvci5cclxuICBldmVudERlbGVnYXRvci5ub3RpZnlBZnRlckNsaWNrKGV2ZW50ID0+IHtcclxuICAgIGlmICghaGFzRW5hYmxlZE5hdmlnYXRpb25JbnRlcmNlcHRpb24pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChldmVudC5idXR0b24gIT09IDAgfHwgZXZlbnRIYXNTcGVjaWFsS2V5KGV2ZW50KSkge1xyXG4gICAgICAvLyBEb24ndCBzdG9wIGN0cmwvbWV0YS1jbGljayAoZXRjKSBmcm9tIG9wZW5pbmcgbGlua3MgaW4gbmV3IHRhYnMvd2luZG93c1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEludGVyY2VwdCBjbGlja3Mgb24gYWxsIDxhPiBlbGVtZW50cyB3aGVyZSB0aGUgaHJlZiBpcyB3aXRoaW4gdGhlIDxiYXNlIGhyZWY+IFVSSSBzcGFjZVxyXG4gICAgLy8gV2UgbXVzdCBleHBsaWNpdGx5IGNoZWNrIGlmIGl0IGhhcyBhbiAnaHJlZicgYXR0cmlidXRlLCBiZWNhdXNlIGlmIGl0IGRvZXNuJ3QsIHRoZSByZXN1bHQgbWlnaHQgYmUgbnVsbCBvciBhbiBlbXB0eSBzdHJpbmcgZGVwZW5kaW5nIG9uIHRoZSBicm93c2VyXHJcbiAgICBjb25zdCBhbmNob3JUYXJnZXQgPSBmaW5kQ2xvc2VzdEFuY2VzdG9yKGV2ZW50LnRhcmdldCBhcyBFbGVtZW50IHwgbnVsbCwgJ0EnKSBhcyBIVE1MQW5jaG9yRWxlbWVudCB8IG51bGw7XHJcbiAgICBjb25zdCBocmVmQXR0cmlidXRlTmFtZSA9ICdocmVmJztcclxuICAgIGlmIChhbmNob3JUYXJnZXQgJiYgYW5jaG9yVGFyZ2V0Lmhhc0F0dHJpYnV0ZShocmVmQXR0cmlidXRlTmFtZSkpIHtcclxuICAgICAgY29uc3QgdGFyZ2V0QXR0cmlidXRlVmFsdWUgPSBhbmNob3JUYXJnZXQuZ2V0QXR0cmlidXRlKCd0YXJnZXQnKTtcclxuICAgICAgY29uc3Qgb3BlbnNJblNhbWVGcmFtZSA9ICF0YXJnZXRBdHRyaWJ1dGVWYWx1ZSB8fCB0YXJnZXRBdHRyaWJ1dGVWYWx1ZSA9PT0gJ19zZWxmJztcclxuICAgICAgaWYgKCFvcGVuc0luU2FtZUZyYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBocmVmID0gYW5jaG9yVGFyZ2V0LmdldEF0dHJpYnV0ZShocmVmQXR0cmlidXRlTmFtZSkhO1xyXG4gICAgICBjb25zdCBhYnNvbHV0ZUhyZWYgPSB0b0Fic29sdXRlVXJpKGhyZWYpO1xyXG5cclxuICAgICAgaWYgKGlzV2l0aGluQmFzZVVyaVNwYWNlKGFic29sdXRlSHJlZikpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHBlcmZvcm1JbnRlcm5hbE5hdmlnYXRpb24oYWJzb2x1dGVIcmVmLCB0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbmF2aWdhdGVUbyh1cmk6IHN0cmluZywgZm9yY2VMb2FkOiBib29sZWFuKSB7XHJcbiAgY29uc3QgYWJzb2x1dGVVcmkgPSB0b0Fic29sdXRlVXJpKHVyaSk7XHJcblxyXG4gIGlmICghZm9yY2VMb2FkICYmIGlzV2l0aGluQmFzZVVyaVNwYWNlKGFic29sdXRlVXJpKSkge1xyXG4gICAgLy8gSXQncyBhbiBpbnRlcm5hbCBVUkwsIHNvIGRvIGNsaWVudC1zaWRlIG5hdmlnYXRpb25cclxuICAgIHBlcmZvcm1JbnRlcm5hbE5hdmlnYXRpb24oYWJzb2x1dGVVcmksIGZhbHNlKTtcclxuICB9IGVsc2UgaWYgKGZvcmNlTG9hZCAmJiBsb2NhdGlvbi5ocmVmID09PSB1cmkpIHtcclxuICAgIC8vIEZvcmNlLWxvYWRpbmcgdGhlIHNhbWUgVVJMIHlvdSdyZSBhbHJlYWR5IG9uIHJlcXVpcmVzIHNwZWNpYWwgaGFuZGxpbmcgdG8gYXZvaWRcclxuICAgIC8vIHRyaWdnZXJpbmcgYnJvd3Nlci1zcGVjaWZpYyBiZWhhdmlvciBpc3N1ZXMuXHJcbiAgICAvLyBGb3IgZGV0YWlscyBhYm91dCB3aGF0IHRoaXMgZml4ZXMgYW5kIHdoeSwgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hc3BuZXQvQXNwTmV0Q29yZS9wdWxsLzEwODM5XHJcbiAgICBjb25zdCB0ZW1wb3JhcnlVcmkgPSB1cmkgKyAnPyc7XHJcbiAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCAnJywgdGVtcG9yYXJ5VXJpKTtcclxuICAgIGxvY2F0aW9uLnJlcGxhY2UodXJpKTtcclxuICB9IGVsc2Uge1xyXG4gICAgLy8gSXQncyBlaXRoZXIgYW4gZXh0ZXJuYWwgVVJMLCBvciBmb3JjZUxvYWQgaXMgcmVxdWVzdGVkLCBzbyBkbyBhIGZ1bGwgcGFnZSBsb2FkXHJcbiAgICBsb2NhdGlvbi5ocmVmID0gdXJpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcGVyZm9ybUludGVybmFsTmF2aWdhdGlvbihhYnNvbHV0ZUludGVybmFsSHJlZjogc3RyaW5nLCBpbnRlcmNlcHRlZExpbms6IGJvb2xlYW4pIHtcclxuICAvLyBTaW5jZSB0aGlzIHdhcyAqbm90KiB0cmlnZ2VyZWQgYnkgYSBiYWNrL2ZvcndhcmQgZ2VzdHVyZSAodGhhdCBnb2VzIHRocm91Z2ggYSBkaWZmZXJlbnRcclxuICAvLyBjb2RlIHBhdGggc3RhcnRpbmcgd2l0aCBhIHBvcHN0YXRlIGV2ZW50KSwgd2UgZG9uJ3Qgd2FudCB0byBwcmVzZXJ2ZSB0aGUgY3VycmVudCBzY3JvbGxcclxuICAvLyBwb3NpdGlvbiwgc28gcmVzZXQgaXQuXHJcbiAgLy8gVG8gYXZvaWQgdWdseSBmbGlja2VyaW5nIGVmZmVjdHMsIHdlIGRvbid0IHdhbnQgdG8gY2hhbmdlIHRoZSBzY3JvbGwgcG9zaXRpb24gdW50aWwgdGhlXHJcbiAgLy8gd2UgcmVuZGVyIHRoZSBuZXcgcGFnZS4gQXMgYSBiZXN0IGFwcHJveGltYXRpb24sIHdhaXQgdW50aWwgdGhlIG5leHQgYmF0Y2guXHJcbiAgcmVzZXRTY3JvbGxBZnRlck5leHRCYXRjaCgpO1xyXG5cclxuICBoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCAvKiBpZ25vcmVkIHRpdGxlICovICcnLCBhYnNvbHV0ZUludGVybmFsSHJlZik7XHJcbiAgbm90aWZ5TG9jYXRpb25DaGFuZ2VkKGludGVyY2VwdGVkTGluayk7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIG5vdGlmeUxvY2F0aW9uQ2hhbmdlZChpbnRlcmNlcHRlZExpbms6IGJvb2xlYW4pIHtcclxuICBpZiAobm90aWZ5TG9jYXRpb25DaGFuZ2VkQ2FsbGJhY2spIHtcclxuICAgIGF3YWl0IG5vdGlmeUxvY2F0aW9uQ2hhbmdlZENhbGxiYWNrKGxvY2F0aW9uLmhyZWYsIGludGVyY2VwdGVkTGluayk7XHJcbiAgfVxyXG59XHJcblxyXG5sZXQgdGVzdEFuY2hvcjogSFRNTEFuY2hvckVsZW1lbnQ7XHJcbmZ1bmN0aW9uIHRvQWJzb2x1dGVVcmkocmVsYXRpdmVVcmk6IHN0cmluZykge1xyXG4gIHRlc3RBbmNob3IgPSB0ZXN0QW5jaG9yIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICB0ZXN0QW5jaG9yLmhyZWYgPSByZWxhdGl2ZVVyaTtcclxuICByZXR1cm4gdGVzdEFuY2hvci5ocmVmO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaW5kQ2xvc2VzdEFuY2VzdG9yKGVsZW1lbnQ6IEVsZW1lbnQgfCBudWxsLCB0YWdOYW1lOiBzdHJpbmcpIHtcclxuICByZXR1cm4gIWVsZW1lbnRcclxuICAgID8gbnVsbFxyXG4gICAgOiBlbGVtZW50LnRhZ05hbWUgPT09IHRhZ05hbWVcclxuICAgICAgPyBlbGVtZW50XHJcbiAgICAgIDogZmluZENsb3Nlc3RBbmNlc3RvcihlbGVtZW50LnBhcmVudEVsZW1lbnQsIHRhZ05hbWUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc1dpdGhpbkJhc2VVcmlTcGFjZShocmVmOiBzdHJpbmcpIHtcclxuICBjb25zdCBiYXNlVXJpV2l0aFRyYWlsaW5nU2xhc2ggPSB0b0Jhc2VVcmlXaXRoVHJhaWxpbmdTbGFzaChkb2N1bWVudC5iYXNlVVJJISk7IC8vIFRPRE86IE1pZ2h0IGJhc2VVUkkgcmVhbGx5IGJlIG51bGw/XHJcbiAgcmV0dXJuIGhyZWYuc3RhcnRzV2l0aChiYXNlVXJpV2l0aFRyYWlsaW5nU2xhc2gpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0b0Jhc2VVcmlXaXRoVHJhaWxpbmdTbGFzaChiYXNlVXJpOiBzdHJpbmcpIHtcclxuICByZXR1cm4gYmFzZVVyaS5zdWJzdHIoMCwgYmFzZVVyaS5sYXN0SW5kZXhPZignLycpICsgMSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGV2ZW50SGFzU3BlY2lhbEtleShldmVudDogTW91c2VFdmVudCkge1xyXG4gIHJldHVybiBldmVudC5jdHJsS2V5IHx8IGV2ZW50LnNoaWZ0S2V5IHx8IGV2ZW50LmFsdEtleSB8fCBldmVudC5tZXRhS2V5O1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=