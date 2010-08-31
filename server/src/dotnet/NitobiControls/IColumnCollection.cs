using System;
using System.Collections.Generic;
using System.Text;

namespace Nitobi
{
	public interface IColumnCollection
	{
		List<Column> Columns { get; }
		string DataSourceId { get; }
		string ColumnNames { get; }
		KeyColumn KeyColumns { get; }
	}
}
