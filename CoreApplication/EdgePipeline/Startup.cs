using EdgePipeline.Core.Interfaces;
using EdgePipeline.Core.Services;
using EdgePipeline.Data.Data;
using EdgePipeline.Interfaces;
using EdgePipeline.Services;
using IoTMonitoring.Core.Entities;
using IoTMonitoring.Core.Interfaces;
using IoTMonitoring.Data.Data.Things;
using IoTMonitoring.Data.Identity;
using IoTMonitoring.Data.Services;
using IoTMonitoring.Interfaces;
using IoTMonitoring.Services;
using IoTMonitoring.SignalRHub;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Threading.Tasks;

namespace EdgePipeline
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		public void ConfigureServices(IServiceCollection services)
		{
			services.AddScoped(typeof(IAsyncRepository<>), typeof(EfRepository<>));
			services.AddScoped<ISensorService, SensorService>();
			services.AddScoped<ISensorsViewModelService, SensorsViewModelService>();
			services.AddScoped<IThingsViewModelService, ThingsViewModelService>();
			services.AddScoped<ISensorValueAggregateService, SensorValueAggregateService>();
			services.AddScoped<ISensorsValuesModelService, SensorsValuesModelService>();
			services.AddAuthentication(x =>
			{
				x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
			})
			 .AddJwtBearer(options =>
			 {
				 options.RequireHttpsMetadata = false;
				 options.SaveToken = true;
				 options.TokenValidationParameters = new TokenValidationParameters
				 {
							// ��������, ����� �� �������������� �������� ��� ��������� ������
							ValidateIssuer = true,
							// ������, �������������� ��������
							ValidIssuer = AuthOptions.ISSUER,

							// ����� �� �������������� ����������� ������
							ValidateAudience = true,
							// ��������� ����������� ������
							ValidAudience = AuthOptions.AUDIENCE,
							// ����� �� �������������� ����� �������������
							ValidateLifetime = true,

							// ��������� ����� ������������
							IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
							// ��������� ����� ������������
							ValidateIssuerSigningKey = true,
				 };
				 options.Events = new JwtBearerEvents
				 {
					 OnMessageReceived = context =>
					 {
						 var accessToken = context.Request.Query["access_token"];

						 // If the request is for our hub...
						 var path = context.HttpContext.Request.Path;
						 if (!string.IsNullOrEmpty(accessToken) &&
							 (path.StartsWithSegments("/chart")))
						 {
							 // Read the token out of the query string
							 context.Token = accessToken;
						 }
						 return Task.CompletedTask;
					 }
				 };
			 });

			services.AddCors(options =>
			{
				options.AddPolicy("CorsPolicy", builder => builder
				.AllowAnyMethod()
				.SetIsOriginAllowed((host) => true)
				.AllowAnyHeader()
				.AllowCredentials());
			});
			services.AddSignalR();
			services.AddMvc(options =>
			{

			});
			services.AddControllers();
		}

		public void ConfigureDevelopmentServices(IServiceCollection services)
		{
			ConfigureProductionServices(services);
		}
		private static void ConfigureCookieSettings(IServiceCollection services)
		{
		}
		public void ConfigureProductionServices(IServiceCollection services)
		{
			services.AddDbContext<ThingsContext>(c =>
				c.UseNpgsql(Configuration.GetConnectionString("connectionString"), option =>
				{
					option.MigrationsAssembly("IoTMonitoring.Data");
				}));

			ConfigureServices(services);
		}



		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseExceptionHandler("/Error");
				app.UseHsts();
			}
			//app.UseHttpsRedirection();
			app.UseRouting();
            app.UseCors("CorsPolicy");
			app.UseAuthentication();
			app.UseAuthorization();
			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
				endpoints.MapHub<ChartHub>("/chart");
			});
		}
	}
}
