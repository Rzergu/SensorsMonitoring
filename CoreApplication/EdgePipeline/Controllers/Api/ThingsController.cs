using IoTMonitoring.Interfaces;
using IoTMonitoring.SignalRHub;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace IoTMonitoring.Controllers.Api
{
	[Route("[controller]")]
	public class ThingsController : ControllerBase
	{
		private IHubContext<ChartHub> _hub;
		private readonly IThingsViewModelService _thingsViewModelService;
		public ThingsController(IThingsViewModelService thingsViewModelService, IHubContext<ChartHub> hub)
		{
			_thingsViewModelService = thingsViewModelService;
			_hub = hub;
		}

		[HttpGet]
		public async Task<IActionResult> List()
		{
			var thingsItems = await _thingsViewModelService.GetThingsItems();
			return Ok(thingsItems.ThingsItems);
		}

		[HttpGet("{thingId}")]
		public async Task<IActionResult> List(int thingId)
		{
			var thingItem = await _thingsViewModelService.GetThingWithSensorsItems(thingId);
			return Ok(thingItem);
		}
	}
}
