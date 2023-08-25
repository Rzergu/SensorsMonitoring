using System.Linq;
using System.Threading.Tasks;
using EdgePipeline.Core.Interfaces;
using EdgePipeline.ViewModels;
using IoTMonitoring.Core.Entities.ThingAggregate;
using IoTMonitoring.Core.Specifications;
using IoTMonitoring.Interfaces;
using IoTMonitoring.ViewModels.Thing;
using Microsoft.Extensions.Logging;

namespace IoTMonitoring.Services
{
	public class ThingsViewModelService : IThingsViewModelService
	{
		private readonly IAsyncRepository<Thing> _thingsRepository;
		private readonly ILogger<ThingIndexViewModel> _logger;
		public ThingsViewModelService(IAsyncRepository<Thing> thingsRepository, ILogger<ThingIndexViewModel> logger)
		{
			_thingsRepository = thingsRepository;
			_logger = logger;
		}
		public async Task<ThingIndexViewModel> GetThingsItems()
		{
			_logger.LogInformation("GetThingsItems called.");
			var thingsItem = await _thingsRepository.ListAllAsync();
			var vm = new ThingIndexViewModel()
			{
				ThingsItems = thingsItem.Select(x => new ThingItemViewModel()
				{
					Id = x.Id,
					Name = x.Name
				})
			};
			return vm;
		}

		public async Task<ThingItemViewModel> GetThingWithSensorsItems(int thingId)
		{
			_logger.LogInformation("GetThingsItems called.");
			var thingItems = await _thingsRepository.ListAsync(new ThingWithSensorsSpecification(thingId));
			var thingItem = thingItems.FirstOrDefault();
			var vm = new ThingItemViewModel()
			{
				Id = thingItem.Id,
				Name = thingItem.Name,
				Sensors = thingItem.Sensors.Select(y => new SensorItemViewModel()
				{
					Id = y.Id,
					Name = y.Name
				}).ToList()
			};
			return vm;
		}
	}
}
