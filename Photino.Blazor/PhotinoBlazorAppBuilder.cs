#if NET6_0 || NET7_0

// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Hosting.Internal;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PhotinoNET;
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.Reflection;

namespace Photino.Blazor;

#pragma warning disable CS0436

/// <summary>
/// A program initialization utility.
/// </summary>
public partial class PhotinoBlazorAppBuilder : IHostBuilder
{
    private const string HostBuildingDiagnosticListenerName = "Microsoft.Extensions.Hosting";
    private const string HostBuildingEventName = "HostBuilding";
    private const string HostBuiltEventName = "HostBuilt";

    private readonly List<Action<HostBuilderContext, IConfigurationBuilder>> _configureAppConfigActions = [];
    private readonly List<IConfigureContainerAdapter> _configureContainerActions = [];
    private readonly List<Action<IConfigurationBuilder>> _configureHostConfigActions = [];
    private readonly List<Action<HostBuilderContext, IServiceCollection>> _configureServicesActions = [];

    private IConfiguration? _appConfiguration;
    private IServiceProvider? _appServices;
    private PhysicalFileProvider? _defaultProvider;
    private HostBuilderContext? _hostBuilderContext;
    private bool _hostBuilt;
    private IConfiguration? _hostConfiguration;
    private HostingEnvironment? _hostingEnvironment;
    private IServiceFactoryAdapter _serviceProviderFactory;
    private Func<HostBuilderContext, IServiceProvider, IFileProvider> _configureFileProvider;

