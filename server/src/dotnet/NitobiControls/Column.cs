using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.Design;
using System.Reflection;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Security.Permissions;
using System.Xml;
using System.Xml.Serialization;

namespace Nitobi
{
	/// <summary>
	/// The base class of all column types in the library.  All ColumnControlBase type
	/// controls have a collection of columns that specify the data they will use and
	/// if applicable the actual columns for the control.
	/// </summary>
	/// <remarks>While the Tree and Calendar controls are also ColumnControlBase classes,
	/// they dont actually display their data to the user in columns, they use the column 
	/// definitions for specifying the data they will display.  Columns serve the following
	/// roles for the controls that use them:
	/// <ul>
	/// <li>Define the physical characteristics of a column in controls like the Grid
	/// and Combo.  This includes properties such as HeaderText, Width, and ReadOnly.</li>
	/// <li>Define the mapping between an expected name and the field name from the
	/// data source.  For example, the tree control expects its elements to have a label
	/// field.  If your data has a field called Description and you want to use it 
	/// for the tree's label, the column would specify that mapping.</li>
	/// <li>Controls the actual data value for each row of data when the control is being
	/// bound to its data (either directly or via Ajax).  Each column can masage the value
	/// provided by the data source for all rows.  One example of where this is important is
	/// the DateColumn which will ensure the data is always represented as an ISO 8601 formatted
	/// date string as expected by all the control's javascript.</li>
	/// </ul>
	/// </remarks>
	[AspNetHostingPermission(SecurityAction.Demand, Level = AspNetHostingPermissionLevel.Minimal)]
	[ParseChildren(true)]
	public abstract class Column : BaseEntity
	{
		protected static HorizontalAlign s_defaultHorzAlign = HorizontalAlign.Left;
		protected string m_cssStyle = null;
		protected string m_headerText = null;
		protected string m_width = null;
		protected string m_name = null;
		protected bool m_readOnly = false;
		protected string m_defaultValue = null;
		protected bool m_visible = true;
        protected bool m_sortable = true;
		protected HorizontalAlign m_horzAlign = s_defaultHorzAlign;
		protected ColumnClientEvents m_clientEvents = new ColumnClientEvents();

		[XmlIgnore]
		public string HeaderText { get { return m_headerText; }	set { m_headerText = value; } }

		[XmlIgnore]
		public string Width { get { return m_width; } set { m_width = value; } }

		[XmlIgnore]
		public virtual string Name { get { return m_name; } set { m_name = value; } }

		[XmlIgnore]
		public virtual bool ReadOnly { get { return m_readOnly; } set { m_readOnly = value; } }

		[XmlIgnore]
		public virtual bool Visible { get { return m_visible; } set { m_visible = value; } }

        [XmlIgnore]
        public virtual bool Sortable { get { return m_sortable; } set { m_sortable = value; } }

		[XmlIgnore]
		[PersistenceModeAttribute(PersistenceMode.InnerProperty)]
		public ColumnClientEvents ClientEvents { get { return m_clientEvents; } }

		[XmlIgnore]
		public virtual HorizontalAlign HorizontalAlign { get { return m_horzAlign; } set { m_horzAlign = value; } }

		[XmlIgnore]
		public virtual string CssStyle { get { return m_cssStyle; }	set { m_cssStyle = value; } }

		[XmlIgnore]
		public virtual string DefaultValue { get { return m_defaultValue; } set { m_defaultValue = value; } }

		public bool getContributesToData() { return ContributesToData; }
		protected internal virtual bool ContributesToData { get { return true; } }
		protected internal virtual bool IsClientColumn { get { return true; } }
		public virtual void getClientColDefHtml(HtmlTextWriter writer, string ctlType, int colIndex, bool isLiveData, ColumnClientEvents defaultEvents)
		{
			if (IsClientColumn)
			{
				writer.Write("<");
				writer.Write(getClientColumnName(ctlType));
				writer.Write(" ");
				writeColumnAttributes(writer, ctlType, colIndex, isLiveData, defaultEvents);
				writer.Write(">");
				writeColumnInnerContents(writer, ctlType, isLiveData);
				writer.Write("</");
				writer.Write(getClientColumnName(ctlType));
				writer.WriteLine(">");
			}
		}

