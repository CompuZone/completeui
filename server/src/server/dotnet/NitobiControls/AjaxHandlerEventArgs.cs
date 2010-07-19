using System;
using System.Collections.Generic;
using System.Text;
using System.Web;
using System.Xml;

namespace Nitobi
{
	/// <summary>
	/// Provided during a Grid Ajax save data event and contains the data modified by
	/// the user in the grid.
	/// </summary>
	/// <remarks>This class has a reference to the XML Document that contains the updates
	/// by the user.  When accessing the rows of data that has been changed, this class returns
	/// new instances on the XmlDataRow class, which wraps the XmlElement for the given row.</remarks>
	public class AjaxSaveDataHandlerEventArgs : EventArgs
	{
		public XmlNamespaceManager NsMgr;
		public XmlElement UpdatedData;
		protected ColumnsEntity m_columns;
		protected int m_count = 0;

		public AjaxSaveDataHandlerEventArgs(string xml, ColumnsEntity columns)
		{
			XmlDocument xmldoc = new XmlDocument();
			NsMgr = new XmlNamespaceManager(xmldoc.NameTable);
			NsMgr.AddNamespace("ntb", "http://www.nitobi.com");
			xmldoc.LoadXml(xml);
			UpdatedData = xmldoc.SelectSingleNode("//ntb:data", NsMgr) as XmlElement;
			m_count = UpdatedData.SelectNodes("//ntb:e", NsMgr).Count;
			m_columns = columns;
		}

		public int Count { get { return m_count; } }
		public IRow this[int index]
		{
			get
			{
				return new XmlDataRow((XmlElement)UpdatedData.ChildNodes[index], m_columns);
			}
		}


	}

	/// <summary>
	/// Provided during an Ajax get data request and contains all the information provided by the
	/// javascript control about what data is needed.
	/// </summary>
	/// <remarks>  Because the Grid, TreeGrid, Combo, Tree, and Calendar controls all do Ajax get
	/// data requests, this class contains properties relavent to a specific control such as
	/// SearchString which is used as a filter on the data rows for the combo only.  Also, the 
	/// SortDirection and SortColumn members are specific to the Grid and TreeGrid only.
	/// 
	/// The XmlDataHandler class uses the values in an instance of this class to create the 
	/// compressed XML in response to a request for data.</remarks>
	public class AjaxGetDataHandlerEventArgs : EventArgs
	{
		public int AjaxRequestType;
		public int StartRecordIndex = 0;
		public int PageSize = -1;
		public string SortColumn = null;
		public SortOrder SortDirection = SortOrder.Asc;
		public string DataSourceId = null;
		public bool SeekToRecordIndex = false;
		public string SearchString = null;
		public string LastString = null;
		public int CurrentTreeDepth = 0;
		public int MaxTreeDepth = 0;
		public string SimpleControlType = null;

		public IRow ParentRow = null;

		public AjaxGetDataHandlerEventArgs(int ajaxRequestType, string dataSourceId, int startRecordIndex, int pageSize, string sortCol, SortOrder dir)
			: this(ajaxRequestType, dataSourceId, startRecordIndex, pageSize)
		{
			SortColumn = sortCol;
			SortDirection = dir;
		}
        public AjaxGetDataHandlerEventArgs(int ajaxRequestType, string dataSourceId, int startRecordIndex, int pageSize, string searchString, string lastString, string sortCol, SortOrder dir)
            : this(ajaxRequestType, dataSourceId, startRecordIndex, pageSize)
        {
            SearchString = searchString;
            LastString = lastString;
            SortColumn = sortCol;
            SortDirection = dir;
        }
		public AjaxGetDataHandlerEventArgs(int ajaxRequestType, string dataSourceId, int startRecordIndex, int pageSize, string searchString, string lastString)
			:this(ajaxRequestType, dataSourceId, startRecordIndex, pageSize)
		{
			SearchString = searchString;
			LastString = lastString;
		}

		public AjaxGetDataHandlerEventArgs(int ajaxRequestType, string dataSourceId, int startRecordIndex, int pageSize, IRow parentRow)
			: this(ajaxRequestType, dataSourceId, startRecordIndex, pageSize)
		{
			ParentRow = parentRow;
		}

		public AjaxGetDataHandlerEventArgs(int ajaxRequestType, string dataSourceId, int startRecordIndex, int pageSize)
		{
			AjaxRequestType = ajaxRequestType;
			DataSourceId = dataSourceId;
			StartRecordIndex = startRecordIndex;
			PageSize = pageSize;
		}
	}

	/// <summary>
	/// The order in which the data should be sorted.
	/// </summary>
	public enum SortOrder
	{
		/// <summary>
		/// Ascending sort order.
		/// </summary>
		Asc,
		/// <summary>
		/// Descending sort order.
		/// </summary>
		Desc
	}

	public delegate void SaveDataHandler(HttpRequest request, AjaxSaveDataHandlerEventArgs args);
	public delegate object GetDataHandler(HttpRequest request, AjaxGetDataHandlerEventArgs args);
}