    /// <summary>
    /// Initializes a new instance of <see cref="HostBuilder"/>.
    /// </summary>
    public PhotinoBlazorAppBuilder()
    {
        _serviceProviderFactory = new ServiceFactoryAdapter<IServiceCollection>(new DefaultServiceProviderFactory());
        _configureFileProvider = (ctx, sp) =>
        {
            var root = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "wwwroot");
            return new PhysicalFileProvider(root);
        };
    }

    /// <summary>
    /// A central location for sharing state between components during the host building process.
    /// </summary>
    public IDictionary<object, object> Properties { get; } = new Dictionary<object, object>();

    public RootComponentList RootComponents { get; set; } = [];

    /// <summary>
    /// Run the given actions to initialize the host. This can only be called once.
    /// </summary>
    /// <returns>An initialized <see cref="IHost"/></returns>
    /// <remarks>Adds basic services to the host such as application lifetime, host environment, and logging.</remarks>
    public IPhotinoBlazorApp Build()
    {
        if (_hostBuilt)
        {
            throw new InvalidOperationException("BuildCalled");
        }
        _hostBuilt = true;

        // REVIEW: If we want to raise more events outside of these calls then we will need to
        // stash this in a field.
        using DiagnosticListener diagnosticListener = LogHostBuilding(this);

        InitializeHostConfiguration();
        InitializeHostingEnvironment();
        InitializeHostBuilderContext();
        InitializeAppConfiguration();
        InitializeServiceProvider();

        var app = _appServices.GetRequiredService<PhotinoBlazorApp>();
        app.Initialize(_appServices, RootComponents);

        // NOTE: I dont fully understand the usage of this method, so for now I'll leave this here
        var host = ResolveHost(_appServices, diagnosticListener);
        return app;
    }

    /// <summary>
    /// Sets up the configuration for the remainder of the build process and application. This can be called multiple times and
    /// the results will be additive. The results will be available at <see cref="HostBuilderContext.Configuration"/> for
    /// subsequent operations, as well as in <see cref="IHost.Services"/>.
    /// </summary>
    /// <param name="configureDelegate">The delegate for configuring the <see cref="IConfigurationBuilder"/> that will be used
    /// to construct the <see cref="IConfiguration"/> for the host.</param>
    /// <returns>The same instance of the <see cref="IHostBuilder"/> for chaining.</returns>
    public IHostBuilder ConfigureAppConfiguration(Action<HostBuilderContext, IConfigurationBuilder> configureDelegate)
    {
        ThrowHelper.ThrowIfNull(configureDelegate);

        _configureAppConfigActions.Add(configureDelegate);
        return this;
    }

    /// <summary>
    /// Enables configuring the instantiated dependency container. This can be called multiple times and
    /// the results will be additive.
    /// </summary>
    /// <typeparam name="TContainerBuilder">The type of the builder to create.</typeparam>
    /// <param name="configureDelegate">The delegate for configuring the <see cref="IConfigurationBuilder"/> that will be used
    /// to construct the <see cref="IConfiguration"/> for the host.</param>
    /// <returns>The same instance of the <see cref="IHostBuilder"/> for chaining.</returns>
    public IHostBuilder ConfigureContainer<TContainerBuilder>(Action<HostBuilderContext, TContainerBuilder> configureDelegate)
    {
        ThrowHelper.ThrowIfNull(configureDelegate);

        _configureContainerActions.Add(new ConfigureContainerAdapter<TContainerBuilder>(configureDelegate));
        return this;
    }

    public IHostBuilder ConfigureFileProvider(Func<HostBuilderContext, IServiceProvider, IFileProvider> configureDelegate)
    {
        ThrowHelper.ThrowIfNull(configureDelegate);

        _configureFileProvider = configureDelegate;
        return this;
    }

    /// <summary>
    /// Set up the configuration for the builder itself. This will be used to initialize the <see cref="IHostEnvironment"/>
    /// for use later in the build process. This can be called multiple times and the results will be additive.
    /// </summary>
    /// <param name="configureDelegate">The delegate for configuring the <see cref="IConfigurationBuilder"/> that will be used
    /// to construct the <see cref="IConfiguration"/> for the host.</param>
    /// <returns>The same instance of the <see cref="IHostBuilder"/> for chaining.</returns>
    public IHostBuilder ConfigureHostConfiguration(Action<IConfigurationBuilder> configureDelegate)
    {
        ThrowHelper.ThrowIfNull(configureDelegate);

        _configureHostConfigActions.Add(configureDelegate);
        return this;
    }

    /// <summary>
    /// Adds services to the container. This can be called multiple times and the results will be additive.
    /// </summary>
    /// <param name="configureDelegate">The delegate for configuring the <see cref="IConfigurationBuilder"/> that will be used
    /// to construct the <see cref="IConfiguration"/> for the host.</param>
    /// <returns>The same instance of the <see cref="IHostBuilder"/> for chaining.</returns>
    public IHostBuilder ConfigureServices(Action<HostBuilderContext, IServiceCollection> configureDelegate)
    {
        ThrowHelper.ThrowIfNull(configureDelegate);

        _configureServicesActions.Add(configureDelegate);
        return this;
    }

    /// <summary>
    /// Overrides the factory used to create the service provider.
    /// </summary>
    /// <typeparam name="TContainerBuilder">The type of the builder to create.</typeparam>
    /// <param name="factory">A factory used for creating service providers.</param>
    /// <returns>The same instance of the <see cref="IHostBuilder"/> for chaining.</returns>
    public IHostBuilder UseServiceProviderFactory<TContainerBuilder>(IServiceProviderFactory<TContainerBuilder> factory) where TContainerBuilder : notnull
    {
        ThrowHelper.ThrowIfNull(factory);

        _serviceProviderFactory = new ServiceFactoryAdapter<TContainerBuilder>(factory);
        return this;
    }

    /// <summary>
    /// Overrides the factory used to create the service provider.
    /// </summary>
    /// <param name="factory">A factory used for creating service providers.</param>
    /// <typeparam name="TContainerBuilder">The type of the builder to create.</typeparam>
    /// <returns>The same instance of the <see cref="IHostBuilder"/> for chaining.</returns>
    public IHostBuilder UseServiceProviderFactory<TContainerBuilder>(Func<HostBuilderContext, IServiceProviderFactory<TContainerBuilder>> factory) where TContainerBuilder : notnull
    {
        ThrowHelper.ThrowIfNull(factory);

        _serviceProviderFactory = new ServiceFactoryAdapter<TContainerBuilder>(() => _hostBuilderContext!, factory);
        return this;
    }
    internal static (HostingEnvironment, PhysicalFileProvider) CreateHostingEnvironment(IConfiguration hostConfiguration)
    {
        var hostingEnvironment = new HostingEnvironment()
        {
            EnvironmentName = hostConfiguration[HostDefaults.EnvironmentKey] ?? Environments.Production,
            ContentRootPath = ResolveContentRootPath(hostConfiguration[HostDefaults.ContentRootKey], AppContext.BaseDirectory),
        };

        string? applicationName = hostConfiguration[HostDefaults.ApplicationKey];
        if (string.IsNullOrEmpty(applicationName))
        {
            // Note GetEntryAssembly returns null for the net4x console test runner.
            applicationName = Assembly.GetEntryAssembly()?.GetName().Name;
        }

        if (applicationName is not null)
        {
            hostingEnvironment.ApplicationName = applicationName;
        }

        var physicalFileProvider = new PhysicalFileProvider(hostingEnvironment.ContentRootPath);
        hostingEnvironment.ContentRootFileProvider = physicalFileProvider;

        return (hostingEnvironment, physicalFileProvider);
    }

    [MemberNotNull(nameof(_appServices))]
    internal static void PopulateServiceCollection(
        IServiceCollection services,
        HostBuilderContext hostBuilderContext,
        HostingEnvironment hostingEnvironment,
        PhysicalFileProvider defaultFileProvider,
        IConfiguration appConfiguration,
        Func<IServiceProvider> serviceProviderGetter)
    {
#pragma warning disable CS0618 // Type or member is obsolete
        services.AddSingleton<IHostingEnvironment>(hostingEnvironment);
#pragma warning restore CS0618 // Type or member is obsolete
        services.AddSingleton<IHostEnvironment>(hostingEnvironment);
        services.AddSingleton(hostBuilderContext);
        // register configuration as factory to make it dispose with the service provider
        services.AddSingleton(_ => appConfiguration);
#pragma warning disable CS0618 // Type or member is obsolete
        services.AddSingleton(s => (IApplicationLifetime)s.GetRequiredService<IHostApplicationLifetime>());
#pragma warning restore CS0618 // Type or member is obsolete
        services.AddSingleton<IHostApplicationLifetime, ApplicationLifetime>();

        AddLifetime(services);

        services.AddSingleton<IHost>(_ =>
        {
            // We use serviceProviderGetter() instead of the _ parameter because these can be different given a custom IServiceProviderFactory.
            // We want the host to always dispose the IServiceProvider returned by the IServiceProviderFactory.
            // https://github.com/dotnet/runtime/issues/36060
            IServiceProvider appServices = serviceProviderGetter();
            return new Microsoft.Extensions.Hosting.Internal.Host(appServices,
                hostingEnvironment,
                defaultFileProvider,
                appServices.GetRequiredService<IHostApplicationLifetime>(),
                appServices.GetRequiredService<ILogger<Microsoft.Extensions.Hosting.Internal.Host>>(),
                appServices.GetRequiredService<IHostLifetime>(),
                appServices.GetRequiredService<IOptions<HostOptions>>());
        });
        services.AddOptions().Configure<HostOptions>(options => { options.Initialize(hostBuilderContext.Configuration); });
        services.AddLogging();
        services.AddMetrics();
    }

    internal static string ResolveContentRootPath(string? contentRootPath, string basePath)
    {
        if (string.IsNullOrEmpty(contentRootPath))
        {
            return basePath;
        }
        if (Path.IsPathRooted(contentRootPath))
        {
            return contentRootPath;
        }
        return Path.Combine(Path.GetFullPath(basePath), contentRootPath);
    }

    internal static IHost ResolveHost(IServiceProvider serviceProvider, DiagnosticListener diagnosticListener)
    {
        if (serviceProvider is null)
        {
            throw new InvalidOperationException("NullIServiceProvider");
        }

        // resolve configuration explicitly once to mark it as resolved within the
        // service provider, ensuring it will be properly disposed with the provider
        _ = serviceProvider.GetService<IConfiguration>();

        var host = serviceProvider.GetRequiredService<IHost>();

        if (diagnosticListener.IsEnabled() && diagnosticListener.IsEnabled(HostBuiltEventName))
        {
            Write(diagnosticListener, HostBuiltEventName, host);
        }

        return host;
    }

    private static void AddLifetime(IServiceCollection services)
    {
        if (!OperatingSystem.IsAndroid() && !OperatingSystem.IsBrowser() && !OperatingSystem.IsIOS() && !OperatingSystem.IsTvOS())
        {
            services.AddSingleton<IHostLifetime, ConsoleLifetime>();
        }
        else
        {
            services.AddSingleton<IHostLifetime, NullLifetime>();
        }
    }

    private static DiagnosticListener LogHostBuilding(IHostBuilder hostBuilder)
    {
        var diagnosticListener = new DiagnosticListener(HostBuildingDiagnosticListenerName);

        if (diagnosticListener.IsEnabled() && diagnosticListener.IsEnabled(HostBuildingEventName))
        {
            Write(diagnosticListener, HostBuildingEventName, hostBuilder);
        }

        return diagnosticListener;
    }


    // Remove when https://github.com/dotnet/runtime/pull/78532 is merged and consumed by the used SDK.
