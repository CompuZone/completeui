using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.Design;
using System.Web;
using System.Web.UI;
using System.Security.Permissions;
using System.Drawing;


namespace Nitobi
{
	/// <summary>
	/// An abstract base class for controls that use rows of data for their displays.
	/// Child classes include the Grid, Combo, Tree and Calendar child classes.
	/// </summary>
	/// <remarks>
	/// This class provides the basic infrastructure and base implementation for managing
	/// a data source that provides rows of data for the control, and the columns that define
	/// what data from the data source is to be used and in the case of the Grid and Combo, also defines
	/// the physical aspects of the column like width and header titles.
	/// 
	/// Not all child classes have to have a column structure to their display in order 
	/// to inherit from this class.  The tree and calendar controls do not display columns
	/// of data, but still inherit from this class for the aspect of data source management.
	/// 
	/// Columns help define which fields from the data source should be sent to the control
	/// and how the data should be formatted or massaged before it is sent.  There are several
	/// constrants on the data formatting going to the javascript of these controls that
	/// the column classes help manage.
	/// </remarks>
	[ParseChildren(true)]
	public abstract class ColumnControlBase : NitobiControlBase, IPostBackEventHandler
	{
		public static string DefaultGetDataUrl = null;
		public static bool DefaultIncludeColumnInUrl = true;

		protected static string s_defaultDataSourceId = "_default";
		protected static int s_defaultPageSize = 20;

		protected ColumnsEntity m_columns = new ColumnsEntity();
		protected string m_dataSourceId = null;
		protected XmlDataHandler m_dataHandler = null;
		protected ColumnClientEvents m_columnClientEvents = new ColumnClientEvents();

		/// <summary>
		/// Provides the data management for the given control instance on the page.  Through this,
		/// you can directly provide the data for the control or specify event handlers for data
		/// requests.
		/// </summary>
		/// <remarks>The Nitobi ASP.NET controls have a wide range of options for how the data for
		/// the various javascript controls is provided.  The main approaches to providing data to
		/// these controls include:
		/// <ol>
		///	<li>Get this property's standard XmlDatahandler to set the various data provider event handlers.</li>
		///	<li>Set this property to a new instance of an XmlDataHandler that has already been setup.
		///	by sharing a common data handler between multiple Nitobi controls, you can share common
		///	data sets</li>
		///	<li>Dont use this property at all and set the GetDataUrl property to a different location
		///	than the page hosting the control.</li>
		/// </ol>
		/// See the Nitobi ASP.NET Developer's Guide for more information about the various approaches
		/// to data management when using Ajax and the Nitobi Controls.
		/// </remarks>
		public virtual XmlDataHandler Data
		{
			get
			{
				if (m_dataHandler == null)
					m_dataHandler = new XmlDataHandler();
				return m_dataHandler;
			}
			set
			{
				m_dataHandler = value;
			}
		}

		public int PageSize { get { return (int)getObj("psize", s_defaultPageSize); } set { setObj("psize", value); } }

		public bool AutoPostBack { get { return (bool)getObj("apstbck", false); } set { setObj("apstbck", value); } }

		public ColumnsEntity Columns { get { return m_columns; } }

		public string GetDataUrl { get { return (string)getObj("geturl", DefaultGetDataUrl); } set { setObj("geturl", value); } }

		public string DataSourceId { get { return m_dataSourceId; } set { m_dataSourceId = value; } }
		public string calculatedDataSourceId() { return DataSourceId == null ? s_defaultDataSourceId : DataSourceId; }

		public bool IncludeColumnsInUrl { get { return (bool)getObj("incCols", DefaultIncludeColumnInUrl); } set { setObj("incCols", value); } }

		[PersistenceModeAttribute(PersistenceMode.InnerProperty)]
		public ColumnClientEvents ColumnEvents { get { return m_columnClientEvents; } }

		protected override void writeClientInnerContents(HtmlTextWriter writer)
		{
			base.writeClientInnerContents(writer);
			if (ClientColumnRootName != null && Columns.Columns.Count > 0)
			{
				writer.Write("<");
				writer.Write(ClientColumnRootName);
				writer.Write(" ");
				writeColumnRootClientAttributes(writer);
				writer.WriteLine(">");
				writeColumnRootInnerContext(writer);
				int index = 0;
				foreach (Column c in Columns.Columns)
					c.getClientColDefHtml(writer, ClientColumnControlName, index++, IsAjaxData, ColumnEvents);

				writer.Write("</");
				writer.Write(ClientColumnRootName);
				writer.WriteLine(">");
			}
		}

		protected abstract bool IsAjaxData { get; }

		protected virtual string ClientColumnRootName { get { return null; } }

		protected virtual string ClientColumnControlName { get { return null; } }

		protected virtual void writeColumnRootClientAttributes(HtmlTextWriter writer)
		{
		}
		protected virtual void writeColumnRootInnerContext(HtmlTextWriter writer)
		{
		}

		/// <summary>
		/// Raised when the user makes a selection.
		/// </summary>
		public event EventHandler Select;

		#region IPostBackEventHandler Members

		public virtual void RaisePostBackEvent(string eventArgument)
		{
			if (eventArgument.Equals("Select") && Select != null)
				Select(this, new EventArgs());
		}

		#endregion
	}
}
