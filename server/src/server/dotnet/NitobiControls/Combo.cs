using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Drawing;

[assembly: WebResource("Nitobi.scripts.nitobi.combo.js", "application/x-javascript")]
namespace Nitobi
{
	/// <summary>
	/// Represents a control that allows a user to either select a single item from a drop down list
	/// or to search for items within a list by keying in a value and the list apearing with matches 
	/// to choose from.
	/// </summary>
	/// <remarks>This class is the ASP.NET control for the Nitobi javascript combo control and supports
	/// all of the abilities and options exposed by it.  Many times this class and all of the other main
	/// ASP.NET controls in this library will use names that match standard ASP.NET control names when 
	/// available over the name for the property in the Nitobi javascript code.
	/// </remarks>
	[Themeable(true)]
	[ParseChildren(true)]
    [Description("Nitobi Combo")]
    [ToolboxData("<{0}:CustomControl runat=server></{0}:CustomControl>")]
    [ToolboxBitmap(typeof(Combo), "combo_16.png")]
	public class Combo : ColumnControlBase
	{
		protected static ComboMode s_defaultComboMode = ComboMode.Unbound;
		protected static ComboThemeName s_defaultTheme = ComboThemeName.None;

		protected ComboTextBox m_textBox = new ComboTextBox();
		protected ComboList m_list = new ComboList();
		protected string m_initialSearchValue = null, m_initialValue = null;
		protected ComboClientEvents m_clientEvents = new ComboClientEvents();

		protected List<string> m_selectedRowValues = null;
		protected List<MenuItem> m_menuItems = new List<MenuItem>();

		public List<string> SelectedValues 
		{ 
			get 
			{
				if (m_selectedRowValues == null)
					m_selectedRowValues = new List<string>();
				return m_selectedRowValues; 
			} 
		}

		[PersistenceModeAttribute(PersistenceMode.InnerProperty)]
		public ComboTextBox TextBox { get { return m_textBox; } }

		[PersistenceModeAttribute(PersistenceMode.InnerProperty)]
		public ComboList List { get { return m_list; } }

		[PersistenceModeAttribute(PersistenceMode.InnerProperty)]
		public ComboClientEvents ClientEvents { get { return m_clientEvents; } }

		[PersistenceModeAttribute(PersistenceMode.InnerProperty)]
		public List<MenuItem> MenuItems { get { return m_menuItems; } }

		public ComboMode Mode { get { return (ComboMode)getObj("mode", s_defaultComboMode); } set { setObj("mode", value); } }

		public string DataTextField { get { return (string)getObj("dataTxtFld", null); } set { setObj("dataTxtFld", value); } }
		public string DataValueField { get { return (string)getObj("dataValFld", null); } set { setObj("dataValFld", value); } }

		[Category("Appearance")]
		public ComboThemeName Theme { get { return (ComboThemeName)getObj("theme", s_defaultTheme); } set { setObj("theme", value); } }

		/// <summary>
		/// Advanced option indicating that the data for the combo is to come from a seperate XML dataisland on the page with the given
		/// Id rather than to use the gethandler or having the unbound items embedded in the control itself.
		/// </summary>
		/// <remarks>
		/// This option is useful in situations where there are multiple combo controls on the page that have the same column 
		/// structure and use the same datasource.  This allows all of those combo controls to share one definition of the data
		/// that is stored in an XML data island structure on the page.  When the XmlDataIslandId value is set to a non null
		/// value, the combo will expect the dataisland to be there.
		/// <b>When using this option you MUST place the dataisland on the page seperately.</b>  One way to do this is with the 
		/// Nitobi.XmlDataIsland control, while will ensure that the data island is created properly based on the columns 
		/// defined in the combo.
		/// </remarks>
		public string XmlDataIslandId { get { return (string)getObj("dataisland", null); } set { setObj("dataisland", value); } }

		protected override string RootClientControlName	{ get { return "ntb:Combo"; } }

		protected override string ClientColumnRootName { get { return "ntb:ComboList"; } }

		protected override string ClientColumnControlName { get { return "combo"; } }

		protected override void writeColumnRootClientAttributes(System.Web.UI.HtmlTextWriter writer)
		{
			base.writeColumnRootClientAttributes(writer);
			if (Mode == ComboMode.Unbound)
				List.AllowPaging = false;
			List.writeColumnAttributes(writer);
			if (Mode != ComboMode.Unbound)
			{
				Cmn.writeAttr(writer, "PageSize", PageSize, s_defaultPageSize);
				string did = DataSourceId==null?s_defaultDataSourceId:DataSourceId;
				if(IncludeColumnsInUrl)
					Cmn.writeAttr(writer, "DatasourceUrl", Page.Response.ApplyAppPathModifier(string.Format(GetDataUrl.Contains("?") ? "{0}&did={2}&NitCols={1}" : "{0}?did={2}&NitCols={1}", GetDataUrl, Uri.EscapeDataString(Cmn.ToBase64(Columns.Xml)), did)));
				else
					Cmn.writeAttr(writer, "DatasourceUrl", Page.Response.ApplyAppPathModifier(string.Format(GetDataUrl.Contains("?") ? "{0}&did={1}" : "{0}?did={1}", GetDataUrl, did)));
			}
		}

		protected override void writeColumnRootInnerContext(HtmlTextWriter writer)
		{
			foreach (MenuItem menuItem in MenuItems)
				menuItem.getClientDefHtml(writer);
			base.writeColumnRootInnerContext(writer);
		}

