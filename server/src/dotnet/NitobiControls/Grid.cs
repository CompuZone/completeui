using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.Design;
using System.IO;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Security.Permissions;
using System.Drawing;

[assembly: WebResource("Nitobi.scripts.nitobi.grid.js", "application/x-javascript")]
[assembly: WebResource("Nitobi.scripts.nitobi.treegrid.js", "application/x-javascript")]
[assembly: WebResource("Nitobi.scripts.nitobi.extendedGrid.js", "application/x-javascript")]

namespace Nitobi
{


	[Themeable(true)]
    [Description("Nitobi Grid")]
    [ToolboxData("<{0}:CustomControl runat=server></{0}:CustomControl>")]
    [ToolboxBitmap(typeof(Grid), "grid_16.png")]


	public class Grid : ColumnControlBase
	{
		public static string DefaultSaveDataUrl = null;

		protected static bool s_defaultShowHeader = true;
		protected static bool s_defaultShowToolbar = true;
		protected static int s_defaultFrozenLeftColumns = 0;
		protected static bool s_defaultAutoSaveEnabled = false;
		protected static GridMode s_defaultGridMode = GridMode.Standard;
		protected static RowSelect s_defaultRowSelect = RowSelect.None;
		protected static GridResizeOption s_defaultResizable = GridResizeOption.Fixed;
		protected static LiveScrollingModeType s_defaultLiveScrollingMode = LiveScrollingModeType.NotSpecified;
		protected static int s_defaultRowHeight = -1;
		protected static Unit s_defaultMinWidth = new Unit(0), s_defaultMinHeight = new Unit(0);
		protected static bool s_defaultShowCellTooltips = false;
		protected static GridEnterOption s_defaultEnterOption = GridEnterOption.Down;
		protected static bool s_allowDeleteRow = true, s_allowAddRow = true;
		protected static bool s_defaultAllowColumnSort = true;
		protected static GridThemeName s_defaultTheme = GridThemeName.None;
		protected static GridShowHideEffect s_defaultShowHideEffect = GridShowHideEffect.None;
		protected static int s_defaultGroupOffset = -1;

		protected HiddenField m_scrollInfoField = new HiddenField();
		protected HiddenField m_selectedRowInfoField = new HiddenField();
		protected HiddenField m_lastGridSizeField = new HiddenField();
		protected HiddenField m_toolbarInfoField = new HiddenField();

		protected GridClientEvents m_clientEvents = new GridClientEvents();
		protected List<GridToolbar> m_toolbar = new List<GridToolbar>();

		[PersistenceModeAttribute(PersistenceMode.InnerProperty)]
		public GridClientEvents ClientEvents { get { return m_clientEvents; } }

		[PersistenceModeAttribute(PersistenceMode.InnerProperty)]
		public List<GridToolbar> Toolbars { get { return m_toolbar; } }

		public Unit Width { get { return (Unit)getObj("w", s_defaultMinWidth); } set { setObj("w", value); } }
		public Unit Height { get { return (Unit)getObj("h", s_defaultMinHeight); } set { setObj("h", value); } }

		public Unit MinWidth { get { return (Unit)getObj("minW", s_defaultMinWidth); } set { setObj("minW", value); } }
		public Unit MinHeight { get { return (Unit)getObj("minH", s_defaultMinHeight); } set { setObj("minH", value); } }

		public int GroupOffset { get { return (int)getObj("gOff", s_defaultFrozenLeftColumns); } set { setObj("gOff", value); } }

		[Category("Appearance")]
		public GridThemeName Theme { get { return (GridThemeName)getObj("theme", s_defaultTheme); } set { setObj("theme", value); } }

		[Category("Appearance")]
		public GridShowHideEffect Effect { get { return (GridShowHideEffect)getObj("shEffect", s_defaultTheme); } set { setObj("shEffect", value); } }

		public string SaveDataUrl { get { return (string)getObj("saveurl", DefaultSaveDataUrl); } set { setObj("saveurl", value); } }

		public GridMode Mode { get { return (GridMode)getObj("mode", s_defaultGridMode); } set { setObj("mode",value); } }

		public bool ShowHeader { get { return (bool)getObj("shdr", s_defaultShowHeader); } set { setObj("shdr", value); } }

