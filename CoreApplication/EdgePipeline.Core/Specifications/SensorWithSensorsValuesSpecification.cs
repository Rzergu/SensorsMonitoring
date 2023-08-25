using EdgePipeline.Core.Entities.SensorAggregate;
using System;
using System.Collections.Generic;
using System.Text;

namespace IoTMonitoring.Core.Specifications
{
	public sealed class SensorWithSensorsValuesSpecification : BaseSpecification<Sensor>
	{
		public SensorWithSensorsValuesSpecification(int sensorId) : base(b => b.Id == sensorId)
		{
			AddInclude(b => b.SensorsValues);
			AddInclude(b => b.AverageValues);
		}
	}
}