		protected abstract string getClientColumnName(string ctlType);
		public virtual object getValueForRow(string ctlType, object rowData) { return null; }
		public virtual object getUpdatedValue(string updatedVal, IRow rowData)
		{
			return updatedVal;
		}
		protected virtual void writeColumnAttributes(HtmlTextWriter writer, string ctlType, int colIndex, bool isLiveData, ColumnClientEvents defaultEvents)
		{
			if (ctlType.CompareTo("grid") == 0)
			{
				Cmn.writeAttr(writer, "label", HeaderText==null?null:HeaderText.Replace("<", "#<#").Replace(">","#>#").Replace("=","#EQ#").Replace("'", "#Q#"));
				Cmn.writeAttr(writer, "initial", DefaultValue);
				Cmn.writeAttr(writer, "editable", ReadOnly ? "false" : "true");
				Cmn.writeAttr(writer, "align", HorizontalAlign, s_defaultHorzAlign);
				Cmn.writeAttr(writer, "cssstyle", CssStyle);
				Cmn.writeAttr(writer, "visible", Visible, true);
                Cmn.writeAttr(writer, "sortenabled", Sortable ? "true" : "false");
				ClientEvents.writeColumnAttributes(writer, defaultEvents);
			}
			else
			{
				Cmn.writeAttr(writer, "DataFieldIndex", colIndex);
				if (!Visible)
				{
					Width = "0";
					Cmn.writeAttr(writer, "TextColor", ";display:none");
				}
				else
				{
					Cmn.writeAttr(writer, "HeaderLabel", HeaderText);// == null ? null : HeaderText.Replace("<", "#<#").Replace(">", "#>#").Replace("=", "#EQ#").Replace("'", "#Q#"));
					if (!Cmn.IsEmpty(CssStyle))
						Cmn.writeAttr(writer, "TextColor", ";" + CssStyle);
				}
			}

			Cmn.writeAttr(writer, "width", Width);
		}
		protected virtual void writeColumnInnerContents(HtmlTextWriter writer, string ctlType, bool isLiveData) { }

	}

	/// <summary>
	/// Specifies that the column is bound to a specific field from the data source providing
	/// the rows of data.  When the column is being used to help generate the Nitobi 
	/// compressed XML for the control, it will use the data with the given DataField name
	/// for the value of each row.
	/// </summary>
	/// <remarks>The BoundColumn can be specified in the columns collection as a generic column
	/// that will simply use the value from the data source as a text string using the standard
	/// .NET object ToString method.  More specific child classes such as the DateColumn may further
	/// manipulate the raw value as provided by the data source.</remarks>
	public class BoundColumn : Column
	{
		static BoundColumn(){BaseEntity.registerChildType(typeof(BoundColumn));}
		protected string m_dataField = null;

		public BoundColumn() { }
		public BoundColumn(string dataField) { DataField = dataField; }

		public string DataField { get { return m_dataField; } set { m_dataField = value; } }

		public override string Name	
		{ get {return base.Name==null?DataField:base.Name;} 
			set {base.Name = value;} }

		public override object getValueForRow(string ctlType, object rowData)
		{
			object val = "";
			if (DataField == null)
				return rowData;
			if (rowData is ICustomTypeDescriptor)
				val = getValueFromTypeDescriptor(DataField, rowData);
			else if (rowData is XmlElement)
			{
				XmlElement el = (XmlElement)rowData;
				if (el.HasAttribute(DataField))
					val = el.GetAttribute(DataField);
				else
				{
					XmlNode c = el.SelectSingleNode(DataField);
					if (c != null)
						val = c.InnerXml;
				}

			}
			else
				val = rowData.GetType().InvokeMember(DataField, BindingFlags.GetProperty | BindingFlags.GetField, null, rowData, null);
			if (ctlType.CompareTo("tree") == 0 && val != null && 
					(DataField.CompareTo("HasChildren") == 0 || DataField.CompareTo("NodeType") == 0 ||
					 DataField.CompareTo("Expanded") == 0))
				val = val.ToString().ToLower();
			return val;
		}

		protected virtual object getValueFromTypeDescriptor(string fldName, object rowData)
		{
			object val = null;
			// Have a Table-like structure.
			ICustomTypeDescriptor rowDescriptor = rowData as ICustomTypeDescriptor;
			if (rowDescriptor != null)
			{
				string df = fldName;
				int dotIndex = df.IndexOf('.');
				if (dotIndex > 0)
					df = df.Substring(0, dotIndex);
				PropertyDescriptor column = rowDescriptor.GetProperties().Find(df, true);
				if (column != null)
					val = column.GetValue(rowDescriptor);
				if (val != null && dotIndex > 0)
					val = getValueFromTypeDescriptor(fldName.Substring(dotIndex + 1), val);
			}
			return val;
		}