		public bool ShowToolbar { get { return (bool)getObj("stbar", s_defaultShowToolbar); } set { setObj("stbar",value); } }

		public bool ShowCellToolTips { get { return (bool)getObj("celltip", s_defaultShowCellTooltips); } set { setObj("celltip", value); } }

		public int FrozenLeftColumns { get { return (int)getObj("frzn", s_defaultFrozenLeftColumns); } set { setObj("frzn", value); } }

		public GridResizeOption Resizable { get { return (GridResizeOption)getObj("resize", s_defaultResizable); } set { setObj("resize", value); } }

		public bool AllowSorting { get { return (bool)getObj("allowsort", s_defaultAllowColumnSort); } set { setObj("allowsort", value); } }

		public bool AllowAddRow { get { return (bool)getObj("allowadd", s_defaultShowCellTooltips); } set { setObj("allowadd", value); } }

		public bool AllowDeleteRow { get { return (bool)getObj("allowdel", s_defaultShowCellTooltips); } set { setObj("allowdel", value); } }

		public string ClientKeyGenerator { get { return (string)getObj("keygen", null); } set { setObj("keygen", value); } }

		public bool EnableAutoSave { get { return (bool)getObj("autosave", s_defaultAutoSaveEnabled); } set { setObj("autosave", value); } }

		public RowSelect SelectionMode { get { return (RowSelect)getObj("selectMode", s_defaultRowSelect); } set { setObj("selectMode", value); } }

		public LiveScrollingModeType LiveScollingMode { get { return (LiveScrollingModeType)getObj("lsmode", s_defaultLiveScrollingMode); } set { setObj("lsmode", value); } }

		public int RowHeight { get { return (int)getObj("rheight", s_defaultRowHeight); } set { setObj("rheight", value); } }

		public int HeaderHeight { get { return (int)getObj("hheight", s_defaultRowHeight); } set { setObj("hheight", value); } }

		public GridEnterOption EnterKeyAction { get { return (GridEnterOption)getObj("entrOp", s_defaultEnterOption); } set { setObj("entrOp", value); } }

		protected override string RootClientControlName { get { return IsTreeGrid?"ntb:treegrid":"ntb:grid"; } }

		protected override string ClientColumnControlName { get { return "grid"; } }

		protected override string ClientColumnRootName { get { return "ntb:columns"; } }

		/// <summary>
		/// Maintains a list of id values that uniquely represent a given row in the grid.
		/// If the Grid contains a KeyColumn, these values should match up to values from
		/// that column for each rom.  If the grid does not contain a key column, these
		/// values represent the row number.
		/// </summary>
		/// <remarks>Setting these values on the server side will cause the grid to render 
		/// the selected rows while the grid is being initialized in the browser.  If the
		/// user changes the selected rows in the grid, these values will be updated to reflect
		/// their selection.
		/// 
		/// If the grid SelectMode is non, these value is ignored.</remarks>
		public string[] SelectedRowIds
		{
			get
			{
				string rawValue = m_selectedRowInfoField.Value;
				string[] rowIds = rawValue.Split('|');
				return rowIds;
			}
			set
			{
				m_selectedRowInfoField.Value = string.Join("|", value);
			}
		}


