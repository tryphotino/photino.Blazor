using System;
using System.Net.Http;
using Microsoft.Extensions.DependencyInjection;
using Photino.Blazor;

namespace HelloWorld
{
    class Program
    {
        //var builder = BlazorAppBuilder.CreateDefault(args);
        //builder.RootComponents.Add<App>("#app");
        //builder.RootComponents.Add<HeadOutlet>("head::after");

        //builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

        //await builder.Build().RunAsync();

        [STAThread]
        static void Main(string[] args)
        {
            var serviceCollection = new ServiceCollection()
                .AddBlazorWebView()
                .AddSingleton<HttpClient>();

            var services = serviceCollection.BuildServiceProvider(); 
            var mainWindow = (BlazorWindow)new BlazorWindow(services, "wwwroot/index.html")
               .SetTitle("Photino.Blazor App")
               .SetUseOsDefaultLocation(false)
               .SetWidth(1000)
               .SetHeight(900)
               .SetLeft(450)
               .SetTop(100);

            AppDomain.CurrentDomain.UnhandledException += (sender, error) =>
            {
                mainWindow.OpenAlertWindow("Fatal exception", error.ExceptionObject.ToString());
            };


            mainWindow.RootComponents.Add<App>("app");
            mainWindow.Run();
        }

        //mainWindow.RootComponents.RegisterForJavaScript<BasicTestApp.DynamicallyAddedRootComponent>("my-dynamic-root-component");
        //mainWindow.RootComponents.RegisterForJavaScript<BasicTestApp.JavaScriptRootComponentParameterTypes>(
        //    "component-with-many-parameters",
        //    javaScriptInitializer: "myJsRootComponentInitializers.testInitializer");

    }
}
