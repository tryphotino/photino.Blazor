// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

using Microsoft.Extensions.Logging;

namespace Microsoft.Extensions.Hosting.Internal;

internal static class LoggerEventIds
{
    public static readonly EventId Starting = new(1, nameof(Starting));
    public static readonly EventId Started = new(2, nameof(Started));
    public static readonly EventId Stopping = new(3, nameof(Stopping));
    public static readonly EventId Stopped = new(4, nameof(Stopped));
    public static readonly EventId StoppedWithException = new(5, nameof(StoppedWithException));
    public static readonly EventId ApplicationStartupException = new(6, nameof(ApplicationStartupException));
    public static readonly EventId ApplicationStoppingException = new(7, nameof(ApplicationStoppingException));
    public static readonly EventId ApplicationStoppedException = new(8, nameof(ApplicationStoppedException));
    public static readonly EventId BackgroundServiceFaulted = new(9, nameof(BackgroundServiceFaulted));
    public static readonly EventId BackgroundServiceStoppingHost = new(10, nameof(BackgroundServiceStoppingHost));
    public static readonly EventId HostedServiceStartupFaulted = new(11, nameof(HostedServiceStartupFaulted));
}