		protected override string getClientColumnName(string ctlType)
		{
			if (ctlType.CompareTo("grid") == 0)
				return "ntb:textcolumn";
			return "ntb:ComboColumnDefinition";
		}

		protected override void writeColumnAttributes(HtmlTextWriter writer, string ctlType, int colIndex, bool isLiveData, ColumnClientEvents defaultEvents)
		{
			base.writeColumnAttributes(writer, ctlType, colIndex, isLiveData, defaultEvents);
			if (ctlType.CompareTo("grid") == 0)
				Cmn.writeAttr(writer, "xdatafld", DataField);
		}
	}

	/// <summary>
	/// Specifies the row's key value and its mapping into the data source.  This column is never displayed
	/// in the control, and is used to generate the compressed XML's xk attribute.  
	/// See the XmlDataHandler class documentation for more details about the format of 
	/// the Nitobi compressed XML.
	/// </summary>
	public class KeyColumn : BoundColumn
	{
		static KeyColumn() { BaseEntity.registerChildType(typeof(KeyColumn)); }
		protected internal override bool IsClientColumn {get{return false;}}
		protected internal override bool ContributesToData {get{return false;}}
	}

	/// <summary>
	/// Servers as the abstract base class for columns that can have child columns within them
	/// such as the ComboColumn and CheckboxColumn.
	/// </summary>
	/// <remarks>Used only by the Grid control, ColumnListColumn type classes can have their
	/// own list of columns specified within their inner body, which this class maintains.
	/// 
	/// All child classes of this class need a data source for rows of data that it uses.  Data
	/// can be provided to the column by either using the DataSourceId property (which will 
	/// cause an Ajax Get data request to happen to get the actual data) or the LocalData property
	/// which is a specially formated string containing all of the data for small datasets.
	///</remarks>
	[ParseChildren(true, "Columns")]
	public abstract class ColumnListColumn : BoundColumn, IColumnCollection
	{
		protected string m_dataSourceId = null;
		protected string m_dataSource = null;
		protected string m_displayFields = null;
		protected string m_valueField = null;
		protected string m_getHandler = null;
		protected List<Column> m_columns = new List<Column>();

		[XmlIgnore]
		[PersistenceModeAttribute(PersistenceMode.InnerProperty)]
		public List<Column> Columns { get { return m_columns; } }

		public KeyColumn KeyColumns { get { return null; } }

		/// <summary>
		/// The URL of the data handler to make the Ajax get data request call to obtain the
		/// data needed by the control.  You mus talso specify the DataSourceid for the Ajax
		/// call to function properly.
		/// </summary>
		[XmlIgnore]
		public string GetDataUrl { get { return m_getHandler; } set { m_getHandler = value; } }

		/// <summary>
		/// The id to pass when requesting the data using the Ajax get data request.  You must also
		/// specify the GetDataUrl property for the Ajax call to function properly.
		/// </summary>
		public string DataSourceId { get { return m_dataSourceId; } set { m_dataSourceId = value; } }

		/// <summary>
		/// A specially formatted string in the <a href='http://en.wikipedia.org/wiki/JSON'>JSON format</a> 
		/// that contains all of the data needed by the child columns.
		/// </summary>
		/// <remarks>This is very useful for small data sets to avoid excessing Ajax calls after the grid
		/// control is initialized during a page load.  The following examples show of the format expected
		/// for this property:
		/// <code>[{value:'True',display:''},{value:'False',display:''}]</code>
		/// <code>[{firstName:'John', lastName:'Adams'},{firstName:'Matthew', lastName: 'Smith'}]</code>
		/// </remarks>
		[XmlIgnore]
		public string LocalData { get { return m_dataSource; } set { m_dataSource = value; } }

		/// <summary>
		/// defines which field from the child row data to use for the value of the main row data
		/// being edited.
		/// </summary>
		[XmlIgnore]
		public string ValueField { get { return m_valueField; } set { m_valueField = value; } }

