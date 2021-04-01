import { DotNet } from '@microsoft/dotnet-js-interop';
import { attachDebuggerHotkey, hasDebuggingEnabled } from './MonoDebugger';
import { showErrorNotification } from '../../BootErrors';
import { WebAssemblyResourceLoader, LoadingResource } from '../WebAssemblyResourceLoader';
import { Platform, System_Array, Pointer, System_Object, System_String, HeapLock } from '../Platform';
import { WebAssemblyBootResourceType } from '../WebAssemblyStartOptions';
import { BootJsonData, ICUDataMode } from '../BootConfig';
import { Blazor } from '../../GlobalExports';

declare var Module: EmscriptenModule;

let mono_wasm_add_assembly: (name: string, heapAddress: number, length: number) => void;
const appBinDirName = 'appBinDir';
const uint64HighOrderShift = Math.pow(2, 32);
const maxSafeNumberHighPart = Math.pow(2, 21) - 1; // The high-order int32 from Number.MAX_SAFE_INTEGER

let currentHeapLock: MonoHeapLock | null = null;

// Memory access helpers
// The implementations are exactly equivalent to what the global getValue(addr, type) function does,
// except without having to parse the 'type' parameter, and with less risk of mistakes at the call site
function getValueI16(ptr: number) { return Module.HEAP16[ptr >> 1]; }
function getValueI32(ptr: number) { return Module.HEAP32[ptr >> 2]; }
function getValueFloat(ptr: number) { return Module.HEAPF32[ptr >> 2]; }
function getValueU64(ptr: number) {
  // There is no Module.HEAPU64, and Module.getValue(..., 'i64') doesn't work because the implementation
  // treats 'i64' as being the same as 'i32'. Also we must take care to read both halves as unsigned.
  const heapU32Index = ptr >> 2;
  const highPart = Module.HEAPU32[heapU32Index + 1];
  if (highPart > maxSafeNumberHighPart) {
    throw new Error(`Cannot read uint64 with high order part ${highPart}, because the result would exceed Number.MAX_SAFE_INTEGER.`);
  }

  return (highPart * uint64HighOrderShift) + Module.HEAPU32[heapU32Index];
}

