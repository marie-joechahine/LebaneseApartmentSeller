using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.EntityFrameworkCore;
using Angular_ASPNETCore_Realtor.Repository;
using Microsoft.AspNetCore.Mvc;
using Angular_ASPNETCore_Realtor.Entities;

namespace Angular_ASPNETCore_Realtor
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public static IConfiguration Configuration { get; private set; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {

      services.AddMvc();


      var connectionString = Startup.Configuration["connectionStrings:realtorInfoDBConnectionString"];
      services.AddDbContext<RealtorInfoContext>(o => o.UseSqlServer(connectionString));

      services.AddScoped<IRealtorInfoRepository, RealtorInfoRepository>();

      
    }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, 
             RealtorInfoContext realtorInfoContext, IAntiforgery antiforgery)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

      realtorInfoContext.EnsureSeedDataForContext();


      app.UseStatusCodePages();


            app.UseStaticFiles();
     

            AutoMapper.Mapper.Initialize(cfg =>
            {
              cfg.CreateMap<Entities.Buyer, Models.BuyerWithoutApartmentsDto>();
              cfg.CreateMap<Entities.Buyer, Models.BuyerDto>();
              cfg.CreateMap<Models.BuyerForCreationDto, Entities.Buyer>();
              cfg.CreateMap<Entities.Apartment, Models.ApartmentDto>();
              cfg.CreateMap<Models.ApartmentForCreationDto, Entities.Apartment>();
              cfg.CreateMap<Models.ApartmentForUpdateDto, Entities.Apartment>();
              cfg.CreateMap<Entities.Apartment, Models.ApartmentForUpdateDto>();
            });


      app.UseMvc(routes =>
            {
              routes.MapRoute(
                  name: "default",
                  template: "{controller=Home}/{action=Index}/{id?}");

              routes.MapSpaFallbackRoute("spa-fallback", new { controller = "Home", action = "Index" });
            });

      
    }
    }
}
