using System;
using System.Collections.Generic;
using System.Text;

namespace Nitobi
{
	[Serializable]
	public class NitobiException : ApplicationException
	{
		public NitobiException(string info)
			:base(info)
		{
		}
	}
}
