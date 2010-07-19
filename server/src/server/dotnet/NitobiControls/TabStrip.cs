using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;
using System.Security.Permissions;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Drawing;

[assembly: WebResource("Nitobi.scripts.nitobi.tabstrip.js", "application/x-javascript")]
namespace Nitobi
{
	[Themeable(true)]
	[ParseChildren(true, "TabItems")]
    [Description("Nitobi Tabstrip")]
    [ToolboxData("<{0}:CustomControl runat=server></{0}:CustomControl>")]
    [ToolboxBitmap(typeof(TabStrip), "tabstrip_16.png")]
	public class TabStrip : NitobiControlBase
	{
		public static Unit DefaultMinWidth = new Unit(0), DefaultMinHeight = new Unit(0);
		public static TabStripThemeName DefaultTheme = TabStripThemeName.None;
		public static TabAlignment DefaultTabAlignment = TabAlignment.Left;
		public static Unit DefaultTabOverlap = new Unit(0);
		public static bool DefaultDelayLoad = false;
		public static bool DefaultPreCacheImages = true;

		protected List<TabItem> m_tabItems = new List<TabItem>();
		protected TabAutoSize m_autoSize = null;
		protected override string RootClientControlName { get { return "ntb:tabstrip"; } }


		[PersistenceModeAttribute(PersistenceMode.InnerProperty)]
		public List<TabItem> TabItems { get { return m_tabItems; } }

		[PersistenceModeAttribute(PersistenceMode.InnerProperty)]
		public TabAutoSize AutoSize { get { if (m_autoSize == null)m_autoSize = new TabAutoSize(); return m_autoSize; } set { m_autoSize = value; } }

		[Category("Appearance")]
		public TabStripThemeName Theme { get { return (TabStripThemeName)getObj("theme", DefaultTheme); } set { setObj("theme", value); } }

		[Category("Appearance")]
		public Unit Width { get { return (Unit)getObj("w", DefaultMinWidth); } set { setObj("w", value); } }

		[Category("Appearance")]
		public Unit Height { get { return (Unit)getObj("h", DefaultMinHeight); } set { setObj("h", value); } }

		[Category("Appearance")]
		public TabAlignment TabAlignment { get { return (TabAlignment)getObj("ta", DefaultTabAlignment); } set { setObj("ta", value); } }

		[Category("Appearance")]
		public Unit TabOverlap { get { return (Unit)getObj("to", DefaultTabOverlap); } set { setObj("to", value); } }

		[Category("Appearance")]
		public TabShowEffect Effect { get { return (TabShowEffect)getObj("efect", TabShowEffect.None); } set { setObj("efect", value); } }

		public bool DelayLoad { get { return (bool)getObj("dload", DefaultDelayLoad); } set { setObj("dload", value); } }

		protected override void writeRootClientAttributes(HtmlTextWriter writer)
		{
			base.writeRootClientAttributes(writer);
			Cmn.writeAttr(writer, "theme", Theme.ToString().ToLower());
			Cmn.writeAttr(writer, "width", Width.Value.ToString() + "px");
			Cmn.writeAttr(writer, "height", Height.Value.ToString() + "px");
		}

		protected override void writeClientInnerContents(HtmlTextWriter writer)
		{
			base.writeClientInnerContents(writer);
			writer.Write("<ntb:tabs "); //align='{0}' overlap='{1}'>",
			Cmn.writeAttr(writer, "align", TabAlignment.ToString().ToLower());
			Cmn.writeAttr(writer, "overlap", TabOverlap.Value);
			Cmn.writeAttr(writer, "activateeffect", Effect.ToString().ToLower());
			writer.WriteLine(">");

			foreach (TabItem tab in TabItems)
			{
				string conType = !Cmn.IsEmpty(tab.NavigationUrl) ? "containertype='iframe'" : "";
				string source = tab.NavigationUrl;
				if (Cmn.IsEmpty(tab.NavigationUrl))
					source = calcControlName(tab.NamedId, false);
				writer.Write("<ntb:tab ");
				Cmn.writeAttr(writer, "label", tab.Name);
				Cmn.writeAttr(writer, "source", source);
				Cmn.writeAttr(writer, "width", tab.Width);
				Cmn.writeAttr(writer, "hideoverflowenabled", tab.HideOverflow.ToString().ToLower(), "false");
				Cmn.writeAttr(writer, "loadondemandenabled", DelayLoad?"true":tab.LoadOnDemand.ToString().ToLower(), "false");
				Cmn.writeAttr(writer, "tooltip", tab.ToolTip);
				tab.ClientEvents.writeColumnAttributes(writer, DelayLoad?source:null);
				writer.Write(conType);
				writer.WriteLine("></ntb:tab>");
			}
			writer.Write("</ntb:tabs>");
		}

