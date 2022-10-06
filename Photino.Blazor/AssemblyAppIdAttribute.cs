using System;

namespace Photino.Blazor;

public class AssemblyAppIdAttribute : Attribute
{
    public string AppId { get; set; }

    public AssemblyAppIdAttribute(string appid)
    {
        AppId = appid;
    }
}