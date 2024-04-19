using Microsoft.AspNetCore.Components;
using System.Collections;

namespace Photino.Blazor;

public class RootComponentList : IEnumerable<(Type, string)>
{
    private readonly List<(Type componentType, string domElementSelector)> components = [];

    public void Add<TComponent>(string selector) where TComponent : IComponent
    {
        components.Add((typeof(TComponent), selector));
    }

    public void Add(Type componentType, string selector)
    {
        if (!typeof(IComponent).IsAssignableFrom(componentType))
        {
            throw new ArgumentException("The component type must implement IComponent interface.");
        }

        components.Add((componentType, selector));
    }

    public IEnumerator<(Type, string)> GetEnumerator()
    {
        return components.GetEnumerator();
    }

    IEnumerator IEnumerable.GetEnumerator()
    {
        return components.GetEnumerator();
    }
}