export const monoPlatform: Platform = {
  start: function start(resourceLoader: WebAssemblyResourceLoader) {
    return new Promise<void>((resolve, reject) => {
      attachDebuggerHotkey(resourceLoader);

      // dotnet.js assumes the existence of this
      window['Browser'] = {
        init: () => { },
      };

      // Emscripten works by expecting the module config to be a global
      // For compatibility with macOS Catalina, we have to assign a temporary value to window.Module
      // before we start loading the WebAssembly files
      addGlobalModuleScriptTagsToDocument(() => {
        window['Module'] = createEmscriptenModuleInstance(resourceLoader, resolve, reject);
        addScriptTagsToDocument(resourceLoader);
      });
    });
  },

  callEntryPoint: function callEntryPoint(assemblyName: string) {
    // Instead of using Module.mono_call_assembly_entry_point, we have our own logic for invoking
    // the entrypoint which adds support for async main.
    // Currently we disregard the return value from the entrypoint, whether it's sync or async.
    // In the future, we might want Blazor.start to return a Promise<Promise<value>>, where the
    // outer promise reflects the startup process, and the inner one reflects the possibly-async
    // .NET entrypoint method.
    const invokeEntrypoint = bindStaticMethod('Microsoft.AspNetCore.Components.WebAssembly', 'Microsoft.AspNetCore.Components.WebAssembly.Hosting.EntrypointInvoker', 'InvokeEntrypoint');
    // Note we're passing in null because passing arrays is problematic until https://github.com/mono/mono/issues/18245 is resolved.
    invokeEntrypoint(assemblyName, null);
  },

  toUint8Array: function toUint8Array(array: System_Array<any>): Uint8Array {
    const dataPtr = getArrayDataPointer(array);
    const length = getValueI32(dataPtr);
    return new Uint8Array(Module.HEAPU8.buffer, dataPtr + 4, length);
  },

  getArrayLength: function getArrayLength(array: System_Array<any>): number {
    return getValueI32(getArrayDataPointer(array));
  },

  getArrayEntryPtr: function getArrayEntryPtr<TPtr extends Pointer>(array: System_Array<TPtr>, index: number, itemSize: number): TPtr {
    // First byte is array length, followed by entries
    const address = getArrayDataPointer(array) + 4 + index * itemSize;
    return address as any as TPtr;
  },

  getObjectFieldsBaseAddress: function getObjectFieldsBaseAddress(referenceTypedObject: System_Object): Pointer {
    // The first two int32 values are internal Mono data
    return (referenceTypedObject as any as number + 8) as any as Pointer;
  },

  readInt16Field: function readHeapInt16(baseAddress: Pointer, fieldOffset?: number): number {
    return getValueI16((baseAddress as any as number) + (fieldOffset || 0));
  },

  readInt32Field: function readHeapInt32(baseAddress: Pointer, fieldOffset?: number): number {
    return getValueI32((baseAddress as any as number) + (fieldOffset || 0));
  },

  readUint64Field: function readHeapUint64(baseAddress: Pointer, fieldOffset?: number): number {
    return getValueU64((baseAddress as any as number) + (fieldOffset || 0));
  },

  readFloatField: function readHeapFloat(baseAddress: Pointer, fieldOffset?: number): number {
    return getValueFloat((baseAddress as any as number) + (fieldOffset || 0));
  },

  readObjectField: function readHeapObject<T extends System_Object>(baseAddress: Pointer, fieldOffset?: number): T {
    return getValueI32((baseAddress as any as number) + (fieldOffset || 0)) as any as T;
  },

  readStringField: function readHeapObject(baseAddress: Pointer, fieldOffset?: number, readBoolValueAsString?: boolean): string | null {
    const fieldValue = getValueI32((baseAddress as any as number) + (fieldOffset || 0));
    if (fieldValue === 0) {
      return null;
    }

    if (readBoolValueAsString) {
      // Some fields are stored as a union of bool | string | null values, but need to read as a string.
      // If the stored value is a bool, the behavior we want is empty string ('') for true, or null for false.
      const unboxedValue = BINDING.unbox_mono_obj(fieldValue as any as System_Object);
      if (typeof (unboxedValue) === 'boolean') {
        return unboxedValue ? '' : null;
      }
      return unboxedValue;
    }

    let decodedString: string | null | undefined;
    if (currentHeapLock) {
      decodedString = currentHeapLock.stringCache.get(fieldValue);
      if (decodedString === undefined) {
        decodedString = BINDING.conv_string(fieldValue as any as System_String);
        currentHeapLock.stringCache.set(fieldValue, decodedString);
      }
    } else {
      decodedString = BINDING.conv_string(fieldValue as any as System_String);
    }

    return decodedString;
  },

  readStructField: function readStructField<T extends Pointer>(baseAddress: Pointer, fieldOffset?: number): T {
    return ((baseAddress as any as number) + (fieldOffset || 0)) as any as T;
  },

  beginHeapLock: function () {
    assertHeapIsNotLocked();
    currentHeapLock = new MonoHeapLock();
    return currentHeapLock;
  },

  invokeWhenHeapUnlocked: function (callback) {
    // This is somewhat like a sync context. If we're not locked, just pass through the call directly.
    if (!currentHeapLock) {
      callback();
    } else {
      currentHeapLock.enqueuePostReleaseAction(callback);
    }
  }
};

function addScriptTagsToDocument(resourceLoader: WebAssemblyResourceLoader) {
  const browserSupportsNativeWebAssembly = typeof WebAssembly !== 'undefined' && WebAssembly.validate;
  if (!browserSupportsNativeWebAssembly) {
    throw new Error('This browser does not support WebAssembly.');
  }

  // The dotnet.*.js file has a version or hash in its name as a form of cache-busting. This is needed
  // because it's the only part of the loading process that can't use cache:'no-cache' (because it's
  // not a 'fetch') and isn't controllable by the developer (so they can't put in their own cache-busting
  // querystring). So, to find out the exact URL we have to search the boot manifest.
  const dotnetJsResourceName = Object
    .keys(resourceLoader.bootConfig.resources.runtime)
    .filter(n => n.startsWith('dotnet.') && n.endsWith('.js'))[0];
  const dotnetJsContentHash = resourceLoader.bootConfig.resources.runtime[dotnetJsResourceName];
  const scriptElem = document.createElement('script');
  scriptElem.src = `_framework/${dotnetJsResourceName}`;
  scriptElem.defer = true;

  // For consistency with WebAssemblyResourceLoader, we only enforce SRI if caching is allowed
  if (resourceLoader.bootConfig.cacheBootResources) {
    scriptElem.integrity = dotnetJsContentHash;
    scriptElem.crossOrigin = 'anonymous';
  }

  // Allow overriding the URI from which the dotnet.*.js file is loaded
  if (resourceLoader.startOptions.loadBootResource) {
    const resourceType: WebAssemblyBootResourceType = 'dotnetjs';
    const customSrc = resourceLoader.startOptions.loadBootResource(
      resourceType, dotnetJsResourceName, scriptElem.src, dotnetJsContentHash);
    if (typeof (customSrc) === 'string') {
      scriptElem.src = customSrc;
    } else if (customSrc) {
      // Since we must load this via a <script> tag, it's only valid to supply a URI (and not a Request, say)
      throw new Error(`For a ${resourceType} resource, custom loaders must supply a URI string.`);
    }
  }

  document.body.appendChild(scriptElem);
}

