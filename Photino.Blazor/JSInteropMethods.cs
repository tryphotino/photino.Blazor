using Microsoft.AspNetCore.Components.RenderTree;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace Photino.Blazor
{
    public static class JSInteropMethods
    {
        [JSInvokable(nameof(DispatchEvent))]
        public static async Task DispatchEvent(WebEventDescriptor eventDescriptor, string eventArgsJson)
        {
            var webEvent = WebEventData.Parse(eventDescriptor, eventArgsJson);
            var renderer = ComponentsDesktop.DesktopRenderer;
            await renderer.DispatchEventAsync(
                webEvent.EventHandlerId,
                webEvent.EventFieldInfo,
                webEvent.EventArgs);
        }

        [JSInvokable(nameof(NotifyLocationChanged))]
        public static void NotifyLocationChanged(string uri, bool isInterceptedLink)
        {
            DesktopNavigationManager.Instance.SetLocation(uri, isInterceptedLink);
        }
    }
}
