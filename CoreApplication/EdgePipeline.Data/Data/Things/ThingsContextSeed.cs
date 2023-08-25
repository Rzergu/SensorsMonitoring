using IoTMonitoring.Core.Entities.ThingAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IoTMonitoring.Data.Data.Things
{
	public class ThingsContextSeed
	{
		public static async Task SeedAsync(ThingsContext thingsContext, ILoggerFactory loggerFactory, int? retry = 0)
		{
			int retryForAvailability = retry.Value;
			try
			{
				// TODO: Only run this if using a real database
				thingsContext.Database.Migrate();

				if (!thingsContext.Things.Any())
				{
					thingsContext.Things.AddRange(
						GetPreconfiguredItems());

					await thingsContext.SaveChangesAsync();
				}
			}
			catch (Exception ex)
			{
				if (retryForAvailability < 10)
				{
					retryForAvailability++;
					var log = loggerFactory.CreateLogger<ThingsContextSeed>();
					log.LogError(ex.Message);
					await SeedAsync(thingsContext, loggerFactory, retryForAvailability);
				}
			}
		}
		static IEnumerable<Thing> GetPreconfiguredItems()
		{
			return new List<Thing>()
			{
				new Thing() { Name = "Thing 1"},
				new Thing() { Name = "Thing 2"}
			};
		}
	}
}
