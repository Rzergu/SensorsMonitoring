﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IoTMonitoring.ViewModels.FrequencySensorData
{
	public class FrequencySensorDataIndexViewModel
	{
		public int SensorId { get; set; }
		public DateTime Date { get; set; }
		public IEnumerable<FrequencySensorDataViewModel> SensorsFrequencyDataItems { get; set; }
	}
}
