using System;
using System.Net.Http;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.Extensions.DependencyInjection;
using MudBlazor.Services;
using Photino.Blazor;

namespace Photino.Blazor.MudBlazorSample
{
    class Program
    {
        [STAThread]
        static void Main(string[] args)
        {
            var appBuilder = PhotinoBlazorAppBuilder.CreateDefault(args);

            appBuilder.Services
                .AddMudServices()
                .AddLogging();

            // register root component and selector
            appBuilder.RootComponents.Add<App>("app");
            appBuilder.RootComponents.Add<HeadOutlet>("head::after");

            var app = appBuilder.Build();

            // customize window
            app.MainWindow
                .SetIconFile("favicon.ico")
                .SetTitle("Photino.Blazor MudBlazor Sample");

            AppDomain.CurrentDomain.UnhandledException += (sender, error) =>
            {
                app.MainWindow.OpenAlertWindow("Fatal exception", error.ExceptionObject.ToString());
            };

            app.Run();

        }
    }
}
