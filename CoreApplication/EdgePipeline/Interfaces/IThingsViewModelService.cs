using IoTMonitoring.ViewModels.Thing;
using System.Threading.Tasks;

namespace IoTMonitoring.Interfaces
{
	public interface IThingsViewModelService
	{
		Task<ThingIndexViewModel> GetThingsItems();
		Task<ThingItemViewModel> GetThingWithSensorsItems(int thingId);
	}
}