#if NET7_0
    [UnconditionalSuppressMessage("AOT", "IL3050:RequiresDynamicCode", Justification = "DiagnosticSource is used here to pass objects in-memory to code using HostFactoryResolver. This won't require creating new generic types.")]
#endif
    [UnconditionalSuppressMessage("ReflectionAnalysis", "IL2026:UnrecognizedReflectionPattern", Justification = "The values being passed into Write are being consumed by the application already.")]
    private static void Write<[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicProperties)] T>(
        DiagnosticListener diagnosticSource,
        string name,
        T value)
    {
        diagnosticSource.Write(name, value);
    }

    [MemberNotNull(nameof(_appConfiguration))]
    private void InitializeAppConfiguration()
    {
        IConfigurationBuilder configBuilder = new ConfigurationBuilder()
            .SetBasePath(_hostingEnvironment!.ContentRootPath)
            .AddConfiguration(_hostConfiguration!, shouldDisposeConfiguration: true);

        foreach (Action<HostBuilderContext, IConfigurationBuilder> buildAction in _configureAppConfigActions)
        {
            buildAction(_hostBuilderContext!, configBuilder);
        }
        _appConfiguration = configBuilder.Build();
        _hostBuilderContext!.Configuration = _appConfiguration;
    }

    [MemberNotNull(nameof(_hostBuilderContext))]
    private void InitializeHostBuilderContext()
    {
        _hostBuilderContext = new HostBuilderContext(Properties)
        {
            HostingEnvironment = _hostingEnvironment!,
            Configuration = _hostConfiguration!
        };
    }
    [MemberNotNull(nameof(_hostConfiguration))]
    private void InitializeHostConfiguration()
    {
        IConfigurationBuilder configBuilder = new ConfigurationBuilder()
            .AddInMemoryCollection(); // Make sure there's some default storage since there are no default providers

        foreach (Action<IConfigurationBuilder> buildAction in _configureHostConfigActions)
        {
            buildAction(configBuilder);
        }
        _hostConfiguration = configBuilder.Build();
    }

    [MemberNotNull(nameof(_defaultProvider))]
    [MemberNotNull(nameof(_hostingEnvironment))]
    private void InitializeHostingEnvironment()
    {
        (_hostingEnvironment, _defaultProvider) = CreateHostingEnvironment(_hostConfiguration!); // TODO-NULLABLE: https://github.com/dotnet/csharplang/discussions/5778. The same pattern exists below as well.
    }

    [MemberNotNull(nameof(_appServices))]
    private void InitializeServiceProvider()
    {
        var services = new ServiceCollection();

        services.AddOptions<PhotinoBlazorAppConfiguration>().Configure(opts =>
        {
            opts.AppBaseUri = new Uri(PhotinoWebViewManager.AppBaseUri);
            opts.HostPage = "index.html";
        });

        services.AddScoped(sp =>
        {
            var handler = sp.GetRequiredService<PhotinoHttpHandler>();
            return new HttpClient(handler) { BaseAddress = new Uri(PhotinoWebViewManager.AppBaseUri) };
        });

        services.AddSingleton(sp =>
        {
            var manager = sp.GetRequiredService<PhotinoWebViewManager>();
            var store = sp.GetRequiredService<JSComponentConfigurationStore>();

            return new BlazorWindowRootComponents(manager, store);
        });

        services.AddSingleton(sp => _configureFileProvider.Invoke(_hostBuilderContext!, sp));

        services.AddSingleton<Dispatcher, PhotinoDispatcher>();
        services.AddSingleton<JSComponentConfigurationStore>();
        services.AddSingleton<PhotinoBlazorApp>();
        services.AddSingleton<PhotinoHttpHandler>();
        services.AddSingleton<PhotinoSynchronizationContext>();
        services.AddSingleton<PhotinoWebViewManager>();
        services.AddSingleton(new PhotinoWindow());
        services.AddBlazorWebView();

        PopulateServiceCollection(
            services,
            _hostBuilderContext!,
            _hostingEnvironment!,
            _defaultProvider!,
            _appConfiguration!,
            () => _appServices!);

        foreach (Action<HostBuilderContext, IServiceCollection> configureServicesAction in _configureServicesActions)
        {
            configureServicesAction(_hostBuilderContext!, services);
        }

        object containerBuilder = _serviceProviderFactory.CreateBuilder(services);

        foreach (IConfigureContainerAdapter containerAction in _configureContainerActions)
        {
            containerAction.ConfigureContainer(_hostBuilderContext!, containerBuilder);
        }

        _appServices = _serviceProviderFactory.CreateServiceProvider(containerBuilder);
    }
}