		[XmlIgnore]
		public string ColumnNames
		{
			get
			{
				ColumnsEntity ce = new ColumnsEntity();
				ce.setColumnsCollection(Columns);
				return ce.ColumnNames;
			}
		}

		protected abstract string EditorName { get; }
		protected virtual void writerEditorAttributes(HtmlTextWriter writer, string ctlType) { }

		protected override void writeColumnInnerContents(HtmlTextWriter writer, string ctlType, bool isLiveData)
		{
			base.writeColumnInnerContents(writer, ctlType, isLiveData);
			if (ctlType.CompareTo("grid") != 0)
				return;

			ColumnsEntity ce = new ColumnsEntity();
			ce.setColumnsCollection(Columns);
			writer.Write("<ntb:{0} ", EditorName);
			Cmn.writeAttr(writer, "datasourceid", DataSourceId);
			Cmn.writeAttr(writer, "datasource", LocalData);
			if (isLiveData && GetDataUrl != null)
				Cmn.writeAttr(writer, "gethandler", string.Format(GetDataUrl.Contains("?") ? "{0}&NitCols={1}" : "{0}?NitCols={1}", GetDataUrl, Uri.EscapeDataString(Cmn.ToBase64(ce.Xml))));
			Cmn.writeAttr(writer, "valuefield", ValueField);
			string df = "";
			foreach (Column c in Columns)
				if (c.Visible)
					df += c.Name + "|";
			if (df.Length > 0)
				df = df.Substring(0, df.Length - 1);

			Cmn.writeAttr(writer, "displayfields", df);
			writerEditorAttributes(writer, ctlType);
			writer.Write("></ntb:{0}>", EditorName);

		}
	}

	/// <summary>
	/// Used only by grid control, allows the user to edit the value of the row data by
	/// showing a drop down of possible choices for them to use.
	/// </summary>
	/// <remarks>The editor can be used in two display modes, either a standard browser drop
	/// down list or a search style list that will display after the user has started to type
	/// some characters into the text editor in the row.
	/// 
	/// If this class is specified for any other control than the Grid, the column will simply 
	/// act as a read only BoundColumn.</remarks>
	[ParseChildren(true, "Columns")]
	public class ComboColumn : ColumnListColumn
	{
		public enum ListType { DropDown, Search }
		static ComboColumn() { BaseEntity.registerChildType(typeof(ComboColumn)); }
		protected ListType m_listType = ListType.DropDown;

		[XmlIgnore]
		public ListType DisplayType { get { return m_listType; } set { m_listType = value; } }

		protected override string EditorName
		{
			get { return DisplayType == ListType.DropDown ? "listboxeditor" : "lookupeditor"; }
		}
	}

	/// <summary>
	/// Used only by the Grid control, allows the user to edit the value of the row data by
	/// changing the checked value of a standard checkbox.
	/// </summary>
	/// <remarks>The CheckboxColumn class is a ColumnListColumn child because it can be bound
	/// to a data source that specifies the values to use for the checked and unchecked state.
	/// By default, this class will use the values of "True" and "False", but that can be
	/// changed by specifying the CheckedValue and UncheckedValue properties of this column.
	/// 
	/// You can also display text to the right of the checkbox in the grid by specifying the
	/// DataSourceId or LocalData property of the column.  The data provided 
	/// must contain fields that will map to "value" and "display" and should contain only two
	/// rows of data, one for the display value when the checkbox is check and one for when
	/// it is not checked.
	/// 
	/// For example, if the checkbox column should show "Go" or "No Go" next to the checkbox along
	/// with it being checked, and the value provided during an Ajax Save request for the given value
	/// should be "G" when checked and "N" when not checked, the following should be specified for
	/// the column definition in the grid:
	/// <ul>
	/// <li>CheckValue should be set to "G"</li>
	/// <li>UncheckedValue shoul be set to "N"</li>
	/// <li>The control bound to a data source.  In this example, LocalData being set to:
	/// <code>[{value:'G',display:'Go'},{value:'N',display:'No Go'}]</code></li>
	/// </ul></remarks>
	[ParseChildren(true, "Columns")]
	public class CheckboxColumn : ColumnListColumn
	{
		static CheckboxColumn() { BaseEntity.registerChildType(typeof(CheckboxColumn)); }
		protected string m_checkedValue = null, m_uncheckedValue = null;

