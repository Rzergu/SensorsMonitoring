using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IoTMonitoring.ViewModels.AverageSensorData
{
	public class AverageSensorDataIndexViewModel
	{
		public IEnumerable<AverageSensorDataViewModel> SensorsAverageDataItems { get; set; }
	}
}
