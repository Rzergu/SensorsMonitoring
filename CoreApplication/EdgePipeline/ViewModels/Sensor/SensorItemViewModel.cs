using IoTMonitoring.Core.Entities.SensorValueAggregate;
using IoTMonitoring.ViewModels.AverageSensorData;
using IoTMonitoring.ViewModels.FrequencySensorData;
using System.Collections.Generic;

namespace EdgePipeline.ViewModels
{
	public class SensorItemViewModel
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public List<FrequencySensorDataIndexViewModel> SensorValues { get; set; }
		public List<AverageSensorDataViewModel> AverageValues { get; set; }
	}
}
