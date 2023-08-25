using IoTMonitoring.Core.Helper.Query;
using System;
using System.Collections.Generic;
using System.Text;

namespace IoTMonitoring.Core.Interfaces
{
	public interface IIncludeQuery
	{
		Dictionary<IIncludeQuery, string> PathMap { get; }
		IncludeVisitor Visitor { get; }
		HashSet<string> Paths { get; }
	}

	public interface IIncludeQuery<TEntity, out TPreviousProperty> : IIncludeQuery
	{
	}
}
