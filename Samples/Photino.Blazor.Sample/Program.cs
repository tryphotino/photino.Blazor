using Microsoft.Extensions.DependencyInjection;
using System;

namespace Photino.Blazor.Sample;

internal class Program
{
    [STAThread]
    private static void Main(string[] args)
    {
#if NET8_0
        var builder = PhotinoBlazorAppBuilder.CreateApplicationBuilder(args);
#else
        var builder = PhotinoBlazorApplicationBuilder.CreateDefaultBuilder(args);
#endif

#if NET8_0
        builder.Services.AddLogging();
#else
        builder.ConfigureServices((_, services) => services.AddLogging());
#endif

        // register root component and selector
        builder.RootComponents.Add<App>("app");

        var app = builder.Build();

        // customize window
        app.MainWindow
            .SetIconFile("favicon.ico")
            .SetTitle("Photino Blazor Sample");

        AppDomain.CurrentDomain.UnhandledException += (sender, error) =>
        {
            app.MainWindow.ShowMessage("Fatal exception", error.ExceptionObject.ToString());
        };

        app.Run();
    }
}