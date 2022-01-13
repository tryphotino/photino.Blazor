using System;
using System.Net.Http;
using Microsoft.Extensions.DependencyInjection;
using Photino.Blazor;

namespace HelloWorld
{
    class Program
    {
        [STAThread]
        static void Main(string[] args)
        {
            var appBuilder = PhotinoBlazorAppBuilder.CreateDefault(args);
            appBuilder.Services
                .AddLogging();

            // register root component
            appBuilder.RootComponents.Add<App>("app");

            var app = appBuilder.Build();

            // customize window
            app.MainWindow.SetTitle("Photino Hello World");

            AppDomain.CurrentDomain.UnhandledException += (sender, error) =>
            {
                app.MainWindow.OpenAlertWindow("Fatal exception", error.ExceptionObject.ToString());
            };

            app.Run();
        }

    }
}
