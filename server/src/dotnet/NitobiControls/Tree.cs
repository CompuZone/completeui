using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Drawing;

[assembly: WebResource("Nitobi.scripts.nitobi.tree.js", "application/x-javascript")]
namespace Nitobi
{
	[Themeable(true)]
	[ParseChildren(true)]
    [Description("Nitobi Tree")]
    [ToolboxData("<{0}:CustomControl runat=server></{0}:CustomControl>")]
    [ToolboxBitmap(typeof(Tree), "tree_16.png")]
	public class Tree : ColumnControlBase
	{
		protected static bool s_defaultRootEnabled = false, s_defaultExpanded = false, s_defaultHoverHighlight = true;
		public static TreeThemeName DefaultTheme = TreeThemeName.None;
		protected override string RootClientControlName { get { return "ntb:tree"; } }

		[Category("Appearance")]
		public TreeThemeName Theme { get { return (TreeThemeName)getObj("theme", DefaultTheme); } set { setObj("theme", value); } }

		[Category("Appearance")]
		public string CssStyle { get { return (string)getObj("style", null); } set { setObj("style", value); } }

		[Category("Appearance")]
		public string CssClass { get { return (string)getObj("class", null); } set { setObj("class", value); } }

		[Category("Appearance")]
		public TreeShowHideEffect Effect { get { return (TreeShowHideEffect)getObj("efect", TreeShowHideEffect.None); } set { setObj("efect", value); } }

		public string Target { get { return (string)getObj("target", null); } set { setObj("target", value); } }

		public bool RootEnabled { get { return (bool)getObj("root", s_defaultRootEnabled); } set { setObj("root", value); } }

		public bool Expanded { get { return (bool)getObj("exp", s_defaultExpanded); } set { setObj("exp", value); } }

		public bool HoverHighlight { get { return (bool)getObj("hh", s_defaultHoverHighlight); } set { setObj("hh", value); } }

		public int LocalDataDepth { get { return (int)getObj("dataDepth", 0); } set { setObj("dataDepth", value); } }

		protected override void writeRootClientAttributes(HtmlTextWriter writer)
		{
			base.writeRootClientAttributes(writer);
			Cmn.writeAttr(writer, "theme", Theme.ToString().ToLower());
			string did = DataSourceId == null ? s_defaultDataSourceId : DataSourceId;
			if(IncludeColumnsInUrl)
				Cmn.writeAttr(writer, "gethandler", Page.Response.ApplyAppPathModifier(string.Format(GetDataUrl.Contains("?") ? "{0}&did={2}&NitCols={1}" : "{0}?did={2}&NitCols={1}", GetDataUrl, Uri.EscapeDataString(Cmn.ToBase64(Columns.Xml)), did)));
			else
				Cmn.writeAttr(writer, "gethandler", Page.Response.ApplyAppPathModifier(string.Format(GetDataUrl.Contains("?") ? "{0}&did={1}" : "{0}?did={1}", GetDataUrl, did)));
			Cmn.writeAttr(writer, "cssstyle", CssStyle);
			Cmn.writeAttr(writer, "cssclass", CssClass);
			Cmn.writeAttr(writer, "effect", Effect.ToString().ToLower());
			Cmn.writeAttr(writer, "targetframe", Target);
			Cmn.writeAttr(writer, "rootenabled", RootEnabled, s_defaultRootEnabled);
			Cmn.writeAttr(writer, "expanded", Expanded, s_defaultExpanded);
			Cmn.writeAttr(writer, "hoverhighlight", HoverHighlight, s_defaultHoverHighlight);
		}

		protected override void writeClientInnerContents(HtmlTextWriter writer)
		{
			base.writeClientInnerContents(writer);
			if ((GetDataUrl == null || LocalDataDepth > 0) && m_dataHandler != null)
			{
				AjaxGetDataHandlerEventArgs info = new AjaxGetDataHandlerEventArgs(AjaxRequestTypes.TreeGetDataRequest,	DataSourceId == null ? s_defaultDataSourceId : DataSourceId, 0, -1);
				info.MaxTreeDepth = LocalDataDepth - 1;
				m_dataHandler.generateFullCompressedXml(System.Web.HttpContext.Current.Request, writer, Columns, info);
			}
		}

