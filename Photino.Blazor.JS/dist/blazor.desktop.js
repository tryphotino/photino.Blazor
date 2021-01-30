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
    RendererEventDispatcher_1.setEventDispatcher(function (eventDescriptor, eventArgs) { return DotNet.invokeMethodAsync('photinoNET.Blazor', 'DispatchEvent', eventDescriptor, JSON.stringify(eventArgs)); });
    NavigationManager_1.internalFunctions.listenForNavigationEvents(function (uri, intercepted) {
        return DotNet.invokeMethodAsync('photinoNET.Blazor', 'NotifyLocationChanged', uri, intercepted);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bkb3RuZXQvanNpbnRlcm9wL2Rpc3QvTWljcm9zb2Z0LkpTSW50ZXJvcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFzZTY0LWFycmF5YnVmZmVyL2xpYi9iYXNlNjQtYXJyYXlidWZmZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Jvb3QuRGVza3RvcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvSVBDLnRzIiwid2VicGFjazovLy8uL3Vwc3RyZWFtL2FzcG5ldGNvcmUvd2ViLmpzL3NyYy9FbnZpcm9ubWVudC50cyIsIndlYnBhY2s6Ly8vLi91cHN0cmVhbS9hc3BuZXRjb3JlL3dlYi5qcy9zcmMvR2xvYmFsRXhwb3J0cy50cyIsIndlYnBhY2s6Ly8vLi91cHN0cmVhbS9hc3BuZXRjb3JlL3dlYi5qcy9zcmMvUmVuZGVyaW5nL0Jyb3dzZXJSZW5kZXJlci50cyIsIndlYnBhY2s6Ly8vLi91cHN0cmVhbS9hc3BuZXRjb3JlL3dlYi5qcy9zcmMvUmVuZGVyaW5nL0VsZW1lbnRSZWZlcmVuY2VDYXB0dXJlLnRzIiwid2VicGFjazovLy8uL3Vwc3RyZWFtL2FzcG5ldGNvcmUvd2ViLmpzL3NyYy9SZW5kZXJpbmcvRXZlbnREZWxlZ2F0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vdXBzdHJlYW0vYXNwbmV0Y29yZS93ZWIuanMvc3JjL1JlbmRlcmluZy9FdmVudEZpZWxkSW5mby50cyIsIndlYnBhY2s6Ly8vLi91cHN0cmVhbS9hc3BuZXRjb3JlL3dlYi5qcy9zcmMvUmVuZGVyaW5nL0V2ZW50Rm9yRG90TmV0LnRzIiwid2VicGFjazovLy8uL3Vwc3RyZWFtL2FzcG5ldGNvcmUvd2ViLmpzL3NyYy9SZW5kZXJpbmcvTG9naWNhbEVsZW1lbnRzLnRzIiwid2VicGFjazovLy8uL3Vwc3RyZWFtL2FzcG5ldGNvcmUvd2ViLmpzL3NyYy9SZW5kZXJpbmcvUmVuZGVyQmF0Y2gvT3V0T2ZQcm9jZXNzUmVuZGVyQmF0Y2gudHMiLCJ3ZWJwYWNrOi8vLy4vdXBzdHJlYW0vYXNwbmV0Y29yZS93ZWIuanMvc3JjL1JlbmRlcmluZy9SZW5kZXJCYXRjaC9SZW5kZXJCYXRjaC50cyIsIndlYnBhY2s6Ly8vLi91cHN0cmVhbS9hc3BuZXRjb3JlL3dlYi5qcy9zcmMvUmVuZGVyaW5nL1JlbmRlckJhdGNoL1V0ZjhEZWNvZGVyLnRzIiwid2VicGFjazovLy8uL3Vwc3RyZWFtL2FzcG5ldGNvcmUvd2ViLmpzL3NyYy9SZW5kZXJpbmcvUmVuZGVyZXIudHMiLCJ3ZWJwYWNrOi8vLy4vdXBzdHJlYW0vYXNwbmV0Y29yZS93ZWIuanMvc3JjL1JlbmRlcmluZy9SZW5kZXJlckV2ZW50RGlzcGF0Y2hlci50cyIsIndlYnBhY2s6Ly8vLi91cHN0cmVhbS9hc3BuZXRjb3JlL3dlYi5qcy9zcmMvU2VydmljZXMvTmF2aWdhdGlvbk1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNE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QUFDbkQsQ0FBQztBQUVELFNBQVMsMEJBQTBCLENBQUMsT0FBZTtJQUNqRCxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDekQsQ0FBQztBQUVELFNBQVMsa0JBQWtCLENBQUMsS0FBaUI7SUFDM0MsT0FBTyxLQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDO0FBQzFFLENBQUMiLCJmaWxlIjoiYmxhem9yLmRlc2t0b3AuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9Cb290LkRlc2t0b3AudHNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcclxuLy8gVGhpcyBpcyBhIHNpbmdsZS1maWxlIHNlbGYtY29udGFpbmVkIG1vZHVsZSB0byBhdm9pZCB0aGUgbmVlZCBmb3IgYSBXZWJwYWNrIGJ1aWxkXHJcbnZhciBEb3ROZXQ7XHJcbihmdW5jdGlvbiAoRG90TmV0KSB7XHJcbiAgICB3aW5kb3cuRG90TmV0ID0gRG90TmV0OyAvLyBFbnN1cmUgcmVhY2hhYmxlIGZyb20gYW55d2hlcmVcclxuICAgIHZhciBqc29uUmV2aXZlcnMgPSBbXTtcclxuICAgIHZhciBwZW5kaW5nQXN5bmNDYWxscyA9IHt9O1xyXG4gICAgdmFyIGNhY2hlZEpTRnVuY3Rpb25zID0ge307XHJcbiAgICB2YXIgbmV4dEFzeW5jQ2FsbElkID0gMTsgLy8gU3RhcnQgYXQgMSBiZWNhdXNlIHplcm8gc2lnbmFscyBcIm5vIHJlc3BvbnNlIG5lZWRlZFwiXHJcbiAgICB2YXIgZG90TmV0RGlzcGF0Y2hlciA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHNwZWNpZmllZCAuTkVUIGNhbGwgZGlzcGF0Y2hlciBhcyB0aGUgY3VycmVudCBpbnN0YW5jZSBzbyB0aGF0IGl0IHdpbGwgYmUgdXNlZFxyXG4gICAgICogZm9yIGZ1dHVyZSBpbnZvY2F0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZGlzcGF0Y2hlciBBbiBvYmplY3QgdGhhdCBjYW4gZGlzcGF0Y2ggY2FsbHMgZnJvbSBKYXZhU2NyaXB0IHRvIGEgLk5FVCBydW50aW1lLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBhdHRhY2hEaXNwYXRjaGVyKGRpc3BhdGNoZXIpIHtcclxuICAgICAgICBkb3ROZXREaXNwYXRjaGVyID0gZGlzcGF0Y2hlcjtcclxuICAgIH1cclxuICAgIERvdE5ldC5hdHRhY2hEaXNwYXRjaGVyID0gYXR0YWNoRGlzcGF0Y2hlcjtcclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIEpTT04gcmV2aXZlciBjYWxsYmFjayB0aGF0IHdpbGwgYmUgdXNlZCB3aGVuIHBhcnNpbmcgYXJndW1lbnRzIHJlY2VpdmVkIGZyb20gLk5FVC5cclxuICAgICAqIEBwYXJhbSByZXZpdmVyIFRoZSByZXZpdmVyIHRvIGFkZC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gYXR0YWNoUmV2aXZlcihyZXZpdmVyKSB7XHJcbiAgICAgICAganNvblJldml2ZXJzLnB1c2gocmV2aXZlcik7XHJcbiAgICB9XHJcbiAgICBEb3ROZXQuYXR0YWNoUmV2aXZlciA9IGF0dGFjaFJldml2ZXI7XHJcbiAgICAvKipcclxuICAgICAqIEludm9rZXMgdGhlIHNwZWNpZmllZCAuTkVUIHB1YmxpYyBtZXRob2Qgc3luY2hyb25vdXNseS4gTm90IGFsbCBob3N0aW5nIHNjZW5hcmlvcyBzdXBwb3J0XHJcbiAgICAgKiBzeW5jaHJvbm91cyBpbnZvY2F0aW9uLCBzbyBpZiBwb3NzaWJsZSB1c2UgaW52b2tlTWV0aG9kQXN5bmMgaW5zdGVhZC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gYXNzZW1ibHlOYW1lIFRoZSBzaG9ydCBuYW1lICh3aXRob3V0IGtleS92ZXJzaW9uIG9yIC5kbGwgZXh0ZW5zaW9uKSBvZiB0aGUgLk5FVCBhc3NlbWJseSBjb250YWluaW5nIHRoZSBtZXRob2QuXHJcbiAgICAgKiBAcGFyYW0gbWV0aG9kSWRlbnRpZmllciBUaGUgaWRlbnRpZmllciBvZiB0aGUgbWV0aG9kIHRvIGludm9rZS4gVGhlIG1ldGhvZCBtdXN0IGhhdmUgYSBbSlNJbnZva2FibGVdIGF0dHJpYnV0ZSBzcGVjaWZ5aW5nIHRoaXMgaWRlbnRpZmllci5cclxuICAgICAqIEBwYXJhbSBhcmdzIEFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZSBtZXRob2QsIGVhY2ggb2Ygd2hpY2ggbXVzdCBiZSBKU09OLXNlcmlhbGl6YWJsZS5cclxuICAgICAqIEByZXR1cm5zIFRoZSByZXN1bHQgb2YgdGhlIG9wZXJhdGlvbi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaW52b2tlTWV0aG9kKGFzc2VtYmx5TmFtZSwgbWV0aG9kSWRlbnRpZmllcikge1xyXG4gICAgICAgIHZhciBhcmdzID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAyOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgYXJnc1tfaSAtIDJdID0gYXJndW1lbnRzW19pXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGludm9rZVBvc3NpYmxlSW5zdGFuY2VNZXRob2QoYXNzZW1ibHlOYW1lLCBtZXRob2RJZGVudGlmaWVyLCBudWxsLCBhcmdzKTtcclxuICAgIH1cclxuICAgIERvdE5ldC5pbnZva2VNZXRob2QgPSBpbnZva2VNZXRob2Q7XHJcbiAgICAvKipcclxuICAgICAqIEludm9rZXMgdGhlIHNwZWNpZmllZCAuTkVUIHB1YmxpYyBtZXRob2QgYXN5bmNocm9ub3VzbHkuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGFzc2VtYmx5TmFtZSBUaGUgc2hvcnQgbmFtZSAod2l0aG91dCBrZXkvdmVyc2lvbiBvciAuZGxsIGV4dGVuc2lvbikgb2YgdGhlIC5ORVQgYXNzZW1ibHkgY29udGFpbmluZyB0aGUgbWV0aG9kLlxyXG4gICAgICogQHBhcmFtIG1ldGhvZElkZW50aWZpZXIgVGhlIGlkZW50aWZpZXIgb2YgdGhlIG1ldGhvZCB0byBpbnZva2UuIFRoZSBtZXRob2QgbXVzdCBoYXZlIGEgW0pTSW52b2thYmxlXSBhdHRyaWJ1dGUgc3BlY2lmeWluZyB0aGlzIGlkZW50aWZpZXIuXHJcbiAgICAgKiBAcGFyYW0gYXJncyBBcmd1bWVudHMgdG8gcGFzcyB0byB0aGUgbWV0aG9kLCBlYWNoIG9mIHdoaWNoIG11c3QgYmUgSlNPTi1zZXJpYWxpemFibGUuXHJcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgcmVwcmVzZW50aW5nIHRoZSByZXN1bHQgb2YgdGhlIG9wZXJhdGlvbi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaW52b2tlTWV0aG9kQXN5bmMoYXNzZW1ibHlOYW1lLCBtZXRob2RJZGVudGlmaWVyKSB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDI7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICBhcmdzW19pIC0gMl0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW52b2tlUG9zc2libGVJbnN0YW5jZU1ldGhvZEFzeW5jKGFzc2VtYmx5TmFtZSwgbWV0aG9kSWRlbnRpZmllciwgbnVsbCwgYXJncyk7XHJcbiAgICB9XHJcbiAgICBEb3ROZXQuaW52b2tlTWV0aG9kQXN5bmMgPSBpbnZva2VNZXRob2RBc3luYztcclxuICAgIGZ1bmN0aW9uIGludm9rZVBvc3NpYmxlSW5zdGFuY2VNZXRob2QoYXNzZW1ibHlOYW1lLCBtZXRob2RJZGVudGlmaWVyLCBkb3ROZXRPYmplY3RJZCwgYXJncykge1xyXG4gICAgICAgIHZhciBkaXNwYXRjaGVyID0gZ2V0UmVxdWlyZWREaXNwYXRjaGVyKCk7XHJcbiAgICAgICAgaWYgKGRpc3BhdGNoZXIuaW52b2tlRG90TmV0RnJvbUpTKSB7XHJcbiAgICAgICAgICAgIHZhciBhcmdzSnNvbiA9IEpTT04uc3RyaW5naWZ5KGFyZ3MsIGFyZ1JlcGxhY2VyKTtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdEpzb24gPSBkaXNwYXRjaGVyLmludm9rZURvdE5ldEZyb21KUyhhc3NlbWJseU5hbWUsIG1ldGhvZElkZW50aWZpZXIsIGRvdE5ldE9iamVjdElkLCBhcmdzSnNvbik7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRKc29uID8gcGFyc2VKc29uV2l0aFJldml2ZXJzKHJlc3VsdEpzb24pIDogbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGN1cnJlbnQgZGlzcGF0Y2hlciBkb2VzIG5vdCBzdXBwb3J0IHN5bmNocm9ub3VzIGNhbGxzIGZyb20gSlMgdG8gLk5FVC4gVXNlIGludm9rZU1ldGhvZEFzeW5jIGluc3RlYWQuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gaW52b2tlUG9zc2libGVJbnN0YW5jZU1ldGhvZEFzeW5jKGFzc2VtYmx5TmFtZSwgbWV0aG9kSWRlbnRpZmllciwgZG90TmV0T2JqZWN0SWQsIGFyZ3MpIHtcclxuICAgICAgICBpZiAoYXNzZW1ibHlOYW1lICYmIGRvdE5ldE9iamVjdElkKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZvciBpbnN0YW5jZSBtZXRob2QgY2FsbHMsIGFzc2VtYmx5TmFtZSBzaG91bGQgYmUgbnVsbC4gUmVjZWl2ZWQgJ1wiICsgYXNzZW1ibHlOYW1lICsgXCInLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGFzeW5jQ2FsbElkID0gbmV4dEFzeW5jQ2FsbElkKys7XHJcbiAgICAgICAgdmFyIHJlc3VsdFByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgIHBlbmRpbmdBc3luY0NhbGxzW2FzeW5jQ2FsbElkXSA9IHsgcmVzb2x2ZTogcmVzb2x2ZSwgcmVqZWN0OiByZWplY3QgfTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgYXJnc0pzb24gPSBKU09OLnN0cmluZ2lmeShhcmdzLCBhcmdSZXBsYWNlcik7XHJcbiAgICAgICAgICAgIGdldFJlcXVpcmVkRGlzcGF0Y2hlcigpLmJlZ2luSW52b2tlRG90TmV0RnJvbUpTKGFzeW5jQ2FsbElkLCBhc3NlbWJseU5hbWUsIG1ldGhvZElkZW50aWZpZXIsIGRvdE5ldE9iamVjdElkLCBhcmdzSnNvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChleCkge1xyXG4gICAgICAgICAgICAvLyBTeW5jaHJvbm91cyBmYWlsdXJlXHJcbiAgICAgICAgICAgIGNvbXBsZXRlUGVuZGluZ0NhbGwoYXN5bmNDYWxsSWQsIGZhbHNlLCBleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHRQcm9taXNlO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZ2V0UmVxdWlyZWREaXNwYXRjaGVyKCkge1xyXG4gICAgICAgIGlmIChkb3ROZXREaXNwYXRjaGVyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkb3ROZXREaXNwYXRjaGVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIC5ORVQgY2FsbCBkaXNwYXRjaGVyIGhhcyBiZWVuIHNldC4nKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGNvbXBsZXRlUGVuZGluZ0NhbGwoYXN5bmNDYWxsSWQsIHN1Y2Nlc3MsIHJlc3VsdE9yRXJyb3IpIHtcclxuICAgICAgICBpZiAoIXBlbmRpbmdBc3luY0NhbGxzLmhhc093blByb3BlcnR5KGFzeW5jQ2FsbElkKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGVyZSBpcyBubyBwZW5kaW5nIGFzeW5jIGNhbGwgd2l0aCBJRCBcIiArIGFzeW5jQ2FsbElkICsgXCIuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgYXN5bmNDYWxsID0gcGVuZGluZ0FzeW5jQ2FsbHNbYXN5bmNDYWxsSWRdO1xyXG4gICAgICAgIGRlbGV0ZSBwZW5kaW5nQXN5bmNDYWxsc1thc3luY0NhbGxJZF07XHJcbiAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgYXN5bmNDYWxsLnJlc29sdmUocmVzdWx0T3JFcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhc3luY0NhbGwucmVqZWN0KHJlc3VsdE9yRXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUmVjZWl2ZXMgaW5jb21pbmcgY2FsbHMgZnJvbSAuTkVUIGFuZCBkaXNwYXRjaGVzIHRoZW0gdG8gSmF2YVNjcmlwdC5cclxuICAgICAqL1xyXG4gICAgRG90TmV0LmpzQ2FsbERpc3BhdGNoZXIgPSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRmluZHMgdGhlIEphdmFTY3JpcHQgZnVuY3Rpb24gbWF0Y2hpbmcgdGhlIHNwZWNpZmllZCBpZGVudGlmaWVyLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIGlkZW50aWZpZXIgSWRlbnRpZmllcyB0aGUgZ2xvYmFsbHktcmVhY2hhYmxlIGZ1bmN0aW9uIHRvIGJlIHJldHVybmVkLlxyXG4gICAgICAgICAqIEByZXR1cm5zIEEgRnVuY3Rpb24gaW5zdGFuY2UuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZmluZEpTRnVuY3Rpb246IGZpbmRKU0Z1bmN0aW9uLFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEludm9rZXMgdGhlIHNwZWNpZmllZCBzeW5jaHJvbm91cyBKYXZhU2NyaXB0IGZ1bmN0aW9uLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIGlkZW50aWZpZXIgSWRlbnRpZmllcyB0aGUgZ2xvYmFsbHktcmVhY2hhYmxlIGZ1bmN0aW9uIHRvIGludm9rZS5cclxuICAgICAgICAgKiBAcGFyYW0gYXJnc0pzb24gSlNPTiByZXByZXNlbnRhdGlvbiBvZiBhcmd1bWVudHMgdG8gYmUgcGFzc2VkIHRvIHRoZSBmdW5jdGlvbi5cclxuICAgICAgICAgKiBAcmV0dXJucyBKU09OIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBpbnZvY2F0aW9uIHJlc3VsdC5cclxuICAgICAgICAgKi9cclxuICAgICAgICBpbnZva2VKU0Zyb21Eb3ROZXQ6IGZ1bmN0aW9uIChpZGVudGlmaWVyLCBhcmdzSnNvbikge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gZmluZEpTRnVuY3Rpb24oaWRlbnRpZmllcikuYXBwbHkobnVsbCwgcGFyc2VKc29uV2l0aFJldml2ZXJzKGFyZ3NKc29uKSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQgPT09IG51bGwgfHwgcmVzdWx0ID09PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgID8gbnVsbFxyXG4gICAgICAgICAgICAgICAgOiBKU09OLnN0cmluZ2lmeShyZXN1bHQsIGFyZ1JlcGxhY2VyKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEludm9rZXMgdGhlIHNwZWNpZmllZCBzeW5jaHJvbm91cyBvciBhc3luY2hyb25vdXMgSmF2YVNjcmlwdCBmdW5jdGlvbi5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSBhc3luY0hhbmRsZSBBIHZhbHVlIGlkZW50aWZ5aW5nIHRoZSBhc3luY2hyb25vdXMgb3BlcmF0aW9uLiBUaGlzIHZhbHVlIHdpbGwgYmUgcGFzc2VkIGJhY2sgaW4gYSBsYXRlciBjYWxsIHRvIGVuZEludm9rZUpTRnJvbURvdE5ldC5cclxuICAgICAgICAgKiBAcGFyYW0gaWRlbnRpZmllciBJZGVudGlmaWVzIHRoZSBnbG9iYWxseS1yZWFjaGFibGUgZnVuY3Rpb24gdG8gaW52b2tlLlxyXG4gICAgICAgICAqIEBwYXJhbSBhcmdzSnNvbiBKU09OIHJlcHJlc2VudGF0aW9uIG9mIGFyZ3VtZW50cyB0byBiZSBwYXNzZWQgdG8gdGhlIGZ1bmN0aW9uLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGJlZ2luSW52b2tlSlNGcm9tRG90TmV0OiBmdW5jdGlvbiAoYXN5bmNIYW5kbGUsIGlkZW50aWZpZXIsIGFyZ3NKc29uKSB7XHJcbiAgICAgICAgICAgIC8vIENvZXJjZSBzeW5jaHJvbm91cyBmdW5jdGlvbnMgaW50byBhc3luYyBvbmVzLCBwbHVzIHRyZWF0XHJcbiAgICAgICAgICAgIC8vIHN5bmNocm9ub3VzIGV4Y2VwdGlvbnMgdGhlIHNhbWUgYXMgYXN5bmMgb25lc1xyXG4gICAgICAgICAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3luY2hyb25vdXNSZXN1bHRPclByb21pc2UgPSBmaW5kSlNGdW5jdGlvbihpZGVudGlmaWVyKS5hcHBseShudWxsLCBwYXJzZUpzb25XaXRoUmV2aXZlcnMoYXJnc0pzb24pKTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoc3luY2hyb25vdXNSZXN1bHRPclByb21pc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gV2Ugb25seSBsaXN0ZW4gZm9yIGEgcmVzdWx0IGlmIHRoZSBjYWxsZXIgd2FudHMgdG8gYmUgbm90aWZpZWQgYWJvdXQgaXRcclxuICAgICAgICAgICAgaWYgKGFzeW5jSGFuZGxlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBPbiBjb21wbGV0aW9uLCBkaXNwYXRjaCByZXN1bHQgYmFjayB0byAuTkVUXHJcbiAgICAgICAgICAgICAgICAvLyBOb3QgdXNpbmcgXCJhd2FpdFwiIGJlY2F1c2UgaXQgY29kZWdlbnMgYSBsb3Qgb2YgYm9pbGVycGxhdGVcclxuICAgICAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7IHJldHVybiBnZXRSZXF1aXJlZERpc3BhdGNoZXIoKS5lbmRJbnZva2VKU0Zyb21Eb3ROZXQoYXN5bmNIYW5kbGUsIHRydWUsIEpTT04uc3RyaW5naWZ5KFthc3luY0hhbmRsZSwgdHJ1ZSwgcmVzdWx0XSwgYXJnUmVwbGFjZXIpKTsgfSwgZnVuY3Rpb24gKGVycm9yKSB7IHJldHVybiBnZXRSZXF1aXJlZERpc3BhdGNoZXIoKS5lbmRJbnZva2VKU0Zyb21Eb3ROZXQoYXN5bmNIYW5kbGUsIGZhbHNlLCBKU09OLnN0cmluZ2lmeShbYXN5bmNIYW5kbGUsIGZhbHNlLCBmb3JtYXRFcnJvcihlcnJvcildKSk7IH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZWNlaXZlcyBub3RpZmljYXRpb24gdGhhdCBhbiBhc3luYyBjYWxsIGZyb20gSlMgdG8gLk5FVCBoYXMgY29tcGxldGVkLlxyXG4gICAgICAgICAqIEBwYXJhbSBhc3luY0NhbGxJZCBUaGUgaWRlbnRpZmllciBzdXBwbGllZCBpbiBhbiBlYXJsaWVyIGNhbGwgdG8gYmVnaW5JbnZva2VEb3ROZXRGcm9tSlMuXHJcbiAgICAgICAgICogQHBhcmFtIHN1Y2Nlc3MgQSBmbGFnIHRvIGluZGljYXRlIHdoZXRoZXIgdGhlIG9wZXJhdGlvbiBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LlxyXG4gICAgICAgICAqIEBwYXJhbSByZXN1bHRPckV4Y2VwdGlvbk1lc3NhZ2UgRWl0aGVyIHRoZSBvcGVyYXRpb24gcmVzdWx0IG9yIGFuIGVycm9yIG1lc3NhZ2UuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZW5kSW52b2tlRG90TmV0RnJvbUpTOiBmdW5jdGlvbiAoYXN5bmNDYWxsSWQsIHN1Y2Nlc3MsIHJlc3VsdE9yRXhjZXB0aW9uTWVzc2FnZSkge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0T3JFcnJvciA9IHN1Y2Nlc3MgPyByZXN1bHRPckV4Y2VwdGlvbk1lc3NhZ2UgOiBuZXcgRXJyb3IocmVzdWx0T3JFeGNlcHRpb25NZXNzYWdlKTtcclxuICAgICAgICAgICAgY29tcGxldGVQZW5kaW5nQ2FsbChwYXJzZUludChhc3luY0NhbGxJZCksIHN1Y2Nlc3MsIHJlc3VsdE9yRXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBmdW5jdGlvbiBwYXJzZUpzb25XaXRoUmV2aXZlcnMoanNvbikge1xyXG4gICAgICAgIHJldHVybiBqc29uID8gSlNPTi5wYXJzZShqc29uLCBmdW5jdGlvbiAoa2V5LCBpbml0aWFsVmFsdWUpIHtcclxuICAgICAgICAgICAgLy8gSW52b2tlIGVhY2ggcmV2aXZlciBpbiBvcmRlciwgcGFzc2luZyB0aGUgb3V0cHV0IGZyb20gdGhlIHByZXZpb3VzIHJldml2ZXIsXHJcbiAgICAgICAgICAgIC8vIHNvIHRoYXQgZWFjaCBvbmUgZ2V0cyBhIGNoYW5jZSB0byB0cmFuc2Zvcm0gdGhlIHZhbHVlXHJcbiAgICAgICAgICAgIHJldHVybiBqc29uUmV2aXZlcnMucmVkdWNlKGZ1bmN0aW9uIChsYXRlc3RWYWx1ZSwgcmV2aXZlcikgeyByZXR1cm4gcmV2aXZlcihrZXksIGxhdGVzdFZhbHVlKTsgfSwgaW5pdGlhbFZhbHVlKTtcclxuICAgICAgICB9KSA6IG51bGw7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBmb3JtYXRFcnJvcihlcnJvcikge1xyXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlcnJvci5tZXNzYWdlICsgXCJcXG5cIiArIGVycm9yLnN0YWNrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVycm9yID8gZXJyb3IudG9TdHJpbmcoKSA6ICdudWxsJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBmaW5kSlNGdW5jdGlvbihpZGVudGlmaWVyKSB7XHJcbiAgICAgICAgaWYgKGNhY2hlZEpTRnVuY3Rpb25zLmhhc093blByb3BlcnR5KGlkZW50aWZpZXIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRKU0Z1bmN0aW9uc1tpZGVudGlmaWVyXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHdpbmRvdztcclxuICAgICAgICB2YXIgcmVzdWx0SWRlbnRpZmllciA9ICd3aW5kb3cnO1xyXG4gICAgICAgIHZhciBsYXN0U2VnbWVudFZhbHVlO1xyXG4gICAgICAgIGlkZW50aWZpZXIuc3BsaXQoJy4nKS5mb3JFYWNoKGZ1bmN0aW9uIChzZWdtZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChzZWdtZW50IGluIHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgbGFzdFNlZ21lbnRWYWx1ZSA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdFtzZWdtZW50XTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdElkZW50aWZpZXIgKz0gJy4nICsgc2VnbWVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBmaW5kICdcIiArIHNlZ21lbnQgKyBcIicgaW4gJ1wiICsgcmVzdWx0SWRlbnRpZmllciArIFwiJy5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmJpbmQobGFzdFNlZ21lbnRWYWx1ZSk7XHJcbiAgICAgICAgICAgIGNhY2hlZEpTRnVuY3Rpb25zW2lkZW50aWZpZXJdID0gcmVzdWx0O1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHZhbHVlICdcIiArIHJlc3VsdElkZW50aWZpZXIgKyBcIicgaXMgbm90IGEgZnVuY3Rpb24uXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHZhciBEb3ROZXRPYmplY3QgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gRG90TmV0T2JqZWN0KF9pZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pZCA9IF9pZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgRG90TmV0T2JqZWN0LnByb3RvdHlwZS5pbnZva2VNZXRob2QgPSBmdW5jdGlvbiAobWV0aG9kSWRlbnRpZmllcikge1xyXG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICAgICAgYXJnc1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gaW52b2tlUG9zc2libGVJbnN0YW5jZU1ldGhvZChudWxsLCBtZXRob2RJZGVudGlmaWVyLCB0aGlzLl9pZCwgYXJncyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBEb3ROZXRPYmplY3QucHJvdG90eXBlLmludm9rZU1ldGhvZEFzeW5jID0gZnVuY3Rpb24gKG1ldGhvZElkZW50aWZpZXIpIHtcclxuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgIGFyZ3NbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGludm9rZVBvc3NpYmxlSW5zdGFuY2VNZXRob2RBc3luYyhudWxsLCBtZXRob2RJZGVudGlmaWVyLCB0aGlzLl9pZCwgYXJncyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBEb3ROZXRPYmplY3QucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBwcm9taXNlID0gaW52b2tlUG9zc2libGVJbnN0YW5jZU1ldGhvZEFzeW5jKG51bGwsICdfX0Rpc3Bvc2UnLCB0aGlzLl9pZCwgbnVsbCk7XHJcbiAgICAgICAgICAgIHByb21pc2UuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7IHJldHVybiBjb25zb2xlLmVycm9yKGVycm9yKTsgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBEb3ROZXRPYmplY3QucHJvdG90eXBlLnNlcmlhbGl6ZUFzQXJnID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4geyBfX2RvdE5ldE9iamVjdDogdGhpcy5faWQgfTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBEb3ROZXRPYmplY3Q7XHJcbiAgICB9KCkpO1xyXG4gICAgdmFyIGRvdE5ldE9iamVjdFJlZktleSA9ICdfX2RvdE5ldE9iamVjdCc7XHJcbiAgICBhdHRhY2hSZXZpdmVyKGZ1bmN0aW9uIHJldml2ZURvdE5ldE9iamVjdChrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUuaGFzT3duUHJvcGVydHkoZG90TmV0T2JqZWN0UmVmS2V5KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IERvdE5ldE9iamVjdCh2YWx1ZS5fX2RvdE5ldE9iamVjdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFVucmVjb2duaXplZCAtIGxldCBhbm90aGVyIHJldml2ZXIgaGFuZGxlIGl0XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfSk7XHJcbiAgICBmdW5jdGlvbiBhcmdSZXBsYWNlcihrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRG90TmV0T2JqZWN0ID8gdmFsdWUuc2VyaWFsaXplQXNBcmcoKSA6IHZhbHVlO1xyXG4gICAgfVxyXG59KShEb3ROZXQgfHwgKERvdE5ldCA9IHt9KSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU1pY3Jvc29mdC5KU0ludGVyb3AuanMubWFwIiwiLypcclxuICogYmFzZTY0LWFycmF5YnVmZmVyXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9uaWtsYXN2aC9iYXNlNjQtYXJyYXlidWZmZXJcclxuICpcclxuICogQ29weXJpZ2h0IChjKSAyMDEyIE5pa2xhcyB2b24gSGVydHplblxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXHJcbiAqL1xyXG4oZnVuY3Rpb24oKXtcclxuICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgdmFyIGNoYXJzID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCI7XHJcblxyXG4gIC8vIFVzZSBhIGxvb2t1cCB0YWJsZSB0byBmaW5kIHRoZSBpbmRleC5cclxuICB2YXIgbG9va3VwID0gbmV3IFVpbnQ4QXJyYXkoMjU2KTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBsb29rdXBbY2hhcnMuY2hhckNvZGVBdChpKV0gPSBpO1xyXG4gIH1cclxuXHJcbiAgZXhwb3J0cy5lbmNvZGUgPSBmdW5jdGlvbihhcnJheWJ1ZmZlcikge1xyXG4gICAgdmFyIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpLFxyXG4gICAgaSwgbGVuID0gYnl0ZXMubGVuZ3RoLCBiYXNlNjQgPSBcIlwiO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrPTMpIHtcclxuICAgICAgYmFzZTY0ICs9IGNoYXJzW2J5dGVzW2ldID4+IDJdO1xyXG4gICAgICBiYXNlNjQgKz0gY2hhcnNbKChieXRlc1tpXSAmIDMpIDw8IDQpIHwgKGJ5dGVzW2kgKyAxXSA+PiA0KV07XHJcbiAgICAgIGJhc2U2NCArPSBjaGFyc1soKGJ5dGVzW2kgKyAxXSAmIDE1KSA8PCAyKSB8IChieXRlc1tpICsgMl0gPj4gNildO1xyXG4gICAgICBiYXNlNjQgKz0gY2hhcnNbYnl0ZXNbaSArIDJdICYgNjNdO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICgobGVuICUgMykgPT09IDIpIHtcclxuICAgICAgYmFzZTY0ID0gYmFzZTY0LnN1YnN0cmluZygwLCBiYXNlNjQubGVuZ3RoIC0gMSkgKyBcIj1cIjtcclxuICAgIH0gZWxzZSBpZiAobGVuICUgMyA9PT0gMSkge1xyXG4gICAgICBiYXNlNjQgPSBiYXNlNjQuc3Vic3RyaW5nKDAsIGJhc2U2NC5sZW5ndGggLSAyKSArIFwiPT1cIjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYmFzZTY0O1xyXG4gIH07XHJcblxyXG4gIGV4cG9ydHMuZGVjb2RlID0gIGZ1bmN0aW9uKGJhc2U2NCkge1xyXG4gICAgdmFyIGJ1ZmZlckxlbmd0aCA9IGJhc2U2NC5sZW5ndGggKiAwLjc1LFxyXG4gICAgbGVuID0gYmFzZTY0Lmxlbmd0aCwgaSwgcCA9IDAsXHJcbiAgICBlbmNvZGVkMSwgZW5jb2RlZDIsIGVuY29kZWQzLCBlbmNvZGVkNDtcclxuXHJcbiAgICBpZiAoYmFzZTY0W2Jhc2U2NC5sZW5ndGggLSAxXSA9PT0gXCI9XCIpIHtcclxuICAgICAgYnVmZmVyTGVuZ3RoLS07XHJcbiAgICAgIGlmIChiYXNlNjRbYmFzZTY0Lmxlbmd0aCAtIDJdID09PSBcIj1cIikge1xyXG4gICAgICAgIGJ1ZmZlckxlbmd0aC0tO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGFycmF5YnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKGJ1ZmZlckxlbmd0aCksXHJcbiAgICBieXRlcyA9IG5ldyBVaW50OEFycmF5KGFycmF5YnVmZmVyKTtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKz00KSB7XHJcbiAgICAgIGVuY29kZWQxID0gbG9va3VwW2Jhc2U2NC5jaGFyQ29kZUF0KGkpXTtcclxuICAgICAgZW5jb2RlZDIgPSBsb29rdXBbYmFzZTY0LmNoYXJDb2RlQXQoaSsxKV07XHJcbiAgICAgIGVuY29kZWQzID0gbG9va3VwW2Jhc2U2NC5jaGFyQ29kZUF0KGkrMildO1xyXG4gICAgICBlbmNvZGVkNCA9IGxvb2t1cFtiYXNlNjQuY2hhckNvZGVBdChpKzMpXTtcclxuXHJcbiAgICAgIGJ5dGVzW3ArK10gPSAoZW5jb2RlZDEgPDwgMikgfCAoZW5jb2RlZDIgPj4gNCk7XHJcbiAgICAgIGJ5dGVzW3ArK10gPSAoKGVuY29kZWQyICYgMTUpIDw8IDQpIHwgKGVuY29kZWQzID4+IDIpO1xyXG4gICAgICBieXRlc1twKytdID0gKChlbmNvZGVkMyAmIDMpIDw8IDYpIHwgKGVuY29kZWQ0ICYgNjMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBhcnJheWJ1ZmZlcjtcclxuICB9O1xyXG59KSgpO1xyXG4iLCJpbXBvcnQgJ0Bkb3RuZXQvanNpbnRlcm9wL2Rpc3QvTWljcm9zb2Z0LkpTSW50ZXJvcCc7XHJcbmltcG9ydCAnQGJyb3dzZXJqcy9HbG9iYWxFeHBvcnRzJztcclxuaW1wb3J0IHsgT3V0T2ZQcm9jZXNzUmVuZGVyQmF0Y2ggfSBmcm9tICdAYnJvd3NlcmpzL1JlbmRlcmluZy9SZW5kZXJCYXRjaC9PdXRPZlByb2Nlc3NSZW5kZXJCYXRjaCc7XHJcbmltcG9ydCB7IHNldEV2ZW50RGlzcGF0Y2hlciB9IGZyb20gJ0Bicm93c2VyanMvUmVuZGVyaW5nL1JlbmRlcmVyRXZlbnREaXNwYXRjaGVyJztcclxuaW1wb3J0IHsgaW50ZXJuYWxGdW5jdGlvbnMgYXMgbmF2aWdhdGlvbk1hbmFnZXJGdW5jdGlvbnMgfSBmcm9tICdAYnJvd3NlcmpzL1NlcnZpY2VzL05hdmlnYXRpb25NYW5hZ2VyJztcclxuaW1wb3J0IHsgcmVuZGVyQmF0Y2ggfSBmcm9tICdAYnJvd3NlcmpzL1JlbmRlcmluZy9SZW5kZXJlcic7XHJcbmltcG9ydCB7IGRlY29kZSB9IGZyb20gJ2Jhc2U2NC1hcnJheWJ1ZmZlcic7XHJcbmltcG9ydCAqIGFzIGlwYyBmcm9tICcuL0lQQyc7XHJcblxyXG5mdW5jdGlvbiBib290KCkge1xyXG4gIHNldEV2ZW50RGlzcGF0Y2hlcigoZXZlbnREZXNjcmlwdG9yLCBldmVudEFyZ3MpID0+IERvdE5ldC5pbnZva2VNZXRob2RBc3luYygncGhvdGlub05FVC5CbGF6b3InLCAnRGlzcGF0Y2hFdmVudCcsIGV2ZW50RGVzY3JpcHRvciwgSlNPTi5zdHJpbmdpZnkoZXZlbnRBcmdzKSkpO1xyXG4gIG5hdmlnYXRpb25NYW5hZ2VyRnVuY3Rpb25zLmxpc3RlbkZvck5hdmlnYXRpb25FdmVudHMoKHVyaTogc3RyaW5nLCBpbnRlcmNlcHRlZDogYm9vbGVhbikgPT4ge1xyXG4gICAgcmV0dXJuIERvdE5ldC5pbnZva2VNZXRob2RBc3luYygncGhvdGlub05FVC5CbGF6b3InLCAnTm90aWZ5TG9jYXRpb25DaGFuZ2VkJywgdXJpLCBpbnRlcmNlcHRlZCk7XHJcbiAgfSk7XHJcblxyXG4gIC8vIENvbmZpZ3VyZSB0aGUgbWVjaGFuaXNtIGZvciBKUzwtPk5FVCBjYWxsc1xyXG4gIERvdE5ldC5hdHRhY2hEaXNwYXRjaGVyKHtcclxuICAgIGJlZ2luSW52b2tlRG90TmV0RnJvbUpTOiAoY2FsbElkOiBudW1iZXIsIGFzc2VtYmx5TmFtZTogc3RyaW5nIHwgbnVsbCwgbWV0aG9kSWRlbnRpZmllcjogc3RyaW5nLCBkb3ROZXRPYmplY3RJZDogbnVtYmVyIHwgbnVsbCwgYXJnc0pzb246IHN0cmluZykgPT4ge1xyXG4gICAgICBpcGMuc2VuZCgnQmVnaW5JbnZva2VEb3ROZXRGcm9tSlMnLCBbY2FsbElkID8gY2FsbElkLnRvU3RyaW5nKCkgOiBudWxsLCBhc3NlbWJseU5hbWUsIG1ldGhvZElkZW50aWZpZXIsIGRvdE5ldE9iamVjdElkIHx8IDAsIGFyZ3NKc29uXSk7XHJcbiAgICB9LFxyXG4gICAgZW5kSW52b2tlSlNGcm9tRG90TmV0OiAoY2FsbElkOiBudW1iZXIsIHN1Y2NlZWRlZDogYm9vbGVhbiwgcmVzdWx0T3JFcnJvcjogYW55KSA9PiB7XHJcbiAgICAgIGlwYy5zZW5kKCdFbmRJbnZva2VKU0Zyb21Eb3ROZXQnLCBbY2FsbElkLCBzdWNjZWVkZWQsIHJlc3VsdE9yRXJyb3JdKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgbmF2aWdhdGlvbk1hbmFnZXJGdW5jdGlvbnMuZW5hYmxlTmF2aWdhdGlvbkludGVyY2VwdGlvbigpO1xyXG5cclxuICBpcGMub24oJ0pTLkJlZ2luSW52b2tlSlMnLCAoYXN5bmNIYW5kbGUsIGlkZW50aWZpZXIsIGFyZ3NKc29uKSA9PiB7XHJcbiAgICBEb3ROZXQuanNDYWxsRGlzcGF0Y2hlci5iZWdpbkludm9rZUpTRnJvbURvdE5ldChhc3luY0hhbmRsZSwgaWRlbnRpZmllciwgYXJnc0pzb24pO1xyXG4gIH0pO1xyXG5cclxuICBpcGMub24oJ0pTLkVuZEludm9rZURvdE5ldCcsIChjYWxsSWQsIHN1Y2Nlc3MsIHJlc3VsdE9yRXJyb3IpID0+IHtcclxuICAgIERvdE5ldC5qc0NhbGxEaXNwYXRjaGVyLmVuZEludm9rZURvdE5ldEZyb21KUyhjYWxsSWQsIHN1Y2Nlc3MsIHJlc3VsdE9yRXJyb3IpO1xyXG4gIH0pO1xyXG5cclxuICBpcGMub24oJ0pTLlJlbmRlckJhdGNoJywgKHJlbmRlcmVySWQsIGJhdGNoQmFzZTY0KSA9PiB7XHJcbiAgICB2YXIgYmF0Y2hEYXRhID0gbmV3IFVpbnQ4QXJyYXkoZGVjb2RlKGJhdGNoQmFzZTY0KSk7XHJcbiAgICByZW5kZXJCYXRjaChyZW5kZXJlcklkLCBuZXcgT3V0T2ZQcm9jZXNzUmVuZGVyQmF0Y2goYmF0Y2hEYXRhKSk7XHJcbiAgfSk7XHJcblxyXG4gIGlwYy5vbignSlMuRXJyb3InLCAobWVzc2FnZSkgPT4ge1xyXG4gICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcclxuICB9KTtcclxuXHJcbiAgLy8gQ29uZmlybSB0aGF0IHRoZSBKUyBzaWRlIGlzIHJlYWR5IGZvciB0aGUgYXBwIHRvIHN0YXJ0XHJcbiAgaXBjLnNlbmQoJ2NvbXBvbmVudHM6aW5pdCcsIFtcclxuICAgIG5hdmlnYXRpb25NYW5hZ2VyRnVuY3Rpb25zLmdldExvY2F0aW9uSHJlZigpLnJlcGxhY2UoL1xcL2luZGV4XFwuaHRtbCQvLCAnJyksXHJcbiAgICBuYXZpZ2F0aW9uTWFuYWdlckZ1bmN0aW9ucy5nZXRCYXNlVVJJKCldKTtcclxufVxyXG5cclxuYm9vdCgpO1xyXG4iLCJpbnRlcmZhY2UgQ2FsbGJhY2sge1xyXG4gICAgKC4uLmFyZ3M6IGFueVtdKTogdm9pZDtcclxufVxyXG5cclxuY29uc3QgcmVnaXN0cmF0aW9ucyA9IHt9IGFzIHsgW2V2ZW50TmFtZTogc3RyaW5nXTogQ2FsbGJhY2tbXSB9O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9uKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogQ2FsbGJhY2spOiB2b2lkIHtcclxuICAgIGlmICghKGV2ZW50TmFtZSBpbiByZWdpc3RyYXRpb25zKSkge1xyXG4gICAgICAgIHJlZ2lzdHJhdGlvbnNbZXZlbnROYW1lXSA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdHJhdGlvbnNbZXZlbnROYW1lXS5wdXNoKGNhbGxiYWNrKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9mZihldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IENhbGxiYWNrKTogdm9pZCB7XHJcbiAgICBjb25zdCBncm91cCA9IHJlZ2lzdHJhdGlvbnNbZXZlbnROYW1lXTtcclxuICAgIGNvbnN0IGluZGV4ID0gZ3JvdXAuaW5kZXhPZihjYWxsYmFjayk7XHJcbiAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICAgIGdyb3VwLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvbmNlKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogQ2FsbGJhY2spOiB2b2lkIHtcclxuICAgIGNvbnN0IGNhbGxiYWNrT25jZTogQ2FsbGJhY2sgPSAoLi4uYXJnczogYW55W10pID0+IHtcclxuICAgICAgICBvZmYoZXZlbnROYW1lLCBjYWxsYmFja09uY2UpO1xyXG4gICAgICAgIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFyZ3MpO1xyXG4gICAgfTtcclxuXHJcbiAgICBvbihldmVudE5hbWUsIGNhbGxiYWNrT25jZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZW5kKGV2ZW50TmFtZTogc3RyaW5nLCBhcmdzOiBhbnkpOiB2b2lkIHtcclxuICAgICh3aW5kb3cgYXMgYW55KS5leHRlcm5hbC5zZW5kTWVzc2FnZShgaXBjOiR7ZXZlbnROYW1lfSAke0pTT04uc3RyaW5naWZ5KGFyZ3MpfWApO1xyXG59XHJcblxyXG4od2luZG93IGFzIGFueSkuZXh0ZXJuYWwucmVjZWl2ZU1lc3NhZ2UoKG1lc3NhZ2U6IHN0cmluZykgPT4ge1xyXG4gICAgY29uc3QgY29sb25Qb3MgPSBtZXNzYWdlLmluZGV4T2YoJzonKTtcclxuICAgIGNvbnN0IGV2ZW50TmFtZSA9IG1lc3NhZ2Uuc3Vic3RyaW5nKDAsIGNvbG9uUG9zKTtcclxuICAgIGNvbnN0IGFyZ3NKc29uID0gbWVzc2FnZS5zdWJzdHIoY29sb25Qb3MgKyAxKTtcclxuXHJcbiAgICBjb25zdCBncm91cCA9IHJlZ2lzdHJhdGlvbnNbZXZlbnROYW1lXTtcclxuICAgIGlmIChncm91cCkge1xyXG4gICAgICAgIGNvbnN0IGFyZ3M6IGFueVtdID0gSlNPTi5wYXJzZShhcmdzSnNvbik7XHJcbiAgICAgICAgZ3JvdXAuZm9yRWFjaChjYWxsYmFjayA9PiBjYWxsYmFjay5hcHBseShudWxsLCBhcmdzKSk7XHJcbiAgICB9XHJcbn0pO1xyXG4iLCIvLyBFeHBvc2UgYW4gZXhwb3J0IGNhbGxlZCAncGxhdGZvcm0nIG9mIHRoZSBpbnRlcmZhY2UgdHlwZSAnUGxhdGZvcm0nLFxyXG4vLyBzbyB0aGF0IGNvbnN1bWVycyBjYW4gYmUgYWdub3N0aWMgYWJvdXQgd2hpY2ggaW1wbGVtZW50YXRpb24gdGhleSB1c2UuXHJcbi8vIEJhc2ljIGFsdGVybmF0aXZlIHRvIGhhdmluZyBhbiBhY3R1YWwgREkgY29udGFpbmVyLlxyXG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJy4vUGxhdGZvcm0vUGxhdGZvcm0nO1xyXG5cclxuZXhwb3J0IGxldCBwbGF0Zm9ybTogUGxhdGZvcm07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0UGxhdGZvcm0ocGxhdGZvcm1JbnN0YW5jZTogUGxhdGZvcm0pIHtcclxuICBwbGF0Zm9ybSA9IHBsYXRmb3JtSW5zdGFuY2U7XHJcbiAgcmV0dXJuIHBsYXRmb3JtO1xyXG59XHJcbiIsImltcG9ydCB7IG5hdmlnYXRlVG8sIGludGVybmFsRnVuY3Rpb25zIGFzIG5hdmlnYXRpb25NYW5hZ2VySW50ZXJuYWxGdW5jdGlvbnMgfSBmcm9tICcuL1NlcnZpY2VzL05hdmlnYXRpb25NYW5hZ2VyJztcclxuaW1wb3J0IHsgYXR0YWNoUm9vdENvbXBvbmVudFRvRWxlbWVudCB9IGZyb20gJy4vUmVuZGVyaW5nL1JlbmRlcmVyJztcclxuXHJcbi8vIE1ha2UgdGhlIGZvbGxvd2luZyBBUElzIGF2YWlsYWJsZSBpbiBnbG9iYWwgc2NvcGUgZm9yIGludm9jYXRpb24gZnJvbSBKU1xyXG53aW5kb3dbJ0JsYXpvciddID0ge1xyXG4gIG5hdmlnYXRlVG8sXHJcblxyXG4gIF9pbnRlcm5hbDoge1xyXG4gICAgYXR0YWNoUm9vdENvbXBvbmVudFRvRWxlbWVudCxcclxuICAgIG5hdmlnYXRpb25NYW5hZ2VyOiBuYXZpZ2F0aW9uTWFuYWdlckludGVybmFsRnVuY3Rpb25zLFxyXG4gIH0sXHJcbn07XHJcbiIsImltcG9ydCB7IFJlbmRlckJhdGNoLCBBcnJheUJ1aWxkZXJTZWdtZW50LCBSZW5kZXJUcmVlRWRpdCwgUmVuZGVyVHJlZUZyYW1lLCBFZGl0VHlwZSwgRnJhbWVUeXBlLCBBcnJheVZhbHVlcyB9IGZyb20gJy4vUmVuZGVyQmF0Y2gvUmVuZGVyQmF0Y2gnO1xyXG5pbXBvcnQgeyBFdmVudERlbGVnYXRvciB9IGZyb20gJy4vRXZlbnREZWxlZ2F0b3InO1xyXG5pbXBvcnQgeyBFdmVudEZvckRvdE5ldCwgVUlFdmVudEFyZ3MsIEV2ZW50QXJnc1R5cGUgfSBmcm9tICcuL0V2ZW50Rm9yRG90TmV0JztcclxuaW1wb3J0IHsgTG9naWNhbEVsZW1lbnQsIFBlcm11dGF0aW9uTGlzdEVudHJ5LCB0b0xvZ2ljYWxFbGVtZW50LCBpbnNlcnRMb2dpY2FsQ2hpbGQsIHJlbW92ZUxvZ2ljYWxDaGlsZCwgZ2V0TG9naWNhbFBhcmVudCwgZ2V0TG9naWNhbENoaWxkLCBjcmVhdGVBbmRJbnNlcnRMb2dpY2FsQ29udGFpbmVyLCBpc1N2Z0VsZW1lbnQsIGdldExvZ2ljYWxDaGlsZHJlbkFycmF5LCBnZXRMb2dpY2FsU2libGluZ0VuZCwgcGVybXV0ZUxvZ2ljYWxDaGlsZHJlbiwgZ2V0Q2xvc2VzdERvbUVsZW1lbnQgfSBmcm9tICcuL0xvZ2ljYWxFbGVtZW50cyc7XHJcbmltcG9ydCB7IGFwcGx5Q2FwdHVyZUlkVG9FbGVtZW50IH0gZnJvbSAnLi9FbGVtZW50UmVmZXJlbmNlQ2FwdHVyZSc7XHJcbmltcG9ydCB7IEV2ZW50RmllbGRJbmZvIH0gZnJvbSAnLi9FdmVudEZpZWxkSW5mbyc7XHJcbmltcG9ydCB7IGRpc3BhdGNoRXZlbnQgfSBmcm9tICcuL1JlbmRlcmVyRXZlbnREaXNwYXRjaGVyJztcclxuaW1wb3J0IHsgYXR0YWNoVG9FdmVudERlbGVnYXRvciBhcyBhdHRhY2hOYXZpZ2F0aW9uTWFuYWdlclRvRXZlbnREZWxlZ2F0b3IgfSBmcm9tICcuLi9TZXJ2aWNlcy9OYXZpZ2F0aW9uTWFuYWdlcic7XHJcbmNvbnN0IHNlbGVjdFZhbHVlUHJvcG5hbWUgPSAnX2JsYXpvclNlbGVjdFZhbHVlJztcclxuY29uc3Qgc2hhcmVkVGVtcGxhdGVFbGVtRm9yUGFyc2luZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XHJcbmNvbnN0IHNoYXJlZFN2Z0VsZW1Gb3JQYXJzaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdnJyk7XHJcbmNvbnN0IHByZXZlbnREZWZhdWx0RXZlbnRzOiB7IFtldmVudFR5cGU6IHN0cmluZ106IGJvb2xlYW4gfSA9IHsgc3VibWl0OiB0cnVlIH07XHJcbmNvbnN0IHJvb3RDb21wb25lbnRzUGVuZGluZ0ZpcnN0UmVuZGVyOiB7IFtjb21wb25lbnRJZDogbnVtYmVyXTogTG9naWNhbEVsZW1lbnQgfSA9IHt9O1xyXG5jb25zdCBpbnRlcm5hbEF0dHJpYnV0ZU5hbWVQcmVmaXggPSAnX19pbnRlcm5hbF8nO1xyXG5jb25zdCBldmVudFByZXZlbnREZWZhdWx0QXR0cmlidXRlTmFtZVByZWZpeCA9ICdwcmV2ZW50RGVmYXVsdF8nO1xyXG5jb25zdCBldmVudFN0b3BQcm9wYWdhdGlvbkF0dHJpYnV0ZU5hbWVQcmVmaXggPSAnc3RvcFByb3BhZ2F0aW9uXyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQnJvd3NlclJlbmRlcmVyIHtcclxuICBwcml2YXRlIGV2ZW50RGVsZWdhdG9yOiBFdmVudERlbGVnYXRvcjtcclxuXHJcbiAgcHJpdmF0ZSBjaGlsZENvbXBvbmVudExvY2F0aW9uczogeyBbY29tcG9uZW50SWQ6IG51bWJlcl06IExvZ2ljYWxFbGVtZW50IH0gPSB7fTtcclxuXHJcbiAgcHJpdmF0ZSBicm93c2VyUmVuZGVyZXJJZDogbnVtYmVyO1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IoYnJvd3NlclJlbmRlcmVySWQ6IG51bWJlcikge1xyXG4gICAgdGhpcy5icm93c2VyUmVuZGVyZXJJZCA9IGJyb3dzZXJSZW5kZXJlcklkO1xyXG4gICAgdGhpcy5ldmVudERlbGVnYXRvciA9IG5ldyBFdmVudERlbGVnYXRvcigoZXZlbnQsIGV2ZW50SGFuZGxlcklkLCBldmVudEFyZ3MsIGV2ZW50RmllbGRJbmZvKSA9PiB7XHJcbiAgICAgIHJhaXNlRXZlbnQoZXZlbnQsIHRoaXMuYnJvd3NlclJlbmRlcmVySWQsIGV2ZW50SGFuZGxlcklkLCBldmVudEFyZ3MsIGV2ZW50RmllbGRJbmZvKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFdlIGRvbid0IHlldCBrbm93IHdoZXRoZXIgb3Igbm90IG5hdmlnYXRpb24gaW50ZXJjZXB0aW9uIHdpbGwgYmUgZW5hYmxlZCwgYnV0IGluIGNhc2UgaXQgd2lsbCBiZSxcclxuICAgIC8vIHdlIHdpcmUgdXAgdGhlIG5hdmlnYXRpb24gbWFuYWdlciB0byB0aGUgZXZlbnQgZGVsZWdhdG9yIHNvIGl0IGhhcyB0aGUgb3B0aW9uIHRvIHBhcnRpY2lwYXRlXHJcbiAgICAvLyBpbiB0aGUgc3ludGhldGljIGV2ZW50IGJ1YmJsaW5nIHByb2Nlc3MgbGF0ZXJcclxuICAgIGF0dGFjaE5hdmlnYXRpb25NYW5hZ2VyVG9FdmVudERlbGVnYXRvcih0aGlzLmV2ZW50RGVsZWdhdG9yKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhdHRhY2hSb290Q29tcG9uZW50VG9Mb2dpY2FsRWxlbWVudChjb21wb25lbnRJZDogbnVtYmVyLCBlbGVtZW50OiBMb2dpY2FsRWxlbWVudCk6IHZvaWQge1xyXG4gICAgdGhpcy5hdHRhY2hDb21wb25lbnRUb0VsZW1lbnQoY29tcG9uZW50SWQsIGVsZW1lbnQpO1xyXG4gICAgcm9vdENvbXBvbmVudHNQZW5kaW5nRmlyc3RSZW5kZXJbY29tcG9uZW50SWRdID0gZWxlbWVudDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1cGRhdGVDb21wb25lbnQoYmF0Y2g6IFJlbmRlckJhdGNoLCBjb21wb25lbnRJZDogbnVtYmVyLCBlZGl0czogQXJyYXlCdWlsZGVyU2VnbWVudDxSZW5kZXJUcmVlRWRpdD4sIHJlZmVyZW5jZUZyYW1lczogQXJyYXlWYWx1ZXM8UmVuZGVyVHJlZUZyYW1lPik6IHZvaWQge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IHRoaXMuY2hpbGRDb21wb25lbnRMb2NhdGlvbnNbY29tcG9uZW50SWRdO1xyXG4gICAgaWYgKCFlbGVtZW50KSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gZWxlbWVudCBpcyBjdXJyZW50bHkgYXNzb2NpYXRlZCB3aXRoIGNvbXBvbmVudCAke2NvbXBvbmVudElkfWApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE9uIHRoZSBmaXJzdCByZW5kZXIgZm9yIGVhY2ggcm9vdCBjb21wb25lbnQsIGNsZWFyIGFueSBleGlzdGluZyBjb250ZW50IChlLmcuLCBwcmVyZW5kZXJlZClcclxuICAgIGNvbnN0IHJvb3RFbGVtZW50VG9DbGVhciA9IHJvb3RDb21wb25lbnRzUGVuZGluZ0ZpcnN0UmVuZGVyW2NvbXBvbmVudElkXTtcclxuICAgIGlmIChyb290RWxlbWVudFRvQ2xlYXIpIHtcclxuICAgICAgY29uc3Qgcm9vdEVsZW1lbnRUb0NsZWFyRW5kID0gZ2V0TG9naWNhbFNpYmxpbmdFbmQocm9vdEVsZW1lbnRUb0NsZWFyKTtcclxuICAgICAgZGVsZXRlIHJvb3RDb21wb25lbnRzUGVuZGluZ0ZpcnN0UmVuZGVyW2NvbXBvbmVudElkXTtcclxuXHJcbiAgICAgIGlmICghcm9vdEVsZW1lbnRUb0NsZWFyRW5kKSB7XHJcbiAgICAgICAgY2xlYXJFbGVtZW50KHJvb3RFbGVtZW50VG9DbGVhciBhcyB1bmtub3duIGFzIEVsZW1lbnQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNsZWFyQmV0d2Vlbihyb290RWxlbWVudFRvQ2xlYXIgYXMgdW5rbm93biBhcyBOb2RlLCByb290RWxlbWVudFRvQ2xlYXJFbmQgYXMgdW5rbm93biBhcyBDb21tZW50KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG93bmVyRG9jdW1lbnQgPSBnZXRDbG9zZXN0RG9tRWxlbWVudChlbGVtZW50KS5vd25lckRvY3VtZW50O1xyXG4gICAgY29uc3QgYWN0aXZlRWxlbWVudEJlZm9yZSA9IG93bmVyRG9jdW1lbnQgJiYgb3duZXJEb2N1bWVudC5hY3RpdmVFbGVtZW50O1xyXG5cclxuICAgIHRoaXMuYXBwbHlFZGl0cyhiYXRjaCwgY29tcG9uZW50SWQsIGVsZW1lbnQsIDAsIGVkaXRzLCByZWZlcmVuY2VGcmFtZXMpO1xyXG5cclxuICAgIC8vIFRyeSB0byByZXN0b3JlIGZvY3VzIGluIGNhc2UgaXQgd2FzIGxvc3QgZHVlIHRvIGFuIGVsZW1lbnQgbW92ZVxyXG4gICAgaWYgKChhY3RpdmVFbGVtZW50QmVmb3JlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpICYmIG93bmVyRG9jdW1lbnQgJiYgb3duZXJEb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBhY3RpdmVFbGVtZW50QmVmb3JlKSB7XHJcbiAgICAgIGFjdGl2ZUVsZW1lbnRCZWZvcmUuZm9jdXMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBkaXNwb3NlQ29tcG9uZW50KGNvbXBvbmVudElkOiBudW1iZXIpIHtcclxuICAgIGRlbGV0ZSB0aGlzLmNoaWxkQ29tcG9uZW50TG9jYXRpb25zW2NvbXBvbmVudElkXTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkaXNwb3NlRXZlbnRIYW5kbGVyKGV2ZW50SGFuZGxlcklkOiBudW1iZXIpIHtcclxuICAgIHRoaXMuZXZlbnREZWxlZ2F0b3IucmVtb3ZlTGlzdGVuZXIoZXZlbnRIYW5kbGVySWQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhdHRhY2hDb21wb25lbnRUb0VsZW1lbnQoY29tcG9uZW50SWQ6IG51bWJlciwgZWxlbWVudDogTG9naWNhbEVsZW1lbnQpIHtcclxuICAgIHRoaXMuY2hpbGRDb21wb25lbnRMb2NhdGlvbnNbY29tcG9uZW50SWRdID0gZWxlbWVudDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXBwbHlFZGl0cyhiYXRjaDogUmVuZGVyQmF0Y2gsIGNvbXBvbmVudElkOiBudW1iZXIsIHBhcmVudDogTG9naWNhbEVsZW1lbnQsIGNoaWxkSW5kZXg6IG51bWJlciwgZWRpdHM6IEFycmF5QnVpbGRlclNlZ21lbnQ8UmVuZGVyVHJlZUVkaXQ+LCByZWZlcmVuY2VGcmFtZXM6IEFycmF5VmFsdWVzPFJlbmRlclRyZWVGcmFtZT4pIHtcclxuICAgIGxldCBjdXJyZW50RGVwdGggPSAwO1xyXG4gICAgbGV0IGNoaWxkSW5kZXhBdEN1cnJlbnREZXB0aCA9IGNoaWxkSW5kZXg7XHJcbiAgICBsZXQgcGVybXV0YXRpb25MaXN0OiBQZXJtdXRhdGlvbkxpc3RFbnRyeVtdIHwgdW5kZWZpbmVkO1xyXG5cclxuICAgIGNvbnN0IGFycmF5QnVpbGRlclNlZ21lbnRSZWFkZXIgPSBiYXRjaC5hcnJheUJ1aWxkZXJTZWdtZW50UmVhZGVyO1xyXG4gICAgY29uc3QgZWRpdFJlYWRlciA9IGJhdGNoLmVkaXRSZWFkZXI7XHJcbiAgICBjb25zdCBmcmFtZVJlYWRlciA9IGJhdGNoLmZyYW1lUmVhZGVyO1xyXG4gICAgY29uc3QgZWRpdHNWYWx1ZXMgPSBhcnJheUJ1aWxkZXJTZWdtZW50UmVhZGVyLnZhbHVlcyhlZGl0cyk7XHJcbiAgICBjb25zdCBlZGl0c09mZnNldCA9IGFycmF5QnVpbGRlclNlZ21lbnRSZWFkZXIub2Zmc2V0KGVkaXRzKTtcclxuICAgIGNvbnN0IGVkaXRzTGVuZ3RoID0gYXJyYXlCdWlsZGVyU2VnbWVudFJlYWRlci5jb3VudChlZGl0cyk7XHJcbiAgICBjb25zdCBtYXhFZGl0SW5kZXhFeGNsID0gZWRpdHNPZmZzZXQgKyBlZGl0c0xlbmd0aDtcclxuXHJcbiAgICBmb3IgKGxldCBlZGl0SW5kZXggPSBlZGl0c09mZnNldDsgZWRpdEluZGV4IDwgbWF4RWRpdEluZGV4RXhjbDsgZWRpdEluZGV4KyspIHtcclxuICAgICAgY29uc3QgZWRpdCA9IGJhdGNoLmRpZmZSZWFkZXIuZWRpdHNFbnRyeShlZGl0c1ZhbHVlcywgZWRpdEluZGV4KTtcclxuICAgICAgY29uc3QgZWRpdFR5cGUgPSBlZGl0UmVhZGVyLmVkaXRUeXBlKGVkaXQpO1xyXG4gICAgICBzd2l0Y2ggKGVkaXRUeXBlKSB7XHJcbiAgICAgICAgY2FzZSBFZGl0VHlwZS5wcmVwZW5kRnJhbWU6IHtcclxuICAgICAgICAgIGNvbnN0IGZyYW1lSW5kZXggPSBlZGl0UmVhZGVyLm5ld1RyZWVJbmRleChlZGl0KTtcclxuICAgICAgICAgIGNvbnN0IGZyYW1lID0gYmF0Y2gucmVmZXJlbmNlRnJhbWVzRW50cnkocmVmZXJlbmNlRnJhbWVzLCBmcmFtZUluZGV4KTtcclxuICAgICAgICAgIGNvbnN0IHNpYmxpbmdJbmRleCA9IGVkaXRSZWFkZXIuc2libGluZ0luZGV4KGVkaXQpO1xyXG4gICAgICAgICAgdGhpcy5pbnNlcnRGcmFtZShiYXRjaCwgY29tcG9uZW50SWQsIHBhcmVudCwgY2hpbGRJbmRleEF0Q3VycmVudERlcHRoICsgc2libGluZ0luZGV4LCByZWZlcmVuY2VGcmFtZXMsIGZyYW1lLCBmcmFtZUluZGV4KTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlIEVkaXRUeXBlLnJlbW92ZUZyYW1lOiB7XHJcbiAgICAgICAgICBjb25zdCBzaWJsaW5nSW5kZXggPSBlZGl0UmVhZGVyLnNpYmxpbmdJbmRleChlZGl0KTtcclxuICAgICAgICAgIHJlbW92ZUxvZ2ljYWxDaGlsZChwYXJlbnQsIGNoaWxkSW5kZXhBdEN1cnJlbnREZXB0aCArIHNpYmxpbmdJbmRleCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSBFZGl0VHlwZS5zZXRBdHRyaWJ1dGU6IHtcclxuICAgICAgICAgIGNvbnN0IGZyYW1lSW5kZXggPSBlZGl0UmVhZGVyLm5ld1RyZWVJbmRleChlZGl0KTtcclxuICAgICAgICAgIGNvbnN0IGZyYW1lID0gYmF0Y2gucmVmZXJlbmNlRnJhbWVzRW50cnkocmVmZXJlbmNlRnJhbWVzLCBmcmFtZUluZGV4KTtcclxuICAgICAgICAgIGNvbnN0IHNpYmxpbmdJbmRleCA9IGVkaXRSZWFkZXIuc2libGluZ0luZGV4KGVkaXQpO1xyXG4gICAgICAgICAgY29uc3QgZWxlbWVudCA9IGdldExvZ2ljYWxDaGlsZChwYXJlbnQsIGNoaWxkSW5kZXhBdEN1cnJlbnREZXB0aCArIHNpYmxpbmdJbmRleCk7XHJcbiAgICAgICAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5hcHBseUF0dHJpYnV0ZShiYXRjaCwgY29tcG9uZW50SWQsIGVsZW1lbnQsIGZyYW1lKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHNldCBhdHRyaWJ1dGUgb24gbm9uLWVsZW1lbnQgY2hpbGQnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlIEVkaXRUeXBlLnJlbW92ZUF0dHJpYnV0ZToge1xyXG4gICAgICAgICAgLy8gTm90ZSB0aGF0IHdlIGRvbid0IGhhdmUgdG8gZGlzcG9zZSB0aGUgaW5mbyB3ZSB0cmFjayBhYm91dCBldmVudCBoYW5kbGVycyBoZXJlLCBiZWNhdXNlIHRoZVxyXG4gICAgICAgICAgLy8gZGlzcG9zZWQgZXZlbnQgaGFuZGxlciBJRHMgYXJlIGRlbGl2ZXJlZCBzZXBhcmF0ZWx5IChpbiB0aGUgJ2Rpc3Bvc2VkRXZlbnRIYW5kbGVySWRzJyBhcnJheSlcclxuICAgICAgICAgIGNvbnN0IHNpYmxpbmdJbmRleCA9IGVkaXRSZWFkZXIuc2libGluZ0luZGV4KGVkaXQpO1xyXG4gICAgICAgICAgY29uc3QgZWxlbWVudCA9IGdldExvZ2ljYWxDaGlsZChwYXJlbnQsIGNoaWxkSW5kZXhBdEN1cnJlbnREZXB0aCArIHNpYmxpbmdJbmRleCk7XHJcbiAgICAgICAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZU5hbWUgPSBlZGl0UmVhZGVyLnJlbW92ZWRBdHRyaWJ1dGVOYW1lKGVkaXQpITtcclxuICAgICAgICAgICAgLy8gRmlyc3QgdHJ5IHRvIHJlbW92ZSBhbnkgc3BlY2lhbCBwcm9wZXJ0eSB3ZSB1c2UgZm9yIHRoaXMgYXR0cmlidXRlXHJcbiAgICAgICAgICAgIGlmICghdGhpcy50cnlBcHBseVNwZWNpYWxQcm9wZXJ0eShiYXRjaCwgZWxlbWVudCwgYXR0cmlidXRlTmFtZSwgbnVsbCkpIHtcclxuICAgICAgICAgICAgICAvLyBJZiB0aGF0J3Mgbm90IGFwcGxpY2FibGUsIGl0J3MgYSByZWd1bGFyIERPTSBhdHRyaWJ1dGUgc28gcmVtb3ZlIHRoYXRcclxuICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgcmVtb3ZlIGF0dHJpYnV0ZSBmcm9tIG5vbi1lbGVtZW50IGNoaWxkJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSBFZGl0VHlwZS51cGRhdGVUZXh0OiB7XHJcbiAgICAgICAgICBjb25zdCBmcmFtZUluZGV4ID0gZWRpdFJlYWRlci5uZXdUcmVlSW5kZXgoZWRpdCk7XHJcbiAgICAgICAgICBjb25zdCBmcmFtZSA9IGJhdGNoLnJlZmVyZW5jZUZyYW1lc0VudHJ5KHJlZmVyZW5jZUZyYW1lcywgZnJhbWVJbmRleCk7XHJcbiAgICAgICAgICBjb25zdCBzaWJsaW5nSW5kZXggPSBlZGl0UmVhZGVyLnNpYmxpbmdJbmRleChlZGl0KTtcclxuICAgICAgICAgIGNvbnN0IHRleHROb2RlID0gZ2V0TG9naWNhbENoaWxkKHBhcmVudCwgY2hpbGRJbmRleEF0Q3VycmVudERlcHRoICsgc2libGluZ0luZGV4KTtcclxuICAgICAgICAgIGlmICh0ZXh0Tm9kZSBpbnN0YW5jZW9mIFRleHQpIHtcclxuICAgICAgICAgICAgdGV4dE5vZGUudGV4dENvbnRlbnQgPSBmcmFtZVJlYWRlci50ZXh0Q29udGVudChmcmFtZSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBzZXQgdGV4dCBjb250ZW50IG9uIG5vbi10ZXh0IGNoaWxkJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSBFZGl0VHlwZS51cGRhdGVNYXJrdXA6IHtcclxuICAgICAgICAgIGNvbnN0IGZyYW1lSW5kZXggPSBlZGl0UmVhZGVyLm5ld1RyZWVJbmRleChlZGl0KTtcclxuICAgICAgICAgIGNvbnN0IGZyYW1lID0gYmF0Y2gucmVmZXJlbmNlRnJhbWVzRW50cnkocmVmZXJlbmNlRnJhbWVzLCBmcmFtZUluZGV4KTtcclxuICAgICAgICAgIGNvbnN0IHNpYmxpbmdJbmRleCA9IGVkaXRSZWFkZXIuc2libGluZ0luZGV4KGVkaXQpO1xyXG4gICAgICAgICAgcmVtb3ZlTG9naWNhbENoaWxkKHBhcmVudCwgY2hpbGRJbmRleEF0Q3VycmVudERlcHRoICsgc2libGluZ0luZGV4KTtcclxuICAgICAgICAgIHRoaXMuaW5zZXJ0TWFya3VwKGJhdGNoLCBwYXJlbnQsIGNoaWxkSW5kZXhBdEN1cnJlbnREZXB0aCArIHNpYmxpbmdJbmRleCwgZnJhbWUpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgRWRpdFR5cGUuc3RlcEluOiB7XHJcbiAgICAgICAgICBjb25zdCBzaWJsaW5nSW5kZXggPSBlZGl0UmVhZGVyLnNpYmxpbmdJbmRleChlZGl0KTtcclxuICAgICAgICAgIHBhcmVudCA9IGdldExvZ2ljYWxDaGlsZChwYXJlbnQsIGNoaWxkSW5kZXhBdEN1cnJlbnREZXB0aCArIHNpYmxpbmdJbmRleCk7XHJcbiAgICAgICAgICBjdXJyZW50RGVwdGgrKztcclxuICAgICAgICAgIGNoaWxkSW5kZXhBdEN1cnJlbnREZXB0aCA9IDA7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSBFZGl0VHlwZS5zdGVwT3V0OiB7XHJcbiAgICAgICAgICBwYXJlbnQgPSBnZXRMb2dpY2FsUGFyZW50KHBhcmVudCkhO1xyXG4gICAgICAgICAgY3VycmVudERlcHRoLS07XHJcbiAgICAgICAgICBjaGlsZEluZGV4QXRDdXJyZW50RGVwdGggPSBjdXJyZW50RGVwdGggPT09IDAgPyBjaGlsZEluZGV4IDogMDsgLy8gVGhlIGNoaWxkSW5kZXggaXMgb25seSBldmVyIG5vbnplcm8gYXQgemVybyBkZXB0aFxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgRWRpdFR5cGUucGVybXV0YXRpb25MaXN0RW50cnk6IHtcclxuICAgICAgICAgIHBlcm11dGF0aW9uTGlzdCA9IHBlcm11dGF0aW9uTGlzdCB8fCBbXTtcclxuICAgICAgICAgIHBlcm11dGF0aW9uTGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgZnJvbVNpYmxpbmdJbmRleDogY2hpbGRJbmRleEF0Q3VycmVudERlcHRoICsgZWRpdFJlYWRlci5zaWJsaW5nSW5kZXgoZWRpdCksXHJcbiAgICAgICAgICAgIHRvU2libGluZ0luZGV4OiBjaGlsZEluZGV4QXRDdXJyZW50RGVwdGggKyBlZGl0UmVhZGVyLm1vdmVUb1NpYmxpbmdJbmRleChlZGl0KSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgRWRpdFR5cGUucGVybXV0YXRpb25MaXN0RW5kOiB7XHJcbiAgICAgICAgICBwZXJtdXRlTG9naWNhbENoaWxkcmVuKHBhcmVudCwgcGVybXV0YXRpb25MaXN0ISk7XHJcbiAgICAgICAgICBwZXJtdXRhdGlvbkxpc3QgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgY29uc3QgdW5rbm93blR5cGU6IG5ldmVyID0gZWRpdFR5cGU7IC8vIENvbXBpbGUtdGltZSB2ZXJpZmljYXRpb24gdGhhdCB0aGUgc3dpdGNoIHdhcyBleGhhdXN0aXZlXHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gZWRpdCB0eXBlOiAke3Vua25vd25UeXBlfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbnNlcnRGcmFtZShiYXRjaDogUmVuZGVyQmF0Y2gsIGNvbXBvbmVudElkOiBudW1iZXIsIHBhcmVudDogTG9naWNhbEVsZW1lbnQsIGNoaWxkSW5kZXg6IG51bWJlciwgZnJhbWVzOiBBcnJheVZhbHVlczxSZW5kZXJUcmVlRnJhbWU+LCBmcmFtZTogUmVuZGVyVHJlZUZyYW1lLCBmcmFtZUluZGV4OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgY29uc3QgZnJhbWVSZWFkZXIgPSBiYXRjaC5mcmFtZVJlYWRlcjtcclxuICAgIGNvbnN0IGZyYW1lVHlwZSA9IGZyYW1lUmVhZGVyLmZyYW1lVHlwZShmcmFtZSk7XHJcbiAgICBzd2l0Y2ggKGZyYW1lVHlwZSkge1xyXG4gICAgICBjYXNlIEZyYW1lVHlwZS5lbGVtZW50OlxyXG4gICAgICAgIHRoaXMuaW5zZXJ0RWxlbWVudChiYXRjaCwgY29tcG9uZW50SWQsIHBhcmVudCwgY2hpbGRJbmRleCwgZnJhbWVzLCBmcmFtZSwgZnJhbWVJbmRleCk7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgIGNhc2UgRnJhbWVUeXBlLnRleHQ6XHJcbiAgICAgICAgdGhpcy5pbnNlcnRUZXh0KGJhdGNoLCBwYXJlbnQsIGNoaWxkSW5kZXgsIGZyYW1lKTtcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgICAgY2FzZSBGcmFtZVR5cGUuYXR0cmlidXRlOlxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQXR0cmlidXRlIGZyYW1lcyBzaG91bGQgb25seSBiZSBwcmVzZW50IGFzIGxlYWRpbmcgY2hpbGRyZW4gb2YgZWxlbWVudCBmcmFtZXMuJyk7XHJcbiAgICAgIGNhc2UgRnJhbWVUeXBlLmNvbXBvbmVudDpcclxuICAgICAgICB0aGlzLmluc2VydENvbXBvbmVudChiYXRjaCwgcGFyZW50LCBjaGlsZEluZGV4LCBmcmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgIGNhc2UgRnJhbWVUeXBlLnJlZ2lvbjpcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnNlcnRGcmFtZVJhbmdlKGJhdGNoLCBjb21wb25lbnRJZCwgcGFyZW50LCBjaGlsZEluZGV4LCBmcmFtZXMsIGZyYW1lSW5kZXggKyAxLCBmcmFtZUluZGV4ICsgZnJhbWVSZWFkZXIuc3VidHJlZUxlbmd0aChmcmFtZSkpO1xyXG4gICAgICBjYXNlIEZyYW1lVHlwZS5lbGVtZW50UmVmZXJlbmNlQ2FwdHVyZTpcclxuICAgICAgICBpZiAocGFyZW50IGluc3RhbmNlb2YgRWxlbWVudCkge1xyXG4gICAgICAgICAgYXBwbHlDYXB0dXJlSWRUb0VsZW1lbnQocGFyZW50LCBmcmFtZVJlYWRlci5lbGVtZW50UmVmZXJlbmNlQ2FwdHVyZUlkKGZyYW1lKSEpO1xyXG4gICAgICAgICAgcmV0dXJuIDA7IC8vIEEgXCJjYXB0dXJlXCIgaXMgYSBjaGlsZCBpbiB0aGUgZGlmZiwgYnV0IGhhcyBubyBub2RlIGluIHRoZSBET01cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWZlcmVuY2UgY2FwdHVyZSBmcmFtZXMgY2FuIG9ubHkgYmUgY2hpbGRyZW4gb2YgZWxlbWVudCBmcmFtZXMuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICBjYXNlIEZyYW1lVHlwZS5tYXJrdXA6XHJcbiAgICAgICAgdGhpcy5pbnNlcnRNYXJrdXAoYmF0Y2gsIHBhcmVudCwgY2hpbGRJbmRleCwgZnJhbWUpO1xyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvbnN0IHVua25vd25UeXBlOiBuZXZlciA9IGZyYW1lVHlwZTsgLy8gQ29tcGlsZS10aW1lIHZlcmlmaWNhdGlvbiB0aGF0IHRoZSBzd2l0Y2ggd2FzIGV4aGF1c3RpdmVcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gZnJhbWUgdHlwZTogJHt1bmtub3duVHlwZX1gKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5zZXJ0RWxlbWVudChiYXRjaDogUmVuZGVyQmF0Y2gsIGNvbXBvbmVudElkOiBudW1iZXIsIHBhcmVudDogTG9naWNhbEVsZW1lbnQsIGNoaWxkSW5kZXg6IG51bWJlciwgZnJhbWVzOiBBcnJheVZhbHVlczxSZW5kZXJUcmVlRnJhbWU+LCBmcmFtZTogUmVuZGVyVHJlZUZyYW1lLCBmcmFtZUluZGV4OiBudW1iZXIpIHtcclxuICAgIGNvbnN0IGZyYW1lUmVhZGVyID0gYmF0Y2guZnJhbWVSZWFkZXI7XHJcbiAgICBjb25zdCB0YWdOYW1lID0gZnJhbWVSZWFkZXIuZWxlbWVudE5hbWUoZnJhbWUpITtcclxuICAgIGNvbnN0IG5ld0RvbUVsZW1lbnRSYXcgPSB0YWdOYW1lID09PSAnc3ZnJyB8fCBpc1N2Z0VsZW1lbnQocGFyZW50KSA/XHJcbiAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCB0YWdOYW1lKSA6XHJcbiAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XHJcbiAgICBjb25zdCBuZXdFbGVtZW50ID0gdG9Mb2dpY2FsRWxlbWVudChuZXdEb21FbGVtZW50UmF3KTtcclxuICAgIGluc2VydExvZ2ljYWxDaGlsZChuZXdEb21FbGVtZW50UmF3LCBwYXJlbnQsIGNoaWxkSW5kZXgpO1xyXG5cclxuICAgIC8vIEFwcGx5IGF0dHJpYnV0ZXNcclxuICAgIGNvbnN0IGRlc2NlbmRhbnRzRW5kSW5kZXhFeGNsID0gZnJhbWVJbmRleCArIGZyYW1lUmVhZGVyLnN1YnRyZWVMZW5ndGgoZnJhbWUpO1xyXG4gICAgZm9yIChsZXQgZGVzY2VuZGFudEluZGV4ID0gZnJhbWVJbmRleCArIDE7IGRlc2NlbmRhbnRJbmRleCA8IGRlc2NlbmRhbnRzRW5kSW5kZXhFeGNsOyBkZXNjZW5kYW50SW5kZXgrKykge1xyXG4gICAgICBjb25zdCBkZXNjZW5kYW50RnJhbWUgPSBiYXRjaC5yZWZlcmVuY2VGcmFtZXNFbnRyeShmcmFtZXMsIGRlc2NlbmRhbnRJbmRleCk7XHJcbiAgICAgIGlmIChmcmFtZVJlYWRlci5mcmFtZVR5cGUoZGVzY2VuZGFudEZyYW1lKSA9PT0gRnJhbWVUeXBlLmF0dHJpYnV0ZSkge1xyXG4gICAgICAgIHRoaXMuYXBwbHlBdHRyaWJ1dGUoYmF0Y2gsIGNvbXBvbmVudElkLCBuZXdEb21FbGVtZW50UmF3LCBkZXNjZW5kYW50RnJhbWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIEFzIHNvb24gYXMgd2Ugc2VlIGEgbm9uLWF0dHJpYnV0ZSBjaGlsZCwgYWxsIHRoZSBzdWJzZXF1ZW50IGNoaWxkIGZyYW1lcyBhcmVcclxuICAgICAgICAvLyBub3QgYXR0cmlidXRlcywgc28gYmFpbCBvdXQgYW5kIGluc2VydCB0aGUgcmVtbmFudHMgcmVjdXJzaXZlbHlcclxuICAgICAgICB0aGlzLmluc2VydEZyYW1lUmFuZ2UoYmF0Y2gsIGNvbXBvbmVudElkLCBuZXdFbGVtZW50LCAwLCBmcmFtZXMsIGRlc2NlbmRhbnRJbmRleCwgZGVzY2VuZGFudHNFbmRJbmRleEV4Y2wpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gV2UgaGFuZGxlIHNldHRpbmcgJ3ZhbHVlJyBvbiBhIDxzZWxlY3Q+IGluIHR3byBkaWZmZXJlbnQgd2F5czpcclxuICAgIC8vIFsxXSBXaGVuIGluc2VydGluZyBhIGNvcnJlc3BvbmRpbmcgPG9wdGlvbj4sIGluIGNhc2UgeW91J3JlIGR5bmFtaWNhbGx5IGFkZGluZyBvcHRpb25zXHJcbiAgICAvLyBbMl0gQWZ0ZXIgd2UgZmluaXNoIGluc2VydGluZyB0aGUgPHNlbGVjdD4sIGluIGNhc2UgdGhlIGRlc2NlbmRhbnQgb3B0aW9ucyBhcmUgYmVpbmdcclxuICAgIC8vICAgICBhZGRlZCBhcyBhbiBvcGFxdWUgbWFya3VwIGJsb2NrIHJhdGhlciB0aGFuIGluZGl2aWR1YWxseVxyXG4gICAgLy8gUmlnaHQgaGVyZSB3ZSBpbXBsZW1lbnQgWzJdXHJcbiAgICBpZiAobmV3RG9tRWxlbWVudFJhdyBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50ICYmIHNlbGVjdFZhbHVlUHJvcG5hbWUgaW4gbmV3RG9tRWxlbWVudFJhdykge1xyXG4gICAgICBjb25zdCBzZWxlY3RWYWx1ZSA9IG5ld0RvbUVsZW1lbnRSYXdbc2VsZWN0VmFsdWVQcm9wbmFtZV07XHJcbiAgICAgIG5ld0RvbUVsZW1lbnRSYXcudmFsdWUgPSBzZWxlY3RWYWx1ZTtcclxuICAgICAgZGVsZXRlIG5ld0RvbUVsZW1lbnRSYXdbc2VsZWN0VmFsdWVQcm9wbmFtZV07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluc2VydENvbXBvbmVudChiYXRjaDogUmVuZGVyQmF0Y2gsIHBhcmVudDogTG9naWNhbEVsZW1lbnQsIGNoaWxkSW5kZXg6IG51bWJlciwgZnJhbWU6IFJlbmRlclRyZWVGcmFtZSkge1xyXG4gICAgY29uc3QgY29udGFpbmVyRWxlbWVudCA9IGNyZWF0ZUFuZEluc2VydExvZ2ljYWxDb250YWluZXIocGFyZW50LCBjaGlsZEluZGV4KTtcclxuXHJcbiAgICAvLyBBbGwgd2UgaGF2ZSB0byBkbyBpcyBhc3NvY2lhdGUgdGhlIGNoaWxkIGNvbXBvbmVudCBJRCB3aXRoIGl0cyBsb2NhdGlvbi4gV2UgZG9uJ3QgYWN0dWFsbHlcclxuICAgIC8vIGRvIGFueSByZW5kZXJpbmcgaGVyZSwgYmVjYXVzZSB0aGUgZGlmZiBmb3IgdGhlIGNoaWxkIHdpbGwgYXBwZWFyIGxhdGVyIGluIHRoZSByZW5kZXIgYmF0Y2guXHJcbiAgICBjb25zdCBjaGlsZENvbXBvbmVudElkID0gYmF0Y2guZnJhbWVSZWFkZXIuY29tcG9uZW50SWQoZnJhbWUpO1xyXG4gICAgdGhpcy5hdHRhY2hDb21wb25lbnRUb0VsZW1lbnQoY2hpbGRDb21wb25lbnRJZCwgY29udGFpbmVyRWxlbWVudCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluc2VydFRleHQoYmF0Y2g6IFJlbmRlckJhdGNoLCBwYXJlbnQ6IExvZ2ljYWxFbGVtZW50LCBjaGlsZEluZGV4OiBudW1iZXIsIHRleHRGcmFtZTogUmVuZGVyVHJlZUZyYW1lKSB7XHJcbiAgICBjb25zdCB0ZXh0Q29udGVudCA9IGJhdGNoLmZyYW1lUmVhZGVyLnRleHRDb250ZW50KHRleHRGcmFtZSkhO1xyXG4gICAgY29uc3QgbmV3VGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0Q29udGVudCk7XHJcbiAgICBpbnNlcnRMb2dpY2FsQ2hpbGQobmV3VGV4dE5vZGUsIHBhcmVudCwgY2hpbGRJbmRleCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluc2VydE1hcmt1cChiYXRjaDogUmVuZGVyQmF0Y2gsIHBhcmVudDogTG9naWNhbEVsZW1lbnQsIGNoaWxkSW5kZXg6IG51bWJlciwgbWFya3VwRnJhbWU6IFJlbmRlclRyZWVGcmFtZSkge1xyXG4gICAgY29uc3QgbWFya3VwQ29udGFpbmVyID0gY3JlYXRlQW5kSW5zZXJ0TG9naWNhbENvbnRhaW5lcihwYXJlbnQsIGNoaWxkSW5kZXgpO1xyXG5cclxuICAgIGNvbnN0IG1hcmt1cENvbnRlbnQgPSBiYXRjaC5mcmFtZVJlYWRlci5tYXJrdXBDb250ZW50KG1hcmt1cEZyYW1lKTtcclxuICAgIGNvbnN0IHBhcnNlZE1hcmt1cCA9IHBhcnNlTWFya3VwKG1hcmt1cENvbnRlbnQsIGlzU3ZnRWxlbWVudChwYXJlbnQpKTtcclxuICAgIGxldCBsb2dpY2FsU2libGluZ0luZGV4ID0gMDtcclxuICAgIHdoaWxlIChwYXJzZWRNYXJrdXAuZmlyc3RDaGlsZCkge1xyXG4gICAgICBpbnNlcnRMb2dpY2FsQ2hpbGQocGFyc2VkTWFya3VwLmZpcnN0Q2hpbGQsIG1hcmt1cENvbnRhaW5lciwgbG9naWNhbFNpYmxpbmdJbmRleCsrKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXBwbHlBdHRyaWJ1dGUoYmF0Y2g6IFJlbmRlckJhdGNoLCBjb21wb25lbnRJZDogbnVtYmVyLCB0b0RvbUVsZW1lbnQ6IEVsZW1lbnQsIGF0dHJpYnV0ZUZyYW1lOiBSZW5kZXJUcmVlRnJhbWUpIHtcclxuICAgIGNvbnN0IGZyYW1lUmVhZGVyID0gYmF0Y2guZnJhbWVSZWFkZXI7XHJcbiAgICBjb25zdCBhdHRyaWJ1dGVOYW1lID0gZnJhbWVSZWFkZXIuYXR0cmlidXRlTmFtZShhdHRyaWJ1dGVGcmFtZSkhO1xyXG4gICAgY29uc3QgZXZlbnRIYW5kbGVySWQgPSBmcmFtZVJlYWRlci5hdHRyaWJ1dGVFdmVudEhhbmRsZXJJZChhdHRyaWJ1dGVGcmFtZSk7XHJcblxyXG4gICAgaWYgKGV2ZW50SGFuZGxlcklkKSB7XHJcbiAgICAgIGNvbnN0IGV2ZW50TmFtZSA9IHN0cmlwT25QcmVmaXgoYXR0cmlidXRlTmFtZSk7XHJcbiAgICAgIHRoaXMuZXZlbnREZWxlZ2F0b3Iuc2V0TGlzdGVuZXIodG9Eb21FbGVtZW50LCBldmVudE5hbWUsIGV2ZW50SGFuZGxlcklkLCBjb21wb25lbnRJZCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGaXJzdCBzZWUgaWYgd2UgaGF2ZSBzcGVjaWFsIGhhbmRsaW5nIGZvciB0aGlzIGF0dHJpYnV0ZVxyXG4gICAgaWYgKCF0aGlzLnRyeUFwcGx5U3BlY2lhbFByb3BlcnR5KGJhdGNoLCB0b0RvbUVsZW1lbnQsIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZUZyYW1lKSkge1xyXG4gICAgICAvLyBJZiBub3QsIHRyZWF0IGl0IGFzIGEgcmVndWxhciBzdHJpbmctdmFsdWVkIGF0dHJpYnV0ZVxyXG4gICAgICB0b0RvbUVsZW1lbnQuc2V0QXR0cmlidXRlKFxyXG4gICAgICAgIGF0dHJpYnV0ZU5hbWUsXHJcbiAgICAgICAgZnJhbWVSZWFkZXIuYXR0cmlidXRlVmFsdWUoYXR0cmlidXRlRnJhbWUpIVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0cnlBcHBseVNwZWNpYWxQcm9wZXJ0eShiYXRjaDogUmVuZGVyQmF0Y2gsIGVsZW1lbnQ6IEVsZW1lbnQsIGF0dHJpYnV0ZU5hbWU6IHN0cmluZywgYXR0cmlidXRlRnJhbWU6IFJlbmRlclRyZWVGcmFtZSB8IG51bGwpIHtcclxuICAgIHN3aXRjaCAoYXR0cmlidXRlTmFtZSkge1xyXG4gICAgICBjYXNlICd2YWx1ZSc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJ5QXBwbHlWYWx1ZVByb3BlcnR5KGJhdGNoLCBlbGVtZW50LCBhdHRyaWJ1dGVGcmFtZSk7XHJcbiAgICAgIGNhc2UgJ2NoZWNrZWQnOlxyXG4gICAgICAgIHJldHVybiB0aGlzLnRyeUFwcGx5Q2hlY2tlZFByb3BlcnR5KGJhdGNoLCBlbGVtZW50LCBhdHRyaWJ1dGVGcmFtZSk7XHJcbiAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICBpZiAoYXR0cmlidXRlTmFtZS5zdGFydHNXaXRoKGludGVybmFsQXR0cmlidXRlTmFtZVByZWZpeCkpIHtcclxuICAgICAgICAgIHRoaXMuYXBwbHlJbnRlcm5hbEF0dHJpYnV0ZShiYXRjaCwgZWxlbWVudCwgYXR0cmlidXRlTmFtZS5zdWJzdHJpbmcoaW50ZXJuYWxBdHRyaWJ1dGVOYW1lUHJlZml4Lmxlbmd0aCksIGF0dHJpYnV0ZUZyYW1lKTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXBwbHlJbnRlcm5hbEF0dHJpYnV0ZShiYXRjaDogUmVuZGVyQmF0Y2gsIGVsZW1lbnQ6IEVsZW1lbnQsIGludGVybmFsQXR0cmlidXRlTmFtZTogc3RyaW5nLCBhdHRyaWJ1dGVGcmFtZTogUmVuZGVyVHJlZUZyYW1lIHwgbnVsbCkge1xyXG4gICAgY29uc3QgYXR0cmlidXRlVmFsdWUgPSBhdHRyaWJ1dGVGcmFtZSA/IGJhdGNoLmZyYW1lUmVhZGVyLmF0dHJpYnV0ZVZhbHVlKGF0dHJpYnV0ZUZyYW1lKSA6IG51bGw7XHJcblxyXG4gICAgaWYgKGludGVybmFsQXR0cmlidXRlTmFtZS5zdGFydHNXaXRoKGV2ZW50U3RvcFByb3BhZ2F0aW9uQXR0cmlidXRlTmFtZVByZWZpeCkpIHtcclxuICAgICAgLy8gU3RvcCBwcm9wYWdhdGlvblxyXG4gICAgICBjb25zdCBldmVudE5hbWUgPSBzdHJpcE9uUHJlZml4KGludGVybmFsQXR0cmlidXRlTmFtZS5zdWJzdHJpbmcoZXZlbnRTdG9wUHJvcGFnYXRpb25BdHRyaWJ1dGVOYW1lUHJlZml4Lmxlbmd0aCkpO1xyXG4gICAgICB0aGlzLmV2ZW50RGVsZWdhdG9yLnNldFN0b3BQcm9wYWdhdGlvbihlbGVtZW50LCBldmVudE5hbWUsIGF0dHJpYnV0ZVZhbHVlICE9PSBudWxsKTtcclxuICAgIH0gZWxzZSBpZiAoaW50ZXJuYWxBdHRyaWJ1dGVOYW1lLnN0YXJ0c1dpdGgoZXZlbnRQcmV2ZW50RGVmYXVsdEF0dHJpYnV0ZU5hbWVQcmVmaXgpKSB7XHJcbiAgICAgIC8vIFByZXZlbnQgZGVmYXVsdFxyXG4gICAgICBjb25zdCBldmVudE5hbWUgPSBzdHJpcE9uUHJlZml4KGludGVybmFsQXR0cmlidXRlTmFtZS5zdWJzdHJpbmcoZXZlbnRQcmV2ZW50RGVmYXVsdEF0dHJpYnV0ZU5hbWVQcmVmaXgubGVuZ3RoKSk7XHJcbiAgICAgIHRoaXMuZXZlbnREZWxlZ2F0b3Iuc2V0UHJldmVudERlZmF1bHQoZWxlbWVudCwgZXZlbnROYW1lLCBhdHRyaWJ1dGVWYWx1ZSAhPT0gbnVsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBUaGUgcHJlZml4IG1ha2VzIHRoaXMgYXR0cmlidXRlIG5hbWUgcmVzZXJ2ZWQsIHNvIGFueSBvdGhlciB1c2FnZSBpcyBkaXNhbGxvd2VkXHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgaW50ZXJuYWwgYXR0cmlidXRlICcke2ludGVybmFsQXR0cmlidXRlTmFtZX0nYCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRyeUFwcGx5VmFsdWVQcm9wZXJ0eShiYXRjaDogUmVuZGVyQmF0Y2gsIGVsZW1lbnQ6IEVsZW1lbnQsIGF0dHJpYnV0ZUZyYW1lOiBSZW5kZXJUcmVlRnJhbWUgfCBudWxsKTogYm9vbGVhbiB7XHJcbiAgICAvLyBDZXJ0YWluIGVsZW1lbnRzIGhhdmUgYnVpbHQtaW4gYmVoYXZpb3VyIGZvciB0aGVpciAndmFsdWUnIHByb3BlcnR5XHJcbiAgICBjb25zdCBmcmFtZVJlYWRlciA9IGJhdGNoLmZyYW1lUmVhZGVyO1xyXG5cclxuICAgIGlmIChlbGVtZW50LnRhZ05hbWUgPT09ICdJTlBVVCcgJiYgZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKSA9PT0gJ3RpbWUnICYmICFlbGVtZW50LmdldEF0dHJpYnV0ZSgnc3RlcCcpKSB7XHJcbiAgICAgIGNvbnN0IHRpbWVWYWx1ZSA9IGF0dHJpYnV0ZUZyYW1lID8gZnJhbWVSZWFkZXIuYXR0cmlidXRlVmFsdWUoYXR0cmlidXRlRnJhbWUpIDogbnVsbDtcclxuICAgICAgaWYgKHRpbWVWYWx1ZSkge1xyXG4gICAgICAgIGVsZW1lbnRbJ3ZhbHVlJ10gPSB0aW1lVmFsdWUuc3Vic3RyaW5nKDAsIDUpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3dpdGNoIChlbGVtZW50LnRhZ05hbWUpIHtcclxuICAgICAgY2FzZSAnSU5QVVQnOlxyXG4gICAgICBjYXNlICdTRUxFQ1QnOlxyXG4gICAgICBjYXNlICdURVhUQVJFQSc6IHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IGF0dHJpYnV0ZUZyYW1lID8gZnJhbWVSZWFkZXIuYXR0cmlidXRlVmFsdWUoYXR0cmlidXRlRnJhbWUpIDogbnVsbDtcclxuICAgICAgICAoZWxlbWVudCBhcyBhbnkpLnZhbHVlID0gdmFsdWU7XHJcblxyXG4gICAgICAgIGlmIChlbGVtZW50LnRhZ05hbWUgPT09ICdTRUxFQ1QnKSB7XHJcbiAgICAgICAgICAvLyA8c2VsZWN0PiBpcyBzcGVjaWFsLCBpbiB0aGF0IGFueXRoaW5nIHdlIHdyaXRlIHRvIC52YWx1ZSB3aWxsIGJlIGxvc3QgaWYgdGhlcmVcclxuICAgICAgICAgIC8vIGlzbid0IHlldCBhIG1hdGNoaW5nIDxvcHRpb24+LiBUbyBtYWludGFpbiB0aGUgZXhwZWN0ZWQgYmVoYXZpb3Igbm8gbWF0dGVyIHRoZVxyXG4gICAgICAgICAgLy8gZWxlbWVudCBpbnNlcnRpb24vdXBkYXRlIG9yZGVyLCBwcmVzZXJ2ZSB0aGUgZGVzaXJlZCB2YWx1ZSBzZXBhcmF0ZWx5IHNvXHJcbiAgICAgICAgICAvLyB3ZSBjYW4gcmVjb3ZlciBpdCB3aGVuIGluc2VydGluZyBhbnkgbWF0Y2hpbmcgPG9wdGlvbj4gb3IgYWZ0ZXIgaW5zZXJ0aW5nIGFuXHJcbiAgICAgICAgICAvLyBlbnRpcmUgbWFya3VwIGJsb2NrIG9mIGRlc2NlbmRhbnRzLlxyXG4gICAgICAgICAgZWxlbWVudFtzZWxlY3RWYWx1ZVByb3BuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdPUFRJT04nOiB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBhdHRyaWJ1dGVGcmFtZSA/IGZyYW1lUmVhZGVyLmF0dHJpYnV0ZVZhbHVlKGF0dHJpYnV0ZUZyYW1lKSA6IG51bGw7XHJcbiAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgndmFsdWUnLCB2YWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCd2YWx1ZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBTZWUgYWJvdmUgZm9yIHdoeSB3ZSBoYXZlIHRoaXMgc3BlY2lhbCBoYW5kbGluZyBmb3IgPHNlbGVjdD4vPG9wdGlvbj5cclxuICAgICAgICAvLyBOb3RlIHRoYXQgdGhpcyBpcyBvbmx5IG9uZSBvZiB0aGUgdHdvIGNhc2VzIHdoZXJlIHdlIHNldCB0aGUgdmFsdWUgb24gYSA8c2VsZWN0PlxyXG4gICAgICAgIGNvbnN0IHNlbGVjdEVsZW0gPSB0aGlzLmZpbmRDbG9zZXN0QW5jZXN0b3JTZWxlY3RFbGVtZW50KGVsZW1lbnQpO1xyXG4gICAgICAgIGlmIChzZWxlY3RFbGVtICYmIChzZWxlY3RWYWx1ZVByb3BuYW1lIGluIHNlbGVjdEVsZW0pICYmIHNlbGVjdEVsZW1bc2VsZWN0VmFsdWVQcm9wbmFtZV0gPT09IHZhbHVlKSB7XHJcbiAgICAgICAgICB0aGlzLnRyeUFwcGx5VmFsdWVQcm9wZXJ0eShiYXRjaCwgc2VsZWN0RWxlbSwgYXR0cmlidXRlRnJhbWUpO1xyXG4gICAgICAgICAgZGVsZXRlIHNlbGVjdEVsZW1bc2VsZWN0VmFsdWVQcm9wbmFtZV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0cnlBcHBseUNoZWNrZWRQcm9wZXJ0eShiYXRjaDogUmVuZGVyQmF0Y2gsIGVsZW1lbnQ6IEVsZW1lbnQsIGF0dHJpYnV0ZUZyYW1lOiBSZW5kZXJUcmVlRnJhbWUgfCBudWxsKSB7XHJcbiAgICAvLyBDZXJ0YWluIGVsZW1lbnRzIGhhdmUgYnVpbHQtaW4gYmVoYXZpb3VyIGZvciB0aGVpciAnY2hlY2tlZCcgcHJvcGVydHlcclxuICAgIGlmIChlbGVtZW50LnRhZ05hbWUgPT09ICdJTlBVVCcpIHtcclxuICAgICAgY29uc3QgdmFsdWUgPSBhdHRyaWJ1dGVGcmFtZSA/IGJhdGNoLmZyYW1lUmVhZGVyLmF0dHJpYnV0ZVZhbHVlKGF0dHJpYnV0ZUZyYW1lKSA6IG51bGw7XHJcbiAgICAgIChlbGVtZW50IGFzIGFueSkuY2hlY2tlZCA9IHZhbHVlICE9PSBudWxsO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZmluZENsb3Nlc3RBbmNlc3RvclNlbGVjdEVsZW1lbnQoZWxlbWVudDogRWxlbWVudCB8IG51bGwpIHtcclxuICAgIHdoaWxlIChlbGVtZW50KSB7XHJcbiAgICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpIHtcclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluc2VydEZyYW1lUmFuZ2UoYmF0Y2g6IFJlbmRlckJhdGNoLCBjb21wb25lbnRJZDogbnVtYmVyLCBwYXJlbnQ6IExvZ2ljYWxFbGVtZW50LCBjaGlsZEluZGV4OiBudW1iZXIsIGZyYW1lczogQXJyYXlWYWx1ZXM8UmVuZGVyVHJlZUZyYW1lPiwgc3RhcnRJbmRleDogbnVtYmVyLCBlbmRJbmRleEV4Y2w6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICBjb25zdCBvcmlnQ2hpbGRJbmRleCA9IGNoaWxkSW5kZXg7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IHN0YXJ0SW5kZXg7IGluZGV4IDwgZW5kSW5kZXhFeGNsOyBpbmRleCsrKSB7XHJcbiAgICAgIGNvbnN0IGZyYW1lID0gYmF0Y2gucmVmZXJlbmNlRnJhbWVzRW50cnkoZnJhbWVzLCBpbmRleCk7XHJcbiAgICAgIGNvbnN0IG51bUNoaWxkcmVuSW5zZXJ0ZWQgPSB0aGlzLmluc2VydEZyYW1lKGJhdGNoLCBjb21wb25lbnRJZCwgcGFyZW50LCBjaGlsZEluZGV4LCBmcmFtZXMsIGZyYW1lLCBpbmRleCk7XHJcbiAgICAgIGNoaWxkSW5kZXggKz0gbnVtQ2hpbGRyZW5JbnNlcnRlZDtcclxuXHJcbiAgICAgIC8vIFNraXAgb3ZlciBhbnkgZGVzY2VuZGFudHMsIHNpbmNlIHRoZXkgYXJlIGFscmVhZHkgZGVhbHQgd2l0aCByZWN1cnNpdmVseVxyXG4gICAgICBpbmRleCArPSBjb3VudERlc2NlbmRhbnRGcmFtZXMoYmF0Y2gsIGZyYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKGNoaWxkSW5kZXggLSBvcmlnQ2hpbGRJbmRleCk7IC8vIFRvdGFsIG51bWJlciBvZiBjaGlsZHJlbiBpbnNlcnRlZFxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb21wb25lbnREZXNjcmlwdG9yIHtcclxuICBzdGFydDogTm9kZTtcclxuICBlbmQ6IE5vZGU7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRXZlbnREZXNjcmlwdG9yIHtcclxuICBicm93c2VyUmVuZGVyZXJJZDogbnVtYmVyO1xyXG4gIGV2ZW50SGFuZGxlcklkOiBudW1iZXI7XHJcbiAgZXZlbnRBcmdzVHlwZTogRXZlbnRBcmdzVHlwZTtcclxuICBldmVudEZpZWxkSW5mbzogRXZlbnRGaWVsZEluZm8gfCBudWxsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZU1hcmt1cChtYXJrdXA6IHN0cmluZywgaXNTdmc6IGJvb2xlYW4pIHtcclxuICBpZiAoaXNTdmcpIHtcclxuICAgIHNoYXJlZFN2Z0VsZW1Gb3JQYXJzaW5nLmlubmVySFRNTCA9IG1hcmt1cCB8fCAnICc7XHJcbiAgICByZXR1cm4gc2hhcmVkU3ZnRWxlbUZvclBhcnNpbmc7XHJcbiAgfSBlbHNlIHtcclxuICAgIHNoYXJlZFRlbXBsYXRlRWxlbUZvclBhcnNpbmcuaW5uZXJIVE1MID0gbWFya3VwIHx8ICcgJztcclxuICAgIHJldHVybiBzaGFyZWRUZW1wbGF0ZUVsZW1Gb3JQYXJzaW5nLmNvbnRlbnQ7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjb3VudERlc2NlbmRhbnRGcmFtZXMoYmF0Y2g6IFJlbmRlckJhdGNoLCBmcmFtZTogUmVuZGVyVHJlZUZyYW1lKTogbnVtYmVyIHtcclxuICBjb25zdCBmcmFtZVJlYWRlciA9IGJhdGNoLmZyYW1lUmVhZGVyO1xyXG4gIHN3aXRjaCAoZnJhbWVSZWFkZXIuZnJhbWVUeXBlKGZyYW1lKSkge1xyXG4gICAgLy8gVGhlIGZvbGxvd2luZyBmcmFtZSB0eXBlcyBoYXZlIGEgc3VidHJlZSBsZW5ndGguIE90aGVyIGZyYW1lcyBtYXkgdXNlIHRoYXQgbWVtb3J5IHNsb3RcclxuICAgIC8vIHRvIG1lYW4gc29tZXRoaW5nIGVsc2UsIHNvIHdlIG11c3Qgbm90IHJlYWQgaXQuIFdlIHNob3VsZCBjb25zaWRlciBoYXZpbmcgbm9taW5hbCBzdWJ0eXBlc1xyXG4gICAgLy8gb2YgUmVuZGVyVHJlZUZyYW1lUG9pbnRlciB0aGF0IHByZXZlbnQgYWNjZXNzIHRvIG5vbi1hcHBsaWNhYmxlIGZpZWxkcy5cclxuICAgIGNhc2UgRnJhbWVUeXBlLmNvbXBvbmVudDpcclxuICAgIGNhc2UgRnJhbWVUeXBlLmVsZW1lbnQ6XHJcbiAgICBjYXNlIEZyYW1lVHlwZS5yZWdpb246XHJcbiAgICAgIHJldHVybiBmcmFtZVJlYWRlci5zdWJ0cmVlTGVuZ3RoKGZyYW1lKSAtIDE7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm4gMDtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJhaXNlRXZlbnQoXHJcbiAgZXZlbnQ6IEV2ZW50LFxyXG4gIGJyb3dzZXJSZW5kZXJlcklkOiBudW1iZXIsXHJcbiAgZXZlbnRIYW5kbGVySWQ6IG51bWJlcixcclxuICBldmVudEFyZ3M6IEV2ZW50Rm9yRG90TmV0PFVJRXZlbnRBcmdzPixcclxuICBldmVudEZpZWxkSW5mbzogRXZlbnRGaWVsZEluZm8gfCBudWxsXHJcbik6IHZvaWQge1xyXG4gIGlmIChwcmV2ZW50RGVmYXVsdEV2ZW50c1tldmVudC50eXBlXSkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGV2ZW50RGVzY3JpcHRvciA9IHtcclxuICAgIGJyb3dzZXJSZW5kZXJlcklkLFxyXG4gICAgZXZlbnRIYW5kbGVySWQsXHJcbiAgICBldmVudEFyZ3NUeXBlOiBldmVudEFyZ3MudHlwZSxcclxuICAgIGV2ZW50RmllbGRJbmZvOiBldmVudEZpZWxkSW5mbyxcclxuICB9O1xyXG5cclxuICBkaXNwYXRjaEV2ZW50KGV2ZW50RGVzY3JpcHRvciwgZXZlbnRBcmdzLmRhdGEpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhckVsZW1lbnQoZWxlbWVudDogRWxlbWVudCkge1xyXG4gIGxldCBjaGlsZE5vZGU6IE5vZGUgfCBudWxsO1xyXG4gIHdoaWxlIChjaGlsZE5vZGUgPSBlbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGROb2RlKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFyQmV0d2VlbihzdGFydDogTm9kZSwgZW5kOiBOb2RlKTogdm9pZCB7XHJcbiAgY29uc3QgbG9naWNhbFBhcmVudCA9IGdldExvZ2ljYWxQYXJlbnQoc3RhcnQgYXMgdW5rbm93biBhcyBMb2dpY2FsRWxlbWVudCk7XHJcbiAgaWYgKCFsb2dpY2FsUGFyZW50KSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBjbGVhciBiZXR3ZWVuIG5vZGVzLiBUaGUgc3RhcnQgbm9kZSBkb2VzIG5vdCBoYXZlIGEgbG9naWNhbCBwYXJlbnQuXCIpO1xyXG4gIH1cclxuICBjb25zdCBjaGlsZHJlbiA9IGdldExvZ2ljYWxDaGlsZHJlbkFycmF5KGxvZ2ljYWxQYXJlbnQpO1xyXG4gIGNvbnN0IHJlbW92ZVN0YXJ0ID0gY2hpbGRyZW4uaW5kZXhPZihzdGFydCBhcyB1bmtub3duIGFzIExvZ2ljYWxFbGVtZW50KSArIDE7XHJcbiAgY29uc3QgZW5kSW5kZXggPSBjaGlsZHJlbi5pbmRleE9mKGVuZCBhcyB1bmtub3duIGFzIExvZ2ljYWxFbGVtZW50KTtcclxuXHJcbiAgLy8gV2UgcmVtb3ZlIHRoZSBlbmQgY29tcG9uZW50IGNvbW1lbnQgZnJvbSB0aGUgRE9NIGFzIHdlIGRvbid0IG5lZWQgaXQgYWZ0ZXIgdGhpcyBwb2ludC5cclxuICBmb3IgKGxldCBpID0gcmVtb3ZlU3RhcnQ7IGkgPD0gZW5kSW5kZXg7IGkrKykge1xyXG4gICAgcmVtb3ZlTG9naWNhbENoaWxkKGxvZ2ljYWxQYXJlbnQsIHJlbW92ZVN0YXJ0KTtcclxuICB9XHJcblxyXG4gIC8vIFdlIHNhbml0aXplIHRoZSBzdGFydCBjb21tZW50IGJ5IHJlbW92aW5nIGFsbCB0aGUgaW5mb3JtYXRpb24gZnJvbSBpdCBub3cgdGhhdCB3ZSBkb24ndCBuZWVkIGl0IGFueW1vcmVcclxuICAvLyBhcyBpdCBhZGRzIG5vaXNlIHRvIHRoZSBET00uXHJcbiAgc3RhcnQudGV4dENvbnRlbnQgPSAnISc7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0cmlwT25QcmVmaXgoYXR0cmlidXRlTmFtZTogc3RyaW5nKSB7XHJcbiAgaWYgKGF0dHJpYnV0ZU5hbWUuc3RhcnRzV2l0aCgnb24nKSkge1xyXG4gICAgcmV0dXJuIGF0dHJpYnV0ZU5hbWUuc3Vic3RyaW5nKDIpO1xyXG4gIH1cclxuXHJcbiAgdGhyb3cgbmV3IEVycm9yKGBBdHRyaWJ1dGUgc2hvdWxkIGJlIGFuIGV2ZW50IG5hbWUsIGJ1dCBkb2Vzbid0IHN0YXJ0IHdpdGggJ29uJy4gVmFsdWU6ICcke2F0dHJpYnV0ZU5hbWV9J2ApO1xyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBhcHBseUNhcHR1cmVJZFRvRWxlbWVudChlbGVtZW50OiBFbGVtZW50LCByZWZlcmVuY2VDYXB0dXJlSWQ6IHN0cmluZykge1xyXG4gIGVsZW1lbnQuc2V0QXR0cmlidXRlKGdldENhcHR1cmVJZEF0dHJpYnV0ZU5hbWUocmVmZXJlbmNlQ2FwdHVyZUlkKSwgJycpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRFbGVtZW50QnlDYXB0dXJlSWQocmVmZXJlbmNlQ2FwdHVyZUlkOiBzdHJpbmcpIHtcclxuICBjb25zdCBzZWxlY3RvciA9IGBbJHtnZXRDYXB0dXJlSWRBdHRyaWJ1dGVOYW1lKHJlZmVyZW5jZUNhcHR1cmVJZCl9XWA7XHJcbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRDYXB0dXJlSWRBdHRyaWJ1dGVOYW1lKHJlZmVyZW5jZUNhcHR1cmVJZDogc3RyaW5nKSB7XHJcbiAgcmV0dXJuIGBfYmxfJHtyZWZlcmVuY2VDYXB0dXJlSWR9YDtcclxufVxyXG5cclxuLy8gU3VwcG9ydCByZWNlaXZpbmcgRWxlbWVudFJlZiBpbnN0YW5jZXMgYXMgYXJncyBpbiBpbnRlcm9wIGNhbGxzXHJcbmNvbnN0IGVsZW1lbnRSZWZLZXkgPSAnX19pbnRlcm5hbElkJzsgLy8gS2VlcCBpbiBzeW5jIHdpdGggRWxlbWVudFJlZi5jc1xyXG5Eb3ROZXQuYXR0YWNoUmV2aXZlcigoa2V5LCB2YWx1ZSkgPT4ge1xyXG4gIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlLmhhc093blByb3BlcnR5KGVsZW1lbnRSZWZLZXkpICYmIHR5cGVvZiB2YWx1ZVtlbGVtZW50UmVmS2V5XSA9PT0gJ3N0cmluZycpIHtcclxuICAgIHJldHVybiBnZXRFbGVtZW50QnlDYXB0dXJlSWQodmFsdWVbZWxlbWVudFJlZktleV0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfVxyXG59KTtcclxuIiwiaW1wb3J0IHsgRXZlbnRGb3JEb3ROZXQsIFVJRXZlbnRBcmdzIH0gZnJvbSAnLi9FdmVudEZvckRvdE5ldCc7XHJcbmltcG9ydCB7IEV2ZW50RmllbGRJbmZvIH0gZnJvbSAnLi9FdmVudEZpZWxkSW5mbyc7XHJcblxyXG5jb25zdCBub25CdWJibGluZ0V2ZW50cyA9IHRvTG9va3VwKFtcclxuICAnYWJvcnQnLFxyXG4gICdibHVyJyxcclxuICAnY2hhbmdlJyxcclxuICAnZXJyb3InLFxyXG4gICdmb2N1cycsXHJcbiAgJ2xvYWQnLFxyXG4gICdsb2FkZW5kJyxcclxuICAnbG9hZHN0YXJ0JyxcclxuICAnbW91c2VlbnRlcicsXHJcbiAgJ21vdXNlbGVhdmUnLFxyXG4gICdwcm9ncmVzcycsXHJcbiAgJ3Jlc2V0JyxcclxuICAnc2Nyb2xsJyxcclxuICAnc3VibWl0JyxcclxuICAndW5sb2FkJyxcclxuICAnRE9NTm9kZUluc2VydGVkSW50b0RvY3VtZW50JyxcclxuICAnRE9NTm9kZVJlbW92ZWRGcm9tRG9jdW1lbnQnLFxyXG5dKTtcclxuXHJcbmNvbnN0IGRpc2FibGVhYmxlRXZlbnROYW1lcyA9IHRvTG9va3VwKFsnY2xpY2snLCAnZGJsY2xpY2snLCAnbW91c2Vkb3duJywgJ21vdXNlbW92ZScsICdtb3VzZXVwJ10pO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBPbkV2ZW50Q2FsbGJhY2sge1xyXG4gIChldmVudDogRXZlbnQsIGV2ZW50SGFuZGxlcklkOiBudW1iZXIsIGV2ZW50QXJnczogRXZlbnRGb3JEb3ROZXQ8VUlFdmVudEFyZ3M+LCBldmVudEZpZWxkSW5mbzogRXZlbnRGaWVsZEluZm8gfCBudWxsKTogdm9pZDtcclxufVxyXG5cclxuLy8gUmVzcG9uc2libGUgZm9yIGFkZGluZy9yZW1vdmluZyB0aGUgZXZlbnRJbmZvIG9uIGFuIGV4cGFuZG8gcHJvcGVydHkgb24gRE9NIGVsZW1lbnRzLCBhbmRcclxuLy8gY2FsbGluZyBhbiBFdmVudEluZm9TdG9yZSB0aGF0IGRlYWxzIHdpdGggcmVnaXN0ZXJpbmcvdW5yZWdpc3RlcmluZyB0aGUgdW5kZXJseWluZyBkZWxlZ2F0ZWRcclxuLy8gZXZlbnQgbGlzdGVuZXJzIGFzIHJlcXVpcmVkIChhbmQgYWxzbyBtYXBzIGFjdHVhbCBldmVudHMgYmFjayB0byB0aGUgZ2l2ZW4gY2FsbGJhY2spLlxyXG5leHBvcnQgY2xhc3MgRXZlbnREZWxlZ2F0b3Ige1xyXG4gIHByaXZhdGUgc3RhdGljIG5leHRFdmVudERlbGVnYXRvcklkID0gMDtcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSBldmVudHNDb2xsZWN0aW9uS2V5OiBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgYWZ0ZXJDbGlja0NhbGxiYWNrczogKChldmVudDogTW91c2VFdmVudCkgPT4gdm9pZClbXSA9IFtdO1xyXG5cclxuICBwcml2YXRlIGV2ZW50SW5mb1N0b3JlOiBFdmVudEluZm9TdG9yZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBvbkV2ZW50OiBPbkV2ZW50Q2FsbGJhY2spIHtcclxuICAgIGNvbnN0IGV2ZW50RGVsZWdhdG9ySWQgPSArK0V2ZW50RGVsZWdhdG9yLm5leHRFdmVudERlbGVnYXRvcklkO1xyXG4gICAgdGhpcy5ldmVudHNDb2xsZWN0aW9uS2V5ID0gYF9ibGF6b3JFdmVudHNfJHtldmVudERlbGVnYXRvcklkfWA7XHJcbiAgICB0aGlzLmV2ZW50SW5mb1N0b3JlID0gbmV3IEV2ZW50SW5mb1N0b3JlKHRoaXMub25HbG9iYWxFdmVudC5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRMaXN0ZW5lcihlbGVtZW50OiBFbGVtZW50LCBldmVudE5hbWU6IHN0cmluZywgZXZlbnRIYW5kbGVySWQ6IG51bWJlciwgcmVuZGVyaW5nQ29tcG9uZW50SWQ6IG51bWJlcikge1xyXG4gICAgY29uc3QgaW5mb0ZvckVsZW1lbnQgPSB0aGlzLmdldEV2ZW50SGFuZGxlckluZm9zRm9yRWxlbWVudChlbGVtZW50LCB0cnVlKSE7XHJcbiAgICBjb25zdCBleGlzdGluZ0hhbmRsZXIgPSBpbmZvRm9yRWxlbWVudC5nZXRIYW5kbGVyKGV2ZW50TmFtZSk7XHJcblxyXG4gICAgaWYgKGV4aXN0aW5nSGFuZGxlcikge1xyXG4gICAgICAvLyBXZSBjYW4gY2hlYXBseSB1cGRhdGUgdGhlIGluZm8gb24gdGhlIGV4aXN0aW5nIG9iamVjdCBhbmQgZG9uJ3QgbmVlZCBhbnkgb3RoZXIgaG91c2VrZWVwaW5nXHJcbiAgICAgIC8vIE5vdGUgdGhhdCB0aGlzIGFsc28gdGFrZXMgY2FyZSBvZiB1cGRhdGluZyB0aGUgZXZlbnRIYW5kbGVySWQgb24gdGhlIGV4aXN0aW5nIGhhbmRsZXIgb2JqZWN0XHJcbiAgICAgIHRoaXMuZXZlbnRJbmZvU3RvcmUudXBkYXRlKGV4aXN0aW5nSGFuZGxlci5ldmVudEhhbmRsZXJJZCwgZXZlbnRIYW5kbGVySWQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gR28gdGhyb3VnaCB0aGUgd2hvbGUgZmxvdyB3aGljaCBtaWdodCBpbnZvbHZlIHJlZ2lzdGVyaW5nIGEgbmV3IGdsb2JhbCBoYW5kbGVyXHJcbiAgICAgIGNvbnN0IG5ld0luZm8gPSB7IGVsZW1lbnQsIGV2ZW50TmFtZSwgZXZlbnRIYW5kbGVySWQsIHJlbmRlcmluZ0NvbXBvbmVudElkIH07XHJcbiAgICAgIHRoaXMuZXZlbnRJbmZvU3RvcmUuYWRkKG5ld0luZm8pO1xyXG4gICAgICBpbmZvRm9yRWxlbWVudC5zZXRIYW5kbGVyKGV2ZW50TmFtZSwgbmV3SW5mbyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlTGlzdGVuZXIoZXZlbnRIYW5kbGVySWQ6IG51bWJlcikge1xyXG4gICAgLy8gVGhpcyBtZXRob2QgZ2V0cyBjYWxsZWQgd2hlbmV2ZXIgdGhlIC5ORVQtc2lkZSBjb2RlIHJlcG9ydHMgdGhhdCBhIGNlcnRhaW4gZXZlbnQgaGFuZGxlclxyXG4gICAgLy8gaGFzIGJlZW4gZGlzcG9zZWQuIEhvd2V2ZXIgd2Ugd2lsbCBhbHJlYWR5IGhhdmUgZGlzcG9zZWQgdGhlIGluZm8gYWJvdXQgdGhhdCBoYW5kbGVyIGlmXHJcbiAgICAvLyB0aGUgZXZlbnRIYW5kbGVySWQgZm9yIHRoZSAoZWxlbWVudCxldmVudE5hbWUpIHBhaXIgd2FzIHJlcGxhY2VkIGR1cmluZyBkaWZmIGFwcGxpY2F0aW9uLlxyXG4gICAgY29uc3QgaW5mbyA9IHRoaXMuZXZlbnRJbmZvU3RvcmUucmVtb3ZlKGV2ZW50SGFuZGxlcklkKTtcclxuICAgIGlmIChpbmZvKSB7XHJcbiAgICAgIC8vIExvb2tzIGxpa2UgdGhpcyBldmVudCBoYW5kbGVyIHdhc24ndCBhbHJlYWR5IGRpc3Bvc2VkXHJcbiAgICAgIC8vIFJlbW92ZSB0aGUgYXNzb2NpYXRlZCBkYXRhIGZyb20gdGhlIERPTSBlbGVtZW50XHJcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBpbmZvLmVsZW1lbnQ7XHJcbiAgICAgIGNvbnN0IGVsZW1lbnRFdmVudEluZm9zID0gdGhpcy5nZXRFdmVudEhhbmRsZXJJbmZvc0ZvckVsZW1lbnQoZWxlbWVudCwgZmFsc2UpO1xyXG4gICAgICBpZiAoZWxlbWVudEV2ZW50SW5mb3MpIHtcclxuICAgICAgICBlbGVtZW50RXZlbnRJbmZvcy5yZW1vdmVIYW5kbGVyKGluZm8uZXZlbnROYW1lKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG5vdGlmeUFmdGVyQ2xpY2soY2FsbGJhY2s6IChldmVudDogTW91c2VFdmVudCkgPT4gdm9pZCkge1xyXG4gICAgLy8gVGhpcyBpcyBleHRyZW1lbHkgc3BlY2lhbC1jYXNlLiBJdCdzIG5lZWRlZCBzbyB0aGF0IG5hdmlnYXRpb24gbGluayBjbGljayBpbnRlcmNlcHRpb25cclxuICAgIC8vIGNhbiBiZSBzdXJlIHRvIHJ1biAqYWZ0ZXIqIG91ciBzeW50aGV0aWMgYnViYmxpbmcgcHJvY2Vzcy4gSWYgYSBuZWVkIGFyaXNlcywgd2UgY2FuXHJcbiAgICAvLyBnZW5lcmFsaXNlIHRoaXMsIGJ1dCByaWdodCBub3cgaXQncyBhIHB1cmVseSBpbnRlcm5hbCBkZXRhaWwuXHJcbiAgICB0aGlzLmFmdGVyQ2xpY2tDYWxsYmFja3MucHVzaChjYWxsYmFjayk7XHJcbiAgICB0aGlzLmV2ZW50SW5mb1N0b3JlLmFkZEdsb2JhbExpc3RlbmVyKCdjbGljaycpOyAvLyBFbnN1cmUgd2UgYWx3YXlzIGxpc3RlbiBmb3IgdGhpc1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldFN0b3BQcm9wYWdhdGlvbihlbGVtZW50OiBFbGVtZW50LCBldmVudE5hbWU6IHN0cmluZywgdmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIGNvbnN0IGluZm9Gb3JFbGVtZW50ID0gdGhpcy5nZXRFdmVudEhhbmRsZXJJbmZvc0ZvckVsZW1lbnQoZWxlbWVudCwgdHJ1ZSkhO1xyXG4gICAgaW5mb0ZvckVsZW1lbnQuc3RvcFByb3BhZ2F0aW9uKGV2ZW50TmFtZSwgdmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldFByZXZlbnREZWZhdWx0KGVsZW1lbnQ6IEVsZW1lbnQsIGV2ZW50TmFtZTogc3RyaW5nLCB2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgY29uc3QgaW5mb0ZvckVsZW1lbnQgPSB0aGlzLmdldEV2ZW50SGFuZGxlckluZm9zRm9yRWxlbWVudChlbGVtZW50LCB0cnVlKSE7XHJcbiAgICBpbmZvRm9yRWxlbWVudC5wcmV2ZW50RGVmYXVsdChldmVudE5hbWUsIHZhbHVlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25HbG9iYWxFdmVudChldnQ6IEV2ZW50KSB7XHJcbiAgICBpZiAoIShldnQudGFyZ2V0IGluc3RhbmNlb2YgRWxlbWVudCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNjYW4gdXAgdGhlIGVsZW1lbnQgaGllcmFyY2h5LCBsb29raW5nIGZvciBhbnkgbWF0Y2hpbmcgcmVnaXN0ZXJlZCBldmVudCBoYW5kbGVyc1xyXG4gICAgbGV0IGNhbmRpZGF0ZUVsZW1lbnQgPSBldnQudGFyZ2V0IGFzIEVsZW1lbnQgfCBudWxsO1xyXG4gICAgbGV0IGV2ZW50QXJnczogRXZlbnRGb3JEb3ROZXQ8VUlFdmVudEFyZ3M+IHwgbnVsbCA9IG51bGw7IC8vIFBvcHVsYXRlIGxhemlseVxyXG4gICAgY29uc3QgZXZlbnRJc05vbkJ1YmJsaW5nID0gbm9uQnViYmxpbmdFdmVudHMuaGFzT3duUHJvcGVydHkoZXZ0LnR5cGUpO1xyXG4gICAgbGV0IHN0b3BQcm9wYWdhdGlvbldhc1JlcXVlc3RlZCA9IGZhbHNlO1xyXG4gICAgd2hpbGUgKGNhbmRpZGF0ZUVsZW1lbnQpIHtcclxuICAgICAgY29uc3QgaGFuZGxlckluZm9zID0gdGhpcy5nZXRFdmVudEhhbmRsZXJJbmZvc0ZvckVsZW1lbnQoY2FuZGlkYXRlRWxlbWVudCwgZmFsc2UpO1xyXG4gICAgICBpZiAoaGFuZGxlckluZm9zKSB7XHJcbiAgICAgICAgY29uc3QgaGFuZGxlckluZm8gPSBoYW5kbGVySW5mb3MuZ2V0SGFuZGxlcihldnQudHlwZSk7XHJcbiAgICAgICAgaWYgKGhhbmRsZXJJbmZvICYmICFldmVudElzRGlzYWJsZWRPbkVsZW1lbnQoY2FuZGlkYXRlRWxlbWVudCwgZXZ0LnR5cGUpKSB7XHJcbiAgICAgICAgICAvLyBXZSBhcmUgZ29pbmcgdG8gcmFpc2UgYW4gZXZlbnQgZm9yIHRoaXMgZWxlbWVudCwgc28gcHJlcGFyZSBpbmZvIG5lZWRlZCBieSB0aGUgLk5FVCBjb2RlXHJcbiAgICAgICAgICBpZiAoIWV2ZW50QXJncykge1xyXG4gICAgICAgICAgICBldmVudEFyZ3MgPSBFdmVudEZvckRvdE5ldC5mcm9tRE9NRXZlbnQoZXZ0KTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zdCBldmVudEZpZWxkSW5mbyA9IEV2ZW50RmllbGRJbmZvLmZyb21FdmVudChoYW5kbGVySW5mby5yZW5kZXJpbmdDb21wb25lbnRJZCwgZXZ0KTtcclxuICAgICAgICAgIHRoaXMub25FdmVudChldnQsIGhhbmRsZXJJbmZvLmV2ZW50SGFuZGxlcklkLCBldmVudEFyZ3MsIGV2ZW50RmllbGRJbmZvKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChoYW5kbGVySW5mb3Muc3RvcFByb3BhZ2F0aW9uKGV2dC50eXBlKSkge1xyXG4gICAgICAgICAgc3RvcFByb3BhZ2F0aW9uV2FzUmVxdWVzdGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChoYW5kbGVySW5mb3MucHJldmVudERlZmF1bHQoZXZ0LnR5cGUpKSB7XHJcbiAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNhbmRpZGF0ZUVsZW1lbnQgPSAoZXZlbnRJc05vbkJ1YmJsaW5nIHx8IHN0b3BQcm9wYWdhdGlvbldhc1JlcXVlc3RlZCkgPyBudWxsIDogY2FuZGlkYXRlRWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNwZWNpYWwgY2FzZSBmb3IgbmF2aWdhdGlvbiBpbnRlcmNlcHRpb25cclxuICAgIGlmIChldnQudHlwZSA9PT0gJ2NsaWNrJykge1xyXG4gICAgICB0aGlzLmFmdGVyQ2xpY2tDYWxsYmFja3MuZm9yRWFjaChjYWxsYmFjayA9PiBjYWxsYmFjayhldnQgYXMgTW91c2VFdmVudCkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRFdmVudEhhbmRsZXJJbmZvc0ZvckVsZW1lbnQoZWxlbWVudDogRWxlbWVudCwgY3JlYXRlSWZOZWVkZWQ6IGJvb2xlYW4pOiBFdmVudEhhbmRsZXJJbmZvc0ZvckVsZW1lbnQgfCBudWxsIHtcclxuICAgIGlmIChlbGVtZW50Lmhhc093blByb3BlcnR5KHRoaXMuZXZlbnRzQ29sbGVjdGlvbktleSkpIHtcclxuICAgICAgcmV0dXJuIGVsZW1lbnRbdGhpcy5ldmVudHNDb2xsZWN0aW9uS2V5XTtcclxuICAgIH0gZWxzZSBpZiAoY3JlYXRlSWZOZWVkZWQpIHtcclxuICAgICAgcmV0dXJuIChlbGVtZW50W3RoaXMuZXZlbnRzQ29sbGVjdGlvbktleV0gPSBuZXcgRXZlbnRIYW5kbGVySW5mb3NGb3JFbGVtZW50KCkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBSZXNwb25zaWJsZSBmb3IgYWRkaW5nIGFuZCByZW1vdmluZyB0aGUgZ2xvYmFsIGxpc3RlbmVyIHdoZW4gdGhlIG51bWJlciBvZiBsaXN0ZW5lcnNcclxuLy8gZm9yIGEgZ2l2ZW4gZXZlbnQgbmFtZSBjaGFuZ2VzIGJldHdlZW4gemVybyBhbmQgbm9uemVyb1xyXG5jbGFzcyBFdmVudEluZm9TdG9yZSB7XHJcbiAgcHJpdmF0ZSBpbmZvc0J5RXZlbnRIYW5kbGVySWQ6IHsgW2V2ZW50SGFuZGxlcklkOiBudW1iZXJdOiBFdmVudEhhbmRsZXJJbmZvIH0gPSB7fTtcclxuXHJcbiAgcHJpdmF0ZSBjb3VudEJ5RXZlbnROYW1lOiB7IFtldmVudE5hbWU6IHN0cmluZ106IG51bWJlciB9ID0ge307XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZ2xvYmFsTGlzdGVuZXI6IEV2ZW50TGlzdGVuZXIpIHtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGQoaW5mbzogRXZlbnRIYW5kbGVySW5mbykge1xyXG4gICAgaWYgKHRoaXMuaW5mb3NCeUV2ZW50SGFuZGxlcklkW2luZm8uZXZlbnRIYW5kbGVySWRdKSB7XHJcbiAgICAgIC8vIFNob3VsZCBuZXZlciBoYXBwZW4sIGJ1dCB3ZSB3YW50IHRvIGtub3cgaWYgaXQgZG9lc1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEV2ZW50ICR7aW5mby5ldmVudEhhbmRsZXJJZH0gaXMgYWxyZWFkeSB0cmFja2VkYCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pbmZvc0J5RXZlbnRIYW5kbGVySWRbaW5mby5ldmVudEhhbmRsZXJJZF0gPSBpbmZvO1xyXG5cclxuICAgIHRoaXMuYWRkR2xvYmFsTGlzdGVuZXIoaW5mby5ldmVudE5hbWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFkZEdsb2JhbExpc3RlbmVyKGV2ZW50TmFtZTogc3RyaW5nKSB7XHJcbiAgICBpZiAodGhpcy5jb3VudEJ5RXZlbnROYW1lLmhhc093blByb3BlcnR5KGV2ZW50TmFtZSkpIHtcclxuICAgICAgdGhpcy5jb3VudEJ5RXZlbnROYW1lW2V2ZW50TmFtZV0rKztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY291bnRCeUV2ZW50TmFtZVtldmVudE5hbWVdID0gMTtcclxuXHJcbiAgICAgIC8vIFRvIG1ha2UgZGVsZWdhdGlvbiB3b3JrIHdpdGggbm9uLWJ1YmJsaW5nIGV2ZW50cywgcmVnaXN0ZXIgYSAnY2FwdHVyZScgbGlzdGVuZXIuXHJcbiAgICAgIC8vIFdlIHByZXNlcnZlIHRoZSBub24tYnViYmxpbmcgYmVoYXZpb3IgYnkgb25seSBkaXNwYXRjaGluZyBzdWNoIGV2ZW50cyB0byB0aGUgdGFyZ2V0ZWQgZWxlbWVudC5cclxuICAgICAgY29uc3QgdXNlQ2FwdHVyZSA9IG5vbkJ1YmJsaW5nRXZlbnRzLmhhc093blByb3BlcnR5KGV2ZW50TmFtZSk7XHJcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCB0aGlzLmdsb2JhbExpc3RlbmVyLCB1c2VDYXB0dXJlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyB1cGRhdGUob2xkRXZlbnRIYW5kbGVySWQ6IG51bWJlciwgbmV3RXZlbnRIYW5kbGVySWQ6IG51bWJlcikge1xyXG4gICAgaWYgKHRoaXMuaW5mb3NCeUV2ZW50SGFuZGxlcklkLmhhc093blByb3BlcnR5KG5ld0V2ZW50SGFuZGxlcklkKSkge1xyXG4gICAgICAvLyBTaG91bGQgbmV2ZXIgaGFwcGVuLCBidXQgd2Ugd2FudCB0byBrbm93IGlmIGl0IGRvZXNcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBFdmVudCAke25ld0V2ZW50SGFuZGxlcklkfSBpcyBhbHJlYWR5IHRyYWNrZWRgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTaW5jZSB3ZSdyZSBqdXN0IHVwZGF0aW5nIHRoZSBldmVudCBoYW5kbGVyIElELCB0aGVyZSdzIG5vIG5lZWQgdG8gdXBkYXRlIHRoZSBnbG9iYWwgY291bnRzXHJcbiAgICBjb25zdCBpbmZvID0gdGhpcy5pbmZvc0J5RXZlbnRIYW5kbGVySWRbb2xkRXZlbnRIYW5kbGVySWRdO1xyXG4gICAgZGVsZXRlIHRoaXMuaW5mb3NCeUV2ZW50SGFuZGxlcklkW29sZEV2ZW50SGFuZGxlcklkXTtcclxuICAgIGluZm8uZXZlbnRIYW5kbGVySWQgPSBuZXdFdmVudEhhbmRsZXJJZDtcclxuICAgIHRoaXMuaW5mb3NCeUV2ZW50SGFuZGxlcklkW25ld0V2ZW50SGFuZGxlcklkXSA9IGluZm87XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlKGV2ZW50SGFuZGxlcklkOiBudW1iZXIpOiBFdmVudEhhbmRsZXJJbmZvIHtcclxuICAgIGNvbnN0IGluZm8gPSB0aGlzLmluZm9zQnlFdmVudEhhbmRsZXJJZFtldmVudEhhbmRsZXJJZF07XHJcbiAgICBpZiAoaW5mbykge1xyXG4gICAgICBkZWxldGUgdGhpcy5pbmZvc0J5RXZlbnRIYW5kbGVySWRbZXZlbnRIYW5kbGVySWRdO1xyXG5cclxuICAgICAgY29uc3QgZXZlbnROYW1lID0gaW5mby5ldmVudE5hbWU7XHJcbiAgICAgIGlmICgtLXRoaXMuY291bnRCeUV2ZW50TmFtZVtldmVudE5hbWVdID09PSAwKSB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuY291bnRCeUV2ZW50TmFtZVtldmVudE5hbWVdO1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCB0aGlzLmdsb2JhbExpc3RlbmVyKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBpbmZvO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgRXZlbnRIYW5kbGVySW5mb3NGb3JFbGVtZW50IHtcclxuICAvLyBBbHRob3VnaCB3ZSAqY291bGQqIHRyYWNrIG11bHRpcGxlIGV2ZW50IGhhbmRsZXJzIHBlciAoZWxlbWVudCwgZXZlbnROYW1lKSBwYWlyXHJcbiAgLy8gKHNpbmNlIHRoZXkgaGF2ZSBkaXN0aW5jdCBldmVudEhhbmRsZXJJZCB2YWx1ZXMpLCB0aGVyZSdzIG5vIHBvaW50IGRvaW5nIHNvIGJlY2F1c2VcclxuICAvLyBvdXIgcHJvZ3JhbW1pbmcgbW9kZWwgaXMgdGhhdCB5b3UgZGVjbGFyZSBldmVudCBoYW5kbGVycyBhcyBhdHRyaWJ1dGVzLiBBbiBlbGVtZW50XHJcbiAgLy8gY2FuIG9ubHkgaGF2ZSBvbmUgYXR0cmlidXRlIHdpdGggYSBnaXZlbiBuYW1lLCBoZW5jZSBvbmx5IG9uZSBldmVudCBoYW5kbGVyIHdpdGhcclxuICAvLyB0aGF0IG5hbWUgYXQgYW55IG9uZSB0aW1lLlxyXG4gIC8vIFNvIHRvIGtlZXAgdGhpbmdzIHNpbXBsZSwgb25seSB0cmFjayBvbmUgRXZlbnRIYW5kbGVySW5mbyBwZXIgKGVsZW1lbnQsIGV2ZW50TmFtZSlcclxuICBwcml2YXRlIGhhbmRsZXJzOiB7IFtldmVudE5hbWU6IHN0cmluZ106IEV2ZW50SGFuZGxlckluZm8gfSA9IHt9O1xyXG4gIHByaXZhdGUgcHJldmVudERlZmF1bHRGbGFnczogeyBbZXZlbnROYW1lOiBzdHJpbmddOiBib29sZWFuIH0gfCBudWxsID0gbnVsbDtcclxuICBwcml2YXRlIHN0b3BQcm9wYWdhdGlvbkZsYWdzOiB7IFtldmVudE5hbWU6IHN0cmluZ106IGJvb2xlYW4gfSB8IG51bGwgPSBudWxsO1xyXG5cclxuICBwdWJsaWMgZ2V0SGFuZGxlcihldmVudE5hbWU6IHN0cmluZyk6IEV2ZW50SGFuZGxlckluZm8gfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLmhhbmRsZXJzLmhhc093blByb3BlcnR5KGV2ZW50TmFtZSkgPyB0aGlzLmhhbmRsZXJzW2V2ZW50TmFtZV0gOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldEhhbmRsZXIoZXZlbnROYW1lOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50SGFuZGxlckluZm8pIHtcclxuICAgIHRoaXMuaGFuZGxlcnNbZXZlbnROYW1lXSA9IGhhbmRsZXI7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlSGFuZGxlcihldmVudE5hbWU6IHN0cmluZykge1xyXG4gICAgZGVsZXRlIHRoaXMuaGFuZGxlcnNbZXZlbnROYW1lXTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBwcmV2ZW50RGVmYXVsdChldmVudE5hbWU6IHN0cmluZywgc2V0VmFsdWU/OiBib29sZWFuKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoc2V0VmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnByZXZlbnREZWZhdWx0RmxhZ3MgPSB0aGlzLnByZXZlbnREZWZhdWx0RmxhZ3MgfHwge307XHJcbiAgICAgIHRoaXMucHJldmVudERlZmF1bHRGbGFnc1tldmVudE5hbWVdID0gc2V0VmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMucHJldmVudERlZmF1bHRGbGFncyA/IHRoaXMucHJldmVudERlZmF1bHRGbGFnc1tldmVudE5hbWVdIDogZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RvcFByb3BhZ2F0aW9uKGV2ZW50TmFtZTogc3RyaW5nLCBzZXRWYWx1ZT86IGJvb2xlYW4pOiBib29sZWFuIHtcclxuICAgIGlmIChzZXRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuc3RvcFByb3BhZ2F0aW9uRmxhZ3MgPSB0aGlzLnN0b3BQcm9wYWdhdGlvbkZsYWdzIHx8IHt9O1xyXG4gICAgICB0aGlzLnN0b3BQcm9wYWdhdGlvbkZsYWdzW2V2ZW50TmFtZV0gPSBzZXRWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5zdG9wUHJvcGFnYXRpb25GbGFncyA/IHRoaXMuc3RvcFByb3BhZ2F0aW9uRmxhZ3NbZXZlbnROYW1lXSA6IGZhbHNlO1xyXG4gIH1cclxufVxyXG5cclxuaW50ZXJmYWNlIEV2ZW50SGFuZGxlckluZm8ge1xyXG4gIGVsZW1lbnQ6IEVsZW1lbnQ7XHJcbiAgZXZlbnROYW1lOiBzdHJpbmc7XHJcbiAgZXZlbnRIYW5kbGVySWQ6IG51bWJlcjtcclxuXHJcbiAgLy8gVGhlIGNvbXBvbmVudCB3aG9zZSB0cmVlIGluY2x1ZGVzIHRoZSBldmVudCBoYW5kbGVyIGF0dHJpYnV0ZSBmcmFtZSwgKm5vdCogbmVjZXNzYXJpbHkgdGhlXHJcbiAgLy8gc2FtZSBjb21wb25lbnQgdGhhdCB3aWxsIGJlIHJlLXJlbmRlcmVkIGFmdGVyIHRoZSBldmVudCBpcyBoYW5kbGVkIChzaW5jZSB3ZSByZS1yZW5kZXIgdGhlXHJcbiAgLy8gY29tcG9uZW50IHRoYXQgc3VwcGxpZWQgdGhlIGRlbGVnYXRlLCBub3QgdGhlIG9uZSB0aGF0IHJlbmRlcmVkIHRoZSBldmVudCBoYW5kbGVyIGZyYW1lKVxyXG4gIHJlbmRlcmluZ0NvbXBvbmVudElkOiBudW1iZXI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvTG9va3VwKGl0ZW1zOiBzdHJpbmdbXSk6IHsgW2tleTogc3RyaW5nXTogYm9vbGVhbiB9IHtcclxuICBjb25zdCByZXN1bHQgPSB7fTtcclxuICBpdGVtcy5mb3JFYWNoKHZhbHVlID0+IHtcclxuICAgIHJlc3VsdFt2YWx1ZV0gPSB0cnVlO1xyXG4gIH0pO1xyXG4gIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGV2ZW50SXNEaXNhYmxlZE9uRWxlbWVudChlbGVtZW50OiBFbGVtZW50LCBldmVudE5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gIC8vIFdlIHdhbnQgdG8gcmVwbGljYXRlIHRoZSBub3JtYWwgRE9NIGV2ZW50IGJlaGF2aW9yIHRoYXQsIGZvciAnaW50ZXJhY3RpdmUnIGVsZW1lbnRzXHJcbiAgLy8gd2l0aCBhICdkaXNhYmxlZCcgYXR0cmlidXRlLCBjZXJ0YWluIG1vdXNlIGV2ZW50cyBhcmUgc3VwcHJlc3NlZFxyXG4gIHJldHVybiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50IHx8IGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50IHx8IGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MVGV4dEFyZWFFbGVtZW50IHx8IGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudClcclxuICAgICYmIGRpc2FibGVhYmxlRXZlbnROYW1lcy5oYXNPd25Qcm9wZXJ0eShldmVudE5hbWUpXHJcbiAgICAmJiBlbGVtZW50LmRpc2FibGVkO1xyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBFdmVudEZpZWxkSW5mbyB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgY29tcG9uZW50SWQ6IG51bWJlciwgcHVibGljIGZpZWxkVmFsdWU6IHN0cmluZyB8IGJvb2xlYW4pIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGZyb21FdmVudChjb21wb25lbnRJZDogbnVtYmVyLCBldmVudDogRXZlbnQpOiBFdmVudEZpZWxkSW5mbyB8IG51bGwge1xyXG4gICAgICAgIGNvbnN0IGVsZW0gPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgaWYgKGVsZW0gaW5zdGFuY2VvZiBFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkRGF0YSA9IGdldEZvcm1GaWVsZERhdGEoZWxlbSk7XHJcbiAgICAgICAgICAgIGlmIChmaWVsZERhdGEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXZlbnRGaWVsZEluZm8oY29tcG9uZW50SWQsIGZpZWxkRGF0YS52YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRoaXMgZXZlbnQgaXNuJ3QgaGFwcGVuaW5nIG9uIGEgZm9ybSBmaWVsZCB0aGF0IHdlIGNhbiByZXZlcnNlLW1hcCBiYWNrIHRvIHNvbWUgaW5jb21pbmcgYXR0cmlidXRlXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEZvcm1GaWVsZERhdGEoZWxlbTogRWxlbWVudCkge1xyXG4gICAgLy8gVGhlIGxvZ2ljIGluIGhlcmUgc2hvdWxkIGJlIHRoZSBpbnZlcnNlIG9mIHRoZSBsb2dpYyBpbiBCcm93c2VyUmVuZGVyZXIncyB0cnlBcHBseVNwZWNpYWxQcm9wZXJ0eS5cclxuICAgIC8vIFRoYXQgaXMsIHdlJ3JlIGRvaW5nIHRoZSByZXZlcnNlIG1hcHBpbmcsIHN0YXJ0aW5nIGZyb20gYW4gSFRNTCBwcm9wZXJ0eSBhbmQgcmVjb25zdHJ1Y3Rpbmcgd2hpY2hcclxuICAgIC8vIFwic3BlY2lhbFwiIGF0dHJpYnV0ZSB3b3VsZCBoYXZlIGJlZW4gbWFwcGVkIHRvIHRoYXQgcHJvcGVydHkuXHJcbiAgICBpZiAoZWxlbSBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICByZXR1cm4gKGVsZW0udHlwZSAmJiBlbGVtLnR5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ2NoZWNrYm94JylcclxuICAgICAgICAgICAgPyB7IHZhbHVlOiBlbGVtLmNoZWNrZWQgfVxyXG4gICAgICAgICAgICA6IHsgdmFsdWU6IGVsZW0udmFsdWUgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZWxlbSBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50IHx8IGVsZW0gaW5zdGFuY2VvZiBIVE1MVGV4dEFyZWFFbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIHsgdmFsdWU6IGVsZW0udmFsdWUgfTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG4iLCJleHBvcnQgY2xhc3MgRXZlbnRGb3JEb3ROZXQ8VERhdGEgZXh0ZW5kcyBVSUV2ZW50QXJncz4ge1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgdHlwZTogRXZlbnRBcmdzVHlwZSwgcHVibGljIHJlYWRvbmx5IGRhdGE6IFREYXRhKSB7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGZyb21ET01FdmVudChldmVudDogRXZlbnQpOiBFdmVudEZvckRvdE5ldDxVSUV2ZW50QXJncz4ge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IGV2ZW50LnRhcmdldCBhcyBFbGVtZW50O1xyXG4gICAgc3dpdGNoIChldmVudC50eXBlKSB7XHJcblxyXG4gICAgICBjYXNlICdpbnB1dCc6XHJcbiAgICAgIGNhc2UgJ2NoYW5nZSc6IHtcclxuXHJcbiAgICAgICAgaWYgKGlzVGltZUJhc2VkSW5wdXQoZWxlbWVudCkpIHtcclxuICAgICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRWYWx1ZSA9IG5vcm1hbGl6ZVRpbWVCYXNlZFZhbHVlKGVsZW1lbnQpO1xyXG4gICAgICAgICAgcmV0dXJuIG5ldyBFdmVudEZvckRvdE5ldDxVSUNoYW5nZUV2ZW50QXJncz4oJ2NoYW5nZScsIHsgdHlwZTogZXZlbnQudHlwZSwgdmFsdWU6IG5vcm1hbGl6ZWRWYWx1ZSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHRhcmdldElzQ2hlY2tib3ggPSBpc0NoZWNrYm94KGVsZW1lbnQpO1xyXG4gICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdGFyZ2V0SXNDaGVja2JveCA/ICEhZWxlbWVudFsnY2hlY2tlZCddIDogZWxlbWVudFsndmFsdWUnXTtcclxuICAgICAgICByZXR1cm4gbmV3IEV2ZW50Rm9yRG90TmV0PFVJQ2hhbmdlRXZlbnRBcmdzPignY2hhbmdlJywgeyB0eXBlOiBldmVudC50eXBlLCB2YWx1ZTogbmV3VmFsdWUgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNhc2UgJ2NvcHknOlxyXG4gICAgICBjYXNlICdjdXQnOlxyXG4gICAgICBjYXNlICdwYXN0ZSc6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFdmVudEZvckRvdE5ldDxVSUNsaXBib2FyZEV2ZW50QXJncz4oJ2NsaXBib2FyZCcsIHsgdHlwZTogZXZlbnQudHlwZSB9KTtcclxuXHJcbiAgICAgIGNhc2UgJ2RyYWcnOlxyXG4gICAgICBjYXNlICdkcmFnZW5kJzpcclxuICAgICAgY2FzZSAnZHJhZ2VudGVyJzpcclxuICAgICAgY2FzZSAnZHJhZ2xlYXZlJzpcclxuICAgICAgY2FzZSAnZHJhZ292ZXInOlxyXG4gICAgICBjYXNlICdkcmFnc3RhcnQnOlxyXG4gICAgICBjYXNlICdkcm9wJzpcclxuICAgICAgICByZXR1cm4gbmV3IEV2ZW50Rm9yRG90TmV0PFVJRHJhZ0V2ZW50QXJncz4oJ2RyYWcnLCBwYXJzZURyYWdFdmVudChldmVudCkpO1xyXG5cclxuICAgICAgY2FzZSAnZm9jdXMnOlxyXG4gICAgICBjYXNlICdibHVyJzpcclxuICAgICAgY2FzZSAnZm9jdXNpbic6XHJcbiAgICAgIGNhc2UgJ2ZvY3Vzb3V0JzpcclxuICAgICAgICByZXR1cm4gbmV3IEV2ZW50Rm9yRG90TmV0PFVJRm9jdXNFdmVudEFyZ3M+KCdmb2N1cycsIHsgdHlwZTogZXZlbnQudHlwZSB9KTtcclxuXHJcbiAgICAgIGNhc2UgJ2tleWRvd24nOlxyXG4gICAgICBjYXNlICdrZXl1cCc6XHJcbiAgICAgIGNhc2UgJ2tleXByZXNzJzpcclxuICAgICAgICByZXR1cm4gbmV3IEV2ZW50Rm9yRG90TmV0PFVJS2V5Ym9hcmRFdmVudEFyZ3M+KCdrZXlib2FyZCcsIHBhcnNlS2V5Ym9hcmRFdmVudChldmVudCBhcyBLZXlib2FyZEV2ZW50KSk7XHJcblxyXG4gICAgICBjYXNlICdjb250ZXh0bWVudSc6XHJcbiAgICAgIGNhc2UgJ2NsaWNrJzpcclxuICAgICAgY2FzZSAnbW91c2VvdmVyJzpcclxuICAgICAgY2FzZSAnbW91c2VvdXQnOlxyXG4gICAgICBjYXNlICdtb3VzZW1vdmUnOlxyXG4gICAgICBjYXNlICdtb3VzZWRvd24nOlxyXG4gICAgICBjYXNlICdtb3VzZXVwJzpcclxuICAgICAgY2FzZSAnZGJsY2xpY2snOlxyXG4gICAgICAgIHJldHVybiBuZXcgRXZlbnRGb3JEb3ROZXQ8VUlNb3VzZUV2ZW50QXJncz4oJ21vdXNlJywgcGFyc2VNb3VzZUV2ZW50KGV2ZW50IGFzIE1vdXNlRXZlbnQpKTtcclxuXHJcbiAgICAgIGNhc2UgJ2Vycm9yJzpcclxuICAgICAgICByZXR1cm4gbmV3IEV2ZW50Rm9yRG90TmV0PFVJRXJyb3JFdmVudEFyZ3M+KCdlcnJvcicsIHBhcnNlRXJyb3JFdmVudChldmVudCBhcyBFcnJvckV2ZW50KSk7XHJcblxyXG4gICAgICBjYXNlICdsb2Fkc3RhcnQnOlxyXG4gICAgICBjYXNlICd0aW1lb3V0JzpcclxuICAgICAgY2FzZSAnYWJvcnQnOlxyXG4gICAgICBjYXNlICdsb2FkJzpcclxuICAgICAgY2FzZSAnbG9hZGVuZCc6XHJcbiAgICAgIGNhc2UgJ3Byb2dyZXNzJzpcclxuICAgICAgICByZXR1cm4gbmV3IEV2ZW50Rm9yRG90TmV0PFVJUHJvZ3Jlc3NFdmVudEFyZ3M+KCdwcm9ncmVzcycsIHBhcnNlUHJvZ3Jlc3NFdmVudChldmVudCBhcyBQcm9ncmVzc0V2ZW50KSk7XHJcblxyXG4gICAgICBjYXNlICd0b3VjaGNhbmNlbCc6XHJcbiAgICAgIGNhc2UgJ3RvdWNoZW5kJzpcclxuICAgICAgY2FzZSAndG91Y2htb3ZlJzpcclxuICAgICAgY2FzZSAndG91Y2hlbnRlcic6XHJcbiAgICAgIGNhc2UgJ3RvdWNobGVhdmUnOlxyXG4gICAgICBjYXNlICd0b3VjaHN0YXJ0JzpcclxuICAgICAgICByZXR1cm4gbmV3IEV2ZW50Rm9yRG90TmV0PFVJVG91Y2hFdmVudEFyZ3M+KCd0b3VjaCcsIHBhcnNlVG91Y2hFdmVudChldmVudCBhcyBUb3VjaEV2ZW50KSk7XHJcblxyXG4gICAgICBjYXNlICdnb3Rwb2ludGVyY2FwdHVyZSc6XHJcbiAgICAgIGNhc2UgJ2xvc3Rwb2ludGVyY2FwdHVyZSc6XHJcbiAgICAgIGNhc2UgJ3BvaW50ZXJjYW5jZWwnOlxyXG4gICAgICBjYXNlICdwb2ludGVyZG93bic6XHJcbiAgICAgIGNhc2UgJ3BvaW50ZXJlbnRlcic6XHJcbiAgICAgIGNhc2UgJ3BvaW50ZXJsZWF2ZSc6XHJcbiAgICAgIGNhc2UgJ3BvaW50ZXJtb3ZlJzpcclxuICAgICAgY2FzZSAncG9pbnRlcm91dCc6XHJcbiAgICAgIGNhc2UgJ3BvaW50ZXJvdmVyJzpcclxuICAgICAgY2FzZSAncG9pbnRlcnVwJzpcclxuICAgICAgICByZXR1cm4gbmV3IEV2ZW50Rm9yRG90TmV0PFVJUG9pbnRlckV2ZW50QXJncz4oJ3BvaW50ZXInLCBwYXJzZVBvaW50ZXJFdmVudChldmVudCBhcyBQb2ludGVyRXZlbnQpKTtcclxuXHJcbiAgICAgIGNhc2UgJ3doZWVsJzpcclxuICAgICAgY2FzZSAnbW91c2V3aGVlbCc6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFdmVudEZvckRvdE5ldDxVSVdoZWVsRXZlbnRBcmdzPignd2hlZWwnLCBwYXJzZVdoZWVsRXZlbnQoZXZlbnQgYXMgV2hlZWxFdmVudCkpO1xyXG5cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gbmV3IEV2ZW50Rm9yRG90TmV0PFVJRXZlbnRBcmdzPigndW5rbm93bicsIHsgdHlwZTogZXZlbnQudHlwZSB9KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlRHJhZ0V2ZW50KGV2ZW50OiBhbnkpIHtcclxuICByZXR1cm4ge1xyXG4gICAgLi4ucGFyc2VNb3VzZUV2ZW50KGV2ZW50KSxcclxuICAgIGRhdGFUcmFuc2ZlcjogZXZlbnQuZGF0YVRyYW5zZmVyLFxyXG5cclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZVdoZWVsRXZlbnQoZXZlbnQ6IFdoZWVsRXZlbnQpIHtcclxuICByZXR1cm4ge1xyXG4gICAgLi4ucGFyc2VNb3VzZUV2ZW50KGV2ZW50KSxcclxuICAgIGRlbHRhWDogZXZlbnQuZGVsdGFYLFxyXG4gICAgZGVsdGFZOiBldmVudC5kZWx0YVksXHJcbiAgICBkZWx0YVo6IGV2ZW50LmRlbHRhWixcclxuICAgIGRlbHRhTW9kZTogZXZlbnQuZGVsdGFNb2RlLFxyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlRXJyb3JFdmVudChldmVudDogRXJyb3JFdmVudCkge1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBldmVudC50eXBlLFxyXG4gICAgbWVzc2FnZTogZXZlbnQubWVzc2FnZSxcclxuICAgIGZpbGVuYW1lOiBldmVudC5maWxlbmFtZSxcclxuICAgIGxpbmVubzogZXZlbnQubGluZW5vLFxyXG4gICAgY29sbm86IGV2ZW50LmNvbG5vLFxyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlUHJvZ3Jlc3NFdmVudChldmVudDogUHJvZ3Jlc3NFdmVudCkge1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBldmVudC50eXBlLFxyXG4gICAgbGVuZ3RoQ29tcHV0YWJsZTogZXZlbnQubGVuZ3RoQ29tcHV0YWJsZSxcclxuICAgIGxvYWRlZDogZXZlbnQubG9hZGVkLFxyXG4gICAgdG90YWw6IGV2ZW50LnRvdGFsLFxyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlVG91Y2hFdmVudChldmVudDogVG91Y2hFdmVudCkge1xyXG5cclxuICBmdW5jdGlvbiBwYXJzZVRvdWNoKHRvdWNoTGlzdDogVG91Y2hMaXN0KSB7XHJcbiAgICBjb25zdCB0b3VjaGVzOiBVSVRvdWNoUG9pbnRbXSA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG91Y2hMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHRvdWNoID0gdG91Y2hMaXN0W2ldO1xyXG4gICAgICB0b3VjaGVzLnB1c2goe1xyXG4gICAgICAgIGlkZW50aWZpZXI6IHRvdWNoLmlkZW50aWZpZXIsXHJcbiAgICAgICAgY2xpZW50WDogdG91Y2guY2xpZW50WCxcclxuICAgICAgICBjbGllbnRZOiB0b3VjaC5jbGllbnRZLFxyXG4gICAgICAgIHNjcmVlblg6IHRvdWNoLnNjcmVlblgsXHJcbiAgICAgICAgc2NyZWVuWTogdG91Y2guc2NyZWVuWSxcclxuICAgICAgICBwYWdlWDogdG91Y2gucGFnZVgsXHJcbiAgICAgICAgcGFnZVk6IHRvdWNoLnBhZ2VZLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB0b3VjaGVzO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IGV2ZW50LnR5cGUsXHJcbiAgICBkZXRhaWw6IGV2ZW50LmRldGFpbCxcclxuICAgIHRvdWNoZXM6IHBhcnNlVG91Y2goZXZlbnQudG91Y2hlcyksXHJcbiAgICB0YXJnZXRUb3VjaGVzOiBwYXJzZVRvdWNoKGV2ZW50LnRhcmdldFRvdWNoZXMpLFxyXG4gICAgY2hhbmdlZFRvdWNoZXM6IHBhcnNlVG91Y2goZXZlbnQuY2hhbmdlZFRvdWNoZXMpLFxyXG4gICAgY3RybEtleTogZXZlbnQuY3RybEtleSxcclxuICAgIHNoaWZ0S2V5OiBldmVudC5zaGlmdEtleSxcclxuICAgIGFsdEtleTogZXZlbnQuYWx0S2V5LFxyXG4gICAgbWV0YUtleTogZXZlbnQubWV0YUtleSxcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZUtleWJvYXJkRXZlbnQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogZXZlbnQudHlwZSxcclxuICAgIGtleTogZXZlbnQua2V5LFxyXG4gICAgY29kZTogZXZlbnQuY29kZSxcclxuICAgIGxvY2F0aW9uOiBldmVudC5sb2NhdGlvbixcclxuICAgIHJlcGVhdDogZXZlbnQucmVwZWF0LFxyXG4gICAgY3RybEtleTogZXZlbnQuY3RybEtleSxcclxuICAgIHNoaWZ0S2V5OiBldmVudC5zaGlmdEtleSxcclxuICAgIGFsdEtleTogZXZlbnQuYWx0S2V5LFxyXG4gICAgbWV0YUtleTogZXZlbnQubWV0YUtleSxcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZVBvaW50ZXJFdmVudChldmVudDogUG9pbnRlckV2ZW50KSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLnBhcnNlTW91c2VFdmVudChldmVudCksXHJcbiAgICBwb2ludGVySWQ6IGV2ZW50LnBvaW50ZXJJZCxcclxuICAgIHdpZHRoOiBldmVudC53aWR0aCxcclxuICAgIGhlaWdodDogZXZlbnQuaGVpZ2h0LFxyXG4gICAgcHJlc3N1cmU6IGV2ZW50LnByZXNzdXJlLFxyXG4gICAgdGlsdFg6IGV2ZW50LnRpbHRYLFxyXG4gICAgdGlsdFk6IGV2ZW50LnRpbHRZLFxyXG4gICAgcG9pbnRlclR5cGU6IGV2ZW50LnBvaW50ZXJUeXBlLFxyXG4gICAgaXNQcmltYXJ5OiBldmVudC5pc1ByaW1hcnksXHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VNb3VzZUV2ZW50KGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IGV2ZW50LnR5cGUsXHJcbiAgICBkZXRhaWw6IGV2ZW50LmRldGFpbCxcclxuICAgIHNjcmVlblg6IGV2ZW50LnNjcmVlblgsXHJcbiAgICBzY3JlZW5ZOiBldmVudC5zY3JlZW5ZLFxyXG4gICAgY2xpZW50WDogZXZlbnQuY2xpZW50WCxcclxuICAgIGNsaWVudFk6IGV2ZW50LmNsaWVudFksXHJcbiAgICBidXR0b246IGV2ZW50LmJ1dHRvbixcclxuICAgIGJ1dHRvbnM6IGV2ZW50LmJ1dHRvbnMsXHJcbiAgICBjdHJsS2V5OiBldmVudC5jdHJsS2V5LFxyXG4gICAgc2hpZnRLZXk6IGV2ZW50LnNoaWZ0S2V5LFxyXG4gICAgYWx0S2V5OiBldmVudC5hbHRLZXksXHJcbiAgICBtZXRhS2V5OiBldmVudC5tZXRhS2V5LFxyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzQ2hlY2tib3goZWxlbWVudDogRWxlbWVudCB8IG51bGwpOiBib29sZWFuIHtcclxuICByZXR1cm4gISFlbGVtZW50ICYmIGVsZW1lbnQudGFnTmFtZSA9PT0gJ0lOUFVUJyAmJiBlbGVtZW50LmdldEF0dHJpYnV0ZSgndHlwZScpID09PSAnY2hlY2tib3gnO1xyXG59XHJcblxyXG5jb25zdCB0aW1lQmFzZWRJbnB1dHMgPSBbXHJcbiAgJ2RhdGUnLFxyXG4gICdkYXRldGltZS1sb2NhbCcsXHJcbiAgJ21vbnRoJyxcclxuICAndGltZScsXHJcbiAgJ3dlZWsnLFxyXG5dO1xyXG5cclxuZnVuY3Rpb24gaXNUaW1lQmFzZWRJbnB1dChlbGVtZW50OiBFbGVtZW50KTogZWxlbWVudCBpcyBIVE1MSW5wdXRFbGVtZW50IHtcclxuICByZXR1cm4gdGltZUJhc2VkSW5wdXRzLmluZGV4T2YoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKSEpICE9PSAtMTtcclxufVxyXG5cclxuZnVuY3Rpb24gbm9ybWFsaXplVGltZUJhc2VkVmFsdWUoZWxlbWVudDogSFRNTElucHV0RWxlbWVudCk6IHN0cmluZyB7XHJcbiAgY29uc3QgdmFsdWUgPSBlbGVtZW50LnZhbHVlO1xyXG4gIGNvbnN0IHR5cGUgPSBlbGVtZW50LnR5cGU7XHJcbiAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICBjYXNlICdkYXRlJzpcclxuICAgIGNhc2UgJ2RhdGV0aW1lLWxvY2FsJzpcclxuICAgIGNhc2UgJ21vbnRoJzpcclxuICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgY2FzZSAndGltZSc6XHJcbiAgICAgIHJldHVybiB2YWx1ZS5sZW5ndGggPT09IDUgPyB2YWx1ZSArICc6MDAnIDogdmFsdWU7IC8vIENvbnZlcnQgaGg6bW0gdG8gaGg6bW06MDBcclxuICAgIGNhc2UgJ3dlZWsnOlxyXG4gICAgICAvLyBGb3Igbm93IHdlIGFyZSBub3QgZ29pbmcgdG8gbm9ybWFsaXplIGlucHV0IHR5cGUgd2VlayBhcyBpdCBpcyBub3QgdHJpdmlhbFxyXG4gICAgICByZXR1cm4gdmFsdWU7XHJcbiAgfVxyXG5cclxuICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgZWxlbWVudCB0eXBlICcke3R5cGV9Jy5gKTtcclxufVxyXG5cclxuLy8gVGhlIGZvbGxvd2luZyBpbnRlcmZhY2VzIG11c3QgYmUga2VwdCBpbiBzeW5jIHdpdGggdGhlIFVJRXZlbnRBcmdzIEMjIGNsYXNzZXNcclxuXHJcbmV4cG9ydCB0eXBlIEV2ZW50QXJnc1R5cGUgPSAnY2hhbmdlJyB8ICdjbGlwYm9hcmQnIHwgJ2RyYWcnIHwgJ2Vycm9yJyB8ICdmb2N1cycgfCAna2V5Ym9hcmQnIHwgJ21vdXNlJyB8ICdwb2ludGVyJyB8ICdwcm9ncmVzcycgfCAndG91Y2gnIHwgJ3Vua25vd24nIHwgJ3doZWVsJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVUlFdmVudEFyZ3Mge1xyXG4gIHR5cGU6IHN0cmluZztcclxufVxyXG5cclxuaW50ZXJmYWNlIFVJQ2hhbmdlRXZlbnRBcmdzIGV4dGVuZHMgVUlFdmVudEFyZ3Mge1xyXG4gIHZhbHVlOiBzdHJpbmcgfCBib29sZWFuO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgVUlDbGlwYm9hcmRFdmVudEFyZ3MgZXh0ZW5kcyBVSUV2ZW50QXJncyB7XHJcbn1cclxuXHJcbmludGVyZmFjZSBVSURyYWdFdmVudEFyZ3MgZXh0ZW5kcyBVSUV2ZW50QXJncyB7XHJcbiAgZGV0YWlsOiBudW1iZXI7XHJcbiAgZGF0YVRyYW5zZmVyOiBVSURhdGFUcmFuc2ZlcjtcclxuICBzY3JlZW5YOiBudW1iZXI7XHJcbiAgc2NyZWVuWTogbnVtYmVyO1xyXG4gIGNsaWVudFg6IG51bWJlcjtcclxuICBjbGllbnRZOiBudW1iZXI7XHJcbiAgYnV0dG9uOiBudW1iZXI7XHJcbiAgYnV0dG9uczogbnVtYmVyO1xyXG4gIGN0cmxLZXk6IGJvb2xlYW47XHJcbiAgc2hpZnRLZXk6IGJvb2xlYW47XHJcbiAgYWx0S2V5OiBib29sZWFuO1xyXG4gIG1ldGFLZXk6IGJvb2xlYW47XHJcbn1cclxuXHJcbmludGVyZmFjZSBVSURhdGFUcmFuc2ZlciB7XHJcbiAgZHJvcEVmZmVjdDogc3RyaW5nO1xyXG4gIGVmZmVjdEFsbG93ZWQ6IHN0cmluZztcclxuICBmaWxlczogc3RyaW5nW107XHJcbiAgaXRlbXM6IFVJRGF0YVRyYW5zZmVySXRlbVtdO1xyXG4gIHR5cGVzOiBzdHJpbmdbXTtcclxufVxyXG5cclxuaW50ZXJmYWNlIFVJRGF0YVRyYW5zZmVySXRlbSB7XHJcbiAga2luZDogc3RyaW5nO1xyXG4gIHR5cGU6IHN0cmluZztcclxufVxyXG5cclxuaW50ZXJmYWNlIFVJRXJyb3JFdmVudEFyZ3MgZXh0ZW5kcyBVSUV2ZW50QXJncyB7XHJcbiAgbWVzc2FnZTogc3RyaW5nO1xyXG4gIGZpbGVuYW1lOiBzdHJpbmc7XHJcbiAgbGluZW5vOiBudW1iZXI7XHJcbiAgY29sbm86IG51bWJlcjtcclxuXHJcbiAgLy8gb21pdHRpbmcgJ2Vycm9yJyBoZXJlIHNpbmNlIHdlJ2QgaGF2ZSB0byBzZXJpYWxpemUgaXQsIGFuZCBpdCdzIG5vdCBjbGVhciB3ZSB3aWxsIHdhbnQgdG9cclxuICAvLyBkbyB0aGF0LiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRXJyb3JFdmVudFxyXG59XHJcblxyXG5pbnRlcmZhY2UgVUlGb2N1c0V2ZW50QXJncyBleHRlbmRzIFVJRXZlbnRBcmdzIHtcclxufVxyXG5cclxuaW50ZXJmYWNlIFVJS2V5Ym9hcmRFdmVudEFyZ3MgZXh0ZW5kcyBVSUV2ZW50QXJncyB7XHJcbiAga2V5OiBzdHJpbmc7XHJcbiAgY29kZTogc3RyaW5nO1xyXG4gIGxvY2F0aW9uOiBudW1iZXI7XHJcbiAgcmVwZWF0OiBib29sZWFuO1xyXG4gIGN0cmxLZXk6IGJvb2xlYW47XHJcbiAgc2hpZnRLZXk6IGJvb2xlYW47XHJcbiAgYWx0S2V5OiBib29sZWFuO1xyXG4gIG1ldGFLZXk6IGJvb2xlYW47XHJcbn1cclxuXHJcbmludGVyZmFjZSBVSU1vdXNlRXZlbnRBcmdzIGV4dGVuZHMgVUlFdmVudEFyZ3Mge1xyXG4gIGRldGFpbDogbnVtYmVyO1xyXG4gIHNjcmVlblg6IG51bWJlcjtcclxuICBzY3JlZW5ZOiBudW1iZXI7XHJcbiAgY2xpZW50WDogbnVtYmVyO1xyXG4gIGNsaWVudFk6IG51bWJlcjtcclxuICBidXR0b246IG51bWJlcjtcclxuICBidXR0b25zOiBudW1iZXI7XHJcbiAgY3RybEtleTogYm9vbGVhbjtcclxuICBzaGlmdEtleTogYm9vbGVhbjtcclxuICBhbHRLZXk6IGJvb2xlYW47XHJcbiAgbWV0YUtleTogYm9vbGVhbjtcclxufVxyXG5cclxuaW50ZXJmYWNlIFVJUG9pbnRlckV2ZW50QXJncyBleHRlbmRzIFVJTW91c2VFdmVudEFyZ3Mge1xyXG4gIHBvaW50ZXJJZDogbnVtYmVyO1xyXG4gIHdpZHRoOiBudW1iZXI7XHJcbiAgaGVpZ2h0OiBudW1iZXI7XHJcbiAgcHJlc3N1cmU6IG51bWJlcjtcclxuICB0aWx0WDogbnVtYmVyO1xyXG4gIHRpbHRZOiBudW1iZXI7XHJcbiAgcG9pbnRlclR5cGU6IHN0cmluZztcclxuICBpc1ByaW1hcnk6IGJvb2xlYW47XHJcbn1cclxuXHJcbmludGVyZmFjZSBVSVByb2dyZXNzRXZlbnRBcmdzIGV4dGVuZHMgVUlFdmVudEFyZ3Mge1xyXG4gIGxlbmd0aENvbXB1dGFibGU6IGJvb2xlYW47XHJcbiAgbG9hZGVkOiBudW1iZXI7XHJcbiAgdG90YWw6IG51bWJlcjtcclxufVxyXG5cclxuaW50ZXJmYWNlIFVJVG91Y2hFdmVudEFyZ3MgZXh0ZW5kcyBVSUV2ZW50QXJncyB7XHJcbiAgZGV0YWlsOiBudW1iZXI7XHJcbiAgdG91Y2hlczogVUlUb3VjaFBvaW50W107XHJcbiAgdGFyZ2V0VG91Y2hlczogVUlUb3VjaFBvaW50W107XHJcbiAgY2hhbmdlZFRvdWNoZXM6IFVJVG91Y2hQb2ludFtdO1xyXG4gIGN0cmxLZXk6IGJvb2xlYW47XHJcbiAgc2hpZnRLZXk6IGJvb2xlYW47XHJcbiAgYWx0S2V5OiBib29sZWFuO1xyXG4gIG1ldGFLZXk6IGJvb2xlYW47XHJcbn1cclxuXHJcbmludGVyZmFjZSBVSVRvdWNoUG9pbnQge1xyXG4gIGlkZW50aWZpZXI6IG51bWJlcjtcclxuICBzY3JlZW5YOiBudW1iZXI7XHJcbiAgc2NyZWVuWTogbnVtYmVyO1xyXG4gIGNsaWVudFg6IG51bWJlcjtcclxuICBjbGllbnRZOiBudW1iZXI7XHJcbiAgcGFnZVg6IG51bWJlcjtcclxuICBwYWdlWTogbnVtYmVyO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgVUlXaGVlbEV2ZW50QXJncyBleHRlbmRzIFVJTW91c2VFdmVudEFyZ3Mge1xyXG4gIGRlbHRhWDogbnVtYmVyO1xyXG4gIGRlbHRhWTogbnVtYmVyO1xyXG4gIGRlbHRhWjogbnVtYmVyO1xyXG4gIGRlbHRhTW9kZTogbnVtYmVyO1xyXG59XHJcbiIsIi8qXHJcbiAgQSBMb2dpY2FsRWxlbWVudCBwbGF5cyB0aGUgc2FtZSByb2xlIGFzIGFuIEVsZW1lbnQgaW5zdGFuY2UgZnJvbSB0aGUgcG9pbnQgb2YgdmlldyBvZiB0aGVcclxuICBBUEkgY29uc3VtZXIuIEluc2VydGluZyBhbmQgcmVtb3ZpbmcgbG9naWNhbCBlbGVtZW50cyB1cGRhdGVzIHRoZSBicm93c2VyIERPTSBqdXN0IHRoZSBzYW1lLlxyXG5cclxuICBUaGUgZGlmZmVyZW5jZSBpcyB0aGF0LCB1bmxpa2UgcmVndWxhciBET00gbXV0YXRpb24gQVBJcywgdGhlIExvZ2ljYWxFbGVtZW50IEFQSXMgZG9uJ3QgdXNlXHJcbiAgdGhlIHVuZGVybHlpbmcgRE9NIHN0cnVjdHVyZSBhcyB0aGUgZGF0YSBzdG9yYWdlIGZvciB0aGUgZWxlbWVudCBoaWVyYXJjaHkuIEluc3RlYWQsIHRoZVxyXG4gIExvZ2ljYWxFbGVtZW50IEFQSXMgdGFrZSBjYXJlIG9mIHRyYWNraW5nIGhpZXJhcmNoaWNhbCByZWxhdGlvbnNoaXBzIHNlcGFyYXRlbHkuIFRoZSBwb2ludFxyXG4gIG9mIHRoaXMgaXMgdG8gcGVybWl0IGEgbG9naWNhbCB0cmVlIHN0cnVjdHVyZSBpbiB3aGljaCBwYXJlbnQvY2hpbGQgcmVsYXRpb25zaGlwcyBkb24ndFxyXG4gIGhhdmUgdG8gYmUgbWF0ZXJpYWxpemVkIGluIHRlcm1zIG9mIERPTSBlbGVtZW50IHBhcmVudC9jaGlsZCByZWxhdGlvbnNoaXBzLiBBbmQgdGhlIHJlYXNvblxyXG4gIHdoeSB3ZSB3YW50IHRoYXQgaXMgc28gdGhhdCBoaWVyYXJjaGllcyBvZiBCbGF6b3IgY29tcG9uZW50cyBjYW4gYmUgdHJhY2tlZCBldmVuIHdoZW4gdGhvc2VcclxuICBjb21wb25lbnRzJyByZW5kZXIgb3V0cHV0IG5lZWQgbm90IGJlIGEgc2luZ2xlIGxpdGVyYWwgRE9NIGVsZW1lbnQuXHJcblxyXG4gIENvbnN1bWVycyBvZiB0aGUgQVBJIGRvbid0IG5lZWQgdG8ga25vdyBhYm91dCB0aGUgaW1wbGVtZW50YXRpb24sIGJ1dCBob3cgaXQncyBkb25lIGlzOlxyXG4gIC0gRWFjaCBMb2dpY2FsRWxlbWVudCBpcyBtYXRlcmlhbGl6ZWQgaW4gdGhlIERPTSBhcyBlaXRoZXI6XHJcbiAgICAtIEEgTm9kZSBpbnN0YW5jZSwgZm9yIGFjdHVhbCBOb2RlIGluc3RhbmNlcyBpbnNlcnRlZCB1c2luZyAnaW5zZXJ0TG9naWNhbENoaWxkJyBvclxyXG4gICAgICBmb3IgRWxlbWVudCBpbnN0YW5jZXMgcHJvbW90ZWQgdG8gTG9naWNhbEVsZW1lbnQgdmlhICd0b0xvZ2ljYWxFbGVtZW50J1xyXG4gICAgLSBBIENvbW1lbnQgaW5zdGFuY2UsIGZvciAnbG9naWNhbCBjb250YWluZXInIGluc3RhbmNlcyBpbnNlcnRlZCB1c2luZyAnY3JlYXRlQW5kSW5zZXJ0TG9naWNhbENvbnRhaW5lcidcclxuICAtIFRoZW4sIG9uIHRoYXQgaW5zdGFuY2UgKGkuZS4sIHRoZSBOb2RlIG9yIENvbW1lbnQpLCB3ZSBzdG9yZSBhbiBhcnJheSBvZiAnbG9naWNhbCBjaGlsZHJlbidcclxuICAgIGluc3RhbmNlcywgZS5nLixcclxuICAgICAgW2ZpcnN0Q2hpbGQsIHNlY29uZENoaWxkLCB0aGlyZENoaWxkLCAuLi5dXHJcbiAgICAuLi4gcGx1cyB3ZSBzdG9yZSBhIHJlZmVyZW5jZSB0byB0aGUgJ2xvZ2ljYWwgcGFyZW50JyAoaWYgYW55KVxyXG4gIC0gVGhlICdsb2dpY2FsIGNoaWxkcmVuJyBhcnJheSBtZWFucyB3ZSBjYW4gbG9vayB1cCBpbiBPKDEpOlxyXG4gICAgLSBUaGUgbnVtYmVyIG9mIGxvZ2ljYWwgY2hpbGRyZW4gKG5vdCBjdXJyZW50bHkgaW1wbGVtZW50ZWQgYmVjYXVzZSBub3QgcmVxdWlyZWQsIGJ1dCB0cml2aWFsKVxyXG4gICAgLSBUaGUgbG9naWNhbCBjaGlsZCBhdCBhbnkgZ2l2ZW4gaW5kZXhcclxuICAtIFdoZW5ldmVyIGEgbG9naWNhbCBjaGlsZCBpcyBhZGRlZCBvciByZW1vdmVkLCB3ZSB1cGRhdGUgdGhlIHBhcmVudCdzIGFycmF5IG9mIGxvZ2ljYWwgY2hpbGRyZW5cclxuKi9cclxuXHJcbmNvbnN0IGxvZ2ljYWxDaGlsZHJlblByb3BuYW1lID0gY3JlYXRlU3ltYm9sT3JGYWxsYmFjaygnX2JsYXpvckxvZ2ljYWxDaGlsZHJlbicpO1xyXG5jb25zdCBsb2dpY2FsUGFyZW50UHJvcG5hbWUgPSBjcmVhdGVTeW1ib2xPckZhbGxiYWNrKCdfYmxhem9yTG9naWNhbFBhcmVudCcpO1xyXG5jb25zdCBsb2dpY2FsRW5kU2libGluZ1Byb3BuYW1lID0gY3JlYXRlU3ltYm9sT3JGYWxsYmFjaygnX2JsYXpvckxvZ2ljYWxFbmQnKTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0b0xvZ2ljYWxSb290Q29tbWVudEVsZW1lbnQoc3RhcnQ6IENvbW1lbnQsIGVuZDogQ29tbWVudCk6IExvZ2ljYWxFbGVtZW50IHtcclxuICAvLyBOb3cgdGhhdCB3ZSBzdXBwb3J0IHN0YXJ0L2VuZCBjb21tZW50cyBhcyBjb21wb25lbnQgZGVsaW1pdGVycyB3ZSBhcmUgZ29pbmcgdG8gYmUgc2V0dGluZyB1cFxyXG4gIC8vIGFkZGluZyB0aGUgY29tcG9uZW50cyByZW5kZXJlZCBvdXRwdXQgYXMgc2libGluZ3Mgb2YgdGhlIHN0YXJ0L2VuZCB0YWdzIChiZXR3ZWVuKS5cclxuICAvLyBGb3IgdGhhdCB0byB3b3JrLCB3ZSBuZWVkIHRvIGFwcHJvcHJpYXRlbHkgY29uZmlndXJlIHRoZSBwYXJlbnQgZWxlbWVudCB0byBiZSBhIGxvZ2ljYWwgZWxlbWVudFxyXG4gIC8vIHdpdGggYWxsIHRoZWlyIGNoaWxkcmVuIGJlaW5nIHRoZSBjaGlsZCBlbGVtZW50cy5cclxuICAvLyBGb3IgZXhhbXBsZSwgaW1hZ2luZSB5b3UgaGF2ZVxyXG4gIC8vIDxhcHA+XHJcbiAgLy8gPGRpdj48cD5TdGF0aWMgY29udGVudDwvcD48L2Rpdj5cclxuICAvLyA8IS0tIHN0YXJ0IGNvbXBvbmVudFxyXG4gIC8vIDwhLS0gZW5kIGNvbXBvbmVudFxyXG4gIC8vIDxmb290ZXI+U29tZSBvdGhlciBjb250ZW50PC9mb290ZXI+XHJcbiAgLy8gPGFwcD5cclxuICAvLyBXZSB3YW50IHRoZSBwYXJlbnQgZWxlbWVudCB0byBiZSBzb21ldGhpbmcgbGlrZVxyXG4gIC8vICphcHBcclxuICAvLyB8LSAqZGl2XHJcbiAgLy8gfC0gKmNvbXBvbmVudFxyXG4gIC8vIHwtICpmb290ZXJcclxuICBpZiAoIXN0YXJ0LnBhcmVudE5vZGUpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgQ29tbWVudCBub3QgY29ubmVjdGVkIHRvIHRoZSBET00gJHtzdGFydC50ZXh0Q29udGVudH1gKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBhcmVudCA9IHN0YXJ0LnBhcmVudE5vZGU7XHJcbiAgY29uc3QgcGFyZW50TG9naWNhbEVsZW1lbnQgPSB0b0xvZ2ljYWxFbGVtZW50KHBhcmVudCwgLyogYWxsb3cgZXhpc3RpbmcgY29udGVudHMgKi8gdHJ1ZSk7XHJcbiAgY29uc3QgY2hpbGRyZW4gPSBnZXRMb2dpY2FsQ2hpbGRyZW5BcnJheShwYXJlbnRMb2dpY2FsRWxlbWVudCk7XHJcbiAgQXJyYXkuZnJvbShwYXJlbnQuY2hpbGROb2RlcykuZm9yRWFjaChuID0+IGNoaWxkcmVuLnB1c2gobiBhcyB1bmtub3duIGFzIExvZ2ljYWxFbGVtZW50KSk7XHJcbiAgc3RhcnRbbG9naWNhbFBhcmVudFByb3BuYW1lXSA9IHBhcmVudExvZ2ljYWxFbGVtZW50O1xyXG4gIC8vIFdlIG1pZ2h0IG5vdCBoYXZlIGFuIGVuZCBjb21tZW50IGluIHRoZSBjYXNlIG9mIG5vbi1wcmVyZW5kZXJlZCBjb21wb25lbnRzLlxyXG4gIGlmIChlbmQpIHtcclxuICAgIHN0YXJ0W2xvZ2ljYWxFbmRTaWJsaW5nUHJvcG5hbWVdID0gZW5kO1xyXG4gICAgdG9Mb2dpY2FsRWxlbWVudChlbmQsIC8qIGFsbG93RXhpc3Rpbmdjb250ZW50cyAqLyB0cnVlKTtcclxuICB9XHJcbiAgcmV0dXJuIHRvTG9naWNhbEVsZW1lbnQoc3RhcnQsIC8qIGFsbG93RXhpc3RpbmdDb250ZW50cyAqLyB0cnVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRvTG9naWNhbEVsZW1lbnQoZWxlbWVudDogTm9kZSwgYWxsb3dFeGlzdGluZ0NvbnRlbnRzPzogYm9vbGVhbik6IExvZ2ljYWxFbGVtZW50IHtcclxuICAvLyBOb3JtYWxseSBpdCdzIGdvb2QgdG8gYXNzZXJ0IHRoYXQgdGhlIGVsZW1lbnQgaGFzIHN0YXJ0ZWQgZW1wdHksIGJlY2F1c2UgdGhhdCdzIHRoZSB1c3VhbFxyXG4gIC8vIHNpdHVhdGlvbiBhbmQgd2UgcHJvYmFibHkgaGF2ZSBhIGJ1ZyBpZiBpdCdzIG5vdC4gQnV0IGZvciB0aGUgZWxlbWVudCB0aGF0IGNvbnRhaW4gcHJlcmVuZGVyZWRcclxuICAvLyByb290IGNvbXBvbmVudHMsIHdlIHdhbnQgdG8gbGV0IHRoZW0ga2VlcCB0aGVpciBjb250ZW50IHVudGlsIHdlIHJlcGxhY2UgaXQuXHJcbiAgaWYgKGVsZW1lbnQuY2hpbGROb2Rlcy5sZW5ndGggPiAwICYmICFhbGxvd0V4aXN0aW5nQ29udGVudHMpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignTmV3IGxvZ2ljYWwgZWxlbWVudHMgbXVzdCBzdGFydCBlbXB0eSwgb3IgYWxsb3dFeGlzdGluZ0NvbnRlbnRzIG11c3QgYmUgdHJ1ZScpO1xyXG4gIH1cclxuXHJcbiAgZWxlbWVudFtsb2dpY2FsQ2hpbGRyZW5Qcm9wbmFtZV0gPSBbXTtcclxuICByZXR1cm4gZWxlbWVudCBhcyB1bmtub3duIGFzIExvZ2ljYWxFbGVtZW50O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQW5kSW5zZXJ0TG9naWNhbENvbnRhaW5lcihwYXJlbnQ6IExvZ2ljYWxFbGVtZW50LCBjaGlsZEluZGV4OiBudW1iZXIpOiBMb2dpY2FsRWxlbWVudCB7XHJcbiAgY29uc3QgY29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoJyEnKTtcclxuICBpbnNlcnRMb2dpY2FsQ2hpbGQoY29udGFpbmVyRWxlbWVudCwgcGFyZW50LCBjaGlsZEluZGV4KTtcclxuICByZXR1cm4gY29udGFpbmVyRWxlbWVudCBhcyBhbnkgYXMgTG9naWNhbEVsZW1lbnQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnRMb2dpY2FsQ2hpbGQoY2hpbGQ6IE5vZGUsIHBhcmVudDogTG9naWNhbEVsZW1lbnQsIGNoaWxkSW5kZXg6IG51bWJlcikge1xyXG4gIGNvbnN0IGNoaWxkQXNMb2dpY2FsRWxlbWVudCA9IGNoaWxkIGFzIGFueSBhcyBMb2dpY2FsRWxlbWVudDtcclxuICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBDb21tZW50KSB7XHJcbiAgICBjb25zdCBleGlzdGluZ0dyYW5kY2hpbGRyZW4gPSBnZXRMb2dpY2FsQ2hpbGRyZW5BcnJheShjaGlsZEFzTG9naWNhbEVsZW1lbnQpO1xyXG4gICAgaWYgKGV4aXN0aW5nR3JhbmRjaGlsZHJlbiAmJiBnZXRMb2dpY2FsQ2hpbGRyZW5BcnJheShjaGlsZEFzTG9naWNhbEVsZW1lbnQpLmxlbmd0aCA+IDApIHtcclxuICAgICAgLy8gVGhlcmUncyBub3RoaW5nIHRvIHN0b3AgdXMgaW1wbGVtZW50aW5nIHN1cHBvcnQgZm9yIHRoaXMgc2NlbmFyaW8sIGFuZCBpdCdzIG5vdCBkaWZmaWN1bHRcclxuICAgICAgLy8gKGFmdGVyIGluc2VydGluZyAnY2hpbGQnIGl0c2VsZiwgYWxzbyBpdGVyYXRlIHRocm91Z2ggaXRzIGxvZ2ljYWwgY2hpbGRyZW4gYW5kIHBoeXNpY2FsbHlcclxuICAgICAgLy8gcHV0IHRoZW0gYXMgZm9sbG93aW5nLXNpYmxpbmdzIGluIHRoZSBET00pLiBIb3dldmVyIHRoZXJlJ3Mgbm8gc2NlbmFyaW8gdGhhdCByZXF1aXJlcyBpdFxyXG4gICAgICAvLyBwcmVzZW50bHksIHNvIGlmIHdlIGRpZCBpbXBsZW1lbnQgaXQgdGhlcmUnZCBiZSBubyBnb29kIHdheSB0byBoYXZlIHRlc3RzIGZvciBpdC5cclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQ6IGluc2VydGluZyBub24tZW1wdHkgbG9naWNhbCBjb250YWluZXInKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmIChnZXRMb2dpY2FsUGFyZW50KGNoaWxkQXNMb2dpY2FsRWxlbWVudCkpIHtcclxuICAgIC8vIExpa2V3aXNlLCB3ZSBjb3VsZCBlYXNpbHkgc3VwcG9ydCB0aGlzIHNjZW5hcmlvIHRvbyAoaW4gdGhpcyAnaWYnIGJsb2NrLCBqdXN0IHNwbGljZVxyXG4gICAgLy8gb3V0ICdjaGlsZCcgZnJvbSB0aGUgbG9naWNhbCBjaGlsZHJlbiBhcnJheSBvZiBpdHMgcHJldmlvdXMgbG9naWNhbCBwYXJlbnQgYnkgdXNpbmdcclxuICAgIC8vIEFycmF5LnByb3RvdHlwZS5pbmRleE9mIHRvIGRldGVybWluZSBpdHMgcHJldmlvdXMgc2libGluZyBpbmRleCkuXHJcbiAgICAvLyBCdXQgYWdhaW4sIHNpbmNlIHRoZXJlJ3Mgbm90IGN1cnJlbnRseSBhbnkgc2NlbmFyaW8gdGhhdCB3b3VsZCB1c2UgaXQsIHdlIHdvdWxkIG5vdFxyXG4gICAgLy8gaGF2ZSBhbnkgdGVzdCBjb3ZlcmFnZSBmb3Igc3VjaCBhbiBpbXBsZW1lbnRhdGlvbi5cclxuICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkOiBtb3ZpbmcgZXhpc3RpbmcgbG9naWNhbCBjaGlsZHJlbicpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbmV3U2libGluZ3MgPSBnZXRMb2dpY2FsQ2hpbGRyZW5BcnJheShwYXJlbnQpO1xyXG4gIGlmIChjaGlsZEluZGV4IDwgbmV3U2libGluZ3MubGVuZ3RoKSB7XHJcbiAgICAvLyBJbnNlcnRcclxuICAgIGNvbnN0IG5leHRTaWJsaW5nID0gbmV3U2libGluZ3NbY2hpbGRJbmRleF0gYXMgYW55IGFzIE5vZGU7XHJcbiAgICBuZXh0U2libGluZy5wYXJlbnROb2RlIS5pbnNlcnRCZWZvcmUoY2hpbGQsIG5leHRTaWJsaW5nKTtcclxuICAgIG5ld1NpYmxpbmdzLnNwbGljZShjaGlsZEluZGV4LCAwLCBjaGlsZEFzTG9naWNhbEVsZW1lbnQpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBBcHBlbmRcclxuICAgIGFwcGVuZERvbU5vZGUoY2hpbGQsIHBhcmVudCk7XHJcbiAgICBuZXdTaWJsaW5ncy5wdXNoKGNoaWxkQXNMb2dpY2FsRWxlbWVudCk7XHJcbiAgfVxyXG5cclxuICBjaGlsZEFzTG9naWNhbEVsZW1lbnRbbG9naWNhbFBhcmVudFByb3BuYW1lXSA9IHBhcmVudDtcclxuICBpZiAoIShsb2dpY2FsQ2hpbGRyZW5Qcm9wbmFtZSBpbiBjaGlsZEFzTG9naWNhbEVsZW1lbnQpKSB7XHJcbiAgICBjaGlsZEFzTG9naWNhbEVsZW1lbnRbbG9naWNhbENoaWxkcmVuUHJvcG5hbWVdID0gW107XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlTG9naWNhbENoaWxkKHBhcmVudDogTG9naWNhbEVsZW1lbnQsIGNoaWxkSW5kZXg6IG51bWJlcikge1xyXG4gIGNvbnN0IGNoaWxkcmVuQXJyYXkgPSBnZXRMb2dpY2FsQ2hpbGRyZW5BcnJheShwYXJlbnQpO1xyXG4gIGNvbnN0IGNoaWxkVG9SZW1vdmUgPSBjaGlsZHJlbkFycmF5LnNwbGljZShjaGlsZEluZGV4LCAxKVswXTtcclxuXHJcbiAgLy8gSWYgaXQncyBhIGxvZ2ljYWwgY29udGFpbmVyLCBhbHNvIHJlbW92ZSBpdHMgZGVzY2VuZGFudHNcclxuICBpZiAoY2hpbGRUb1JlbW92ZSBpbnN0YW5jZW9mIENvbW1lbnQpIHtcclxuICAgIGNvbnN0IGdyYW5kY2hpbGRyZW5BcnJheSA9IGdldExvZ2ljYWxDaGlsZHJlbkFycmF5KGNoaWxkVG9SZW1vdmUpO1xyXG4gICAgd2hpbGUgKGdyYW5kY2hpbGRyZW5BcnJheS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJlbW92ZUxvZ2ljYWxDaGlsZChjaGlsZFRvUmVtb3ZlLCAwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIEZpbmFsbHksIHJlbW92ZSB0aGUgbm9kZSBpdHNlbGZcclxuICBjb25zdCBkb21Ob2RlVG9SZW1vdmUgPSBjaGlsZFRvUmVtb3ZlIGFzIGFueSBhcyBOb2RlO1xyXG4gIGRvbU5vZGVUb1JlbW92ZS5wYXJlbnROb2RlIS5yZW1vdmVDaGlsZChkb21Ob2RlVG9SZW1vdmUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9naWNhbFBhcmVudChlbGVtZW50OiBMb2dpY2FsRWxlbWVudCk6IExvZ2ljYWxFbGVtZW50IHwgbnVsbCB7XHJcbiAgcmV0dXJuIChlbGVtZW50W2xvZ2ljYWxQYXJlbnRQcm9wbmFtZV0gYXMgTG9naWNhbEVsZW1lbnQpIHx8IG51bGw7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2dpY2FsU2libGluZ0VuZChlbGVtZW50OiBMb2dpY2FsRWxlbWVudCk6IExvZ2ljYWxFbGVtZW50IHwgbnVsbCB7XHJcbiAgcmV0dXJuIChlbGVtZW50W2xvZ2ljYWxFbmRTaWJsaW5nUHJvcG5hbWVdIGFzIExvZ2ljYWxFbGVtZW50KSB8fCBudWxsO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9naWNhbENoaWxkKHBhcmVudDogTG9naWNhbEVsZW1lbnQsIGNoaWxkSW5kZXg6IG51bWJlcik6IExvZ2ljYWxFbGVtZW50IHtcclxuICByZXR1cm4gZ2V0TG9naWNhbENoaWxkcmVuQXJyYXkocGFyZW50KVtjaGlsZEluZGV4XTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzU3ZnRWxlbWVudChlbGVtZW50OiBMb2dpY2FsRWxlbWVudCkge1xyXG4gIHJldHVybiBnZXRDbG9zZXN0RG9tRWxlbWVudChlbGVtZW50KS5uYW1lc3BhY2VVUkkgPT09ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2dpY2FsQ2hpbGRyZW5BcnJheShlbGVtZW50OiBMb2dpY2FsRWxlbWVudCkge1xyXG4gIHJldHVybiBlbGVtZW50W2xvZ2ljYWxDaGlsZHJlblByb3BuYW1lXSBhcyBMb2dpY2FsRWxlbWVudFtdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcGVybXV0ZUxvZ2ljYWxDaGlsZHJlbihwYXJlbnQ6IExvZ2ljYWxFbGVtZW50LCBwZXJtdXRhdGlvbkxpc3Q6IFBlcm11dGF0aW9uTGlzdEVudHJ5W10pIHtcclxuICAvLyBUaGUgcGVybXV0YXRpb25MaXN0IG11c3QgcmVwcmVzZW50IGEgdmFsaWQgcGVybXV0YXRpb24sIGkuZS4sIHRoZSBsaXN0IG9mICdmcm9tJyBpbmRpY2VzXHJcbiAgLy8gaXMgZGlzdGluY3QsIGFuZCB0aGUgbGlzdCBvZiAndG8nIGluZGljZXMgaXMgYSBwZXJtdXRhdGlvbiBvZiBpdC4gVGhlIGFsZ29yaXRobSBoZXJlXHJcbiAgLy8gcmVsaWVzIG9uIHRoYXQgYXNzdW1wdGlvbi5cclxuXHJcbiAgLy8gRWFjaCBvZiB0aGUgcGhhc2VzIGhlcmUgaGFzIHRvIGhhcHBlbiBzZXBhcmF0ZWx5LCBiZWNhdXNlIGVhY2ggb25lIGlzIGRlc2lnbmVkIG5vdCB0b1xyXG4gIC8vIGludGVyZmVyZSB3aXRoIHRoZSBpbmRpY2VzIG9yIERPTSBlbnRyaWVzIHVzZWQgYnkgc3Vic2VxdWVudCBwaGFzZXMuXHJcblxyXG4gIC8vIFBoYXNlIDE6IHRyYWNrIHdoaWNoIG5vZGVzIHdlIHdpbGwgbW92ZVxyXG4gIGNvbnN0IHNpYmxpbmdzID0gZ2V0TG9naWNhbENoaWxkcmVuQXJyYXkocGFyZW50KTtcclxuICBwZXJtdXRhdGlvbkxpc3QuZm9yRWFjaCgobGlzdEVudHJ5OiBQZXJtdXRhdGlvbkxpc3RFbnRyeVdpdGhUcmFja2luZ0RhdGEpID0+IHtcclxuICAgIGxpc3RFbnRyeS5tb3ZlUmFuZ2VTdGFydCA9IHNpYmxpbmdzW2xpc3RFbnRyeS5mcm9tU2libGluZ0luZGV4XTtcclxuICAgIGxpc3RFbnRyeS5tb3ZlUmFuZ2VFbmQgPSBmaW5kTGFzdERvbU5vZGVJblJhbmdlKGxpc3RFbnRyeS5tb3ZlUmFuZ2VTdGFydCk7XHJcbiAgfSk7XHJcblxyXG4gIC8vIFBoYXNlIDI6IGluc2VydCBtYXJrZXJzXHJcbiAgcGVybXV0YXRpb25MaXN0LmZvckVhY2goKGxpc3RFbnRyeTogUGVybXV0YXRpb25MaXN0RW50cnlXaXRoVHJhY2tpbmdEYXRhKSA9PiB7XHJcbiAgICBjb25zdCBtYXJrZXIgPSBsaXN0RW50cnkubW92ZVRvQmVmb3JlTWFya2VyID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCgnbWFya2VyJyk7XHJcbiAgICBjb25zdCBpbnNlcnRCZWZvcmVOb2RlID0gc2libGluZ3NbbGlzdEVudHJ5LnRvU2libGluZ0luZGV4ICsgMV0gYXMgYW55IGFzIE5vZGU7XHJcbiAgICBpZiAoaW5zZXJ0QmVmb3JlTm9kZSkge1xyXG4gICAgICBpbnNlcnRCZWZvcmVOb2RlLnBhcmVudE5vZGUhLmluc2VydEJlZm9yZShtYXJrZXIsIGluc2VydEJlZm9yZU5vZGUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYXBwZW5kRG9tTm9kZShtYXJrZXIsIHBhcmVudCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIFBoYXNlIDM6IG1vdmUgZGVzY2VuZGFudHMgJiByZW1vdmUgbWFya2Vyc1xyXG4gIHBlcm11dGF0aW9uTGlzdC5mb3JFYWNoKChsaXN0RW50cnk6IFBlcm11dGF0aW9uTGlzdEVudHJ5V2l0aFRyYWNraW5nRGF0YSkgPT4ge1xyXG4gICAgY29uc3QgaW5zZXJ0QmVmb3JlID0gbGlzdEVudHJ5Lm1vdmVUb0JlZm9yZU1hcmtlciE7XHJcbiAgICBjb25zdCBwYXJlbnREb21Ob2RlID0gaW5zZXJ0QmVmb3JlLnBhcmVudE5vZGUhO1xyXG4gICAgY29uc3QgZWxlbWVudFRvTW92ZSA9IGxpc3RFbnRyeS5tb3ZlUmFuZ2VTdGFydCE7XHJcbiAgICBjb25zdCBtb3ZlRW5kTm9kZSA9IGxpc3RFbnRyeS5tb3ZlUmFuZ2VFbmQhO1xyXG4gICAgbGV0IG5leHRUb01vdmUgPSBlbGVtZW50VG9Nb3ZlIGFzIGFueSBhcyBOb2RlIHwgbnVsbDtcclxuICAgIHdoaWxlIChuZXh0VG9Nb3ZlKSB7XHJcbiAgICAgIGNvbnN0IG5leHROZXh0ID0gbmV4dFRvTW92ZS5uZXh0U2libGluZztcclxuICAgICAgcGFyZW50RG9tTm9kZS5pbnNlcnRCZWZvcmUobmV4dFRvTW92ZSwgaW5zZXJ0QmVmb3JlKTtcclxuXHJcbiAgICAgIGlmIChuZXh0VG9Nb3ZlID09PSBtb3ZlRW5kTm9kZSkge1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5leHRUb01vdmUgPSBuZXh0TmV4dDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHBhcmVudERvbU5vZGUucmVtb3ZlQ2hpbGQoaW5zZXJ0QmVmb3JlKTtcclxuICB9KTtcclxuXHJcbiAgLy8gUGhhc2UgNDogdXBkYXRlIHNpYmxpbmdzIGluZGV4XHJcbiAgcGVybXV0YXRpb25MaXN0LmZvckVhY2goKGxpc3RFbnRyeTogUGVybXV0YXRpb25MaXN0RW50cnlXaXRoVHJhY2tpbmdEYXRhKSA9PiB7XHJcbiAgICBzaWJsaW5nc1tsaXN0RW50cnkudG9TaWJsaW5nSW5kZXhdID0gbGlzdEVudHJ5Lm1vdmVSYW5nZVN0YXJ0ITtcclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENsb3Nlc3REb21FbGVtZW50KGxvZ2ljYWxFbGVtZW50OiBMb2dpY2FsRWxlbWVudCkge1xyXG4gIGlmIChsb2dpY2FsRWxlbWVudCBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcclxuICAgIHJldHVybiBsb2dpY2FsRWxlbWVudDtcclxuICB9IGVsc2UgaWYgKGxvZ2ljYWxFbGVtZW50IGluc3RhbmNlb2YgQ29tbWVudCkge1xyXG4gICAgcmV0dXJuIGxvZ2ljYWxFbGVtZW50LnBhcmVudE5vZGUhIGFzIEVsZW1lbnQ7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignTm90IGEgdmFsaWQgbG9naWNhbCBlbGVtZW50Jyk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBlcm11dGF0aW9uTGlzdEVudHJ5IHtcclxuICBmcm9tU2libGluZ0luZGV4OiBudW1iZXIsXHJcbiAgdG9TaWJsaW5nSW5kZXg6IG51bWJlcixcclxufVxyXG5cclxuaW50ZXJmYWNlIFBlcm11dGF0aW9uTGlzdEVudHJ5V2l0aFRyYWNraW5nRGF0YSBleHRlbmRzIFBlcm11dGF0aW9uTGlzdEVudHJ5IHtcclxuICAvLyBUaGVzZSBleHRyYSBwcm9wZXJ0aWVzIGFyZSB1c2VkIGludGVybmFsbHkgd2hlbiBwcm9jZXNzaW5nIHRoZSBwZXJtdXRhdGlvbiBsaXN0XHJcbiAgbW92ZVJhbmdlU3RhcnQ/OiBMb2dpY2FsRWxlbWVudCxcclxuICBtb3ZlUmFuZ2VFbmQ/OiBOb2RlLFxyXG4gIG1vdmVUb0JlZm9yZU1hcmtlcj86IE5vZGUsXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldExvZ2ljYWxOZXh0U2libGluZyhlbGVtZW50OiBMb2dpY2FsRWxlbWVudCk6IExvZ2ljYWxFbGVtZW50IHwgbnVsbCB7XHJcbiAgY29uc3Qgc2libGluZ3MgPSBnZXRMb2dpY2FsQ2hpbGRyZW5BcnJheShnZXRMb2dpY2FsUGFyZW50KGVsZW1lbnQpISk7XHJcbiAgY29uc3Qgc2libGluZ0luZGV4ID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChzaWJsaW5ncywgZWxlbWVudCk7XHJcbiAgcmV0dXJuIHNpYmxpbmdzW3NpYmxpbmdJbmRleCArIDFdIHx8IG51bGw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGVuZERvbU5vZGUoY2hpbGQ6IE5vZGUsIHBhcmVudDogTG9naWNhbEVsZW1lbnQpIHtcclxuICAvLyBUaGlzIGZ1bmN0aW9uIG9ubHkgcHV0cyAnY2hpbGQnIGludG8gdGhlIERPTSBpbiB0aGUgcmlnaHQgcGxhY2UgcmVsYXRpdmUgdG8gJ3BhcmVudCdcclxuICAvLyBJdCBkb2VzIG5vdCB1cGRhdGUgdGhlIGxvZ2ljYWwgY2hpbGRyZW4gYXJyYXkgb2YgYW55dGhpbmdcclxuICBpZiAocGFyZW50IGluc3RhbmNlb2YgRWxlbWVudCkge1xyXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGNoaWxkKTtcclxuICB9IGVsc2UgaWYgKHBhcmVudCBpbnN0YW5jZW9mIENvbW1lbnQpIHtcclxuICAgIGNvbnN0IHBhcmVudExvZ2ljYWxOZXh0U2libGluZyA9IGdldExvZ2ljYWxOZXh0U2libGluZyhwYXJlbnQpIGFzIGFueSBhcyBOb2RlO1xyXG4gICAgaWYgKHBhcmVudExvZ2ljYWxOZXh0U2libGluZykge1xyXG4gICAgICAvLyBTaW5jZSB0aGUgcGFyZW50IGhhcyBhIGxvZ2ljYWwgbmV4dC1zaWJsaW5nLCBpdHMgYXBwZW5kZWQgY2hpbGQgZ29lcyByaWdodCBiZWZvcmUgdGhhdFxyXG4gICAgICBwYXJlbnRMb2dpY2FsTmV4dFNpYmxpbmcucGFyZW50Tm9kZSEuaW5zZXJ0QmVmb3JlKGNoaWxkLCBwYXJlbnRMb2dpY2FsTmV4dFNpYmxpbmcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gU2luY2UgdGhlIHBhcmVudCBoYXMgbm8gbG9naWNhbCBuZXh0LXNpYmxpbmcsIGtlZXAgcmVjdXJzaW5nIHVwd2FyZHMgdW50aWwgd2UgZmluZFxyXG4gICAgICAvLyBhIGxvZ2ljYWwgYW5jZXN0b3IgdGhhdCBkb2VzIGhhdmUgYSBuZXh0LXNpYmxpbmcgb3IgaXMgYSBwaHlzaWNhbCBlbGVtZW50LlxyXG4gICAgICBhcHBlbmREb21Ob2RlKGNoaWxkLCBnZXRMb2dpY2FsUGFyZW50KHBhcmVudCkhKTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgLy8gU2hvdWxkIG5ldmVyIGhhcHBlblxyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgYXBwZW5kIG5vZGUgYmVjYXVzZSB0aGUgcGFyZW50IGlzIG5vdCBhIHZhbGlkIGxvZ2ljYWwgZWxlbWVudC4gUGFyZW50OiAke3BhcmVudH1gKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIFJldHVybnMgdGhlIGZpbmFsIG5vZGUgKGluIGRlcHRoLWZpcnN0IGV2YWx1YXRpb24gb3JkZXIpIHRoYXQgaXMgYSBkZXNjZW5kYW50IG9mIHRoZSBsb2dpY2FsIGVsZW1lbnQuXHJcbi8vIEFzIHN1Y2gsIHRoZSBlbnRpcmUgc3VidHJlZSBpcyBiZXR3ZWVuICdlbGVtZW50JyBhbmQgJ2ZpbmRMYXN0RG9tTm9kZUluUmFuZ2UoZWxlbWVudCknIGluY2x1c2l2ZS5cclxuZnVuY3Rpb24gZmluZExhc3REb21Ob2RlSW5SYW5nZShlbGVtZW50OiBMb2dpY2FsRWxlbWVudCkge1xyXG4gIGlmIChlbGVtZW50IGluc3RhbmNlb2YgRWxlbWVudCkge1xyXG4gICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBjb25zdCBuZXh0U2libGluZyA9IGdldExvZ2ljYWxOZXh0U2libGluZyhlbGVtZW50KTtcclxuICBpZiAobmV4dFNpYmxpbmcpIHtcclxuICAgIC8vIFNpbXBsZSBjYXNlOiBub3QgdGhlIGxhc3QgbG9naWNhbCBzaWJsaW5nLCBzbyB0YWtlIHRoZSBub2RlIGJlZm9yZSB0aGUgbmV4dCBzaWJsaW5nXHJcbiAgICByZXR1cm4gKG5leHRTaWJsaW5nIGFzIGFueSBhcyBOb2RlKS5wcmV2aW91c1NpYmxpbmc7XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIEhhcmRlciBjYXNlOiB0aGVyZSdzIG5vIGxvZ2ljYWwgbmV4dC1zaWJsaW5nLCBzbyByZWN1cnNlIHVwd2FyZHMgdW50aWwgd2UgZmluZFxyXG4gICAgLy8gYSBsb2dpY2FsIGFuY2VzdG9yIHRoYXQgZG9lcyBoYXZlIG9uZSwgb3IgYSBwaHlzaWNhbCBlbGVtZW50XHJcbiAgICBjb25zdCBsb2dpY2FsUGFyZW50ID0gZ2V0TG9naWNhbFBhcmVudChlbGVtZW50KSE7XHJcbiAgICByZXR1cm4gbG9naWNhbFBhcmVudCBpbnN0YW5jZW9mIEVsZW1lbnRcclxuICAgICAgPyBsb2dpY2FsUGFyZW50Lmxhc3RDaGlsZFxyXG4gICAgICA6IGZpbmRMYXN0RG9tTm9kZUluUmFuZ2UobG9naWNhbFBhcmVudCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTeW1ib2xPckZhbGxiYWNrKGZhbGxiYWNrOiBzdHJpbmcpOiBzeW1ib2wgfCBzdHJpbmcge1xyXG4gIHJldHVybiB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nID8gU3ltYm9sKCkgOiBmYWxsYmFjaztcclxufVxyXG5cclxuLy8gTm9taW5hbCB0eXBlIHRvIHJlcHJlc2VudCBhIGxvZ2ljYWwgZWxlbWVudCB3aXRob3V0IG5lZWRpbmcgdG8gYWxsb2NhdGUgYW55IG9iamVjdCBmb3IgaW5zdGFuY2VzXHJcbmV4cG9ydCBpbnRlcmZhY2UgTG9naWNhbEVsZW1lbnQgeyBMb2dpY2FsRWxlbWVudF9fRE9fTk9UX0lNUExFTUVOVDogYW55IH1cclxuIiwiaW1wb3J0IHsgUmVuZGVyQmF0Y2gsIEFycmF5UmFuZ2UsIFJlbmRlclRyZWVEaWZmLCBBcnJheVZhbHVlcywgUmVuZGVyVHJlZUVkaXQsIEVkaXRUeXBlLCBGcmFtZVR5cGUsIFJlbmRlclRyZWVGcmFtZSwgUmVuZGVyVHJlZURpZmZSZWFkZXIsIFJlbmRlclRyZWVGcmFtZVJlYWRlciwgUmVuZGVyVHJlZUVkaXRSZWFkZXIsIEFycmF5UmFuZ2VSZWFkZXIsIEFycmF5QnVpbGRlclNlZ21lbnRSZWFkZXIsIEFycmF5QnVpbGRlclNlZ21lbnQgfSBmcm9tICcuL1JlbmRlckJhdGNoJztcclxuaW1wb3J0IHsgZGVjb2RlVXRmOCB9IGZyb20gJy4vVXRmOERlY29kZXInO1xyXG5cclxuY29uc3QgdXBkYXRlZENvbXBvbmVudHNFbnRyeUxlbmd0aCA9IDQ7IC8vIEVhY2ggaXMgYSBzaW5nbGUgaW50MzIgZ2l2aW5nIHRoZSBsb2NhdGlvbiBvZiB0aGUgZGF0YVxyXG5jb25zdCByZWZlcmVuY2VGcmFtZXNFbnRyeUxlbmd0aCA9IDIwOyAvLyAxIGludCBmb3IgZnJhbWUgdHlwZSwgdGhlbiAxNiBieXRlcyBmb3IgdHlwZS1zcGVjaWZpYyBkYXRhXHJcbmNvbnN0IGRpc3Bvc2VkQ29tcG9uZW50SWRzRW50cnlMZW5ndGggPSA0OyAvLyBFYWNoIGlzIGFuIGludDMyIGdpdmluZyB0aGUgSURcclxuY29uc3QgZGlzcG9zZWRFdmVudEhhbmRsZXJJZHNFbnRyeUxlbmd0aCA9IDg7IC8vIEVhY2ggaXMgYW4gaW50NjQgZ2l2aW5nIHRoZSBJRFxyXG5jb25zdCBlZGl0c0VudHJ5TGVuZ3RoID0gMTY7IC8vIDQgaW50c1xyXG5jb25zdCBzdHJpbmdUYWJsZUVudHJ5TGVuZ3RoID0gNDsgLy8gRWFjaCBpcyBhbiBpbnQzMiBnaXZpbmcgdGhlIHN0cmluZyBkYXRhIGxvY2F0aW9uLCBvciAtMSBmb3IgbnVsbFxyXG5jb25zdCB1aW50NjRIaWdoUGFydFNoaWZ0ID0gTWF0aC5wb3coMiwgMzIpO1xyXG5jb25zdCBtYXhTYWZlTnVtYmVySGlnaFBhcnQgPSBNYXRoLnBvdygyLCAyMSkgLSAxOyAvLyBUaGUgaGlnaC1vcmRlciBpbnQzMiBmcm9tIE51bWJlci5NQVhfU0FGRV9JTlRFR0VSXHJcblxyXG5leHBvcnQgY2xhc3MgT3V0T2ZQcm9jZXNzUmVuZGVyQmF0Y2ggaW1wbGVtZW50cyBSZW5kZXJCYXRjaCB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBiYXRjaERhdGE6IFVpbnQ4QXJyYXkpIHtcclxuICAgIGNvbnN0IHN0cmluZ1JlYWRlciA9IG5ldyBPdXRPZlByb2Nlc3NTdHJpbmdSZWFkZXIoYmF0Y2hEYXRhKTtcclxuXHJcbiAgICB0aGlzLmFycmF5UmFuZ2VSZWFkZXIgPSBuZXcgT3V0T2ZQcm9jZXNzQXJyYXlSYW5nZVJlYWRlcihiYXRjaERhdGEpO1xyXG4gICAgdGhpcy5hcnJheUJ1aWxkZXJTZWdtZW50UmVhZGVyID0gbmV3IE91dE9mUHJvY2Vzc0FycmF5QnVpbGRlclNlZ21lbnRSZWFkZXIoYmF0Y2hEYXRhKTtcclxuICAgIHRoaXMuZGlmZlJlYWRlciA9IG5ldyBPdXRPZlByb2Nlc3NSZW5kZXJUcmVlRGlmZlJlYWRlcihiYXRjaERhdGEpO1xyXG4gICAgdGhpcy5lZGl0UmVhZGVyID0gbmV3IE91dE9mUHJvY2Vzc1JlbmRlclRyZWVFZGl0UmVhZGVyKGJhdGNoRGF0YSwgc3RyaW5nUmVhZGVyKTtcclxuICAgIHRoaXMuZnJhbWVSZWFkZXIgPSBuZXcgT3V0T2ZQcm9jZXNzUmVuZGVyVHJlZUZyYW1lUmVhZGVyKGJhdGNoRGF0YSwgc3RyaW5nUmVhZGVyKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZWRDb21wb25lbnRzKCk6IEFycmF5UmFuZ2U8UmVuZGVyVHJlZURpZmY+IHtcclxuICAgIHJldHVybiByZWFkSW50MzJMRSh0aGlzLmJhdGNoRGF0YSwgdGhpcy5iYXRjaERhdGEubGVuZ3RoIC0gMjApOyAvLyA1dGgtZnJvbS1sYXN0IGludDMyXHJcbiAgfVxyXG5cclxuICByZWZlcmVuY2VGcmFtZXMoKTogQXJyYXlSYW5nZTxSZW5kZXJUcmVlRnJhbWU+IHtcclxuICAgIHJldHVybiByZWFkSW50MzJMRSh0aGlzLmJhdGNoRGF0YSwgdGhpcy5iYXRjaERhdGEubGVuZ3RoIC0gMTYpOyAvLyA0dGgtZnJvbS1sYXN0IGludDMyXHJcbiAgfVxyXG5cclxuICBkaXNwb3NlZENvbXBvbmVudElkcygpOiBBcnJheVJhbmdlPG51bWJlcj4ge1xyXG4gICAgcmV0dXJuIHJlYWRJbnQzMkxFKHRoaXMuYmF0Y2hEYXRhLCB0aGlzLmJhdGNoRGF0YS5sZW5ndGggLSAxMik7IC8vIDNyZC1mcm9tLWxhc3QgaW50MzJcclxuICB9XHJcblxyXG4gIGRpc3Bvc2VkRXZlbnRIYW5kbGVySWRzKCk6IEFycmF5UmFuZ2U8bnVtYmVyPiB7XHJcbiAgICByZXR1cm4gcmVhZEludDMyTEUodGhpcy5iYXRjaERhdGEsIHRoaXMuYmF0Y2hEYXRhLmxlbmd0aCAtIDgpOyAvLyAydGgtZnJvbS1sYXN0IGludDMyXHJcbiAgfVxyXG5cclxuICB1cGRhdGVkQ29tcG9uZW50c0VudHJ5KHZhbHVlczogQXJyYXlWYWx1ZXM8UmVuZGVyVHJlZURpZmY+LCBpbmRleDogbnVtYmVyKTogUmVuZGVyVHJlZURpZmYge1xyXG4gICAgY29uc3QgdGFibGVFbnRyeVBvcyA9ICh2YWx1ZXMgYXMgYW55KSArIGluZGV4ICogdXBkYXRlZENvbXBvbmVudHNFbnRyeUxlbmd0aDtcclxuICAgIHJldHVybiByZWFkSW50MzJMRSh0aGlzLmJhdGNoRGF0YSwgdGFibGVFbnRyeVBvcyk7XHJcbiAgfVxyXG5cclxuICByZWZlcmVuY2VGcmFtZXNFbnRyeSh2YWx1ZXM6IEFycmF5VmFsdWVzPFJlbmRlclRyZWVGcmFtZT4sIGluZGV4OiBudW1iZXIpOiBSZW5kZXJUcmVlRnJhbWUge1xyXG4gICAgcmV0dXJuICh2YWx1ZXMgYXMgYW55KSArIGluZGV4ICogcmVmZXJlbmNlRnJhbWVzRW50cnlMZW5ndGggYXMgYW55O1xyXG4gIH1cclxuXHJcbiAgZGlzcG9zZWRDb21wb25lbnRJZHNFbnRyeSh2YWx1ZXM6IEFycmF5VmFsdWVzPG51bWJlcj4sIGluZGV4OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgY29uc3QgZW50cnlQb3MgPSAodmFsdWVzIGFzIGFueSkgKyBpbmRleCAqIGRpc3Bvc2VkQ29tcG9uZW50SWRzRW50cnlMZW5ndGg7XHJcbiAgICByZXR1cm4gcmVhZEludDMyTEUodGhpcy5iYXRjaERhdGEsIGVudHJ5UG9zKTtcclxuICB9XHJcblxyXG4gIGRpc3Bvc2VkRXZlbnRIYW5kbGVySWRzRW50cnkodmFsdWVzOiBBcnJheVZhbHVlczxudW1iZXI+LCBpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIGNvbnN0IGVudHJ5UG9zID0gKHZhbHVlcyBhcyBhbnkpICsgaW5kZXggKiBkaXNwb3NlZEV2ZW50SGFuZGxlcklkc0VudHJ5TGVuZ3RoO1xyXG4gICAgcmV0dXJuIHJlYWRVaW50NjRMRSh0aGlzLmJhdGNoRGF0YSwgZW50cnlQb3MpO1xyXG4gIH1cclxuXHJcbiAgZGlmZlJlYWRlcjogUmVuZGVyVHJlZURpZmZSZWFkZXI7XHJcblxyXG4gIGVkaXRSZWFkZXI6IFJlbmRlclRyZWVFZGl0UmVhZGVyO1xyXG5cclxuICBmcmFtZVJlYWRlcjogUmVuZGVyVHJlZUZyYW1lUmVhZGVyO1xyXG5cclxuICBhcnJheVJhbmdlUmVhZGVyOiBBcnJheVJhbmdlUmVhZGVyO1xyXG5cclxuICBhcnJheUJ1aWxkZXJTZWdtZW50UmVhZGVyOiBBcnJheUJ1aWxkZXJTZWdtZW50UmVhZGVyO1xyXG59XHJcblxyXG5jbGFzcyBPdXRPZlByb2Nlc3NSZW5kZXJUcmVlRGlmZlJlYWRlciBpbXBsZW1lbnRzIFJlbmRlclRyZWVEaWZmUmVhZGVyIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJhdGNoRGF0YVVpbnQ4OiBVaW50OEFycmF5KSB7XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnRJZChkaWZmOiBSZW5kZXJUcmVlRGlmZikge1xyXG4gICAgLy8gRmlyc3QgaW50MzIgaXMgY29tcG9uZW50SWRcclxuICAgIHJldHVybiByZWFkSW50MzJMRSh0aGlzLmJhdGNoRGF0YVVpbnQ4LCBkaWZmIGFzIGFueSk7XHJcbiAgfVxyXG5cclxuICBlZGl0cyhkaWZmOiBSZW5kZXJUcmVlRGlmZikge1xyXG4gICAgLy8gRW50cmllcyBkYXRhIHN0YXJ0cyBhZnRlciB0aGUgY29tcG9uZW50SWQgKHdoaWNoIGlzIGEgNC1ieXRlIGludClcclxuICAgIHJldHVybiAoZGlmZiBhcyBhbnkgKyA0KTtcclxuICB9XHJcblxyXG4gIGVkaXRzRW50cnkodmFsdWVzOiBBcnJheVZhbHVlczxSZW5kZXJUcmVlRWRpdD4sIGluZGV4OiBudW1iZXIpIHtcclxuICAgIHJldHVybiAodmFsdWVzIGFzIGFueSkgKyBpbmRleCAqIGVkaXRzRW50cnlMZW5ndGg7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBPdXRPZlByb2Nlc3NSZW5kZXJUcmVlRWRpdFJlYWRlciBpbXBsZW1lbnRzIFJlbmRlclRyZWVFZGl0UmVhZGVyIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJhdGNoRGF0YVVpbnQ4OiBVaW50OEFycmF5LCBwcml2YXRlIHN0cmluZ1JlYWRlcjogT3V0T2ZQcm9jZXNzU3RyaW5nUmVhZGVyKSB7XHJcbiAgfVxyXG5cclxuICBlZGl0VHlwZShlZGl0OiBSZW5kZXJUcmVlRWRpdCkge1xyXG4gICAgcmV0dXJuIHJlYWRJbnQzMkxFKHRoaXMuYmF0Y2hEYXRhVWludDgsIGVkaXQgYXMgYW55KTsgLy8gMXN0IGludFxyXG4gIH1cclxuXHJcbiAgc2libGluZ0luZGV4KGVkaXQ6IFJlbmRlclRyZWVFZGl0KSB7XHJcbiAgICByZXR1cm4gcmVhZEludDMyTEUodGhpcy5iYXRjaERhdGFVaW50OCwgZWRpdCBhcyBhbnkgKyA0KTsgLy8gMm5kIGludFxyXG4gIH1cclxuXHJcbiAgbmV3VHJlZUluZGV4KGVkaXQ6IFJlbmRlclRyZWVFZGl0KSB7XHJcbiAgICByZXR1cm4gcmVhZEludDMyTEUodGhpcy5iYXRjaERhdGFVaW50OCwgZWRpdCBhcyBhbnkgKyA4KTsgLy8gM3JkIGludFxyXG4gIH1cclxuXHJcbiAgbW92ZVRvU2libGluZ0luZGV4KGVkaXQ6IFJlbmRlclRyZWVFZGl0KSB7XHJcbiAgICByZXR1cm4gcmVhZEludDMyTEUodGhpcy5iYXRjaERhdGFVaW50OCwgZWRpdCBhcyBhbnkgKyA4KTsgLy8gM3JkIGludFxyXG4gIH1cclxuXHJcbiAgcmVtb3ZlZEF0dHJpYnV0ZU5hbWUoZWRpdDogUmVuZGVyVHJlZUVkaXQpIHtcclxuICAgIGNvbnN0IHN0cmluZ0luZGV4ID0gcmVhZEludDMyTEUodGhpcy5iYXRjaERhdGFVaW50OCwgZWRpdCBhcyBhbnkgKyAxMik7IC8vIDR0aCBpbnRcclxuICAgIHJldHVybiB0aGlzLnN0cmluZ1JlYWRlci5yZWFkU3RyaW5nKHN0cmluZ0luZGV4KTtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIE91dE9mUHJvY2Vzc1JlbmRlclRyZWVGcmFtZVJlYWRlciBpbXBsZW1lbnRzIFJlbmRlclRyZWVGcmFtZVJlYWRlciB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBiYXRjaERhdGFVaW50ODogVWludDhBcnJheSwgcHJpdmF0ZSBzdHJpbmdSZWFkZXI6IE91dE9mUHJvY2Vzc1N0cmluZ1JlYWRlcikge1xyXG4gIH1cclxuXHJcbiAgLy8gRm9yIHJlbmRlciBmcmFtZXMsIHRoZSAybmQtNHRoIGludHMgaGF2ZSBkaWZmZXJlbnQgbWVhbmluZ3MgZGVwZW5kaW5nIG9uIGZyYW1lVHlwZS5cclxuICAvLyBJdCdzIHRoZSBjYWxsZXIncyByZXNwb25zaWJpbGl0eSBub3QgdG8gZXZhbHVhdGUgcHJvcGVydGllcyB0aGF0IGFyZW4ndCBhcHBsaWNhYmxlIHRvIHRoZSBmcmFtZVR5cGUuXHJcblxyXG4gIGZyYW1lVHlwZShmcmFtZTogUmVuZGVyVHJlZUZyYW1lKSB7XHJcbiAgICByZXR1cm4gcmVhZEludDMyTEUodGhpcy5iYXRjaERhdGFVaW50OCwgZnJhbWUgYXMgYW55KTsgLy8gMXN0IGludFxyXG4gIH1cclxuXHJcbiAgc3VidHJlZUxlbmd0aChmcmFtZTogUmVuZGVyVHJlZUZyYW1lKSB7XHJcbiAgICByZXR1cm4gcmVhZEludDMyTEUodGhpcy5iYXRjaERhdGFVaW50OCwgZnJhbWUgYXMgYW55ICsgNCk7IC8vIDJuZCBpbnRcclxuICB9XHJcblxyXG4gIGVsZW1lbnRSZWZlcmVuY2VDYXB0dXJlSWQoZnJhbWU6IFJlbmRlclRyZWVGcmFtZSkge1xyXG4gICAgY29uc3Qgc3RyaW5nSW5kZXggPSByZWFkSW50MzJMRSh0aGlzLmJhdGNoRGF0YVVpbnQ4LCBmcmFtZSBhcyBhbnkgKyA0KTsgLy8gMm5kIGludFxyXG4gICAgcmV0dXJuIHRoaXMuc3RyaW5nUmVhZGVyLnJlYWRTdHJpbmcoc3RyaW5nSW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50SWQoZnJhbWU6IFJlbmRlclRyZWVGcmFtZSkge1xyXG4gICAgcmV0dXJuIHJlYWRJbnQzMkxFKHRoaXMuYmF0Y2hEYXRhVWludDgsIGZyYW1lIGFzIGFueSArIDgpOyAvLyAzcmQgaW50XHJcbiAgfVxyXG5cclxuICBlbGVtZW50TmFtZShmcmFtZTogUmVuZGVyVHJlZUZyYW1lKSB7XHJcbiAgICBjb25zdCBzdHJpbmdJbmRleCA9IHJlYWRJbnQzMkxFKHRoaXMuYmF0Y2hEYXRhVWludDgsIGZyYW1lIGFzIGFueSArIDgpOyAvLyAzcmQgaW50XHJcbiAgICByZXR1cm4gdGhpcy5zdHJpbmdSZWFkZXIucmVhZFN0cmluZyhzdHJpbmdJbmRleCk7XHJcbiAgfVxyXG5cclxuICB0ZXh0Q29udGVudChmcmFtZTogUmVuZGVyVHJlZUZyYW1lKSB7XHJcbiAgICBjb25zdCBzdHJpbmdJbmRleCA9IHJlYWRJbnQzMkxFKHRoaXMuYmF0Y2hEYXRhVWludDgsIGZyYW1lIGFzIGFueSArIDQpOyAvLyAybmQgaW50XHJcbiAgICByZXR1cm4gdGhpcy5zdHJpbmdSZWFkZXIucmVhZFN0cmluZyhzdHJpbmdJbmRleCk7XHJcbiAgfVxyXG5cclxuICBtYXJrdXBDb250ZW50KGZyYW1lOiBSZW5kZXJUcmVlRnJhbWUpIHtcclxuICAgIGNvbnN0IHN0cmluZ0luZGV4ID0gcmVhZEludDMyTEUodGhpcy5iYXRjaERhdGFVaW50OCwgZnJhbWUgYXMgYW55ICsgNCk7IC8vIDJuZCBpbnRcclxuICAgIHJldHVybiB0aGlzLnN0cmluZ1JlYWRlci5yZWFkU3RyaW5nKHN0cmluZ0luZGV4KSE7XHJcbiAgfVxyXG5cclxuICBhdHRyaWJ1dGVOYW1lKGZyYW1lOiBSZW5kZXJUcmVlRnJhbWUpIHtcclxuICAgIGNvbnN0IHN0cmluZ0luZGV4ID0gcmVhZEludDMyTEUodGhpcy5iYXRjaERhdGFVaW50OCwgZnJhbWUgYXMgYW55ICsgNCk7IC8vIDJuZCBpbnRcclxuICAgIHJldHVybiB0aGlzLnN0cmluZ1JlYWRlci5yZWFkU3RyaW5nKHN0cmluZ0luZGV4KTtcclxuICB9XHJcblxyXG4gIGF0dHJpYnV0ZVZhbHVlKGZyYW1lOiBSZW5kZXJUcmVlRnJhbWUpIHtcclxuICAgIGNvbnN0IHN0cmluZ0luZGV4ID0gcmVhZEludDMyTEUodGhpcy5iYXRjaERhdGFVaW50OCwgZnJhbWUgYXMgYW55ICsgOCk7IC8vIDNyZCBpbnRcclxuICAgIHJldHVybiB0aGlzLnN0cmluZ1JlYWRlci5yZWFkU3RyaW5nKHN0cmluZ0luZGV4KTtcclxuICB9XHJcblxyXG4gIGF0dHJpYnV0ZUV2ZW50SGFuZGxlcklkKGZyYW1lOiBSZW5kZXJUcmVlRnJhbWUpIHtcclxuICAgIHJldHVybiByZWFkVWludDY0TEUodGhpcy5iYXRjaERhdGFVaW50OCwgZnJhbWUgYXMgYW55ICsgMTIpOyAvLyBCeXRlcyAxMi0xOVxyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgT3V0T2ZQcm9jZXNzU3RyaW5nUmVhZGVyIHtcclxuICBwcml2YXRlIHN0cmluZ1RhYmxlU3RhcnRJbmRleDogbnVtYmVyO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJhdGNoRGF0YVVpbnQ4OiBVaW50OEFycmF5KSB7XHJcbiAgICAvLyBGaW5hbCBpbnQgZ2l2ZXMgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHN0cmluZyB0YWJsZVxyXG4gICAgdGhpcy5zdHJpbmdUYWJsZVN0YXJ0SW5kZXggPSByZWFkSW50MzJMRShiYXRjaERhdGFVaW50OCwgYmF0Y2hEYXRhVWludDgubGVuZ3RoIC0gNCk7XHJcbiAgfVxyXG5cclxuICByZWFkU3RyaW5nKGluZGV4OiBudW1iZXIpOiBzdHJpbmcgfCBudWxsIHtcclxuICAgIGlmIChpbmRleCA9PT0gLTEpIHsgLy8gU3BlY2lhbCB2YWx1ZSBlbmNvZGVzICdudWxsJ1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHN0cmluZ1RhYmxlRW50cnlQb3MgPSByZWFkSW50MzJMRSh0aGlzLmJhdGNoRGF0YVVpbnQ4LCB0aGlzLnN0cmluZ1RhYmxlU3RhcnRJbmRleCArIGluZGV4ICogc3RyaW5nVGFibGVFbnRyeUxlbmd0aCk7XHJcblxyXG4gICAgICAvLyBCeSBkZWZhdWx0LCAuTkVUJ3MgQmluYXJ5V3JpdGVyIGdpdmVzIExFQjEyOC1sZW5ndGgtcHJlZml4ZWQgVVRGLTggZGF0YS5cclxuICAgICAgLy8gVGhpcyBpcyBjb252ZW5pZW50IGVub3VnaCB0byBkZWNvZGUgaW4gSmF2YVNjcmlwdC5cclxuICAgICAgY29uc3QgbnVtVXRmOEJ5dGVzID0gcmVhZExFQjEyOCh0aGlzLmJhdGNoRGF0YVVpbnQ4LCBzdHJpbmdUYWJsZUVudHJ5UG9zKTtcclxuICAgICAgY29uc3QgY2hhcnNTdGFydCA9IHN0cmluZ1RhYmxlRW50cnlQb3MgKyBudW1MRUIxMjhCeXRlcyhudW1VdGY4Qnl0ZXMpO1xyXG4gICAgICBjb25zdCB1dGY4RGF0YSA9IG5ldyBVaW50OEFycmF5KFxyXG4gICAgICAgIHRoaXMuYmF0Y2hEYXRhVWludDguYnVmZmVyLFxyXG4gICAgICAgIHRoaXMuYmF0Y2hEYXRhVWludDguYnl0ZU9mZnNldCArIGNoYXJzU3RhcnQsXHJcbiAgICAgICAgbnVtVXRmOEJ5dGVzXHJcbiAgICAgICk7XHJcbiAgICAgIHJldHVybiBkZWNvZGVVdGY4KHV0ZjhEYXRhKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIE91dE9mUHJvY2Vzc0FycmF5UmFuZ2VSZWFkZXIgaW1wbGVtZW50cyBBcnJheVJhbmdlUmVhZGVyIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJhdGNoRGF0YVVpbnQ4OiBVaW50OEFycmF5KSB7XHJcbiAgfVxyXG5cclxuICBjb3VudDxUPihhcnJheVJhbmdlOiBBcnJheVJhbmdlPFQ+KSB7XHJcbiAgICAvLyBGaXJzdCBpbnQgaXMgY291bnRcclxuICAgIHJldHVybiByZWFkSW50MzJMRSh0aGlzLmJhdGNoRGF0YVVpbnQ4LCBhcnJheVJhbmdlIGFzIGFueSk7XHJcbiAgfVxyXG5cclxuICB2YWx1ZXM8VD4oYXJyYXlSYW5nZTogQXJyYXlSYW5nZTxUPikge1xyXG4gICAgLy8gRW50cmllcyBkYXRhIHN0YXJ0cyBhZnRlciB0aGUgJ2NvdW50JyBpbnQgKGkuZS4sIGFmdGVyIDQgYnl0ZXMpXHJcbiAgICByZXR1cm4gYXJyYXlSYW5nZSBhcyBhbnkgKyA0O1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgT3V0T2ZQcm9jZXNzQXJyYXlCdWlsZGVyU2VnbWVudFJlYWRlciBpbXBsZW1lbnRzIEFycmF5QnVpbGRlclNlZ21lbnRSZWFkZXIge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYmF0Y2hEYXRhVWludDg6IFVpbnQ4QXJyYXkpIHtcclxuICB9XHJcblxyXG4gIG9mZnNldDxUPihhcnJheUJ1aWxkZXJTZWdtZW50OiBBcnJheUJ1aWxkZXJTZWdtZW50PFQ+KSB7XHJcbiAgICAvLyBOb3QgdXNlZCBieSB0aGUgb3V0LW9mLXByb2Nlc3MgcmVwcmVzZW50YXRpb24gb2YgUmVuZGVyQmF0Y2ggZGF0YS5cclxuICAgIC8vIFRoaXMgb25seSBleGlzdHMgb24gdGhlIEFycmF5QnVpbGRlclNlZ21lbnRSZWFkZXIgZm9yIHRoZSBzaGFyZWQtbWVtb3J5IHJlcHJlc2VudGF0aW9uLlxyXG4gICAgcmV0dXJuIDA7XHJcbiAgfVxyXG5cclxuICBjb3VudDxUPihhcnJheUJ1aWxkZXJTZWdtZW50OiBBcnJheUJ1aWxkZXJTZWdtZW50PFQ+KSB7XHJcbiAgICAvLyBGaXJzdCBpbnQgaXMgY291bnRcclxuICAgIHJldHVybiByZWFkSW50MzJMRSh0aGlzLmJhdGNoRGF0YVVpbnQ4LCBhcnJheUJ1aWxkZXJTZWdtZW50IGFzIGFueSk7XHJcbiAgfVxyXG5cclxuICB2YWx1ZXM8VD4oYXJyYXlCdWlsZGVyU2VnbWVudDogQXJyYXlCdWlsZGVyU2VnbWVudDxUPik6IEFycmF5VmFsdWVzPFQ+IHtcclxuICAgIC8vIEVudHJpZXMgZGF0YSBzdGFydHMgYWZ0ZXIgdGhlICdjb3VudCcgaW50IChpLmUuLCBhZnRlciA0IGJ5dGVzKVxyXG4gICAgcmV0dXJuIGFycmF5QnVpbGRlclNlZ21lbnQgYXMgYW55ICsgNDtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlYWRJbnQzMkxFKGJ1ZmZlcjogVWludDhBcnJheSwgcG9zaXRpb246IG51bWJlcik6IGFueSB7XHJcbiAgcmV0dXJuIChidWZmZXJbcG9zaXRpb25dKVxyXG4gICAgfCAoYnVmZmVyW3Bvc2l0aW9uICsgMV0gPDwgOClcclxuICAgIHwgKGJ1ZmZlcltwb3NpdGlvbiArIDJdIDw8IDE2KVxyXG4gICAgfCAoYnVmZmVyW3Bvc2l0aW9uICsgM10gPDwgMjQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWFkVWludDMyTEUoYnVmZmVyOiBVaW50OEFycmF5LCBwb3NpdGlvbjogbnVtYmVyKTogYW55IHtcclxuICByZXR1cm4gKGJ1ZmZlcltwb3NpdGlvbl0pXHJcbiAgICArIChidWZmZXJbcG9zaXRpb24gKyAxXSA8PCA4KVxyXG4gICAgKyAoYnVmZmVyW3Bvc2l0aW9uICsgMl0gPDwgMTYpXHJcbiAgICArICgoYnVmZmVyW3Bvc2l0aW9uICsgM10gPDwgMjQpID4+PiAwKTsgLy8gVGhlID4+PiAwIGNvZXJjZXMgdGhlIHZhbHVlIHRvIHVuc2lnbmVkXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlYWRVaW50NjRMRShidWZmZXI6IFVpbnQ4QXJyYXksIHBvc2l0aW9uOiBudW1iZXIpOiBhbnkge1xyXG4gIC8vIFRoaXMgY2Fubm90IGJlIGRvbmUgdXNpbmcgYml0LXNoaWZ0IG9wZXJhdG9ycyBpbiBKYXZhU2NyaXB0LCBiZWNhdXNlXHJcbiAgLy8gdGhvc2UgYWxsIGltcGxpY2l0bHkgY29udmVydCB0byBpbnQzMlxyXG4gIGNvbnN0IGhpZ2hQYXJ0ID0gcmVhZFVpbnQzMkxFKGJ1ZmZlciwgcG9zaXRpb24gKyA0KTtcclxuICBpZiAoaGlnaFBhcnQgPiBtYXhTYWZlTnVtYmVySGlnaFBhcnQpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IHJlYWQgdWludDY0IHdpdGggaGlnaCBvcmRlciBwYXJ0ICR7aGlnaFBhcnR9LCBiZWNhdXNlIHRoZSByZXN1bHQgd291bGQgZXhjZWVkIE51bWJlci5NQVhfU0FGRV9JTlRFR0VSLmApO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChoaWdoUGFydCAqIHVpbnQ2NEhpZ2hQYXJ0U2hpZnQpICsgcmVhZFVpbnQzMkxFKGJ1ZmZlciwgcG9zaXRpb24pO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWFkTEVCMTI4KGJ1ZmZlcjogVWludDhBcnJheSwgcG9zaXRpb246IG51bWJlcikge1xyXG4gIGxldCByZXN1bHQgPSAwO1xyXG4gIGxldCBzaGlmdCA9IDA7XHJcbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IDQ7IGluZGV4KyspIHtcclxuICAgIGNvbnN0IGJ5dGUgPSBidWZmZXJbcG9zaXRpb24gKyBpbmRleF07XHJcbiAgICByZXN1bHQgfD0gKGJ5dGUgJiAxMjcpIDw8IHNoaWZ0O1xyXG4gICAgaWYgKGJ5dGUgPCAxMjgpIHtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICBzaGlmdCArPSA3O1xyXG4gIH1cclxuICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBudW1MRUIxMjhCeXRlcyh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgcmV0dXJuIHZhbHVlIDwgMTI4ID8gMVxyXG4gICAgOiB2YWx1ZSA8IDE2Mzg0ID8gMlxyXG4gICAgICA6IHZhbHVlIDwgMjA5NzE1MiA/IDMgOiA0O1xyXG59XHJcbiIsImV4cG9ydCBpbnRlcmZhY2UgUmVuZGVyQmF0Y2gge1xyXG4gIHVwZGF0ZWRDb21wb25lbnRzKCk6IEFycmF5UmFuZ2U8UmVuZGVyVHJlZURpZmY+O1xyXG4gIHJlZmVyZW5jZUZyYW1lcygpOiBBcnJheVJhbmdlPFJlbmRlclRyZWVGcmFtZT47XHJcbiAgZGlzcG9zZWRDb21wb25lbnRJZHMoKTogQXJyYXlSYW5nZTxudW1iZXI+O1xyXG4gIGRpc3Bvc2VkRXZlbnRIYW5kbGVySWRzKCk6IEFycmF5UmFuZ2U8bnVtYmVyPjtcclxuXHJcbiAgdXBkYXRlZENvbXBvbmVudHNFbnRyeSh2YWx1ZXM6IEFycmF5VmFsdWVzPFJlbmRlclRyZWVEaWZmPiwgaW5kZXg6IG51bWJlcik6IFJlbmRlclRyZWVEaWZmO1xyXG4gIHJlZmVyZW5jZUZyYW1lc0VudHJ5KHZhbHVlczogQXJyYXlWYWx1ZXM8UmVuZGVyVHJlZUZyYW1lPiwgaW5kZXg6IG51bWJlcik6IFJlbmRlclRyZWVGcmFtZTtcclxuICBkaXNwb3NlZENvbXBvbmVudElkc0VudHJ5KHZhbHVlczogQXJyYXlWYWx1ZXM8bnVtYmVyPiwgaW5kZXg6IG51bWJlcik6IG51bWJlcjtcclxuICBkaXNwb3NlZEV2ZW50SGFuZGxlcklkc0VudHJ5KHZhbHVlczogQXJyYXlWYWx1ZXM8bnVtYmVyPiwgaW5kZXg6IG51bWJlcik6IG51bWJlcjtcclxuXHJcbiAgZGlmZlJlYWRlcjogUmVuZGVyVHJlZURpZmZSZWFkZXI7XHJcbiAgZWRpdFJlYWRlcjogUmVuZGVyVHJlZUVkaXRSZWFkZXI7XHJcbiAgZnJhbWVSZWFkZXI6IFJlbmRlclRyZWVGcmFtZVJlYWRlcjtcclxuICBhcnJheVJhbmdlUmVhZGVyOiBBcnJheVJhbmdlUmVhZGVyO1xyXG4gIGFycmF5QnVpbGRlclNlZ21lbnRSZWFkZXI6IEFycmF5QnVpbGRlclNlZ21lbnRSZWFkZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQXJyYXlSYW5nZVJlYWRlciB7XHJcbiAgY291bnQ8VD4oYXJyYXlSYW5nZTogQXJyYXlSYW5nZTxUPik6IG51bWJlcjtcclxuICB2YWx1ZXM8VD4oYXJyYXlSYW5nZTogQXJyYXlSYW5nZTxUPik6IEFycmF5VmFsdWVzPFQ+O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFycmF5QnVpbGRlclNlZ21lbnRSZWFkZXIge1xyXG4gIG9mZnNldDxUPihhcnJheUJ1aWxkZXJTZWdtZW50OiBBcnJheUJ1aWxkZXJTZWdtZW50PFQ+KTogbnVtYmVyO1xyXG4gIGNvdW50PFQ+KGFycmF5QnVpbGRlclNlZ21lbnQ6IEFycmF5QnVpbGRlclNlZ21lbnQ8VD4pOiBudW1iZXI7XHJcbiAgdmFsdWVzPFQ+KGFycmF5QnVpbGRlclNlZ21lbnQ6IEFycmF5QnVpbGRlclNlZ21lbnQ8VD4pOiBBcnJheVZhbHVlczxUPjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZW5kZXJUcmVlRGlmZlJlYWRlciB7XHJcbiAgY29tcG9uZW50SWQoZGlmZjogUmVuZGVyVHJlZURpZmYpOiBudW1iZXI7XHJcbiAgZWRpdHMoZGlmZjogUmVuZGVyVHJlZURpZmYpOiBBcnJheUJ1aWxkZXJTZWdtZW50PFJlbmRlclRyZWVFZGl0PjtcclxuICBlZGl0c0VudHJ5KHZhbHVlczogQXJyYXlWYWx1ZXM8UmVuZGVyVHJlZUVkaXQ+LCBpbmRleDogbnVtYmVyKTogUmVuZGVyVHJlZUVkaXQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVuZGVyVHJlZUVkaXRSZWFkZXIge1xyXG4gIGVkaXRUeXBlKGVkaXQ6IFJlbmRlclRyZWVFZGl0KTogRWRpdFR5cGU7XHJcbiAgc2libGluZ0luZGV4KGVkaXQ6IFJlbmRlclRyZWVFZGl0KTogbnVtYmVyO1xyXG4gIG5ld1RyZWVJbmRleChlZGl0OiBSZW5kZXJUcmVlRWRpdCk6IG51bWJlcjtcclxuICBtb3ZlVG9TaWJsaW5nSW5kZXgoZWRpdDogUmVuZGVyVHJlZUVkaXQpOiBudW1iZXI7XHJcbiAgcmVtb3ZlZEF0dHJpYnV0ZU5hbWUoZWRpdDogUmVuZGVyVHJlZUVkaXQpOiBzdHJpbmcgfCBudWxsO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlbmRlclRyZWVGcmFtZVJlYWRlciB7XHJcbiAgZnJhbWVUeXBlKGZyYW1lOiBSZW5kZXJUcmVlRnJhbWUpOiBGcmFtZVR5cGU7XHJcbiAgc3VidHJlZUxlbmd0aChmcmFtZTogUmVuZGVyVHJlZUZyYW1lKTogbnVtYmVyO1xyXG4gIGVsZW1lbnRSZWZlcmVuY2VDYXB0dXJlSWQoZnJhbWU6IFJlbmRlclRyZWVGcmFtZSk6IHN0cmluZyB8IG51bGw7XHJcbiAgY29tcG9uZW50SWQoZnJhbWU6IFJlbmRlclRyZWVGcmFtZSk6IG51bWJlcjtcclxuICBlbGVtZW50TmFtZShmcmFtZTogUmVuZGVyVHJlZUZyYW1lKTogc3RyaW5nIHwgbnVsbDtcclxuICB0ZXh0Q29udGVudChmcmFtZTogUmVuZGVyVHJlZUZyYW1lKTogc3RyaW5nIHwgbnVsbDtcclxuICBtYXJrdXBDb250ZW50KGZyYW1lOiBSZW5kZXJUcmVlRnJhbWUpOiBzdHJpbmc7XHJcbiAgYXR0cmlidXRlTmFtZShmcmFtZTogUmVuZGVyVHJlZUZyYW1lKTogc3RyaW5nIHwgbnVsbDtcclxuICBhdHRyaWJ1dGVWYWx1ZShmcmFtZTogUmVuZGVyVHJlZUZyYW1lKTogc3RyaW5nIHwgbnVsbDtcclxuICBhdHRyaWJ1dGVFdmVudEhhbmRsZXJJZChmcmFtZTogUmVuZGVyVHJlZUZyYW1lKTogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFycmF5UmFuZ2U8VD4geyBBcnJheVJhbmdlX19ET19OT1RfSU1QTEVNRU5UOiBhbnkgfVxyXG5leHBvcnQgaW50ZXJmYWNlIEFycmF5QnVpbGRlclNlZ21lbnQ8VD4geyBBcnJheUJ1aWxkZXJTZWdtZW50X19ET19OT1RfSU1QTEVNRU5UOiBhbnkgfVxyXG5leHBvcnQgaW50ZXJmYWNlIEFycmF5VmFsdWVzPFQ+IHsgQXJyYXlWYWx1ZXNfX0RPX05PVF9JTVBMRU1FTlQ6IGFueSB9XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlbmRlclRyZWVEaWZmIHsgUmVuZGVyVHJlZURpZmZfX0RPX05PVF9JTVBMRU1FTlQ6IGFueSB9XHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVuZGVyVHJlZUZyYW1lIHsgUmVuZGVyVHJlZUZyYW1lX19ET19OT1RfSU1QTEVNRU5UOiBhbnkgfVxyXG5leHBvcnQgaW50ZXJmYWNlIFJlbmRlclRyZWVFZGl0IHsgUmVuZGVyVHJlZUVkaXRfX0RPX05PVF9JTVBMRU1FTlQ6IGFueSB9XHJcblxyXG5leHBvcnQgZW51bSBFZGl0VHlwZSB7XHJcbiAgLy8gVGhlIHZhbHVlcyBtdXN0IGJlIGtlcHQgaW4gc3luYyB3aXRoIHRoZSAuTkVUIGVxdWl2YWxlbnQgaW4gUmVuZGVyVHJlZUVkaXRUeXBlLmNzXHJcbiAgcHJlcGVuZEZyYW1lID0gMSxcclxuICByZW1vdmVGcmFtZSA9IDIsXHJcbiAgc2V0QXR0cmlidXRlID0gMyxcclxuICByZW1vdmVBdHRyaWJ1dGUgPSA0LFxyXG4gIHVwZGF0ZVRleHQgPSA1LFxyXG4gIHN0ZXBJbiA9IDYsXHJcbiAgc3RlcE91dCA9IDcsXHJcbiAgdXBkYXRlTWFya3VwID0gOCxcclxuICBwZXJtdXRhdGlvbkxpc3RFbnRyeSA9IDksXHJcbiAgcGVybXV0YXRpb25MaXN0RW5kID0gMTAsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEZyYW1lVHlwZSB7XHJcbiAgLy8gVGhlIHZhbHVlcyBtdXN0IGJlIGtlcHQgaW4gc3luYyB3aXRoIHRoZSAuTkVUIGVxdWl2YWxlbnQgaW4gUmVuZGVyVHJlZUZyYW1lVHlwZS5jc1xyXG4gIGVsZW1lbnQgPSAxLFxyXG4gIHRleHQgPSAyLFxyXG4gIGF0dHJpYnV0ZSA9IDMsXHJcbiAgY29tcG9uZW50ID0gNCxcclxuICByZWdpb24gPSA1LFxyXG4gIGVsZW1lbnRSZWZlcmVuY2VDYXB0dXJlID0gNixcclxuICBtYXJrdXAgPSA4LFxyXG59XHJcbiIsImNvbnN0IG5hdGl2ZURlY29kZXIgPSB0eXBlb2YgVGV4dERlY29kZXIgPT09ICdmdW5jdGlvbidcclxuICA/IG5ldyBUZXh0RGVjb2RlcigndXRmLTgnKVxyXG4gIDogbnVsbDtcclxuXHJcbmV4cG9ydCBjb25zdCBkZWNvZGVVdGY4OiAoYnl0ZXM6IFVpbnQ4QXJyYXkpID0+IHN0cmluZ1xyXG4gID0gbmF0aXZlRGVjb2RlciA/IG5hdGl2ZURlY29kZXIuZGVjb2RlLmJpbmQobmF0aXZlRGVjb2RlcikgOiBkZWNvZGVJbXBsO1xyXG5cclxuLyogIVxyXG5Mb2dpYyBpbiBkZWNvZGVJbXBsIGlzIGRlcml2ZWQgZnJvbSBmYXN0LXRleHQtZW5jb2RpbmdcclxuaHR0cHM6Ly9naXRodWIuY29tL3NhbXRob3IvZmFzdC10ZXh0LWVuY29kaW5nXHJcblxyXG5MaWNlbnNlIGZvciBmYXN0LXRleHQtZW5jb2Rpbmc6IEFwYWNoZSAyLjBcclxuaHR0cHM6Ly9naXRodWIuY29tL3NhbXRob3IvZmFzdC10ZXh0LWVuY29kaW5nL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcclxuKi9cclxuXHJcbmZ1bmN0aW9uIGRlY29kZUltcGwoYnl0ZXM6IFVpbnQ4QXJyYXkpOiBzdHJpbmcge1xyXG4gIGxldCBwb3MgPSAwO1xyXG4gIGNvbnN0IGxlbiA9IGJ5dGVzLmxlbmd0aDtcclxuICBjb25zdCBvdXQ6IG51bWJlcltdID0gW107XHJcbiAgY29uc3Qgc3Vic3RyaW5nczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgd2hpbGUgKHBvcyA8IGxlbikge1xyXG4gICAgY29uc3QgYnl0ZTEgPSBieXRlc1twb3MrK107XHJcbiAgICBpZiAoYnl0ZTEgPT09IDApIHtcclxuICAgICAgYnJlYWs7IC8vIE5VTExcclxuICAgIH1cclxuXHJcbiAgICBpZiAoKGJ5dGUxICYgMHg4MCkgPT09IDApIHsgLy8gMS1ieXRlXHJcbiAgICAgIG91dC5wdXNoKGJ5dGUxKTtcclxuICAgIH0gZWxzZSBpZiAoKGJ5dGUxICYgMHhlMCkgPT09IDB4YzApIHsgLy8gMi1ieXRlXHJcbiAgICAgIGNvbnN0IGJ5dGUyID0gYnl0ZXNbcG9zKytdICYgMHgzZjtcclxuICAgICAgb3V0LnB1c2goKChieXRlMSAmIDB4MWYpIDw8IDYpIHwgYnl0ZTIpO1xyXG4gICAgfSBlbHNlIGlmICgoYnl0ZTEgJiAweGYwKSA9PT0gMHhlMCkge1xyXG4gICAgICBjb25zdCBieXRlMiA9IGJ5dGVzW3BvcysrXSAmIDB4M2Y7XHJcbiAgICAgIGNvbnN0IGJ5dGUzID0gYnl0ZXNbcG9zKytdICYgMHgzZjtcclxuICAgICAgb3V0LnB1c2goKChieXRlMSAmIDB4MWYpIDw8IDEyKSB8IChieXRlMiA8PCA2KSB8IGJ5dGUzKTtcclxuICAgIH0gZWxzZSBpZiAoKGJ5dGUxICYgMHhmOCkgPT09IDB4ZjApIHtcclxuICAgICAgY29uc3QgYnl0ZTIgPSBieXRlc1twb3MrK10gJiAweDNmO1xyXG4gICAgICBjb25zdCBieXRlMyA9IGJ5dGVzW3BvcysrXSAmIDB4M2Y7XHJcbiAgICAgIGNvbnN0IGJ5dGU0ID0gYnl0ZXNbcG9zKytdICYgMHgzZjtcclxuXHJcbiAgICAgIC8vIHRoaXMgY2FuIGJlID4gMHhmZmZmLCBzbyBwb3NzaWJseSBnZW5lcmF0ZSBzdXJyb2dhdGVzXHJcbiAgICAgIGxldCBjb2RlcG9pbnQgPSAoKGJ5dGUxICYgMHgwNykgPDwgMHgxMikgfCAoYnl0ZTIgPDwgMHgwYykgfCAoYnl0ZTMgPDwgMHgwNikgfCBieXRlNDtcclxuICAgICAgaWYgKGNvZGVwb2ludCA+IDB4ZmZmZikge1xyXG4gICAgICAgIC8vIGNvZGVwb2ludCAmPSB+MHgxMDAwMDtcclxuICAgICAgICBjb2RlcG9pbnQgLT0gMHgxMDAwMDtcclxuICAgICAgICBvdXQucHVzaCgoY29kZXBvaW50ID4+PiAxMCkgJiAweDNmZiB8IDB4ZDgwMCk7XHJcbiAgICAgICAgY29kZXBvaW50ID0gMHhkYzAwIHwgY29kZXBvaW50ICYgMHgzZmY7XHJcbiAgICAgIH1cclxuICAgICAgb3V0LnB1c2goY29kZXBvaW50KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIEZJWE1FOiB3ZSdyZSBpZ25vcmluZyB0aGlzXHJcbiAgICB9XHJcblxyXG4gICAgLy8gQXMgYSB3b3JrYXJvdW5kIGZvciBodHRwczovL2dpdGh1Yi5jb20vc2FtdGhvci9mYXN0LXRleHQtZW5jb2RpbmcvaXNzdWVzLzEsXHJcbiAgICAvLyBtYWtlIHN1cmUgdGhlICdvdXQnIGFycmF5IG5ldmVyIGdldHMgdG9vIGxvbmcuIFdoZW4gaXQgcmVhY2hlcyBhIGxpbWl0LCB3ZVxyXG4gICAgLy8gc3RyaW5naWZ5IHdoYXQgd2UgaGF2ZSBzbyBmYXIgYW5kIGFwcGVuZCB0byBhIGxpc3Qgb2Ygb3V0cHV0cy5cclxuICAgIGlmIChvdXQubGVuZ3RoID4gMTAyNCkge1xyXG4gICAgICBzdWJzdHJpbmdzLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBvdXQpKTtcclxuICAgICAgb3V0Lmxlbmd0aCA9IDA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdWJzdHJpbmdzLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBvdXQpKTtcclxuICByZXR1cm4gc3Vic3RyaW5ncy5qb2luKCcnKTtcclxufVxyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvY2FtZWxjYXNlICovXHJcbmltcG9ydCAnLi4vUGxhdGZvcm0vUGxhdGZvcm0nO1xyXG5pbXBvcnQgJy4uL0Vudmlyb25tZW50JztcclxuaW1wb3J0IHsgUmVuZGVyQmF0Y2ggfSBmcm9tICcuL1JlbmRlckJhdGNoL1JlbmRlckJhdGNoJztcclxuaW1wb3J0IHsgQnJvd3NlclJlbmRlcmVyIH0gZnJvbSAnLi9Ccm93c2VyUmVuZGVyZXInO1xyXG5pbXBvcnQgeyB0b0xvZ2ljYWxFbGVtZW50LCBMb2dpY2FsRWxlbWVudCB9IGZyb20gJy4vTG9naWNhbEVsZW1lbnRzJztcclxuXHJcbmludGVyZmFjZSBCcm93c2VyUmVuZGVyZXJSZWdpc3RyeSB7XHJcbiAgW2Jyb3dzZXJSZW5kZXJlcklkOiBudW1iZXJdOiBCcm93c2VyUmVuZGVyZXI7XHJcbn1cclxuY29uc3QgYnJvd3NlclJlbmRlcmVyczogQnJvd3NlclJlbmRlcmVyUmVnaXN0cnkgPSB7fTtcclxubGV0IHNob3VsZFJlc2V0U2Nyb2xsQWZ0ZXJOZXh0QmF0Y2ggPSBmYWxzZTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhdHRhY2hSb290Q29tcG9uZW50VG9Mb2dpY2FsRWxlbWVudChicm93c2VyUmVuZGVyZXJJZDogbnVtYmVyLCBsb2dpY2FsRWxlbWVudDogTG9naWNhbEVsZW1lbnQsIGNvbXBvbmVudElkOiBudW1iZXIpOiB2b2lkIHtcclxuICBsZXQgYnJvd3NlclJlbmRlcmVyID0gYnJvd3NlclJlbmRlcmVyc1ticm93c2VyUmVuZGVyZXJJZF07XHJcbiAgaWYgKCFicm93c2VyUmVuZGVyZXIpIHtcclxuICAgIGJyb3dzZXJSZW5kZXJlciA9IGJyb3dzZXJSZW5kZXJlcnNbYnJvd3NlclJlbmRlcmVySWRdID0gbmV3IEJyb3dzZXJSZW5kZXJlcihicm93c2VyUmVuZGVyZXJJZCk7XHJcbiAgfVxyXG5cclxuICBicm93c2VyUmVuZGVyZXIuYXR0YWNoUm9vdENvbXBvbmVudFRvTG9naWNhbEVsZW1lbnQoY29tcG9uZW50SWQsIGxvZ2ljYWxFbGVtZW50KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGF0dGFjaFJvb3RDb21wb25lbnRUb0VsZW1lbnQoZWxlbWVudFNlbGVjdG9yOiBzdHJpbmcsIGNvbXBvbmVudElkOiBudW1iZXIsIGJyb3dzZXJSZW5kZXJlcklkPzogbnVtYmVyKTogdm9pZCB7XHJcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudFNlbGVjdG9yKTtcclxuICBpZiAoIWVsZW1lbnQpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgYW55IGVsZW1lbnQgbWF0Y2hpbmcgc2VsZWN0b3IgJyR7ZWxlbWVudFNlbGVjdG9yfScuYCk7XHJcbiAgfVxyXG5cclxuICAvLyAnYWxsb3dFeGlzdGluZ0NvbnRlbnRzJyB0byBrZWVwIGFueSBwcmVyZW5kZXJlZCBjb250ZW50IHVudGlsIHdlIGRvIHRoZSBmaXJzdCBjbGllbnQtc2lkZSByZW5kZXJcclxuICAvLyBPbmx5IGNsaWVudC1zaWRlIEJsYXpvciBzdXBwbGllcyBhIGJyb3dzZXIgcmVuZGVyZXIgSURcclxuICBhdHRhY2hSb290Q29tcG9uZW50VG9Mb2dpY2FsRWxlbWVudChicm93c2VyUmVuZGVyZXJJZCB8fCAwLCB0b0xvZ2ljYWxFbGVtZW50KGVsZW1lbnQsIC8qIGFsbG93IGV4aXN0aW5nIGNvbnRlbnRzICovIHRydWUpLCBjb21wb25lbnRJZCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJCYXRjaChicm93c2VyUmVuZGVyZXJJZDogbnVtYmVyLCBiYXRjaDogUmVuZGVyQmF0Y2gpOiB2b2lkIHtcclxuICBjb25zdCBicm93c2VyUmVuZGVyZXIgPSBicm93c2VyUmVuZGVyZXJzW2Jyb3dzZXJSZW5kZXJlcklkXTtcclxuICBpZiAoIWJyb3dzZXJSZW5kZXJlcikge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGVyZSBpcyBubyBicm93c2VyIHJlbmRlcmVyIHdpdGggSUQgJHticm93c2VyUmVuZGVyZXJJZH0uYCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBhcnJheVJhbmdlUmVhZGVyID0gYmF0Y2guYXJyYXlSYW5nZVJlYWRlcjtcclxuICBjb25zdCB1cGRhdGVkQ29tcG9uZW50c1JhbmdlID0gYmF0Y2gudXBkYXRlZENvbXBvbmVudHMoKTtcclxuICBjb25zdCB1cGRhdGVkQ29tcG9uZW50c1ZhbHVlcyA9IGFycmF5UmFuZ2VSZWFkZXIudmFsdWVzKHVwZGF0ZWRDb21wb25lbnRzUmFuZ2UpO1xyXG4gIGNvbnN0IHVwZGF0ZWRDb21wb25lbnRzTGVuZ3RoID0gYXJyYXlSYW5nZVJlYWRlci5jb3VudCh1cGRhdGVkQ29tcG9uZW50c1JhbmdlKTtcclxuICBjb25zdCByZWZlcmVuY2VGcmFtZXMgPSBiYXRjaC5yZWZlcmVuY2VGcmFtZXMoKTtcclxuICBjb25zdCByZWZlcmVuY2VGcmFtZXNWYWx1ZXMgPSBhcnJheVJhbmdlUmVhZGVyLnZhbHVlcyhyZWZlcmVuY2VGcmFtZXMpO1xyXG4gIGNvbnN0IGRpZmZSZWFkZXIgPSBiYXRjaC5kaWZmUmVhZGVyO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHVwZGF0ZWRDb21wb25lbnRzTGVuZ3RoOyBpKyspIHtcclxuICAgIGNvbnN0IGRpZmYgPSBiYXRjaC51cGRhdGVkQ29tcG9uZW50c0VudHJ5KHVwZGF0ZWRDb21wb25lbnRzVmFsdWVzLCBpKTtcclxuICAgIGNvbnN0IGNvbXBvbmVudElkID0gZGlmZlJlYWRlci5jb21wb25lbnRJZChkaWZmKTtcclxuICAgIGNvbnN0IGVkaXRzID0gZGlmZlJlYWRlci5lZGl0cyhkaWZmKTtcclxuICAgIGJyb3dzZXJSZW5kZXJlci51cGRhdGVDb21wb25lbnQoYmF0Y2gsIGNvbXBvbmVudElkLCBlZGl0cywgcmVmZXJlbmNlRnJhbWVzVmFsdWVzKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGRpc3Bvc2VkQ29tcG9uZW50SWRzUmFuZ2UgPSBiYXRjaC5kaXNwb3NlZENvbXBvbmVudElkcygpO1xyXG4gIGNvbnN0IGRpc3Bvc2VkQ29tcG9uZW50SWRzVmFsdWVzID0gYXJyYXlSYW5nZVJlYWRlci52YWx1ZXMoZGlzcG9zZWRDb21wb25lbnRJZHNSYW5nZSk7XHJcbiAgY29uc3QgZGlzcG9zZWRDb21wb25lbnRJZHNMZW5ndGggPSBhcnJheVJhbmdlUmVhZGVyLmNvdW50KGRpc3Bvc2VkQ29tcG9uZW50SWRzUmFuZ2UpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGlzcG9zZWRDb21wb25lbnRJZHNMZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3QgY29tcG9uZW50SWQgPSBiYXRjaC5kaXNwb3NlZENvbXBvbmVudElkc0VudHJ5KGRpc3Bvc2VkQ29tcG9uZW50SWRzVmFsdWVzLCBpKTtcclxuICAgIGJyb3dzZXJSZW5kZXJlci5kaXNwb3NlQ29tcG9uZW50KGNvbXBvbmVudElkKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGRpc3Bvc2VkRXZlbnRIYW5kbGVySWRzUmFuZ2UgPSBiYXRjaC5kaXNwb3NlZEV2ZW50SGFuZGxlcklkcygpO1xyXG4gIGNvbnN0IGRpc3Bvc2VkRXZlbnRIYW5kbGVySWRzVmFsdWVzID0gYXJyYXlSYW5nZVJlYWRlci52YWx1ZXMoZGlzcG9zZWRFdmVudEhhbmRsZXJJZHNSYW5nZSk7XHJcbiAgY29uc3QgZGlzcG9zZWRFdmVudEhhbmRsZXJJZHNMZW5ndGggPSBhcnJheVJhbmdlUmVhZGVyLmNvdW50KGRpc3Bvc2VkRXZlbnRIYW5kbGVySWRzUmFuZ2UpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGlzcG9zZWRFdmVudEhhbmRsZXJJZHNMZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3QgZXZlbnRIYW5kbGVySWQgPSBiYXRjaC5kaXNwb3NlZEV2ZW50SGFuZGxlcklkc0VudHJ5KGRpc3Bvc2VkRXZlbnRIYW5kbGVySWRzVmFsdWVzLCBpKTtcclxuICAgIGJyb3dzZXJSZW5kZXJlci5kaXNwb3NlRXZlbnRIYW5kbGVyKGV2ZW50SGFuZGxlcklkKTtcclxuICB9XHJcblxyXG4gIHJlc2V0U2Nyb2xsSWZOZWVkZWQoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0U2Nyb2xsQWZ0ZXJOZXh0QmF0Y2goKSB7XHJcbiAgc2hvdWxkUmVzZXRTY3JvbGxBZnRlck5leHRCYXRjaCA9IHRydWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlc2V0U2Nyb2xsSWZOZWVkZWQoKSB7XHJcbiAgaWYgKHNob3VsZFJlc2V0U2Nyb2xsQWZ0ZXJOZXh0QmF0Y2gpIHtcclxuICAgIHNob3VsZFJlc2V0U2Nyb2xsQWZ0ZXJOZXh0QmF0Y2ggPSBmYWxzZTtcclxuXHJcbiAgICAvLyBUaGlzIGFzc3VtZXMgdGhlIHNjcm9sbGVyIGlzIG9uIHRoZSB3aW5kb3cgaXRzZWxmLiBUaGVyZSBpc24ndCBhIGdlbmVyYWwgd2F5IHRvIGtub3dcclxuICAgIC8vIGlmIHNvbWUgb3RoZXIgZWxlbWVudCBpcyBwbGF5aW5nIHRoZSByb2xlIG9mIHRoZSBwcmltYXJ5IHNjcm9sbCByZWdpb24uXHJcbiAgICB3aW5kb3cuc2Nyb2xsVG8gJiYgd2luZG93LnNjcm9sbFRvKDAsIDApO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBFdmVudERlc2NyaXB0b3IgfSBmcm9tICcuL0Jyb3dzZXJSZW5kZXJlcic7XHJcbmltcG9ydCB7IFVJRXZlbnRBcmdzIH0gZnJvbSAnLi9FdmVudEZvckRvdE5ldCc7XHJcblxyXG50eXBlIEV2ZW50RGlzcGF0Y2hlciA9IChldmVudERlc2NyaXB0b3I6IEV2ZW50RGVzY3JpcHRvciwgZXZlbnRBcmdzOiBVSUV2ZW50QXJncykgPT4gdm9pZDtcclxuXHJcbmxldCBldmVudERpc3BhdGNoZXJJbnN0YW5jZTogRXZlbnREaXNwYXRjaGVyO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BhdGNoRXZlbnQoZXZlbnREZXNjcmlwdG9yOiBFdmVudERlc2NyaXB0b3IsIGV2ZW50QXJnczogVUlFdmVudEFyZ3MpOiB2b2lkIHtcclxuICBpZiAoIWV2ZW50RGlzcGF0Y2hlckluc3RhbmNlKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2V2ZW50RGlzcGF0Y2hlciBub3QgaW5pdGlhbGl6ZWQuIENhbGwgXFwnc2V0RXZlbnREaXNwYXRjaGVyXFwnIHRvIGNvbmZpZ3VyZSBpdC4nKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBldmVudERpc3BhdGNoZXJJbnN0YW5jZShldmVudERlc2NyaXB0b3IsIGV2ZW50QXJncyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRFdmVudERpc3BhdGNoZXIobmV3RGlzcGF0Y2hlcjogKGV2ZW50RGVzY3JpcHRvcjogRXZlbnREZXNjcmlwdG9yLCBldmVudEFyZ3M6IFVJRXZlbnRBcmdzKSA9PiBQcm9taXNlPHZvaWQ+KTogdm9pZCB7XHJcbiAgZXZlbnREaXNwYXRjaGVySW5zdGFuY2UgPSBuZXdEaXNwYXRjaGVyO1xyXG59XHJcbiIsIi8vIGltcG9ydCAnQGRvdG5ldC9qc2ludGVyb3AnOyBJbXBvcnRlZCBlbHNld2hlcmVcclxuaW1wb3J0IHsgcmVzZXRTY3JvbGxBZnRlck5leHRCYXRjaCB9IGZyb20gJy4uL1JlbmRlcmluZy9SZW5kZXJlcic7XHJcbmltcG9ydCB7IEV2ZW50RGVsZWdhdG9yIH0gZnJvbSAnLi4vUmVuZGVyaW5nL0V2ZW50RGVsZWdhdG9yJztcclxuXHJcbmxldCBoYXNFbmFibGVkTmF2aWdhdGlvbkludGVyY2VwdGlvbiA9IGZhbHNlO1xyXG5sZXQgaGFzUmVnaXN0ZXJlZE5hdmlnYXRpb25FdmVudExpc3RlbmVycyA9IGZhbHNlO1xyXG5cclxuLy8gV2lsbCBiZSBpbml0aWFsaXplZCBvbmNlIHNvbWVvbmUgcmVnaXN0ZXJzXHJcbmxldCBub3RpZnlMb2NhdGlvbkNoYW5nZWRDYWxsYmFjazogKCh1cmk6IHN0cmluZywgaW50ZXJjZXB0ZWQ6IGJvb2xlYW4pID0+IFByb21pc2U8dm9pZD4pIHwgbnVsbCA9IG51bGw7XHJcblxyXG4vLyBUaGVzZSBhcmUgdGhlIGZ1bmN0aW9ucyB3ZSdyZSBtYWtpbmcgYXZhaWxhYmxlIGZvciBpbnZvY2F0aW9uIGZyb20gLk5FVFxyXG5leHBvcnQgY29uc3QgaW50ZXJuYWxGdW5jdGlvbnMgPSB7XHJcbiAgbGlzdGVuRm9yTmF2aWdhdGlvbkV2ZW50cyxcclxuICBlbmFibGVOYXZpZ2F0aW9uSW50ZXJjZXB0aW9uLFxyXG4gIG5hdmlnYXRlVG8sXHJcbiAgZ2V0QmFzZVVSSTogKCkgPT4gZG9jdW1lbnQuYmFzZVVSSSxcclxuICBnZXRMb2NhdGlvbkhyZWY6ICgpID0+IGxvY2F0aW9uLmhyZWYsXHJcbn07XHJcblxyXG5mdW5jdGlvbiBsaXN0ZW5Gb3JOYXZpZ2F0aW9uRXZlbnRzKGNhbGxiYWNrOiAodXJpOiBzdHJpbmcsIGludGVyY2VwdGVkOiBib29sZWFuKSA9PiBQcm9taXNlPHZvaWQ+KSB7XHJcbiAgbm90aWZ5TG9jYXRpb25DaGFuZ2VkQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuXHJcbiAgaWYgKGhhc1JlZ2lzdGVyZWROYXZpZ2F0aW9uRXZlbnRMaXN0ZW5lcnMpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGhhc1JlZ2lzdGVyZWROYXZpZ2F0aW9uRXZlbnRMaXN0ZW5lcnMgPSB0cnVlO1xyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsICgpID0+IG5vdGlmeUxvY2F0aW9uQ2hhbmdlZChmYWxzZSkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBlbmFibGVOYXZpZ2F0aW9uSW50ZXJjZXB0aW9uKCkge1xyXG4gIGhhc0VuYWJsZWROYXZpZ2F0aW9uSW50ZXJjZXB0aW9uID0gdHJ1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGF0dGFjaFRvRXZlbnREZWxlZ2F0b3IoZXZlbnREZWxlZ2F0b3I6IEV2ZW50RGVsZWdhdG9yKSB7XHJcbiAgLy8gV2UgbmVlZCB0byByZXNwb25kIHRvIGNsaWNrcyBvbiA8YT4gZWxlbWVudHMgKmFmdGVyKiB0aGUgRXZlbnREZWxlZ2F0b3IgaGFzIGZpbmlzaGVkXHJcbiAgLy8gcnVubmluZyBpdHMgc2ltdWxhdGVkIGJ1YmJsaW5nIHByb2Nlc3Mgc28gdGhhdCB3ZSBjYW4gcmVzcGVjdCBhbnkgcHJldmVudERlZmF1bHQgcmVxdWVzdHMuXHJcbiAgLy8gU28gaW5zdGVhZCBvZiByZWdpc3RlcmluZyBvdXIgb3duIG5hdGl2ZSBldmVudCwgcmVnaXN0ZXIgdXNpbmcgdGhlIEV2ZW50RGVsZWdhdG9yLlxyXG4gIGV2ZW50RGVsZWdhdG9yLm5vdGlmeUFmdGVyQ2xpY2soZXZlbnQgPT4ge1xyXG4gICAgaWYgKCFoYXNFbmFibGVkTmF2aWdhdGlvbkludGVyY2VwdGlvbikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGV2ZW50LmJ1dHRvbiAhPT0gMCB8fCBldmVudEhhc1NwZWNpYWxLZXkoZXZlbnQpKSB7XHJcbiAgICAgIC8vIERvbid0IHN0b3AgY3RybC9tZXRhLWNsaWNrIChldGMpIGZyb20gb3BlbmluZyBsaW5rcyBpbiBuZXcgdGFicy93aW5kb3dzXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSW50ZXJjZXB0IGNsaWNrcyBvbiBhbGwgPGE+IGVsZW1lbnRzIHdoZXJlIHRoZSBocmVmIGlzIHdpdGhpbiB0aGUgPGJhc2UgaHJlZj4gVVJJIHNwYWNlXHJcbiAgICAvLyBXZSBtdXN0IGV4cGxpY2l0bHkgY2hlY2sgaWYgaXQgaGFzIGFuICdocmVmJyBhdHRyaWJ1dGUsIGJlY2F1c2UgaWYgaXQgZG9lc24ndCwgdGhlIHJlc3VsdCBtaWdodCBiZSBudWxsIG9yIGFuIGVtcHR5IHN0cmluZyBkZXBlbmRpbmcgb24gdGhlIGJyb3dzZXJcclxuICAgIGNvbnN0IGFuY2hvclRhcmdldCA9IGZpbmRDbG9zZXN0QW5jZXN0b3IoZXZlbnQudGFyZ2V0IGFzIEVsZW1lbnQgfCBudWxsLCAnQScpIGFzIEhUTUxBbmNob3JFbGVtZW50IHwgbnVsbDtcclxuICAgIGNvbnN0IGhyZWZBdHRyaWJ1dGVOYW1lID0gJ2hyZWYnO1xyXG4gICAgaWYgKGFuY2hvclRhcmdldCAmJiBhbmNob3JUYXJnZXQuaGFzQXR0cmlidXRlKGhyZWZBdHRyaWJ1dGVOYW1lKSkge1xyXG4gICAgICBjb25zdCB0YXJnZXRBdHRyaWJ1dGVWYWx1ZSA9IGFuY2hvclRhcmdldC5nZXRBdHRyaWJ1dGUoJ3RhcmdldCcpO1xyXG4gICAgICBjb25zdCBvcGVuc0luU2FtZUZyYW1lID0gIXRhcmdldEF0dHJpYnV0ZVZhbHVlIHx8IHRhcmdldEF0dHJpYnV0ZVZhbHVlID09PSAnX3NlbGYnO1xyXG4gICAgICBpZiAoIW9wZW5zSW5TYW1lRnJhbWUpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGhyZWYgPSBhbmNob3JUYXJnZXQuZ2V0QXR0cmlidXRlKGhyZWZBdHRyaWJ1dGVOYW1lKSE7XHJcbiAgICAgIGNvbnN0IGFic29sdXRlSHJlZiA9IHRvQWJzb2x1dGVVcmkoaHJlZik7XHJcblxyXG4gICAgICBpZiAoaXNXaXRoaW5CYXNlVXJpU3BhY2UoYWJzb2x1dGVIcmVmKSkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgcGVyZm9ybUludGVybmFsTmF2aWdhdGlvbihhYnNvbHV0ZUhyZWYsIHRydWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBuYXZpZ2F0ZVRvKHVyaTogc3RyaW5nLCBmb3JjZUxvYWQ6IGJvb2xlYW4pIHtcclxuICBjb25zdCBhYnNvbHV0ZVVyaSA9IHRvQWJzb2x1dGVVcmkodXJpKTtcclxuXHJcbiAgaWYgKCFmb3JjZUxvYWQgJiYgaXNXaXRoaW5CYXNlVXJpU3BhY2UoYWJzb2x1dGVVcmkpKSB7XHJcbiAgICAvLyBJdCdzIGFuIGludGVybmFsIFVSTCwgc28gZG8gY2xpZW50LXNpZGUgbmF2aWdhdGlvblxyXG4gICAgcGVyZm9ybUludGVybmFsTmF2aWdhdGlvbihhYnNvbHV0ZVVyaSwgZmFsc2UpO1xyXG4gIH0gZWxzZSBpZiAoZm9yY2VMb2FkICYmIGxvY2F0aW9uLmhyZWYgPT09IHVyaSkge1xyXG4gICAgLy8gRm9yY2UtbG9hZGluZyB0aGUgc2FtZSBVUkwgeW91J3JlIGFscmVhZHkgb24gcmVxdWlyZXMgc3BlY2lhbCBoYW5kbGluZyB0byBhdm9pZFxyXG4gICAgLy8gdHJpZ2dlcmluZyBicm93c2VyLXNwZWNpZmljIGJlaGF2aW9yIGlzc3Vlcy5cclxuICAgIC8vIEZvciBkZXRhaWxzIGFib3V0IHdoYXQgdGhpcyBmaXhlcyBhbmQgd2h5LCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2FzcG5ldC9Bc3BOZXRDb3JlL3B1bGwvMTA4MzlcclxuICAgIGNvbnN0IHRlbXBvcmFyeVVyaSA9IHVyaSArICc/JztcclxuICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsICcnLCB0ZW1wb3JhcnlVcmkpO1xyXG4gICAgbG9jYXRpb24ucmVwbGFjZSh1cmkpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBJdCdzIGVpdGhlciBhbiBleHRlcm5hbCBVUkwsIG9yIGZvcmNlTG9hZCBpcyByZXF1ZXN0ZWQsIHNvIGRvIGEgZnVsbCBwYWdlIGxvYWRcclxuICAgIGxvY2F0aW9uLmhyZWYgPSB1cmk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwZXJmb3JtSW50ZXJuYWxOYXZpZ2F0aW9uKGFic29sdXRlSW50ZXJuYWxIcmVmOiBzdHJpbmcsIGludGVyY2VwdGVkTGluazogYm9vbGVhbikge1xyXG4gIC8vIFNpbmNlIHRoaXMgd2FzICpub3QqIHRyaWdnZXJlZCBieSBhIGJhY2svZm9yd2FyZCBnZXN0dXJlICh0aGF0IGdvZXMgdGhyb3VnaCBhIGRpZmZlcmVudFxyXG4gIC8vIGNvZGUgcGF0aCBzdGFydGluZyB3aXRoIGEgcG9wc3RhdGUgZXZlbnQpLCB3ZSBkb24ndCB3YW50IHRvIHByZXNlcnZlIHRoZSBjdXJyZW50IHNjcm9sbFxyXG4gIC8vIHBvc2l0aW9uLCBzbyByZXNldCBpdC5cclxuICAvLyBUbyBhdm9pZCB1Z2x5IGZsaWNrZXJpbmcgZWZmZWN0cywgd2UgZG9uJ3Qgd2FudCB0byBjaGFuZ2UgdGhlIHNjcm9sbCBwb3NpdGlvbiB1bnRpbCB0aGVcclxuICAvLyB3ZSByZW5kZXIgdGhlIG5ldyBwYWdlLiBBcyBhIGJlc3QgYXBwcm94aW1hdGlvbiwgd2FpdCB1bnRpbCB0aGUgbmV4dCBiYXRjaC5cclxuICByZXNldFNjcm9sbEFmdGVyTmV4dEJhdGNoKCk7XHJcblxyXG4gIGhpc3RvcnkucHVzaFN0YXRlKG51bGwsIC8qIGlnbm9yZWQgdGl0bGUgKi8gJycsIGFic29sdXRlSW50ZXJuYWxIcmVmKTtcclxuICBub3RpZnlMb2NhdGlvbkNoYW5nZWQoaW50ZXJjZXB0ZWRMaW5rKTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gbm90aWZ5TG9jYXRpb25DaGFuZ2VkKGludGVyY2VwdGVkTGluazogYm9vbGVhbikge1xyXG4gIGlmIChub3RpZnlMb2NhdGlvbkNoYW5nZWRDYWxsYmFjaykge1xyXG4gICAgYXdhaXQgbm90aWZ5TG9jYXRpb25DaGFuZ2VkQ2FsbGJhY2sobG9jYXRpb24uaHJlZiwgaW50ZXJjZXB0ZWRMaW5rKTtcclxuICB9XHJcbn1cclxuXHJcbmxldCB0ZXN0QW5jaG9yOiBIVE1MQW5jaG9yRWxlbWVudDtcclxuZnVuY3Rpb24gdG9BYnNvbHV0ZVVyaShyZWxhdGl2ZVVyaTogc3RyaW5nKSB7XHJcbiAgdGVzdEFuY2hvciA9IHRlc3RBbmNob3IgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gIHRlc3RBbmNob3IuaHJlZiA9IHJlbGF0aXZlVXJpO1xyXG4gIHJldHVybiB0ZXN0QW5jaG9yLmhyZWY7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbmRDbG9zZXN0QW5jZXN0b3IoZWxlbWVudDogRWxlbWVudCB8IG51bGwsIHRhZ05hbWU6IHN0cmluZykge1xyXG4gIHJldHVybiAhZWxlbWVudFxyXG4gICAgPyBudWxsXHJcbiAgICA6IGVsZW1lbnQudGFnTmFtZSA9PT0gdGFnTmFtZVxyXG4gICAgICA/IGVsZW1lbnRcclxuICAgICAgOiBmaW5kQ2xvc2VzdEFuY2VzdG9yKGVsZW1lbnQucGFyZW50RWxlbWVudCwgdGFnTmFtZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzV2l0aGluQmFzZVVyaVNwYWNlKGhyZWY6IHN0cmluZykge1xyXG4gIGNvbnN0IGJhc2VVcmlXaXRoVHJhaWxpbmdTbGFzaCA9IHRvQmFzZVVyaVdpdGhUcmFpbGluZ1NsYXNoKGRvY3VtZW50LmJhc2VVUkkhKTsgLy8gVE9ETzogTWlnaHQgYmFzZVVSSSByZWFsbHkgYmUgbnVsbD9cclxuICByZXR1cm4gaHJlZi5zdGFydHNXaXRoKGJhc2VVcmlXaXRoVHJhaWxpbmdTbGFzaCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvQmFzZVVyaVdpdGhUcmFpbGluZ1NsYXNoKGJhc2VVcmk6IHN0cmluZykge1xyXG4gIHJldHVybiBiYXNlVXJpLnN1YnN0cigwLCBiYXNlVXJpLmxhc3RJbmRleE9mKCcvJykgKyAxKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZXZlbnRIYXNTcGVjaWFsS2V5KGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgcmV0dXJuIGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQuc2hpZnRLZXkgfHwgZXZlbnQuYWx0S2V5IHx8IGV2ZW50Lm1ldGFLZXk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==