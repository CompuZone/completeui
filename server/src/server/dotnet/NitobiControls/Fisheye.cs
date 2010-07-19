using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Drawing;

[assembly: WebResource("Nitobi.scripts.nitobi.fisheye.js", "application/x-javascript")]
namespace Nitobi
{
	/// <summary>
	/// Displays a horizontal list of icons that will grow to a larger size as the mouse gets closer to it,
	/// reaching its largest size when the mouse is within the image.  This control mimics the desktop toolbar
	/// from Apple OS X.
	/// </summary>
	/// <remarks>
	/// One key aspect of this control is that it is drawn as an absolute positioned element.  If your intent
	/// for the control is to stay positioned with something else that moves, you will need to write a script
	/// function to reposition the fisheye html element as the element it is tied to moves.
	/// </remarks>
	[Themeable(true)]
	[ParseChildren(true, "Items")]
    [Description("Nitobi Fisheye")]
    [ToolboxData("<{0}:CustomControl runat=server></{0}:CustomControl>")]
    [ToolboxBitmap(typeof(Fisheye), "fisheye_16.png")]
	public class Fisheye : NitobiControlBase, IPostBackEventHandler
	{
		public enum ExpandDir { Right, Left, Center };
		public enum OpenDir { Up, Down };

		public static FisheyeThemeName DefaultTheme = FisheyeThemeName.ClearBack;
		public static ExpandDir DefaultExpandDirection = ExpandDir.Right;
		public static OpenDir DefaultOpenDirection = OpenDir.Up;
		public static int DefaultIconWidth = 50;
		public static int DefaultGrowPercent = 200;
		public static int ContinuousCheckPositionInterval = 200;

		protected List<FisheyeItem> m_items = new List<FisheyeItem>();

		protected override string RootClientControlName { get { return "ntb:fisheye"; } }

		public event EventHandler Click;

		public List<FisheyeItem> Items { get { return m_items; } }

		[Category("Appearance")]
		public FisheyeThemeName Theme { get { return (FisheyeThemeName)getObj("theme", DefaultTheme); } set { setObj("theme", value); } }

		public OpenDir OpenDirection { get { return (OpenDir)getObj("od", DefaultOpenDirection); } set { setObj("od", value); } }

		public ExpandDir ExpandDirection { get { return (ExpandDir)getObj("ed", DefaultExpandDirection); } set { setObj("ed", value); } }

		public int GrowPercent { get { return (int)getObj("gp", DefaultGrowPercent); } set { setObj("gp", value); } }

		public int IconWidth { get { return (int)getObj("iw", DefaultIconWidth); } set { setObj("iw", value); } }

		public bool BounceOnSelect { get { return (bool)getObj("bs", true); } set { setObj("bs", value); } }


		protected override void writeRootClientAttributes(HtmlTextWriter writer)
		{
			base.writeRootClientAttributes(writer);
			Cmn.writeAttr(writer, "theme", Theme.ToString().ToLower());
			Cmn.writeAttr(writer, "opendirection", OpenDirection);
			Cmn.writeAttr(writer, "expanddirection", ExpandDirection);
			Cmn.writeAttr(writer, "growpercent", GrowPercent);
			Cmn.writeAttr(writer, "iconwidth", IconWidth);
		}

		protected override void writeClientInnerContents(HtmlTextWriter writer)
		{
			base.writeClientInnerContents(writer);
			foreach (FisheyeItem item in Items)
				item.writeItem(writer);
		}

		protected override void OnPreRender(EventArgs e)
		{
			base.OnPreRender(e);
			string scriptUrl = Page.ClientScript.GetWebResourceUrl(typeof(Fisheye), "Nitobi.scripts.nitobi.fisheye.js");
			Page.ClientScript.RegisterClientScriptInclude("Nitobi.FisheyeScript", scriptUrl);
			string fs = "";
			if (!BounceOnSelect)
				fs = "f.bounceOnClick = false;";
			Page.ClientScript.RegisterStartupScript(typeof(Fisheye), "Nitobi.FisheyeStartup" + ClientID,
				string.Format(@"try {{ if(window.attachEvent){{	window.attachEvent( ""onload"", function(){{var f = nitobi.loadComponent('{0}');nitobi.fisheye.FishEye.performContinuousPositionCheck = {1};{2}}} );}}else{{window.addEventListener(""load"",function(){{var f = nitobi.loadComponent('{0}');nitobi.fisheye.FishEye.performContinuousPositionCheck = {1};{2}}},false);}}}} catch(e) {{alert(""Nitobi: Fisheye Javascript file not found""); }}", ClientID, ContinuousCheckPositionInterval, fs), true);

			if (Page.Header != null && Theme != FisheyeThemeName.None)
			{
				string appPath = Page.Request.ApplicationPath;
				string linkUrl = string.Format("{0}{1}{3}/fisheye/{2}/fisheye.css", appPath, appPath.Length == 1 ? "" : "/", Theme.ToString().ToLower(),this.StyleDirectory);
				string baseUrl = string.Format("{0}{1}{2}/", appPath, appPath.Length == 1 ? "" : "/",this.StyleDirectory);
				string csslink = string.Format("<link href='{0}tree/nitobi.reset.css' rel='stylesheet' type='text/css' ></link><link href='{1}' rel='stylesheet' type='text/css' ></link>",
					baseUrl, linkUrl);
                setupPageCssLinks(Page, linkUrl, csslink);
			}

		}

		public void RaisePostBackEvent(string eventArgument)
		{
			if (Click != null)
				Click(this, new EventArgs());
		}
	}

	public class FisheyeItem : BaseEntity
	{
		static FisheyeItem() { BaseEntity.registerChildType(typeof(FisheyeItem)); }

		public string ImageUrl { get { return (string)getObj("imageUrl", null); } set { setObj("imageUrl", value); } }
		public string Tooltip { get { return (string)getObj("tooltip", null); } set { setObj("tooltip", value); } }
		public string ClientClick { get { return (string)getObj("clientClick", null); } set { setObj("clientClick", value); } }
		public string NavigateUrl { get { return (string)getObj("navigateUrl", null); } set { setObj("navigateUrl", value); } }

		internal void writeItem(HtmlTextWriter writer)
		{
			writer.Write("<ntb:menuitem ");
			Cmn.writeAttr(writer, "imagesrc", ImageUrl);
			Cmn.writeAttr(writer, "label", Tooltip);
			string cc = ClientClick;
			if (NavigateUrl != null)
				cc = string.Format("{0};window.location.href='{1}';", cc, NavigateUrl);
			Cmn.writeAttr(writer, "onclick", cc);
			writer.WriteLine(" ></ntb:menuitem>");
		}
	}
}
