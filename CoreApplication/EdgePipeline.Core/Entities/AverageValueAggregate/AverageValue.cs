using EdgePipeline.Core.Entities;
using EdgePipeline.Core.Entities.SensorAggregate;
using EdgePipeline.Core.Interfaces;
using System;

namespace IoTMonitoring.Core.Entities.AverageValueAggregate
{

	public class AverageValue : BaseEntity, IAggregateRoot
	{
		public int SensorId { get; set; }
		public Sensor Sensor { get; set; }
		public DateTime Date { get; set; }
		public double Value { get; set; }
		public SensorState State { get; set; }
	}

}