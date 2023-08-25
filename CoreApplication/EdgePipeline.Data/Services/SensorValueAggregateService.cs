using IoTMonitoring.Core.Entities.AverageValueAggregate;
using IoTMonitoring.Core.Entities.SensorValueAggregate;
using IoTMonitoring.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net.Http.Json;
using Newtonsoft.Json;
using System.Linq;

namespace IoTMonitoring.Data.Services
{
	public class SensorValueAggregateService : ISensorValueAggregateService
	{
		public class ModelResult 
		{
			public bool Sucsess { get; set; }
			public string Result { get; set; }
		}
		public async Task<AverageValue> GetAverageValue(SensorValue sensorValue)
		{
			AverageValue result = null;
			var content = new { columns = new string[] { "Type", "Data" }, data = new List<string[]> { 
				new string[] {
					"predict", JsonConvert.SerializeObject(sensorValue.FreqValues.Select(x => new { Frequency = x.Key, Power = x.Value }))
				}
			}};
			var stringContent = new StringContent(JsonConvert.SerializeObject(content), Encoding.UTF8, "application/json");
			stringContent.Headers.ContentType.CharSet = string.Empty;
			using (HttpClient client = new HttpClient()){
				using (HttpResponseMessage res = await client.SendAsync(new HttpRequestMessage
				{
					Method = HttpMethod.Post,
					RequestUri = new Uri($"http://88d73a10-cf57-4219-8dec-3cd0969bddbe.westeurope.azurecontainer.io/score"),
					Content = stringContent
				}))
				{
					result = new AverageValue();
					var stringResult = await res.Content.ReadAsStringAsync();
					var modelResult = JsonConvert.DeserializeObject<ModelResult>(stringResult.Substring(1, stringResult.Length - 2));
					var str = modelResult.Result.Split(',');
					var state = Core.Entities.SensorState.Normal;
					switch(str[0])
					{
						case "Warning":
							state = Core.Entities.SensorState.Warning;
							break;
						case "Error":
							state = Core.Entities.SensorState.Error;
							break;
					}

					result.SensorId = sensorValue.SensorId;
					result.Date = sensorValue.Date;
					result.Value = double.Parse(str[1]);
					result.State = state;
				};
				return result;
			}
		}
		public async Task<bool> SetAverageValue(SensorValue sensorValue)
		{
			bool result = false;
			var content = new
			{
				columns = new string[] { "Type", "Data" },
				data = new List<string[]> {
				new string[] {
					"set", JsonConvert.SerializeObject(sensorValue.FreqValues.Select(x => new { Frequency = x.Key, Power = x.Value }))
				}
			}
			};
			var stringContent = new StringContent(JsonConvert.SerializeObject(content), Encoding.UTF8, "application/json");
			stringContent.Headers.ContentType.CharSet = string.Empty;
			using (HttpClient client = new HttpClient())
			{
				using (HttpResponseMessage res = await client.SendAsync(new HttpRequestMessage
				{
					Method = HttpMethod.Post,
					RequestUri = new Uri($"http://88d73a10-cf57-4219-8dec-3cd0969bddbe.westeurope.azurecontainer.io/score"),
					Content = stringContent
				}))
				{
					result = true;
				};
				return result;
			}
		}
	}
}
