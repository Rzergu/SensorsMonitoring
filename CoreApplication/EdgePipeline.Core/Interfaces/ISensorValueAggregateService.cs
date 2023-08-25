using IoTMonitoring.Core.Entities.AverageValueAggregate;
using IoTMonitoring.Core.Entities.SensorValueAggregate;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace IoTMonitoring.Core.Interfaces
{
	public interface ISensorValueAggregateService
	{
		Task<AverageValue> GetAverageValue(SensorValue sensorValue);
		Task<bool> SetAverageValue(SensorValue sensorValue);
	}
}
