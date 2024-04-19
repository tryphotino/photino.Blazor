#if NET6_0 || NET7_0

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.EventLog;
using Microsoft.Extensions.Diagnostics.Metrics;
using Microsoft.Extensions.Configuration;
using System.Runtime.InteropServices;
using System.Diagnostics.CodeAnalysis;
using System.Reflection;

namespace Microsoft.Extensions.Hosting;

#pragma warning disable CS0436

/// <summary>
/// Provides extension methods for the <see cref="IHostBuilder"/> from the hosting package.
/// </summary>
public static class HostingHostBuilderExtensions
{
    /// <summary>
    /// Configures an existing <see cref="IHostBuilder"/> instance with pre-configured defaults. This will overwrite
    /// previously configured values and is intended to be called before additional configuration calls.
    /// </summary>
    /// <remarks>
    ///   The following defaults are applied to the <see cref="IHostBuilder"/>:
    ///     * set the <see cref="IHostEnvironment.ContentRootPath"/> to the result of <see cref="Directory.GetCurrentDirectory()"/>
    ///     * load host <see cref="IConfiguration"/> from "DOTNET_" prefixed environment variables
    ///     * load host <see cref="IConfiguration"/> from supplied command line args
    ///     * load app <see cref="IConfiguration"/> from 'appsettings.json' and 'appsettings.[<see cref="IHostEnvironment.EnvironmentName"/>].json'
    ///     * load app <see cref="IConfiguration"/> from User Secrets when <see cref="IHostEnvironment.EnvironmentName"/> is 'Development' using the entry assembly
    ///     * load app <see cref="IConfiguration"/> from environment variables
    ///     * load app <see cref="IConfiguration"/> from supplied command line args
    ///     * configure the <see cref="ILoggerFactory"/> to log to the console, debug, and event source output
    ///     * enables scope validation on the dependency injection container when <see cref="IHostEnvironment.EnvironmentName"/> is 'Development'
    /// </remarks>
    /// <param name="builder">The existing builder to configure.</param>
    /// <param name="args">The command line args.</param>
    /// <returns>The same instance of the <see cref="IHostBuilder"/> for chaining.</returns>
    public static IHostBuilder ConfigureDefaults(this IHostBuilder builder, string[]? args)
    {
        return builder.ConfigureHostConfiguration(config => ApplyDefaultHostConfiguration(config, args))
                      .ConfigureAppConfiguration((hostingContext, config) => ApplyDefaultAppConfiguration(hostingContext, config, args))
                      .ConfigureServices(AddDefaultServices)
                      .UseServiceProviderFactory(context => new DefaultServiceProviderFactory(CreateDefaultServiceProviderOptions(context)));
    }

    internal static void AddCommandLineConfig(IConfigurationBuilder configBuilder, string[]? args)
    {
        if (args is { Length: > 0 })
        {
            configBuilder.AddCommandLine(args);
        }
    }

    internal static void AddDefaultServices(HostBuilderContext hostingContext, IServiceCollection services)
    {
        services.AddLogging(logging =>
        {
            bool isWindows =
#if NETCOREAPP
                OperatingSystem.IsWindows();
#elif NETFRAMEWORK
                    Environment.OSVersion.Platform == PlatformID.Win32NT;
#else
                    RuntimeInformation.IsOSPlatform(OSPlatform.Windows);
#endif

            // IMPORTANT: This needs to be added *before* configuration is loaded, this lets
            // the defaults be overridden by the configuration.
            if (isWindows)
            {
                // Default the EventLogLoggerProvider to warning or above
                logging.AddFilter<EventLogLoggerProvider>(level => level >= LogLevel.Warning);
            }

            logging.AddConfiguration(hostingContext.Configuration.GetSection("Logging"));
#if NETCOREAPP
            if (!OperatingSystem.IsBrowser())
#endif
            {
                logging.AddConsole();
            }
            logging.AddDebug();
            logging.AddEventSourceLogger();

            if (isWindows)
            {
                // Add the EventLogLoggerProvider on windows machines
                logging.AddEventLog();
            }

            logging.Configure(options =>
            {
                options.ActivityTrackingOptions =
                    ActivityTrackingOptions.SpanId |
                    ActivityTrackingOptions.TraceId |
                    ActivityTrackingOptions.ParentId;
            });
        });

        services.AddMetrics(metrics =>
        {
            metrics.AddConfiguration(hostingContext.Configuration.GetSection("Metrics"));
        });
    }

