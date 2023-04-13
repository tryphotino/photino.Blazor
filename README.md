## <span>NEXT PHOTINO FEATURES POLL</span>

Hello Photino Community! Please take a moment to check out our Photino poll and vote on the next features to be implemented, here:

[PHOTINO POLL](https://github.com/tryphotino/photino.NET/discussions/117)

# Build native, cross-platform desktop apps with Blazor

Photino is a lightweight open-source framework for building native,  
cross-platform desktop applications with Web UI technology.

Photino.Blazor builds on <span>Photino.</span>NET to add Blazor capabilities.

Photino uses the OSs built-in WebKit-based browser control for Windows, macOS and Linux.
Photino is the lightest cross-platform framework. Compared to Electron, a Photino app is up to 110 times smaller! And it uses far less system memory too!

## Usage

```C#
[STAThread]
static void Main(string[] args)
{
	var appBuilder = PhotinoBlazorAppBuilder.CreateDefault(args);

	appBuilder.Services
		.AddLogging();

	// register root component and selector
	appBuilder.RootComponents.Add<App>("app");

	var app = appBuilder.Build();

	// customize window
	app.MainWindow
	    .SetIconFile(favicon.ico)
		.SetTitle("Photino Blazor Sample");

	AppDomain.CurrentDomain.UnhandledException += (sender, error) =>
	{
		app.MainWindow.ShowMessage("Fatal exception", error.ExceptionObject.ToString());
	};

	app.Run();
}
```

## Photino.Blazor

This project represents Blazor functionality on top of <span>Photino.</span>NET (the .NET 5 wrapper for the Photino.Native project), which makes it available for all operating systems (Windows, macOS, Linux).
This Blazor sample projects are contained in this repo and are not included withi the non-Blazor samples.

If you made changes to the Photino.Native or <span>Photino.</span>NET projects, or added new features to them, you will likely need this repo to expose the new functionality to the Photino.Blazor wrapper.
In all other cases, you can just grab the nuget package for your projects:
https://www.nuget.org/packages/Photino.Blazor

## How to build this repo

If you want to build this library itself, you will need:

-   Windows 10, Mac 10.15+, or Linux (Tested with Ubuntu 18.04+)
-   Make sure the Photino.Native Nuget package is added and up to date.
