using IoTMonitoring.Core.Entities.AverageValueAggregate;
using IoTMonitoring.ViewModels.FrequencySensorData;
using System.Threading.Tasks;

namespace IoTMonitoring.Interfaces
{
	public interface ISensorsValuesModelService
	{
		Task<AverageValue> AddSensorsValues(FrequencySensorDataIndexViewModel sensData);
		Task<bool> SetNormalSensorValues(FrequencySensorDataViewModel[] sensData);
	}
}
