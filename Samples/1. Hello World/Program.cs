using System;
using Photino.Blazor;

namespace Photino.Blazor.Samples.HelloWorld
{
    class Program
    {
        [STAThread]
        static void Main(string[] args)
        {
            ComponentsDesktop.Run<Startup>("Hello Photino Blazor!"
                , "wwwroot/index.html"
                , x:450
                , y:100
                , width:1000
                , height:900);
        }
    }
}
