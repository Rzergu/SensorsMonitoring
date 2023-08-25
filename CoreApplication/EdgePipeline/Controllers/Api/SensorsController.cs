using EdgePipeline.Interfaces;
using IoTMonitoring.Interfaces;
using IoTMonitoring.SignalRHub;
using IoTMonitoring.ViewModels.FrequencySensorData;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EdgePipeline.Controllers.Api
{
	[Route("[controller]")]
	public class SensorsController : ControllerBase
	{
		private IHubContext<ChartHub> _hub;
		private readonly ISensorsViewModelService _sensorsViewModelService;
		private readonly ISensorsValuesModelService _sensorsValuesViewModelService;
		public SensorsController(ISensorsViewModelService sensorsViewModelService, IHubContext<ChartHub> hub,
		ISensorsValuesModelService sensorsValuesViewModelService)
		{
			_sensorsViewModelService = sensorsViewModelService;
			_sensorsValuesViewModelService = sensorsValuesViewModelService;
			_hub = hub;
		}
		[HttpPost("Add")]
		public async Task<IActionResult> AddSensorData([FromBody]FrequencySensorDataIndexViewModel sensorData)
		{
			var averageData = await _sensorsValuesViewModelService.AddSensorsValues(sensorData);
			await _hub.Clients.Groups(sensorData.SensorId.ToString()).SendAsync("transferfreqdata", sensorData);
			await _hub.Clients.Groups(sensorData.SensorId.ToString()).SendAsync("transferaveragedata", averageData);
			return Ok();
		}
		[HttpPost("Set")]
		public async Task<IActionResult> SetNormalSensorData([FromBody] FrequencySensorDataViewModel[] sensorData)
		{
			var res = await _sensorsValuesViewModelService.SetNormalSensorValues(sensorData);
			return Ok(res);
		}
		[HttpGet("{sensorId}")]
		public async Task<IActionResult> GetSensor(int sensorId)
		{
			var sensor = await _sensorsViewModelService.GetSensor(sensorId);
			return Ok(sensor);
		}
		[HttpGet]
		public async Task<IActionResult> List()
		{
			var sensorModel = await _sensorsViewModelService.GetSensorsItems();
			return Ok(sensorModel.SensorsItems);
		}
	}
}