public sealed partial class PhotinoBlazorAppBuilder
{
    /// <summary>
    /// Initializes a new instance of the <see cref="HostBuilder"/> class with pre-configured defaults.
    /// </summary>
    /// <remarks>
    ///   The following defaults are applied to the returned <see cref="HostBuilder"/>:
    ///   <list type="bullet">
    ///     <item><description>set the <see cref="IHostEnvironment.ContentRootPath"/> to the result of <see cref="Directory.GetCurrentDirectory()"/></description></item>
    ///     <item><description>load host <see cref="IConfiguration"/> from "DOTNET_" prefixed environment variables</description></item>
    ///     <item><description>load app <see cref="IConfiguration"/> from 'appsettings.json' and 'appsettings.[<see cref="IHostEnvironment.EnvironmentName"/>].json'</description></item>
    ///     <item><description>load app <see cref="IConfiguration"/> from User Secrets when <see cref="IHostEnvironment.EnvironmentName"/> is 'Development' using the entry assembly</description></item>
    ///     <item><description>load app <see cref="IConfiguration"/> from environment variables</description></item>
    ///     <item><description>configure the <see cref="ILoggerFactory"/> to log to the console, debug, and event source output</description></item>
    ///     <item><description>enables scope validation on the dependency injection container when <see cref="IHostEnvironment.EnvironmentName"/> is 'Development'</description></item>
    ///   </list>
    /// </remarks>
    /// <returns>The initialized <see cref="IHostBuilder"/>.</returns>
    public static PhotinoBlazorAppBuilder CreateDefaultBuilder() =>
        CreateDefaultBuilder(args: null);

