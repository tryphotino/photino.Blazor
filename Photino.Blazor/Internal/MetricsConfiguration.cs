#if NET6_0 || NET7_0

// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

using Microsoft.Extensions.Configuration;

namespace Microsoft.Extensions.Diagnostics.Metrics.Configuration;

internal sealed class MetricsConfiguration(IConfiguration configuration)
{
	public IConfiguration Configuration { get; } = configuration ?? throw new ArgumentNullException(nameof(configuration));
} 

#endif