		[XmlIgnore]
		public string CheckedValue { get { return m_checkedValue; } set { m_checkedValue = value; } }
		[XmlIgnore]
		public string UncheckedValue { get { return m_uncheckedValue; } set { m_uncheckedValue = value; } }

		protected override string EditorName
		{
			get { return "checkboxeditor"; }
		}
		protected override void writeColumnInnerContents(HtmlTextWriter writer, string ctlType, bool isLiveData)
		{
			if(CheckedValue == null)
				CheckedValue = "True";
			if (UncheckedValue == null)
				UncheckedValue = "False";
			if (ValueField == null)
				ValueField = "value";
			if (LocalData == null)
				LocalData = "[{value:'True',display:''},{value:'False',display:''}]";
			if (Columns.Count == 0)
				Columns.Add(new BoundColumn("display"));

			base.writeColumnInnerContents(writer, ctlType, isLiveData);
		}
		protected override void writerEditorAttributes(HtmlTextWriter writer, string ctlType)
		{
			base.writerEditorAttributes(writer, ctlType);
			Cmn.writeAttr(writer, "checkedvalue", CheckedValue);
			Cmn.writeAttr(writer, "uncheckedvalue", UncheckedValue);
		}
	}

	/// <summary>
	/// Defines a column that can be edited with either a textbox, multi-line text field or a password field.
	/// </summary>
	/// <remarks>This is mostly a refined child of the BoundColumn class which allows you to specify what
	/// type of editor to use.  The BoundColumn is equal to the TextColumn with its TextMode property set to SingleLine.</remarks>
	public class TextColumn : BoundColumn
	{
		static TextColumn() { BaseEntity.registerChildType(typeof(TextColumn)); }
		public enum ColMode { SingleLine, MultiLine, Password }

		protected ColMode m_mode = ColMode.SingleLine;
		protected int m_maxLength = 255;

		[XmlIgnore]
		public ColMode TextMode { get { return m_mode; } set { m_mode = value; } }
		[XmlIgnore]
		public int MaxLength { get { return m_maxLength; } set { m_maxLength = value; } }

		protected override void writeColumnInnerContents(HtmlTextWriter writer, string ctlType, bool isLiveData)
		{
			if (TextMode == ColMode.SingleLine)
				writer.Write("<ntb:texteditor ");
			else if (TextMode == ColMode.MultiLine)
				writer.Write("<ntb:textareaeditor ");
			else if (TextMode == ColMode.Password)
				writer.Write("<ntb:passwordeditor ");

			if (MaxLength > 0)
				Cmn.writeAttr(writer, "MaxLength", MaxLength);

			if (TextMode == ColMode.SingleLine)
				writer.Write("></ntb:texteditor>");
			else if (TextMode == ColMode.MultiLine)
				writer.Write("></ntb:textareaeditor>");
			else if (TextMode == ColMode.Password)
				writer.Write("></ntb:passwordeditor>");
		}

		protected override void writeColumnAttributes(HtmlTextWriter writer, string ctlType, int colIndex, bool isLiveData, ColumnClientEvents defaultEvents)
		{
			base.writeColumnAttributes(writer, ctlType, colIndex, isLiveData, defaultEvents);
			Cmn.writeAttr(writer, "MaxLength", MaxLength);
		}
	}

	/// <summary>
	/// Specifies that the column will be showing an image rather than the actual text data.  Data values
	/// from the rows should be the URL to the image.
	/// </summary>
	/// <remarks>This is a read only column for showing an image rather than text.</remarks>
	public class ImageColumn : BoundColumn
	{
		static ImageColumn() { BaseEntity.registerChildType(typeof(ImageColumn)); }
        protected string m_imageURL = null;
        [XmlIgnore]
        public string ImageURL { get { return m_imageURL; } set { m_imageURL = value; } }

		protected override void writeColumnAttributes(HtmlTextWriter writer, string ctlType, int colIndex, bool isLiveData, ColumnClientEvents defaultEvents)
		{
			base.writeColumnAttributes(writer, ctlType, colIndex, isLiveData, defaultEvents);
			if (ctlType.CompareTo("combo") == 0)
				Cmn.writeAttr(writer, "ColumnType", "IMAGE");
		}

		protected override void writeColumnInnerContents(HtmlTextWriter writer, string ctlType, bool isLiveData)
		{
			base.writeColumnInnerContents(writer, ctlType, isLiveData);
			if(ctlType.CompareTo("grid") == 0)
				writer.Write("<ntb:imageeditor " + (ImageURL!=null?("imageurl=\"" + ImageURL + "\""):"") + "></ntb:imageeditor>");
		}
	}