    internal static void ApplyDefaultAppConfiguration(HostBuilderContext hostingContext, IConfigurationBuilder appConfigBuilder, string[]? args)
    {
        IHostEnvironment env = hostingContext.HostingEnvironment;
        bool reloadOnChange = GetReloadConfigOnChangeValue(hostingContext);

        appConfigBuilder.AddJsonFile("appsettings.json", optional: true, reloadOnChange: reloadOnChange)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, reloadOnChange: reloadOnChange);

        if (env.IsDevelopment() && env.ApplicationName is { Length: > 0 })
        {
            try
            {
                var appAssembly = Assembly.Load(new AssemblyName(env.ApplicationName));
                appConfigBuilder.AddUserSecrets(appAssembly, optional: true, reloadOnChange: reloadOnChange);
            }
            catch (FileNotFoundException)
            {
                // The assembly cannot be found, so just skip it.
            }
        }

        appConfigBuilder.AddEnvironmentVariables();

        AddCommandLineConfig(appConfigBuilder, args);

        [UnconditionalSuppressMessage("ReflectionAnalysis", "IL2026:RequiresUnreferencedCode", Justification = "Calling IConfiguration.GetValue is safe when the T is bool.")]
        static bool GetReloadConfigOnChangeValue(HostBuilderContext hostingContext) => hostingContext.Configuration.GetValue("hostBuilder:reloadConfigOnChange", defaultValue: true);
    }

    internal static ServiceProviderOptions CreateDefaultServiceProviderOptions(HostBuilderContext context)
    {
        bool isDevelopment = context.HostingEnvironment.IsDevelopment();
        return new ServiceProviderOptions
        {
            ValidateScopes = isDevelopment,
            ValidateOnBuild = isDevelopment,
        };
    }

    internal static void SetDefaultContentRoot(IConfigurationBuilder hostConfigBuilder)
    {
        // If we're running anywhere other than C:\Windows\system32, we default to using the CWD for the ContentRoot.
        // However, since many things like Windows services and MSIX installers have C:\Windows\system32 as there CWD which is not likely
        // to really be the home for things like appsettings.json, we skip changing the ContentRoot in that case. The non-"default" initial
        // value for ContentRoot is AppContext.BaseDirectory (e.g. the executable path) which probably makes more sense than the system32.

        // In my testing, both Environment.CurrentDirectory and Environment.SystemDirectory return the path without
        // any trailing directory separator characters. I'm not even sure the casing can ever be different from these APIs, but I think it makes sense to
        // ignore case for Windows path comparisons given the file system is usually (always?) going to be case insensitive for the system path.
        string cwd = Environment.CurrentDirectory;
        if (
#if NETFRAMEWORK
            Environment.OSVersion.Platform != PlatformID.Win32NT ||
#else
            !RuntimeInformation.IsOSPlatform(OSPlatform.Windows) ||
#endif
            !string.Equals(cwd, Environment.SystemDirectory, StringComparison.OrdinalIgnoreCase))
        {
            hostConfigBuilder.AddInMemoryCollection(
            [
                    new KeyValuePair<string, string?>(HostDefaults.ContentRootKey, cwd),
                ]);
        }
    }

    private static void ApplyDefaultHostConfiguration(IConfigurationBuilder hostConfigBuilder, string[]? args)
    {
        SetDefaultContentRoot(hostConfigBuilder);

        hostConfigBuilder.AddEnvironmentVariables(prefix: "DOTNET_");
        AddCommandLineConfig(hostConfigBuilder, args);
    }
}

#pragma warning restore CS0436

#endif