    /// <summary>
    /// Initializes a new instance of the <see cref="HostBuilder"/> class with pre-configured defaults.
    /// </summary>
    /// <remarks>
    ///   The following defaults are applied to the returned <see cref="HostBuilder"/>:
    ///   <list type="bullet">
    ///     <item><description>set the <see cref="IHostEnvironment.ContentRootPath"/> to the result of <see cref="Directory.GetCurrentDirectory()"/></description></item>
    ///     <item><description>load host <see cref="IConfiguration"/> from "DOTNET_" prefixed environment variables</description></item>
    ///     <item><description>load host <see cref="IConfiguration"/> from supplied command line args</description></item>
    ///     <item><description>load app <see cref="IConfiguration"/> from 'appsettings.json' and 'appsettings.[<see cref="IHostEnvironment.EnvironmentName"/>].json'</description></item>
    ///     <item><description>load app <see cref="IConfiguration"/> from User Secrets when <see cref="IHostEnvironment.EnvironmentName"/> is 'Development' using the entry assembly</description></item>
    ///     <item><description>load app <see cref="IConfiguration"/> from environment variables</description></item>
    ///     <item><description>load app <see cref="IConfiguration"/> from supplied command line args</description></item>
    ///     <item><description>configure the <see cref="ILoggerFactory"/> to log to the console, debug, and event source output</description></item>
    ///     <item><description>enables scope validation on the dependency injection container when <see cref="IHostEnvironment.EnvironmentName"/> is 'Development'</description></item>
    ///   </list>
    /// </remarks>
    /// <param name="args">The command line args.</param>
    /// <returns>The initialized <see cref="IHostBuilder"/>.</returns>
    public static PhotinoBlazorAppBuilder CreateDefaultBuilder(string[]? args)
    {
        PhotinoBlazorAppBuilder builder = new();
        return (PhotinoBlazorAppBuilder)builder.ConfigureDefaults(args);
    }
}

#pragma warning restore CS0436

#endif