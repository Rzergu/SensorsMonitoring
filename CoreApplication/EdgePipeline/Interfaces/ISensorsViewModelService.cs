using EdgePipeline.ViewModels;
using System.Threading.Tasks;

namespace EdgePipeline.Interfaces
{
	public interface ISensorsViewModelService
	{
		Task<SensorIndexViewModel> GetSensorsItems();
		Task<SensorItemViewModel> GetSensor(int sensorId);
	}
}
