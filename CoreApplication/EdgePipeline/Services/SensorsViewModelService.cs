using EdgePipeline.Core.Entities.SensorAggregate;
using EdgePipeline.Core.Interfaces;
using EdgePipeline.Interfaces;
using EdgePipeline.ViewModels;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System.Linq;
using IoTMonitoring.Core.Specifications;
using System.Collections.Generic;
using IoTMonitoring.ViewModels.FrequencySensorData;
using IoTMonitoring.ViewModels.AverageSensorData;

namespace EdgePipeline.Services
{
	public class SensorsViewModelService : ISensorsViewModelService
	{
		private readonly IAsyncRepository<Sensor> _sensorsRepository;
		private readonly ILogger<SensorsViewModelService> _logger;
		public SensorsViewModelService(IAsyncRepository<Sensor> sensorRepository, ILogger<SensorsViewModelService> logger)
		{
			_sensorsRepository = sensorRepository;
			_logger = logger;
		}

		public async Task<SensorItemViewModel> GetSensor(int sensorId)
		{
			_logger.LogInformation("GetSensorItem called.");
			var sensorItems = await _sensorsRepository.ListAsync(new SensorWithSensorsValuesSpecification(sensorId));
			var sensorItem = sensorItems.FirstOrDefault();
			var vm = new SensorItemViewModel() {
				Id = sensorItem.Id,
				Name = sensorItem.Name,
				AverageValues = sensorItem.AverageValues.Select(v => new AverageSensorDataViewModel() {
					Date = v.Date,
					Value = v.Value
				}).ToList(),
				SensorValues = sensorItem.SensorsValues.Select(x => new FrequencySensorDataIndexViewModel() { 
					Date = x.Date,
					SensorsFrequencyDataItems = x.FreqValues.Select(y => new FrequencySensorDataViewModel() { 
						Frequency = y.Key,
						Power = y.Value
					})		
				}).ToList()
			};
			return vm;
		}

		public async Task<SensorIndexViewModel> GetSensorsItems()
		{
			_logger.LogInformation("GetSensorsItems called.");
			var sensorsItem = await _sensorsRepository.ListAllAsync();
			var vm = new SensorIndexViewModel()
			{
				SensorsItems = sensorsItem.Select(x => new SensorItemViewModel() {
					Id = x.Id,
					Name = x.Name
				})
			};
			return vm;
		}
	}
}
