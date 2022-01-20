using Microsoft.AspNetCore.Components.Web;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using PhotinoNET;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Photino.Blazor
{
    public class PhotinoBlazorApp
    {
        private IServiceProvider _services;

        /// <summary>
        /// Gets configuration for the root components in the window.
        /// </summary>
        public BlazorWindowRootComponents RootComponents { get; private set; }

        internal void Initialize(IServiceProvider services, RootComponentList rootComponents)
        {
            _services = services;

            MainWindow = new PhotinoWindow()
                .SetTitle("Photino.Blazor App")
                .SetUseOsDefaultLocation(false)
                .SetWidth(1000)
                .SetHeight(900)
                .SetLeft(450)
                .SetTop(100);

            MainWindow.RegisterCustomSchemeHandler(PhotinoWebViewManager.BlazorAppScheme, HandleWebRequest);

            // We assume the host page is always in the root of the content directory, because it's
            // unclear there's any other use case. We can add more options later if so.
            string hostPage = "index.html";
            var contentRootDir = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "wwwroot");
            var fileProvider = new PhysicalFileProvider(contentRootDir);

            var dispatcher = new PhotinoDispatcher(MainWindow);
            var jsComponents = new JSComponentConfigurationStore();
            WindowManager = new PhotinoWebViewManager(MainWindow, services, dispatcher, new Uri(PhotinoWebViewManager.AppBaseUri), fileProvider, jsComponents, hostPage);
            RootComponents = new BlazorWindowRootComponents(WindowManager, jsComponents);
            foreach(var component in rootComponents)
            {
                RootComponents.Add(component.Item1, component.Item2);
            }
        }

        public PhotinoWindow MainWindow { get; private set; }

        public PhotinoWebViewManager WindowManager { get; private set; }

        public void Run()
        {
            WindowManager.Navigate("/");
            MainWindow.WaitForClose();
        }

        public Stream HandleWebRequest(object sender, string scheme, string url, out string contentType)
                => WindowManager.HandleWebRequest(sender, scheme, url, out contentType!)!;

    }
}
