using Microsoft.Extensions.DependencyInjection;
using Photino.Blazor;
using System;

namespace HelloWorld;

internal class Program
{
    [STAThread]
    private static void Main(string[] args)
    {
        var appBuilder = PhotinoBlazorApplicationBuilder.CreateApplicationBuilder(args);
        appBuilder.Services
            .AddLogging();

        // register root component
        appBuilder.RootComponents.Add<App>("app");

        var app = appBuilder.Build();

        // customize window
        app.MainWindow
            .SetIconFile("favicon.ico")
            .SetTitle("Photino Hello World");

        AppDomain.CurrentDomain.UnhandledException += (sender, error) =>
        {
            app.MainWindow.ShowMessage("Fatal exception", error.ExceptionObject.ToString());
        };

        app.Run();
    }
}