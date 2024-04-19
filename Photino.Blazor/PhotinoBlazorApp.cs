using Microsoft.Extensions.DependencyInjection;
using PhotinoNET;

namespace Photino.Blazor;

public class PhotinoBlazorApp : IPhotinoBlazorApp
{
    public PhotinoWindow MainWindow { get; private set; } = default!;

    /// <summary>
    /// Gets configuration for the root components in the window.
    /// </summary>
    public BlazorWindowRootComponents RootComponents { get; private set; } = default!;

    /// <summary>
    /// Gets configuration for the service provider.
    /// </summary>
    public IServiceProvider Services { get; private set; } = default!;

    public PhotinoWebViewManager WindowManager { get; private set; } = default!;

    public Stream HandleWebRequest(object? sender, string? scheme, string url, out string contentType)
        => WindowManager.HandleWebRequest(sender, scheme, url, out contentType!)!;

    public void Run()
    {
        if (string.IsNullOrWhiteSpace(MainWindow.StartUrl))
        {
            MainWindow.StartUrl = "/";
        }

        WindowManager.Navigate(MainWindow.StartUrl);
        MainWindow.WaitForClose();
    }

    internal void Initialize(IServiceProvider services, RootComponentList rootComponents)
    {
        Services = services;
        RootComponents = Services.GetRequiredService<BlazorWindowRootComponents>();
        MainWindow = Services.GetRequiredService<PhotinoWindow>();
        WindowManager = Services.GetRequiredService<PhotinoWebViewManager>();

        ConfigureDefaults();

        MainWindow.RegisterCustomSchemeHandler(PhotinoWebViewManager.BlazorAppScheme, HandleWebRequest);

        foreach (var component in rootComponents)
        {
            RootComponents.Add(component.Item1, component.Item2);
        }
    }

    private void ConfigureDefaults() => MainWindow
        .SetTitle("Photino.Blazor App")
        .SetUseOsDefaultSize(false)
        .SetUseOsDefaultLocation(false)
        .SetWidth(1000)
        .SetHeight(900)
        .SetLeft(450)
        .SetTop(100);
}

public interface IPhotinoBlazorApp
{
    PhotinoWindow MainWindow { get; }
    BlazorWindowRootComponents RootComponents { get; }
    IServiceProvider Services { get; }
    PhotinoWebViewManager WindowManager { get; }

    Stream HandleWebRequest(object? sender, string? scheme, string url, out string contentType);

    void Run();
}