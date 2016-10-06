// --------------------------------------------------------------------------------------------------------------------
// <copyright file="Startup.cs" company="">
//   Copyright © 2016 
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

[assembly: Microsoft.Owin.OwinStartup("LoanWebApp",typeof(App.Web1.Startup))]

namespace App.Web1
{
    using Microsoft.Owin.Hosting;
    using Owin;
    using System;
    using System.Net.Http;

    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //// For more information on how to configure your application, visit:
            //// http://go.microsoft.com/fwlink/?LinkID=316888

            this.ConfigureAuth(app);

            //using (WebApp.Start<LoanSvc.SelfHost>("http://localhost:9000/"))
            //{
            //    // Create HttpCient and make a request to api/values 
            //    HttpClient client = new HttpClient();

            //    var response = client.GetAsync("http://localhost:9000/" + "api/values").Result;
            //}
        }
    }
}
