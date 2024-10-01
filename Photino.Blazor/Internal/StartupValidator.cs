#if NET6_0 || NET7_0

// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

using System.Runtime.ExceptionServices;

namespace Microsoft.Extensions.Options;

internal sealed class StartupValidator(IOptions<StartupValidatorOptions> validators) : IStartupValidator
{
    private readonly StartupValidatorOptions _validatorOptions = validators.Value;

    public void Validate()
    {
        List<Exception>? exceptions = null;

        foreach (Action validator in _validatorOptions._validators.Values)
        {
            try
            {
                // Execute the validation method and catch the validation error
                validator();
            }
            catch (OptionsValidationException ex)
            {
                exceptions ??= [];
                exceptions.Add(ex);
            }
        }

        if (exceptions != null)
        {
            if (exceptions.Count == 1)
            {
                // Rethrow if it's a single error
                ExceptionDispatchInfo.Capture(exceptions[0]).Throw();
            }

            if (exceptions.Count > 1)
            {
                // Aggregate if we have many errors
                throw new AggregateException(exceptions);
            }
        }
    }
} 

#endif