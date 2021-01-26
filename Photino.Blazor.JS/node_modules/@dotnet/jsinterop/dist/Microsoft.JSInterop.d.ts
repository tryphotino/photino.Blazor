declare module DotNet {
    type JsonReviver = ((key: any, value: any) => any);
    /**
     * Sets the specified .NET call dispatcher as the current instance so that it will be used
     * for future invocations.
     *
     * @param dispatcher An object that can dispatch calls from JavaScript to a .NET runtime.
     */
    function attachDispatcher(dispatcher: DotNetCallDispatcher): void;
    /**
     * Adds a JSON reviver callback that will be used when parsing arguments received from .NET.
     * @param reviver The reviver to add.
     */
    function attachReviver(reviver: JsonReviver): void;
    /**
     * Invokes the specified .NET public method synchronously. Not all hosting scenarios support
     * synchronous invocation, so if possible use invokeMethodAsync instead.
     *
     * @param assemblyName The short name (without key/version or .dll extension) of the .NET assembly containing the method.
     * @param methodIdentifier The identifier of the method to invoke. The method must have a [JSInvokable] attribute specifying this identifier.
     * @param args Arguments to pass to the method, each of which must be JSON-serializable.
     * @returns The result of the operation.
     */
    function invokeMethod<T>(assemblyName: string, methodIdentifier: string, ...args: any[]): T;
    /**
     * Invokes the specified .NET public method asynchronously.
     *
     * @param assemblyName The short name (without key/version or .dll extension) of the .NET assembly containing the method.
     * @param methodIdentifier The identifier of the method to invoke. The method must have a [JSInvokable] attribute specifying this identifier.
     * @param args Arguments to pass to the method, each of which must be JSON-serializable.
     * @returns A promise representing the result of the operation.
     */
    function invokeMethodAsync<T>(assemblyName: string, methodIdentifier: string, ...args: any[]): Promise<T>;
    /**
     * Represents the ability to dispatch calls from JavaScript to a .NET runtime.
     */
    interface DotNetCallDispatcher {
        /**
         * Optional. If implemented, invoked by the runtime to perform a synchronous call to a .NET method.
         *
         * @param assemblyName The short name (without key/version or .dll extension) of the .NET assembly holding the method to invoke. The value may be null when invoking instance methods.
         * @param methodIdentifier The identifier of the method to invoke. The method must have a [JSInvokable] attribute specifying this identifier.
         * @param dotNetObjectId If given, the call will be to an instance method on the specified DotNetObject. Pass null or undefined to call static methods.
         * @param argsJson JSON representation of arguments to pass to the method.
         * @returns JSON representation of the result of the invocation.
         */
        invokeDotNetFromJS?(assemblyName: string | null, methodIdentifier: string, dotNetObjectId: number | null, argsJson: string): string | null;
        /**
         * Invoked by the runtime to begin an asynchronous call to a .NET method.
         *
         * @param callId A value identifying the asynchronous operation. This value should be passed back in a later call from .NET to JS.
         * @param assemblyName The short name (without key/version or .dll extension) of the .NET assembly holding the method to invoke. The value may be null when invoking instance methods.
         * @param methodIdentifier The identifier of the method to invoke. The method must have a [JSInvokable] attribute specifying this identifier.
         * @param dotNetObjectId If given, the call will be to an instance method on the specified DotNetObject. Pass null to call static methods.
         * @param argsJson JSON representation of arguments to pass to the method.
         */
        beginInvokeDotNetFromJS(callId: number, assemblyName: string | null, methodIdentifier: string, dotNetObjectId: number | null, argsJson: string): void;
        /**
         * Invoked by the runtime to complete an asynchronous JavaScript function call started from .NET
         *
         * @param callId A value identifying the asynchronous operation.
         * @param succeded Whether the operation succeeded or not.
         * @param resultOrError The serialized result or the serialized error from the async operation.
         */
        endInvokeJSFromDotNet(callId: number, succeeded: boolean, resultOrError: any): void;
    }
    /**
     * Receives incoming calls from .NET and dispatches them to JavaScript.
     */
    const jsCallDispatcher: {
        /**
         * Finds the JavaScript function matching the specified identifier.
         *
         * @param identifier Identifies the globally-reachable function to be returned.
         * @returns A Function instance.
         */
        findJSFunction: typeof findJSFunction;
        /**
         * Invokes the specified synchronous JavaScript function.
         *
         * @param identifier Identifies the globally-reachable function to invoke.
         * @param argsJson JSON representation of arguments to be passed to the function.
         * @returns JSON representation of the invocation result.
         */
        invokeJSFromDotNet: (identifier: string, argsJson: string) => string | null;
        /**
         * Invokes the specified synchronous or asynchronous JavaScript function.
         *
         * @param asyncHandle A value identifying the asynchronous operation. This value will be passed back in a later call to endInvokeJSFromDotNet.
         * @param identifier Identifies the globally-reachable function to invoke.
         * @param argsJson JSON representation of arguments to be passed to the function.
         */
        beginInvokeJSFromDotNet: (asyncHandle: number, identifier: string, argsJson: string) => void;
        /**
         * Receives notification that an async call from JS to .NET has completed.
         * @param asyncCallId The identifier supplied in an earlier call to beginInvokeDotNetFromJS.
         * @param success A flag to indicate whether the operation completed successfully.
         * @param resultOrExceptionMessage Either the operation result or an error message.
         */
        endInvokeDotNetFromJS: (asyncCallId: string, success: boolean, resultOrExceptionMessage: any) => void;
    };
    function findJSFunction(identifier: string): Function;
}
