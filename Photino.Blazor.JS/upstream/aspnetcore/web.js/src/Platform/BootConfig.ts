export class BootConfigResult {
  private constructor(public bootConfig: BootJsonData, public applicationEnvironment: string) {
  }

  static async initAsync(environment?: string): Promise<BootConfigResult> {
    const bootConfigResponse = await fetch('_framework/blazor.boot.json', {
      method: 'GET',
      credentials: 'include',
      cache: 'no-cache'
    });

    // While we can expect an ASP.NET Core hosted application to include the environment, other
    // hosts may not. Assume 'Production' in the absence of any specified value.
    const applicationEnvironment = environment || bootConfigResponse.headers.get('Blazor-Environment') || 'Production';
    const bootConfig: BootJsonData = await bootConfigResponse.json();

    return new BootConfigResult(bootConfig, applicationEnvironment);
  };
}

// Keep in sync with bootJsonData in Microsoft.AspNetCore.Components.WebAssembly.Build
export interface BootJsonData {
  readonly entryAssembly: string;
  readonly resources: ResourceGroups;
  /** Gets a value that determines if this boot config was produced from a non-published build (i.e. dotnet build or dotnet run) */
  readonly debugBuild: boolean;
  readonly linkerEnabled: boolean;
  readonly cacheBootResources: boolean;
  readonly config: string[];
  readonly icuDataMode: ICUDataMode;
}

export interface ResourceGroups {
  readonly assembly: ResourceList;
  readonly lazyAssembly: ResourceList;
  readonly pdb?: ResourceList;
  readonly runtime: ResourceList;
  readonly satelliteResources?: { [cultureName: string] : ResourceList };
}

export type ResourceList = { [name: string]: string };

export enum ICUDataMode {
  Sharded,
  All,
  Invariant
}