		public static void SetupScriptsAndStyleSheets(Page Page, TabStripThemeName Theme, string id, bool includeAutoLoad, bool includeDelayLoad, bool isIE, string styleDirectory)
		{
			string scriptUrl = Page.ClientScript.GetWebResourceUrl(typeof(Spotlight), "Nitobi.scripts.nitobi.tabstrip.js");
			Page.ClientScript.RegisterClientScriptInclude("Nitobi.TabStripScript", scriptUrl);
			Page.ClientScript.RegisterStartupScript(typeof(TabStrip), "Nitobi.TabStrip",
				@"
nitobi.tabstrip.TabStrip.prototype.oldTabRender = nitobi.tabstrip.TabStrip.prototype.render;
nitobi.tabstrip.TabStrip.prototype.render = function()
{
	if(eval(""('undefined' === typeof "" + this.getId() + ""tabsDelayAll)?false:true"") == true)
		this.getTabs().delayLoadingAll = true;
	this.oldTabRender();
}

nitobi.tabstrip.Tabs.prototype.oldLoadTabs = nitobi.tabstrip.Tabs.prototype.loadTabs;
nitobi.tabstrip.Tabs.prototype.loadTabs = function()
{
	if(!this.delayLoadingAll)
		this.oldLoadTabs();
}
", true);
			if (includeDelayLoad)
				Page.ClientScript.RegisterStartupScript(typeof(TabStrip), "Nitobi.DelyLoad"+id,
				String.Format(@"
	function delayLoadTabs{0}()
	{{
		var tabs = nitobi.getComponent('{0}');
		if(tabs != null)
		{{
			var tbs = tabs.getTabs();
			var tab = tbs.get(0);			
			tab.load();
		}}
		else
			window.setTimeout('delayLoadTabs{0}()', 100);
	}}
", id), true);
			if (id != null)
			{
				string autoloadScript = "", delayLoadScript = "";
				if (includeAutoLoad)
					if (!isIE)
						autoloadScript = string.Format("window.setTimeout('window.resizeBy(0,1);',950);", id);
					else
						autoloadScript = string.Format("resizeTabs{0}();", id);
				if (includeDelayLoad)
					delayLoadScript = string.Format("{0} var {1}tabsDelayAll = true;delayLoadTabs{1}();", autoloadScript, id);

				if (DefaultPreCacheImages)
					delayLoadScript = string.Format("nitobi.tabstrip.TabStrip.precacheImages();{0}", delayLoadScript);
				Page.ClientScript.RegisterStartupScript(typeof(TabStrip), "Nitobi.TabStrip" + id,
					string.Format(@"{2} try {{ if(window.attachEvent){{	window.attachEvent( ""onload"", function(){{nitobi.loadComponent('{0}');{1}}} );}}else{{window.addEventListener(""load"",function(){{nitobi.loadComponent('{0}');}},false);{1}}}}} catch(e) {{alert(""Nitobi: TabStrip Javascript file not found""); }}",
					id, autoloadScript, delayLoadScript), true);
			}

			if(Theme != TabStripThemeName.None)
				NitobiControlBase.setupCssLink(Page, "tabstrip", Theme.ToString(), styleDirectory);
		}

		protected override void OnPreRender(EventArgs e)
		{
			base.OnPreRender(e);
			SetupScriptsAndStyleSheets(Page, Theme, ClientID, m_autoSize != null, DelayLoad, Page.Request.Browser.Browser.Equals("IE"), this.StyleDirectory);
			if (m_autoSize != null)
				m_autoSize.writeScript(this);
		}
	}

	[ParseChildren(true)]
	public class TabAutoSize : ScriptingBaseEntity
	{
		static string s_perElementScript = @"
	var tab{0}forward = false;
	function resizeTabs{0}()
	{{
		var tabs = nitobi.getComponent('{0}');
		if(tabs != null)
		{{
		tabs.setWidth({1}.{5}Width - {3});
		tabs.setHeight({2}.{5}Height - {4});	
		}}
		else
		{{
			tab{0}forward = !tab{0}forward;
			if(tab{0}forward)
				window.setTimeout('window.resizeBy(0,-1)',100);
			else
				window.setTimeout('window.resizeBy(0,1)',100);
		}}
	}}

	if(window.attachEvent){{ window.attachEvent('onresize', resizeTabs{0});}}
	else {{ window.addEventListener('resize', resizeTabs{0}, false);}}
";
		static TabAutoSize() { BaseEntity.registerChildType(typeof(TabAutoSize)); }

		public string WidthDomId { get { return (string)getObj("wdi", "body"); } set { setObj("wdi", value); } }
		public string HeightDomId { get { return (string)getObj("hdi", "body"); } set { setObj("hdi", value); } }

		public int FixedWidthMargin { get { return (int)getObj("fwm", 0); } set { setObj("fwm", value); } }
		public int FixedHeightMargin { get { return (int)getObj("fhm", 0); } set { setObj("fhm", value); } }

		public string MarginWidthDomId { get { return (string)getObj("mwdi", null); } set { setObj("mwdi", value); } }
		public string MarginHeightDomId { get { return (string)getObj("mhdi", null); } set { setObj("mhdi", value); } }

		public virtual void writeScript(TabStrip tabs)
		{
			string widthElId = string.Compare(WidthDomId, "body", true) == 0 ? "document.body" : string.Format("document.getElementById('{0}')", tabs.calcControlName(WidthDomId,false));
			string heightElId = string.Compare(HeightDomId, "body", true) == 0 ? "document.body" : string.Format("document.getElementById('{0}')", tabs.calcControlName(HeightDomId, false));

			string sizeType = "client";

			string marginWidth = FixedWidthMargin.ToString();
			if(MarginWidthDomId != null)
				marginWidth = string.Format("{0} - document.getElementById('{1}').{2}Width", marginWidth, tabs.calcControlName(MarginWidthDomId, false), sizeType);
	
			string marginHeight = FixedHeightMargin.ToString();
			if (MarginHeightDomId != null)
				marginHeight = string.Format("{0} - document.getElementById('{1}').{2}Height", marginHeight, tabs.calcControlName(MarginHeightDomId, false), sizeType);

			tabs.Page.ClientScript.RegisterStartupScript(typeof(TabAutoSize), tabs.ClientID,
				string.Format(s_perElementScript, tabs.ClientID, widthElId, heightElId, marginWidth, marginHeight, sizeType, (!tabs.DelayLoad).ToString().ToLower()), true);
		}

	}

	/// <summary>Maintains the state for each tab in the tab strip and can be created by ASP.NET
	/// when embedding the <csf:TabItem> in the tabstrip control in an ASPX/ASCX.</summary>
	[AspNetHostingPermission(SecurityAction.Demand, Level = AspNetHostingPermissionLevel.Minimal)]
	[ParseChildren(true, "TabItems")]
	public class TabItem
	{
		private int m_tabId = -1;
		private string m_namedId;
		private string m_name;
		private string m_navigationUrl;
		private bool m_selected;
		private bool m_disabled;
		private bool m_hideOverflow;
		private bool m_loadOnDemand;
		private string m_onClick;
		private string m_toolTip;
		private bool m_serverPostback = false;
		private Unit m_width;
		protected TabStripClientEvents m_clientEvents = new TabStripClientEvents();
		protected List<TabItem> m_tabItems = new List<TabItem>();

		public List<TabItem> TabItems { get { return m_tabItems; } }
		[PersistenceModeAttribute(PersistenceMode.InnerProperty)]
		public TabStripClientEvents ClientEvents { get { return m_clientEvents; } }

		public TabItem() : this("", "", false, false, false, false, "", "", "", new Unit(0)) { }

		public TabItem(String name, String navigationUrl, bool selected, bool disabled, bool hideOverflow, bool loadOnDemand, string onClientClick, string namedId, string toolTip, Unit width)
		{
			m_name = name;
			m_navigationUrl = navigationUrl;
			m_selected = selected;
			m_disabled = disabled;
			m_hideOverflow = hideOverflow;
			m_loadOnDemand = loadOnDemand;
			m_onClick = onClientClick;
			m_namedId = namedId;
			m_toolTip = toolTip;
			m_width = width;
		}

		public string Name { get { return m_name; } set { m_name = value; } }
		public string NavigationUrl { get { return m_navigationUrl; } set { m_navigationUrl = value; } }
		public bool Disabled { get { return m_disabled; } set { m_disabled = value; } }
		public bool Selected { get { return m_selected; } set { m_selected = value; } }
		public bool HideOverflow { get { return m_hideOverflow; } set { m_hideOverflow = value; } }
		public bool LoadOnDemand { get { return m_loadOnDemand; } set { m_loadOnDemand = value; } }
		public string OnClientClick { get { return m_onClick; } set { m_onClick = value; } }
		public string NamedId { get { return m_namedId; } set { m_namedId = value; } }
		public Unit Width { get { return m_width; } set { m_width = value; } }
		public string ToolTip { get { return m_toolTip; } set { m_toolTip = value; } }
		public int Id { get { return m_tabId; } set { m_tabId = value; } }
		public bool ServerPostBack { get { return m_serverPostback; } set { m_serverPostback = value; } }
	}

	public enum TabAlignment { Left, Center, Right }
	public enum TabShowEffect { None, Fade }
}