		protected override bool IsAjaxData
		{
			get { return !(Mode == ComboMode.Unbound); }
		}

		protected override void writeRootClientAttributes(HtmlTextWriter writer)
		{
			base.writeRootClientAttributes(writer);
			Cmn.writeAttr(writer, "Mode", Mode);
			Cmn.writeAttr(writer, "Theme", Theme.ToString().ToLower(), s_defaultTheme.ToString().ToLower());
			//Cmn.writeAttr(writer, "InitialSearch", m_initialSearchValue);
			string onloadscript = null;
			if (m_selectedRowValues != null)
			{
				string initVal = m_initialValue;
				if (initVal == null && DataTextField != null)
					try
					{
						initVal = m_selectedRowValues[calculateColIndex(DataTextField)];
					}
					catch (Exception e)
					{
						throw new NitobiException(string.Format("The DataTextField value of '{0}' does not match up to a column name.  Make sure DataTextField is set to the name of a column", DataTextField));
					}
				onloadscript = string.Format(
"var combo = nitobi.getComponent('{0}');combo.SetTextValue('{1}');",
					ClientID, initVal);
				for(int p = 0; p < m_selectedRowValues.Count; ++p)
					onloadscript = string.Format("{0}window.document.getElementById('{1}SelectedValue{2}').value='{3}';",
						onloadscript, ClientID, p, m_selectedRowValues[p].Replace("'", "\\'"));
			}
			string postbackscript = null;
			if (AutoPostBack)
				postbackscript = Page.ClientScript.GetPostBackEventReference(this, "Select");
			m_clientEvents.writeColumnAttributes(writer, onloadscript, postbackscript);
		}

		protected int calculateColIndex(string colName)
		{
			int txtfieldIndex = -1;
			if (DataTextField != null)
				for (int p = 0; p < Columns.Columns.Count; p++)
					if (string.Compare(Columns.Columns[p].Name, colName, true) == 0)
					{
						txtfieldIndex = p;
						break;
					}
			return txtfieldIndex;
		}

		protected override void writeClientInnerContents(HtmlTextWriter writer)
		{
			int txtfieldIndex = calculateColIndex(DataTextField);
			TextBox.getClientDefHtml(writer, txtfieldIndex);
			base.writeClientInnerContents(writer);
			if (Mode == ComboMode.Unbound && m_dataHandler != null && XmlDataIslandId == null)
				m_dataHandler.generateFullCompressedXml(System.Web.HttpContext.Current.Request, writer, Columns,
					new AjaxGetDataHandlerEventArgs(AjaxRequestTypes.ComboGetDataRequest, 
								DataSourceId==null?s_defaultDataSourceId:DataSourceId, 0, -1, null, SortOrder.Asc));

			else if (XmlDataIslandId != null)
				writer.Write("<ntb:XmlDataSource XmlId='{0}'></ntbXmlDataSource>", XmlDataIslandId);
		}

		protected override void OnLoad(EventArgs e)
		{
			base.OnLoad(e);
			if (Page.IsPostBack)
			{
				m_initialValue = Page.Request["EBAComboBoxText" + ClientID];
				string selectedRowIndex = Page.Request[ClientID + "SelectedRowIndex"];
				string valueIndex = Page.Request[ClientID + "DataValueFieldIndex"];
				if (!Cmn.IsEmpty(selectedRowIndex))
				{
					m_selectedRowValues = new List<string>();
					for (int p = 0; p < Columns.Columns.Count; p++)
					{
						string val = Page.Request[ClientID + "SelectedValue" + p];
						m_selectedRowValues.Add(val==null?"":val);
					}
				}
			}
		}

		public static void SetupScriptsAndStyleSheets(Page Page, ComboThemeName Theme, string styleDirectory)
		{
			string scriptUrl = Page.ClientScript.GetWebResourceUrl(typeof(Combo), "Nitobi.scripts.nitobi.combo.js");
			Page.ClientScript.RegisterClientScriptInclude("Nitobi.ComboScript", scriptUrl);
			Page.ClientScript.RegisterStartupScript(typeof(Combo), "Nitobi.ComboStartup",
				@"try { if(window.attachEvent){	window.attachEvent( ""onload"", InitializeEbaCombos );}else{window.addEventListener(""load"",InitializeEbaCombos,false);}} catch(e) {alert(""Nitobi: WebCombo Javascript file not found""); }", true);

			if (Page.Header != null && Theme != ComboThemeName.None)
			{
				//string scriptUrl = Page.ClientScript.GetWebResourceUrl(typeof(DropDownCalendar), string.Format(s_baseCssInfo, m_styleClassName));
				string appPath = Page.Request.ApplicationPath;
				string linkUrl = string.Format("{0}{1}{3}/combo/{2}/nitobi.combo.css", appPath, appPath.Length == 1 ? "" : "/", Theme.ToString().ToLower(), styleDirectory);
				string cssLink = string.Format("<link type='text/css' rel='stlesheet' href='/{0}/combo/nitobi.reset.css' />",styleDirectory) + "<link href='" + linkUrl + "' rel='stylesheet' type='text/css' ></link>";
                setupPageCssLinks(Page, linkUrl, cssLink);
			}

		}

		protected override void OnPreRender(EventArgs e)
		{
			base.OnPreRender(e);
			SetupScriptsAndStyleSheets(Page, Theme, this.StyleDirectory);
		}
	}

	public enum ComboMode
	{
		Classic,
		Compact,
		Filter,
		SmartList,
		SmartSearch,
		Unbound
	}
}