	/// <summary>
	/// Abstract base class for columns that have a mask attribute, such as the NumberColumn and DateColumn.
	/// </summary>
	public abstract class MaskColumn : BoundColumn
	{
		protected string m_mask = null;
		/// <summary>
		/// Defines the mask to apply to the raw value provided by the row data.  The values
		/// allowed for this property are specific to the control.
		/// </summary>
		/// <remarks>
		/// The DateColumn class expects the mask to follow a subset of the custom date formatting options
		/// used by the .NET DateTime.ToString() method.
		/// 
		/// The NumberColumn class expects the mask to follow the standard:
		/// <ul>
		/// <li># (Denotes a digit. Example: ####)</li>
		/// <li>0 (Denotes leading and following zeros. Example: 0000.00)</li>
		/// <li>. (The position of the decimal point Example: ###.##)</li>
		/// <li>, (The group separator for thousands. Example: ###,###.##)</li> 
		/// <li>% (Displays the number as a percentage. Example: ##%)</li>
		/// </ul>
		/// </remarks>
		public string Mask { get { return m_mask; } set { m_mask = value; } }

		protected override void writeColumnAttributes(HtmlTextWriter writer, string ctlType, int colIndex, bool isLiveData, ColumnClientEvents defaultEvents)
		{
			base.writeColumnAttributes(writer, ctlType, colIndex, isLiveData, defaultEvents);

			if (ctlType.CompareTo("grid") == 0)
				Cmn.writeAttr(writer, "mask", Mask);
		}
	}

	/// <summary>
	/// When used in the Grid control, allows the user to edit the date in the column by either 
	/// typing a properly formatted date in the edit field or by using the drop down calendar button to pick a date.
	/// All other ColumnControlBase child classes can use this column for read only formatted dates.
	/// </summary>
	/// <remarks>The date column not only allows the user to edit the date using a drop down calendar, it also
	/// ensures that the date is formatted in the <a href="http://en.wikipedia.org/wiki/ISO_8601">ISO 8601 standard</a>
	/// when giving the data to the grid. The control's javascript expects the date format in the 
	/// compressed XML to be formatted properly or will 
	/// result in dates being displayed with NaN in the value.  As long as the raw data being provided by 
	/// the data source is either a DateTime instance or a string in a format valid for the DateTime.Parse
	/// method, this column will ensure the date passed in the compressed XML is appropriate for the control's
	/// javascript.
	/// 
	/// Because of issues with a fully formatted time in the date string, this class will always trim off the
	/// time portion of the date for the value passed into the compressed XML.
	/// 
	/// When using this column in controls other than the Grid or Calendar , such as the combo or tree,
	/// this column will use the mask specified to format the date on the server for the value passed
	/// into the compressed XML.  So while the combo control doesnt allow you to edit the columns of data
	/// in its drop down list, you can use the Datecolumn in a combo control and have the date displayed
	/// in the format provided in the mask.
	/// </remarks>
	public class DateColumn : MaskColumn
	{
		static DateColumn() { BaseEntity.registerChildType(typeof(DateColumn)); }

		protected override string getClientColumnName(string ctlType)
		{
			if (ctlType.CompareTo("grid") == 0)
				return "ntb:datecolumn";
			return "ntb:ComboColumnDefinition";
		}

		public override object getValueForRow(string ctlType, object rowData)
		{
			object dateObj = base.getValueForRow(ctlType, rowData);
			if (ctlType.CompareTo("grid") == 0 || ctlType.CompareTo("cal") == 0)
			{
				if (dateObj is DateTime)
				{
					if ((DateTime)dateObj == DateTime.MinValue)
						dateObj = null;
					else
						dateObj = ((DateTime)dateObj).ToString("u").Substring(0,10);
				}
				else if (dateObj is string)
					dateObj = DateTime.Parse((string)dateObj).ToString("u").Substring(0, 10);
			}
			else
			{
				if (dateObj is DateTime)
					dateObj = ((DateTime)dateObj).ToString(Mask);
				else if (dateObj is string)
					dateObj = DateTime.Parse((string)dateObj).ToString(Mask);
			}
			return dateObj;
		}
	}

