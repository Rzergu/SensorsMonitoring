using Microsoft.AspNetCore.Routing;
using System;
using System.Text.RegularExpressions;

namespace EdgePipeline
{
	public class SlugifyParameterTransformer: IOutboundParameterTransformer
	{
		public string TransformOutbound(object value)
		{
			if (value == null) { return null; }

			// Slugify value
			return Regex.Replace(value.ToString(), "([a-z])([A-Z])", "$1-$2").ToLower();
		}
	}
}
