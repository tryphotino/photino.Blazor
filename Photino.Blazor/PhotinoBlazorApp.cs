using PhotinoNET;
using System;
using System.IO;

namespace Photino.Blazor
{
    public class PhotinoBlazorApp
    {
        public PhotinoBlazorApp(IServiceProvider services, BlazorWindowRootComponents rootComponents, PhotinoWindow mainWindow, PhotinoWebViewManager windowManager, RootComponentList components)
        {
            Services = services;
            RootComponents = rootComponents;
            MainWindow = mainWindow;
            WindowManager = windowManager;

            Initialize(components);
        }

        /// <summary>
        /// Gets configuration for the service provider.
        /// </summary>
        public IServiceProvider Services { get; }

        /// <summary>
        /// Gets configuration for the root components in the window.
        /// </summary>
        public BlazorWindowRootComponents RootComponents { get; }

        private void Initialize(RootComponentList rootComponents)
        {
            MainWindow
                .SetTitle("Photino.Blazor App")
                .SetUseOsDefaultLocation(false)
                .SetWidth(1000)
                .SetHeight(900)
                .SetLeft(450)
                .SetTop(100);

            MainWindow.RegisterCustomSchemeHandler(PhotinoWebViewManager.BlazorAppScheme, HandleWebRequest);

            foreach(var component in rootComponents)
            {
                RootComponents.Add(component.Item1, component.Item2);
            }
        }

        public PhotinoWindow MainWindow { get; }

        public PhotinoWebViewManager WindowManager { get; }

        public void Run()
        {
            WindowManager.Navigate("/");
            MainWindow.WaitForClose();
        }

        public Stream HandleWebRequest(object sender, string scheme, string url, out string contentType)
                => WindowManager.HandleWebRequest(sender, scheme, url, out contentType!)!;
    }
}
