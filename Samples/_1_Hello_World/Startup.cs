using Microsoft.Extensions.DependencyInjection;
using Photino.Blazor;

namespace _1_Hello_World
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