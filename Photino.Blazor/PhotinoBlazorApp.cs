using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PhotinoNET;

namespace Photino.Blazor;

public partial class PhotinoBlazorApp
{
    public IHostEnvironment Environment
    {
        get => Services.GetRequiredService<IHostEnvironment>();
    }

    public PhotinoWindow MainWindow
    {
        get => Services.GetRequiredService<PhotinoWindow>();
    }

    public BlazorWindowRootComponents RootComponents
    {
        get => Services.GetRequiredService<BlazorWindowRootComponents>();
    }

    public IServiceProvider Services { get; private set; } = default!;

    public PhotinoWebViewManager WindowManager
    {
        get => Services.GetRequiredService<PhotinoWebViewManager>();
    }

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