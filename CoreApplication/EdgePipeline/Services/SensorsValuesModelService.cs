using EdgePipeline.Core.Entities.SensorAggregate;
using EdgePipeline.Core.Interfaces;
using IoTMonitoring.Core.Entities.AverageValueAggregate;
using IoTMonitoring.Core.Entities.SensorValueAggregate;
using IoTMonitoring.Core.Interfaces;
using IoTMonitoring.Interfaces;
using IoTMonitoring.ViewModels.FrequencySensorData;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Threading.Tasks;

namespace IoTMonitoring.Services
{
	public class SensorsValuesModelService : ISensorsValuesModelService
	{
		private readonly IAsyncRepository<SensorValue> _sensorsValuesRepository;
		private readonly IAsyncRepository<AverageValue> _sensorsAverageValueRepository;
		private readonly ILogger<SensorsValuesModelService> _logger;
		private readonly ISensorValueAggregateService _sensorValueAggregateService;
		public SensorsValuesModelService(IAsyncRepository<SensorValue> sensorsValuesRepository,
			ISensorValueAggregateService sensorValueAggregateService,
			IAsyncRepository<AverageValue> sensorsAverageValueRepository,
			ILogger<SensorsValuesModelService> logger)
		{
			_sensorsAverageValueRepository = sensorsAverageValueRepository;
			_sensorValueAggregateService = sensorValueAggregateService;
			_sensorsValuesRepository = sensorsValuesRepository;
			_logger = logger;
		}
		public async Task<AverageValue> AddSensorsValues(FrequencySensorDataIndexViewModel sensData)
		{
			_logger.LogInformation("AddSensorsValues called");
			var sensorValue = new SensorValue()
            {
				Date = DateTime.SpecifyKind(sensData.Date, DateTimeKind.Utc), 
				SensorId = sensData.SensorId,
				FreqValues = sensData.SensorsFrequencyDataItems.ToDictionary(x => x.Frequency, x => x.Power)
			};
			//var averageValue = await _sensorValueAggregateService.GetAverageValue(sensorValue);
			//await _sensorsAverageValueRepository.AddAsync(averageValue);
			await _sensorsValuesRepository.AddAsync(sensorValue);
			return new AverageValue();
		}

		public async Task<bool> SetNormalSensorValues(FrequencySensorDataViewModel[] sensData)
		{
			_logger.LogInformation("SetNormalSensorValues called");
			var sensorValue = new SensorValue()
			{
				FreqValues = sensData.ToDictionary(x => x.Frequency, x => x.Power)
			};
			var res = await _sensorValueAggregateService.SetAverageValue(sensorValue);
			return res;
		}
	}
}