		protected override void OnPreRender(EventArgs e)
		{
			base.OnPreRender(e);
			string scriptUrl = Page.ClientScript.GetWebResourceUrl(typeof(Tree), "Nitobi.scripts.nitobi.tree.js");
			Page.ClientScript.RegisterClientScriptInclude("Nitobi.TreeScript", scriptUrl);
			Page.ClientScript.RegisterStartupScript(typeof(Tree), "Nitobi.TreeStartup"+ClientID,
				string.Format(@"try {{ if(window.attachEvent){{	window.attachEvent( ""onload"", function(){{nitobi.loadComponent('{0}');}} );}}else{{window.addEventListener(""load"",function(){{nitobi.loadComponent('{0}');}},false);}}}} catch(e) {{alert(""Nitobi: Tree Javascript file not found""); }}", ClientID), true);

			if (Page.Header != null && Theme != TreeThemeName.None)
			{
				string appPath = Page.Request.ApplicationPath;
				string linkUrl = string.Format("{0}{1}{3}/tree/{2}/tree.css", appPath, appPath.Length == 1 ? "" : "/", Theme.ToString().ToLower(), this.StyleDirectory);
				string baseUrl = string.Format("{0}{1}{2}/", appPath, appPath.Length == 1 ? "" : "/", this.StyleDirectory);
				string csslink = string.Format("<link href='{0}tree/nitobi.reset.css' rel='stylesheet' type='text/css' ></link><link href='{0}tree/base/tree.css' rel='stylesheet' type='text/css' /><link href='{1}' rel='stylesheet' type='text/css' ></link>",
					baseUrl, linkUrl);

                setupPageCssLinks(Page, linkUrl, csslink);
			}

		}
		protected override bool IsAjaxData
		{
			get { return GetDataUrl != null; }
		}

	}

	/// <summary>
	/// Defines all of the know properties that can be specified for a tree node.  The data source the tree
	/// is bound to for its events could be a list of these objects, but isnt required.
	/// </summary>
	public class BaseTreeNode
	{
		protected string m_label = null;
		protected string m_icon = null;
		protected TreeNodeChildren m_hasChildren = TreeNodeChildren.NotSpecified;
		protected bool m_expanded = false;
		protected string m_cssClass = null;
		protected string m_getHandler = null;
		protected TreeNodeType m_nodeType = TreeNodeType.NotSpecified;
		protected string m_clientOnClick = null;
		protected string m_clientOnSelect = null;
		protected string m_clientOnDeselect = null;

		public string Label { get { return m_label; } set { m_label = value; } }
		public string Icon { get { return m_icon; } set { m_icon = value; } }
		public TreeNodeChildren HasChildren { get { return m_hasChildren; } set { m_hasChildren = value; } }
		public bool Expanded { get { return m_expanded; } set { m_expanded = value; } }
		public string CssClass { get { return m_cssClass; } set { m_cssClass = value; } }
		public string GetDataUrl { get { return m_getHandler; } set { m_getHandler = value; } }
		public TreeNodeType NodeType { get { return m_nodeType; } set { m_nodeType = value; } }
		public string ClientOnClick { get { return m_clientOnClick; } set { m_clientOnClick = value; } }
		public string ClientOnSelect { get { return m_clientOnSelect; } set { m_clientOnSelect = value; } }
		public string ClientOnDeselect { get { return m_clientOnDeselect; } set { m_clientOnDeselect = value; } }
	}

	public enum TreeNodeChildren
	{
		NotSpecified,
		True,
		False
	}

	public enum TreeNodeType
	{
		NotSpecified,
		Leaf,
		Node
	}


	public enum TreeShowHideEffect
	{
		None,
		Shade,
		Blind
	}

}
