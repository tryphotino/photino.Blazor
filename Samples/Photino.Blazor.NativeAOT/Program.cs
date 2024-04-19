using Microsoft.Extensions.DependencyInjection;
using System;

namespace Photino.Blazor.NativeAOT;

internal class Program
{
    [STAThread]
    private static void Main(string[] args)
    {
        var builder = PhotinoBlazorApplicationBuilder.CreateApplicationBuilder(args);

        builder.Services
            .AddLogging();

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