	/// <summary>
	/// When used in the Grid control, allows the user to edit the number in the column.
	/// All other ColumnControlBase child classes can use this column for read only formatted numbers.
	/// </summary>
	/// <remarks>When this column is used in the Grid, the raw num without any formatting is sent within
	/// the XML back to browser, but for all other controls the masks provided by the Mask and NegativeMask
	/// properties are used on the server to send a formatted number in the XML.</remarks>
	public class NumberColumn : MaskColumn
	{
		static NumberColumn() { BaseEntity.registerChildType(typeof(NumberColumn)); }
		protected string m_negMask = null;
		protected string m_groupingSeperator = null, m_decimalSeparator = null;

		public string NegativeMask { get { return m_negMask; } set { m_negMask = value; } }

		[XmlIgnore]
		public string DecimalSeparator { get { return m_decimalSeparator; } set { m_decimalSeparator = value; } }
		[XmlIgnore]
		public string GroupingSeparator { get { return m_groupingSeperator; } set { m_groupingSeperator = value; } }

		protected override void writeColumnAttributes(HtmlTextWriter writer, string ctlType, int colIndex, bool isLiveData, ColumnClientEvents defaultEvents)
		{
			base.writeColumnAttributes(writer, ctlType, colIndex, isLiveData, defaultEvents);
			if (ctlType.CompareTo("grid") == 0)
			{
				Cmn.writeAttr(writer, "negativemask", NegativeMask);
				Cmn.writeAttr(writer, "DecimalSeparator", DecimalSeparator);
				Cmn.writeAttr(writer, "GroupingSeparator", GroupingSeparator);
			}
		}

		protected override string getClientColumnName(string ctlType)
		{
			if (ctlType.CompareTo("grid") == 0)
				return "ntb:numbercolumn";
			return "ntb:ComboColumnDefinition";
		}

		public override object getValueForRow(string ctlType, object rowData)
		{
			object val = base.getValueForRow(ctlType, rowData);
			if (ctlType.CompareTo("combo") == 0)
			{
				int v = Cmn.IsEmpty(val)?0:Convert.ToInt32(val);
				val = v.ToString(Mask);
			}
			return val;
		}
	}

	/// <summary>
	/// When used in the Grid control, will show an anchor in the column and the raw value
	/// is expected to be a valid URL to the location to navigate to when the user clicks the link.
	/// For all other ColumnControlBase child classes the raw URL would be displayed with no anchor.
	/// </summary>
	public class HyperLinkColumn : BoundColumn
	{
		static HyperLinkColumn() { BaseEntity.registerChildType(typeof(HyperLinkColumn)); }
		protected bool m_openWindow = true;

		/// <summary>
		/// Indicates the navigation will open a new window versus the current window for the 
		/// URL provided.
		/// </summary>
		[XmlIgnore]
		public bool OpenWindow { get { return m_openWindow; } set { m_openWindow = value; } }

		protected override void writeColumnInnerContents(HtmlTextWriter writer, string ctlType, bool isLiveData)
		{
			base.writeColumnInnerContents(writer, ctlType, isLiveData);
			if (ctlType.CompareTo("grid") == 0)
				writer.Write("<ntb:linkeditor openwindow='{0}'></ntb:linkeditor>", OpenWindow);
		}
	}

	/// <summary>
	/// Given an HTML template, will create a value for the XML to the control that can combine
	/// several fields from the data source into a custom formatted value.
	/// </summary>
	/// <remarks>The Grid, Combo, Tree and Calendar will allow HTML to be embedded in the data
	/// they will display if it escaped properly using # characters.  This column type does all
	/// of the work of properly escaping your HTML template so that the value you specify
	/// in the Html property doesnt have worry about it.  You can embed macros in the Html
	/// template formatted as <code>$Data([FieldName])</code> which will be replaced with the 
	/// actual values for the given field name.  For example, an html template formated as:
	/// <code><![CDATA[
	/// <table><tr><td>$Data(FirstName)</td><td>$Data(LastName)</td></tr></table>
	/// ]]></code>
	/// Could result in the following value being sent in the XML to the control:
	/// <code><![CDATA[
	/// <table><tr><td>John</td><td>Smith</td></tr></table>
	/// ]]></code>
	/// Which would be setup with proper encoding with the escape characters so that the 
	/// control will actually use a table rather than showing the html as the data itself.
	/// </remarks>
	public class TemplateColumn : Column
	{
		static TemplateColumn() { BaseEntity.registerChildType(typeof(TemplateColumn)); }

