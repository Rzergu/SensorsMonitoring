using EdgePipeline.Core.Entities;
using EdgePipeline.Core.Entities.SensorAggregate;
using EdgePipeline.Core.Interfaces;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IoTMonitoring.Core.Entities.SensorValueAggregate
{
	public class SensorValue : BaseEntity, IAggregateRoot
	{
		public int SensorId { get; set; }
		public Sensor Sensor { get; set; }
		public DateTime Date { get; set; }
		[NotMapped]
		public Dictionary<double, double> FreqValues { get; set; }
		public string FreqValuesJson
		{
			get => JsonConvert.SerializeObject(FreqValues);
			set => FreqValues = JsonConvert.DeserializeObject<Dictionary<double, double>>(value);
		}
	}
}
