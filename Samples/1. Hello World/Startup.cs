using Microsoft.Extensions.DependencyInjection;
using Photino.Blazor;

namespace Photino.Blazor.Samples.HelloWorld
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        { }

        public void Configure(DesktopApplicationBuilder app)
        {
            app.AddComponent<App>("app");
        }
    }
}