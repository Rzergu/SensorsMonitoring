using EdgePipeline.Core.Entities;
using EdgePipeline.Core.Entities.SensorAggregate;
using EdgePipeline.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace IoTMonitoring.Core.Entities.ThingAggregate
{
	public class Thing : BaseEntity, IAggregateRoot
	{
		public string Name { get; set; }

		public List<Sensor> Sensors { get; set; }
	}
}