		protected override void writeRootClientAttributes(HtmlTextWriter writer)
		{
			base.writeRootClientAttributes(writer);
			if(!IsAjaxData)
				Cmn.writeAttr(writer, "datasourceid", "data");

			Cmn.writeAttr(writer, "mode", Mode.ToString().ToLower());
			if (MinWidth.Value > Width.Value)
				Width = MinWidth;
			if (MinHeight.Value > Height.Value)
				Height = MinHeight;
			if (!Cmn.IsEmpty(m_lastGridSizeField.Value))
			{
				string[] sizes = m_lastGridSizeField.Value.Split(',');
				if (sizes.Length == 2)
				{
					int w, h;
					if (int.TryParse(sizes[0], out w) && int.TryParse(sizes[1], out h))
					{
						Width = new Unit(w);
						Height = new Unit(h);
					}
				}
			}
			Cmn.writeAttr(writer, "width", Width.Value);
			Cmn.writeAttr(writer, "height", Height.Value);
			Cmn.writeAttr(writer, "minwidth", MinWidth.Value, s_defaultMinWidth.Value);
			Cmn.writeAttr(writer, "minheight", MinHeight.Value, s_defaultMinHeight.Value);
			Cmn.writeAttr(writer, "theme", Theme.ToString().ToLower(), s_defaultTheme.ToString().ToLower());
			//For now it appears the show/hide of child column groups is limited to true/false, even though
			//the tree lets other effects be shown.  Could be because the two defined effects (shade/blind)
			//appear to operate exactly the same way.
			if (Effect != GridShowHideEffect.None)
				Cmn.writeAttr(writer, "effectsenabled", "true");

			if (IsTreeGrid)
			{
				Cmn.writeAttr(writer, "rootcolumns", "_root");
				Cmn.writeAttr(writer, "groupoffset", GroupOffset, s_defaultGroupOffset);
			}


		
			if (Resizable == GridResizeOption.HeightOnly)
				Cmn.writeAttr(writer, "widthfixed", "true");
			if (Resizable == GridResizeOption.WidthOnly)
				Cmn.writeAttr(writer, "heightfixed", "false");
			if (Resizable != GridResizeOption.Fixed)
				Cmn.writeAttr(writer, "gridresizeenabled", "true");

			Cmn.writeAttr(writer, "columnindicatorsenabled", ShowHeader, s_defaultShowHeader);
			Cmn.writeAttr(writer, "toolbarenabled", ShowToolbar, s_defaultShowToolbar);
			Cmn.writeAttr(writer, "tooltipsenabled", ShowCellToolTips, s_defaultShowCellTooltips);
			Cmn.writeAttr(writer, "frozenleftcolumncount", FrozenLeftColumns, s_defaultFrozenLeftColumns);
			Cmn.writeAttr(writer, "rowdeleteenabled", AllowDeleteRow, s_allowDeleteRow);
			Cmn.writeAttr(writer, "rowinsertenabled", AllowAddRow, s_allowAddRow);
			Cmn.writeAttr(writer, "livescrollingmode", LiveScollingMode.ToString().ToLower(), null);
			Cmn.writeAttr(writer, "rowheight", RowHeight, s_defaultRowHeight);
			Cmn.writeAttr(writer, "headerheight", HeaderHeight, s_defaultRowHeight);
			Cmn.writeAttr(writer, "sortenabled", AllowSorting, s_defaultAllowColumnSort);
			Cmn.writeAttr(writer, "entertab", EnterKeyAction, s_defaultEnterOption);
			Cmn.writeAttr(writer, "autosaveenabled", EnableAutoSave, s_defaultAutoSaveEnabled);
			//if(AllowAddRow && ClientKeyGenerator == null)
			 //   Cmn.writeAttr(writer, "autokeyenabled", "true");
			Cmn.writeAttr(writer, "keygenerator", ClientKeyGenerator);


			//If the grid is in localstandard or nonpaging mode, specifying rowsperpage will cause the grid to fail.
			if(Mode != GridMode.LocalStandard && Mode != GridMode.NonPaging)
				Cmn.writeAttr(writer, "rowsperpage", PageSize, s_defaultPageSize);

			if (SelectionMode != RowSelect.None)
			{
				Cmn.writeAttr(writer, "rowselectenabled", "true");
				if (SelectionMode == RowSelect.Multi)
					Cmn.writeAttr(writer, "multirowselectenabled", "true");
			}

			m_clientEvents.writeColumnAttributes(writer);

			//If the grid is in local mode, the savehandler and gethandler should not be passed or it can cause
			//problems with the grid in the browser.
			if (IsAjaxData)
			{
				if (!Cmn.IsEmpty(SaveDataUrl))
					if(IncludeColumnsInUrl)
						Cmn.writeAttr(writer, "savehandler", Page.Response.ApplyAppPathModifier(string.Format(SaveDataUrl.Contains("?") ? "{0}&did={2}&NitCols={1}" : "{0}?did={2}&NitCols={1}", SaveDataUrl, Uri.EscapeDataString(Cmn.ToBase64(Columns.Xml)), DataSourceId)));
					else
						Cmn.writeAttr(writer, "savehandler", Page.Response.ApplyAppPathModifier(string.Format(SaveDataUrl.Contains("?") ? "{0}&did={1}" : "{0}?did={1}", SaveDataUrl, DataSourceId)));

				if (!Cmn.IsEmpty(GetDataUrl))
					if (IncludeColumnsInUrl)
						Cmn.writeAttr(writer, "gethandler", Page.Response.ApplyAppPathModifier(string.Format(GetDataUrl.Contains("?") ? "{0}&did={2}&NitCols={1}" : "{0}?did={2}&NitCols={1}", GetDataUrl, Uri.EscapeDataString(Cmn.ToBase64(Columns.Xml)), DataSourceId)));
					else
						Cmn.writeAttr(writer, "gethandler", Page.Response.ApplyAppPathModifier(string.Format(GetDataUrl.Contains("?") ? "{0}&did={1}" : "{0}?did={1}", GetDataUrl, DataSourceId)));
			}
		}
		protected override void writeColumnRootClientAttributes(System.Web.UI.HtmlTextWriter writer)
		{
			base.writeColumnRootClientAttributes(writer);
			if (IsTreeGrid)
				Cmn.writeAttr(writer, "id", "_root");
		}

