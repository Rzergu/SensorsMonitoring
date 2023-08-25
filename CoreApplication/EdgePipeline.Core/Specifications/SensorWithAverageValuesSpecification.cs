using EdgePipeline.Core.Entities.SensorAggregate;
using System;

namespace IoTMonitoring.Core.Specifications
{

	public class SensorWithAverageValuesSpecification : BaseSpecification<Sensor>
	{
		public SensorWithAverageValuesSpecification(int sensorId) : base(b => b.Id == sensorId)
		{
			AddInclude(b => b.AverageValues);
		}
	}

}