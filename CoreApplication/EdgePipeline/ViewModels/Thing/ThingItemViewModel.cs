using EdgePipeline.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IoTMonitoring.ViewModels.Thing
{
	public class ThingItemViewModel
	{
		public int Id { get; set; }
		public string Name { get; set; }

		public List<SensorItemViewModel> Sensors { get; set; }
	}
}
