// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

using System;
using System.IO;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebView;
using Microsoft.Extensions.FileProviders;
using PhotinoNET;

namespace Photino.Blazor
{
    public class PhotinoWebViewManager : WebViewManager
    {
        private readonly PhotinoWindow _window;

        // On Windows, we can't use a custom scheme to host the initial HTML,
        // because webview2 won't let you do top-level navigation to such a URL.
        // On Linux/Mac, we must use a custom scheme, because their webviews
        // don't have a way to intercept http:// scheme requests.
        public static readonly string BlazorAppScheme = RuntimeInformation.IsOSPlatform(OSPlatform.Windows)
            ? "http"
            : "app";

        public static readonly string AppBaseUri
            = $"{BlazorAppScheme}://{Assembly.GetEntryAssembly()?.GetCustomAttribute<AssemblyAppIdAttribute>()?.AppId}/";

        public PhotinoWebViewManager(PhotinoWindow window, IServiceProvider provider, Dispatcher dispatcher,
            Uri appBaseUri, IFileProvider fileProvider, JSComponentConfigurationStore jsComponents,
            string hostPageRelativePath)
            : base(provider, dispatcher, appBaseUri, fileProvider, jsComponents, hostPageRelativePath)
        {
            _window = window ?? throw new ArgumentNullException(nameof(window));

            // Create a scheduler that uses one threads.
            var sts = new Utils.SynchronousTaskScheduler();

            _window.WebMessageReceived += (sender, message) =>
            {
                // On some platforms, we need to move off the browser UI thread
                Task.Factory.StartNew(message =>
                {
                    // TODO: Fix this. Photino should ideally tell us the URL that the message comes from so we
                    // know whether to trust it. Currently it's hardcoded to trust messages from any source, including
                    // if the webview is somehow navigated to an external URL.
                    var messageOriginUrl = new Uri(AppBaseUri);

                    MessageReceived(messageOriginUrl, (string)message!);
                }, message, CancellationToken.None, TaskCreationOptions.DenyChildAttach, sts);
            };
        }

        public Stream HandleWebRequest(object sender, string schema, string url, out string contentType)
        {
            // It would be better if we were told whether or not this is a navigation request, but
            // since we're not, guess.
            var localPath = (new Uri(url)).LocalPath;
            var hasFileExtension = localPath.LastIndexOf('.') > localPath.LastIndexOf('/');

            if (url.StartsWith(AppBaseUri, StringComparison.Ordinal)
                && TryGetResponseContent(url, !hasFileExtension, out var statusCode, out var statusMessage,
                    out var content, out var headers))
            {
                headers.TryGetValue("Content-Type", out contentType);
                return content;
            }
            else
            {
                contentType = default;
                return null;
            }
        }

        protected override void NavigateCore(Uri absoluteUri)
        {
            _window.Load(absoluteUri);
        }

        protected override void SendMessage(string message)
        {
            Task.Run(() => { Dispatcher.InvokeAsync(() => _window.SendWebMessage(message)); })
                .Wait(TimeSpan.FromSeconds(2));
        }
    }
}