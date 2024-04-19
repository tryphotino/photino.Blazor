# Photino.Blazor Project Update (19/04/2024) 🚀

Just dropping a note here since I couldn't find an open discussion section on the Photino.Blazor repository.

I've been tinkering with some potential tweaks for the Photino.Blazor library and wanted to loop you all in for some feedback. You know, just to make sure we're all on the same page before diving too deep.

## The Why Behind the Changes

So, here's the reasons on what's got me thinking:

1. The ServiceCollection setup in the `PhotinoBlazorApplicationBuilder` is decent, but it's missing some key features like Configurations, Environment, Logging, etc. These are pretty standard for Blazor and Photino setups. For example, accessing the current environment gets a bit tricky without stuff like the IHostEnvironment interface.

2. Oh, and there's [this issue](https://github.com/tryphotino/photino.Blazor/issues/83) I stumbled upon. It's a bit of a roadblock since there's no standard interface like IHostBuilder in the builder's return, making it tough to register components from external libraries.

## What's Actually Changing

Basically, I've gone ahead and renamed some classes to match up better with Microsoft's naming conventions. So now, instead of `PhotinoBlazorApp`, it's `PhotinoBlazorApplication`.

Also, I managed to implement the `IHostBuilder` and `IHostApplicationBuilder` interfaces into the `PhotinoBlazorApplicationBuilder`. It's a bit of a hack job for now, though, mostly copy/pasting with a sprinkle of tweaks from the .NET source.

And hey, I get it. The whole "internal" thing makes it a tad tricky to access. So if anyone's got some clever ideas, especially for handling different .NET versions, I'm all ears.

If any of you want to peek at the code and toss out some thoughts on how we can make things even better, just hop on over to the branch "[move-to-hosting](https://github.com/Denny09310/Photino.Blazor/tree/feature/move-to-hosting)"