		protected override void writeClientInnerContents(HtmlTextWriter writer)
		{
			if (m_dataHandler != null &&
				(Mode == GridMode.LocalLiveScrolling || Mode == GridMode.LocalNonPaging || Mode == GridMode.LocalStandard))
				m_dataHandler.generateFullCompressedXml(System.Web.HttpContext.Current.Request, writer, Columns, 
					new AjaxGetDataHandlerEventArgs(AjaxRequestTypes.GridGetDataRequest, IsAjaxData?"_default":"data", 0, -1, null, SortOrder.Asc));
			base.writeClientInnerContents(writer);
			foreach (Column c in Columns.Columns)
				if (c is ExpandColumn)
					((ExpandColumn)c).writeColumnSet(writer, IsAjaxData);
		}
		protected override bool IsAjaxData
		{
			get { return !(Mode == GridMode.LocalLiveScrolling || Mode == GridMode.LocalNonPaging || Mode == GridMode.LocalStandard); }
		}

		protected override void OnLoad(EventArgs e)
		{
			m_selectedRowInfoField.ID = ID + ClientIDSeparator + "SelRowInfo";
			m_scrollInfoField.ID = ID + ClientIDSeparator + "ScrollInfo";
			m_lastGridSizeField.ID = ID + ClientIDSeparator + "SizeInfo";
			m_toolbarInfoField.ID = ID + ClientIDSeparator + "ToolbarInfo";
			Controls.Add(m_scrollInfoField);
			Controls.Add(m_selectedRowInfoField);
			Controls.Add(m_lastGridSizeField);
			Controls.Add(m_toolbarInfoField);
			if(Toolbars.Count != 0)
			{
				StringWriter sw = new StringWriter();
				HtmlTextWriter w = new HtmlTextWriter(sw);
				Toolbars[0].getClientDefHtml(w);
				w.Write("#|#");
				if (Toolbars.Count > 1)
					Toolbars[1].getClientDefHtml(w);
				m_toolbarInfoField.Value = sw.ToString();
				w.Dispose();
				sw.Dispose();
			}

		}
		protected override void OnPreRender(EventArgs e)
		{
			base.OnPreRender(e);

			if (IsTreeGrid)
			{
				string scriptUrl = Page.ClientScript.GetWebResourceUrl(typeof(Grid), "Nitobi.scripts.nitobi.treegrid.js");
				Page.ClientScript.RegisterClientScriptInclude("Nitobi.TreeGridScript", scriptUrl);
				Page.ClientScript.RegisterStartupScript(typeof(Grid), "Nitobi.GridStartup", string.Format(
	@"try {{ if(window.attachEvent){{window.attachEvent( 'onload', InitNetGrids );}}else{{window.addEventListener('load', InitNetGrids,false);}} }}
catch(e) {{ alert('EBA:Grid Javascript file not found or another unknown error occured. The error was: '+e.message); }}", ClientID),
					true);

				if (Page.Header != null && Theme != GridThemeName.None)
				{
					//string scriptUrl = Page.ClientScript.GetWebResourceUrl(typeof(DropDownCalendar), string.Format(s_baseCssInfo, m_styleClassName));
					string appPath = Page.Request.ApplicationPath;
					string linkUrl = string.Format("{0}{1}{3}/treegrid/{2}/nitobi.grid.css", appPath, appPath.Length == 1 ? "" : "/", Theme.ToString().ToLower(),this.StyleDirectory);
					string baseUrl = string.Format("{0}{1}{2}/", appPath, appPath.Length == 1 ? "" : "/", this.StyleDirectory);
					string csslink = string.Format("<link href='{0}treegrid/nitobi.reset.css' type='text/css' ></link><link href='{1}' rel='stylesheet' type='text/css' ></link>",
						baseUrl, linkUrl);
                    setupPageCssLinks(Page, linkUrl, csslink);
				}
			}
			else
			{
				string scriptUrl = Page.ClientScript.GetWebResourceUrl(typeof(Grid), "Nitobi.scripts.nitobi.grid.js");
				Page.ClientScript.RegisterClientScriptInclude("Nitobi.GridScript", scriptUrl);
				Page.ClientScript.RegisterStartupScript(typeof(Grid), "Nitobi.GridStartup",
	@"try { if(window.attachEvent){window.attachEvent( 'onload', InitNetGrids );}else{window.addEventListener('load',InitNetGrids,false);} }
catch(e) { alert('EBA:Grid Javascript file not found or another unknown error occured. The error was: '+e.message); }",
					true);

				if (Page.Header != null && Theme != GridThemeName.None)
				{
					//string scriptUrl = Page.ClientScript.GetWebResourceUrl(typeof(DropDownCalendar), string.Format(s_baseCssInfo, m_styleClassName));
					string appPath = Page.Request.ApplicationPath;
					string linkUrl = string.Format("{0}{1}{2}/calendar/flex/calendar.css", appPath, appPath.Length == 1 ? "" : "/", this.StyleDirectory);
					string link2Url = string.Format("{0}{1}{3}/grid/{2}/nitobi.grid.css", appPath, appPath.Length == 1 ? "" : "/", Theme.ToString().ToLower(), this.StyleDirectory);
                    string link3Url = string.Format("{0}{1}{2}/grid/nitobi.reset.css", appPath, appPath.Length == 1 ? "" : "/", this.StyleDirectory);
                    string link4Url = string.Format("{0}{1}{3}/grid/{2}/toolbar/default/toolbar.css", appPath, appPath.Length == 1 ? "" : "/", Theme.ToString().ToLower(), this.StyleDirectory);
                    string csslink = string.Format("<link href='{0}' rel='stylesheet' type='text/css' ></link><link href='{1}' rel='stylesheet' type='text/css' ></link><link href='{2}' rel='stylesheet' type='text/css' ></link><link href='{3}' rel='stylesheet' type='text/css' ></link>", link4Url, link3Url, link2Url, linkUrl);
                    setupPageCssLinks(Page,linkUrl, csslink);
				}
			}

			string scriptUrl2 = Page.ClientScript.GetWebResourceUrl(typeof(Grid), "Nitobi.scripts.nitobi.extendedGrid.js");
			Page.ClientScript.RegisterClientScriptInclude("Nitobi.ExtendedGridScript", scriptUrl2);
		}

		protected bool IsTreeGrid
		{
			get
			{
				foreach (Column c in Columns.Columns)
					if (c is ExpandColumn)
						return true;
				return false;
			}
		}
	}

	public enum GridMode
	{
		Standard,
		LocalStandard,
		LiveScrolling,
		LocalLiveScrolling,
		NonPaging,
		LocalNonPaging,
		PagedLiveScrolling
	}

	public enum GridResizeOption
	{
		Fixed,
		WidthOnly,
		HeightOnly,
		Both
	}

	public enum RowSelect
	{
		None=0,
		Single,
		Multi
	}

	/// <summary>
	/// If the paging mode is LiveScrolling, this describes how it performs that operation.
	/// </summary>
	public enum LiveScrollingModeType
	{
		NotSpecified,
		/// <summary>
		/// The grid pings the server in a binary search pattern looking for the 
		/// last row.
		/// </summary>
		Peek,
		/// <summary>
		/// The grid doubles its assumption of the last row every time the user 
		/// scrolls to the end of the visible rows.
		/// </summary>
		/// <remarks>Once the end of the dataset is passed, it starts a binary search backwards.</remarks>
		Leap
	}

	public enum GridEnterOption
	{
		Up,
		Down,
		Left,
		Right
	}

	public enum GridShowHideEffect
	{
		None,
		Shade
	}
}
