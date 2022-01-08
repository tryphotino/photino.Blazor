// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.Extensions.FileProviders;
using PhotinoNET;

namespace Photino.Blazor
{
    /// <summary>
    /// A window containing a Blazor web view.
    /// </summary>
    public class BlazorWindow : PhotinoWindow
    {
        private readonly PhotinoWebViewManager _manager;

        /// <summary>
        /// Constructs an instance of <see cref="BlazorWindow"/>.
        /// </summary>
        /// <param name="hostPage">The path to the host page.</param>
        /// <param name="services">The service provider.</param>
        public BlazorWindow(IServiceProvider services, string hostPage)
        {
            RegisterCustomSchemeHandler(PhotinoWebViewManager.BlazorAppScheme, HandleWebRequest);

            // We assume the host page is always in the root of the content directory, because it's
            // unclear there's any other use case. We can add more options later if so.
            var contentRootDir = Path.GetDirectoryName(Path.GetFullPath(hostPage))!;
            var hostPageRelativePath = Path.GetRelativePath(contentRootDir, hostPage);
            var fileProvider = new PhysicalFileProvider(contentRootDir);

            var dispatcher = new PhotinoDispatcher(this);
            var jsComponents = new JSComponentConfigurationStore();
            _manager = new PhotinoWebViewManager(this, services, dispatcher, new Uri(PhotinoWebViewManager.AppBaseUri), fileProvider, jsComponents, hostPageRelativePath);
            RootComponents = new BlazorWindowRootComponents(_manager, jsComponents);
        }

        /// <summary>
        /// Gets configuration for the root components in the window.
        /// </summary>
        public BlazorWindowRootComponents RootComponents { get; }

        /// <summary>
        /// Shows the window and waits for it to be closed.
        /// </summary>
        public void Run()
        {
            _manager.Navigate("/");
            this.WaitForClose();
        }

        private Stream HandleWebRequest(object sender, string scheme, string url, out string contentType)
                => _manager.HandleWebRequest(sender, scheme, url, out contentType!)!;
    }
}