		protected string m_html = null;

		public string Html { get { return m_html; } set { m_html = value; }	}

		protected override string getClientColumnName(string ctlType)
		{
			if (ctlType.CompareTo("grid") == 0)
				return "ntb:textcolumn";
			return "ntb:ComboColumnDefinition";
		}

		public override object getValueForRow(string ctlType, object rowData)
		{
			return "";
		}
	}

	/// <summary>
	/// Used only by the Grid, this column indicates that the grid will have child grids that can be shown
	/// for each row by open the expandor graphic.
	/// </summary>
	/// <remarks>
	/// The Nitobi ASP.NET library only has a single Grid class that represents both the Grid and TreeGrid javascript
	/// controls.  As soon as the Niboi ASP.NET Grid control has an ExpandColumn defined in it, the ASP.NET
	/// control will generate client html for the TreeGrid rather than the Grid.
	/// 
	/// Only one ExpandColumn should be specified at any given column depth.  However, it is possible
	/// to have an ExpandColumn as a child column in an ExpandColumn, thus creating a tree of data. 
	/// 
	/// Regardless of the order the ExpandColumn is defined in, it is always shown as the first column
	/// in the browser.  In this respect, it would best to define the ExpandColumn as the first column 
	/// simply for consistancy.
	/// </remarks>
	[ParseChildren(true, "Columns")]
	public class ExpandColumn : Column
	{
		static ExpandColumn() { BaseEntity.registerChildType(typeof(ExpandColumn)); }
		protected List<Column> m_columns = new List<Column>();
		protected string m_getDataUrl = null, m_saveDataUrl = null;
		protected bool m_showHeader = true;

		[PersistenceModeAttribute(PersistenceMode.InnerProperty)]
		public List<Column> Columns { get { return m_columns; } }

		public string GetDataUrl { get { return m_getDataUrl; } set { m_getDataUrl = value; } }
		public string SaveDataUrl { get { return m_saveDataUrl; } set { m_saveDataUrl = value; } }
		public bool ShowHeader { get { return m_showHeader; } set { m_showHeader = value; } }

		protected override string getClientColumnName(string ctlType)
		{
			if (ctlType.CompareTo("grid") == 0)
				return "ntb:expandcolumn";
			return null;
		}
		protected override void writeColumnAttributes(HtmlTextWriter writer, string ctlType, int colIndex, bool isLiveData, ColumnClientEvents defaultEvents)
		{
			Cmn.writeAttr(writer, "childcolumnset", Name);
			Cmn.writeAttr(writer, "width", Width);
		}
		protected internal override bool ContributesToData { get { return false; } }

		protected internal void writeColumnSet(HtmlTextWriter writer, bool isAjaxData)
		{
			writer.Write("<ntb:columns ");
			Cmn.writeAttr(writer, "id", Name);

			ColumnsEntity ce = new ColumnsEntity();
			ce.setColumnsCollection(Columns);
			Cmn.writeAttr(writer, "headerenabled", ShowHeader.ToString().ToLower(), "true");
			if (isAjaxData && GetDataUrl != null)
				Cmn.writeAttr(writer, "gethandler", string.Format(GetDataUrl.Contains("?") ? "{0}&did={2}&NitCols={1}" : "{0}?did={2}&NitCols={1}", GetDataUrl, Uri.EscapeDataString(Cmn.ToBase64(ce.Xml)), Name));
			Cmn.writeAttr(writer, "gethandler", GetDataUrl);
			if (isAjaxData && SaveDataUrl != null)
				Cmn.writeAttr(writer, "savehandler", string.Format(SaveDataUrl.Contains("?") ? "{0}&did={2}&NitCols={1}" : "{0}?did={2}&NitCols={1}", SaveDataUrl, Uri.EscapeDataString(Cmn.ToBase64(ce.Xml)), Name));
			Cmn.writeAttr(writer, "savehandler", SaveDataUrl);
	
			writer.WriteLine(">");
			int index = 0;
			foreach(Column c in Columns)
				c.getClientColDefHtml(writer, "grid", index++, isAjaxData, null);

			writer.Write("</");
			writer.Write("ntb:columns");
			writer.WriteLine(">");

		}
	}
}
