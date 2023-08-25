using IoTMonitoring.Core.Entities.ThingAggregate;
using System;
using System.Collections.Generic;
using System.Text;

namespace IoTMonitoring.Core.Specifications
{
	public sealed class ThingWithSensorsSpecification : BaseSpecification<Thing>
	{
		public ThingWithSensorsSpecification(int thingId)
		: base(b => b.Id == thingId)
		{
			AddInclude(b => b.Sensors);
		}
	}
}
