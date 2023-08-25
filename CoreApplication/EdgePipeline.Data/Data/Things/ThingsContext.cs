using EdgePipeline.Core.Entities.SensorAggregate;
using IoTMonitoring.Core.Entities.AverageValueAggregate;
using IoTMonitoring.Core.Entities.SensorValueAggregate;
using IoTMonitoring.Core.Entities.ThingAggregate;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace IoTMonitoring.Data.Data.Things
{
	public class ThingsContext : DbContext
	{
		public ThingsContext(DbContextOptions<ThingsContext> options) : base(options)
		{

		}

		public DbSet<Thing> Things { get; set; }
		public DbSet<Sensor> Sensors { get; set; }
		public DbSet<SensorValue> SensorValue { get; set; }
		public DbSet<AverageValue> AverageValues { get; set; }
		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
			modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
		}
	}
}
