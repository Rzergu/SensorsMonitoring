using EdgePipeline.Core.Interfaces;
using IoTMonitoring.Core.Entities;
using IoTMonitoring.Core.Entities.AverageValueAggregate;
using IoTMonitoring.Core.Entities.SensorValueAggregate;
using IoTMonitoring.Core.Entities.ThingAggregate;
using System.Collections.Generic;

namespace EdgePipeline.Core.Entities.SensorAggregate
{
	public class Sensor : BaseEntity, IAggregateRoot
	{
		public string Name { get; set; }
		public int ThingId { get; set; }
		public Thing Thing { get; set; }
		public SensorType Type { get; set; }

		public List<SensorValue> SensorsValues { get; set; }
		public List<AverageValue> AverageValues { get; set; }
	}
}