// Due to a strange behavior in macOS Catalina, we have to delay loading the WebAssembly files
// until after it finishes evaluating a <script> element that assigns a value to window.Module.
// This may be fixed in a later version of macOS/iOS, or even if not it may be possible to reduce
// this to a smaller workaround.
function addGlobalModuleScriptTagsToDocument(callback: () => void) {
  const scriptElem = document.createElement('script');

  // This pollutes global but is needed so it can be called from the script.
  // The callback is put in the global scope so that it can be run after the script is loaded.
  // onload cannot be used in this case for non-file scripts.
  window['__wasmmodulecallback__'] = callback;
  scriptElem.text = 'var Module; window.__wasmmodulecallback__(); delete window.__wasmmodulecallback__;';

  document.body.appendChild(scriptElem);
}

function createEmscriptenModuleInstance(resourceLoader: WebAssemblyResourceLoader, onReady: () => void, onError: (reason?: any) => void) {
  const resources = resourceLoader.bootConfig.resources;
  const module = (window['Module'] || {}) as typeof Module;
  const suppressMessages = ['DEBUGGING ENABLED'];

  module.print = line => (suppressMessages.indexOf(line) < 0 && console.log(line));

  module.printErr = line => {
    // If anything writes to stderr, treat it as a critical exception. The underlying runtime writes
    // to stderr if a truly critical problem occurs outside .NET code. Note that .NET unhandled
    // exceptions also reach this, but via a different code path - see dotNetCriticalError below.
    console.error(line);
    showErrorNotification();
  };
  module.preRun = module.preRun || [];
  module.postRun = module.postRun || [];
  (module as any).preloadPlugins = [];

  // Begin loading the .dll/.pdb/.wasm files, but don't block here. Let other loading processes run in parallel.
  const dotnetWasmResourceName = 'dotnet.wasm';
  const assembliesBeingLoaded = resourceLoader.loadResources(resources.assembly, filename => `_framework/${filename}`, 'assembly');
  const pdbsBeingLoaded = resourceLoader.loadResources(resources.pdb || {}, filename => `_framework/${filename}`, 'pdb');
  const wasmBeingLoaded = resourceLoader.loadResource(
    /* name */ dotnetWasmResourceName,
    /* url */  `_framework/${dotnetWasmResourceName}`,
    /* hash */ resourceLoader.bootConfig.resources.runtime[dotnetWasmResourceName],
    /* type */ 'dotnetwasm');

  const dotnetTimeZoneResourceName = 'dotnet.timezones.blat';
  let timeZoneResource: LoadingResource | undefined;
  if (resourceLoader.bootConfig.resources.runtime.hasOwnProperty(dotnetTimeZoneResourceName)) {
    timeZoneResource = resourceLoader.loadResource(
      dotnetTimeZoneResourceName,
      `_framework/${dotnetTimeZoneResourceName}`,
      resourceLoader.bootConfig.resources.runtime[dotnetTimeZoneResourceName],
      'globalization');
  }

  let icuDataResource: LoadingResource | undefined;
  if (resourceLoader.bootConfig.icuDataMode != ICUDataMode.Invariant) {
    const applicationCulture = resourceLoader.startOptions.applicationCulture || (navigator.languages && navigator.languages[0]);
    const icuDataResourceName = getICUResourceName(resourceLoader.bootConfig, applicationCulture);
    icuDataResource = resourceLoader.loadResource(
      icuDataResourceName,
      `_framework/${icuDataResourceName}`,
      resourceLoader.bootConfig.resources.runtime[icuDataResourceName],
      'globalization');
  }

  // Override the mechanism for fetching the main wasm file so we can connect it to our cache
  module.instantiateWasm = (imports, successCallback): Emscripten.WebAssemblyExports => {
    (async () => {
      let compiledInstance: WebAssembly.Instance;
      try {
        const dotnetWasmResource = await wasmBeingLoaded;
        compiledInstance = await compileWasmModule(dotnetWasmResource, imports);
      } catch (ex) {
        module.printErr(ex);
        throw ex;
      }
      successCallback(compiledInstance);
    })();
    return []; // No exports
  };

  module.preRun.push(() => {
    // By now, emscripten should be initialised enough that we can capture these methods for later use
    mono_wasm_add_assembly = cwrap('mono_wasm_add_assembly', null, ['string', 'number', 'number']);
    MONO.loaded_files = [];

    if (timeZoneResource) {
      loadTimezone(timeZoneResource);
    }

    if (icuDataResource) {
      loadICUData(icuDataResource);
    } else {
      // Use invariant culture if the app does not carry icu data.
      MONO.mono_wasm_setenv('DOTNET_SYSTEM_GLOBALIZATION_INVARIANT', '1');
    }

    // Fetch the assemblies and PDBs in the background, telling Mono to wait until they are loaded
    // Mono requires the assembly filenames to have a '.dll' extension, so supply such names regardless
    // of the extensions in the URLs. This allows loading assemblies with arbitrary filenames.
    assembliesBeingLoaded.forEach(r => addResourceAsAssembly(r, changeExtension(r.name, '.dll')));
    pdbsBeingLoaded.forEach(r => addResourceAsAssembly(r, r.name));

    Blazor._internal.dotNetCriticalError = (message: System_String) => {
      module.printErr(BINDING.conv_string(message) || '(null)');
    };

    // Wire-up callbacks for satellite assemblies. Blazor will call these as part of the application
    // startup sequence to load satellite assemblies for the application's culture.
    Blazor._internal.getSatelliteAssemblies = (culturesToLoadDotNetArray: System_Array<System_String>): System_Object => {
      const culturesToLoad = BINDING.mono_array_to_js_array<System_String, string>(culturesToLoadDotNetArray);
      const satelliteResources = resourceLoader.bootConfig.resources.satelliteResources;
      const applicationCulture = resourceLoader.startOptions.applicationCulture || (navigator.languages && navigator.languages[0]);

      if (satelliteResources) {
        const resourcePromises = Promise.all(culturesToLoad
          .filter(culture => satelliteResources.hasOwnProperty(culture))
          .map(culture => resourceLoader.loadResources(satelliteResources[culture], fileName => `_framework/${fileName}`, 'assembly'))
          .reduce((previous, next) => previous.concat(next), new Array<LoadingResource>())
          .map(async resource => (await resource.response).arrayBuffer()));

        return BINDING.js_to_mono_obj(
          resourcePromises.then(resourcesToLoad => {
            if (resourcesToLoad.length) {
              Blazor._internal.readSatelliteAssemblies = () => {
                const array = BINDING.mono_obj_array_new(resourcesToLoad.length);
                for (var i = 0; i < resourcesToLoad.length; i++) {
                  BINDING.mono_obj_array_set(array, i, BINDING.js_typed_array_to_array(new Uint8Array(resourcesToLoad[i])));
                }
                return array;
              };
            }

            return resourcesToLoad.length;
          }));
      }
      return BINDING.js_to_mono_obj(Promise.resolve(0));
    }

    const lazyResources: {
      assemblies?: (ArrayBuffer | null)[],
      pdbs?: (ArrayBuffer | null)[]
    } = {};
    Blazor._internal.getLazyAssemblies = (assembliesToLoadDotNetArray: System_Array<System_String>): System_Object => {
      const assembliesToLoad = BINDING.mono_array_to_js_array<System_String, string>(assembliesToLoadDotNetArray);
      const lazyAssemblies = resourceLoader.bootConfig.resources.lazyAssembly;

      if (!lazyAssemblies) {
        throw new Error("No assemblies have been marked as lazy-loadable. Use the 'BlazorWebAssemblyLazyLoad' item group in your project file to enable lazy loading an assembly.");
      }

      var assembliesMarkedAsLazy = assembliesToLoad.filter(assembly => lazyAssemblies.hasOwnProperty(assembly));

      if (assembliesMarkedAsLazy.length != assembliesToLoad.length) {
        var notMarked = assembliesToLoad.filter(assembly => !assembliesMarkedAsLazy.includes(assembly));
        throw new Error(`${notMarked.join()} must be marked with 'BlazorWebAssemblyLazyLoad' item group in your project file to allow lazy-loading.`);
      }

      let pdbPromises: Promise<(ArrayBuffer | null)[]> | undefined;
      if (hasDebuggingEnabled()) {
        const pdbs = resourceLoader.bootConfig.resources.pdb;
        const pdbsToLoad = assembliesMarkedAsLazy.map(a => changeExtension(a, '.pdb'))
        if (pdbs) {
          pdbPromises = Promise.all(pdbsToLoad
            .map(pdb => lazyAssemblies.hasOwnProperty(pdb) ? resourceLoader.loadResource(pdb, `_framework/${pdb}`, lazyAssemblies[pdb], 'pdb') : null)
            .map(async resource => resource ? (await resource.response).arrayBuffer() : null));
        }
      }

      const resourcePromises = Promise.all(assembliesMarkedAsLazy
        .map(assembly => resourceLoader.loadResource(assembly, `_framework/${assembly}`, lazyAssemblies[assembly], 'assembly'))
        .map(async resource => (await resource.response).arrayBuffer()));


      return BINDING.js_to_mono_obj(
        Promise.all([resourcePromises, pdbPromises]).then(values => {
          lazyResources["assemblies"] = values[0];
          lazyResources["pdbs"] = values[1];
          if (lazyResources["assemblies"].length) {
            Blazor._internal.readLazyAssemblies = () => {
              const { assemblies } = lazyResources;
              if (!assemblies) {
                return BINDING.mono_obj_array_new(0);
              }
              const assemblyBytes = BINDING.mono_obj_array_new(assemblies.length);
              for (let i = 0; i < assemblies.length; i++) {
                const assembly = assemblies[i] as ArrayBuffer;
                BINDING.mono_obj_array_set(assemblyBytes, i, BINDING.js_typed_array_to_array(new Uint8Array(assembly)));
              }
              return assemblyBytes;
            };

            Blazor._internal.readLazyPdbs = () => {
              const { assemblies, pdbs } = lazyResources;
              if (!assemblies) {
                return BINDING.mono_obj_array_new(0);
              }
              const pdbBytes = BINDING.mono_obj_array_new(assemblies.length);
              for (let i = 0; i < assemblies.length; i++) {
                const pdb = pdbs && pdbs[i] ? new Uint8Array(pdbs[i] as ArrayBufferLike) : new Uint8Array();
                BINDING.mono_obj_array_set(pdbBytes, i, BINDING.js_typed_array_to_array(pdb));
              }
              return pdbBytes;
            };
          }

          return lazyResources["assemblies"].length;
        }));
    }
  });

  module.postRun.push(() => {
    if (resourceLoader.bootConfig.debugBuild && resourceLoader.bootConfig.cacheBootResources) {
      resourceLoader.logToConsole();
    }
    resourceLoader.purgeUnusedCacheEntriesAsync(); // Don't await - it's fine to run in background

    if (resourceLoader.bootConfig.icuDataMode === ICUDataMode.Sharded) {
      MONO.mono_wasm_setenv('__BLAZOR_SHARDED_ICU',  '1');

      if (resourceLoader.startOptions.applicationCulture) {
        // If a culture is specified via start options use that to initialize the Emscripten \  .NET culture.
        MONO.mono_wasm_setenv('LANG',  `${resourceLoader.startOptions.applicationCulture}.UTF-8`);
      }
    }
    MONO.mono_wasm_setenv("MONO_URI_DOTNETRELATIVEORABSOLUTE", "true");
    let timeZone = "UTC";
    try {
      timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch { }
    MONO.mono_wasm_setenv("TZ", timeZone || 'UTC');
    if (resourceLoader.bootConfig.debugBuild) {
      // Configure the app to enable hot reload in Development.
      MONO.mono_wasm_setenv('DOTNET_MODIFIABLE_ASSEMBLIES', 'debug');
    }

    const load_runtime = cwrap('mono_wasm_load_runtime', null, ['string', 'number']);
    // -1 enables debugging with logging disabled. 0 disables debugging entirely.
    load_runtime(appBinDirName, hasDebuggingEnabled() ? -1 : 0);
    MONO.mono_wasm_runtime_ready();
    attachInteropInvoker();
    onReady();
  });

  return module;

  async function addResourceAsAssembly(dependency: LoadingResource, loadAsName: string) {
    const runDependencyId = `blazor:${dependency.name}`;
    addRunDependency(runDependencyId);

    try {
      // Wait for the data to be loaded and verified
      const dataBuffer = await dependency.response.then(r => r.arrayBuffer());

      // Load it into the Mono runtime
      const data = new Uint8Array(dataBuffer);
      const heapAddress = Module._malloc(data.length);
      const heapMemory = new Uint8Array(Module.HEAPU8.buffer, heapAddress, data.length);
      heapMemory.set(data);
      mono_wasm_add_assembly(loadAsName, heapAddress, data.length);
      MONO.loaded_files.push(toAbsoluteUrl(dependency.url));
    } catch (errorInfo) {
      onError(errorInfo);
      return;
    }

    removeRunDependency(runDependencyId);
  }
}

const anchorTagForAbsoluteUrlConversions = document.createElement('a');
function toAbsoluteUrl(possiblyRelativeUrl: string) {
  anchorTagForAbsoluteUrlConversions.href = possiblyRelativeUrl;
  return anchorTagForAbsoluteUrlConversions.href;
}

function getArrayDataPointer<T>(array: System_Array<T>): number {
  return <number><any>array + 12; // First byte from here is length, then following bytes are entries
}

function bindStaticMethod(assembly: string, typeName: string, method: string) {
  // Fully qualified name looks like this: "[debugger-test] Math:IntAdd"
  const fqn = `[${assembly}] ${typeName}:${method}`;
  return BINDING.bind_static_method(fqn);
}

function attachInteropInvoker(): void {
  const dotNetDispatcherInvokeMethodHandle = bindStaticMethod('Microsoft.AspNetCore.Components.WebAssembly', 'Microsoft.AspNetCore.Components.WebAssembly.Services.DefaultWebAssemblyJSRuntime', 'InvokeDotNet');
  const dotNetDispatcherBeginInvokeMethodHandle = bindStaticMethod('Microsoft.AspNetCore.Components.WebAssembly', 'Microsoft.AspNetCore.Components.WebAssembly.Services.DefaultWebAssemblyJSRuntime', 'BeginInvokeDotNet');
  const dotNetDispatcherEndInvokeJSMethodHandle = bindStaticMethod('Microsoft.AspNetCore.Components.WebAssembly', 'Microsoft.AspNetCore.Components.WebAssembly.Services.DefaultWebAssemblyJSRuntime', 'EndInvokeJS');

  DotNet.attachDispatcher({
    beginInvokeDotNetFromJS: (callId: number, assemblyName: string | null, methodIdentifier: string, dotNetObjectId: any | null, argsJson: string): void => {
      assertHeapIsNotLocked();
      if (!dotNetObjectId && !assemblyName) {
        throw new Error('Either assemblyName or dotNetObjectId must have a non null value.');
      }
      // As a current limitation, we can only pass 4 args. Fortunately we only need one of
      // 'assemblyName' or 'dotNetObjectId', so overload them in a single slot
      const assemblyNameOrDotNetObjectId: string = dotNetObjectId
        ? dotNetObjectId.toString()
        : assemblyName;

      dotNetDispatcherBeginInvokeMethodHandle(
        callId ? callId.toString() : null,
        assemblyNameOrDotNetObjectId,
        methodIdentifier,
        argsJson,
      );
    },
    endInvokeJSFromDotNet: (asyncHandle, succeeded, serializedArgs): void => {
      dotNetDispatcherEndInvokeJSMethodHandle(
        serializedArgs
      );
    },
    invokeDotNetFromJS: (assemblyName, methodIdentifier, dotNetObjectId, argsJson) => {
      assertHeapIsNotLocked();
      return dotNetDispatcherInvokeMethodHandle(
        assemblyName ? assemblyName : null,
        methodIdentifier,
        dotNetObjectId ? dotNetObjectId.toString() : null,
        argsJson,
      ) as string;
    },
  });
}

async function loadTimezone(timeZoneResource: LoadingResource): Promise<void> {
  const runDependencyId = `blazor:timezonedata`;
  addRunDependency(runDependencyId);

  const request = await timeZoneResource.response;
  const arrayBuffer = await request.arrayBuffer();

  Module['FS_createPath']('/', 'usr', true, true);
  Module['FS_createPath']('/usr/', 'share', true, true);
  Module['FS_createPath']('/usr/share/', 'zoneinfo', true, true);
  MONO.mono_wasm_load_data_archive(new Uint8Array(arrayBuffer), '/usr/share/zoneinfo/');

  removeRunDependency(runDependencyId);
}

function getICUResourceName(bootConfig: BootJsonData, culture: string | undefined): string {
  const combinedICUResourceName = 'icudt.dat';
  if (!culture || bootConfig.icuDataMode === ICUDataMode.All) {
    return combinedICUResourceName;
  }

  const prefix = culture.split('-')[0];
  if (['en', 'fr', 'it', 'de', 'es'].includes(prefix)) {
    return 'icudt_EFIGS.dat';
  } else if (['zh', 'ko', 'ja'].includes(prefix)) {
    return 'icudt_CJK.dat';
  } else {
    return 'icudt_no_CJK.dat';
  }
}

async function loadICUData(icuDataResource: LoadingResource): Promise<void> {
  const runDependencyId = `blazor:icudata`;
  addRunDependency(runDependencyId);

  const request = await icuDataResource.response;
  const array = new Uint8Array(await request.arrayBuffer());

  const offset = MONO.mono_wasm_load_bytes_into_heap(array);
  if (!MONO.mono_wasm_load_icu_data(offset)) {
    throw new Error("Error loading ICU asset.");
  }
  removeRunDependency(runDependencyId);
}

async function compileWasmModule(wasmResource: LoadingResource, imports: any): Promise<WebAssembly.Instance> {
  // This is the same logic as used in emscripten's generated js. We can't use emscripten's js because
  // it doesn't provide any method for supplying a custom response provider, and we want to integrate
  // with our resource loader cache.

  if (typeof WebAssembly['instantiateStreaming'] === 'function') {
    try {
      const streamingResult = await WebAssembly['instantiateStreaming'](wasmResource.response, imports);
      return streamingResult.instance;
    }
    catch (ex) {
      console.info('Streaming compilation failed. Falling back to ArrayBuffer instantiation. ', ex);
    }
  }

  // If that's not available or fails (e.g., due to incorrect content-type header),
  // fall back to ArrayBuffer instantiation
  const arrayBuffer = await wasmResource.response.then(r => r.arrayBuffer());
  const arrayBufferResult = await WebAssembly.instantiate(arrayBuffer, imports);
  return arrayBufferResult.instance;
}

function changeExtension(filename: string, newExtensionWithLeadingDot: string) {
  const lastDotIndex = filename.lastIndexOf('.');
  if (lastDotIndex < 0) {
    throw new Error(`No extension to replace in '${filename}'`);
  }

  return filename.substr(0, lastDotIndex) + newExtensionWithLeadingDot;
}

function assertHeapIsNotLocked() {
  if (currentHeapLock) {
    throw new Error('Assertion failed - heap is currently locked');
  }
}

class MonoHeapLock implements HeapLock {
  // Within a given heap lock, it's safe to cache decoded strings since the memory can't change
  stringCache = new Map<number, string | null>();

  private postReleaseActions?: Function[];

  enqueuePostReleaseAction(callback: Function) {
    if (!this.postReleaseActions) {
      this.postReleaseActions = [];
    }

    this.postReleaseActions.push(callback);
  }

  release() {
    if (currentHeapLock !== this) {
      throw new Error('Trying to release a lock which isn\'t current');
    }

    currentHeapLock = null;

    while (this.postReleaseActions?.length) {
      const nextQueuedAction = this.postReleaseActions.shift()!;

      // It's possible that the action we invoke here might itself take a succession of heap locks,
      // but since heap locks must be released synchronously, by the time we get back to this stack
      // frame, we know the heap should no longer be locked.
      nextQueuedAction();
      assertHeapIsNotLocked();
    }
  }
}
