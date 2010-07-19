using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;
using System.Xml;

namespace Nitobi
{
	/// <summary>
	/// Defines the generic interface for a row of data when a nitobi control is sending back rows
	/// of data in an Ajax request.
	/// </summary>
	/// <remarks>Implementations of this class are used when the a grid makes a save data Ajax request
	/// to hold the rows that have been changed.  It is also used when a tree control is doing a get
	/// data Ajax request where the Row is the parent node of the list being requested.</remarks>
	public interface IRow
	{
		object this[string fieldName] { get; }
		UpdateAction UpdateAction { get; }
		object RowKey { get; set; }
	}

	/// <summary>
	/// Implements the IRow interface by binding to a .NET object and using .NET reflection to get
	/// property values based on the fieldName provided.
	/// </summary>
	/// <remarks>This class is used for populating local data within the tree control.</remarks>
	public class LateBindingDataRow : IRow
	{
		public object RawData;
		public LateBindingDataRow(object rawData)
		{
			RawData = rawData;
		}

		public object this[string fieldName]
		{
			get
			{
				if (RawData == null)
					return null;
				return Cmn.getObjValue(RawData, fieldName);
			}
		}

		public object RowKey
		{
			get
			{
				if (RawData == null)
					return null;
				return Cmn.getObjValue(RawData, "xk");
			}
			set
			{
				//TODO: implement
			}
		}

		public UpdateAction UpdateAction
		{
			get { return UpdateAction.None; }
		}
	}

	/// <summary>
	/// Implements the IRow interface by getting its values from the HTTP Request using the provided
	/// fieldName.
	/// </summary>
	/// <remarks>This class is used when the Tree and Grid being used with the ExpandColumn have made
	/// a request for a list of data where there is a parent node being provided as name/value pairs
	/// in the HTTP Request.</remarks>
	public class RequestDataRow : IRow
	{
		protected ColumnsEntity m_columns;
		public RequestDataRow(ColumnsEntity columns)
		{
			m_columns = columns;
		}
		public object this[string fieldName]
		{
			get
			{
				return System.Web.HttpContext.Current.Request[fieldName];
			}
		}
		public object RowKey
		{
			get
			{
				return System.Web.HttpContext.Current.Request["xk"];
			}
			set
			{
				//Seems like this scenario, there is nothing that should be done.  
				//This class is for tree gets only right now.
			}
		}
		public UpdateAction UpdateAction { get { return UpdateAction.None; } }
	}

	/// <summary>
	/// Implements the IRow interface by gettings values from a System.Xml.XmlElement object using
	/// the provided fieldName.
	/// </summary>
	/// <remarks>This class is used when the Grid control makes a save data request and the rows
	/// of data that have been changed are provided as an xml document in the request body.  This class
	/// uses a ColumnsEntity class to help translate between the fieldName provided and the attribute
	/// name used by the Nitobi compressed XML.</remarks>
	public class XmlDataRow : IRow
	{
		public XmlElement RawData;
		protected ColumnsEntity m_columns;
		public XmlDataRow(XmlElement data, ColumnsEntity columns)
		{
			RawData = data;
			m_columns = columns;
		}
		public object this[string fieldName]
		{
			get
			{
				int c = m_columns.Columns.Count;
				for (int p = 0, index = 0; p < c; p++, index++)
					if (!m_columns.Columns[p].ContributesToData)
					{
						if (string.Compare(m_columns.Columns[p].Name, fieldName, true) == 0 && m_columns.Columns[p] is KeyColumn)
							return RowKey;
						index--;
					}
					else if (string.Compare(m_columns.Columns[p].Name, fieldName, true) == 0)
						return m_columns.Columns[p].getUpdatedValue(RawData.GetAttribute(((char)('a' + index)).ToString()), this);
				return null;
			}
		}

		public object RowKey
		{
			get
			{
				return RawData.GetAttribute("xk");
			}
			set
			{
				string v = "";
				if (value != null)
					v = value.ToString();
				RawData.SetAttribute("xk", v);
			}
		}

		public UpdateAction UpdateAction
		{
			get
			{
				string v = RawData.GetAttribute("xac").ToLower();
				if (v == "u")
					return UpdateAction.Update;
				else if (v == "i")
					return UpdateAction.Insert;
				else if (v == "d")
					return UpdateAction.Delete;

				return UpdateAction.None;
			}
		}

	}
}
