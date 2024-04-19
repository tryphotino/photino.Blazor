using Microsoft.Extensions.DependencyInjection;
using Photino.Blazor.MultiWindowSample.Components;
using PhotinoNET;
using System;
using System.Collections.Generic;

namespace Photino.Blazor.MultiWindowSample;

internal class Program
{
    private static readonly List<PhotinoWindow> _windows = new();

    private static void CloseAllWindows()
    {
        foreach (var window in _windows)
        {
            window.Close();
        }
    }

    private static void CreateWindows(
        Queue<WindowCreationArgs> windowsToCreate,
        string[] args
    )
    {
        if (!windowsToCreate.TryDequeue(out var windowCreationArgs))
        {
            return;
        }

        var appBuilder = PhotinoBlazorApplicationBuilder.CreateApplicationBuilder(args);

        // register services
        appBuilder.Services.AddLogging();

        // register root component and selector
        appBuilder.RootComponents.Add(windowCreationArgs.RootComponentType, "app");

        var app = appBuilder.Build();

        // customize window
        _windows.Add(
            app.MainWindow
                .SetTitle(windowCreationArgs.Title)
                .Load(windowCreationArgs.HtmlPath)
                .RegisterWindowCreatedHandler((_, _) => CreateWindows(windowsToCreate, args))
                .RegisterWindowClosingHandler((_, _) =>
                {
                    CloseAllWindows();
                    return false;
                })
        );

        AppDomain.CurrentDomain.UnhandledException += (sender, error) =>
        {
            app.MainWindow.ShowMessage("Fatal exception", error.ExceptionObject.ToString());
        };

        app.Run();
    }

    [STAThread]
    private static void Main(string[] args)
    {
        CreateWindows(
            new Queue<WindowCreationArgs>(
            [
                new WindowCreationArgs(typeof(Window1), "Window 1", new Uri("window1.html", UriKind.Relative)),
                new WindowCreationArgs(typeof(Window2), "Window 2", new Uri("window2.html", UriKind.Relative)),
            ]),
            args
        );
    }

    private class WindowCreationArgs
    {
        public WindowCreationArgs(Type rootComponentType, string title, Uri htmlPath)
        {
            RootComponentType = rootComponentType;
            Title = title;
            HtmlPath = htmlPath;
        }

        public Uri HtmlPath { get; }
        public Type RootComponentType { get; }
        public string Title { get; }
    }
}